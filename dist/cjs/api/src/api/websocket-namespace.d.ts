import type { Listener } from '@ethersproject/abstract-provider';
import { AlchemyEventType } from '../types/types';
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
export declare class WebSocketNamespace {
    private readonly config;
    /**
     * Adds a listener to be triggered for each {@link eventName} event. Also
     * includes Alchemy's Subscription API events. See {@link AlchemyEventType} for
     * how to use them.
     *
     * @param eventName The event to listen for.
     * @param listener The listener to call when the event is triggered.
     * @public
     */
    on(eventName: AlchemyEventType, listener: Listener): this;
    /**
     * Adds a listener to be triggered for only the next {@link eventName} event,
     * after which it will be removed. Also includes Alchemy's Subscription API
     * events. See {@link AlchemyEventType} for how to use them.
     *
     * @param eventName The event to listen for.
     * @param listener The listener to call when the event is triggered.
     * @public
     */
    once(eventName: AlchemyEventType, listener: Listener): this;
    /**
     * Removes the provided {@link listener} for the {@link eventName} event. If no
     * listener is provided, all listeners for the event will be removed.
     *
     * @param eventName The event to unlisten to.
     * @param listener The listener to remove.
     * @public
     */
    off(eventName: AlchemyEventType, listener?: Listener): this;
    /**
     * Remove all listeners for the provided {@link eventName} event. If no event
     * is provided, all events and their listeners are removed.
     *
     * @param eventName The event to remove all listeners for.
     * @public
     */
    removeAllListeners(eventName?: AlchemyEventType): this;
    /**
     * Returns the number of listeners for the provided {@link eventName} event. If
     * no event is provided, the total number of listeners for all events is returned.
     *
     * @param eventName The event to get the number of listeners for.
     * @public
     */
    listenerCount(eventName?: AlchemyEventType): Promise<number>;
    /**
     * Returns an array of listeners for the provided {@link eventName} event. If
     * no event is provided, all listeners will be included.
     *
     * @param eventName The event to get the listeners for.
     */
    listeners(eventName?: AlchemyEventType): Promise<Listener[]>;
}
