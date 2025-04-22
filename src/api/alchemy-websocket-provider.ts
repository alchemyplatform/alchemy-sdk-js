import SturdyWebSocket from 'sturdy-websocket';

import { Listener } from '@ethersproject/abstract-provider';
import { BigNumber } from '@ethersproject/bignumber';
import {
  Networkish,
  getNetwork as getNetworkFromEthers
} from '@ethersproject/networks';
import { Network as NetworkFromEthers } from '@ethersproject/networks/lib/types';
import {
  CommunityResourcable,
  WebSocketProvider
} from '@ethersproject/providers';

import {
  EthersEvent,
  getAlchemyEventTag,
  isAlchemyEvent,
  verifyAlchemyEventName
} from '../internal/ethers-event';
import {
  ALCHEMY_EVENT_TYPES,
  ALCHEMY_MINED_TRANSACTIONS_EVENT_TYPE,
  ALCHEMY_PENDING_TRANSACTIONS_EVENT_TYPE,
  JsonRpcRequest,
  JsonRpcResponse,
  SingleOrBatchResponse,
  SubscriptionEvent,
  WebSocketMessage
} from '../internal/internal-types';
import {
  BatchPart,
  LogsEvent,
  LogsSubscriptionFilter,
  NewHeadsEvent,
  WebsocketBackfiller,
  dedupeLogs,
  dedupeNewHeads,
  throwIfCancelled
} from '../internal/websocket-backfiller';
import { AlchemyEventType, AlchemySubscription } from '../types/types';
import {
  CustomNetworks,
  DEFAULT_ALCHEMY_API_KEY,
  EthersNetwork,
  noop
} from '../util/const';
import { VERSION } from '../version';
import { AlchemyConfig } from './alchemy-config';
import { AlchemyProvider } from './alchemy-provider';
import { fromHex } from './util';

const HEARTBEAT_INTERVAL = 30000;
const HEARTBEAT_WAIT_TIME = 10000;
const BACKFILL_TIMEOUT = 60000;
const BACKFILL_RETRIES = 5;
/**
 * Subscriptions have a memory of recent events they have sent so that in the
 * event that they disconnect and need to backfill, they can detect re-orgs.
 * Keep a buffer that goes back at least these many blocks, the maximum amount
 * at which we might conceivably see a re-org.
 *
 * Note that while our buffer goes back this many blocks, it may contain more
 * than this many elements, since in the case of logs subscriptions more than
 * one event may be emitted for a block.
 */
const RETAINED_EVENT_BLOCK_COUNT = 10;

/**
 * SDK's custom implementation fo the ethers.js's 'AlchemyWebSocketProvider'.
 *
 * Do not call this constructor directly. Instead, instantiate an instance of
 * {@link Alchemy} and call {@link Alchemy.config.getWebSocketProvider()}.
 *
 * @public
 */
