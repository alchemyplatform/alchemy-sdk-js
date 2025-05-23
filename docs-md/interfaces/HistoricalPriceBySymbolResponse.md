[alchemy-sdk](../README.md) / [Exports](../modules.md) / HistoricalPriceBySymbolResponse

# Interface: HistoricalPriceBySymbolResponse

Response type for historical prices by symbol requests.

## Hierarchy

- `BaseHistoricalPriceResponse`

  ↳ **`HistoricalPriceBySymbolResponse`**

## Table of contents

### Properties

- [currency](HistoricalPriceBySymbolResponse.md#currency)
- [data](HistoricalPriceBySymbolResponse.md#data)
- [symbol](HistoricalPriceBySymbolResponse.md#symbol)

## Properties

### currency

• **currency**: `string`

Currency the prices are denominated in

#### Inherited from

BaseHistoricalPriceResponse.currency

#### Defined in

[src/types/prices-types.ts:138](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/prices-types.ts#L138)

___

### data

• **data**: [`HistoricalPriceDataPoint`](HistoricalPriceDataPoint.md)[]

Array of historical price data points

#### Inherited from

BaseHistoricalPriceResponse.data

#### Defined in

[src/types/prices-types.ts:140](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/prices-types.ts#L140)

___

### symbol

• **symbol**: `string`

Token symbol that was queried

#### Defined in

[src/types/prices-types.ts:151](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/prices-types.ts#L151)
