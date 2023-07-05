[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftContractOwner

# Interface: NftContractOwner

An object representing the owner of an NFT and its corresponding token
balances in a [GetOwnersForContractWithTokenBalancesResponse](GetOwnersForContractWithTokenBalancesResponse.md) object.

## Table of contents

### Properties

- [ownerAddress](NftContractOwner.md#owneraddress)
- [tokenBalances](NftContractOwner.md#tokenbalances)

## Properties

### ownerAddress

• **ownerAddress**: `string`

The NFT's owner address.

#### Defined in

[src/types/types.ts:883](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ee5b9ee/src/types/types.ts#L883)

___

### tokenBalances

• **tokenBalances**: [`NftContractTokenBalance`](NftContractTokenBalance.md)[]

A list of objects containing token balances for the provided NFT contract.

#### Defined in

[src/types/types.ts:886](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ee5b9ee/src/types/types.ts#L886)