export class AlchemyWebSocketProvider
  extends WebSocketProvider
  implements CommunityResourcable
{
  _events: Array<EthersEvent> = [];
  readonly apiKey: string;

  // In the case of a WebSocket reconnection, all subscriptions are lost and we
  // create new ones to replace them, but we want to create the illusion that
  // the original subscriptions persist. Thus, maintain a mapping from the
  // "virtual" subscription ids which are visible to the consumer to the
  // "physical" subscription ids of the actual connections. This terminology is
  // borrowed from virtual and physical memory, which has a similar mapping.
  /** @internal */
  private readonly virtualSubscriptionsById: Map<string, VirtualSubscription> =
    new Map();
  /** @internal */
  private readonly virtualIdsByPhysicalId: Map<string, string> = new Map();
  /** @internal */
  private readonly backfiller: WebsocketBackfiller;
  /** @internal */
  private heartbeatIntervalId?: NodeJS.Timeout;
  /** @internal */
  private cancelBackfill: () => void;

  /** @internal */
  constructor(config: AlchemyConfig, wsConstructor?: any) {
    // Normalize the API Key to a string.
    const apiKey = AlchemyProvider.getApiKey(config.apiKey);

    // Generate our own connection info with the correct endpoint URLs.
    const alchemyNetwork = AlchemyProvider.getAlchemyNetwork(config.network);
    const connection = AlchemyProvider.getAlchemyConnectionInfo(
      alchemyNetwork,
      apiKey,
      'wss'
    );

    const protocol = `alchemy-sdk-${VERSION}`;

    // Use the provided config URL override if it exists, otherwise use the created one.
    const ws = new SturdyWebSocket(config.url ?? connection.url, protocol, {
      wsConstructor: wsConstructor ?? getWebsocketConstructor()
    });

    // Normalize the Alchemy named network input to the network names used by
    // ethers. This allows the parent super constructor in JsonRpcProvider to
    // correctly set the network.
    const ethersNetwork = EthersNetwork[alchemyNetwork];
    super(ws as any, ethersNetwork ?? undefined);
    this.apiKey = apiKey;

    // Start heartbeat and backfiller for the websocket connection.
    this.backfiller = new WebsocketBackfiller(this);
    this.addSocketListeners();
    this.startHeartbeat();
    this.cancelBackfill = noop;
  }

  /**
   * Overrides the `BaseProvider.getNetwork` method as implemented by ethers.js.
   *
   * This override allows the SDK to set the provider's network to values not
   * yet supported by ethers.js.
   *
   * @internal
   * @override
   */
  static getNetwork(network: Networkish): NetworkFromEthers {
    if (typeof network === 'string' && network in CustomNetworks) {
      return CustomNetworks[network];
    }

    // Call the standard ethers.js getNetwork method for other networks.
    return getNetworkFromEthers(network);
  }

  /**
   * Overridden implementation of ethers that includes Alchemy based subscriptions.
   *
   * @param eventName Event to subscribe to
   * @param listener The listener function to call when the event is triggered.
   * @override
   * @public
   */
  // TODO: Override `Listener` type to get type autocompletions.
  on(eventName: AlchemyEventType, listener: Listener): this {
    return this._addEventListener(eventName, listener, false);
  }

  /**
   * Overridden implementation of ethers that includes Alchemy based
   * subscriptions. Adds a listener to the triggered for only the next
   * {@link eventName} event, after which it will be removed.
   *
   * @param eventName Event to subscribe to
   * @param listener The listener function to call when the event is triggered.
   * @override
   * @public
   */
  // TODO: Override `Listener` type to get type autocompletions.
  once(eventName: AlchemyEventType, listener: Listener): this {
    return this._addEventListener(eventName, listener, true);
  }

  /**
   * Removes the provided {@link listener} for the {@link eventName} event. If no
   * listener is provided, all listeners for the event will be removed.
   *
   * @param eventName Event to unlisten to.
   * @param listener The listener function to remove.
   * @override
   * @public
   */
  off(eventName: AlchemyEventType, listener?: Listener): this {
    if (isAlchemyEvent(eventName)) {
      return this._off(eventName, listener);
    } else {
      return super.off(eventName, listener);
    }
  }

  /**
   * Remove all listeners for the provided {@link eventName} event. If no event
   * is provided, all events and their listeners are removed.
   *
   * @param eventName The event to remove all listeners for.
   * @override
   * @public
   */
  removeAllListeners(eventName?: AlchemyEventType): this {
    if (eventName !== undefined && isAlchemyEvent(eventName)) {
      return this._removeAllListeners(eventName);
    } else {
      return super.removeAllListeners(eventName);
    }
  }

  /**
   * Returns the number of listeners for the provided {@link eventName} event. If
   * no event is provided, the total number of listeners for all events is returned.
   *
   * @param eventName The event to get the number of listeners for.
   * @public
   * @override
   */
  listenerCount(eventName?: AlchemyEventType): number {
    if (eventName !== undefined && isAlchemyEvent(eventName)) {
      return this._listenerCount(eventName);
    } else {
      return super.listenerCount(eventName);
    }
  }

  /**
   * Returns an array of listeners for the provided {@link eventName} event. If
   * no event is provided, all listeners will be included.
   *
   * @param eventName The event to get the listeners for.
   * @public
   * @override
   */
  listeners(eventName?: AlchemyEventType): Array<Listener> {
    if (eventName !== undefined && isAlchemyEvent(eventName)) {
      return this._listeners(eventName);
    } else {
      return super.listeners(eventName);
    }
  }

  /**
   * Overrides the method in `BaseProvider` in order to properly format the
   * Alchemy subscription events.
   *
   * @internal
   * @override
   */
  _addEventListener(
    eventName: AlchemyEventType,
    listener: Listener,
    once: boolean
  ): this {
    if (isAlchemyEvent(eventName)) {
      verifyAlchemyEventName(eventName);
      const event = new EthersEvent(
        getAlchemyEventTag(eventName),
        listener,
        once
      );
      this._events.push(event);
      this._startEvent(event);
      return this;
    } else {
      return super._addEventListener(eventName, listener, once);
    }
  }

  /**
   * Overrides the `_startEvent()` method in ethers.js's
   * {@link WebSocketProvider} to include additional alchemy methods.
   *
   * @param event
   * @override
   * @internal
   */
  _startEvent(event: EthersEvent): void {
    // Check if the event type is a custom Alchemy subscription.
    const customLogicTypes = [...ALCHEMY_EVENT_TYPES, 'block', 'filter'];
    if (customLogicTypes.includes(event.type)) {
      this.customStartEvent(event);
    } else {
      super._startEvent(event);
    }
  }

  /**
   * Overridden from ethers.js's {@link WebSocketProvider}
   *
   * Modified in order to add mappings for backfilling.
   *
   * @internal
   * @override
   */
  async _subscribe(
    tag: string,
    param: Array<any>,
    processFunc: (result: any) => void,
    event?: EthersEvent
  ): Promise<void> {
    let subIdPromise = this._subIds[tag];

    // BEGIN MODIFIED CODE
    const startingBlockNumber = await this.getBlockNumber();
    // END MODIFIED CODE

    if (subIdPromise == null) {
      subIdPromise = Promise.all(param).then(param => {
        return this.send('eth_subscribe', param);
      });
      this._subIds[tag] = subIdPromise;
    }
    const subId = await subIdPromise;

    // BEGIN MODIFIED CODE
    const resolvedParams = await Promise.all(param);
    this.virtualSubscriptionsById.set(subId, {
      event: event!,
      method: 'eth_subscribe',
      params: resolvedParams,
      startingBlockNumber,
      virtualId: subId,
      physicalId: subId,
      sentEvents: [],
      isBackfilling: false,
      backfillBuffer: []
    });
    this.virtualIdsByPhysicalId.set(subId, subId);

    // END MODIFIED CODE

    this._subs[subId] = { tag, processFunc };
  }

  /**
   * DO NOT MODIFY.
   *
   * Original code copied over from ether.js's `BaseProvider`.
   *
   * This method is copied over directly in order to implement Alchemy's unique
   * subscription types. The only difference is that this method calls
   * {@link getAlchemyEventTag} instead of the original `getEventTag()` method in
   * order to parse the Alchemy subscription event.
   *
   * @internal
   * @override
   */
  emit(eventName: AlchemyEventType, ...args: Array<any>): boolean {
    if (isAlchemyEvent(eventName)) {
      let result = false;

      const stopped: Array<EthersEvent> = [];

      // This line is the only modified line from the original method.
      const eventTag = getAlchemyEventTag(eventName);

      this._events = this._events.filter(event => {
        if (event.tag !== eventTag) {
          return true;
        }

        setTimeout(() => {
          event.listener.apply(this, args);
        }, 0);

        result = true;

        if (event.once) {
          stopped.push(event);
          return false;
        }

        return true;
      });

      stopped.forEach(event => {
        this._stopEvent(event);
      });

      return result;
    } else {
      return super.emit(eventName, ...args);
    }
  }

  /** @internal */
  async sendBatch(parts: BatchPart[]): Promise<any[]> {
    let nextId = 0;
    const payload: JsonRpcRequest[] = parts.map(({ method, params }) => {
      return {
        method,
        params,
        jsonrpc: '2.0',
        id: `alchemy-sdk:${nextId++}`
      };
    });

    return this.sendBatchConcurrently(payload);
  }

  /** @override */
  destroy(): Promise<void> {
    this.removeSocketListeners();
    this.stopHeartbeatAndBackfill();
    return super.destroy();
  }

  /**
   * Overrides the ether's `isCommunityResource()` method. Returns true if the
   * current api key is the default key.
   *
   * @override
   */
  isCommunityResource(): boolean {
    return this.apiKey === DEFAULT_ALCHEMY_API_KEY;
  }

  /**
   * DO NOT MODIFY.
   *
   * Original code copied over from ether.js's `WebSocketProvider._stopEvent()`.
   *
   * This method is copied over directly in order to support Alchemy's
   * subscription type by allowing the provider to properly stop Alchemy's
   * subscription events.
   *
   * @internal
   */
  _stopEvent(event: EthersEvent): void {
    let tag = event.tag;

    // START MODIFIED CODE
    if (ALCHEMY_EVENT_TYPES.includes(event.type)) {
      // There are remaining pending transaction listeners.
      if (
        this._events.filter(e => ALCHEMY_EVENT_TYPES.includes(e.type)).length
      ) {
        return;
      }
      // END MODIFIED CODE
    } else if (event.type === 'tx') {
      // There are remaining transaction event listeners
      if (this._events.filter(e => e.type === 'tx').length) {
        return;
      }
      tag = 'tx';
    } else if (this.listenerCount(event.event)) {
      // There are remaining event listeners
      return;
    }

    const subId = this._subIds[tag];
    if (!subId) {
      return;
    }

    delete this._subIds[tag];
    void subId.then(subId => {
      if (!this._subs[subId]) {
        return;
      }
      delete this._subs[subId];
      void this.send('eth_unsubscribe', [subId]);
    });
  }

  /** @internal */
  private addSocketListeners(): void {
    this._websocket.addEventListener('message', this.handleMessage);
    this._websocket.addEventListener('reopen', this.handleReopen);
    this._websocket.addEventListener('down', this.stopHeartbeatAndBackfill);
  }

  /** @internal */
  private removeSocketListeners(): void {
    this._websocket.removeEventListener('message', this.handleMessage);
    this._websocket.removeEventListener('reopen', this.handleReopen);
    this._websocket.removeEventListener('down', this.stopHeartbeatAndBackfill);
  }

  /**
   * The underlying ethers {@link WebSocketProvider} already handles and emits
   * messages. To allow backfilling, track all messages that are emitted.
   *
   * This is a field arrow function in order to preserve `this` context when
   * passing the method as an event listener.
   *
   * @internal
   */
  private handleMessage = (event: MessageEvent): void => {
    const message: WebSocketMessage = JSON.parse(event.data);
    if (!isSubscriptionEvent(message)) {
      return;
    }
    const physicalId = message.params.subscription;
    const virtualId = this.virtualIdsByPhysicalId.get(physicalId);
    if (!virtualId) {
      return;
    }
    const subscription = this.virtualSubscriptionsById.get(virtualId)!;
    if (subscription.method !== 'eth_subscribe') {
      return;
    }

    switch (subscription.params[0]) {
      case 'newHeads': {
        const newHeadsSubscription = subscription as NewHeadsSubscription;
        const newHeadsMessage = message as SubscriptionEvent<NewHeadsEvent>;
        const { isBackfilling, backfillBuffer } = newHeadsSubscription;
        const { result } = newHeadsMessage.params;
        if (isBackfilling) {
          addToNewHeadsEventsBuffer(backfillBuffer, result);
        } else if (physicalId !== virtualId) {
          // In the case of a re-opened subscription, ethers will not emit the
          // event, so the SDK has to.
          this.emitAndRememberEvent(virtualId, result, getNewHeadsBlockNumber);
        } else {
          // Ethers subscription mapping will emit the event, just store it.
          this.rememberEvent(virtualId, result, getNewHeadsBlockNumber);
        }
        break;
      }
      case 'logs': {
        const logsSubscription = subscription as LogsSubscription;
        const logsMessage = message as SubscriptionEvent<LogsEvent>;
        const { isBackfilling, backfillBuffer } = logsSubscription;
        const { result } = logsMessage.params;
        if (isBackfilling) {
          addToLogsEventsBuffer(backfillBuffer, result);
        } else if (virtualId !== physicalId) {
          this.emitAndRememberEvent(virtualId, result, getLogsBlockNumber);
        } else {
          this.rememberEvent(virtualId, result, getLogsBlockNumber);
        }
        break;
      }
      default:
        if (physicalId !== virtualId) {
          // In the case of a re-opened subscription, ethers will not emit the
          // event, so the SDK has to.
          const { result } = (message as SubscriptionEvent<unknown>).params;
          this.emitEvent(virtualId, result);
        }
    }
  };

  /**
   * When the websocket connection reopens:
   *
   * 1. Resubscribe to all existing subscriptions and start backfilling
   * 2. Restart heart beat.
   *
   * This is a field arrow function in order to preserve `this` context when
   * passing the method as an event listener.
   *
   * @internal
   */
  private handleReopen = () => {
    this.virtualIdsByPhysicalId.clear();
    const { cancel, isCancelled } = makeCancelToken();
    this.cancelBackfill = cancel;
    for (const subscription of this.virtualSubscriptionsById.values()) {
      void (async () => {
        try {
          await this.resubscribeAndBackfill(isCancelled, subscription);
        } catch (error) {
          if (!isCancelled()) {
            console.error(
              `Error while backfilling "${subscription.params[0]}" subscription. Some events may be missing.`,
              error
            );
          }
        }
      })();
    }
    this.startHeartbeat();
  };

  /**
   * Reopens the backfill based on
   *
   * @param isCancelled
   * @param subscription
   * @internal
   */
  private async resubscribeAndBackfill(
    isCancelled: () => boolean,
    subscription: VirtualSubscription
  ): Promise<void> {
    const {
      virtualId,
      method,
      params,
      sentEvents,
      backfillBuffer,
      startingBlockNumber
    } = subscription;
    subscription.isBackfilling = true;
    backfillBuffer.length = 0;
    try {
      const physicalId = await this.send(method, params);
      throwIfCancelled(isCancelled);
      subscription.physicalId = physicalId;
      this.virtualIdsByPhysicalId.set(physicalId, virtualId);
      switch (params[0]) {
        case 'newHeads': {
          const backfillEvents = await withBackoffRetries(
            () =>
              withTimeout(
                this.backfiller.getNewHeadsBackfill(
                  isCancelled,
                  sentEvents,
                  startingBlockNumber
                ),
                BACKFILL_TIMEOUT
              ),
            BACKFILL_RETRIES,
            () => !isCancelled()
          );
          throwIfCancelled(isCancelled);
          const events = dedupeNewHeads([...backfillEvents, ...backfillBuffer]);
          events.forEach(event => this.emitNewHeadsEvent(virtualId, event));
          break;
        }
        case 'logs': {
          const filter: LogsSubscriptionFilter = params[1] || {};
          const backfillEvents = await withBackoffRetries(
            () =>
              withTimeout(
                this.backfiller.getLogsBackfill(
                  isCancelled,
                  filter,
                  sentEvents,
                  startingBlockNumber
                ),
                BACKFILL_TIMEOUT
              ),
            BACKFILL_RETRIES,
            () => !isCancelled()
          );
          throwIfCancelled(isCancelled);
          const events = dedupeLogs([...backfillEvents, ...backfillBuffer]);
          events.forEach(event => this.emitLogsEvent(virtualId, event));
          break;
        }
        default:
          break;
      }
    } finally {
      subscription.isBackfilling = false;
      backfillBuffer.length = 0;
    }
  }

  /**
   * Cancels the heartbeat and any pending backfills being performed. This is
   * called when the websocket connection goes down or is disconnected.
   *
   * This is a field arrow function in order to preserve `this` context when
   * passing the method as an event listener.
   *
   * @internal
   */
  private stopHeartbeatAndBackfill = () => {
    if (this.heartbeatIntervalId != null) {
      clearInterval(this.heartbeatIntervalId);
      this.heartbeatIntervalId = undefined;
    }
    this.cancelBackfill();
  };

  /** @internal */
  private emitNewHeadsEvent(virtualId: string, result: NewHeadsEvent): void {
    this.emitAndRememberEvent(virtualId, result, getNewHeadsBlockNumber);
  }

  /** @internal */
  private emitLogsEvent(virtualId: string, result: LogsEvent): void {
    this.emitAndRememberEvent(virtualId, result, getLogsBlockNumber);
  }

  /**
   * Emits an event to consumers, but also remembers it in its subscriptions's
   * `sentEvents` buffer so that we can detect re-orgs if the connection drops
   * and needs to be reconnected.
   *
   * @internal
   */
  private emitAndRememberEvent<T>(
    virtualId: string,
    result: T,
    getBlockNumber: (result: T) => number
  ): void {
    this.rememberEvent(virtualId, result, getBlockNumber);
    this.emitEvent(virtualId, result);
  }

  private emitEvent<T>(virtualId: string, result: T): void {
    const subscription = this.virtualSubscriptionsById.get(virtualId);
    if (!subscription) {
      return;
    }
    this.emitGenericEvent(subscription, result);
  }

  /** @internal */
  private rememberEvent<T>(
    virtualId: string,
    result: T,
    getBlockNumber: (result: T) => number
  ): void {
    const subscription = this.virtualSubscriptionsById.get(virtualId);
    if (!subscription) {
      return;
    }
    // Web3 modifies these event objects once we pass them on (changing hex
    // numbers to numbers). We want the original event, so make a defensive
    // copy.
    addToPastEventsBuffer(
      subscription.sentEvents,
      { ...result },
      getBlockNumber
    );
  }

  /** @internal */
  private emitGenericEvent(
    subscription: VirtualSubscription,
    result: any
  ): void {
    const emitFunction = this.emitProcessFn(subscription.event);
    emitFunction(result);
  }

  /**
   * Starts a heartbeat that pings the websocket server periodically to ensure
   * that the connection stays open.
   *
   * @internal
   */
  private startHeartbeat(): void {
    if (this.heartbeatIntervalId != null) {
      return;
    }
    this.heartbeatIntervalId = setInterval(async () => {
      try {
        await withTimeout(this.send('net_version'), HEARTBEAT_WAIT_TIME);
      } catch {
        this._websocket.reconnect();
      }
    }, HEARTBEAT_INTERVAL);
  }

  /**
   * This method sends the batch concurrently as individual requests rather than
   * as a batch, which was the original implementation. The original batch logic
   * is preserved in this implementation in order for faster porting.
   *
   * @param payload
   * @internal
   */
  // TODO(cleanup): Refactor and remove usages of `sendBatch()`.
  // TODO(errors): Use allSettled() once we have more error handling.
  private async sendBatchConcurrently(
    payload: JsonRpcRequest[]
  ): Promise<unknown[]> {
    return Promise.all(payload.map(req => this.send(req.method, req.params)));
  }

  /** @internal */
  private customStartEvent(event: EthersEvent): void {
    if (event.type === ALCHEMY_PENDING_TRANSACTIONS_EVENT_TYPE) {
      const { fromAddress, toAddress, hashesOnly } = event;
      void this._subscribe(
        event.tag,
        [
          AlchemySubscription.PENDING_TRANSACTIONS,
          { fromAddress, toAddress, hashesOnly }
        ],
        this.emitProcessFn(event),
        event
      );
    } else if (event.type === ALCHEMY_MINED_TRANSACTIONS_EVENT_TYPE) {
      const { addresses, includeRemoved, hashesOnly } = event;
      void this._subscribe(
        event.tag,
        [
          AlchemySubscription.MINED_TRANSACTIONS,
          { addresses, includeRemoved, hashesOnly }
        ],
        this.emitProcessFn(event),
        event
      );
    } else if (event.type === 'block') {
      void this._subscribe(
        'block',
        ['newHeads'],
        this.emitProcessFn(event),
        event
      );
    } else if (event.type === 'filter') {
      void this._subscribe(
        event.tag,
        ['logs', this._getFilter(event.filter)],
        this.emitProcessFn(event),
        event
      );
    }
  }

  /** @internal */
  private emitProcessFn(event: EthersEvent): (result: any) => void {
    switch (event.type) {
      case ALCHEMY_PENDING_TRANSACTIONS_EVENT_TYPE:
        return result =>
          this.emit(
            {
              method: AlchemySubscription.PENDING_TRANSACTIONS,
              fromAddress: event.fromAddress,
              toAddress: event.toAddress,
              hashesOnly: event.hashesOnly
            },
            result
          );
      case ALCHEMY_MINED_TRANSACTIONS_EVENT_TYPE:
        return result =>
          this.emit(
            {
              method: AlchemySubscription.MINED_TRANSACTIONS,
              addresses: event.addresses,
              includeRemoved: event.includeRemoved,
              hashesOnly: event.hashesOnly
            },
            result
          );
      case 'block':
        return result => {
          const blockNumber = BigNumber.from(result.number).toNumber();
          this._emitted.block = blockNumber;
          this.emit('block', blockNumber);
        };
      case 'filter':
        return result => {
          if (result.removed == null) {
            result.removed = false;
          }
          this.emit(event.filter, this.formatter.filterLog(result));
        };
      default:
        throw new Error('Invalid event type to `emitProcessFn()`');
    }
  }

  /**
   * DO NOT MODIFY.
   *
   * Original code copied over from ether.js's `BaseProvider.off()`.
   *
   * This method is copied over directly in order to implement Alchemy's unique
   * subscription types. The only difference is that this method calls
   * {@link getAlchemyEventTag} instead of the original `getEventTag()` method in
   * order to parse the Alchemy subscription event.
   *
   * @private
   */
  private _off(eventName: AlchemyEventType, listener?: Listener): this {
    if (listener == null) {
      return this.removeAllListeners(eventName);
    }

    const stopped: Array<EthersEvent> = [];

    let found = false;
    const eventTag = getAlchemyEventTag(eventName);
    this._events = this._events.filter(event => {
      if (event.tag !== eventTag || event.listener != listener) {
        return true;
      }
      if (found) {
        return true;
      }
      found = true;
      stopped.push(event);
      return false;
    });

    stopped.forEach(event => {
      this._stopEvent(event);
    });

    return this;
  }

  /**
   * DO NOT MODIFY.
   *
   * Original code copied over from ether.js's `BaseProvider.removeAllListeners()`.
   *
   * This method is copied over directly in order to implement Alchemy's unique
   * subscription types. The only difference is that this method calls
   * {@link getAlchemyEventTag} instead of the original `getEventTag()` method in
   * order to parse the Alchemy subscription event.
   *
   * @private
   */
  private _removeAllListeners(eventName: AlchemyEventType): this {
    let stopped: Array<EthersEvent> = [];
    if (eventName == null) {
      stopped = this._events;

      this._events = [];
    } else {
      const eventTag = getAlchemyEventTag(eventName);
      this._events = this._events.filter(event => {
        if (event.tag !== eventTag) {
          return true;
        }
        stopped.push(event);
        return false;
      });
    }

    stopped.forEach(event => {
      this._stopEvent(event);
    });

    return this;
  }

  /**
   * DO NOT MODIFY.
   *
   * Original code copied over from ether.js's `BaseProvider.listenerCount()`.
   *
   * This method is copied over directly in order to implement Alchemy's unique
   * subscription types. The only difference is that this method calls
   * {@link getAlchemyEventTag} instead of the original `getEventTag()` method in
   * order to parse the Alchemy subscription event.
   *
   * @private
   */
  private _listenerCount(eventName?: AlchemyEventType): number {
    if (!eventName) {
      return this._events.length;
    }

    const eventTag = getAlchemyEventTag(eventName);
    return this._events.filter(event => {
      return event.tag === eventTag;
    }).length;
  }

  /**
   * DO NOT MODIFY.
   *
   * Original code copied over from ether.js's `BaseProvider.listeners()`.
   *
   * This method is copied over directly in order to implement Alchemy's unique
   * subscription types. The only difference is that this method calls
   * {@link getAlchemyEventTag} instead of the original `getEventTag()` method in
   * order to parse the Alchemy subscription event.
   *
   * @private
   */
  private _listeners(eventName?: AlchemyEventType): Array<Listener> {
    if (eventName == null) {
      return this._events.map(event => event.listener);
    }

    const eventTag = getAlchemyEventTag(eventName);
    return this._events
      .filter(event => event.tag === eventTag)
      .map(event => event.listener);
  }
}

