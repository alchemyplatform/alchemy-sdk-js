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

[src/types/types.ts:844](https://github.com/alchemyplatform/alchemy-sdk-js/blob/a8bc079/src/types/types.ts#L844)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key that is returned when a collection has more than 50,000 owners.

#### Defined in

[src/types/types.ts:847](https://github.com/alchemyplatform/alchemy-sdk-js/blob/a8bc079/src/types/types.ts#L847)
