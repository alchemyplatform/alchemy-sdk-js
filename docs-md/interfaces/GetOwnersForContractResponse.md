[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetOwnersForContractResponse

# Interface: GetOwnersForContractResponse

The response object for the [getOwnersForContract](../classes/NftNamespace.md#getownersforcontract).

## Table of contents

### Properties

- [owners](GetOwnersForContractResponse.md#owners)

## Properties

### owners

• `Readonly` **owners**: `string`[] \| [`OwnerWithTokenBalances`](OwnerWithTokenBalances.md)[]

An array of owner addresses for the provided contract address. If
`withTokenBalances` was set to 'true' in the request, then the elements of the
response array will be objects that include both the owner address and an array
of owned tokenIDs with associated balances.

#### Defined in

[src/types/types.ts:590](https://github.com/alchemyplatform/alchemy-sdk-js/blob/145ea50/src/types/types.ts#L590)
