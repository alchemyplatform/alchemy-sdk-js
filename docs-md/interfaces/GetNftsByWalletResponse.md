[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetNftsByWalletResponse

# Interface: GetNftsByWalletResponse

The response type of [PortfolioNamespace.getNftsByWallet](../classes/PortfolioNamespace.md#getnftsbywallet).

## Table of contents

### Properties

- [data](GetNftsByWalletResponse.md#data)

## Properties

### data

• **data**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `ownedNfts` | [`Nft`](Nft.md) & { `network`: [`Network`](../enums/Network.md)  }[] | An array of NFTs owned by the wallet address, each including metadata and the network it resides on. |
| `pageKey` | `string` | A string key used for paginating through the NFT list, if more results are available. |
| `totalCount` | `number` | Total number of NFTs (distinct tokenIds) owned by the given address. |

#### Defined in

[src/types/portfolio-types.ts:125](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/portfolio-types.ts#L125)
