import { AlchemyProvider } from '@ethersproject/providers/lib/alchemy-provider';
import { AlchemyConfig, Network } from '../types/types';
import {
  DEFAULT_ALCHEMY_API_KEY,
  DEFAULT_MAX_RETRIES,
  DEFAULT_NETWORK
} from '../util/const';

/**
 * Entry point into the Alchemy SDK
 *
 * @param config Configuration object used to
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
 */
export class Alchemy {
  readonly apiKey: string;
  readonly network: Network;
  readonly maxRetries: number;

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

  /**
   * Lazy loads the ethers provider and creates an AlchemyProvider instance.
   *
   * @public
   */
  getProvider(): AlchemyProvider {
    if (!this._baseEthersProvider) {
      const provider = require('@ethersproject/providers/lib/alchemy-provider');
      this._baseEthersProvider = new provider.AlchemyProvider(
        EthersNetwork[this.network],
        this.apiKey
      ) as AlchemyProvider;
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

  /**
   * Sends a request to using the Ethers' AlchemyProvider instance.
   *
   * This has the same behavior as `getProvider().send()`. I'll probably remove
   * it in the future.
   *
   * @param method
   * @param params
   */
  send(method: string, params: Array<any>): any {
    return this.getProvider().send(method, params);
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
