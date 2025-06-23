[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetTokensByWalletResponse

# Interface: GetTokensByWalletResponse

The response type of [PortfolioNamespace.getTokensByWallet](../classes/PortfolioNamespace.md#gettokensbywallet).

## Table of contents

### Properties

- [data](GetTokensByWalletResponse.md#data)

## Properties

### data

• **data**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageKey` | `string` | A string used for pagination to retrieve additional results if available. |
| `tokens` | { `address`: `string` ; `network`: [`Network`](../enums/Network.md) ; `tokenBalance`: `string` ; `tokenMetadata?`: [`TokenMetadataResponse`](TokenMetadataResponse.md) ; `tokenPrices?`: [`TokenPriceByAddressResult`](TokenPriceByAddressResult.md)  }[] | - |

#### Defined in

[src/types/portfolio-types.ts:45](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/portfolio-types.ts#L45)
