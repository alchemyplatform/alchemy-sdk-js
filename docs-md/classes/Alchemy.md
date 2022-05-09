[alchemy-sdk](../README.md) / [Exports](../modules.md) / Alchemy

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
- [setNetwork](Alchemy.md#setnetwork)

## Properties

### apiKey

• `Readonly` **apiKey**: `string`

#### Defined in

[api/alchemy.ts:29](https://github.com/alchemyplatform/alchemy-sdk-js/blob/31c6d92/src/api/alchemy.ts#L29)

___

### maxRetries

• `Readonly` **maxRetries**: `number`

#### Defined in

[api/alchemy.ts:31](https://github.com/alchemyplatform/alchemy-sdk-js/blob/31c6d92/src/api/alchemy.ts#L31)

___

### network

• **network**: [`Network`](../enums/Network.md)

#### Defined in

[api/alchemy.ts:30](https://github.com/alchemyplatform/alchemy-sdk-js/blob/31c6d92/src/api/alchemy.ts#L30)

## Methods

### getProvider

▸ **getProvider**(): `AlchemyProvider`

Lazy loads the ethers provider and creates an AlchemyProvider instance.

#### Returns

`AlchemyProvider`

#### Defined in

[api/alchemy.ts:61](https://github.com/alchemyplatform/alchemy-sdk-js/blob/31c6d92/src/api/alchemy.ts#L61)

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

[api/alchemy.ts:52](https://github.com/alchemyplatform/alchemy-sdk-js/blob/31c6d92/src/api/alchemy.ts#L52)
