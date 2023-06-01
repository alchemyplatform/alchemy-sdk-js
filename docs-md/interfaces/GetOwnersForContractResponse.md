[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetOwnersForContractResponse

# Interface: GetOwnersForContractResponse

The response object for the [getOwnersForContract](../classes/NftNamespace.md#getownersforcontract).

## Table of contents

### Properties

- [owners](GetOwnersForContractResponse.md#owners)
- [pageKey](GetOwnersForContractResponse.md#pagekey)

## Properties

### owners

• **owners**: `string`[]

An array of owner addresses for the provided contract address

#### Defined in

[src/types/types.ts:790](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L790)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key that is returned when a collection has more than 50,000 owners.

#### Defined in

[src/types/types.ts:792](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L792)
