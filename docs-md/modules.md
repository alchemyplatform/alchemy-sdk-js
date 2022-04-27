[exploring-pioneer](README.md) / Exports

# exploring-pioneer

## Table of contents

### Enumerations

- [AssetTransfersCategory](enums/AssetTransfersCategory.md)
- [AssetTransfersOrder](enums/AssetTransfersOrder.md)
- [Network](enums/Network.md)
- [NftTokenType](enums/NftTokenType.md)

### Classes

- [Alchemy](classes/Alchemy.md)
- [BaseNft](classes/BaseNft.md)
- [Nft](classes/Nft.md)

### Interfaces

- [AlchemyConfig](interfaces/AlchemyConfig.md)
- [AssetTransfersParams](interfaces/AssetTransfersParams.md)
- [AssetTransfersResponse](interfaces/AssetTransfersResponse.md)
- [AssetTransfersResult](interfaces/AssetTransfersResult.md)
- [CollectionBaseNftsResponse](interfaces/CollectionBaseNftsResponse.md)
- [CollectionNftsResponse](interfaces/CollectionNftsResponse.md)
- [ERC1155Metadata](interfaces/ERC1155Metadata.md)
- [GetBaseNftsForCollectionParams](interfaces/GetBaseNftsForCollectionParams.md)
- [GetBaseNftsParams](interfaces/GetBaseNftsParams.md)
- [GetNftsForCollectionParams](interfaces/GetNftsForCollectionParams.md)
- [GetNftsParams](interfaces/GetNftsParams.md)
- [GetOwnersForTokenResponse](interfaces/GetOwnersForTokenResponse.md)
- [NftContract](interfaces/NftContract.md)
- [NftMetadata](interfaces/NftMetadata.md)
- [OwnedBaseNft](interfaces/OwnedBaseNft.md)
- [OwnedBaseNftsResponse](interfaces/OwnedBaseNftsResponse.md)
- [OwnedNft](interfaces/OwnedNft.md)
- [OwnedNftsResponse](interfaces/OwnedNftsResponse.md)
- [RawContract](interfaces/RawContract.md)
- [TokenAllowanceParams](interfaces/TokenAllowanceParams.md)
- [TokenBalanceFailure](interfaces/TokenBalanceFailure.md)
- [TokenBalanceSuccess](interfaces/TokenBalanceSuccess.md)
- [TokenBalancesResponse](interfaces/TokenBalancesResponse.md)
- [TokenMetadataResponse](interfaces/TokenMetadataResponse.md)
- [TokenUri](interfaces/TokenUri.md)
- [TransactionReceiptsBlockHash](interfaces/TransactionReceiptsBlockHash.md)
- [TransactionReceiptsBlockNumber](interfaces/TransactionReceiptsBlockNumber.md)
- [TransactionReceiptsResponse](interfaces/TransactionReceiptsResponse.md)

### Type aliases

