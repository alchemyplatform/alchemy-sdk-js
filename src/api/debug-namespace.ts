import {
  BlockIdentifier,
  DebugCallTrace,
  DebugCallTracer,
  DebugPrestateTrace,
  DebugPrestateTracer,
  DebugTransaction
} from '../types/types';
import { AlchemyConfig } from './alchemy-config';
import { isHexString, toQuantity } from './utils';

/**
 * The Debug namespace contains methods to access the non-standard RPC methods
 * for inspecting and debugging transactions.
 *
 * For more information on the different methods and use cases please read our
 * [documentation](https://docs.alchemy.com/reference/debug-api-quickstart).
 *
 * Do not call this constructor directly. Instead, instantiate an Alchemy object
 * with `const alchemy = new Alchemy(config)` and then access the debug namespace
 * via `alchemy.debug`.
 */
export class DebugNamespace {
  /** @internal */
  constructor(private readonly config: AlchemyConfig) {}

  /**
   * Runs an `eth_call` with the context of the provided block execution using the
   * final state of the parent block as the base.
   *
   * @param transaction The transaction to debug trace.
   * @param blockIdentifier The block to debug the transaction in. Can be a
   * block hash, block number hex string, or commitment level.
   * @param tracer Tracer type and configuration.
   */
  traceCall(
    transaction: DebugTransaction,
    blockIdentifier: BlockIdentifier,
    tracer: DebugCallTracer
  ): Promise<DebugCallTrace>;

  /**
   * Runs an `eth_call` with the context of the provided block execution using the
   * final state of the parent block as the base.
   *
   * @param transaction The transaction to debug trace.
   * @param blockIdentifier The block to debug the transaction in. Can be a
   * block hash, block number hex string, or commitment level.
   * @param tracer Tracer type and configuration.
   */
  traceCall(
    transaction: DebugTransaction,
    blockIdentifier: BlockIdentifier,
    tracer: DebugPrestateTracer
  ): Promise<DebugPrestateTrace>;
  async traceCall(
    transaction: DebugTransaction,
    blockIdentifier: BlockIdentifier,
    tracer: DebugCallTracer | DebugPrestateTracer
  ): Promise<DebugCallTrace | DebugPrestateTrace> {
    const provider = await this.config.getProvider();
    const params = [transaction, blockIdentifier, parseTracerParams(tracer)];
    return provider.send('debug_traceCall', params, 'traceCall');
  }

  /**
   * Attempts to run the transaction in the exact same manner as it was executed
   * on the network. It will replay any transaction that may have been executed
   * prior to this one before it and will then attempt to execute the transaction
   * that corresponds to the given hash.
   *
   * @param transactionHash The transaction hash of the transaction to trace.
   * @param tracer Tracer type and configuration.
   * @param timeout  A duration string of decimal numbers that overrides the
   * default timeout of 5 seconds for JavaScript-based tracing calls. Max
   * timeout is "10s". Valid time units are "ns", "us", "ms", "s" each with
   * optional fraction, such as "300ms" or "2s45ms".
   */
  async traceTransaction(
    transactionHash: string,
    tracer: DebugCallTracer,
    timeout?: string
  ): Promise<DebugCallTrace>;

  /**
   * Attempts to run the transaction in the exact same manner as it was executed
   * on the network. It will replay any transaction that may have been executed
   * prior to this one before it and will then attempt to execute the transaction
   * that corresponds to the given hash.
   *
   * @param transactionHash The transaction hash of the transaction to trace.
   * @param tracer Tracer type and configuration.
   * @param timeout  A duration string of decimal numbers that overrides the
   * default timeout of 5 seconds for JavaScript-based tracing calls. Max
   * timeout is "10s". Valid time units are "ns", "us", "ms", "s" each with
   * optional fraction, such as "300ms" or "2s45ms".
   */
  async traceTransaction(
    transactionHash: string,
    tracer: DebugPrestateTracer,
    timeout?: string
  ): Promise<DebugPrestateTrace>;
  async traceTransaction(
    transactionHash: string,
    tracer: DebugCallTracer | DebugPrestateTracer,
    timeout?: string
  ): Promise<DebugCallTrace | DebugPrestateTrace> {
    const provider = await this.config.getProvider();
    const params = [transactionHash, parseTracerParams(tracer, timeout)];
    return provider.send('debug_traceTransaction', params, 'traceTransaction');
  }

  /**
   * Replays a block that has already been mined.
   *
   * @param blockIdentifier The block to debug the transaction in. Can be a
   * block hash, block number hex string, or commitment level.
   * @param tracer Tracer type and configuration.
   */
  traceBlock(
    blockIdentifier: BlockIdentifier | number,
    tracer: DebugCallTracer
  ): Promise<DebugCallTrace>;
  /**
   * Replays a block that has already been mined.
   *
   * @param blockIdentifier The block to debug the transaction in. Can be a
   * block hash, block number hex string, or commitment level.
   * @param tracer Tracer type and configuration.
   */
  traceBlock(
    blockIdentifier: BlockIdentifier | number,
    tracer: DebugPrestateTracer
  ): Promise<DebugPrestateTrace>;
  async traceBlock(
    blockIdentifier: BlockIdentifier | number,
    tracer: DebugCallTracer | DebugPrestateTracer
  ): Promise<DebugCallTrace | DebugPrestateTrace> {
    const provider = await this.config.getProvider();
    let method: string;
    let params: [string, RawTracer];
    if (isHexString(blockIdentifier, 32)) {
      method = 'debug_traceBlockByHash';
      params = [blockIdentifier as string, parseTracerParams(tracer)];
    } else {
      method = 'debug_traceBlockByNumber';
      const block =
        typeof blockIdentifier === 'number'
          ? toQuantity(blockIdentifier)
          : blockIdentifier;
      params = [block as string, parseTracerParams(tracer)];
    }
    return provider.send(method, params, 'traceBlock');
  }
}

interface RawTracer {
  tracer: string;
  tracerConfig?: {
    onlyTopCall?: boolean;
    timeout?: string;
  };
}

function parseTracerParams(
  tracer: DebugCallTracer | DebugPrestateTracer,
  timeout?: string
): RawTracer {
  return {
    tracer: tracer.type,
    ...(tracer.onlyTopCall !== undefined && {
      tracerConfig: {
        onlyTopCall: tracer.onlyTopCall,
        timeout
      }
    })
  };
}
