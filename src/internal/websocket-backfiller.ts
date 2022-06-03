import { fromHex, toHex } from '../api/util';
import { AlchemyWebSocketProvider } from './alchemy-websocket-provider';

export interface BatchPart {
  method: string;
  params?: any;
}

export interface NewHeadsEvent {
  author: string;
  difficulty: string;
  extraData: string;
  gasLimit: string;
  gasUsed: string;
  hash: string;
  logsBloom: string;
  miner: string;
  mixHash: string;
  nonce: string;
  number: string;
  parentHash: string;
  receiptsRoot: string;
  sealFields: string[];
  sha3Uncles: string;
  size: string;
  stateRoot: string;
  timestamp: string;
  transactionsRoot: string;
}

/** The return type of eth_getBlocksByHash. */
export interface BlockHead extends NewHeadsEvent {
  totalDifficulty: string;
  transactions: any[];
  uncles: string[];
}

export interface LogsEvent {
  address: string;
  blockHash: string;
  blockNumber: string;
  data: string;
  logIndex: string;
  topics: string[];
  transactionHash: string;
  transactionIndex: string;
  removed?: boolean;
}

export interface LogsSubscriptionFilter {
  address?: string | string[];
  topics?: Array<string | string[] | null>;
}

export interface GetLogsOptions extends LogsSubscriptionFilter {
  fromBlock?: string;
  toBlock?: string;
}

interface CommonAncestor {
  blockNumber: number;
  logIndex: number;
}

/**
 * The maximum number of blocks to backfill. If more than this many blocks have
 * been missed, then we'll sadly miss data, but we want to make sure we don't
 * end up requesting thousands of blocks if somebody left their laptop closed for a week.
 */
const MAX_BACKFILL_BLOCKS = 120;

/**
 * The WebsocketBackfiller fetches events that were sent since a provided block
 * number. This is used in the {@link AlchemyWebSocketProvider} to backfill
 * events that were transmitted while the websocket connection was down.
 *
 * The backfiller backfills two main eth_subscribe events: `logs` and `newHeads`.
 *
 * @internal
 */
export class WebsocketBackfiller {
  // TODO: Use HTTP provider to do backfill.
  private maxBackfillBlocks = MAX_BACKFILL_BLOCKS;
  constructor(private readonly provider: AlchemyWebSocketProvider) {}

  /**
   * Runs backfill for `newHeads` events.
   *
   * @param isCancelled Whether the backfill request is cancelled.
   * @param previousHeads Previous head requests that were sent.
   * @param fromBlockNumber The block number to start backfilling from.
   * @returns A list of `newHeads` events that were sent since the last backfill.
   */
  async getNewHeadsBackfill(
    isCancelled: () => boolean,
    previousHeads: NewHeadsEvent[],
    fromBlockNumber: number
  ): Promise<NewHeadsEvent[]> {
    throwIfCancelled(isCancelled);
    const toBlockNumber = await this.getBlockNumber();
    throwIfCancelled(isCancelled);

    // If there are no previous heads to fetch, return new heads since
    // `fromBlockNumber`, or up to maxBackfillBlocks from the current head.
    if (previousHeads.length === 0) {
      return this.getHeadEventsInRange(
        Math.max(fromBlockNumber, toBlockNumber - this.maxBackfillBlocks) + 1,
        toBlockNumber + 1
      );
    }

    // If the last emitted event is too far back in the past, there's no need
    // to backfill for reorgs. Just fetch the last `maxBackfillBlocks` worth of
    // new heads.
    const lastSeenBlockNumber = fromHex(
      previousHeads[previousHeads.length - 1].number
    );
    const minBlockNumber = toBlockNumber - this.maxBackfillBlocks + 1;
    if (lastSeenBlockNumber <= minBlockNumber) {
      return this.getHeadEventsInRange(minBlockNumber, toBlockNumber + 1);
    }

    // To capture all `newHeads` events, return all head events from the last
    // seen block number to current + any of the previous heads that were re-orged.
    const reorgHeads: NewHeadsEvent[] = await this.getReorgHeads(
      isCancelled,
      previousHeads
    );
    throwIfCancelled(isCancelled);
    const intermediateHeads: NewHeadsEvent[] = await this.getHeadEventsInRange(
      lastSeenBlockNumber + 1,
      toBlockNumber + 1
    );
    throwIfCancelled(isCancelled);
    return [...reorgHeads, ...intermediateHeads];
  }

