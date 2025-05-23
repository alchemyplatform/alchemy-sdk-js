[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetContractsForOwnerResponse

# Interface: GetContractsForOwnerResponse

The response for the [NftNamespace.getContractsForOwner](../classes/NftNamespace.md#getcontractsforowner) method.

## Table of contents

### Properties

- [contracts](GetContractsForOwnerResponse.md#contracts)
- [pageKey](GetContractsForOwnerResponse.md#pagekey)
- [totalCount](GetContractsForOwnerResponse.md#totalcount)

## Properties

### contracts

• **contracts**: [`NftContractForOwner`](NftContractForOwner.md)[]

The list of contracts, that match the query, held by the given address.

#### Defined in

[src/types/nft-types.ts:532](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/nft-types.ts#L532)

___

### pageKey

• `Optional` **pageKey**: `string`

Key for pagination to use to fetch results from the next page if available.

#### Defined in

[src/types/nft-types.ts:535](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/nft-types.ts#L535)

___

### totalCount

• **totalCount**: `number`

Total number of NFT contracts held by the given address.

#### Defined in

[src/types/nft-types.ts:538](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/nft-types.ts#L538)
