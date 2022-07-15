[@alch/alchemy-sdk](../README.md) / [Exports](../modules.md) / AlchemyConfig

# Interface: AlchemyConfig

Options object used to configure the Alchemy SDK.

## Table of contents

### Properties

- [apiKey](AlchemyConfig.md#apikey)
- [maxRetries](AlchemyConfig.md#maxretries)
- [network](AlchemyConfig.md#network)

## Properties

### apiKey

• `Optional` **apiKey**: `string`

The Alchemy API key that can be found in the Alchemy dashboard.

#### Defined in

[types/types.ts:16](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L16)

___

### maxRetries

• `Optional` **maxRetries**: `number`

The maximum number of retries to attempt if a request fails. Defaults to 5.

#### Defined in

[types/types.ts:25](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L25)

___

### network

• `Optional` **network**: [`Network`](../enums/Network.md)

The name of the network. Once configured, the network cannot be changed. To
use a different network, instantiate a new `Alchemy` instance

#### Defined in

[types/types.ts:22](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L22)
