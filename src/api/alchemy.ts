import { AlchemyConfig, Network } from '../types/types';
import {
  DEFAULT_ALCHEMY_API_KEY,
  DEFAULT_MAX_RETRIES,
  DEFAULT_NETWORK,
  getAlchemyHttpUrl
} from '../util/const';
import { AlchemyProvider } from '../internal/alchemy-provider';

/**
 * Entry point into the Alchemy SDK.
 *
 * @param config - Configuration object for the Alchemy SDK
 * @public
 */
export function initializeAlchemy(config?: AlchemyConfig): Alchemy {
  return new Alchemy(config);
}

/**
 * The Alchemy SDK client. This class holds config information and must be
 * passed into SDK methods.
 *
 * Do not call this constructor directly. Instead, use {@link initializeAlchemy}
 * to get an instance of the SDK.
 *
 * @public
 */
export class Alchemy {
  readonly apiKey: string;
  network: Network;
  readonly maxRetries: number;

  /** @internal */
  private _baseEthersProvider: AlchemyProvider | undefined;

  /**
   * @hideconstructor
   * @internal
   */
  constructor(config?: AlchemyConfig) {
    this.apiKey = config?.apiKey || DEFAULT_ALCHEMY_API_KEY;
    this.network = config?.network || DEFAULT_NETWORK;
    this.maxRetries = config?.maxRetries || DEFAULT_MAX_RETRIES;
  }

  /** @internal */
  getBaseUrl(): string {
    return getAlchemyHttpUrl(this.network, this.apiKey);
  }

  /**
   * Changes the network that the SDK requests data from.
   *
   * @param network - The network to change to.
   * @public
   */
  setNetwork(network: Network) {
    // TODO(ethers): Add support for changing the network in the returned provider.
    this.network = network;
  }

  /**
   * Lazy loads the ethers provider and creates an AlchemyProvider instance.
   *
   * @public
   */
  getProvider(): AlchemyProvider {
    if (!this._baseEthersProvider) {
      this._baseEthersProvider = new AlchemyProvider(
        this.network,
        this.apiKey,
        this.maxRetries
      ) as AlchemyProvider;
    }
    return this._baseEthersProvider;
  }
}
