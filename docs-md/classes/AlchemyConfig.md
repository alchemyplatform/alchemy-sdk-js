[alchemy-sdk](../README.md) / [Exports](../modules.md) / AlchemyConfig

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
- [url](AlchemyConfig.md#url)

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

[src/api/alchemy-config.ts:51](https://github.com/alchemyplatform/alchemy-sdk-js/blob/145ea50/src/api/alchemy-config.ts#L51)

## Properties

### apiKey

• `Readonly` **apiKey**: `string`

The Alchemy API key.

#### Defined in

[src/api/alchemy-config.ts:21](https://github.com/alchemyplatform/alchemy-sdk-js/blob/145ea50/src/api/alchemy-config.ts#L21)

___

### maxRetries

• `Readonly` **maxRetries**: `number`

The maximum number of retries to perform.

#### Defined in

[src/api/alchemy-config.ts:27](https://github.com/alchemyplatform/alchemy-sdk-js/blob/145ea50/src/api/alchemy-config.ts#L27)

___

### network

• `Readonly` **network**: [`Network`](../enums/Network.md)

The Network that this SDK is associated with.

#### Defined in

[src/api/alchemy-config.ts:24](https://github.com/alchemyplatform/alchemy-sdk-js/blob/145ea50/src/api/alchemy-config.ts#L24)

___

### url

• `Optional` `Readonly` **url**: `string`

The optional hardcoded URL to send requests to instead of using the network
and apiKey.

#### Defined in

[src/api/alchemy-config.ts:33](https://github.com/alchemyplatform/alchemy-sdk-js/blob/145ea50/src/api/alchemy-config.ts#L33)

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

[src/api/alchemy-config.ts:89](https://github.com/alchemyplatform/alchemy-sdk-js/blob/145ea50/src/api/alchemy-config.ts#L89)