- [LogLevel](modules.md#loglevel)
- [TokenAllowanceResponse](modules.md#tokenallowanceresponse)
- [TokenBalance](modules.md#tokenbalance)
- [TransactionReceiptsParams](modules.md#transactionreceiptsparams)

### Functions

- [checkOwnership](modules.md#checkownership)
- [fromHex](modules.md#fromhex)
- [getAssetTransfers](modules.md#getassettransfers)
- [getNftMetadata](modules.md#getnftmetadata)
- [getNfts](modules.md#getnfts)
- [getNftsForCollection](modules.md#getnftsforcollection)
- [getNftsForCollectionPaginated](modules.md#getnftsforcollectionpaginated)
- [getNftsPaginated](modules.md#getnftspaginated)
- [getOwnersForToken](modules.md#getownersfortoken)
- [getTokenAllowance](modules.md#gettokenallowance)
- [getTokenBalances](modules.md#gettokenbalances)
- [getTokenMetadata](modules.md#gettokenmetadata)
- [getTransactionReceipts](modules.md#gettransactionreceipts)
- [initializeAlchemy](modules.md#initializealchemy)
- [isHex](modules.md#ishex)
- [setLogLevel](modules.md#setloglevel)
- [toHex](modules.md#tohex)

## Type aliases

### LogLevel

Ƭ **LogLevel**: ``"debug"`` \| ``"info"`` \| ``"warn"`` \| ``"error"`` \| ``"silent"``

The level of verbosity for the logger.

#### Defined in

[util/logger.ts:22](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/util/logger.ts#L22)

___

### TokenAllowanceResponse

Ƭ **TokenAllowanceResponse**: `string`

#### Defined in

[types/types.ts:50](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/types/types.ts#L50)

___

### TokenBalance

Ƭ **TokenBalance**: [`TokenBalanceSuccess`](interfaces/TokenBalanceSuccess.md) \| [`TokenBalanceFailure`](interfaces/TokenBalanceFailure.md)

#### Defined in

[types/types.ts:59](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/types/types.ts#L59)

___

### TransactionReceiptsParams

Ƭ **TransactionReceiptsParams**: [`TransactionReceiptsBlockNumber`](interfaces/TransactionReceiptsBlockNumber.md) \| [`TransactionReceiptsBlockHash`](interfaces/TransactionReceiptsBlockHash.md)

#### Defined in

[types/types.ts:314](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/types/types.ts#L314)

## Functions

### checkOwnership

▸ **checkOwnership**(`alchemy`, `owner`, `contractAddresses`): `Promise`<`boolean`\>

Checks that the provided owner address owns one of more of the provided NFTs.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `owner` | `string` | The owner address to check. |
| `contractAddresses` | `string`[] | An array of NFT contract addresses to check ownership for. |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[api/nft-api.ts:360](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/api/nft-api.ts#L360)

___

### fromHex

▸ **fromHex**(`hexString`): `number`

Converts a hex string to a decimal number.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hexString` | `string` | The hex string to convert. |

#### Returns

`number`

#### Defined in

[api/util.ts:9](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/api/util.ts#L9)

___

### getAssetTransfers

▸ **getAssetTransfers**(`alchemy`, `params`): `Promise`<[`AssetTransfersResponse`](interfaces/AssetTransfersResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) |
| `params` | [`AssetTransfersParams`](interfaces/AssetTransfersParams.md) |

#### Returns

`Promise`<[`AssetTransfersResponse`](interfaces/AssetTransfersResponse.md)\>

#### Defined in

[api/enhanced.ts:47](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/api/enhanced.ts#L47)

___

### getNftMetadata

▸ **getNftMetadata**(`alchemy`, `baseNft`): `Promise`<[`Nft`](classes/Nft.md)\>

Get the NFT metadata associated with the provided Base NFT.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `baseNft` | [`BaseNft`](classes/BaseNft.md) | The base NFT object to be used for the request. |

#### Returns

`Promise`<[`Nft`](classes/Nft.md)\>

#### Defined in

[api/nft-api.ts:38](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/api/nft-api.ts#L38)

▸ **getNftMetadata**(`alchemy`, `contractAddress`, `tokenId`, `tokenType?`): `Promise`<[`Nft`](classes/Nft.md)\>

Get the NFT metadata associated with the provided parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `contractAddress` | `string` | The contract address of the NFT. |
| `tokenId` | `string` \| `number` | Token id of the NFT as a hex string or integer. |
| `tokenType?` | [`NftTokenType`](enums/NftTokenType.md) | Optionally specify the type of token to speed up the query. |

#### Returns

`Promise`<[`Nft`](classes/Nft.md)\>

#### Defined in

[api/nft-api.ts:52](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/api/nft-api.ts#L52)

___

### getNfts

▸ **getNfts**(`alchemy`, `params`): `Promise`<[`OwnedBaseNftsResponse`](interfaces/OwnedBaseNftsResponse.md)\>

Get all base NFTs for an owner.

This method returns the base NFTs that omit the associated metadata. To get
all NFTs with their associated metadata, use [GetNftsParams](interfaces/GetNftsParams.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `params` | [`GetBaseNftsParams`](interfaces/GetBaseNftsParams.md) | The parameters to use for the request. |

#### Returns

`Promise`<[`OwnedBaseNftsResponse`](interfaces/OwnedBaseNftsResponse.md)\>

#### Defined in

[api/nft-api.ts:160](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/api/nft-api.ts#L160)

▸ **getNfts**(`alchemy`, `params`): `Promise`<[`OwnedNftsResponse`](interfaces/OwnedNftsResponse.md)\>

Get all NFTs for an owner.

This method returns the full NFTs in the contract. To get all NFTs without
their associated metadata, use [GetBaseNftsParams](interfaces/GetBaseNftsParams.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `params` | [`GetNftsParams`](interfaces/GetNftsParams.md) | The parameters to use for the request. |

#### Returns

`Promise`<[`OwnedNftsResponse`](interfaces/OwnedNftsResponse.md)\>

#### Defined in

[api/nft-api.ts:175](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/api/nft-api.ts#L175)

___

### getNftsForCollection

▸ **getNftsForCollection**(`alchemy`, `params`): `Promise`<[`CollectionBaseNftsResponse`](interfaces/CollectionBaseNftsResponse.md)\>

Get all base NFTs for a given contract address.

This method returns the base NFTs that omit the associated metadata. To get
all NFTs with their associated metadata, use [GetNftsForCollectionParams](interfaces/GetNftsForCollectionParams.md).

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `params` | [`GetBaseNftsForCollectionParams`](interfaces/GetBaseNftsForCollectionParams.md) | The parameters to use for the request. |

#### Returns

`Promise`<[`CollectionBaseNftsResponse`](interfaces/CollectionBaseNftsResponse.md)\>

#### Defined in

[api/nft-api.ts:211](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/api/nft-api.ts#L211)

▸ **getNftsForCollection**(`alchemy`, `params`): `Promise`<[`CollectionNftsResponse`](interfaces/CollectionNftsResponse.md)\>

Get all NFTs for a given contract address.

This method returns the full NFTs in the contract. To get all NFTs without
their associated metadata, use [GetBaseNftsForCollectionParams](interfaces/GetBaseNftsForCollectionParams.md).

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `params` | [`GetNftsForCollectionParams`](interfaces/GetNftsForCollectionParams.md) | The parameters to use for the request. or   [CollectionNftsResponse](interfaces/CollectionNftsResponse.md) response. |

#### Returns

`Promise`<[`CollectionNftsResponse`](interfaces/CollectionNftsResponse.md)\>

#### Defined in

[api/nft-api.ts:227](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/api/nft-api.ts#L227)

___

### getNftsForCollectionPaginated

▸ **getNftsForCollectionPaginated**(`alchemy`, `params`): `AsyncIterable`<[`BaseNft`](classes/BaseNft.md)\>

Fetches all base NFTs for a given contract address and yields them in an
async iterable.

This method returns the base NFTs that omit the associated metadata and pages
through all page keys until all NFTs have been fetched. To get all NFTs with
their associated metadata, use [GetNftsForCollectionParams](interfaces/GetNftsForCollectionParams.md).

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `params` | [`GetBaseNftsForCollectionParams`](interfaces/GetBaseNftsForCollectionParams.md) | The parameters to use for the request. |

#### Returns

`AsyncIterable`<[`BaseNft`](classes/BaseNft.md)\>

#### Defined in

[api/nft-api.ts:308](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/api/nft-api.ts#L308)

▸ **getNftsForCollectionPaginated**(`alchemy`, `params`): `AsyncIterable`<[`Nft`](classes/Nft.md)\>

Fetches all NFTs for a given contract address and yields them in an async iterable.

This method returns the full NFTs in the contract and pages through all page
keys until all NFTs have been fetched. To get all NFTs without their
associated metadata, use [GetBaseNftsForCollectionParams](interfaces/GetBaseNftsForCollectionParams.md).

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `params` | [`GetNftsForCollectionParams`](interfaces/GetNftsForCollectionParams.md) | The parameters to use for the request. |

#### Returns

`AsyncIterable`<[`Nft`](classes/Nft.md)\>

#### Defined in

[api/nft-api.ts:324](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/api/nft-api.ts#L324)

___

### getNftsPaginated

▸ **getNftsPaginated**(`alchemy`, `params`): `AsyncIterable`<[`OwnedBaseNft`](interfaces/OwnedBaseNft.md)\>

Fetches all NFTs for a given owner and yields them in an async iterable.

This method returns the base NFTs that omit the associated metadata and pages
through all page keys until all NFTs have been fetched.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `params` | [`GetBaseNftsParams`](interfaces/GetBaseNftsParams.md) | The parameters to use for the request. |

#### Returns

`AsyncIterable`<[`OwnedBaseNft`](interfaces/OwnedBaseNft.md)\>

#### Defined in

[api/nft-api.ts:105](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/api/nft-api.ts#L105)

▸ **getNftsPaginated**(`alchemy`, `params`): `AsyncIterable`<[`OwnedNft`](interfaces/OwnedNft.md)\>

Fetches all NFTs for a given owner and yields them in an async iterable.

This method returns the full NFT for the owner and pages through all page
keys until all NFTs have been fetched.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `params` | [`GetNftsParams`](interfaces/GetNftsParams.md) | The parameters to use for the request. |

#### Returns

`AsyncIterable`<[`OwnedNft`](interfaces/OwnedNft.md)\>

#### Defined in

[api/nft-api.ts:120](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/api/nft-api.ts#L120)

___

### getOwnersForToken

▸ **getOwnersForToken**(`alchemy`, `contractAddress`, `tokenId`): `Promise`<[`GetOwnersForTokenResponse`](interfaces/GetOwnersForTokenResponse.md)\>

Gets all the owners for a given NFT contract address and token ID.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `contractAddress` | `string` | The NFT contract address. |
| `tokenId` | `string` \| `number` | Token id of the NFT as a hex string or integer. |

#### Returns

`Promise`<[`GetOwnersForTokenResponse`](interfaces/GetOwnersForTokenResponse.md)\>

#### Defined in

[api/nft-api.ts:261](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/api/nft-api.ts#L261)

▸ **getOwnersForToken**(`alchemy`, `nft`): `Promise`<[`GetOwnersForTokenResponse`](interfaces/GetOwnersForTokenResponse.md)\>

Gets all the owners for a given NFT.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `nft` | [`BaseNft`](classes/BaseNft.md) | The NFT object to get the owners for. |

#### Returns

`Promise`<[`GetOwnersForTokenResponse`](interfaces/GetOwnersForTokenResponse.md)\>

#### Defined in

[api/nft-api.ts:274](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/api/nft-api.ts#L274)

___

### getTokenAllowance

▸ **getTokenAllowance**(`alchemy`, `params`): `Promise`<[`TokenAllowanceResponse`](modules.md#tokenallowanceresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) |
| `params` | [`TokenAllowanceParams`](interfaces/TokenAllowanceParams.md) |

#### Returns

`Promise`<[`TokenAllowanceResponse`](modules.md#tokenallowanceresponse)\>

#### Defined in

[api/enhanced.ts:17](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/api/enhanced.ts#L17)

___

### getTokenBalances

▸ **getTokenBalances**(`alchemy`, `address`, `contractAddresses?`): `Promise`<[`TokenBalancesResponse`](interfaces/TokenBalancesResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) |
| `address` | `string` |
| `contractAddresses?` | `string`[] |

#### Returns

`Promise`<[`TokenBalancesResponse`](interfaces/TokenBalancesResponse.md)\>

#### Defined in

[api/enhanced.ts:25](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/api/enhanced.ts#L25)

___

### getTokenMetadata

▸ **getTokenMetadata**(`alchemy`, `address`): `Promise`<[`TokenMetadataResponse`](interfaces/TokenMetadataResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) |
| `address` | `string` |

#### Returns

`Promise`<[`TokenMetadataResponse`](interfaces/TokenMetadataResponse.md)\>

#### Defined in

[api/enhanced.ts:39](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/api/enhanced.ts#L39)

___

### getTransactionReceipts

▸ **getTransactionReceipts**(`alchemy`, `params`): `Promise`<[`TransactionReceiptsResponse`](interfaces/TransactionReceiptsResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) |
| `params` | [`TransactionReceiptsParams`](modules.md#transactionreceiptsparams) |

#### Returns

`Promise`<[`TransactionReceiptsResponse`](interfaces/TransactionReceiptsResponse.md)\>

#### Defined in

[api/enhanced.ts:63](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/api/enhanced.ts#L63)

___

### initializeAlchemy

▸ **initializeAlchemy**(`config?`): [`Alchemy`](classes/Alchemy.md)

Entry point into the Alchemy SDK.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config?` | [`AlchemyConfig`](interfaces/AlchemyConfig.md) | Configuration object for the Alchemy SDK |

#### Returns

[`Alchemy`](classes/Alchemy.md)

#### Defined in

[api/alchemy.ts:15](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/api/alchemy.ts#L15)

___

### isHex

▸ **isHex**(`possibleHexString`): `boolean`

Checks if a value is a hex string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `possibleHexString` | `string` | The value to check. |

#### Returns

`boolean`

#### Defined in

[api/util.ts:29](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/api/util.ts#L29)

___

### setLogLevel

▸ **setLogLevel**(`logLevel`): `void`

Configures the verbosity of logging. The default log level is `info`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `logLevel` | [`LogLevel`](modules.md#loglevel) | The verbosity of logging. Can be any of the following values:    - `debug`: The most verbose logging level.   - `info`: The default logging level.   - `warn`: A logging level for non-critical issues.   - `error`: A logging level for critical issues.   - `silent`: Turn off all logging. |

#### Returns

`void`

#### Defined in

[util/logger.ts:56](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/util/logger.ts#L56)

___

### toHex

▸ **toHex**(`num`): `string`

Converts a number to a hex string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `num` | `number` | The number to convert to hex. |

#### Returns

`string`

#### Defined in

[api/util.ts:19](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/api/util.ts#L19)
