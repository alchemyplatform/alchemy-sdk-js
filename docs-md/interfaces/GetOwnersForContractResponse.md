[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetOwnersForContractResponse

# Interface: GetOwnersForContractResponse

The response object for the [getOwnersForContract](../classes/NftNamespace.md#getownersforcontract).

## Table of contents

### Properties

- [owners](GetOwnersForContractResponse.md#owners)
- [pageKey](GetOwnersForContractResponse.md#pagekey)
- [totalCount](GetOwnersForContractResponse.md#totalcount)

## Properties

### owners

• **owners**: `string`[]

An array of owner addresses for the provided contract address

#### Defined in

[src/types/nft-types.ts:326](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/nft-types.ts#L326)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key that is returned when a collection has more than 50,000 owners.

#### Defined in

[src/types/nft-types.ts:334](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/nft-types.ts#L334)

___

### totalCount

• `Optional` **totalCount**: `number`

Total count of unique owners. Only present if
[GetOwnersForContractOptions.includeCount](GetOwnersForContractOptions.md#includecount) is true.

#### Defined in

[src/types/nft-types.ts:331](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/nft-types.ts#L331)
