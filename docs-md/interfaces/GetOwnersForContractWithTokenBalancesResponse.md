[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetOwnersForContractWithTokenBalancesResponse

# Interface: GetOwnersForContractWithTokenBalancesResponse

The response object for the [getOwnersForContract](../classes/NftNamespace.md#getownersforcontract).

## Table of contents

### Properties

- [owners](GetOwnersForContractWithTokenBalancesResponse.md#owners)
- [pageKey](GetOwnersForContractWithTokenBalancesResponse.md#pagekey)

## Properties

### owners

• **owners**: [`NftContractOwner`](NftContractOwner.md)[]

An array of owner addresses for the provided contract address

#### Defined in

[src/types/types.ts:769](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L769)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key that is returned when a collection has more than 50,000 owners.

#### Defined in

[src/types/types.ts:772](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L772)
