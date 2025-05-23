[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetTokenBalancesByWalletRequest

# Interface: GetTokenBalancesByWalletRequest

The request fields of [PortfolioNamespace.getTokenBalancesByWallet](../classes/PortfolioNamespace.md#gettokenbalancesbywallet).

## Table of contents

### Properties

- [addresses](GetTokenBalancesByWalletRequest.md#addresses)
- [includeNativeTokens](GetTokenBalancesByWalletRequest.md#includenativetokens)

## Properties

### addresses

• **addresses**: [`PortfolioAddress`](PortfolioAddress.md)[]

A list of wallet addresses to retrieve token balances for.

#### Defined in

[src/types/portfolio-types.ts:70](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/portfolio-types.ts#L70)

___

### includeNativeTokens

• **includeNativeTokens**: `boolean`

Whether to include each chain’s native token in the response
(e.g., ETH on Ethereum, MATIC on Polygon).

#### Defined in

[src/types/portfolio-types.ts:75](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/portfolio-types.ts#L75)