function getWebsocketConstructor(): any {
  return isNodeEnvironment() ? require('websocket').w3cwebsocket : WebSocket;
}

function isNodeEnvironment(): boolean {
  return (
    typeof process !== 'undefined' &&
    process != null &&
    process.versions != null &&
    process.versions.node != null
  );
}

/** @internal */
interface CancelToken {
  cancel(): void;
  isCancelled(): boolean;
}

interface VirtualSubscription {
  event: EthersEvent;
  virtualId: string;
  physicalId: string;
  method: string;
  params: any[];
  isBackfilling: boolean;
  startingBlockNumber: number;
  sentEvents: any[];
  backfillBuffer: any[];
}

interface NewHeadsSubscription extends VirtualSubscription {
  method: 'eth_subscribe';
  params: ['newHeads'];
  isBackfilling: boolean;
  sentEvents: NewHeadsEvent[];
  backfillBuffer: NewHeadsEvent[];
}

interface LogsSubscription extends VirtualSubscription {
  method: 'eth_subscribe';
  params: ['logs', LogsSubscriptionFilter?];
  isBackfilling: boolean;
  sentEvents: LogsEvent[];
  backfillBuffer: LogsEvent[];
}

// TODO(cleanup): Use class variable rather than passing `isCancelled` everywhere.
function makeCancelToken(): CancelToken {
  let cancelled = false;
  return { cancel: () => (cancelled = true), isCancelled: () => cancelled };
}

