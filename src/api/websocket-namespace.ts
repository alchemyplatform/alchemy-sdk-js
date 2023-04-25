import type { Listener } from 'ethers';

import { isAlchemyEvent } from '../internal/ethers-event';
import {
  AlchemyEventType,
  AlchemyMinedTransactionsAddress,
  AlchemySubscription,
  NonEmptyArray
} from '../types/types';
import { AlchemyConfig } from './alchemy-config';

/**
 * The Websocket namespace contains all subscription related functions that
 * allow you to subscribe to events and receive updates as they occur. The
 * underlying WebSocket provider has additional logic to handle reconnections
 * and automatically backfills missed events.
 *
 * Do not call this constructor directly. Instead, instantiate an Alchemy object
 * with `const alchemy = new Alchemy(config)` and then access the core namespace
 * via `alchemy.ws`.
 */
export class WebSocketNamespace {
  /** @internal */
  constructor(private readonly config: AlchemyConfig) {}

  /**
   * Adds a listener to be triggered for each {@link eventName} event. Also
   * includes Alchemy's Subscription API events. See {@link AlchemyEventType} for
   * how to use them.
   *
   * @param eventName The event to listen for.
   * @param listener The listener to call when the event is triggered.
   * @public
   */
  on(eventName: AlchemyEventType, listener: Listener): this {
    void (async () => {
      const provider = await this.config.getWebSocketProvider();
      const processedEvent = await this._resolveEnsAlchemyEvent(eventName);
      // TODO(v6-ws): Connect everything again.
      (provider as any).on(processedEvent, listener);
    })();
    return this;
  }

  /**
   * Adds a listener to be triggered for only the next {@link eventName} event,
   * after which it will be removed. Also includes Alchemy's Subscription API
   * events. See {@link AlchemyEventType} for how to use them.
   *
   * @param eventName The event to listen for.
   * @param listener The listener to call when the event is triggered.
   * @public
   */
  once(eventName: AlchemyEventType, listener: Listener): this {
    void (async () => {
      const provider = await this.config.getWebSocketProvider();
      const processedEvent = await this._resolveEnsAlchemyEvent(eventName);
      // TODO(v6-ws): Connect everything again.
      (provider as any).once(processedEvent, listener);
    })();
    return this;
  }

  /**
   * Removes the provided {@link listener} for the {@link eventName} event. If no
   * listener is provided, all listeners for the event will be removed.
   *
   * @param eventName The event to unlisten to.
   * @param listener The listener to remove.
   * @public
   */
  off(eventName: AlchemyEventType, listener?: Listener): this {
    void (async () => {
      const provider = await this.config.getWebSocketProvider();
      const processedEvent = await this._resolveEnsAlchemyEvent(eventName);
      // TODO(v6-ws): Connect everything again.
      return (provider as any).off(processedEvent, listener);
    })();
    return this;
  }

  /**
   * Remove all listeners for the provided {@link eventName} event. If no event
   * is provided, all events and their listeners are removed.
   *
   * @param eventName The event to remove all listeners for.
   * @public
   */
  removeAllListeners(eventName?: AlchemyEventType): this {
    void (async () => {
      const provider = await this.config.getWebSocketProvider();
      const processedEvent = eventName
        ? await this._resolveEnsAlchemyEvent(eventName)
        : undefined;
      // TODO(v6-ws): Connect everything again.
      (provider as any).removeAllListeners(processedEvent);
    })();
    return this;
  }

  /**
   * Returns the number of listeners for the provided {@link eventName} event. If
   * no event is provided, the total number of listeners for all events is returned.
   *
   * @param eventName The event to get the number of listeners for.
   * @public
   */
  async listenerCount(eventName?: AlchemyEventType): Promise<number> {
    const provider = await this.config.getWebSocketProvider();
    const processedEvent = eventName
      ? await this._resolveEnsAlchemyEvent(eventName)
      : undefined;
    // TODO(v6-ws): Connect everything again.
    return (provider as any).listenerCount(processedEvent);
  }

  /**
   * Returns an array of listeners for the provided {@link eventName} event. If
   * no event is provided, all listeners will be included.
   *
   * @param eventName The event to get the listeners for.
   */
  async listeners(eventName?: AlchemyEventType): Promise<Listener[]> {
    const provider = await this.config.getWebSocketProvider();
    const processedEvent = eventName
      ? await this._resolveEnsAlchemyEvent(eventName)
      : undefined;
    // TODO(v6-ws): Connect everything again.
    return (provider as any).listeners(processedEvent);
  }

  /**
   * Converts ENS addresses in an Alchemy Event to the underlying resolved
   * address.
   *
   * VISIBLE ONLY FOR TESTING.
   *
   * @internal
   */
  async _resolveEnsAlchemyEvent(
    eventName: AlchemyEventType
  ): Promise<AlchemyEventType> {
    if (!isAlchemyEvent(eventName)) {
      return eventName;
    }

    if (
      eventName.method === AlchemySubscription.MINED_TRANSACTIONS &&
      eventName.addresses
    ) {
      const processedAddresses: AlchemyMinedTransactionsAddress[] = [];
      for (const address of eventName.addresses) {
        if (address.to) {
          address.to = await this._resolveNameOrError(address.to);
        }
        if (address.from) {
          address.from = await this._resolveNameOrError(address.from);
        }
        processedAddresses.push(address);
      }
      eventName.addresses =
        processedAddresses as NonEmptyArray<AlchemyMinedTransactionsAddress>;
    } else if (eventName.method === AlchemySubscription.PENDING_TRANSACTIONS) {
      if (eventName.fromAddress) {
        if (typeof eventName.fromAddress === 'string') {
          eventName.fromAddress = await this._resolveNameOrError(
            eventName.fromAddress
          );
        } else {
          eventName.fromAddress = await Promise.all(
            eventName.fromAddress.map(address =>
              this._resolveNameOrError(address)
            )
          );
        }
      }
      if (eventName.toAddress) {
        if (typeof eventName.toAddress === 'string') {
          eventName.toAddress = await this._resolveNameOrError(
            eventName.toAddress
          );
        } else {
          eventName.toAddress = await Promise.all(
            eventName.toAddress.map(address =>
              this._resolveNameOrError(address)
            )
          );
        }
      }
    }

    return eventName;
  }

  /**
   * Converts the provided ENS address or throws an error. This improves code
   * readability and type safety in other methods.
   *
   * VISIBLE ONLY FOR TESTING.
   *
   * @internal
   */
  async _resolveNameOrError(name: string): Promise<string> {
    const provider = await this.config.getProvider();
    const resolved = await provider.resolveName(name);
    if (resolved === null) {
      throw new Error(`Unable to resolve the ENS address: ${name}`);
    }
    return resolved;
  }
}
