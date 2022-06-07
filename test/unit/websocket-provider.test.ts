import { Network, toHex } from '../../src';
import { AlchemyWebSocketProvider } from '../../src/internal/alchemy-websocket-provider';
import { Deferred, Mocked } from '../test-util';
import { AlchemyProvider } from '../../src/internal/alchemy-provider';
import { Server, WebSocket } from 'mock-socket';
import {
  LogsEvent,
  LogsSubscriptionFilter,
  NewHeadsEvent,
  WebsocketBackfiller
} from '../../src/internal/websocket-backfiller';
import { makeLogsEvent, makeNewHeadsEvent } from './subscription-backfill.test';
import { Formatter } from '@ethersproject/providers/lib/formatter';
import SpyInstance = jest.SpyInstance;

describe('AlchemyWebSocketProvider', () => {
  let wsProvider: Mocked<AlchemyWebSocketProvider>;
  let mockServer: Server;
  let mockBackfiller: jest.SpyInstance;

  interface MockServerOptions {
    ethSubscribeIds?: Array<string>;
    ethSubscribeMessages?: Array<Array<any>>;
  }

  /**
   * Sets up the mock WebSocket server with default responses for heartbeat requests.
   *
   * @param options
   */
  function setupMockServer(options?: MockServerOptions): void {
    mockServer.on('connection', socket => {
      socket.on('message', (data: any) => {
        const msg = JSON.parse(data);
        if (msg.method && msg.method === 'eth_chainId') {
          socket.send(
            JSON.stringify({ jsonrpc: '2.0', result: '0x1', id: msg.id })
          );
        } else if (msg.method && msg.method === 'net_version') {
          socket.send(
            JSON.stringify({ jsonrpc: '2.0', result: '1', id: msg.id })
          );
        } else if (msg.method && msg.method === 'eth_blockNumber') {
          socket.send(
            JSON.stringify({ jsonrpc: '2.0', result: toHex(100), id: msg.id })
          );
        } else if (msg.method && msg.method === 'newHeads') {
          socket.send(
            JSON.stringify({ jsonrpc: '2.0', result: '0xdef', id: msg.id })
          );
        } else if (msg.method && msg.method === 'eth_subscribe') {
          if (
            options === undefined ||
            options.ethSubscribeMessages === undefined ||
            options.ethSubscribeIds === undefined
          ) {
            throw new Error('Expected mock return values for eth_subscribe');
          }
          const subId = options.ethSubscribeIds.shift();
          const subMessages = options.ethSubscribeMessages.shift();
          socket.send(
            JSON.stringify({
              jsonrpc: '2.0',
              id: msg.id,
              result: subId
            })
          );

          for (const message of subMessages!) {
            // Use `setImmediate()` to allow the first message to go through and
            // be processed by the provider.
            setImmediate(() =>
              socket.send(
                JSON.stringify({
                  jsonrpc: '2.0',
                  method: 'eth_subscription',
                  params: {
                    result: message,
                    subscription: subId
                  }
                })
              )
            );
          }
        }
      });
    });
  }

  function initializeWebSocketProvider(): void {
    AlchemyProvider.getAlchemyConnectionInfo = jest.fn().mockReturnValue({
      url: 'ws://localhost:1234'
    } as any);
    wsProvider = new AlchemyWebSocketProvider(
      Network.ETH_MAINNET,
      'demo',
      WebSocket
    ) as Mocked<AlchemyWebSocketProvider>;
  }

  function expectSubscribeCalled(spy: SpyInstance, expected: any): void {
    const subCalls = spy.mock.calls.filter(call => call[0] === 'eth_subscribe');
    expect(subCalls.length).toBeGreaterThan(0);
    expect(subCalls[0][1]).toEqual(expected);
  }

  function serverSendsMessage(
    messages: Array<any>,
    subId: string,
    deferred: Deferred<void>
  ): void {
    for (const message of messages) {
      // Use setImmediate to allow provder to pick up message.
      setImmediate(() => {
        mockServer.clients()[0].send(
          JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_subscription',
            params: {
              result: message,
              subscription: subId
            }
          })
        );
      });
    }

    if (deferred) {
      setImmediate(() => deferred.resolve());
    }
  }

  beforeEach(async () => {
    mockServer = new Server('ws://localhost:1234');
  });

  afterEach(async () => {
    await wsProvider.destroy();
    mockServer.close();
    jest.restoreAllMocks();
  });

  it('handles json-rpc requests', async () => {
    const mockBlockNumber = 100;
    setupMockServer();
    initializeWebSocketProvider();
    const res = await wsProvider.getBlockNumber();
    expect(res).toEqual(mockBlockNumber);
  });

  describe('newHeads/on(block)', () => {
    it('handles default ethers subscriptions', done => {
      const sendSpy = jest.spyOn(AlchemyWebSocketProvider.prototype, 'send');
      initializeWebSocketProvider();
      setupMockServer({
        ethSubscribeIds: ['0xabc'],
        ethSubscribeMessages: [[{ number: toHex(100) }, { number: toHex(101) }]]
      });

      let eventCount = 0;
      const expected = [100, 101];
      wsProvider.on('block', res => {
        expect(res).toEqual(expected[eventCount]);
        eventCount++;
        if (eventCount === 2) {
          expectSubscribeCalled(sendSpy, ['newHeads']);
          done();
        }
      });
    });

    it('emits backfill and maps new virtual ids', done => {
      // Test simulates:
      // - Starting block number at 100 with 'newHeads' subscription.
      // - Subscription returns block 100 then socket does down.
      // - Backfill returns block 101, 102.
      // - Virtual subscription returns block 103.
      const ethSubscribeIds = ['0xabc', '0xdef'];
      const ethSubscribeMessages = [
        [makeNewHeadsEvent(100, 'a')],
        [makeNewHeadsEvent(103, 'd')]
      ];
      setupMockServer({
        ethSubscribeIds,
        ethSubscribeMessages
      });

      mockBackfiller = jest
        .spyOn(WebsocketBackfiller.prototype, 'getNewHeadsBackfill')
        .mockImplementation(
          (
            _: () => boolean,
            previousHeads: NewHeadsEvent[],
            fromBlockNumber: number
          ) => {
            expect(previousHeads.length).toEqual(1);
            expect(fromBlockNumber).toEqual(100);
            return Promise.resolve([
              makeNewHeadsEvent(101, 'b'),
              makeNewHeadsEvent(102, 'c')
            ]);
          }
        );
      initializeWebSocketProvider();

      const receivedHeads: number[] = [];
      wsProvider.on('block', res => {
        receivedHeads.push(res);
        if (receivedHeads.length === 1) {
          mockServer.clients()[0].close();
        } else if (receivedHeads.length === 3) {
          expect(mockBackfiller).toHaveBeenCalled();
          expect(receivedHeads).toEqual([100, 101, 102]);
        } else if (receivedHeads.length === 4) {
          expect(receivedHeads).toEqual([100, 101, 102, 103]);
          done();
        }
      });
    });

    it('buffers events when socket is down and dedupes after', done => {
      // Test simulates
      // - Starting block number at 100 with 'newHeads' subscription.
      // - Subscription returns block 100 then socket does down.
      // - Backfill begins.
      // - Server sends blocks 101, 102 while backfill is happening
      // - Backfill returns blocks 102, 103.
      // - Verify that the block 101 is buffered and the block 102 is de-duped.
      const ethSubscribeIds = ['0xabc', '0xdef'];
      const ethSubscribeMessages = [[makeNewHeadsEvent(100, 'a')], []];
      setupMockServer({
        ethSubscribeIds,
        ethSubscribeMessages
      });

      // Deferred promise that resolves after socket sends message on reopen
      const serverMessageDeferred = new Deferred<void>();

      // Deferred promise that resolves after provider enters backfill.
      const backfillStartDeferred = new Deferred<void>();

      const backfillHeads: NewHeadsEvent[] = [
        makeNewHeadsEvent(101, 'b'),
        makeNewHeadsEvent(102, 'c')
      ];
      mockBackfiller = jest
        .spyOn(WebsocketBackfiller.prototype, 'getNewHeadsBackfill')
        .mockImplementation(async () => {
          backfillStartDeferred.resolve();
          await serverMessageDeferred.promise;
          return backfillHeads;
        });
      initializeWebSocketProvider();

      const receivedHeads: number[] = [];
      wsProvider.on('block', res => {
        receivedHeads.push(res);
        if (receivedHeads.length === 1) {
          mockServer.clients()[0].close();

          // Wait for backfill to start to send messages that should be buffered
          void backfillStartDeferred.promise.then(() => {
            serverSendsMessage(
              [makeNewHeadsEvent(102, 'c'), makeNewHeadsEvent(103, 'd')],
              '0xdef',
              serverMessageDeferred
            );
          });
        } else if (receivedHeads.length === 4) {
          expect(receivedHeads).toEqual([100, 101, 102, 103]);
          done();
        }
      });
    });
  });

  describe('logs/on(filter)', () => {
    const contractAddress = '0x65d25E3F2696B73b850daA07Dd1E267dCfa67F2D';

    beforeEach(() => {
      // Mock out the `Formatter` to avoid filling out all fields in mocks logs.
      jest
        .spyOn(Formatter.prototype, 'filterLog')
        .mockImplementation((val: any) => val);
    });

    it('handles default ethers subscriptions', done => {
      const sendSpy = jest.spyOn(AlchemyWebSocketProvider.prototype, 'send');
      initializeWebSocketProvider();
      const logsEvents = [
        makeLogsEvent(100, 'a', false),
        makeLogsEvent(101, 'b', false)
      ];
      setupMockServer({
        ethSubscribeIds: ['0xabc'],
        ethSubscribeMessages: [logsEvents]
      });

      let eventCount = 0;
      wsProvider.on({ address: contractAddress }, res => {
        expect(res).toEqual(logsEvents[eventCount]);
        eventCount++;
        if (eventCount === 2) {
          expectSubscribeCalled(sendSpy, [
            'logs',
            { address: contractAddress }
          ]);
          done();
        }
      });
    });

    it('emits backfill and maps new virtual ids', done => {
      // Test simulates:
      // - Starting block number at 100 with 'logs' subscription.
      // - Subscription returns log for 100 then socket does down.
      // - Backfill returns block 100 (re-org), 101, 102
      // - Virtual subscription returns log for 103.
      const ethSubscribeIds = ['0xabc', '0xdef'];
      const ethSubscribeMessages = [
        [makeLogsEvent(100, 'a')],
        [makeLogsEvent(103, 'd')]
      ];
      const logsForSubscription = [
        makeLogsEvent(100, 'a'),
        makeLogsEvent(103, 'd')
      ];
      const logsForBackfill = [
        makeLogsEvent(100, 'a', true),
        makeLogsEvent(100, "a'"),
        makeLogsEvent(101, 'b'),
        makeLogsEvent(102, 'c')
      ];
      setupMockServer({
        ethSubscribeIds,
        ethSubscribeMessages
      });

      mockBackfiller = jest
        .spyOn(WebsocketBackfiller.prototype, 'getLogsBackfill')
        .mockImplementation(
          (
            _: () => boolean,
            filter: LogsSubscriptionFilter,
            previousLogs: LogsEvent[],
            fromBlockNumber: number
          ) => {
            expect(previousLogs.length).toEqual(1);
            expect(filter).toEqual({ address: contractAddress });
            expect(fromBlockNumber).toEqual(100);
            return Promise.resolve(logsForBackfill);
          }
        );
      initializeWebSocketProvider();

      const receivedLogs: LogsEvent[] = [];
      wsProvider.on({ address: contractAddress }, res => {
        receivedLogs.push(res);
        if (receivedLogs.length === 1) {
          mockServer.clients()[0].close();
        } else if (receivedLogs.length === 5) {
          expect(mockBackfiller).toHaveBeenCalled();
          expect(receivedLogs).toEqual([
            logsForSubscription[0],
            ...logsForBackfill
          ]);
        } else if (receivedLogs.length === 6) {
          expect(receivedLogs).toEqual([
            logsForSubscription[0],
            ...logsForBackfill,
            logsForSubscription[1]
          ]);
          done();
        }
      });
    });

    it('buffers events when socket is down and dedupes after', done => {
      // Test simulates
      // - Starting block number at 100 with 'logs' subscription.
      // - Subscription returns logs 100 then socket does down.
      // - Backfill begins.
      // - Server sends logs for 101, 102 while backfill is happening
      // - Backfill returns logs for 102, some of which are dupes.
      // - Verify that the logs for 101 are buffered and the logs for block 102
      //   are de-duped.
      const ethSubscribeIds = ['0xabc', '0xdef'];
      const ethSubscribeMessages = [[makeLogsEvent(100, 'a')], []];
      setupMockServer({
        ethSubscribeIds,
        ethSubscribeMessages
      });

      // Deferred promise that resolves after socket sends message on reopen
      const serverMessageDeferred = new Deferred<void>();

      // Deferred promise that resolves after provider enters backfill.
      const backfillStartDeferred = new Deferred<void>();

      const backfillLogs: LogsEvent[] = [
        makeLogsEvent(101, 'b'),
        makeLogsEvent(102, 'c', false, 2),
        makeLogsEvent(102, 'c', false, 3)
      ];
      mockBackfiller = jest
        .spyOn(WebsocketBackfiller.prototype, 'getLogsBackfill')
        .mockImplementation(async () => {
          backfillStartDeferred.resolve();
          await serverMessageDeferred.promise;
          return backfillLogs;
        });
      initializeWebSocketProvider();

      const expectedLogs = [
        makeLogsEvent(100, 'a'),
        makeLogsEvent(101, 'b'),
        makeLogsEvent(102, 'c', false, 2),
        makeLogsEvent(102, 'c', false, 3),
        makeLogsEvent(102, 'c', false, 4)
      ];
      const receivedLogs: LogsEvent[] = [];
      wsProvider.on({ address: contractAddress }, res => {
        receivedLogs.push(res);
        if (receivedLogs.length === 1) {
          mockServer.clients()[0].close();

          // Wait for backfill to start to send messages that should be buffered
          void backfillStartDeferred.promise.then(() => {
            serverSendsMessage(
              [
                makeLogsEvent(102, 'c', false, 3),
                makeLogsEvent(102, 'c', false, 4)
              ],
              '0xdef',
              serverMessageDeferred
            );
          });
        } else if (receivedLogs.length === 5) {
          expect(receivedLogs).toEqual(expectedLogs);
          done();
        }
      });
    });
  });

  describe('alchemy_newFullPendingTransactions', () => {
    it('handles default subscriptions', done => {
      const sendSpy = jest.spyOn(AlchemyWebSocketProvider.prototype, 'send');
      initializeWebSocketProvider();
      setupMockServer({
        ethSubscribeIds: ['0xabc'],
        ethSubscribeMessages: [[{ blockNumber: 10 }, { blockNumber: 11 }]]
      });

      let eventCount = 0;
      const expected = [{ blockNumber: 10 }, { blockNumber: 11 }];
      wsProvider.on(
        {
          method: 'alchemy_newFullPendingTransactions'
        },
        res => {
          expect(res).toEqual(expected[eventCount]);
          eventCount++;
          if (eventCount === 2) {
            expectSubscribeCalled(sendSpy, [
              'alchemy_newFullPendingTransactions'
            ]);
            done();
          }
        }
      );
    });
  });

  describe('alchemy_filteredNewFullPendingTransactions', () => {
    it('handles default subscriptions', done => {
      const contractAddress = '0x65d25E3F2696B73b850daA07Dd1E267dCfa67F2D';
      const sendSpy = jest.spyOn(AlchemyWebSocketProvider.prototype, 'send');
      initializeWebSocketProvider();
      setupMockServer({
        ethSubscribeIds: ['0xabc'],
        ethSubscribeMessages: [[{ blockNumber: 10 }, { blockNumber: 11 }]]
      });

      let eventCount = 0;
      const expected = [{ blockNumber: 10 }, { blockNumber: 11 }];
      wsProvider.on(
        {
          method: 'alchemy_filteredNewFullPendingTransactions',
          address: contractAddress
        },
        res => {
          expect(res).toEqual(expected[eventCount]);
          eventCount++;
          if (eventCount === 2) {
            expectSubscribeCalled(sendSpy, [
              'alchemy_filteredNewFullPendingTransactions',
              { address: contractAddress }
            ]);
            done();
          }
        }
      );
    });
  });
});
