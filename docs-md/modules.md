[alchemy-evm-js](README.md) / Exports

# alchemy-evm-js

## Table of contents

### Enumerations

- [AssetTransfersCategory](enums/AssetTransfersCategory.md)
- [AssetTransfersOrder](enums/AssetTransfersOrder.md)
- [Network](enums/Network.md)
- [NftExcludeFilters](enums/NftExcludeFilters.md)
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
- [DeployResult](interfaces/DeployResult.md)
- [ERC1155Metadata](interfaces/ERC1155Metadata.md)
- [GetBaseNftsForCollectionOptions](interfaces/GetBaseNftsForCollectionOptions.md)
- [GetBaseNftsForOwnerOptions](interfaces/GetBaseNftsForOwnerOptions.md)
- [GetNftsForCollectionOptions](interfaces/GetNftsForCollectionOptions.md)
- [GetNftsForOwnerOptions](interfaces/GetNftsForOwnerOptions.md)
- [GetOwnersForNftResponse](interfaces/GetOwnersForNftResponse.md)
- [NftContract](interfaces/NftContract.md)
- [NftMetadata](interfaces/NftMetadata.md)
- [OwnedBaseNft](interfaces/OwnedBaseNft.md)
- [OwnedBaseNftsResponse](interfaces/OwnedBaseNftsResponse.md)
- [OwnedNft](interfaces/OwnedNft.md)
- [OwnedNftsResponse](interfaces/OwnedNftsResponse.md)
- [RawContract](interfaces/RawContract.md)
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
- [TokenBalance](modules.md#tokenbalance)
- [TransactionReceiptsParams](modules.md#transactionreceiptsparams)

### Functions

- [checkNftOwnership](modules.md#checknftownership)
- [findContractDeployer](modules.md#findcontractdeployer)
- [fromHex](modules.md#fromhex)
- [getAssetTransfers](modules.md#getassettransfers)
- [getNftMetadata](modules.md#getnftmetadata)
- [getNftsForCollection](modules.md#getnftsforcollection)
- [getNftsForCollectionIterator](modules.md#getnftsforcollectioniterator)
- [getNftsForOwner](modules.md#getnftsforowner)
- [getNftsForOwnerIterator](modules.md#getnftsforowneriterator)
- [getOwnersForNft](modules.md#getownersfornft)
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

[util/logger.ts:22](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/util/logger.ts#L22)

___

### TokenBalance

Ƭ **TokenBalance**: [`TokenBalanceSuccess`](interfaces/TokenBalanceSuccess.md) \| [`TokenBalanceFailure`](interfaces/TokenBalanceFailure.md)

#### Defined in

[types/types.ts:49](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/types/types.ts#L49)

___

### TransactionReceiptsParams

Ƭ **TransactionReceiptsParams**: [`TransactionReceiptsBlockNumber`](interfaces/TransactionReceiptsBlockNumber.md) \| [`TransactionReceiptsBlockHash`](interfaces/TransactionReceiptsBlockHash.md)

#### Defined in

[types/types.ts:323](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/types/types.ts#L323)

## Functions

### checkNftOwnership

▸ **checkNftOwnership**(`alchemy`, `owner`, `contractAddresses`): `Promise`<`boolean`\>

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

[api/nft-api.ts:391](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/nft-api.ts#L391)

___

### findContractDeployer

▸ **findContractDeployer**(`alchemy`, `contractAddress`): `Promise`<[`DeployResult`](interfaces/DeployResult.md)\>

Finds the address that deployed the provided contract and block number it was
deployed in.

NOTE: This method performs a binary search across all blocks since genesis
and can take a long time to complete. This method is a convenience method
that will eventually be replaced by a single call to an Alchemy endpoint with
this information cached.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `contractAddress` | `string` | The contract address to find the deployer for. |

#### Returns

`Promise`<[`DeployResult`](interfaces/DeployResult.md)\>

#### Defined in

[api/nft-api.ts:419](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/nft-api.ts#L419)

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

[api/util.ts:9](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/util.ts#L9)

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

[api/enhanced.ts:37](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/enhanced.ts#L37)

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

[api/nft-api.ts:43](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/nft-api.ts#L43)

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

[api/nft-api.ts:57](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/nft-api.ts#L57)

___

### getNftsForCollection

▸ **getNftsForCollection**(`alchemy`, `contractAddress`, `options?`): `Promise`<[`CollectionBaseNftsResponse`](interfaces/CollectionBaseNftsResponse.md)\>

Get all base NFTs for a given contract address.

This method returns the base NFTs that omit the associated metadata. To get
all NFTs with their associated metadata, use [GetNftsForCollectionOptions](interfaces/GetNftsForCollectionOptions.md).

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `contractAddress` | `string` | The contract address of the collection. |
| `options?` | [`GetBaseNftsForCollectionOptions`](interfaces/GetBaseNftsForCollectionOptions.md) | The optional parameters to use for the request. |

#### Returns

`Promise`<[`CollectionBaseNftsResponse`](interfaces/CollectionBaseNftsResponse.md)\>

#### Defined in

[api/nft-api.ts:233](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/nft-api.ts#L233)

▸ **getNftsForCollection**(`alchemy`, `contractAddress`, `options?`): `Promise`<[`CollectionNftsResponse`](interfaces/CollectionNftsResponse.md)\>

Get all NFTs for a given contract address.

This method returns the full NFTs in the contract. To get all NFTs without
their associated metadata, use [GetBaseNftsForCollectionOptions](interfaces/GetBaseNftsForCollectionOptions.md).

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `contractAddress` | `string` | The contract address of the collection. |
| `options?` | [`GetNftsForCollectionOptions`](interfaces/GetNftsForCollectionOptions.md) | The parameters to use for the request. or   [CollectionNftsResponse](interfaces/CollectionNftsResponse.md) response. |

#### Returns

`Promise`<[`CollectionNftsResponse`](interfaces/CollectionNftsResponse.md)\>

#### Defined in

[api/nft-api.ts:251](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/nft-api.ts#L251)

___

### getNftsForCollectionIterator

▸ **getNftsForCollectionIterator**(`alchemy`, `contractAddress`, `options`): `AsyncIterable`<[`BaseNft`](classes/BaseNft.md)\>

Fetches all base NFTs for a given contract address and yields them in an
async iterable.

This method returns the base NFTs that omit the associated metadata and pages
through all page keys until all NFTs have been fetched. To get all NFTs with
their associated metadata, use [GetNftsForCollectionOptions](interfaces/GetNftsForCollectionOptions.md).

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `contractAddress` | `string` | The contract address of the collection. |
| `options` | [`GetBaseNftsForCollectionOptions`](interfaces/GetBaseNftsForCollectionOptions.md) | The optional parameters to use for the request. |

#### Returns

`AsyncIterable`<[`BaseNft`](classes/BaseNft.md)\>

#### Defined in

[api/nft-api.ts:335](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/nft-api.ts#L335)

▸ **getNftsForCollectionIterator**(`alchemy`, `contractAddress`, `options`): `AsyncIterable`<[`Nft`](classes/Nft.md)\>

Fetches all NFTs for a given contract address and yields them in an async iterable.

This method returns the full NFTs in the contract and pages through all page
keys until all NFTs have been fetched. To get all NFTs without their
associated metadata, use [GetBaseNftsForCollectionOptions](interfaces/GetBaseNftsForCollectionOptions.md).

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `contractAddress` | `string` | The contract address of the collection. |
| `options` | [`GetNftsForCollectionOptions`](interfaces/GetNftsForCollectionOptions.md) | The optional parameters to use for the request. |

#### Returns

`AsyncIterable`<[`Nft`](classes/Nft.md)\>

#### Defined in

[api/nft-api.ts:353](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/nft-api.ts#L353)

___

### getNftsForOwner

▸ **getNftsForOwner**(`alchemy`, `owner`, `options?`): `Promise`<[`OwnedBaseNftsResponse`](interfaces/OwnedBaseNftsResponse.md)\>

Get all base NFTs for an owner.

This method returns the base NFTs that omit the associated metadata. To get
all NFTs with their associated metadata, use [GetNftsForOwnerOptions](interfaces/GetNftsForOwnerOptions.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `owner` | `string` | The address of the owner. |
| `options?` | [`GetBaseNftsForOwnerOptions`](interfaces/GetBaseNftsForOwnerOptions.md) | The optional parameters to use for the request. |

#### Returns

`Promise`<[`OwnedBaseNftsResponse`](interfaces/OwnedBaseNftsResponse.md)\>

#### Defined in

[api/nft-api.ts:174](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/nft-api.ts#L174)

▸ **getNftsForOwner**(`alchemy`, `owner`, `options?`): `Promise`<[`OwnedNftsResponse`](interfaces/OwnedNftsResponse.md)\>

Get all NFTs for an owner.

This method returns the full NFTs in the contract. To get all NFTs without
their associated metadata, use [GetBaseNftsForOwnerOptions](interfaces/GetBaseNftsForOwnerOptions.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `owner` | `string` | The address of the owner. |
| `options?` | [`GetNftsForOwnerOptions`](interfaces/GetNftsForOwnerOptions.md) | The optional parameters to use for the request. |

#### Returns

`Promise`<[`OwnedNftsResponse`](interfaces/OwnedNftsResponse.md)\>

#### Defined in

[api/nft-api.ts:191](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/nft-api.ts#L191)

___

### getNftsForOwnerIterator

▸ **getNftsForOwnerIterator**(`alchemy`, `owner`, `options?`): `AsyncIterable`<[`OwnedBaseNft`](interfaces/OwnedBaseNft.md)\>

Fetches all NFTs for a given owner and yields them in an async iterable.

This method returns the base NFTs that omit the associated metadata and pages
through all page keys until all NFTs have been fetched.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `owner` | `string` | The address of the owner. |
| `options?` | [`GetBaseNftsForOwnerOptions`](interfaces/GetBaseNftsForOwnerOptions.md) | The optional parameters to use for the request. |

#### Returns

`AsyncIterable`<[`OwnedBaseNft`](interfaces/OwnedBaseNft.md)\>

#### Defined in

[api/nft-api.ts:111](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/nft-api.ts#L111)

▸ **getNftsForOwnerIterator**(`alchemy`, `owner`, `options?`): `AsyncIterable`<[`OwnedNft`](interfaces/OwnedNft.md)\>

Fetches all NFTs for a given owner and yields them in an async iterable.

This method returns the full NFT for the owner and pages through all page
keys until all NFTs have been fetched.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `owner` | `string` | The address of the owner. |
| `options?` | [`GetNftsForOwnerOptions`](interfaces/GetNftsForOwnerOptions.md) | The optional parameters to use for the request. |

#### Returns

`AsyncIterable`<[`OwnedNft`](interfaces/OwnedNft.md)\>

#### Defined in

[api/nft-api.ts:128](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/nft-api.ts#L128)

___

### getOwnersForNft

▸ **getOwnersForNft**(`alchemy`, `contractAddress`, `tokenId`): `Promise`<[`GetOwnersForNftResponse`](interfaces/GetOwnersForNftResponse.md)\>

Gets all the owners for a given NFT contract address and token ID.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `contractAddress` | `string` | The NFT contract address. |
| `tokenId` | `string` \| `number` | Token id of the NFT as a hex string or integer. |

#### Returns

`Promise`<[`GetOwnersForNftResponse`](interfaces/GetOwnersForNftResponse.md)\>

#### Defined in

[api/nft-api.ts:287](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/nft-api.ts#L287)

▸ **getOwnersForNft**(`alchemy`, `nft`): `Promise`<[`GetOwnersForNftResponse`](interfaces/GetOwnersForNftResponse.md)\>

Gets all the owners for a given NFT.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `nft` | [`BaseNft`](classes/BaseNft.md) | The NFT object to get the owners for. |

#### Returns

`Promise`<[`GetOwnersForNftResponse`](interfaces/GetOwnersForNftResponse.md)\>

#### Defined in

[api/nft-api.ts:300](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/nft-api.ts#L300)

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

[api/enhanced.ts:15](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/enhanced.ts#L15)

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

[api/enhanced.ts:29](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/enhanced.ts#L29)

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

[api/enhanced.ts:53](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/enhanced.ts#L53)

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

[api/alchemy.ts:15](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/alchemy.ts#L15)

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

[api/util.ts:29](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/util.ts#L29)

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

[util/logger.ts:56](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/util/logger.ts#L56)

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

[api/util.ts:19](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/util.ts#L19)
