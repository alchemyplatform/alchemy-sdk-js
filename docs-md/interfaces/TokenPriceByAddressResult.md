[alchemy-sdk](../README.md) / [Exports](../modules.md) / TokenPriceByAddressResult

# Interface: TokenPriceByAddressResult

The result object returned for each address in a
[GetTokenPriceByAddressResponse](GetTokenPriceByAddressResponse.md).

## Table of contents

### Properties

- [address](TokenPriceByAddressResult.md#address)
- [error](TokenPriceByAddressResult.md#error)
- [network](TokenPriceByAddressResult.md#network)
- [prices](TokenPriceByAddressResult.md#prices)

## Properties

### address

• **address**: `string`

The token's contract address.

#### Defined in

[src/types/prices-types.ts:83](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/prices-types.ts#L83)

___

### error

• **error**: ``null`` \| [`TokenPriceError`](TokenPriceError.md)

Error information if the request failed, null otherwise.

#### Defined in

[src/types/prices-types.ts:87](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/prices-types.ts#L87)

___

### network

• **network**: `string`

The network the token is on.

#### Defined in

[src/types/prices-types.ts:81](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/prices-types.ts#L81)

___

### prices

• **prices**: [`TokenPrice`](TokenPrice.md)[]

Array of price data for the token. Empty if there was an error.

#### Defined in

[src/types/prices-types.ts:85](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/prices-types.ts#L85)