// TODO(cleanup): replace with SDK's backoff implementation
const MIN_RETRY_DELAY = 1000;
const RETRY_BACKOFF_FACTOR = 2;
const MAX_RETRY_DELAY = 30000;

async function withBackoffRetries<T>(
  f: () => Promise<T>,
  retryCount: number,
  shouldRetry: (error: unknown) => boolean = () => true
): Promise<T> {
  let nextWaitTime = 0;
  let i = 0;
  while (true) {
    try {
      return await f();
    } catch (error) {
      i++;
      if (i >= retryCount || !shouldRetry(error)) {
        throw error;
      }
      await delay(nextWaitTime);
      if (!shouldRetry(error)) {
        throw error;
      }
      nextWaitTime =
        nextWaitTime === 0
          ? MIN_RETRY_DELAY
          : Math.min(MAX_RETRY_DELAY, RETRY_BACKOFF_FACTOR * nextWaitTime);
    }
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    )
  ]);
}

function getNewHeadsBlockNumber(event: NewHeadsEvent): number {
  return fromHex(event.number);
}

function getLogsBlockNumber(event: LogsEvent): number {
  return fromHex(event.blockNumber);
}

function isResponse(
  message: WebSocketMessage
): message is SingleOrBatchResponse {
  return (
    Array.isArray(message) ||
    (message.jsonrpc === '2.0' && (message as JsonRpcResponse).id !== undefined)
  );
}

