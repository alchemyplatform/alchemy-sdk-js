[alchemy-sdk](../README.md) / [Exports](../modules.md) / TokenPriceBySymbolResult

# Interface: TokenPriceBySymbolResult

The result object returned for each symbol in a
[GetTokenPriceBySymbolResponse](GetTokenPriceBySymbolResponse.md).

## Table of contents

### Properties

- [error](TokenPriceBySymbolResult.md#error)
- [prices](TokenPriceBySymbolResult.md#prices)
- [symbol](TokenPriceBySymbolResult.md#symbol)

## Properties

### error

• **error**: ``null`` \| [`TokenPriceError`](TokenPriceError.md)

Error information if the request failed, null otherwise.

#### Defined in

[src/types/prices-types.ts:102](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/prices-types.ts#L102)

___

### prices

• **prices**: [`TokenPrice`](TokenPrice.md)[]

Array of price data for the token. Empty if there was an error.

#### Defined in

[src/types/prices-types.ts:100](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/prices-types.ts#L100)

___

### symbol

• **symbol**: `string`

The token symbol that was queried.

#### Defined in

[src/types/prices-types.ts:98](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/prices-types.ts#L98)
