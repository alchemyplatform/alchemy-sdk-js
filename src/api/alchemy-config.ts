import { AlchemySettings, Network } from '../types/types';
import {
  AlchemyApiType,
  DEFAULT_ALCHEMY_API_KEY,
  DEFAULT_MAX_RETRIES,
  DEFAULT_NETWORK,
  getAlchemyHttpUrl,
  getAlchemyNftHttpUrl,
  getAlchemyWebhookHttpUrl
} from '../util/const';
import type { AlchemyProvider } from './alchemy-provider';
import type { AlchemyWebSocketProvider } from './alchemy-websocket-provider';

/**
 * This class holds the config information for the SDK client instance and
 * exposes the underlying providers for more advanced use cases.
 *
 * @public
 */
export class AlchemyConfig {
  /** The Alchemy API key. */
  readonly apiKey: string;

  /** The Network that this SDK is associated with. */
  readonly network: Network;

  /** The maximum number of retries to perform. */
  readonly maxRetries: number;

  /** User-provided setting to enable automatic batching. */
  readonly optimizedBatching: boolean;

  /**
   * The optional hardcoded URL to send requests to instead of using the network
   * and apiKey.
   */
  readonly url?: string;

  /** The optional Alchemy auth token to use when sending requests with the Notify API. */
  readonly authToken?: string;

  /**
   * Dynamically imported provider instance.
   *
   * @internal
   */
  private _baseAlchemyProvider: Promise<AlchemyProvider> | undefined;

  /**
   * Dynamically imported provider instance.
   *
   * @internal
   */
  private _baseAlchemyWssProvider:
    | Promise<AlchemyWebSocketProvider>
    | undefined;

  constructor(config?: AlchemySettings) {
    this.apiKey = config?.apiKey || DEFAULT_ALCHEMY_API_KEY;
    this.network = config?.network || DEFAULT_NETWORK;
    this.maxRetries = config?.maxRetries || DEFAULT_MAX_RETRIES;
    this.url = config?.url;
    this.authToken = config?.authToken;
    this.optimizedBatching = config?.optimizedBatching || false;
  }

  /**
   * Returns the URL endpoint to send the HTTP request to. If a custom URL was
   * provided in the config, that URL is returned. Otherwise, the default URL is
   * from the network and API key.
   *
   * @param apiType - The type of API to get the URL for.
   * @internal
   */
  _getRequestUrl(apiType: AlchemyApiType): string {
    if (this.url !== undefined) {
      return this.url;
    } else if (apiType === AlchemyApiType.NFT) {
      return getAlchemyNftHttpUrl(this.network, this.apiKey);
    } else if (apiType === AlchemyApiType.WEBHOOK) {
      return getAlchemyWebhookHttpUrl();
    } else {
      return getAlchemyHttpUrl(this.network, this.apiKey);
    }
  }

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
  getProvider(): Promise<AlchemyProvider> {
    if (!this._baseAlchemyProvider) {
      this._baseAlchemyProvider = (async () => {
        const { AlchemyProvider } = await import('./alchemy-provider');
        return new AlchemyProvider(this);
      })();
    }
    return this._baseAlchemyProvider;
  }

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
  getWebSocketProvider(): Promise<AlchemyWebSocketProvider> {
    if (!this._baseAlchemyWssProvider) {
      this._baseAlchemyWssProvider = (async () => {
        const { AlchemyWebSocketProvider } = await import(
          './alchemy-websocket-provider'
        );
        return new AlchemyWebSocketProvider(this);
      })();
    }
    return this._baseAlchemyWssProvider;
  }
}
