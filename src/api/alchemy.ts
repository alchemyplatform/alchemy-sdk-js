import { AlchemySettings } from '../types/types';
import { AlchemyConfig } from './alchemy-config';
import { CoreNamespace } from './core-namespace';
import { DebugNamespace } from './debug-namespace';
import { NftNamespace } from './nft-namespace';
import { NotifyNamespace } from './notify-namespace';
import { PortfolioNamespace } from './portfolio-namespace';
import { PricesNamespace } from './prices-namespace';
import { TransactNamespace } from './transact-namespace';
import { WebSocketNamespace } from './websocket-namespace';

/**
 * The Alchemy SDK client. This class is the main entry point into Alchemy's
 * APIs and separates functionality into different namespaces.
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
   * The `transact` namespace contains methods for sending transactions and
   * checking on the state of submitted transasctions.
   */
  readonly transact: TransactNamespace;

  /**
   * Holds the setting information for the instance of the Alchemy SDK client
   * and allows access to the underlying providers.
   */
  readonly config: AlchemyConfig;

  /**
   * The `notify` namespace contains methods for creating and managing webhooks
   * as part of the Notify API.
   */
  readonly notify: NotifyNamespace;

  /**
   * The `debug` namespace contains methods for inspecting and debugging
   * transactions.
   */
  readonly debug: DebugNamespace;

  /** The `prices` namespace contains methods for getting token price data. */
  readonly prices: PricesNamespace;

  /**
   * The `portfolio` namespace contains methods for getting data needed to view onchain assets.
   * Portfolio APIs include everything you need to build a view of a user’s assets: fungibles,
   * NFTs, and their transactions.
   */
  readonly portfolio: PortfolioNamespace;

  /**
   * @param {string} [settings.apiKey] - The API key to use for Alchemy
   * @param {Network} [settings.network] - The network to use for Alchemy
   * @param {number} [settings.maxRetries] - The maximum number of retries to attempt
   * @param {number} [settings.requestTimeout] - The timeout after which request should fail
   * @public
   */
  constructor(settings?: AlchemySettings) {
    this.config = new AlchemyConfig(settings);

    this.core = new CoreNamespace(this.config);
    this.nft = new NftNamespace(this.config);
    this.ws = new WebSocketNamespace(this.config);
    this.transact = new TransactNamespace(this.config);
    this.notify = new NotifyNamespace(this.config);
    this.debug = new DebugNamespace(this.config);
    this.prices = new PricesNamespace(this.config);
    this.portfolio = new PortfolioNamespace(this.config);
  }
}
