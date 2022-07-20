import { AlchemySettings } from '../types/types';
import { NftNamespace } from './nft-namespace';
import { WebSocketNamespace } from './websocket-namespace';
import { AlchemyConfig } from './alchemy-config';
import { CoreNamespace } from './core-namespace';

/**
 * The Alchemy SDK client. This class is the main entry point into Alchemy's
 * APIs and separates functionality into different modules.
 *
 * Each SDK instance is associated with a specific network and API key. To use a
 * different network or API key, create a new instance of {@link Alchemy}.
 *
 * @public
 */
export class Alchemy {
  /**
   * The `core` namespace contains the core eth json-rpc calls and Alchemy's
   * Enhanced APIs.
   */
  readonly core: CoreNamespace;

  /** The `nft` namespace contains methods for Alchemy's NFT API. */
  readonly nft: NftNamespace;

  /** The `ws` namespace contains methods for using WebSockets and creating subscriptions. */
  readonly ws: WebSocketNamespace;

  /**
   * Holds the setting information for the instance of the Alchemy SDK client
   * and allows access to the underlying providers.
   */
  readonly config: AlchemyConfig;

  /**
   * @param {string} [settings.apiKey] - The API key to use for Alchemy
   * @param {Network} [settings.network] - The network to use for Alchemy
   * @param {number} [settings.maxRetries] - The maximum number of retries to attempt
   * @public
   */
  constructor(settings?: AlchemySettings) {
    this.config = new AlchemyConfig(settings);

    this.core = new CoreNamespace(this.config);
    this.nft = new NftNamespace(this.config);
    this.ws = new WebSocketNamespace(this.config);
  }
}
