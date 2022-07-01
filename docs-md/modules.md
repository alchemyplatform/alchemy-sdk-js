[@alch/alchemy-sdk](README.md) / Exports

# @alch/alchemy-sdk

## Table of contents

### Enumerations

- [AssetTransfersCategory](enums/AssetTransfersCategory.md)
- [AssetTransfersOrder](enums/AssetTransfersOrder.md)
- [Network](enums/Network.md)
- [NftExcludeFilters](enums/NftExcludeFilters.md)
- [NftTokenType](enums/NftTokenType.md)

### Classes

- [Alchemy](classes/Alchemy.md)
- [AlchemyProvider](classes/AlchemyProvider.md)
- [AlchemyWebSocketProvider](classes/AlchemyWebSocketProvider.md)

### Interfaces

- [AlchemyConfig](interfaces/AlchemyConfig.md)
- [AssetTransfersParams](interfaces/AssetTransfersParams.md)
- [AssetTransfersResponse](interfaces/AssetTransfersResponse.md)
- [AssetTransfersResult](interfaces/AssetTransfersResult.md)
- [BaseNft](interfaces/BaseNft.md)
- [BaseNftContract](interfaces/BaseNftContract.md)
- [CollectionBaseNftsResponse](interfaces/CollectionBaseNftsResponse.md)
- [CollectionNftsResponse](interfaces/CollectionNftsResponse.md)
- [DeployResult](interfaces/DeployResult.md)
- [ERC1155Metadata](interfaces/ERC1155Metadata.md)
- [FloorPriceError](interfaces/FloorPriceError.md)
- [FloorPriceMarketplace](interfaces/FloorPriceMarketplace.md)
- [GetBaseNftsForCollectionOptions](interfaces/GetBaseNftsForCollectionOptions.md)
- [GetBaseNftsForOwnerOptions](interfaces/GetBaseNftsForOwnerOptions.md)
- [GetNftFloorPriceResponse](interfaces/GetNftFloorPriceResponse.md)
- [GetNftsForCollectionOptions](interfaces/GetNftsForCollectionOptions.md)
- [GetNftsForOwnerOptions](interfaces/GetNftsForOwnerOptions.md)
- [GetOwnersForCollectionResponse](interfaces/GetOwnersForCollectionResponse.md)
- [GetOwnersForNftResponse](interfaces/GetOwnersForNftResponse.md)
- [Nft](interfaces/Nft.md)
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

