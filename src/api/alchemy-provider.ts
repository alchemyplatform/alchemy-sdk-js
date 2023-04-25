import {
  FetchRequest,
  JsonRpcPayload,
  JsonRpcProvider,
  JsonRpcResult,
  Network as NetworkFromEthers,
  Networkish
} from 'ethers';

import { Network } from '../types/types';
import {
  CustomNetworks,
  DEFAULT_ALCHEMY_API_KEY,
  DEFAULT_NETWORK,
  EthersNetwork,
  getAlchemyHttpUrl,
  getAlchemyWsUrl
} from '../util/const';
import { logWarn } from '../util/logger';
import { IS_BROWSER } from '../util/util';
import { VERSION } from '../version';
import { AlchemyConfig } from './alchemy-config';

/**
 * SDK's custom implementation of ethers.js's 'AlchemyProvider'.
 *
 * Do not call this constructor directly. Instead, instantiate an instance of
 * {@link Alchemy} and call {@link Alchemy.config.getProvider()}.
 *
 * @public
 */
export class AlchemyProvider extends JsonRpcProvider {
  readonly apiKey: string;
  readonly maxRetries: number;
  readonly batchRequests: boolean;

  private fetchRequest: FetchRequest;

  /** @internal */
  constructor(config: AlchemyConfig) {
    // Normalize the API Key to a string.
    const apiKey = AlchemyProvider.getApiKey(config.apiKey);

    // Generate our own connection info with the correct endpoint URLs.
    // TODO(v6): support CustomNetwork
    const alchemyNetwork = AlchemyProvider.getAlchemyNetwork(config.network);
    const fetchRequest = AlchemyProvider.getAlchemyFetchRequest(
      alchemyNetwork,
      apiKey,
      'http'
    );

    // If a hardcoded url was specified in the config, use that instead of the
    // provided apiKey or network.
    if (config.url !== undefined) {
      fetchRequest.url = config.url;
    }

    fetchRequest.setThrottleParams({ maxAttempts: config.maxRetries });

    if (config.network in CustomNetworks) {
      NetworkFromEthers.register(
        config.network,
        () => CustomNetworks[config.network]
      );
    }

    // Normalize the Alchemy named network input to the network names used by
    // ethers. This allows the parent super constructor in JsonRpcProvider to
    // correctly set the network.
    const ethersNetwork = EthersNetwork[alchemyNetwork];
    super(fetchRequest, ethersNetwork, { batchMaxCount: 1 });

    this.fetchRequest = fetchRequest;
    this.apiKey = config.apiKey;
    this.maxRetries = config.maxRetries;
    this.batchRequests = config.batchRequests;
  }

  /**
   * Overrides the `UrlJsonRpcProvider.getApiKey` method as implemented by
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
   * Returns a {@link FetchRequest} object compatible with ethers that contains
   * the correct URLs for Alchemy.
   *
   * @internal
   */
  static getAlchemyFetchRequest(
    network: Network,
    apiKey: string,
    type: 'wss' | 'http'
  ): FetchRequest {
    const url =
      type === 'http'
        ? getAlchemyHttpUrl(network, apiKey)
        : getAlchemyWsUrl(network, apiKey);
    const fetchRequest = new FetchRequest(url);
    fetchRequest.setHeader('Alchemy-Ethers-Sdk-Version', VERSION);
    if (IS_BROWSER) {
      fetchRequest.setHeader('Accept-Encoding', 'gzip');
    }
    fetchRequest.allowGzip = true;
    return fetchRequest;
  }

  /**
   * Overrides the `BaseProvider.getNetwork` method as implemented by ethers.js.
   *
   * This override allows the SDK to set the provider's network to values not
   * yet supported by ethers.js.
   *
   * @internal
   * @override
   */
  getNetwork(): Promise<NetworkFromEthers> {
    // TODO(v6): implement custom network support
    // if (typeof network === 'string' && network in CustomNetworks) {
    //   return CustomNetworks[network];
    // }

    // Call the standard ethers.js getNetwork method for other networks.
    return super.getNetwork();
  }

  /**
   * Overrides the method in ethers.js's `StaticJsonRpcProvider` class. This
   * method is called when calling methods on the parent class `BaseProvider`.
   *
   * @override
   */
  async detectNetwork(): Promise<NetworkFromEthers> {
    let network = this._network;
    if (network == null) {
      network = await super._detectNetwork();

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
   * Overrides the base {@link JsonRpcProvider.send} method to implement custom
   * logic for sending requests to Alchemy.
   *
   * @param method The method name to use for the request.
   * @param params The parameters to use for the request.
   * @override
   * @public
   */
  // TODO: Add headers for `perform()` override.
  send(method: string, params: Array<any> | Record<string, any>): Promise<any>;
  /**
   * @internal
   */
  send(
    method: string,
    params: Array<any> | Record<string, any>,
    sdkMethodName: string
  ): Promise<any>;
  async send(
    method: string,
    params: Array<any> | Record<string, any>,
    sdkMethodName?: string
  ): Promise<any> {
    let updatedParams;

    // HACK: There is no way to pass headers into each SDK method call, so we
    // sneak them through via the `params` array as the last element.
    if (Array.isArray(params)) {
      updatedParams = [...params, { sdkMethodName }];
    } else {
      updatedParams = { ...params };
      updatedParams.sdkMethodName = sdkMethodName;
    }
    return super.send(method, updatedParams);
  }

  /**
   * DO NOT MODIFY.
   *
   * Original code copied over from ether.js's `JsonRpcProvider.send()`.
   *
   * This method is copied over directly in order to implement custom headers
   *
   * @internal
   */
  async _send(
    payload: JsonRpcPayload | JsonRpcPayload[]
  ): Promise<JsonRpcResult[]> {
    const request = this._getConnection();

    // START MODIFIED CODE
    request.setHeader('Alchemy-Ethers-Sdk-Method', this.getMethodName(payload));
    // Remove last element from the `payload.params` array if we added it in the
    // `send()` override.
    const filteredPayload = this.filterPayloadMethod(payload);
    // END MODIFIED CODE

    request.body = JSON.stringify(filteredPayload);
    request.setHeader('content-type', 'application/json');

    const response = await request.send();
    response.assertOk();

    let resp = response.bodyJson;
    if (!Array.isArray(resp)) {
      resp = [resp];
    }

    return resp;
  }

  private getMethodName(payload: JsonRpcPayload | JsonRpcPayload[]): string {
    if (Array.isArray(payload)) {
      if (payload.length >= 2) {
        return 'batchSend';
      }

      return payload[0].method;
    }
    return payload.method;
  }

  // Filter out the last element of the `payload.params` array if it is an
  // object with the key `sdkMethodName`. If `payload` is an object, then
  // remove the `sdkMethodName` key from the `payload.params` object, if it exists.
  private filterPayloadMethod(
    payload: JsonRpcPayload | JsonRpcPayload[]
  ): JsonRpcPayload | JsonRpcPayload[] {
    if (!Array.isArray(payload)) {
      payload.params = this.filterParams(payload.params);
      return payload;
    }

    // Check each array element and remove the sdk method name
    return payload.map(p => {
      p.params = this.filterParams(p.params);
      return p;
    });
  }

  private filterParams(
    params: Array<any> | Record<string, any>
  ): Array<any> | Record<string, any> {
    if (Array.isArray(params)) {
      return params.filter(
        p => typeof p !== 'object' || !('sdkMethodName' in p)
      );
    }
    if ('sdkMethodName' in params) {
      delete params.sdkMethodName;
    }
    return params;
  }
}
