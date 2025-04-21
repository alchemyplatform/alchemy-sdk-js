import { AxiosRequestConfig, Method } from 'axios';

import { BigNumber } from '@ethersproject/bignumber';

import { requestHttpWithBackoff } from '../internal/dispatch';
import {
  RawAddressActivityResponse,
  RawCreateWebhookResponse,
  RawCustomGraphqlWebhookConfig,
  RawGetAllWebhooksResponse,
  RawNftFilterParam,
  RawNftFiltersResponse,
  RawWebhook
} from '../internal/raw-interfaces';
import {
  AddressActivityResponse,
  AddressActivityWebhook,
  AddressWebhookParams,
  AddressWebhookUpdate,
  CustomGraphqlWebhook,
  CustomGraphqlWebhookConfig,
  CustomGraphqlWebhookParams,
  CustomGraphqlWebhookUpdate,
  DroppedTransactionWebhook,
  GetAddressesOptions,
  GetAllWebhooksResponse,
  MinedTransactionWebhook,
  Network,
  NftActivityWebhook,
  NftFilter,
  NftFiltersResponse,
  NftMetadataUpdateWebhook,
  NftMetadataWebhookUpdate,
  NftWebhookParams,
  NftWebhookUpdate,
  TransactionWebhookParams,
  Webhook,
  WebhookType,
  WebhookVersion
} from '../types/types';
import { AlchemyApiType } from '../util/const';
import { AlchemyConfig } from './alchemy-config';

/**
 * The Notify namespace contains methods used for creating, reading, updating,
 * and deleting webhooks in the Notify API.
 *
 * To use the methods in the API, you must provide your team's auth token in the
 * {@link AlchemySettings.authToken} field when configuring
 * {@link AlchemySettings}. The auth token can be found in the Alchemy Dashboard
 * on the Notify tab.
 *
 * Note that not all networks are supported in the Notify API. Please consult
 * the documentation for which networks are supported.
 *
 * Do not call this constructor directly. Instead, instantiate an Alchemy object
 * with `const alchemy = new Alchemy(config)` and then access the notify
 * namespace via `alchemy.notify`.
 */
export class NotifyNamespace {
  /** @internal */
  constructor(private readonly config: AlchemyConfig) {}

  /**
   * Get all webhooks on your team.
   *
   * The team is determined by the `authToken` provided into the {@link AlchemySettings}
   * object when creating a new {@link Alchemy} instance.
   *
   * This method returns a response object containing all the webhooks
   */
  async getAllWebhooks(): Promise<GetAllWebhooksResponse> {
    this.verifyConfig();
    const response = await this.sendWebhookRequest<RawGetAllWebhooksResponse>(
      'team-webhooks',
      'getAllWebhooks',
      {}
    );
    return {
      webhooks: parseRawWebhookResponse(response),
      totalCount: response.data.length
    };
  }

  /**
   * Get all addresses tracked for the provided {@link AddressActivityWebhook}.
   *
   * @param addressWebhook The Address Activity webhook.
   * @param options Pagination options when fetching addresses.
   */
  getAddresses(
    addressWebhook: AddressActivityWebhook,
    options?: GetAddressesOptions
  ): Promise<AddressActivityResponse>;

  /**
   * Get all addresses tracked for the provided {@link AddressActivityWebhook}.
   *
   * @param webhookId The id of the address activity webhook. Passing in an id
   *   of a non-address-activity webhook will result in a response object with
   *   no addresses.
   * @param options Pagination options when fetching addresses.
   */
  getAddresses(
    webhookId: string,
    options?: GetAddressesOptions
  ): Promise<AddressActivityResponse>;
  async getAddresses(
    webhookOrId: AddressActivityWebhook | string,
    options?: GetAddressesOptions
  ): Promise<AddressActivityResponse> {
    this.verifyConfig();
    const webhookId =
      typeof webhookOrId === 'string' ? webhookOrId : webhookOrId.id;
    const response = await this.sendWebhookRequest<RawAddressActivityResponse>(
      'webhook-addresses',
      'getAddresses',
      {
        webhook_id: webhookId,
        limit: options?.limit,
        after: options?.pageKey
      }
    );
    return parseRawAddressActivityResponse(response);
  }

  /**
   * Get the graphql query used for the provided {@link CustomGraphqlWebhook}.
   *
   * @param customGraphqlWebhook The webhook to get the graphql query for.
   */
  getGraphqlQuery(
    customGraphqlWebhook: CustomGraphqlWebhook
  ): Promise<CustomGraphqlWebhookConfig>;

