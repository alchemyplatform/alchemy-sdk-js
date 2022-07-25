[@alch/alchemy-sdk](../README.md) / [Exports](../modules.md) / AlchemyConfig

# Class: AlchemyConfig

This class holds the config information for the SDK client instance and
exposes the underlying providers for more advanced use cases.

## Table of contents

### Constructors

- [constructor](AlchemyConfig.md#constructor)

### Properties

- [apiKey](AlchemyConfig.md#apikey)
- [maxRetries](AlchemyConfig.md#maxretries)
- [network](AlchemyConfig.md#network)

### Methods

- [getProvider](AlchemyConfig.md#getprovider)

## Constructors

### constructor

• **new AlchemyConfig**(`config?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | [`AlchemySettings`](../interfaces/AlchemySettings.md) |

#### Defined in

[src/api/alchemy-config.ts:44](https://github.com/alchemyplatform/alchemy-sdk-js/blob/598aca2/src/api/alchemy-config.ts#L44)

## Properties

### apiKey

• `Readonly` **apiKey**: `string`

The Alchemy API key.

#### Defined in

[src/api/alchemy-config.ts:20](https://github.com/alchemyplatform/alchemy-sdk-js/blob/598aca2/src/api/alchemy-config.ts#L20)

___

### maxRetries

• `Readonly` **maxRetries**: `number`

The maximum number of retries to perform.

#### Defined in

[src/api/alchemy-config.ts:26](https://github.com/alchemyplatform/alchemy-sdk-js/blob/598aca2/src/api/alchemy-config.ts#L26)

___

### network

• `Readonly` **network**: [`Network`](../enums/Network.md)

The Network that this SDK is associated with.

#### Defined in

[src/api/alchemy-config.ts:23](https://github.com/alchemyplatform/alchemy-sdk-js/blob/598aca2/src/api/alchemy-config.ts#L23)

## Methods

### getProvider

▸ **getProvider**(): `Promise`<[`AlchemyProvider`](AlchemyProvider.md)\>

Returns an AlchemyProvider instance. Only one provider is created per
Alchemy instance.

The AlchemyProvider is a wrapper around ether's `AlchemyProvider` class and
has been expanded to support Alchemy's Enhanced APIs.

Most common methods on the provider are available as top-level methods on
the [Alchemy](Alchemy.md) instance, but the provider is exposed here to access
other less-common methods.

#### Returns

`Promise`<[`AlchemyProvider`](AlchemyProvider.md)\>

#### Defined in

[src/api/alchemy-config.ts:73](https://github.com/alchemyplatform/alchemy-sdk-js/blob/598aca2/src/api/alchemy-config.ts#L73)
