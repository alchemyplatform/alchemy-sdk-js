[alchemy-sdk](../README.md) / [Exports](../modules.md) / HistoricalPriceByAddressResponse

# Interface: HistoricalPriceByAddressResponse

Response type for historical prices by network/address requests.

## Hierarchy

- `BaseHistoricalPriceResponse`

  ↳ **`HistoricalPriceByAddressResponse`**

## Table of contents

### Properties

- [address](HistoricalPriceByAddressResponse.md#address)
- [currency](HistoricalPriceByAddressResponse.md#currency)
- [data](HistoricalPriceByAddressResponse.md#data)
- [network](HistoricalPriceByAddressResponse.md#network)

## Properties

### address

• **address**: `string`

Contract address that was queried

#### Defined in

[src/types/prices-types.ts:164](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/prices-types.ts#L164)

___

### currency

• **currency**: `string`

Currency the prices are denominated in

#### Inherited from

BaseHistoricalPriceResponse.currency

#### Defined in

[src/types/prices-types.ts:138](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/prices-types.ts#L138)

___

### data

• **data**: [`HistoricalPriceDataPoint`](HistoricalPriceDataPoint.md)[]

Array of historical price data points

#### Inherited from

BaseHistoricalPriceResponse.data

#### Defined in

[src/types/prices-types.ts:140](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/prices-types.ts#L140)

___

### network

• **network**: `string`

Network that was queried

#### Defined in

[src/types/prices-types.ts:162](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/prices-types.ts#L162)
