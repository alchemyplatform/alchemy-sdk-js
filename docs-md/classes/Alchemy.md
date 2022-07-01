[@alch/alchemy-sdk](../README.md) / [Exports](../modules.md) / Alchemy

# Class: Alchemy

The Alchemy SDK client. This class holds config information and must be
passed into SDK methods.

Do not call this constructor directly. Instead, use [initializeAlchemy](../modules.md#initializealchemy)
to get an instance of the SDK.

## Table of contents

### Properties

- [apiKey](Alchemy.md#apikey)
- [maxRetries](Alchemy.md#maxretries)
- [network](Alchemy.md#network)

### Methods

- [getProvider](Alchemy.md#getprovider)
- [getWebsocketProvider](Alchemy.md#getwebsocketprovider)
- [setNetwork](Alchemy.md#setnetwork)

## Properties

### apiKey

• `Readonly` **apiKey**: `string`

#### Defined in

[src/api/alchemy.ts:32](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/alchemy.ts#L32)

___

### maxRetries

• `Readonly` **maxRetries**: `number`

#### Defined in

[src/api/alchemy.ts:34](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/alchemy.ts#L34)

___

### network

• **network**: [`Network`](../enums/Network.md)

#### Defined in

[src/api/alchemy.ts:33](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/alchemy.ts#L33)

## Methods

### getProvider

▸ **getProvider**(): [`AlchemyProvider`](AlchemyProvider.md)

Creates an AlchemyProvider instance. Only one provider is created per
Alchemy instance.

#### Returns

[`AlchemyProvider`](AlchemyProvider.md)

#### Defined in

[src/api/alchemy.ts:79](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/alchemy.ts#L79)

___

### getWebsocketProvider

▸ **getWebsocketProvider**(): [`AlchemyWebSocketProvider`](AlchemyWebSocketProvider.md)

Creates an AlchemyWebsocketProvider instance. Only one provider is created
per Alchemy instance.

#### Returns

[`AlchemyWebSocketProvider`](AlchemyWebSocketProvider.md)

#### Defined in

[src/api/alchemy.ts:96](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/alchemy.ts#L96)

___

### setNetwork

▸ **setNetwork**(`network`): `void`

Changes the network that the SDK requests data from.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `network` | [`Network`](../enums/Network.md) | The network to change to. |

#### Returns

`void`

#### Defined in

[src/api/alchemy.ts:68](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/alchemy.ts#L68)