  /**
   * Get the graphql query used for the provided {@link CustomGraphqlWebhook}.
   *
   * @param webhookId The id of the custom webhook. Passing in an id
   *   of a non-custom webhook will result in a response object with
   *   no graphql query.
   */
  getGraphqlQuery(webhookId: string): Promise<CustomGraphqlWebhookConfig>;
  async getGraphqlQuery(
    webhookOrId: CustomGraphqlWebhook | string
  ): Promise<CustomGraphqlWebhookConfig> {
    this.verifyConfig();
    const webhookId =
      typeof webhookOrId === 'string' ? webhookOrId : webhookOrId.id;
    const response =
      await this.sendWebhookRequest<RawCustomGraphqlWebhookConfig>(
        'dashboard-webhook-graphql-query',
        'getGraphqlQuery',
        {
          webhook_id: webhookId
        }
      );
    return parseRawCustomGraphqlWebhookResponse(response);
  }

  /**
   * Get all NFTs tracked for the provided {@link NftActivityWebhook}.
   *
   * @param nftWebhook The NFT Activity webhook.
   * @param options Pagination options when fetching NFT filters.
   */
  getNftFilters(
    nftWebhook: NftActivityWebhook,
    options?: GetAddressesOptions
  ): Promise<NftFiltersResponse>;

  /**
   * Get all NFT filters tracked for the provided {@link NftActivityWebhook}.
   *
   * @param webhookId The id of the NFT activity webhook. Passing in an
   *   incorrect id of a non-NFT webhook will result in a response object with
   *   no filters.
   * @param options Pagination options when fetching nft filters.
   */
  getNftFilters(
    webhookId: string,
    options?: GetAddressesOptions
  ): Promise<NftFiltersResponse>;
  async getNftFilters(
    webhookOrId: NftActivityWebhook | string,
    options?: GetAddressesOptions
  ): Promise<NftFiltersResponse> {
    this.verifyConfig();
    const webhookId =
      typeof webhookOrId === 'string' ? webhookOrId : webhookOrId.id;
    const response = await this.sendWebhookRequest<RawNftFiltersResponse>(
      'webhook-nft-filters',
      'getNftFilters',
      {
        webhook_id: webhookId,
        limit: options?.limit,
        after: options?.pageKey
      }
    );
    return parseRawNftFiltersResponse(response);
  }

  /**
   * Update a {@link NftActivityWebhook}'s active status or NFT filters.
   *
   * @param nftWebhook The NFT activity webhook to update.
   * @param update Object containing the update.
   */
  updateWebhook(
    nftWebhook: NftActivityWebhook,
    update: NftWebhookUpdate
  ): Promise<void>;

  /**
   * Update a {@link NftActivityWebhook}'s active status or NFT filters.
   *
   * @param nftWebhookId The id of the NFT activity webhook.
   * @param update Object containing the update.
   */
  updateWebhook(nftWebhookId: string, update: NftWebhookUpdate): Promise<void>;

  /**
   * Update a {@link NftMetadataUpdateWebhook}'s active status or NFT filters.
   *
   * @param nftMetadataWebhookId The id of the NFT activity webhook.
   * @param update Object containing the update.
   */
  updateWebhook(
    nftMetadataWebhookId: string,
    update: NftMetadataWebhookUpdate
  ): Promise<void>;

  /**
   * Update a {@link CustomGraphqlWebhook}'s active status.
   * The graphql query associated with the webhook is immutable.
   *
   * @param customGraphqlWebhookId The id of the custom webhook.
   * @param update Object containing the update.
   */
  updateWebhook(
    customGraphqlWebhookId: string,
    update: CustomGraphqlWebhookUpdate
  ): Promise<void>;

  /**
   * Update a {@link AddressActivityWebhook}'s active status or addresses.
   *
   * @param addressWebhook The address activity webhook to update.
   * @param update Object containing the update.
   */
  updateWebhook(
    addressWebhook: AddressActivityWebhook,
    update: AddressWebhookUpdate
  ): Promise<void>;

