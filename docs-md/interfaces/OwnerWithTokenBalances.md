[alchemy-sdk](../README.md) / [Exports](../modules.md) / OwnerWithTokenBalances

# Interface: OwnerWithTokenBalances

An object representing a single owner's full list of owned tokens and associated balances for a given
NFT contract. These objects are returned in the `owners` field of the
[getOwnersForContract](../classes/NftNamespace.md#getownersforcontract) response when the
`withTokenBalances` parameter is set to `true`.

## Table of contents

### Properties

- [ownerAddress](OwnerWithTokenBalances.md#ownerAddress)
- [tokenBalances](OwnerWithTokenBalances.md#tokenBalances)

## Properties

### ownerAddress

• `Readonly` **ownerAddress**: `string`

### tokenBalances

• `Readonly` **tokenBalances**: [`OwnerTokenBalance`](OwnerTokenBalance.md)

Token IDs owned by `ownerAddress` and associated balances.
