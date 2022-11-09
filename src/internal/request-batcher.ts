import { ConnectionInfo, FetchJsonResponse } from '@ethersproject/web/src.ts';

import { BatchRequest } from '../api/alchemy-provider';
import { MAX_BATCH_SIZE } from '../util/const';
import { JsonRpcRequest } from './internal-types';

export class RequestBatcher {
  private pendingBatchAggregator: NodeJS.Timer | undefined;
  private pendingBatch: Array<BatchRequest> | undefined;

  constructor(
    private readonly sendBatchFn: SendBatchFn,
    private readonly connection: ConnectionInfo,
    private readonly maxBatchSize = MAX_BATCH_SIZE
  ) {}

  async enqueueRequest(request: JsonRpcRequest): Promise<any> {
    if (this.pendingBatch === undefined) {
      this.pendingBatch = [];
    }

    const inflightRequest: BatchRequest = {
      request,
      resolve: undefined,
      reject: undefined
    };

    const promise = new Promise((resolve, reject) => {
      inflightRequest.resolve = resolve;
      inflightRequest.reject = reject;
    });

    this.pendingBatch.push(inflightRequest);

    if (this.pendingBatch.length === this.maxBatchSize) {
      // Send batch immediately if we are at the maximum batch size.
      void this.sendBatchRequest();
    } else if (!this.pendingBatchAggregator) {
      // Schedule batch for next event loop + short duration
      this.pendingBatchAggregator = setTimeout(
        () => this.sendBatchRequest(),
        10
      );
    }

    return promise;
  }

  async sendBatchRequest(): Promise<void> {
    // Get the current batch and clear it, so new requests
    // go into the next batch
    const batch = this.pendingBatch!;
    this.pendingBatch = undefined;
    this.pendingBatchAggregator = undefined;

    // Get the request as an array of requests
    const request = batch.map(inflight => inflight.request);

    return this.sendBatchFn(this.connection, JSON.stringify(request)).then(
      result => {
        // For each result, feed it to the correct Promise, depending
        // on whether it was a success or error
        batch.forEach((inflightRequest, index) => {
          const payload = result[index];
          if (payload.error) {
            const error = new Error(payload.error.message);
            (error as any).code = payload.error.code;
            (error as any).data = payload.error.data;
            inflightRequest.reject!(error);
          } else {
            inflightRequest.resolve!(payload.result);
          }
        });
      },
      error => {
        batch.forEach(inflightRequest => {
          inflightRequest.reject!(error);
        });
      }
    );
  }
}

/** Function type to match the `fetchJson` function in ethers. */
type SendBatchFn = (
  connection: string | ConnectionInfo,
  json?: string,
  processFunc?: (value: any, response: FetchJsonResponse) => any
) => Promise<any>;