  /**
   * Update a {@link AddressActivityWebhook}'s active status or addresses.
   *
   * @param addressWebhookId The id of the address activity webhook.
   * @param update Object containing the update.
   */
  updateWebhook(
    addressWebhookId: string,
    update: AddressWebhookUpdate
  ): Promise<void>;
  async updateWebhook(
    webhookOrId: NftActivityWebhook | AddressActivityWebhook | string,
    update:
      | NftWebhookUpdate
      | AddressWebhookUpdate
      | NftMetadataWebhookUpdate
      | CustomGraphqlWebhookUpdate
  ): Promise<void> {
    const webhookId =
      typeof webhookOrId === 'string' ? webhookOrId : webhookOrId.id;
    let restApiName;
    let methodName;
    let method: Method;
    let data;
    if ('isActive' in update) {
      restApiName = 'update-webhook';
      methodName = 'updateWebhook';
      method = 'PUT';
      data = {
        webhook_id: webhookId,
        is_active: update.isActive
      };
    } else if ('addFilters' in update || 'removeFilters' in update) {
      restApiName = 'update-webhook-nft-filters';
      methodName = 'updateWebhookNftFilters';
      method = 'PATCH';
      data = {
        webhook_id: webhookId,
        nft_filters_to_add: update.addFilters
          ? update.addFilters.map(nftFilterToParam)
          : [],
        nft_filters_to_remove: update.removeFilters
          ? update.removeFilters.map(nftFilterToParam)
          : []
      };
    } else if (
      'addMetadataFilters' in update ||
      'removeMetadataFilters' in update
    ) {
      restApiName = 'update-webhook-nft-metadata-filters';
      methodName = 'updateWebhookNftMetadataFilters';
      method = 'PATCH';
      data = {
        webhook_id: webhookId,
        nft_metadata_filters_to_add: update.addMetadataFilters
          ? update.addMetadataFilters.map(nftFilterToParam)
          : [],
        nft_metadata_filters_to_remove: update.removeMetadataFilters
          ? update.removeMetadataFilters.map(nftFilterToParam)
          : []
      };
    } else if ('addAddresses' in update || 'removeAddresses' in update) {
      restApiName = 'update-webhook-addresses';
      methodName = 'webhook:updateWebhookAddresses';
      method = 'PATCH';
      data = {
        webhook_id: webhookId,
        addresses_to_add: await this.resolveAddresses(update.addAddresses),
        addresses_to_remove: await this.resolveAddresses(update.removeAddresses)
      };
    } else if ('newAddresses' in update) {
      restApiName = 'update-webhook-addresses';
      methodName = 'webhook:updateWebhookAddress';
      method = 'PUT';
      data = {
        webhook_id: webhookId,
        addresses: await this.resolveAddresses(update.newAddresses)
      };
    } else {
      throw new Error('Invalid `update` param passed into `updateWebhook`');
    }

    await this.sendWebhookRequest(
      restApiName,
      methodName,
      {},
      {
        method,
        data
      }
    );
  }
  /**
   * Create a new {@link CustomGraphqlWebhook} to track any event on every block.
   *
   * @param url The URL that the webhook should send events to.
   * @param type The type of webhook to create.
   * @param params Parameters object containing the graphql query to be executed
   * on every block
   */
  createWebhook(
    url: string,
    type: WebhookType.GRAPHQL,
    params: CustomGraphqlWebhookParams
  ): Promise<CustomGraphqlWebhook>;

  /**
   * Create a new {@link MinedTransactionWebhook} to track mined transactions
   * sent by the app associated with the app id.
   *
   * Note that the webhook will be created in the app network of the provided app id.
   *
   * @param url The URL that the webhook should send events to.
   * @param type The type of webhook to create.
   * @param params Parameters object containing the app id.
   */
  // TODO(webhook): Automatically populate app id from api key.
  createWebhook(
    url: string,
    type: WebhookType.MINED_TRANSACTION,
    params: TransactionWebhookParams
  ): Promise<MinedTransactionWebhook>;

  /**
   * Create a new {@link DroppedTransactionWebhook} to track dropped transactions
   * sent by the app associated with the app id.
   *
   * Note that the webhook will be created in the app network of the provided app id.
   *
   * @param url The URL that the webhook should send events to.
   * @param type The type of webhook to create.
   * @param params Parameters object containing the app id.
   */
  // TODO(webhook): Automatically populate app id from api key.
  createWebhook(
    url: string,
    type: WebhookType.DROPPED_TRANSACTION,
    params: TransactionWebhookParams
  ): Promise<DroppedTransactionWebhook>;

  /**
   * Create a new {@link NftActivityWebhook} to track NFT transfers.
   *
   * @param url The URL that the webhook should send events to.
   * @param type The type of webhook to create.
   * @param params Parameters object containing the NFTs to track and the
   *   network the webhook should be created on.
   */
  createWebhook(
    url: string,
    type: WebhookType.NFT_ACTIVITY,
    params: NftWebhookParams
  ): Promise<NftActivityWebhook>;

