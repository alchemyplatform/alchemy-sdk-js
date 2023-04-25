import { Server, WebSocket } from 'mock-socket';

import {
  Alchemy,
  AlchemyConfig,
  AlchemyMinedTransactionsEventFilter,
  AlchemyPendingTransactionsEventFilter,
  AlchemySubscription,
  Network,
  WebSocketNamespace,
  toHex
} from '../../src';
import { AlchemyProvider } from '../../src/api/alchemy-provider';
import { AlchemyWebSocketProvider } from '../../src/api/alchemy-websocket-provider';
import {
  EthersEvent,
  getAlchemyEventTag
} from '../../src/internal/ethers-event';
import {
  ALCHEMY_MINED_TRANSACTIONS_EVENT_TYPE,
  ALCHEMY_PENDING_TRANSACTIONS_EVENT_TYPE
} from '../../src/internal/internal-types';
import {
  LogsEvent,
  LogsSubscriptionFilter,
  NewHeadsEvent,
  WebsocketBackfiller
} from '../../src/internal/websocket-backfiller';
import { noop } from '../../src/util/const';
import {
  Deferred,
  Mocked,
  makeLogsEvent,
  makeNewHeadsEvent
} from '../test-util';

import SpyInstance = jest.SpyInstance;

// describe('AlchemyWebSocketProvider', () => {
//   let wsProvider: Mocked<AlchemyWebSocketProvider>;
//   let mockServer: Server;
//   let mockBackfiller: jest.SpyInstance;
//
//   interface MockServerOptions {
//     ethSubscribeIds?: Array<string>;
//     ethSubscribeMessages?: Array<Array<any>>;
//   }
//
//   /**
//    * Sets up the mock WebSocket server with default responses for heartbeat requests.
//    *
//    * @param options
//    */
//   function setupMockServer(options?: MockServerOptions): void {
//     mockServer.on('connection', socket => {
//       socket.on('message', (data: any) => {
//         const msg = JSON.parse(data);
//         if (msg.method && msg.method === 'eth_chainId') {
//           socket.send(
//             JSON.stringify({ jsonrpc: '2.0', result: '0x1', id: msg.id })
//           );
//         } else if (msg.method && msg.method === 'net_version') {
//           socket.send(
//             JSON.stringify({ jsonrpc: '2.0', result: '1', id: msg.id })
//           );
//         } else if (msg.method && msg.method === 'eth_blockNumber') {
//           socket.send(
//             JSON.stringify({ jsonrpc: '2.0', result: toHex(100), id: msg.id })
//           );
//         } else if (msg.method && msg.method === 'newHeads') {
//           socket.send(
//             JSON.stringify({ jsonrpc: '2.0', result: '0xdef', id: msg.id })
//           );
//         } else if (msg.method && msg.method === 'eth_subscribe') {
//           if (
//             options === undefined ||
//             options.ethSubscribeMessages === undefined ||
//             options.ethSubscribeIds === undefined
//           ) {
//             throw new Error('Expected mock return values for eth_subscribe');
//           }
//           const subId = options.ethSubscribeIds.shift();
//           const subMessages = options.ethSubscribeMessages.shift();
//           socket.send(
//             JSON.stringify({
//               jsonrpc: '2.0',
//               id: msg.id,
//               result: subId
//             })
//           );
//
//           for (const message of subMessages!) {
//             // Use `setImmediate()` to allow the first message to go through and
//             // be processed by the provider.
//             setImmediate(() =>
//               socket.send(
//                 JSON.stringify({
//                   jsonrpc: '2.0',
//                   method: 'eth_subscription',
//                   params: {
//                     result: message,
//                     subscription: subId
//                   }
//                 })
//               )
//             );
//           }
//         }
//       });
//     });
//   }
//
//   function initializeWebSocketProvider(): void {
//     AlchemyProvider.getAlchemyFetchRequest = jest.fn().mockReturnValue({
//       url: 'ws://localhost:1234'
//     } as any);
//     wsProvider = new AlchemyWebSocketProvider(
//       {
//         network: Network.ETH_MAINNET,
//         apiKey: 'demo',
//         maxRetries: 5
//       } as AlchemyConfig,
//       WebSocket
//     ) as Mocked<AlchemyWebSocketProvider>;
//   }
//
//   function expectSubscribeCalled(spy: SpyInstance, expected: any): void {
//     const subCalls = spy.mock.calls.filter(call => call[0] === 'eth_subscribe');
//     expect(subCalls.length).toBeGreaterThan(0);
//     expect(subCalls[0][1]).toEqual(expected);
//   }
//
//   function serverSendsMessage(
//     messages: Array<any>,
//     subId: string,
//     deferred: Deferred<void>
//   ): void {
//     for (const message of messages) {
//       // Use setImmediate to allow provder to pick up message.
//       setImmediate(() => {
//         mockServer.clients()[0].send(
//           JSON.stringify({
//             jsonrpc: '2.0',
//             method: 'eth_subscription',
//             params: {
//               result: message,
//               subscription: subId
//             }
//           })
//         );
//       });
//     }
//
//     if (deferred) {
//       setImmediate(() => deferred.resolve());
//     }
//   }
//
//   beforeEach(async () => {
//     mockServer = new Server('ws://localhost:1234');
//   });
//
//   afterEach(async () => {
//     await wsProvider.destroy();
//     mockServer.close();
//     jest.restoreAllMocks();
//   });
//
//   it('handles json-rpc requests', async () => {
//     const mockBlockNumber = 100;
//     setupMockServer();
//     initializeWebSocketProvider();
//     const res = await wsProvider.getBlockNumber();
//     expect(res).toEqual(mockBlockNumber);
//   });
//
//   it('initializes and removes socket listeners', async () => {
//     setupMockServer();
//     initializeWebSocketProvider();
//
//     // Verify there are 3 listeners: 'message', 'reopen', and 'down'
//     expect(
//       Object.values(wsProvider._websocket.listeners).flat().length
//     ).toEqual(3);
//     await wsProvider.destroy();
//
//     // Verify the 3 listeners have been removed.
//     expect(
//       Object.values(wsProvider._websocket.listeners).flat().length
//     ).toEqual(0);
//   });
//
//   it('accepts a hard URL override', async () => {
//     setupMockServer();
//     initializeWebSocketProvider();
//     const alchemy = new Alchemy({
//       apiKey: 'demo-key',
//       url: 'wss://hardcoded-url.com'
//     });
//     const provider = await alchemy.config.getWebSocketProvider();
//     expect(provider._websocket.url).toEqual('wss://hardcoded-url.com');
//     expect(provider.apiKey).toEqual('demo-key');
//   });
//
//   describe('newHeads/on(block)', () => {
//     it('handles default ethers subscriptions', done => {
//       const sendSpy = jest.spyOn(AlchemyWebSocketProvider.prototype, 'send');
//       setupMockServer({
//         ethSubscribeIds: ['0xabc'],
//         ethSubscribeMessages: [[{ number: toHex(100) }, { number: toHex(101) }]]
//       });
//       initializeWebSocketProvider();
//
//       let eventCount = 0;
//       const expected = [100, 101];
//       wsProvider.on('block', res => {
//         expect(res).toEqual(expected[eventCount]);
//         eventCount++;
//         if (eventCount === 2) {
//           expectSubscribeCalled(sendSpy, ['newHeads']);
//           done();
//         }
//       });
//     });
//
//     it('emits backfill and maps new virtual ids', done => {
//       // Test simulates:
//       // - Starting block number at 100 with 'newHeads' subscription.
//       // - Subscription returns block 100 then socket does down.
//       // - Backfill returns block 101, 102.
//       // - Virtual subscription returns block 103.
//       const ethSubscribeIds = ['0xabc', '0xdef'];
//       const ethSubscribeMessages = [
//         [makeNewHeadsEvent(100, 'a')],
//         [makeNewHeadsEvent(103, 'd')]
//       ];
//       setupMockServer({
//         ethSubscribeIds,
//         ethSubscribeMessages
//       });
//
//       mockBackfiller = jest
//         .spyOn(WebsocketBackfiller.prototype, 'getNewHeadsBackfill')
//         .mockImplementation(
//           (
//             _: () => boolean,
//             previousHeads: NewHeadsEvent[],
//             fromBlockNumber: number
//           ) => {
//             expect(previousHeads.length).toEqual(1);
//             expect(fromBlockNumber).toEqual(100);
//             return Promise.resolve([
//               makeNewHeadsEvent(101, 'b'),
//               makeNewHeadsEvent(102, 'c')
//             ]);
//           }
//         );
//       initializeWebSocketProvider();
//
//       const receivedHeads: number[] = [];
//       wsProvider.on('block', res => {
//         receivedHeads.push(res);
//         if (receivedHeads.length === 1) {
//           mockServer.clients()[0].close();
//         } else if (receivedHeads.length === 3) {
//           expect(mockBackfiller).toHaveBeenCalled();
//           expect(receivedHeads).toEqual([100, 101, 102]);
//         } else if (receivedHeads.length === 4) {
//           expect(receivedHeads).toEqual([100, 101, 102, 103]);
//           done();
//         }
//       });
//     });
//
//     it('buffers events when socket is down and dedupes after', done => {
//       // Test simulates
//       // - Starting block number at 100 with 'newHeads' subscription.
//       // - Subscription returns block 100 then socket does down.
//       // - Backfill begins.
//       // - Server sends blocks 101, 102 while backfill is happening
//       // - Backfill returns blocks 102, 103.
//       // - Verify that the block 101 is buffered and the block 102 is de-duped.
//       const ethSubscribeIds = ['0xabc', '0xdef'];
//       const ethSubscribeMessages = [[makeNewHeadsEvent(100, 'a')], []];
//       setupMockServer({
//         ethSubscribeIds,
//         ethSubscribeMessages
//       });
//
//       // Deferred promise that resolves after socket sends message on reopen
//       const serverMessageDeferred = new Deferred<void>();
//
//       // Deferred promise that resolves after provider enters backfill.
//       const backfillStartDeferred = new Deferred<void>();
//
//       const backfillHeads: NewHeadsEvent[] = [
//         makeNewHeadsEvent(101, 'b'),
//         makeNewHeadsEvent(102, 'c')
//       ];
//       mockBackfiller = jest
//         .spyOn(WebsocketBackfiller.prototype, 'getNewHeadsBackfill')
//         .mockImplementation(async () => {
//           backfillStartDeferred.resolve();
//           await serverMessageDeferred.promise;
//           return backfillHeads;
//         });
//       initializeWebSocketProvider();
//
//       const receivedHeads: number[] = [];
//       wsProvider.on('block', res => {
//         receivedHeads.push(res);
//         if (receivedHeads.length === 1) {
//           mockServer.clients()[0].close();
//
//           // Wait for backfill to start to send messages that should be buffered
//           void backfillStartDeferred.promise.then(() => {
//             serverSendsMessage(
//               [makeNewHeadsEvent(102, 'c'), makeNewHeadsEvent(103, 'd')],
//               '0xdef',
//               serverMessageDeferred
//             );
//           });
//         } else if (receivedHeads.length === 4) {
//           expect(receivedHeads).toEqual([100, 101, 102, 103]);
//           done();
//         }
//       });
//     });
//   });
//
//   describe('logs/on(filter)', () => {
//     const contractAddress = '0x65d25E3F2696B73b850daA07Dd1E267dCfa67F2D';
//
//     beforeEach(() => {
//       // Mock out the `Formatter` to avoid filling out all fields in mocks logs.
//       jest
//         .spyOn(Formatter.prototype, 'filterLog')
//         .mockImplementation((val: any) => val);
//     });
//
//     it('handles default ethers subscriptions', done => {
//       const sendSpy = jest.spyOn(AlchemyWebSocketProvider.prototype, 'send');
//       const logsEvents = [
//         makeLogsEvent(100, 'a', false),
//         makeLogsEvent(101, 'b', false)
//       ];
//       setupMockServer({
//         ethSubscribeIds: ['0xabc'],
//         ethSubscribeMessages: [logsEvents]
//       });
//       initializeWebSocketProvider();
//
//       let eventCount = 0;
//       wsProvider.on({ address: contractAddress }, res => {
//         expect(res).toEqual(logsEvents[eventCount]);
//         eventCount++;
//         if (eventCount === 2) {
//           expectSubscribeCalled(sendSpy, [
//             'logs',
//             { address: contractAddress }
//           ]);
//           done();
//         }
//       });
//     });
//
//     it('emits backfill and maps new virtual ids', done => {
//       // Test simulates:
//       // - Starting block number at 100 with 'logs' subscription.
//       // - Subscription returns log for 100 then socket does down.
//       // - Backfill returns block 100 (re-org), 101, 102
//       // - Virtual subscription returns log for 103.
//       const ethSubscribeIds = ['0xabc', '0xdef'];
//       const ethSubscribeMessages = [
//         [makeLogsEvent(100, 'a')],
//         [makeLogsEvent(103, 'd')]
//       ];
//       const logsForSubscription = [
//         makeLogsEvent(100, 'a'),
//         makeLogsEvent(103, 'd')
//       ];
//       const logsForBackfill = [
//         makeLogsEvent(100, 'a', true),
//         makeLogsEvent(100, "a'"),
//         makeLogsEvent(101, 'b'),
//         makeLogsEvent(102, 'c')
//       ];
//       setupMockServer({
//         ethSubscribeIds,
//         ethSubscribeMessages
//       });
//
//       mockBackfiller = jest
//         .spyOn(WebsocketBackfiller.prototype, 'getLogsBackfill')
//         .mockImplementation(
//           (
//             _: () => boolean,
//             filter: LogsSubscriptionFilter,
//             previousLogs: LogsEvent[],
//             fromBlockNumber: number
//           ) => {
//             expect(previousLogs.length).toEqual(1);
//             expect(filter).toEqual({ address: contractAddress });
//             expect(fromBlockNumber).toEqual(100);
//             return Promise.resolve(logsForBackfill);
//           }
//         );
//       initializeWebSocketProvider();
//
//       const receivedLogs: LogsEvent[] = [];
//       wsProvider.on({ address: contractAddress }, res => {
//         receivedLogs.push(res);
//         if (receivedLogs.length === 1) {
//           mockServer.clients()[0].close();
//         } else if (receivedLogs.length === 5) {
//           expect(mockBackfiller).toHaveBeenCalled();
//           expect(receivedLogs).toEqual([
//             logsForSubscription[0],
//             ...logsForBackfill
//           ]);
//         } else if (receivedLogs.length === 6) {
//           expect(receivedLogs).toEqual([
//             logsForSubscription[0],
//             ...logsForBackfill,
//             logsForSubscription[1]
//           ]);
//           done();
//         }
//       });
//     });
//
//     it('buffers events when socket is down and dedupes after', done => {
//       // Test simulates
//       // - Starting block number at 100 with 'logs' subscription.
//       // - Subscription returns logs 100 then socket does down.
//       // - Backfill begins.
//       // - Server sends logs for 101, 102 while backfill is happening
//       // - Backfill returns logs for 102, some of which are dupes.
//       // - Verify that the logs for 101 are buffered and the logs for block 102
//       //   are de-duped.
//       const ethSubscribeIds = ['0xabc', '0xdef'];
//       const ethSubscribeMessages = [[makeLogsEvent(100, 'a')], []];
//       setupMockServer({
//         ethSubscribeIds,
//         ethSubscribeMessages
//       });
//
//       // Deferred promise that resolves after socket sends message on reopen
//       const serverMessageDeferred = new Deferred<void>();
//
//       // Deferred promise that resolves after provider enters backfill.
//       const backfillStartDeferred = new Deferred<void>();
//
//       const backfillLogs: LogsEvent[] = [
//         makeLogsEvent(101, 'b'),
//         makeLogsEvent(102, 'c', false, 2),
//         makeLogsEvent(102, 'c', false, 3)
//       ];
//       mockBackfiller = jest
//         .spyOn(WebsocketBackfiller.prototype, 'getLogsBackfill')
//         .mockImplementation(async () => {
//           backfillStartDeferred.resolve();
//           await serverMessageDeferred.promise;
//           return backfillLogs;
//         });
//       initializeWebSocketProvider();
//
//       const expectedLogs = [
//         makeLogsEvent(100, 'a'),
//         makeLogsEvent(101, 'b'),
//         makeLogsEvent(102, 'c', false, 2),
//         makeLogsEvent(102, 'c', false, 3),
//         makeLogsEvent(102, 'c', false, 4)
//       ];
//       const receivedLogs: LogsEvent[] = [];
//       wsProvider.on({ address: contractAddress }, res => {
//         receivedLogs.push(res);
//         if (receivedLogs.length === 1) {
//           mockServer.clients()[0].close();
//
//           // Wait for backfill to start to send messages that should be buffered
//           void backfillStartDeferred.promise.then(() => {
//             serverSendsMessage(
//               [
//                 makeLogsEvent(102, 'c', false, 3),
//                 makeLogsEvent(102, 'c', false, 4)
//               ],
//               '0xdef',
//               serverMessageDeferred
//             );
//           });
//         } else if (receivedLogs.length === 5) {
//           expect(receivedLogs).toEqual(expectedLogs);
//           done();
//         }
//       });
//     });
//   });
//
//   describe('alchemy_pendingTransactions', () => {
//     it('handles default subscriptions', done => {
//       const sendSpy = jest.spyOn(AlchemyWebSocketProvider.prototype, 'send');
//       setupMockServer({
//         ethSubscribeIds: ['0xabc'],
//         // Can send dummy responses since we're only checking request params.
//         ethSubscribeMessages: [[{ blockNumber: 10 }, { blockNumber: 11 }]]
//       });
//       initializeWebSocketProvider();
//
//       let eventCount = 0;
//       const expected = [{ blockNumber: 10 }, { blockNumber: 11 }];
//       wsProvider.on(
//         {
//           method: AlchemySubscription.PENDING_TRANSACTIONS
//         },
//         res => {
//           expect(res).toEqual(expected[eventCount]);
//           eventCount++;
//           if (eventCount === 2) {
//             expectSubscribeCalled(sendSpy, [
//               AlchemySubscription.PENDING_TRANSACTIONS,
//               {}
//             ]);
//             done();
//           }
//         }
//       );
//     });
//
//     it('handles subscriptions with params', done => {
//       const contractAddress = '0x65d25E3F2696B73b850daA07Dd1E267dCfa67F2D';
//       const sendSpy = jest.spyOn(AlchemyWebSocketProvider.prototype, 'send');
//       setupMockServer({
//         ethSubscribeIds: ['0xabc'],
//         // Can send dummy responses since we're only checking request params.
//         ethSubscribeMessages: [[{ blockNumber: 10 }, { blockNumber: 11 }]]
//       });
//       initializeWebSocketProvider();
//
//       let eventCount = 0;
//       const expected = [{ blockNumber: 10 }, { blockNumber: 11 }];
//       wsProvider.on(
//         {
//           method: AlchemySubscription.PENDING_TRANSACTIONS,
//           toAddress: contractAddress,
//           hashesOnly: true
//         },
//         res => {
//           expect(res).toEqual(expected[eventCount]);
//           eventCount++;
//           if (eventCount === 2) {
//             expectSubscribeCalled(sendSpy, [
//               AlchemySubscription.PENDING_TRANSACTIONS,
//               { toAddress: contractAddress, hashesOnly: true }
//             ]);
//             done();
//           }
//         }
//       );
//     });
//
//     function verifyRoundTrip(
//       event: AlchemyPendingTransactionsEventFilter,
//       expected: string
//     ) {
//       const serialized = getAlchemyEventTag(event);
//       expect(serialized).toEqual(expected);
//       const deserialized = new EthersEvent(expected, noop, true);
//       expect(deserialized.fromAddress).toEqual(event.fromAddress);
//       expect(deserialized.toAddress).toEqual(event.toAddress);
//       expect(deserialized.hashesOnly).toEqual(event.hashesOnly);
//     }
//
//     it('serializes and deserializes event tag properly', () => {
//       setupMockServer();
//       initializeWebSocketProvider();
//       verifyRoundTrip(
//         {
//           method: AlchemySubscription.PENDING_TRANSACTIONS,
//           fromAddress: '0xABC',
//           hashesOnly: true
//         },
//         ALCHEMY_PENDING_TRANSACTIONS_EVENT_TYPE + ':0xABC:*:true'
//       );
//
//       verifyRoundTrip(
//         {
//           method: AlchemySubscription.PENDING_TRANSACTIONS,
//           toAddress: ['0xABC', '0xDEF'],
//           hashesOnly: false
//         },
//         ALCHEMY_PENDING_TRANSACTIONS_EVENT_TYPE + ':*:0xABC|0xDEF:false'
//       );
//
//       verifyRoundTrip(
//         { method: AlchemySubscription.PENDING_TRANSACTIONS },
//         ALCHEMY_PENDING_TRANSACTIONS_EVENT_TYPE + ':*:*:*'
//       );
//     });
//
//     it('throws error for non-recognized method fields', async () => {
//       setupMockServer();
//       initializeWebSocketProvider();
//       const contractAddress = '0x65d25E3F2696B73b850daA07Dd1E267dCfa67F2D';
//       expect(() =>
//         wsProvider.on(
//           {
//             method: 'alchemy_invalidMethod',
//             toAddress: contractAddress
//           },
//           noop
//         )
//       ).toThrow('Invalid method name');
//     });
//   });
//
//   describe('methods', () => {
//     it('once() supports alchemy event', async () => {
//       setupMockServer({
//         ethSubscribeIds: ['0xabc'],
//         ethSubscribeMessages: [
//           [
//             {
//               dummy: 'response'
//             }
//           ]
//         ]
//       });
//       initializeWebSocketProvider();
//       const result = new Deferred<void>();
//
//       wsProvider.once(
//         {
//           method: AlchemySubscription.PENDING_TRANSACTIONS,
//           fromAddress: '0xABC',
//           hashesOnly: true
//         },
//         res => {
//           expect(res).toEqual({ dummy: 'response' });
//           result.resolve();
//         }
//       );
//
//       // Check that the event was added to the list of subscribed events.
//       expect(wsProvider._events.length).toEqual(1);
//       await result.promise;
//       expect(wsProvider._events.length).toEqual(0);
//     });
//
//     it('off() supports alchemy event', () => {
//       setupMockServer();
//       initializeWebSocketProvider();
//       const event = {
//         method: AlchemySubscription.PENDING_TRANSACTIONS,
//         fromAddress: '0xABC'
//       };
//       const fn1 = (res: any) => {
//         JSON.stringify(res);
//       };
//       const fn2 = (res: any) => {
//         JSON.stringify(res).toLowerCase();
//       };
//       wsProvider.on(event, noop);
//       wsProvider.on(event, fn1);
//       wsProvider.on(event, fn2);
//       expect(wsProvider._events.length).toEqual(3);
//
//       // Specifying a listener deletes it.
//       wsProvider.off(event, fn1);
//       expect(wsProvider._events.length).toEqual(2);
//
//       // Omitting the listener deletes all remaining listeners.
//       wsProvider.off(event);
//       expect(wsProvider._events.length).toEqual(0);
//     });
//
//     it('removeAllListeners() supports alchemy event', () => {
//       setupMockServer();
//       initializeWebSocketProvider();
//       const event1 = {
//         method: AlchemySubscription.PENDING_TRANSACTIONS,
//         fromAddress: '0xABC'
//       };
//       const event2 = {
//         method: AlchemySubscription.PENDING_TRANSACTIONS,
//         fromAddress: '0xDEF'
//       };
//       const fn1 = (res: any) => {
//         JSON.stringify(res);
//       };
//       wsProvider.on(event1, noop);
//       wsProvider.on(event1, fn1);
//       wsProvider.on(event2, noop);
//
//       // Remove a specific listener
//       wsProvider.removeAllListeners(event1);
//       expect(wsProvider._events.length).toEqual(1);
//
//       // Remove all listeners
//       wsProvider.on(event1, noop);
//       wsProvider.removeAllListeners();
//       expect(wsProvider._events.length).toEqual(0);
//     });
//
//     it('listeners() and listenerCount() support alchemy event', async () => {
//       setupMockServer();
//       initializeWebSocketProvider();
//       const event1 = {
//         method: AlchemySubscription.PENDING_TRANSACTIONS,
//         fromAddress: '0xABC'
//       };
//       const event2 = {
//         method: AlchemySubscription.PENDING_TRANSACTIONS,
//         fromAddress: '0xDEF'
//       };
//       const fn1 = (res: any) => {
//         JSON.stringify(res);
//       };
//       wsProvider.on(event1, noop);
//       wsProvider.on(event1, fn1);
//       wsProvider.on(event2, noop);
//       expect((await wsProvider.listeners()).length).toEqual(3);
//       expect((await wsProvider.listeners(event1)).length).toEqual(2);
//       expect((await wsProvider.listeners(event2)).length).toEqual(1);
//
//       expect(await wsProvider.listenerCount()).toEqual(3);
//       expect(await wsProvider.listenerCount(event1)).toEqual(2);
//       expect(await wsProvider.listenerCount(event2)).toEqual(1);
//     });
//   });
//
//   describe('alchemy_minedTransactions', () => {
//     function verifyRoundTrip(
//       event: AlchemyMinedTransactionsEventFilter,
//       expected: string
//     ) {
//       const serialized = getAlchemyEventTag(event);
//       expect(serialized).toEqual(expected);
//       const deserialized = new EthersEvent(expected, noop, true);
//       expect(deserialized.addresses).toEqual(event.addresses);
//       expect(deserialized.includeRemoved).toEqual(event.includeRemoved);
//       expect(deserialized.hashesOnly).toEqual(event.hashesOnly);
//     }
//
//     it('handles subscriptions with params', done => {
//       const contractAddress = '0x65d25E3F2696B73b850daA07Dd1E267dCfa67F2D';
//       const sendSpy = jest.spyOn(AlchemyWebSocketProvider.prototype, 'send');
//       setupMockServer({
//         ethSubscribeIds: ['0xabc'],
//         // Can send dummy responses since we're only checking request params.
//         ethSubscribeMessages: [[{ blockNumber: 10 }, { blockNumber: 11 }]]
//       });
//       initializeWebSocketProvider();
//
//       let eventCount = 0;
//       const expected = [{ blockNumber: 10 }, { blockNumber: 11 }];
//       const addresses = [{ to: contractAddress }, { from: contractAddress }];
//       wsProvider.on(
//         {
//           method: AlchemySubscription.MINED_TRANSACTIONS,
//           addresses,
//           hashesOnly: true
//         },
//         (res: any) => {
//           expect(res).toEqual(expected[eventCount]);
//           eventCount++;
//           if (eventCount === 2) {
//             expectSubscribeCalled(sendSpy, [
//               AlchemySubscription.MINED_TRANSACTIONS,
//               { addresses, hashesOnly: true }
//             ]);
//             done();
//           }
//         }
//       );
//     });
//
//     it('serializes and deserializes event tag properly', () => {
//       setupMockServer();
//       initializeWebSocketProvider();
//       verifyRoundTrip(
//         {
//           method: AlchemySubscription.MINED_TRANSACTIONS
//         },
//         ALCHEMY_MINED_TRANSACTIONS_EVENT_TYPE + ':*:*:*'
//       );
//
//       verifyRoundTrip(
//         {
//           method: AlchemySubscription.MINED_TRANSACTIONS,
//           includeRemoved: false
//         },
//         ALCHEMY_MINED_TRANSACTIONS_EVENT_TYPE + ':*:false:*'
//       );
//
//       verifyRoundTrip(
//         {
//           method: AlchemySubscription.MINED_TRANSACTIONS,
//           hashesOnly: true
//         },
//         ALCHEMY_MINED_TRANSACTIONS_EVENT_TYPE + ':*:*:true'
//       );
//
//       verifyRoundTrip(
//         {
//           method: AlchemySubscription.MINED_TRANSACTIONS
//         },
//         ALCHEMY_MINED_TRANSACTIONS_EVENT_TYPE + ':*:*:*'
//       );
//
//       verifyRoundTrip(
//         {
//           method: AlchemySubscription.MINED_TRANSACTIONS,
//           addresses: [
//             {
//               to: '0xABC'
//             },
//             {
//               from: '0xDEF'
//             },
//             { to: '0x123', from: '0x456' }
//           ]
//         },
//         ALCHEMY_MINED_TRANSACTIONS_EVENT_TYPE +
//           ':0xABC,*|*,0xDEF|0x123,0x456:*:*'
//       );
//     });
//   });
// });

