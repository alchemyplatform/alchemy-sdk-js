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

[src/types/types.ts:855](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L855)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key that is returned when a collection has more than 50,000 owners.

#### Defined in

[src/types/types.ts:863](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L863)

___

### totalCount

• `Optional` **totalCount**: `number`

Total count of unique owners. Only present if
[GetOwnersForContractOptions.includeCount](GetOwnersForContractOptions.md#includecount) is true.

#### Defined in

[src/types/types.ts:860](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L860)
