import {
  JsonRpcProvider,
  CommunityResourcable
} from '@ethersproject/providers';
import {
  Network as NetworkFromEthers,
  Networkish
} from '@ethersproject/networks';
import { ConnectionInfo } from '@ethersproject/web';
import {
  DEFAULT_ALCHEMY_API_KEY,
  DEFAULT_NETWORK,
  EthersNetwork,
  getAlchemyHttpUrl,
  getAlchemyWsUrl
} from '../util/const';
import { Network } from '../types/types';
import { logWarn } from '../util/logger';
import { VERSION } from '../version';

/**
 * SDK's custom implementation of ethers' {@link providers.AlchemyProvider}.
 *
 * @public
 */
export class AlchemyProvider
  extends JsonRpcProvider
  implements CommunityResourcable
{
  readonly apiKey: string;
  readonly maxRetries: number;

  constructor(network: Networkish, apiKey: string, maxRetries: number) {
    // Normalize the API Key to a string.
    apiKey = AlchemyProvider.getApiKey(apiKey);

    // Generate our own connection info with the correct endpoint URLs.
    const alchemyNetwork = AlchemyProvider.getAlchemyNetwork(network);
    const connection = AlchemyProvider.getAlchemyConnectionInfo(
      alchemyNetwork,
      apiKey,
      'http'
    );

    // Normalize the Alchemy named network input to the network names used by
    // ethers. This allows the parent super constructor in JsonRpcProvider to
    // correctly set the network.
    const ethersNetwork = EthersNetwork[alchemyNetwork];
    super(connection, ethersNetwork);
    this.apiKey = apiKey;
    this.maxRetries = maxRetries;
  }

  /**
   * Overrides the {@link UrlJsonRpcProvider.getApiKey} method as implemented by
   * ethers.js. Returns the API key for an Alchemy provider.
   *
   * @internal
   * @override
   */
  static getApiKey(apiKey: any): string {
    if (apiKey == null) {
      return DEFAULT_ALCHEMY_API_KEY;
    }
    if (apiKey && typeof apiKey !== 'string') {
      throw new Error(
        `Invalid apiKey '${apiKey}' provided. apiKey must be a string.`
      );
    }
    return apiKey;
  }

  /**
   * Converts the `Networkish` input to the network enum used by Alchemy.
   *
   * @internal
   */
  static getAlchemyNetwork(network?: Networkish): Network {
    if (network === undefined) {
      return DEFAULT_NETWORK;
    }

    if (typeof network === 'number') {
      throw new Error(
        `Invalid network '${network}' provided. Network must be a string.`
      );
    }

    // Guaranteed that `typeof network === 'string`.
    const isValidNetwork = Object.values(Network).includes(network as Network);
    if (!isValidNetwork) {
      throw new Error(
        `Invalid network '${network}' provided. Network must be one of: ` +
          `${Object.values(Network).join(', ')}.`
      );
    }
    return network as Network;
  }

  /**
   * Returns a {@link ConnectionInfo} object compatible with ethers that contains
   * the correct URLs for Alchemy.
   *
   * @internal
   */
  static getAlchemyConnectionInfo(
    network: Network,
    apiKey: string,
    type: 'wss' | 'http'
  ): ConnectionInfo {
    const url =
      type === 'http'
        ? getAlchemyHttpUrl(network, apiKey)
        : getAlchemyWsUrl(network, apiKey);
    return {
      headers: {
        'Alchemy-Ethers-Sdk-Version': VERSION,
        'Accept-Encoding': 'gzip'
      },
      allowGzip: true,
      url
    };
  }

  /**
   * Overrides the method in ethers' `StaticJsonRpcProvider` class. This method
   * is called when calling methods on {@link providers.BaseProvider}.
   *
   * @override
   */
  async detectNetwork(): Promise<NetworkFromEthers> {
    let network = this.network;
    if (network == null) {
      network = await super.detectNetwork();

      if (!network) {
        throw new Error('No network detected');
      }
    }
    return network;
  }

  _startPending(): void {
    logWarn('WARNING: Alchemy Provider does not support pending filters');
  }

  /**
   * Overrides the ether's `isCommunityResource()` method. Returns true if the
   * current api key is the default key.
   *
   * @override
   */
  isCommunityResource(): boolean {
    return this.apiKey === DEFAULT_ALCHEMY_API_KEY;
  }

  /**
   * Overrides the base {@link providers.JsonRpcProvider.send} method to
   * implement custom logic for sending requests to Alchemy.
   *
   * @param method The method name to use for the request.
   * @param params The parameters to use for the request.
   * @override
   * @public
   */
  // TODO: Implement sender logic to override retries and backoff.
  send(method: string, params: Array<any>): Promise<any> {
    return super.send(method, params);
  }
}
