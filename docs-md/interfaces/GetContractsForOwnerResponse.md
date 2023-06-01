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

[src/types/types.ts:986](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L986)

___

### pageKey

• `Optional` **pageKey**: `string`

Key for pagination to use to fetch results from the next page if available.

#### Defined in

[src/types/types.ts:989](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L989)

___

### totalCount

• **totalCount**: `number`

Total number of NFT contracts held by the given address.

#### Defined in

[src/types/types.ts:992](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L992)
