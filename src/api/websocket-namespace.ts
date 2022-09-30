import { AlchemyEventType } from '../types/types';
import type { Listener } from '@ethersproject/abstract-provider';
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
      provider.on(eventName, listener);
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
      provider.once(eventName, listener);
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
      return provider.off(eventName, listener);
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
      provider.removeAllListeners(eventName);
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
    return provider.listenerCount(eventName);
  }

  /**
   * Returns an array of listeners for the provided {@link eventName} event. If
   * no event is provided, all listeners will be included.
   *
   * @param eventName The event to get the listeners for.
   */
  async listeners(eventName?: AlchemyEventType): Promise<Listener[]> {
    const provider = await this.config.getWebSocketProvider();
    return provider.listeners(eventName);
  }
}