function isSubscriptionEvent(
  message: WebSocketMessage
): message is SubscriptionEvent {
  return !isResponse(message);
}

function addToNewHeadsEventsBuffer(
  pastEvents: NewHeadsEvent[],
  event: NewHeadsEvent
): void {
  addToPastEventsBuffer(pastEvents, event, getNewHeadsBlockNumber);
}

function addToLogsEventsBuffer(
  pastEvents: LogsEvent[],
  event: LogsEvent
): void {
  addToPastEventsBuffer(pastEvents, event, getLogsBlockNumber);
}

/**
 * Adds a new event to an array of events, evicting any events which are so old
 * that they will no longer feasibly be part of a reorg.
 */
function addToPastEventsBuffer<T>(
  pastEvents: T[],
  event: T,
  getBlockNumber: (event: T) => number
): void {
  const currentBlockNumber = getBlockNumber(event);
  // Find first index of an event recent enough to retain, then drop everything
  // at a lower index.
  const firstGoodIndex = pastEvents.findIndex(
    e => getBlockNumber(e) > currentBlockNumber - RETAINED_EVENT_BLOCK_COUNT
  );
  if (firstGoodIndex === -1) {
    pastEvents.length = 0;
  } else {
    pastEvents.splice(0, firstGoodIndex);
  }
  pastEvents.push(event);
}
