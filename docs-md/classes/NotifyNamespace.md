[alchemy-sdk](../README.md) / [Exports](../modules.md) / NotifyNamespace

# Class: NotifyNamespace

The Notify namespace contains methods used for creating, reading, updating,
and deleting webhooks in the Notify API.

To use the methods in the API, you must provide your team's auth token in the
[AlchemySettings.authToken](../interfaces/AlchemySettings.md#authtoken) field when configuring
[AlchemySettings](../interfaces/AlchemySettings.md). The auth token can be found in the Alchemy Dashboard
on the Notify tab.

Note that not all networks are supported in the Notify API. Please consult
the documentation for which networks are supported.

Do not call this constructor directly. Instead, instantiate an Alchemy object
with `const alchemy = new Alchemy(config)` and then access the notify
namespace via `alchemy.notify`.

## Table of contents

### Methods

- [createWebhook](NotifyNamespace.md#createwebhook)
- [deleteWebhook](NotifyNamespace.md#deletewebhook)
- [getAddresses](NotifyNamespace.md#getaddresses)
- [getAllWebhooks](NotifyNamespace.md#getallwebhooks)
- [getGraphqlQuery](NotifyNamespace.md#getgraphqlquery)
- [getNftFilters](NotifyNamespace.md#getnftfilters)
- [sendWebhookRequest](NotifyNamespace.md#sendwebhookrequest)
- [updateWebhook](NotifyNamespace.md#updatewebhook)
- [verifyConfig](NotifyNamespace.md#verifyconfig)

## Methods

### createWebhook

▸ **createWebhook**(`url`, `type`, `params`): `Promise`<[`MinedTransactionWebhook`](../interfaces/MinedTransactionWebhook.md)\>

Create a new [MinedTransactionWebhook](../interfaces/MinedTransactionWebhook.md) to track mined transactions
sent by the app associated with the app id.

Note that the webhook will be created in the app network of the provided app id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL that the webhook should send events to. |
| `type` | [`MINED_TRANSACTION`](../enums/WebhookType.md#mined_transaction) | The type of webhook to create. |
| `params` | [`TransactionWebhookParams`](../interfaces/TransactionWebhookParams.md) | Parameters object containing the app id. |

#### Returns

`Promise`<[`MinedTransactionWebhook`](../interfaces/MinedTransactionWebhook.md)\>

#### Defined in

[src/api/notify-namespace.ts:360](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/api/notify-namespace.ts#L360)

▸ **createWebhook**(`url`, `type`, `params`): `Promise`<[`DroppedTransactionWebhook`](../interfaces/DroppedTransactionWebhook.md)\>

Create a new [DroppedTransactionWebhook](../interfaces/DroppedTransactionWebhook.md) to track dropped transactions
sent by the app associated with the app id.

Note that the webhook will be created in the app network of the provided app id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL that the webhook should send events to. |
| `type` | [`DROPPED_TRANSACTION`](../enums/WebhookType.md#dropped_transaction) | The type of webhook to create. |
| `params` | [`TransactionWebhookParams`](../interfaces/TransactionWebhookParams.md) | Parameters object containing the app id. |

#### Returns

`Promise`<[`DroppedTransactionWebhook`](../interfaces/DroppedTransactionWebhook.md)\>

#### Defined in

[src/api/notify-namespace.ts:377](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/api/notify-namespace.ts#L377)

▸ **createWebhook**(`url`, `type`, `params`): `Promise`<[`NftActivityWebhook`](../interfaces/NftActivityWebhook.md)\>

Create a new [NftActivityWebhook](../interfaces/NftActivityWebhook.md) to track NFT transfers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL that the webhook should send events to. |
| `type` | [`NFT_ACTIVITY`](../enums/WebhookType.md#nft_activity) | The type of webhook to create. |
| `params` | [`NftWebhookParams`](../interfaces/NftWebhookParams.md) | Parameters object containing the NFTs to track and the   network the webhook should be created on. |

#### Returns

`Promise`<[`NftActivityWebhook`](../interfaces/NftActivityWebhook.md)\>

#### Defined in

[src/api/notify-namespace.ts:391](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/api/notify-namespace.ts#L391)

▸ **createWebhook**(`url`, `type`, `params`): `Promise`<[`NftMetadataUpdateWebhook`](../interfaces/NftMetadataUpdateWebhook.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `type` | [`NFT_METADATA_UPDATE`](../enums/WebhookType.md#nft_metadata_update) |
| `params` | [`NftWebhookParams`](../interfaces/NftWebhookParams.md) |

#### Returns

`Promise`<[`NftMetadataUpdateWebhook`](../interfaces/NftMetadataUpdateWebhook.md)\>

#### Defined in

[src/api/notify-namespace.ts:397](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/api/notify-namespace.ts#L397)

▸ **createWebhook**(`url`, `type`, `params`): `Promise`<[`CustomGraphqlWebhook`](../interfaces/CustomGraphqlWebhook.md)\>

Create a new [CustomGraphqlWebhook](../interfaces/CustomGraphqlWebhook.md) to track any event on every block.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL that the webhook should send events to. |
| `type` | [`GRAPHQL`](../enums/WebhookType.md#graphql) | The type of webhook to create. |
| `params` | [`CustomGraphqlWebhookParams`](../interfaces/CustomGraphqlWebhookParams.md) | Parameters object containing the graphql query to be executed on every block |

#### Returns

`Promise`<[`CustomGraphqlWebhook`](../interfaces/CustomGraphqlWebhook.md)\>

#### Defined in

[src/api/notify-namespace.ts:411](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/api/notify-namespace.ts#L411)

▸ **createWebhook**(`url`, `type`, `params`): `Promise`<[`AddressActivityWebhook`](../interfaces/AddressActivityWebhook.md)\>

Create a new [AddressActivityWebhook](../interfaces/AddressActivityWebhook.md) to track address activity.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL that the webhook should send events to. |
| `type` | [`ADDRESS_ACTIVITY`](../enums/WebhookType.md#address_activity) | The type of webhook to create. |
| `params` | [`AddressWebhookParams`](../interfaces/AddressWebhookParams.md) | Parameters object containing the addresses to track and the   network the webhook should be created on. |

#### Returns

`Promise`<[`AddressActivityWebhook`](../interfaces/AddressActivityWebhook.md)\>

#### Defined in

[src/api/notify-namespace.ts:425](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/api/notify-namespace.ts#L425)

___

### deleteWebhook

▸ **deleteWebhook**(`webhook`): `Promise`<`void`\>

Delete the provided webhook.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `webhook` | [`Webhook`](../interfaces/Webhook.md) | The webhook to delete. |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/api/notify-namespace.ts:545](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/api/notify-namespace.ts#L545)

▸ **deleteWebhook**(`webhookId`): `Promise`<`void`\>

Delete the provided webhook.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `webhookId` | `string` | The id of the webhook to delete. |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/api/notify-namespace.ts:552](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/api/notify-namespace.ts#L552)

___

### getAddresses

▸ **getAddresses**(`addressWebhook`, `options?`): `Promise`<[`AddressActivityResponse`](../interfaces/AddressActivityResponse.md)\>

Get all addresses tracked for the provided [AddressActivityWebhook](../interfaces/AddressActivityWebhook.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressWebhook` | [`AddressActivityWebhook`](../interfaces/AddressActivityWebhook.md) | The Address Activity webhook. |
| `options?` | [`GetAddressesOptions`](../interfaces/GetAddressesOptions.md) | Pagination options when fetching addresses. |

#### Returns

`Promise`<[`AddressActivityResponse`](../interfaces/AddressActivityResponse.md)\>

#### Defined in

[src/api/notify-namespace.ts:91](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/api/notify-namespace.ts#L91)

▸ **getAddresses**(`webhookId`, `options?`): `Promise`<[`AddressActivityResponse`](../interfaces/AddressActivityResponse.md)\>

Get all addresses tracked for the provided [AddressActivityWebhook](../interfaces/AddressActivityWebhook.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `webhookId` | `string` | The id of the address activity webhook. Passing in an id   of a non-address-activity webhook will result in a response object with   no addresses. |
| `options?` | [`GetAddressesOptions`](../interfaces/GetAddressesOptions.md) | Pagination options when fetching addresses. |

#### Returns

`Promise`<[`AddressActivityResponse`](../interfaces/AddressActivityResponse.md)\>

#### Defined in

[src/api/notify-namespace.ts:104](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/api/notify-namespace.ts#L104)

___

### getAllWebhooks

▸ **getAllWebhooks**(): `Promise`<[`GetAllWebhooksResponse`](../interfaces/GetAllWebhooksResponse.md)\>

Get all webhooks on your team.

The team is determined by the `authToken` provided into the [AlchemySettings](../interfaces/AlchemySettings.md)
object when creating a new [Alchemy](Alchemy.md) instance.

This method returns a response object containing all the webhooks

#### Returns

`Promise`<[`GetAllWebhooksResponse`](../interfaces/GetAllWebhooksResponse.md)\>

#### Defined in

[src/api/notify-namespace.ts:72](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/api/notify-namespace.ts#L72)

___

### getGraphqlQuery

▸ **getGraphqlQuery**(`customGraphqlWebhook`): `Promise`<[`CustomGraphqlWebhookConfig`](../interfaces/CustomGraphqlWebhookConfig.md)\>

Get the graphql query used for the provided [CustomGraphqlWebhook](../interfaces/CustomGraphqlWebhook.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `customGraphqlWebhook` | [`CustomGraphqlWebhook`](../interfaces/CustomGraphqlWebhook.md) | The webhook to get the graphql query for. |

#### Returns

`Promise`<[`CustomGraphqlWebhookConfig`](../interfaces/CustomGraphqlWebhookConfig.md)\>

#### Defined in

[src/api/notify-namespace.ts:132](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/api/notify-namespace.ts#L132)

▸ **getGraphqlQuery**(`webhookId`): `Promise`<[`CustomGraphqlWebhookConfig`](../interfaces/CustomGraphqlWebhookConfig.md)\>

Get the graphql query used for the provided [CustomGraphqlWebhook](../interfaces/CustomGraphqlWebhook.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `webhookId` | `string` | The id of the custom webhook. Passing in an id   of a non-custom webhook will result in a response object with   no graphql query. |

#### Returns

`Promise`<[`CustomGraphqlWebhookConfig`](../interfaces/CustomGraphqlWebhookConfig.md)\>

#### Defined in

[src/api/notify-namespace.ts:143](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/api/notify-namespace.ts#L143)

___

### getNftFilters

▸ **getNftFilters**(`nftWebhook`, `options?`): `Promise`<[`NftFiltersResponse`](../interfaces/NftFiltersResponse.md)\>

Get all NFTs tracked for the provided [NftActivityWebhook](../interfaces/NftActivityWebhook.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nftWebhook` | [`NftActivityWebhook`](../interfaces/NftActivityWebhook.md) | The NFT Activity webhook. |
| `options?` | [`GetAddressesOptions`](../interfaces/GetAddressesOptions.md) | Pagination options when fetching NFT filters. |

#### Returns

`Promise`<[`NftFiltersResponse`](../interfaces/NftFiltersResponse.md)\>

#### Defined in

[src/api/notify-namespace.ts:167](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/api/notify-namespace.ts#L167)

▸ **getNftFilters**(`webhookId`, `options?`): `Promise`<[`NftFiltersResponse`](../interfaces/NftFiltersResponse.md)\>

Get all NFT filters tracked for the provided [NftActivityWebhook](../interfaces/NftActivityWebhook.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `webhookId` | `string` | The id of the NFT activity webhook. Passing in an   incorrect id of a non-NFT webhook will result in a response object with   no filters. |
| `options?` | [`GetAddressesOptions`](../interfaces/GetAddressesOptions.md) | Pagination options when fetching nft filters. |

#### Returns

`Promise`<[`NftFiltersResponse`](../interfaces/NftFiltersResponse.md)\>

#### Defined in

[src/api/notify-namespace.ts:180](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/api/notify-namespace.ts#L180)

___

### sendWebhookRequest

▸ `Private` **sendWebhookRequest**<`Response`\>(`restApiName`, `methodName`, `params`, `overrides?`): `Promise`<`Response`\>

#### Type parameters

| Name |
| :------ |
| `Response` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `restApiName` | `string` |
| `methodName` | `string` |
| `params` | `Object` |
| `overrides?` | `AxiosRequestConfig`<`any`\> |

#### Returns

`Promise`<`Response`\>

#### Defined in

[src/api/notify-namespace.ts:584](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/api/notify-namespace.ts#L584)

___

### updateWebhook

▸ **updateWebhook**(`nftWebhook`, `update`): `Promise`<`void`\>

Update a [NftActivityWebhook](../interfaces/NftActivityWebhook.md)'s active status or NFT filters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nftWebhook` | [`NftActivityWebhook`](../interfaces/NftActivityWebhook.md) | The NFT activity webhook to update. |
| `update` | [`NftWebhookUpdate`](../modules.md#nftwebhookupdate) | Object containing the update. |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/api/notify-namespace.ts:209](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/api/notify-namespace.ts#L209)

▸ **updateWebhook**(`nftWebhookId`, `update`): `Promise`<`void`\>

Update a [NftActivityWebhook](../interfaces/NftActivityWebhook.md)'s active status or NFT filters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nftWebhookId` | `string` | The id of the NFT activity webhook. |
| `update` | [`NftWebhookUpdate`](../modules.md#nftwebhookupdate) | Object containing the update. |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/api/notify-namespace.ts:220](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/api/notify-namespace.ts#L220)

▸ **updateWebhook**(`nftMetadataWebhookId`, `update`): `Promise`<`void`\>

Update a [NftMetadataUpdateWebhook](../interfaces/NftMetadataUpdateWebhook.md)'s active status or NFT filters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nftMetadataWebhookId` | `string` | The id of the NFT activity webhook. |
| `update` | [`NftMetadataWebhookUpdate`](../modules.md#nftmetadatawebhookupdate) | Object containing the update. |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/api/notify-namespace.ts:228](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/api/notify-namespace.ts#L228)

▸ **updateWebhook**(`customGraphqlWebhookId`, `update`): `Promise`<`void`\>

Update a [CustomGraphqlWebhook](../interfaces/CustomGraphqlWebhook.md)'s active status.
The graphql query associated with the webhook is immutable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `customGraphqlWebhookId` | `string` | The id of the custom webhook. |
| `update` | [`WebhookStatusUpdate`](../interfaces/WebhookStatusUpdate.md) | Object containing the update. |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/api/notify-namespace.ts:240](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/api/notify-namespace.ts#L240)

▸ **updateWebhook**(`addressWebhook`, `update`): `Promise`<`void`\>

Update a [AddressActivityWebhook](../interfaces/AddressActivityWebhook.md)'s active status or addresses.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressWebhook` | [`AddressActivityWebhook`](../interfaces/AddressActivityWebhook.md) | The address activity webhook to update. |
| `update` | [`AddressWebhookUpdate`](../modules.md#addresswebhookupdate) | Object containing the update. |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/api/notify-namespace.ts:251](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/api/notify-namespace.ts#L251)

▸ **updateWebhook**(`addressWebhookId`, `update`): `Promise`<`void`\>

Update a [AddressActivityWebhook](../interfaces/AddressActivityWebhook.md)'s active status or addresses.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressWebhookId` | `string` | The id of the address activity webhook. |
| `update` | [`AddressWebhookUpdate`](../modules.md#addresswebhookupdate) | Object containing the update. |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/api/notify-namespace.ts:262](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/api/notify-namespace.ts#L262)

___

### verifyConfig

▸ `Private` **verifyConfig**(): `void`

#### Returns

`void`

#### Defined in

[src/api/notify-namespace.ts:575](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/api/notify-namespace.ts#L575)
