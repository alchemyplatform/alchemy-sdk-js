import { AddressActivityResponse, AddressActivityWebhook, AddressWebhookParams, AddressWebhookUpdate, CustomGraphqlWebhook, CustomGraphqlWebhookConfig, CustomGraphqlWebhookParams, CustomGraphqlWebhookUpdate, DroppedTransactionWebhook, GetAddressesOptions, GetAllWebhooksResponse, MinedTransactionWebhook, NftActivityWebhook, NftFiltersResponse, NftMetadataUpdateWebhook, NftMetadataWebhookUpdate, NftWebhookParams, NftWebhookUpdate, TransactionWebhookParams, Webhook, WebhookType } from '../types/types';
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
export declare class NotifyNamespace {
    private readonly config;
    /**
     * Get all webhooks on your team.
     *
     * The team is determined by the `authToken` provided into the {@link AlchemySettings}
     * object when creating a new {@link Alchemy} instance.
     *
     * This method returns a response object containing all the webhooks
     */
    getAllWebhooks(): Promise<GetAllWebhooksResponse>;
    /**
     * Get all addresses tracked for the provided {@link AddressActivityWebhook}.
     *
     * @param addressWebhook The Address Activity webhook.
     * @param options Pagination options when fetching addresses.
     */
    getAddresses(addressWebhook: AddressActivityWebhook, options?: GetAddressesOptions): Promise<AddressActivityResponse>;
    /**
     * Get all addresses tracked for the provided {@link AddressActivityWebhook}.
     *
     * @param webhookId The id of the address activity webhook. Passing in an id
     *   of a non-address-activity webhook will result in a response object with
     *   no addresses.
     * @param options Pagination options when fetching addresses.
     */
    getAddresses(webhookId: string, options?: GetAddressesOptions): Promise<AddressActivityResponse>;
    /**
     * Get the graphql query used for the provided {@link CustomGraphqlWebhook}.
     *
     * @param customGraphqlWebhook The webhook to get the graphql query for.
     */
    getGraphqlQuery(customGraphqlWebhook: CustomGraphqlWebhook): Promise<CustomGraphqlWebhookConfig>;
    /**
     * Get the graphql query used for the provided {@link CustomGraphqlWebhook}.
     *
     * @param webhookId The id of the custom webhook. Passing in an id
     *   of a non-custom webhook will result in a response object with
     *   no graphql query.
     */
    getGraphqlQuery(webhookId: string): Promise<CustomGraphqlWebhookConfig>;
    /**
     * Get all NFTs tracked for the provided {@link NftActivityWebhook}.
     *
     * @param nftWebhook The NFT Activity webhook.
     * @param options Pagination options when fetching NFT filters.
     */
    getNftFilters(nftWebhook: NftActivityWebhook, options?: GetAddressesOptions): Promise<NftFiltersResponse>;
    /**
     * Get all NFT filters tracked for the provided {@link NftActivityWebhook}.
     *
     * @param webhookId The id of the NFT activity webhook. Passing in an
     *   incorrect id of a non-NFT webhook will result in a response object with
     *   no filters.
     * @param options Pagination options when fetching nft filters.
     */
    getNftFilters(webhookId: string, options?: GetAddressesOptions): Promise<NftFiltersResponse>;
    /**
     * Update a {@link NftActivityWebhook}'s active status or NFT filters.
     *
     * @param nftWebhook The NFT activity webhook to update.
     * @param update Object containing the update.
     */
    updateWebhook(nftWebhook: NftActivityWebhook, update: NftWebhookUpdate): Promise<void>;
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
    updateWebhook(nftMetadataWebhookId: string, update: NftMetadataWebhookUpdate): Promise<void>;
    /**
     * Update a {@link CustomGraphqlWebhook}'s active status.
     * The graphql query associated with the webhook is immutable.
     *
     * @param customGraphqlWebhookId The id of the custom webhook.
     * @param update Object containing the update.
     */
    updateWebhook(customGraphqlWebhookId: string, update: CustomGraphqlWebhookUpdate): Promise<void>;
    /**
     * Update a {@link AddressActivityWebhook}'s active status or addresses.
     *
     * @param addressWebhook The address activity webhook to update.
     * @param update Object containing the update.
     */
    updateWebhook(addressWebhook: AddressActivityWebhook, update: AddressWebhookUpdate): Promise<void>;
    /**
     * Update a {@link AddressActivityWebhook}'s active status or addresses.
     *
     * @param addressWebhookId The id of the address activity webhook.
     * @param update Object containing the update.
     */
    updateWebhook(addressWebhookId: string, update: AddressWebhookUpdate): Promise<void>;
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
    createWebhook(url: string, type: WebhookType.MINED_TRANSACTION, params: TransactionWebhookParams): Promise<MinedTransactionWebhook>;
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
    createWebhook(url: string, type: WebhookType.DROPPED_TRANSACTION, params: TransactionWebhookParams): Promise<DroppedTransactionWebhook>;
    /**
     * Create a new {@link NftActivityWebhook} to track NFT transfers.
     *
     * @param url The URL that the webhook should send events to.
     * @param type The type of webhook to create.
     * @param params Parameters object containing the NFTs to track and the
     *   network the webhook should be created on.
     */
    createWebhook(url: string, type: WebhookType.NFT_ACTIVITY, params: NftWebhookParams): Promise<NftActivityWebhook>;
    createWebhook(url: string, type: WebhookType.NFT_METADATA_UPDATE, params: NftWebhookParams): Promise<NftMetadataUpdateWebhook>;
    /**
     * Create a new {@link CustomGraphqlWebhook} to track any event on every block.
     *
     * @param url The URL that the webhook should send events to.
     * @param type The type of webhook to create.
     * @param params Parameters object containing the graphql query to be executed
     * on every block
     */
    createWebhook(url: string, type: WebhookType.GRAPHQL, params: CustomGraphqlWebhookParams): Promise<CustomGraphqlWebhook>;
    /**
     * Create a new {@link AddressActivityWebhook} to track address activity.
     *
     * @param url The URL that the webhook should send events to.
     * @param type The type of webhook to create.
     * @param params Parameters object containing the addresses to track and the
     *   network the webhook should be created on.
     */
    createWebhook(url: string, type: WebhookType.ADDRESS_ACTIVITY, params: AddressWebhookParams): Promise<AddressActivityWebhook>;
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
    private verifyConfig;
    private sendWebhookRequest;
}