// describe('WS provider supports ENS resolution', () => {
//   const sdk = new Alchemy();
//   let wsNamespace: Mocked<WebSocketNamespace>;
//
//   const ens1 = 'ens1.eth';
//   const ens1Raw = '0xABC';
//   const ens2 = 'ens2.eth';
//   const ens2Raw = '0xDEF';
//
//   beforeEach(() => {
//     wsNamespace = sdk.ws as Mocked<WebSocketNamespace>;
//     wsNamespace._resolveNameOrError = jest.fn();
//   });
//
//   it('processes mined transactions', async () => {
//     const minedEvent: AlchemyMinedTransactionsEventFilter = {
//       method: AlchemySubscription.MINED_TRANSACTIONS,
//       addresses: [
//         {
//           to: ens1
//         },
//         {
//           from: ens2
//         },
//         {
//           to: ens1Raw,
//           from: ens2Raw
//         }
//       ]
//     };
//
//     wsNamespace._resolveNameOrError
//       .mockResolvedValueOnce(ens1Raw)
//       .mockResolvedValueOnce(ens2Raw)
//       .mockResolvedValueOnce(ens1Raw)
//       .mockResolvedValueOnce(ens2Raw);
//
//     const res = (await wsNamespace._resolveEnsAlchemyEvent(
//       minedEvent
//     )) as AlchemyMinedTransactionsEventFilter;
//     expect(res.addresses![0]).toEqual({ to: ens1Raw });
//     expect(res.addresses![1]).toEqual({ from: ens2Raw });
//     expect(res.addresses![2]).toEqual({ to: ens1Raw, from: ens2Raw });
//   });
//
//   it('processes pending transactions with string inputs', async () => {
//     const pendingEvent: AlchemyPendingTransactionsEventFilter = {
//       method: AlchemySubscription.PENDING_TRANSACTIONS,
//       fromAddress: ens1,
//       toAddress: ens2
//     };
//
//     wsNamespace._resolveNameOrError
//       .mockResolvedValueOnce(ens1Raw)
//       .mockResolvedValueOnce(ens2Raw);
//     const res = (await wsNamespace._resolveEnsAlchemyEvent(
//       pendingEvent
//     )) as AlchemyPendingTransactionsEventFilter;
//     expect(res.fromAddress).toEqual(ens1Raw);
//     expect(res.toAddress).toEqual(ens2Raw);
//   });
//
//   it('processes pending transactions with array inputs', async () => {
//     const pendingEvent: AlchemyPendingTransactionsEventFilter = {
//       method: AlchemySubscription.PENDING_TRANSACTIONS,
//       fromAddress: [ens1, ens2Raw],
//       toAddress: [ens2, ens1Raw]
//     };
//
//     wsNamespace._resolveNameOrError
//       .mockResolvedValueOnce(ens1Raw)
//       .mockResolvedValueOnce(ens2Raw)
//       .mockResolvedValueOnce(ens2Raw)
//       .mockResolvedValueOnce(ens1Raw);
//     const res = (await wsNamespace._resolveEnsAlchemyEvent(
//       pendingEvent
//     )) as AlchemyPendingTransactionsEventFilter;
//     expect(res.fromAddress).toEqual([ens1Raw, ens2Raw]);
//     expect(res.toAddress).toEqual([ens2Raw, ens1Raw]);
//   });
// });
