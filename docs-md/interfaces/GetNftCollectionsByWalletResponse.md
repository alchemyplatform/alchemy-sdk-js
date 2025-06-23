[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetNftCollectionsByWalletResponse

# Interface: GetNftCollectionsByWalletResponse

The response type of [PortfolioNamespace.getNftCollectionsByWallet](../classes/PortfolioNamespace.md#getnftcollectionsbywallet).

## Table of contents

### Properties

- [data](GetNftCollectionsByWalletResponse.md#data)

## Properties

### data

• **data**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `contracts` | { `address`: `string` ; `contract`: [`Contract`](../classes/Contract.md)[] ; `network`: [`Network`](../enums/Network.md)  }[] | Array of objects representing the NFT contracts held by the address. |

#### Defined in

[src/types/portfolio-types.ts:162](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/portfolio-types.ts#L162)