  createWebhook(
    url: string,
    type: WebhookType.NFT_METADATA_UPDATE,
    params: NftWebhookParams
  ): Promise<NftMetadataUpdateWebhook>;

  /**
   * Create a new {@link AddressActivityWebhook} to track address activity.
   *
   * @param url The URL that the webhook should send events to.
   * @param type The type of webhook to create.
   * @param params Parameters object containing the addresses to track and the
   *   network the webhook should be created on.
   */
  createWebhook(
    url: string,
    type: WebhookType.ADDRESS_ACTIVITY,
    params: AddressWebhookParams
  ): Promise<AddressActivityWebhook>;
  async createWebhook(
    url: string,
    type: WebhookType,
    params:
      | NftWebhookParams
      | AddressWebhookParams
      | TransactionWebhookParams
      | CustomGraphqlWebhookParams
  ): Promise<
    | MinedTransactionWebhook
    | DroppedTransactionWebhook
    | NftActivityWebhook
    | AddressActivityWebhook
    | NftMetadataUpdateWebhook
    | CustomGraphqlWebhook
  > {
    let appId;
    if (
      type === WebhookType.MINED_TRANSACTION ||
      type === WebhookType.DROPPED_TRANSACTION ||
      type === WebhookType.GRAPHQL
    ) {
      if (!('appId' in params)) {
        throw new Error('Transaction and GraphQL Webhooks require an app id.');
      }
      appId = params.appId;
    }

    let network = NETWORK_TO_WEBHOOK_NETWORK.get(this.config.network);
    let nftFilterObj;
    let addresses;
    let graphqlQuery;
    let skipEmptyMessages;
    if (
      type === WebhookType.NFT_ACTIVITY ||
      type === WebhookType.NFT_METADATA_UPDATE
    ) {
      if (!('filters' in params) || params.filters.length === 0) {
        throw new Error(
          'Nft Activity Webhooks require a non-empty array input.'
        );
      }
      network = params.network
        ? NETWORK_TO_WEBHOOK_NETWORK.get(params.network)
        : network;
      const filters = (params.filters as NftFilter[]).map(filter =>
        filter.tokenId
          ? {
              contract_address: filter.contractAddress,
              token_id: BigNumber.from(filter.tokenId).toString()
            }
          : {
              contract_address: filter.contractAddress
            }
      );
      nftFilterObj =
        type === WebhookType.NFT_ACTIVITY
          ? { nft_filters: filters }
          : { nft_metadata_filters: filters };
    } else if (type === WebhookType.ADDRESS_ACTIVITY) {
      if (
        params === undefined ||
        !('addresses' in params) ||
        params.addresses.length === 0
      ) {
        throw new Error(
          'Address Activity Webhooks require a non-empty array input.'
        );
      }
      network = params.network
        ? NETWORK_TO_WEBHOOK_NETWORK.get(params.network)
        : network;

      addresses = await this.resolveAddresses(params.addresses);
    } else if (type == WebhookType.GRAPHQL) {
      if (
        params === undefined ||
        !('graphqlQuery' in params) ||
        params.graphqlQuery.length === 0
      ) {
        throw new Error('Custom Webhooks require a non-empty graphql query.');
      }
      network = params.network
        ? NETWORK_TO_WEBHOOK_NETWORK.get(params.network)
        : network;
      graphqlQuery = params.graphqlQuery;
      skipEmptyMessages = params.skipEmptyMessages;
    }

    const data = {
      network,
      webhook_type: type,
      webhook_url: url,
      ...(appId && { app_id: appId }),
      ...(params.name && { name: params.name }),

      // Only include the filters/addresses in the final response if they're defined
      ...nftFilterObj,
      ...(addresses && { addresses }),
      ...(graphqlQuery && {
        graphql_query: {
          query: graphqlQuery,
          skip_empty_messages: !!skipEmptyMessages
        }
      })
    };

    const response = await this.sendWebhookRequest<RawCreateWebhookResponse>(
      'create-webhook',
      'createWebhook',
      {},
      {
        method: 'POST',
        data
      }
    );

    return parseRawWebhook(response.data);
  }

  /**
   * Delete the provided webhook.
   *
   * @param webhook The webhook to delete.
   */
  deleteWebhook(webhook: Webhook): Promise<void>;

