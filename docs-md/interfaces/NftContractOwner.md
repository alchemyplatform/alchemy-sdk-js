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

[src/types/nft-types.ts:365](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/nft-types.ts#L365)

___

### tokenBalances

• **tokenBalances**: [`NftContractTokenBalance`](NftContractTokenBalance.md)[]

A list of objects containing token balances for the provided NFT contract.

#### Defined in

[src/types/nft-types.ts:368](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/nft-types.ts#L368)