  /**
   * Runs backfill for `logs` events.
   *
   * @param isCancelled Whether the backfill request is cancelled.
   * @param filter The filter object that accompanies a logs subscription.
   * @param previousLogs Previous log requests that were sent.
   * @param fromBlockNumber The block number to start backfilling from.
   */
  async getLogsBackfill(
    isCancelled: () => boolean,
    filter: LogsSubscriptionFilter,
    previousLogs: LogsEvent[],
    fromBlockNumber: number
  ): Promise<LogsEvent[]> {
    throwIfCancelled(isCancelled);
    const toBlockNumber = await this.getBlockNumber();
    throwIfCancelled(isCancelled);

    // If there are no previous logs to fetch, return new logs since
    // `fromBlockNumber`, or up to `maxBackfillBlocks` from the current head.
    if (previousLogs.length === 0) {
      return this.getLogsInRange(
        filter,
        Math.max(fromBlockNumber, toBlockNumber - this.maxBackfillBlocks) + 1,
        toBlockNumber + 1
      );
    }

    // If the last emitted log is too far back in the past, there's no need
    // to backfill for removed logs. Just fetch the last `maxBackfillBlocks`
    // worth of logs.
    const lastSeenBlockNumber = fromHex(
      previousLogs[previousLogs.length - 1].blockNumber
    );
    const minBlockNumber = toBlockNumber - this.maxBackfillBlocks + 1;
    if (lastSeenBlockNumber < minBlockNumber) {
      return this.getLogsInRange(filter, minBlockNumber, toBlockNumber + 1);
    }

    // Return all log events that have happened along with log events that have
    // been removed due to a chain reorg.
    const commonAncestor = await this.getCommonAncestor(
      isCancelled,
      previousLogs
    );
    throwIfCancelled(isCancelled);

    // All previous logs with a block number greater than the common ancestor
    // were part of a re-org, so mark them as such.
    const removedLogs = previousLogs
      .filter(log => fromHex(log.blockNumber) > commonAncestor.blockNumber)
      .map(log => ({ ...log, removed: true }));

    // If no common ancestor was found, start backfill from the oldest log's
    // block number.
    const fromBlockInclusive =
      commonAncestor.blockNumber === Number.NEGATIVE_INFINITY
        ? fromHex(previousLogs[0].blockNumber)
        : commonAncestor.blockNumber;
    let addedLogs = await this.getLogsInRange(
      filter,
      fromBlockInclusive,
      toBlockNumber + 1
    );

    // De-dupe any logs that were already emitted.
    addedLogs = addedLogs.filter(
      log =>
        log &&
        (fromHex(log.blockNumber) > commonAncestor.blockNumber ||
          fromHex(log.logIndex) > commonAncestor.logIndex)
    );

    throwIfCancelled(isCancelled);
    return [...removedLogs, ...addedLogs];
  }

  /**
   * Sets a new max backfill blocks. VISIBLE ONLY FOR TESTING.
   *
   * @internal
   */
  setMaxBackfillBlock(newMax: number): void {
    this.maxBackfillBlocks = newMax;
  }

  /**
   * Gets the current block number as a number.
   *
   * @private
   */
  private async getBlockNumber(): Promise<number> {
    const blockNumberHex: string = await this.provider.send('eth_blockNumber');
    return fromHex(blockNumberHex);
  }

  /**
   * Gets all `newHead` events in the provided range. Note that the returned
   * heads do not include re-orged heads. Use {@link getReorgHeads} to find heads
   * that were part of a re-org.
   *
   * @private
   */
  private async getHeadEventsInRange(
    fromBlockInclusive: number,
    toBlockExclusive: number
  ): Promise<NewHeadsEvent[]> {
    if (fromBlockInclusive >= toBlockExclusive) {
      return [];
    }
    const batchParts: BatchPart[] = [];
    for (let i = fromBlockInclusive; i < toBlockExclusive; i++) {
      batchParts.push({
        method: 'eth_getBlockByNumber',
        params: [toHex(i), false]
      });
    }

    // TODO: just fire off each send() separately since we're no longer batching:
    const batchedBlockHeads = await this.provider.sendBatch(batchParts);
    const blockHeads = batchedBlockHeads.reduce(
      (acc, batch) => acc.concat(batch),
      []
    );
    return blockHeads.map(toNewHeadsEvent);
  }

