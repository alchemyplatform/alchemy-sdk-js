import { fromHex, initializeAlchemy, toHex } from '../../src';
import {
  BlockHead,
  GetLogsOptions,
  LogsEvent,
  WebsocketBackfiller
} from '../../src/internal/websocket-backfiller';
import {
  AlchemyWebSocketProvider,
  JsonRpcRequest
} from '../../src/internal/alchemy-websocket-provider';
import { Mocked } from '../test-util';

const isCancelled = () => false;

describe('Backfill tests', () => {
  const sdk = initializeAlchemy();
  let provider: Mocked<AlchemyWebSocketProvider>;
  let backfiller: WebsocketBackfiller;

  function expectGetBlockCalled(blockNumber: number): void {
    expect(
      provider.send.mock.calls.some(
        (call: string[]) =>
          call[0] === 'eth_getBlockByNumber' &&
          fromHex(call[1][0]) === blockNumber
      )
    ).toBe(true);
  }

  function expectGetBlockNotCalled(): void {
    expect(
      provider.send.mock.calls.some(
        (call: string[]) => call[0] === 'eth_getBlockByNumber'
      )
    ).toBe(false);
  }

  function makeNewHeadsEvent(blockNumber: number, hash: string): BlockHead {
    return { hash, number: toHex(blockNumber) } as any;
  }

  beforeEach(() => {
    provider = sdk.getWebsocketProvider() as Mocked<AlchemyWebSocketProvider>;
    backfiller = new WebsocketBackfiller(provider);
    provider.send = jest.fn();
    provider.sendBatch = jest.fn();
  });

  describe('getNewHeadsBackfill', () => {
    function expectGetBlockRangeCalled(
      startInclusive: number,
      endExclusive: number
    ): void {
      expect(provider.sendBatch).toBeCalled();
      const requestedBlockNumbers = provider.sendBatch.mock.calls[0][0].map(
        (request: JsonRpcRequest) => fromHex(request.params![0])
      );
      const expectedRange: number[] = [];
      for (let i = startInclusive; i < endExclusive; i++) {
        expectedRange.push(i);
      }
      expect(requestedBlockNumbers).toEqual(expectedRange);
    }

    it('returns blocks from start block number if no previous events', async () => {
      const newHeads = [
        makeNewHeadsEvent(10, 'a'),
        makeNewHeadsEvent(11, 'b'),
        makeNewHeadsEvent(12, 'c')
      ];
      provider.send.mockResolvedValue(toHex(12));
      provider.sendBatch.mockResolvedValue(newHeads);
      const result = await backfiller.getNewHeadsBackfill(isCancelled, [], 9);
      expect(result).toEqual(newHeads);
      expectGetBlockRangeCalled(10, 13);
    });

    it('returns blocks since the latest event seen', async () => {
      const previousHeads = [
        makeNewHeadsEvent(10, 'a'),
        makeNewHeadsEvent(11, 'b')
      ];
      const expected = [makeNewHeadsEvent(12, 'c'), makeNewHeadsEvent(13, 'd')];
      provider.sendBatch.mockResolvedValue(expected);
      provider.send
        .mockResolvedValueOnce(toHex(13))
        .mockResolvedValueOnce(makeNewHeadsEvent(11, 'b'));
      const result = await backfiller.getNewHeadsBackfill(
        isCancelled,
        previousHeads,
        9
      );

      // Verify that `getReorgHeads()` called `getBlockByNumber()` correctly.
      expectGetBlockCalled(11);

      // Verify that `getHeadEventsInRange()` fetched the correct range.
      expectGetBlockRangeCalled(12, 14);
      expect(result).toEqual(expected);
    });

    it('returns blocks since last reorg', async () => {
      // This test simulates a reorg starting in block 11.
      const previousHeads = [
        makeNewHeadsEvent(9, 'z'),
        makeNewHeadsEvent(10, 'a'),
        makeNewHeadsEvent(11, 'b'),
        makeNewHeadsEvent(12, 'c')
      ];
      const newHeads = [makeNewHeadsEvent(13, 'd'), makeNewHeadsEvent(14, 'e')];
      provider.sendBatch.mockResolvedValue(newHeads);
      provider.send
        .mockResolvedValueOnce(toHex(14))
        .mockResolvedValueOnce(makeNewHeadsEvent(12, "c'"))
        .mockResolvedValueOnce(makeNewHeadsEvent(11, "b'"))
        .mockResolvedValueOnce(makeNewHeadsEvent(10, 'a'));
      const result = await backfiller.getNewHeadsBackfill(
        isCancelled,
        previousHeads,
        9
      );
      const expected = [
        makeNewHeadsEvent(11, "b'"),
        makeNewHeadsEvent(12, "c'"),
        makeNewHeadsEvent(13, 'd'),
        makeNewHeadsEvent(14, 'e')
      ];
      expect(result).toEqual(expected);

      // 10-12 should all be checked as part of `getReorgHeads()`. Block 9 should
      // be ignored since block 10 matches.
      expectGetBlockCalled(12);
      expectGetBlockCalled(11);
      expectGetBlockCalled(10);
      expectGetBlockRangeCalled(13, 15);
    });

    it('returns all blocks from start if reorg goes that far', async () => {
      const previousHeads = [
        makeNewHeadsEvent(10, 'a'),
        makeNewHeadsEvent(11, 'b'),
        makeNewHeadsEvent(12, 'c')
      ];
      const newHeads = [makeNewHeadsEvent(13, 'd'), makeNewHeadsEvent(14, 'e')];
      provider.sendBatch.mockResolvedValue(newHeads);
      provider.send
        .mockResolvedValueOnce(toHex(14))
        .mockResolvedValueOnce(makeNewHeadsEvent(12, "c'"))
        .mockResolvedValueOnce(makeNewHeadsEvent(11, "b'"))
        .mockResolvedValueOnce(makeNewHeadsEvent(10, "a'"));
      const result = await backfiller.getNewHeadsBackfill(
        isCancelled,
        previousHeads,
        9
      );
      const expected = [
        makeNewHeadsEvent(10, "a'"),
        makeNewHeadsEvent(11, "b'"),
        makeNewHeadsEvent(12, "c'"),
        makeNewHeadsEvent(13, 'd'),
        makeNewHeadsEvent(14, 'e')
      ];
      expect(result).toEqual(expected);
      expectGetBlockCalled(12);
      expectGetBlockCalled(11);
      expectGetBlockCalled(10);
      expectGetBlockRangeCalled(13, 15);
    });

    it('ignores re-org if more than maxBackfillBlocks behind', async () => {
      // In this test, backfiller wants to backfill starting from block 10, but
      // since the current block is 13, the backfiller should skip block 10 and
      // backfill from block 11,
      backfiller.setMaxBackfillBlock(3);
      const previousHeads = [makeNewHeadsEvent(10, 'a')];
      const newHeads = [
        makeNewHeadsEvent(11, 'b'),
        makeNewHeadsEvent(12, 'c'),
        makeNewHeadsEvent(13, 'd')
      ];
      provider.sendBatch.mockResolvedValue(newHeads);
      provider.send.mockResolvedValue(toHex(13));

      const result = await backfiller.getNewHeadsBackfill(
        isCancelled,
        previousHeads,
        9
      );
      expectGetBlockNotCalled();
      expectGetBlockRangeCalled(11, 14);
      expect(result).toEqual(newHeads);
    });
  });

  describe('getLogsBackfill', () => {
    function makeLogsEvent(
      blockNumber: number,
      blockHash: string,
      isRemoved = false,
      logIndex = 1
    ): LogsEvent {
      return {
        blockHash,
        blockNumber: toHex(blockNumber),
        logIndex: toHex(logIndex),
        ...(isRemoved && { removed: isRemoved })
      } as any;
    }

    function expectGetLogRangeCalled(
      startInclusive: number,
      endExclusive: number
    ): void {
      expect(provider.send).toBeCalled();
      const options: GetLogsOptions[] = provider.send.mock.calls
        .filter(call => call[0] === 'eth_getLogs')
        .map(call => call[1][0]);
      expect(options.length).toEqual(1);
      const rangeFilter = options[0];
      expect(startInclusive).toEqual(fromHex(rangeFilter.fromBlock!));
      expect(endExclusive).toEqual(fromHex(rangeFilter.toBlock!) + 1);
    }

    it('returns logs from start block number if no previous logs', async () => {
      const newLogs = [
        makeLogsEvent(10, 'a'),
        makeLogsEvent(11, 'b'),
        makeLogsEvent(12, 'c')
      ];
      provider.send
        .mockResolvedValueOnce(toHex(12))
        .mockResolvedValueOnce(newLogs);
      const result = await backfiller.getLogsBackfill(isCancelled, {}, [], 9);
      expectGetLogRangeCalled(10, 13);
      expect(result).toEqual(newLogs);
    });

    it('includes LogOptions filter when backfilling', async () => {
      provider.send.mockResolvedValueOnce(toHex(10)).mockResolvedValueOnce([]);
      const topics = [['0x1'], [], null];
      await backfiller.getLogsBackfill(
        isCancelled,
        {
          address: '0xABC',
          topics
        },
        [],
        9
      );
      const options: GetLogsOptions[] = provider.send.mock.calls
        .filter(call => call[0] === 'eth_getLogs')
        .map(call => call[1][0]);
      expect(options.length).toEqual(1);
      const rangeFilter = options[0];
      expect(rangeFilter.address).toEqual('0xABC');
      expect(rangeFilter.topics).toEqual(topics);
    });

    it('returns logs since the last log seen', async () => {
      const previousLogs = [makeLogsEvent(10, 'a'), makeLogsEvent(11, 'b')];
      const expected = [makeLogsEvent(12, 'c'), makeLogsEvent(13, 'd')];
      provider.send
        .mockResolvedValueOnce(toHex(13))
        .mockResolvedValueOnce(makeNewHeadsEvent(11, 'b'))
        .mockResolvedValueOnce(expected);
      const result = await backfiller.getLogsBackfill(
        isCancelled,
        {},
        previousLogs,
        9
      );

      // Verify that `getCommonAncestorNumber()` called `getBlockByNumber()` correctly.
      expectGetBlockCalled(11);

      // Verify that `getLogsInRange()` fetched the correct range.
      expectGetLogRangeCalled(11, 14);
      expect(result).toEqual(expected);
    });

    it('returns logs since last reorg with removed property', async () => {
      // This test simulates a reorg starting in block 11.
      const previousLogs = [
        makeLogsEvent(9, 'z'),
        makeLogsEvent(10, 'a'),
        makeLogsEvent(11, 'b'),
        makeLogsEvent(12, 'c')
      ];
      const newLogs = [
        makeLogsEvent(10, 'a'),
        makeLogsEvent(11, "b'"),
        makeLogsEvent(12, "c'"),
        makeLogsEvent(13, 'd'),
        makeLogsEvent(14, 'e')
      ];
      provider.send
        .mockResolvedValueOnce(toHex(14))
        .mockResolvedValueOnce(makeNewHeadsEvent(12, "c'"))
        .mockResolvedValueOnce(makeNewHeadsEvent(11, "b'"))
        .mockResolvedValueOnce(makeNewHeadsEvent(10, 'a'))
        .mockResolvedValueOnce(newLogs);
      const result = await backfiller.getLogsBackfill(
        isCancelled,
        {},
        previousLogs,
        9
      );

      // Logs that were part of a re-org should have `{removed: true}`.
      const expected = [
        makeLogsEvent(11, 'b', true),
        makeLogsEvent(12, 'c', true),
        makeLogsEvent(11, "b'"),
        makeLogsEvent(12, "c'"),
        makeLogsEvent(13, 'd'),
        makeLogsEvent(14, 'e')
      ];

      // Check that `getCommonAncestorNumber()` checked in order, ignoring block
      // 9 since block 10 matches.
      expectGetBlockCalled(12);
      expectGetBlockCalled(11);
      expectGetBlockCalled(10);

      // Since block 10 is the common ancestor, blocks 10-14 should be checked.
      expectGetLogRangeCalled(10, 15);
      expect(result).toEqual(expected);
    });

    it('returns all logs from if reorg goes that far', async () => {
      // This tests when all previous logs are part of a re-org and that
      // logs are not improperly de-duped.
      const previousLogs = [
        makeLogsEvent(10, 'a', false, 100),
        makeLogsEvent(11, 'b', false, 100),
        makeLogsEvent(12, 'c', false, 100)
      ];
      const newLogs = [
        makeLogsEvent(10, "a'"),
        makeLogsEvent(11, "b'"),
        makeLogsEvent(12, "c'"),
        makeLogsEvent(13, 'd'),
        makeLogsEvent(14, 'e')
      ];
      provider.send
        .mockResolvedValueOnce(toHex(14))
        .mockResolvedValueOnce(makeNewHeadsEvent(12, "c'"))
        .mockResolvedValueOnce(makeNewHeadsEvent(11, "b'"))
        .mockResolvedValueOnce(makeNewHeadsEvent(10, "a'"))
        .mockResolvedValueOnce(newLogs);
      const result = await backfiller.getLogsBackfill(
        isCancelled,
        {},
        previousLogs,
        9
      );
      const expected = [
        // Logs that were part of a reorg should have `removed` property.
        makeLogsEvent(10, 'a', true, 100),
        makeLogsEvent(11, 'b', true, 100),
        makeLogsEvent(12, 'c', true, 100),
        makeLogsEvent(10, "a'"),
        makeLogsEvent(11, "b'"),
        makeLogsEvent(12, "c'"),
        makeLogsEvent(13, 'd'),
        makeLogsEvent(14, 'e')
      ];
      expect(result).toEqual(expected);
      expectGetBlockCalled(12);
      expectGetBlockCalled(11);
      expectGetBlockCalled(10);
      expectGetLogRangeCalled(10, 15);
    });

    it('de-dupes logs in commonAncestorNumber block', async () => {
      // Common ancestor block is 10.
      const previousLogs = [
        makeLogsEvent(10, 'a'),
        makeLogsEvent(11, 'b', false, 5),
        makeLogsEvent(11, 'b', false, 7)
      ];
      const newLogs = [
        makeLogsEvent(11, 'b', false, 4),
        makeLogsEvent(11, 'b', false, 5),
        makeLogsEvent(11, 'b', false, 6),
        makeLogsEvent(11, 'b', false, 7),
        makeLogsEvent(11, 'b', false, 10),
        makeLogsEvent(11, 'b', false, 11),
        makeLogsEvent(12, 'c')
      ];
      provider.send
        .mockResolvedValueOnce(toHex(12))
        .mockResolvedValueOnce(makeNewHeadsEvent(11, 'b'))
        .mockResolvedValueOnce(newLogs);

      const result = await backfiller.getLogsBackfill(
        isCancelled,
        {},
        previousLogs,
        9
      );

      // Log indexes 4,5,6 should be omitted.
      const expected = [
        makeLogsEvent(11, 'b', false, 10),
        makeLogsEvent(11, 'b', false, 11),
        makeLogsEvent(12, 'c')
      ];

      expectGetBlockCalled(11);
      expectGetLogRangeCalled(11, 13);
      expect(result).toEqual(expected);
    });

    it('ignores re-org if more than maxBackfillBlocks behind', async () => {
      // In this test, backfiller wants to backfill starting from block 10, but
      // since the current block is 13, the backfiller should skip block 10 and
      // backfill from block 11,
      backfiller.setMaxBackfillBlock(3);
      const previousLogs = [makeLogsEvent(10, 'a')];
      const newLogs = [
        makeLogsEvent(11, 'b'),
        makeLogsEvent(12, 'c'),
        makeLogsEvent(13, 'd')
      ];
      provider.send
        .mockResolvedValueOnce(toHex(13))
        .mockResolvedValueOnce(newLogs);

      const result = await backfiller.getLogsBackfill(
        isCancelled,
        {},
        previousLogs,
        9
      );
      expectGetBlockNotCalled();
      expectGetLogRangeCalled(11, 14);
      expect(result).toEqual(newLogs);
    });

    it('fetches the block once per block number in previous logs', async () => {
      const previousLogs = [
        makeLogsEvent(10, 'a', false, 1),
        makeLogsEvent(10, 'a', false, 2),
        makeLogsEvent(10, 'a', false, 3)
      ];

      provider.send
        .mockResolvedValueOnce(toHex(11))
        .mockResolvedValueOnce(makeNewHeadsEvent(10, 'a'))
        .mockResolvedValueOnce([]);

      await backfiller.getLogsBackfill(isCancelled, {}, previousLogs, 9);
      expect(
        provider.send.mock.calls.filter(
          (call: string[]) =>
            call[0] === 'eth_getBlockByNumber' && fromHex(call[1][0]) === 10
        ).length
      ).toEqual(1);
    });
  });
});