- [AlchemyEventFilter](modules.md#alchemyeventfilter)
- [AlchemyEventType](modules.md#alchemyeventtype)
- [LogLevel](modules.md#loglevel)
- [TokenBalance](modules.md#tokenbalance)
- [TransactionReceiptsParams](modules.md#transactionreceiptsparams)

### Functions

- [checkNftOwnership](modules.md#checknftownership)
- [findContractDeployer](modules.md#findcontractdeployer)
- [fromHex](modules.md#fromhex)
- [getAssetTransfers](modules.md#getassettransfers)
- [getNftContractMetadata](modules.md#getnftcontractmetadata)
- [getNftFloorPrice](modules.md#getnftfloorprice)
- [getNftMetadata](modules.md#getnftmetadata)
- [getNftsForCollection](modules.md#getnftsforcollection)
- [getNftsForCollectionIterator](modules.md#getnftsforcollectioniterator)
- [getNftsForOwner](modules.md#getnftsforowner)
- [getNftsForOwnerIterator](modules.md#getnftsforowneriterator)
- [getOwnersForCollection](modules.md#getownersforcollection)
- [getOwnersForNft](modules.md#getownersfornft)
- [getSpamNftContracts](modules.md#getspamnftcontracts)
- [getTokenBalances](modules.md#gettokenbalances)
- [getTokenMetadata](modules.md#gettokenmetadata)
- [getTransactionReceipts](modules.md#gettransactionreceipts)
- [initializeAlchemy](modules.md#initializealchemy)
- [isHex](modules.md#ishex)
- [isSpamNftContract](modules.md#isspamnftcontract)
- [refreshNftMetadata](modules.md#refreshnftmetadata)
- [setLogLevel](modules.md#setloglevel)
- [toHex](modules.md#tohex)

## Type aliases

### AlchemyEventFilter

Ƭ **AlchemyEventFilter**: { `method`: ``"alchemy_newFullPendingTransactions"``  } \| { `address`: `string` ; `method`: ``"alchemy_filteredNewFullPendingTransactions"``  }

Event filters for the [AlchemyWebSocketProvider.on](classes/AlchemyWebSocketProvider.md#on) method to use
Alchemy's custom Subscription API endpoints.

#### Defined in

[src/types/types.ts:499](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/types/types.ts#L499)

___

### AlchemyEventType

Ƭ **AlchemyEventType**: `EventType` \| [`AlchemyEventFilter`](modules.md#alchemyeventfilter)

Alchemy's event filter that extends the default {@link EventType} interface to
also include Alchemy's Subscription API.

#### Defined in

[src/types/types.ts:514](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/types/types.ts#L514)

___

### LogLevel

Ƭ **LogLevel**: ``"debug"`` \| ``"info"`` \| ``"warn"`` \| ``"error"`` \| ``"silent"``

The level of verbosity for the logger.

#### Defined in

[src/util/logger.ts:22](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/util/logger.ts#L22)

___

### TokenBalance

Ƭ **TokenBalance**: [`TokenBalanceSuccess`](interfaces/TokenBalanceSuccess.md) \| [`TokenBalanceFailure`](interfaces/TokenBalanceFailure.md)

#### Defined in

[src/types/types.ts:52](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/types/types.ts#L52)

___

### TransactionReceiptsParams

Ƭ **TransactionReceiptsParams**: [`TransactionReceiptsBlockNumber`](interfaces/TransactionReceiptsBlockNumber.md) \| [`TransactionReceiptsBlockHash`](interfaces/TransactionReceiptsBlockHash.md)

#### Defined in

[src/types/types.ts:384](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/types/types.ts#L384)

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

[src/api/nft-api.ts:516](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft-api.ts#L516)

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

[src/api/nft-api.ts:605](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft-api.ts#L605)

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

[src/api/util.ts:9](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/util.ts#L9)

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

[src/api/enhanced.ts:42](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/enhanced.ts#L42)

___

### getNftContractMetadata

▸ **getNftContractMetadata**(`alchemy`, `contractAddress`): `Promise`<[`NftContract`](interfaces/NftContract.md)\>

Get the NFT collection metadata associated with the provided parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `contractAddress` | `string` | The contract address of the NFT. |

#### Returns

`Promise`<[`NftContract`](interfaces/NftContract.md)\>

#### Defined in

[src/api/nft-api.ts:121](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft-api.ts#L121)

▸ **getNftContractMetadata**(`alchemy`, `baseNftContract`): `Promise`<[`NftContract`](interfaces/NftContract.md)\>

Get the NFT metadata associated with the provided Base NFT.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `baseNftContract` | [`BaseNftContract`](interfaces/BaseNftContract.md) | - |

#### Returns

`Promise`<[`NftContract`](interfaces/NftContract.md)\>

#### Defined in

[src/api/nft-api.ts:133](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft-api.ts#L133)

___

### getNftFloorPrice

▸ **getNftFloorPrice**(`alchemy`, `contractAddress`): `Promise`<[`GetNftFloorPriceResponse`](interfaces/GetNftFloorPriceResponse.md)\>

Returns the floor prices of a NFT contract by marketplace.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `contractAddress` | `string` | The contract address for the NFT collection. |

#### Returns

`Promise`<[`GetNftFloorPriceResponse`](interfaces/GetNftFloorPriceResponse.md)\>

#### Defined in

[src/api/nft-api.ts:578](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft-api.ts#L578)

___

### getNftMetadata

▸ **getNftMetadata**(`alchemy`, `contractAddress`, `tokenId`, `tokenType?`): `Promise`<[`Nft`](interfaces/Nft.md)\>

Get the NFT metadata associated with the provided parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `contractAddress` | `string` | The contract address of the NFT. |
| `tokenId` | `BigNumberish` | Token id of the NFT. |
| `tokenType?` | [`NftTokenType`](enums/NftTokenType.md) | Optionally specify the type of token to speed up the query. |

#### Returns

`Promise`<[`Nft`](interfaces/Nft.md)\>

#### Defined in

[src/api/nft-api.ts:56](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft-api.ts#L56)

▸ **getNftMetadata**(`alchemy`, `baseNft`): `Promise`<[`Nft`](interfaces/Nft.md)\>

Get the NFT metadata associated with the provided Base NFT.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `baseNft` | [`BaseNft`](interfaces/BaseNft.md) | The base NFT object to be used for the request. |

#### Returns

`Promise`<[`Nft`](interfaces/Nft.md)\>

#### Defined in

[src/api/nft-api.ts:70](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft-api.ts#L70)

___

### getNftsForCollection

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

[src/api/nft-api.ts:297](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft-api.ts#L297)

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

[src/api/nft-api.ts:314](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft-api.ts#L314)

___

### getNftsForCollectionIterator

▸ **getNftsForCollectionIterator**(`alchemy`, `contractAddress`, `options?`): `AsyncIterable`<[`Nft`](interfaces/Nft.md)\>

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
| `options?` | [`GetNftsForCollectionOptions`](interfaces/GetNftsForCollectionOptions.md) | The optional parameters to use for the request. |

#### Returns

`AsyncIterable`<[`Nft`](interfaces/Nft.md)\>

#### Defined in

[src/api/nft-api.ts:457](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft-api.ts#L457)

▸ **getNftsForCollectionIterator**(`alchemy`, `contractAddress`, `options?`): `AsyncIterable`<[`BaseNft`](interfaces/BaseNft.md)\>

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
| `options?` | [`GetBaseNftsForCollectionOptions`](interfaces/GetBaseNftsForCollectionOptions.md) | The optional parameters to use for the request. |

#### Returns

`AsyncIterable`<[`BaseNft`](interfaces/BaseNft.md)\>

#### Defined in

[src/api/nft-api.ts:476](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft-api.ts#L476)

___

### getNftsForOwner

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

[src/api/nft-api.ts:236](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft-api.ts#L236)

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

[src/api/nft-api.ts:253](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft-api.ts#L253)

___

### getNftsForOwnerIterator

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

[src/api/nft-api.ts:171](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft-api.ts#L171)

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

[src/api/nft-api.ts:188](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft-api.ts#L188)

___

### getOwnersForCollection

▸ **getOwnersForCollection**(`alchemy`, `contractAddress`): `Promise`<[`GetOwnersForCollectionResponse`](interfaces/GetOwnersForCollectionResponse.md)\>

Gets all the owners for a given NFT collection.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `contractAddress` | `string` | The NFT collection to get the owners for. |

#### Returns

`Promise`<[`GetOwnersForCollectionResponse`](interfaces/GetOwnersForCollectionResponse.md)\>

#### Defined in

[src/api/nft-api.ts:403](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft-api.ts#L403)

▸ **getOwnersForCollection**(`alchemy`, `nft`): `Promise`<[`GetOwnersForCollectionResponse`](interfaces/GetOwnersForCollectionResponse.md)\>

Gets all the owners for a given NFT collection.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `nft` | [`BaseNft`](interfaces/BaseNft.md) | The NFT to get the owners of the collection for. |

#### Returns

`Promise`<[`GetOwnersForCollectionResponse`](interfaces/GetOwnersForCollectionResponse.md)\>

#### Defined in

[src/api/nft-api.ts:415](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft-api.ts#L415)

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
| `tokenId` | `BigNumberish` | Token id of the NFT. |

#### Returns

`Promise`<[`GetOwnersForNftResponse`](interfaces/GetOwnersForNftResponse.md)\>

#### Defined in

[src/api/nft-api.ts:351](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft-api.ts#L351)

▸ **getOwnersForNft**(`alchemy`, `nft`): `Promise`<[`GetOwnersForNftResponse`](interfaces/GetOwnersForNftResponse.md)\>

Gets all the owners for a given NFT.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `nft` | [`BaseNft`](interfaces/BaseNft.md) | The NFT object to get the owners for. |

#### Returns

`Promise`<[`GetOwnersForNftResponse`](interfaces/GetOwnersForNftResponse.md)\>

#### Defined in

[src/api/nft-api.ts:364](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft-api.ts#L364)

___

### getSpamNftContracts

▸ **getSpamNftContracts**(`alchemy`): `Promise`<`string`[]\>

Returns a list of all spam contracts marked by Alchemy. For details on how
Alchemy marks spam contracts, go to
https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/nft-api-faq#nft-spam-classification.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[src/api/nft-api.ts:562](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft-api.ts#L562)

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

[src/api/enhanced.ts:15](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/enhanced.ts#L15)

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

[src/api/enhanced.ts:34](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/enhanced.ts#L34)

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

[src/api/enhanced.ts:58](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/enhanced.ts#L58)

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

[src/api/alchemy.ts:18](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/alchemy.ts#L18)

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

[src/api/util.ts:29](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/util.ts#L29)

___

### isSpamNftContract

▸ **isSpamNftContract**(`alchemy`, `contractAddress`): `Promise`<`boolean`\>

Returns whether a contract is marked as spam or not by Alchemy. For more
information on how we classify spam, go to our NFT API FAQ at
https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/nft-api-faq#nft-spam-classification.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `contractAddress` | `string` | The contract address to check. |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/api/nft-api.ts:540](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft-api.ts#L540)

___

### refreshNftMetadata

▸ **refreshNftMetadata**(`alchemy`, `contractAddress`, `tokenId`): `Promise`<`boolean`\>

Refreshes the cached metadata for a provided NFT contract address and token
id. Returns a boolean value indicating whether the metadata was refreshed.

This method is useful when you want to refresh the metadata for a NFT that
has been updated since the last time it was fetched. Note that the backend
only allows one refresh per token every 15 minutes, globally for all users.
The last refresh time for an NFT can be accessed on the
[Nft.timeLastUpdated](interfaces/Nft.md#timelastupdated) field.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `contractAddress` | `string` | The contract address of the NFT. |
| `tokenId` | `BigNumberish` | The token id of the NFT. |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/api/nft-api.ts:653](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft-api.ts#L653)

▸ **refreshNftMetadata**(`alchemy`, `nft`): `Promise`<`boolean`\>

Refreshes the cached metadata for a provided NFT contract address and token
id. Returns a boolean value indicating whether the metadata was refreshed.

This method is useful when you want to refresh the metadata for a NFT that
has been updated since the last time it was fetched. Note that the backend
only allows one refresh per token every 15 minutes, globally for all users.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alchemy` | [`Alchemy`](classes/Alchemy.md) | The Alchemy SDK instance. |
| `nft` | [`BaseNft`](interfaces/BaseNft.md) | The NFT to refresh the metadata for. |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/api/nft-api.ts:670](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft-api.ts#L670)

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

[src/util/logger.ts:56](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/util/logger.ts#L56)

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

[src/api/util.ts:19](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/util.ts#L19)