  /**
   * Delete the provided webhook.
   *
   * @param webhookId The id of the webhook to delete.
   */
  deleteWebhook(webhookId: string): Promise<void>;
  async deleteWebhook(webhookOrId: Webhook | string): Promise<void> {
    this.verifyConfig();
    const webhookId =
      typeof webhookOrId === 'string' ? webhookOrId : webhookOrId.id;
    const response = await this.sendWebhookRequest<RawNftFiltersResponse>(
      'delete-webhook',
      'deleteWebhook',
      {
        webhook_id: webhookId
      },
      {
        method: 'DELETE'
      }
    );

    if ('message' in response) {
      throw new Error(
        `Webhook not found. Failed to delete webhook: ${webhookId}`
      );
    }
  }

  private verifyConfig() {
    if (this.config.authToken === undefined) {
      throw new Error(
        'Using the Notify API requires setting the Alchemy Auth Token in ' +
          'the settings object when initializing Alchemy.'
      );
    }
  }

  private sendWebhookRequest<Response>(
    restApiName: string,
    methodName: string,
    params: {},
    overrides?: AxiosRequestConfig
  ): Promise<Response> {
    return requestHttpWithBackoff(
      this.config,
      AlchemyApiType.WEBHOOK,
      restApiName,
      methodName,
      params,
      {
        ...overrides,
        headers: {
          'X-Alchemy-Token': this.config.authToken!,
          ...overrides?.headers
        }
      }
    );
  }

  /** Resolves ENS addresses to the raw address.
   * @internal */
  private async resolveAddresses(
    addresses: string[] | undefined
  ): Promise<string[]> {
    if (addresses === undefined) {
      return [];
    }
    const resolvedAddresses: string[] = [];
    const provider = await this.config.getProvider();
    for (const address of addresses) {
      const rawAddress = await provider.resolveName(address);
      if (rawAddress === null) {
        throw new Error(`Unable to resolve the ENS address: ${address}`);
      }
      resolvedAddresses.push(rawAddress);
    }

    return resolvedAddresses;
  }
}

/**
 * Mapping of webhook network representations to the SDK's network representation.
 *
 * @internal
 */
const WEBHOOK_NETWORK_TO_NETWORK: { [key: string]: Network } =
  Object.fromEntries(Object.entries(Network));

/** Mapping of the SDK's network representation the webhook API's network representation. */
const NETWORK_TO_WEBHOOK_NETWORK: Map<Network, string> = Object.keys(
  Network
).reduce((map: Map<Network, string>, key) => {
  if (key in WEBHOOK_NETWORK_TO_NETWORK) {
    map.set(WEBHOOK_NETWORK_TO_NETWORK[key], key);
  }
  return map;
}, new Map());

function parseRawWebhookResponse(
  response: RawGetAllWebhooksResponse
): Webhook[] {
  return response.data.map(parseRawWebhook);
}

function parseRawWebhook(rawWebhook: RawWebhook): Webhook {
  return {
    id: rawWebhook.id,
    network: WEBHOOK_NETWORK_TO_NETWORK[rawWebhook.network],
    type: rawWebhook.webhook_type as WebhookType,
    url: rawWebhook.webhook_url,
    isActive: rawWebhook.is_active,
    timeCreated: new Date(rawWebhook.time_created).toISOString(),
    signingKey: rawWebhook.signing_key,
    version: rawWebhook.version as WebhookVersion,
    // Only include the appId in the final response if it's defined
    ...(rawWebhook.app_id !== undefined && { appId: rawWebhook.app_id }),
    // Only include the name in the final response if it's defined
    ...(rawWebhook.name !== undefined && { name: rawWebhook.name })
  };
}

function parseRawAddressActivityResponse(
  response: RawAddressActivityResponse
): AddressActivityResponse {
  return {
    addresses: response.data,
    totalCount: response.pagination.total_count,
    pageKey: response.pagination.cursors.after
  };
}

function parseRawCustomGraphqlWebhookResponse(
  response: RawCustomGraphqlWebhookConfig
): CustomGraphqlWebhookConfig {
  return {
    graphqlQuery: response.data.graphql_query
  };
}

function parseRawNftFiltersResponse(
  response: RawNftFiltersResponse
): NftFiltersResponse {
  return {
    filters: response.data.map(f =>
      f.token_id
        ? {
            contractAddress: f.contract_address,
            tokenId: BigNumber.from(f.token_id).toString()
          }
        : {
            contractAddress: f.contract_address
          }
    ),
    totalCount: response.pagination.total_count,
    pageKey: response.pagination.cursors.after
  };
}

function nftFilterToParam(filter: NftFilter): RawNftFilterParam {
  return filter.tokenId
    ? {
        contract_address: filter.contractAddress,
        token_id: BigNumber.from(filter.tokenId).toString()
      }
    : {
        contract_address: filter.contractAddress
      };
}
