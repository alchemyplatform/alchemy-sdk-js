import { AlchemySettings, Network } from '../types/types';
import type { AlchemyProvider } from './alchemy-provider';
import type { AlchemyWebSocketProvider } from './alchemy-websocket-provider';
/**
 * This class holds the config information for the SDK client instance and
 * exposes the underlying providers for more advanced use cases.
 *
 * @public
 */
export declare class AlchemyConfig {
    /** The Alchemy API key. */
    readonly apiKey: string;
    /** The Network that this SDK is associated with. */
    readonly network: Network;
    /** The maximum number of retries to perform. */
    readonly maxRetries: number;
    /** Setting to enable automatic batching on json-rpc requests. Defaults to false.*/
    readonly batchRequests: boolean;
    /**
     * The optional hardcoded URL to send requests to instead of using the network
     * and apiKey.
     */
    readonly url?: string;
    /** The optional Alchemy auth token to use when sending requests with the Notify API. */
    readonly authToken?: string;
    /**
     * The optional Request timeout provided in `ms` for NFT and NOTIFY API. Defaults to 0.
     */
    readonly requestTimeout?: number;
    constructor(config?: AlchemySettings);
    /**
     * Returns an AlchemyProvider instance. Only one provider is created per
     * Alchemy instance.
     *
     * The AlchemyProvider is a wrapper around ether's `AlchemyProvider` class and
     * has been expanded to support Alchemy's Enhanced APIs.
     *
     * Most common methods on the provider are available as top-level methods on
     * the {@link Alchemy} instance, but the provider is exposed here to access
     * other less-common methods.
     *
     * @public
     */
    getProvider(): Promise<AlchemyProvider>;
    /**
     * Returns an AlchemyWebsocketProvider instance. Only one provider is created
     * per Alchemy instance.
     *
     * The AlchemyWebSocketProvider is a wrapper around ether's
     * `AlchemyWebSocketProvider` class and has been expanded to support Alchemy's
     * Subscription APIs, automatic backfilling, and other performance improvements.
     *
     * Most common methods on the provider are available as top-level methods on
     * the {@link Alchemy} instance, but the provider is exposed here to access
     * other less-common methods.
     */
    getWebSocketProvider(): Promise<AlchemyWebSocketProvider>;
}
