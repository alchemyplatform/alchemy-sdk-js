[alchemy-sdk](../README.md) / [Exports](../modules.md) / PricesNamespace

# Class: PricesNamespace

The Prices namespace contains methods for getting token price data.

Do not call this constructor directly. Instead, instantiate an Alchemy object
with `const alchemy = new Alchemy(config)` and then access the prices namespace
via `alchemy.prices`.

## Table of contents

### Methods

- [getHistoricalPriceByAddress](PricesNamespace.md#gethistoricalpricebyaddress)
- [getHistoricalPriceBySymbol](PricesNamespace.md#gethistoricalpricebysymbol)
- [getTokenPriceByAddress](PricesNamespace.md#gettokenpricebyaddress)
- [getTokenPriceBySymbol](PricesNamespace.md#gettokenpricebysymbol)

## Methods

### getHistoricalPriceByAddress

▸ **getHistoricalPriceByAddress**(`network`, `address`, `startTime`, `endTime`, `interval`): `Promise`<[`HistoricalPriceByAddressResponse`](../interfaces/HistoricalPriceByAddressResponse.md)\>

Get historical token prices by network and contract address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `network` | [`Network`](../enums/Network.md) | The network where the token contract is deployed |
| `address` | `string` | The token contract address |
| `startTime` | `string` \| `number` | Start time in ISO-8601 string format or Unix timestamp in seconds |
| `endTime` | `string` \| `number` | End time in ISO-8601 string format or Unix timestamp in seconds |
| `interval` | [`HistoricalPriceInterval`](../enums/HistoricalPriceInterval.md) | Time interval between data points |

#### Returns

`Promise`<[`HistoricalPriceByAddressResponse`](../interfaces/HistoricalPriceByAddressResponse.md)\>

Promise containing historical token price data

#### Defined in

[src/api/prices-namespace.ts:91](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/prices-namespace.ts#L91)

___

### getHistoricalPriceBySymbol

▸ **getHistoricalPriceBySymbol**(`symbol`, `startTime`, `endTime`, `interval`): `Promise`<[`HistoricalPriceBySymbolResponse`](../interfaces/HistoricalPriceBySymbolResponse.md)\>

Get historical token prices by token symbol.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `symbol` | `string` | The token symbol to get historical prices for |
| `startTime` | `string` \| `number` | Start time in ISO-8601 string format or Unix timestamp in seconds |
| `endTime` | `string` \| `number` | End time in ISO-8601 string format or Unix timestamp in seconds |
| `interval` | [`HistoricalPriceInterval`](../enums/HistoricalPriceInterval.md) | Time interval between data points |

#### Returns

`Promise`<[`HistoricalPriceBySymbolResponse`](../interfaces/HistoricalPriceBySymbolResponse.md)\>

Promise containing historical token price data

#### Defined in

[src/api/prices-namespace.ts:65](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/prices-namespace.ts#L65)

___

### getTokenPriceByAddress

▸ **getTokenPriceByAddress**(`addresses`): `Promise`<[`GetTokenPriceByAddressResponse`](../interfaces/GetTokenPriceByAddressResponse.md)\>

Get token prices by network and contract address pairs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addresses` | [`TokenAddressRequest`](../interfaces/TokenAddressRequest.md)[] | Array of network/address pairs to get prices for |

#### Returns

`Promise`<[`GetTokenPriceByAddressResponse`](../interfaces/GetTokenPriceByAddressResponse.md)\>

Promise containing token price data

#### Defined in

[src/api/prices-namespace.ts:36](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/prices-namespace.ts#L36)

___

### getTokenPriceBySymbol

▸ **getTokenPriceBySymbol**(`symbols`): `Promise`<[`GetTokenPriceBySymbolResponse`](../interfaces/GetTokenPriceBySymbolResponse.md)\>

Get token prices by token symbol.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `symbols` | `string`[] | Array of token symbols to get prices for |

#### Returns

`Promise`<[`GetTokenPriceBySymbolResponse`](../interfaces/GetTokenPriceBySymbolResponse.md)\>

Promise containing token price data

#### Defined in

[src/api/prices-namespace.ts:49](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/prices-namespace.ts#L49)
