import { ConnectionInfo, FetchJsonResponse } from '@ethersproject/web';

import { JsonRpcRequest } from './internal-types';

/** Maximum size of a batch on the rpc provider. */
const DEFAULT_MAX_REQUEST_BATCH_SIZE = 100;

/** Timeout interval before the pending batch is sent. */
const DEFAULT_REQUEST_BATCH_DELAY_MS = 10;

/**
 * Internal class to enqueue requests and automatically send/process batches.
 *
 * The underlying batching mechanism is loosely based on ethers.js's
 * `JsonRpcBatchProvider`.
 *
 * @internal
 */
export class RequestBatcher {
  /** Timeout timer that periodically sends the pending batch. */
  private pendingBatchTimer: NodeJS.Timer | undefined;

  /**
   * Array of enqueued requests along with the constructed promise handlers for
   * each request.
   */
  private pendingBatch: Array<BatchRequest> | undefined;

  constructor(
    private readonly sendBatchFn: SendBatchFn,
    private readonly connection: ConnectionInfo,
    private readonly maxBatchSize = DEFAULT_MAX_REQUEST_BATCH_SIZE
  ) {}

  /**
   * Enqueues the provided request. The batch is immediately sent if the maximum
   * batch size is reached. Otherwise, the request is enqueued onto a batch that
   * is sent after 10ms.
   *
   * Returns a promise that resolves with the result of the request.
   */
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
    } else if (!this.pendingBatchTimer) {
      // Schedule batch for next event loop + short duration
      this.pendingBatchTimer = setTimeout(
        () => this.sendBatchRequest(),
        DEFAULT_REQUEST_BATCH_DELAY_MS
      );
    }

    return promise;
  }

  /**
   * Sends the currently queued batches and resets the batch and timer. Processes
   * the batched response results back to the original promises.
   */
  private async sendBatchRequest(): Promise<void> {
    // This if-statement handles the case where the maximum batch size triggers
    // the batch send, so the scheduled timeout send is called with an empty
    // batch (or vice-versa).
    if (this.pendingBatch === undefined) {
      return;
    }

    // Get the current batch and clear it, so new requests
    // go into the next batch
    const batch = this.pendingBatch!;
    this.pendingBatch = undefined;
    this.pendingBatchTimer = undefined;

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

/**
 * Internal interface to represent a request on a batch along with the promises to resolve it.
 */
interface BatchRequest {
  request: JsonRpcRequest;
  resolve?: (result: any) => void;
  reject?: (error: Error) => void;
}