  /**
   * Returns all heads that were part of a reorg event.
   *
   * @private
   */
  private async getReorgHeads(
    isCancelled: () => boolean,
    previousHeads: NewHeadsEvent[]
  ): Promise<NewHeadsEvent[]> {
    const result: NewHeadsEvent[] = [];
    // Iterate from the most recent head backwards in order to find the first
    // block that was part of a re-org.
    for (let i = previousHeads.length - 1; i >= 0; i--) {
      const oldEvent = previousHeads[i];
      const blockHead = await this.getBlockByNumber(fromHex(oldEvent.number));
      throwIfCancelled(isCancelled);

      // If the hashes match, then current head in the iteration was not re-orged.
      if (oldEvent.hash === blockHead.hash) {
        break;
      }

      result.push(toNewHeadsEvent(blockHead));
    }
    return result.reverse();
  }

  /**
   * Simple wrapper around `eth_getBlockByNumber` that returns the complete
   * block information for the provided block number.
   *
   * @private
   */
  private async getBlockByNumber(blockNumber: number): Promise<BlockHead> {
    return this.provider.send('eth_getBlockByNumber', [
      toHex(blockNumber),
      false
    ]);
  }

  /**
   * Given a list of previous log events, finds the common block number from the
   * logs that matches the block head.
   *
   * This can be used to identify which logs are part of a re-org.
   *
   * Returns 1 less than the oldest log's block number if no common ancestor was found.
   *
   * @private
   */
  private async getCommonAncestor(
    isCancelled: () => boolean,
    previousLogs: LogsEvent[]
  ): Promise<CommonAncestor> {
    // Iterate from the most recent head backwards in order to find the first
    // block that was part of a re-org.
    let blockHead = await this.getBlockByNumber(
      fromHex(previousLogs[previousLogs.length - 1].blockNumber)
    );
    throwIfCancelled(isCancelled);
    for (let i = previousLogs.length - 1; i >= 0; i--) {
      const oldLog = previousLogs[i];

      // Ensure that updated blocks are fetched every time the log's block number
      // changes.
      if (oldLog.blockNumber !== blockHead.number) {
        blockHead = await this.getBlockByNumber(fromHex(oldLog.blockNumber));
      }

      // Since logs are ordered in ascending order, the first log that matches
      // the hash should be the largest logIndex.
      if (oldLog.blockHash === blockHead.hash) {
        return {
          blockNumber: fromHex(oldLog.blockNumber),
          logIndex: fromHex(oldLog.logIndex)
        };
      }
    }
    return {
      blockNumber: Number.NEGATIVE_INFINITY,
      logIndex: Number.NEGATIVE_INFINITY
    };
  }

  /**
   * Gets all `logs` events in the provided range. Note that the returned logs
   * do not include removed logs.
   *
   * @private
   */ private async getLogsInRange(
    filter: LogsSubscriptionFilter,
    fromBlockInclusive: number,
    toBlockExclusive: number
  ): Promise<LogsEvent[]> {
    if (fromBlockInclusive >= toBlockExclusive) {
      return [];
    }
    const rangeFilter: GetLogsOptions = {
      ...filter,
      fromBlock: toHex(fromBlockInclusive),
      toBlock: toHex(toBlockExclusive - 1)
    };
    return this.provider.send('eth_getLogs', [rangeFilter]);
  }
}

function toNewHeadsEvent(head: BlockHead): NewHeadsEvent {
  const result: NewHeadsEvent & Partial<BlockHead> = { ...head };
  delete result.totalDifficulty;
  delete result.transactions;
  delete result.uncles;
  return result;
}

export function dedupeNewHeads(events: NewHeadsEvent[]): NewHeadsEvent[] {
  return dedupe(events, event => event.hash);
}

export function dedupeLogs(events: LogsEvent[]): LogsEvent[] {
  return dedupe(events, event => `${event.blockHash}/${event.logIndex}`);
}

function dedupe<T>(items: T[], getKey: (item: T) => any): T[] {
  const keysSeen: Set<any> = new Set();
  const result: T[] = [];
  items.forEach(item => {
    const key = getKey(item);
    if (!keysSeen.has(key)) {
      keysSeen.add(key);
      result.push(item);
    }
  });
  return result;
}

const CANCELLED = new Error('Cancelled');
export function throwIfCancelled(isCancelled: () => boolean): void {
  if (isCancelled()) {
    throw CANCELLED;
  }
}
