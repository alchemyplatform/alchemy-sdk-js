[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetTokenBalancesByWalletResponse

# Interface: GetTokenBalancesByWalletResponse

The response type of [PortfolioNamespace.getTokenBalancesByWallet](../classes/PortfolioNamespace.md#gettokenbalancesbywallet).

## Table of contents

### Properties

- [data](GetTokenBalancesByWalletResponse.md#data)

## Properties

### data

• **data**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageKey` | `string` | A string used for pagination, indicating more results are available. |
| `tokens` | { `address`: `string` ; `network`: [`Network`](../enums/Network.md) ; `tokenAddress`: `string` ; `tokenBalance`: `string`  }[] | - |

#### Defined in

[src/types/portfolio-types.ts:84](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/portfolio-types.ts#L84)
