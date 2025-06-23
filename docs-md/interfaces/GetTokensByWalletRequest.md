[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetTokensByWalletRequest

# Interface: GetTokensByWalletRequest

The request fields of [PortfolioNamespace.getTokensByWallet](../classes/PortfolioNamespace.md#gettokensbywallet).

## Table of contents

### Properties

- [addresses](GetTokensByWalletRequest.md#addresses)
- [includeNativeTokens](GetTokensByWalletRequest.md#includenativetokens)
- [withMetadata](GetTokensByWalletRequest.md#withmetadata)
- [withPrices](GetTokensByWalletRequest.md#withprices)

## Properties

### addresses

• **addresses**: [`PortfolioAddress`](PortfolioAddress.md)[]

A list of wallet addresses to query.

#### Defined in

[src/types/portfolio-types.ts:27](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/portfolio-types.ts#L27)

___

### includeNativeTokens

• **includeNativeTokens**: `boolean`

Whether to include each chain’s native token in the response (e.g. ETH on Ethereum).

#### Defined in

[src/types/portfolio-types.ts:36](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/portfolio-types.ts#L36)

___

### withMetadata

• **withMetadata**: `boolean`

If set to true, returns metadata.

#### Defined in

[src/types/portfolio-types.ts:30](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/portfolio-types.ts#L30)

___

### withPrices

• **withPrices**: `boolean`

If set to true, returns token prices.

#### Defined in

[src/types/portfolio-types.ts:33](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/portfolio-types.ts#L33)
