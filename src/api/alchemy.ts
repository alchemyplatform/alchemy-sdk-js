import { providers } from 'ethers';
import { AlchemyConfig, Network } from '../types/types';
import {
  DEFAULT_ALCHEMY_API_KEY,
  DEFAULT_MAX_RETRIES,
  DEFAULT_NETWORK
} from '../util/const';

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
  private _baseEthersProvider: providers.AlchemyProvider | undefined;

  /**
   * @hideconstructor
   * @internal
   */
  constructor(config?: AlchemyConfig) {
    this.apiKey = config?.apiKey || DEFAULT_ALCHEMY_API_KEY;
    this.network = config?.network || DEFAULT_NETWORK;
    this.maxRetries = config?.maxRetries || DEFAULT_MAX_RETRIES;
  }

  /**
   * Changes the network that the SDK requests data from.
   *
   * @param network - The network to change to.
   * @public
   */
  setNetwork(network: Network) {
    this.network = network;
  }

  /**
   * Lazy loads the ethers provider and creates an AlchemyProvider instance.
   *
   * @public
   */
  getProvider(): providers.AlchemyProvider {
    if (!this._baseEthersProvider) {
      this._baseEthersProvider = new providers.AlchemyProvider(
        EthersNetwork[this.network],
        this.apiKey
      ) as providers.AlchemyProvider;
    }
    return this._baseEthersProvider;
  }

  /**
   * Returns the base URL for making Alchemy API requests. The `alchemy.com`
   * endpoints only work with non eth json-rpc requests.
   *
   * @internal
   */
  _getBaseUrl(): string {
    return `https://${this.network}.g.alchemy.com/v2/${this.apiKey}`;
  }
}

/**
 * Mapping of network names to their corresponding Network strings used to
 * create an Ethers.js Provider instance.
 */
const EthersNetwork = {
  [Network.ETH_MAINNET]: 'mainnet',
  [Network.ETH_ROPSTEN]: 'ropsten',
  [Network.ETH_GOERLI]: 'goerli',
  [Network.ETH_KOVAN]: 'kovan',
  [Network.ETH_RINKEBY]: 'rinkeby',
  [Network.OPT_MAINNET]: 'optimism',
  [Network.OPT_KOVAN]: 'optimism-kovan',
  [Network.ARB_MAINNET]: 'arbitrum',
  [Network.ARB_RINKEBY]: 'arbitrum-rinkeby',
  [Network.MATIC_MAINNET]: 'matic',
  [Network.MATIC_MUMBAI]: 'maticmum'
};
