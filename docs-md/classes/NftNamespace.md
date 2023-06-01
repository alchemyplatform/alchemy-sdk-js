[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftNamespace

# Class: NftNamespace

The NFT namespace contains all the functionality related to NFTs.

Do not call this constructor directly. Instead, instantiate an Alchemy object
with `const alchemy = new Alchemy(config)` and then access the core namespace
via `alchemy.nft`.

## Table of contents

### Methods

- [computeRarity](NftNamespace.md#computerarity)
- [getContractMetadata](NftNamespace.md#getcontractmetadata)
- [getContractMetadataBatch](NftNamespace.md#getcontractmetadatabatch)
- [getContractsForOwner](NftNamespace.md#getcontractsforowner)
- [getFloorPrice](NftNamespace.md#getfloorprice)
- [getMintedNfts](NftNamespace.md#getmintednfts)
- [getNftMetadata](NftNamespace.md#getnftmetadata)
- [getNftMetadataBatch](NftNamespace.md#getnftmetadatabatch)
- [getNftSales](NftNamespace.md#getnftsales)
- [getNftsForContract](NftNamespace.md#getnftsforcontract)
- [getNftsForContractIterator](NftNamespace.md#getnftsforcontractiterator)
- [getNftsForOwner](NftNamespace.md#getnftsforowner)
- [getNftsForOwnerIterator](NftNamespace.md#getnftsforowneriterator)
- [getOwnersForContract](NftNamespace.md#getownersforcontract)
- [getOwnersForNft](NftNamespace.md#getownersfornft)
- [getSpamContracts](NftNamespace.md#getspamcontracts)
- [getTransfersForContract](NftNamespace.md#gettransfersforcontract)
- [getTransfersForOwner](NftNamespace.md#gettransfersforowner)
- [isSpamContract](NftNamespace.md#isspamcontract)
- [refreshContract](NftNamespace.md#refreshcontract)
- [refreshNftMetadata](NftNamespace.md#refreshnftmetadata)
- [searchContractMetadata](NftNamespace.md#searchcontractmetadata)
- [summarizeNftAttributes](NftNamespace.md#summarizenftattributes)
- [verifyNftOwnership](NftNamespace.md#verifynftownership)

## Methods

### computeRarity

▸ **computeRarity**(`contractAddress`, `tokenId`): `Promise`<[`ComputeRarityResponse`](../interfaces/ComputeRarityResponse.md)\>

Get the rarity of each attribute of an NFT.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | Contract address for the NFT collection. |
| `tokenId` | [`BigNumberish`](../modules.md#bignumberish) | Token id of the NFT. |

#### Returns

`Promise`<[`ComputeRarityResponse`](../interfaces/ComputeRarityResponse.md)\>

#### Defined in

[src/api/nft-namespace.ts:492](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L492)

___

### getContractMetadata

▸ **getContractMetadata**(`contractAddress`): `Promise`<[`NftContract`](../interfaces/NftContract.md)\>

Get the NFT contract metadata associated with the provided parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The contract address of the NFT. |

#### Returns

`Promise`<[`NftContract`](../interfaces/NftContract.md)\>

#### Defined in

[src/api/nft-namespace.ts:138](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L138)

___

### getContractMetadataBatch

▸ **getContractMetadataBatch**(`contractAddresses`): `Promise`<[`GetContractMetadataBatchResponse`](../interfaces/GetContractMetadataBatchResponse.md)\>

Get the NFT contract metadata for multiple NFT contracts in a single request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddresses` | `string`[] | An array of contract addresses to fetch metadata for. |

#### Returns

`Promise`<[`GetContractMetadataBatchResponse`](../interfaces/GetContractMetadataBatchResponse.md)\>

#### Defined in

[src/api/nft-namespace.ts:147](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L147)

___

### getContractsForOwner

▸ **getContractsForOwner**(`owner`, `options?`): `Promise`<[`GetContractsForOwnerResponse`](../interfaces/GetContractsForOwnerResponse.md)\>

Gets all NFT contracts held by the specified owner address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` | Address for NFT owner (can be in ENS format!). |
| `options?` | [`GetContractsForOwnerOptions`](../interfaces/GetContractsForOwnerOptions.md) | The optional parameters to use for the request. |

#### Returns

`Promise`<[`GetContractsForOwnerResponse`](../interfaces/GetContractsForOwnerResponse.md)\>

#### Defined in

[src/api/nft-namespace.ts:359](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L359)

___

### getFloorPrice

▸ **getFloorPrice**(`contractAddress`): `Promise`<[`GetFloorPriceResponse`](../interfaces/GetFloorPriceResponse.md)\>

Returns the floor prices of a NFT contract by marketplace.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The contract address for the NFT collection. |

#### Returns

`Promise`<[`GetFloorPriceResponse`](../interfaces/GetFloorPriceResponse.md)\>

#### Defined in

[src/api/nft-namespace.ts:466](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L466)

___

### getMintedNfts

▸ **getMintedNfts**(`owner`, `options?`): `Promise`<[`TransfersNftResponse`](../interfaces/TransfersNftResponse.md)\>

Get all the NFTs minted by a specified owner address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` | Address for the NFT owner (can be in ENS format). |
| `options?` | [`GetMintedNftsOptions`](../interfaces/GetMintedNftsOptions.md) | The optional parameters to use for the request. |

#### Returns

`Promise`<[`TransfersNftResponse`](../interfaces/TransfersNftResponse.md)\>

#### Defined in

[src/api/nft-namespace.ts:403](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L403)

___

### getNftMetadata

▸ **getNftMetadata**(`contractAddress`, `tokenId`, `options?`): `Promise`<[`Nft`](../interfaces/Nft.md)\>

Get the NFT metadata associated with the provided parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The contract address of the NFT. |
| `tokenId` | [`BigNumberish`](../modules.md#bignumberish) | Token id of the NFT. |
| `options?` | [`GetNftMetadataOptions`](../interfaces/GetNftMetadataOptions.md) | Options for the request. |

#### Returns

`Promise`<[`Nft`](../interfaces/Nft.md)\>

#### Defined in

[src/api/nft-namespace.ts:92](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L92)

___

### getNftMetadataBatch

▸ **getNftMetadataBatch**(`tokens`, `options?`): `Promise`<[`GetNftMetadataBatchResponse`](../interfaces/GetNftMetadataBatchResponse.md)\>

Gets the NFT metadata for multiple NFT tokens.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokens` | [`NftMetadataBatchToken`](../interfaces/NftMetadataBatchToken.md)[] | An array of NFT tokens to fetch metadata for. |
| `options?` | [`NftMetadataBatchOptions`](../interfaces/NftMetadataBatchOptions.md) | Configuration options for making the request. |

#### Returns

`Promise`<[`GetNftMetadataBatchResponse`](../interfaces/GetNftMetadataBatchResponse.md)\>

#### Defined in

[src/api/nft-namespace.ts:125](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L125)

___

### getNftSales

▸ **getNftSales**(`options?`): `Promise`<[`GetNftSalesResponse`](../interfaces/GetNftSalesResponse.md)\>

Returns NFT sales that have happened through on-chain marketplaces.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`GetNftSalesOptions`](../interfaces/GetNftSalesOptions.md) | The optional parameters to use for the request. |

#### Returns

`Promise`<[`GetNftSalesResponse`](../interfaces/GetNftSalesResponse.md)\>

#### Defined in

[src/api/nft-namespace.ts:476](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L476)

▸ **getNftSales**(`options?`): `Promise`<[`GetNftSalesResponse`](../interfaces/GetNftSalesResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`GetNftSalesOptionsByContractAddress`](../interfaces/GetNftSalesOptionsByContractAddress.md) |

#### Returns

`Promise`<[`GetNftSalesResponse`](../interfaces/GetNftSalesResponse.md)\>

#### Defined in

[src/api/nft-namespace.ts:477](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L477)

___

### getNftsForContract

▸ **getNftsForContract**(`contractAddress`, `options?`): `Promise`<[`NftContractNftsResponse`](../interfaces/NftContractNftsResponse.md)\>

Get all NFTs for a given contract address.

This method returns the full NFTs in the contract. To get all NFTs without
their associated metadata, use [GetBaseNftsForContractOptions](../interfaces/GetBaseNftsForContractOptions.md).

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The contract address of the NFT contract. |
| `options?` | [`GetNftsForContractOptions`](../interfaces/GetNftsForContractOptions.md) | The parameters to use for the request. or   [NftContractNftsResponse](../interfaces/NftContractNftsResponse.md) response. |

#### Returns

`Promise`<[`NftContractNftsResponse`](../interfaces/NftContractNftsResponse.md)\>

#### Defined in

[src/api/nft-namespace.ts:234](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L234)

▸ **getNftsForContract**(`contractAddress`, `options?`): `Promise`<[`NftContractBaseNftsResponse`](../interfaces/NftContractBaseNftsResponse.md)\>

Get all base NFTs for a given contract address.

This method returns the base NFTs that omit the associated metadata. To get
all NFTs with their associated metadata, use [GetNftsForContractOptions](../interfaces/GetNftsForContractOptions.md).

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The contract address of the NFT contract. |
| `options?` | [`GetBaseNftsForContractOptions`](../interfaces/GetBaseNftsForContractOptions.md) | The optional parameters to use for the request. |

#### Returns

`Promise`<[`NftContractBaseNftsResponse`](../interfaces/NftContractBaseNftsResponse.md)\>

#### Defined in

[src/api/nft-namespace.ts:248](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L248)

___

### getNftsForContractIterator

▸ **getNftsForContractIterator**(`contractAddress`, `options?`): `AsyncIterable`<[`Nft`](../interfaces/Nft.md)\>

Fetches all NFTs for a given contract address and yields them in an async iterable.

This method returns the full NFTs in the contract and pages through all
page keys until all NFTs have been fetched. To get all NFTs without their
associated metadata, use [GetBaseNftsForContractOptions](../interfaces/GetBaseNftsForContractOptions.md).

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The contract address of the NFT contract. |
| `options?` | [`GetNftsForContractOptions`](../interfaces/GetNftsForContractOptions.md) | The optional parameters to use for the request. |

#### Returns

`AsyncIterable`<[`Nft`](../interfaces/Nft.md)\>

#### Defined in

[src/api/nft-namespace.ts:270](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L270)

▸ **getNftsForContractIterator**(`contractAddress`, `options?`): `AsyncIterable`<[`BaseNft`](../interfaces/BaseNft.md)\>

Fetches all base NFTs for a given contract address and yields them in an
async iterable.

This method returns the base NFTs that omit the associated metadata and
pages through all page keys until all NFTs have been fetched. To get all
NFTs with their associated metadata, use [GetNftsForContractOptions](../interfaces/GetNftsForContractOptions.md).

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The contract address of the NFT contract. |
| `options?` | [`GetBaseNftsForContractOptions`](../interfaces/GetBaseNftsForContractOptions.md) | The optional parameters to use for the request. |

#### Returns

`AsyncIterable`<[`BaseNft`](../interfaces/BaseNft.md)\>

#### Defined in

[src/api/nft-namespace.ts:286](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L286)

___

### getNftsForOwner

▸ **getNftsForOwner**(`owner`, `options`): `Promise`<[`OwnedBaseNftsResponse`](../interfaces/OwnedBaseNftsResponse.md)\>

Get all base NFTs for an owner.

This method returns the base NFTs that omit the associated metadata. To get
all NFTs with their associated metadata, use [GetNftsForOwnerOptions](../interfaces/GetNftsForOwnerOptions.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` | The address of the owner. |
| `options` | [`GetBaseNftsForOwnerOptions`](../interfaces/GetBaseNftsForOwnerOptions.md) | The optional parameters to use for the request. |

#### Returns

`Promise`<[`OwnedBaseNftsResponse`](../interfaces/OwnedBaseNftsResponse.md)\>

#### Defined in

[src/api/nft-namespace.ts:198](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L198)

▸ **getNftsForOwner**(`owner`, `options?`): `Promise`<[`OwnedNftsResponse`](../interfaces/OwnedNftsResponse.md)\>

Get all NFTs for an owner.

This method returns the full NFTs in the contract. To get all NFTs without
their associated metadata, use [GetBaseNftsForOwnerOptions](../interfaces/GetBaseNftsForOwnerOptions.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` | The address of the owner. |
| `options?` | [`GetNftsForOwnerOptions`](../interfaces/GetNftsForOwnerOptions.md) | The optional parameters to use for the request. |

#### Returns

`Promise`<[`OwnedNftsResponse`](../interfaces/OwnedNftsResponse.md)\>

#### Defined in

[src/api/nft-namespace.ts:212](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L212)

___

### getNftsForOwnerIterator

▸ **getNftsForOwnerIterator**(`owner`, `options?`): `AsyncIterable`<[`OwnedNft`](../interfaces/OwnedNft.md)\>

Fetches all NFTs for a given owner and yields them in an async iterable.

This method returns the full NFT for the owner and pages through all page
keys until all NFTs have been fetched.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` | The address of the owner. |
| `options?` | [`GetNftsForOwnerOptions`](../interfaces/GetNftsForOwnerOptions.md) | The optional parameters to use for the request. |

#### Returns

`AsyncIterable`<[`OwnedNft`](../interfaces/OwnedNft.md)\>

#### Defined in

[src/api/nft-namespace.ts:163](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L163)

▸ **getNftsForOwnerIterator**(`owner`, `options?`): `AsyncIterable`<[`OwnedBaseNft`](../interfaces/OwnedBaseNft.md)\>

Fetches all NFTs for a given owner and yields them in an async iterable.

This method returns the base NFTs that omit the associated metadata and
pages through all page keys until all NFTs have been fetched.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` | The address of the owner. |
| `options?` | [`GetBaseNftsForOwnerOptions`](../interfaces/GetBaseNftsForOwnerOptions.md) | The optional parameters to use for the request. |

#### Returns

`AsyncIterable`<[`OwnedBaseNft`](../interfaces/OwnedBaseNft.md)\>

#### Defined in

[src/api/nft-namespace.ts:177](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L177)

___

### getOwnersForContract

▸ **getOwnersForContract**(`contractAddress`, `options`): `Promise`<[`GetOwnersForContractWithTokenBalancesResponse`](../interfaces/GetOwnersForContractWithTokenBalancesResponse.md)\>

Gets all the owners for a given NFT contract along with the token balance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The NFT contract to get the owners for. |
| `options` | [`GetOwnersForContractWithTokenBalancesOptions`](../interfaces/GetOwnersForContractWithTokenBalancesOptions.md) | Optional parameters to use for the request. |

#### Returns

`Promise`<[`GetOwnersForContractWithTokenBalancesResponse`](../interfaces/GetOwnersForContractWithTokenBalancesResponse.md)\>

#### Defined in

[src/api/nft-namespace.ts:304](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L304)

▸ **getOwnersForContract**(`contractAddress`, `options?`): `Promise`<[`GetOwnersForContractResponse`](../interfaces/GetOwnersForContractResponse.md)\>

Gets all the owners for a given NFT contract.

Note that token balances are omitted by default. To include token balances
for each owner, use [GetOwnersForContractWithTokenBalancesOptions](../interfaces/GetOwnersForContractWithTokenBalancesOptions.md),
which has the `withTokenBalances` field set to `true`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The NFT contract to get the owners for. |
| `options?` | [`GetOwnersForContractOptions`](../interfaces/GetOwnersForContractOptions.md) | Optional parameters to use for the request. |

#### Returns

`Promise`<[`GetOwnersForContractResponse`](../interfaces/GetOwnersForContractResponse.md)\>

#### Defined in

[src/api/nft-namespace.ts:320](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L320)

___

### getOwnersForNft

▸ **getOwnersForNft**(`contractAddress`, `tokenId`, `options?`): `Promise`<[`GetOwnersForNftResponse`](../interfaces/GetOwnersForNftResponse.md)\>

Gets all the owners for a given NFT contract address and token ID.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The NFT contract address. |
| `tokenId` | [`BigNumberish`](../modules.md#bignumberish) | Token id of the NFT. |
| `options?` | [`GetOwnersForNftOptions`](../interfaces/GetOwnersForNftOptions.md) | Optional parameters to use for the request. |

#### Returns

`Promise`<[`GetOwnersForNftResponse`](../interfaces/GetOwnersForNftResponse.md)\>

#### Defined in

[src/api/nft-namespace.ts:343](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L343)

___

### getSpamContracts

▸ **getSpamContracts**(): `Promise`<[`GetSpamContractsResponse`](../interfaces/GetSpamContractsResponse.md)\>

Returns a list of all spam contracts marked by Alchemy. For details on how
Alchemy marks spam contracts, go to
https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/nft-api-faq#nft-spam-classification.

**`beta`**

#### Returns

`Promise`<[`GetSpamContractsResponse`](../interfaces/GetSpamContractsResponse.md)\>

#### Defined in

[src/api/nft-namespace.ts:456](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L456)

___

### getTransfersForContract

▸ **getTransfersForContract**(`contract`, `options?`): `Promise`<[`TransfersNftResponse`](../interfaces/TransfersNftResponse.md)\>

Gets all NFT transfers for a given NFT contract address.

Defaults to all transfers for the contract. To get transfers for a specific
block range, use [GetTransfersForContractOptions](../interfaces/GetTransfersForContractOptions.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | `string` | The NFT contract to get transfers for. |
| `options?` | [`GetTransfersForContractOptions`](../interfaces/GetTransfersForContractOptions.md) | Additional options for the request. |

#### Returns

`Promise`<[`TransfersNftResponse`](../interfaces/TransfersNftResponse.md)\>

#### Defined in

[src/api/nft-namespace.ts:390](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L390)

___

### getTransfersForOwner

▸ **getTransfersForOwner**(`owner`, `category`, `options?`): `Promise`<[`TransfersNftResponse`](../interfaces/TransfersNftResponse.md)\>

Gets all NFT transfers for a given owner's address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` | The owner to get transfers for. |
| `category` | [`GetTransfersForOwnerTransferType`](../enums/GetTransfersForOwnerTransferType.md) | Whether to get transfers to or from the owner address. |
| `options?` | [`GetTransfersForOwnerOptions`](../interfaces/GetTransfersForOwnerOptions.md) | Additional options for the request. |

#### Returns

`Promise`<[`TransfersNftResponse`](../interfaces/TransfersNftResponse.md)\>

#### Defined in

[src/api/nft-namespace.ts:373](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L373)

___

### isSpamContract

▸ **isSpamContract**(`contractAddress`): `Promise`<[`IsSpamContractResponse`](../interfaces/IsSpamContractResponse.md)\>

Returns whether a contract is marked as spam or not by Alchemy. For more
information on how we classify spam, go to our NFT API FAQ at
https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/nft-api-faq#nft-spam-classification.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The contract address to check. |

#### Returns

`Promise`<[`IsSpamContractResponse`](../interfaces/IsSpamContractResponse.md)\>

#### Defined in

[src/api/nft-namespace.ts:445](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L445)

___

### refreshContract

▸ **refreshContract**(`contractAddress`): `Promise`<[`RefreshContractResult`](../interfaces/RefreshContractResult.md)\>

Triggers a metadata refresh all NFTs in the provided contract address. This
method is useful after an NFT collection is revealed.

Refreshes are queued on the Alchemy backend and may take time to fully
process. To refresh the metadata for a specific token, use the
[refreshNftMetadata](NftNamespace.md#refreshnftmetadata) method instead.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The contract address of the NFT collection. |

#### Returns

`Promise`<[`RefreshContractResult`](../interfaces/RefreshContractResult.md)\>

#### Defined in

[src/api/nft-namespace.ts:554](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L554)

___

### refreshNftMetadata

▸ **refreshNftMetadata**(`contractAddress`, `tokenId`): `Promise`<`boolean`\>

Refreshes the cached metadata for a provided NFT contract address and token
id. Returns a boolean value indicating whether the metadata was refreshed.

This method is useful when you want to refresh the metadata for a NFT that
has been updated since the last time it was fetched. Note that the backend
only allows one refresh per token every 15 minutes, globally for all users.
The last refresh time for an NFT can be accessed on the
[Nft.timeLastUpdated](../interfaces/Nft.md#timelastupdated) field.

To trigger a refresh for all NFTs in a contract, use [refreshContract](NftNamespace.md#refreshcontract) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The contract address of the NFT. |
| `tokenId` | [`BigNumberish`](../modules.md#bignumberish) | The token id of the NFT. |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/api/nft-namespace.ts:536](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L536)

___

### searchContractMetadata

▸ **searchContractMetadata**(`query`): `Promise`<[`SearchContractMetadataResponse`](../interfaces/SearchContractMetadataResponse.md)\>

Search for a keyword across metadata of all ERC-721 and ERC-1155 smart contracts.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `string` | The search string that you want to search for in contract metadata. |

#### Returns

`Promise`<[`SearchContractMetadataResponse`](../interfaces/SearchContractMetadataResponse.md)\>

#### Defined in

[src/api/nft-namespace.ts:504](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L504)

___

### summarizeNftAttributes

▸ **summarizeNftAttributes**(`contractAddress`): `Promise`<[`NftAttributesResponse`](../interfaces/NftAttributesResponse.md)\>

Get a summary of attribute prevalence for an NFT collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | Contract address for the NFT collection. |

#### Returns

`Promise`<[`NftAttributesResponse`](../interfaces/NftAttributesResponse.md)\>

#### Defined in

[src/api/nft-namespace.ts:515](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L515)

___

### verifyNftOwnership

▸ **verifyNftOwnership**(`owner`, `contractAddress`): `Promise`<`boolean`\>

Checks that the provided owner address owns one of more of the provided
NFT. Returns a boolean indicating whether the owner address owns the provided NFT.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` | The owner address to check. |
| `contractAddress` | `string` | An NFT contract address to check ownership for. |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/api/nft-namespace.ts:417](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L417)

▸ **verifyNftOwnership**(`owner`, `contractAddresses`): `Promise`<{ `[contractAddress: string]`: `boolean`;  }\>

Checks which of the provided NFTs the owner address owns. Returns a map of
contract address to a boolean indicating whether the owner address owns the NFT.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` | The owner address to check. |
| `contractAddresses` | `string`[] | An array NFT contract address to check ownership for. |

#### Returns

`Promise`<{ `[contractAddress: string]`: `boolean`;  }\>

#### Defined in

[src/api/nft-namespace.ts:426](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft-namespace.ts#L426)
