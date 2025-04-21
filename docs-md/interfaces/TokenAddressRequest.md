[alchemy-sdk](../README.md) / [Exports](../modules.md) / TokenAddressRequest

# Interface: TokenAddressRequest

The parameter field of [PricesNamespace.getTokenPriceByAddress](../classes/PricesNamespace.md#gettokenpricebyaddress).
Represents a network and address pair for getting token prices.

## Table of contents

### Properties

- [address](TokenAddressRequest.md#address)
- [network](TokenAddressRequest.md#network)

## Properties

### address

• **address**: `string`

The contract address to get prices for.

#### Defined in

[src/types/prices-types.ts:13](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/prices-types.ts#L13)

___

### network

• **network**: [`Network`](../enums/Network.md)

The network to get prices for.

#### Defined in

[src/types/prices-types.ts:11](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/prices-types.ts#L11)
