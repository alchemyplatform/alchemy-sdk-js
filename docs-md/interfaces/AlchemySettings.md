[@alch/alchemy-sdk](../README.md) / [Exports](../modules.md) / AlchemySettings

# Interface: AlchemySettings

Options object used to configure the Alchemy SDK.

## Table of contents

### Properties

- [apiKey](AlchemySettings.md#apikey)
- [maxRetries](AlchemySettings.md#maxretries)
- [network](AlchemySettings.md#network)

## Properties

### apiKey

• `Optional` **apiKey**: `string`

The Alchemy API key that can be found in the Alchemy dashboard.

#### Defined in

[src/types/types.ts:16](https://github.com/alchemyplatform/alchemy-sdk-js/blob/598aca2/src/types/types.ts#L16)

___

### maxRetries

• `Optional` **maxRetries**: `number`

The maximum number of retries to attempt if a request fails. Defaults to 5.

#### Defined in

[src/types/types.ts:25](https://github.com/alchemyplatform/alchemy-sdk-js/blob/598aca2/src/types/types.ts#L25)

___

### network

• `Optional` **network**: [`Network`](../enums/Network.md)

The name of the network. Once configured, the network cannot be changed. To
use a different network, instantiate a new `Alchemy` instance

#### Defined in

[src/types/types.ts:22](https://github.com/alchemyplatform/alchemy-sdk-js/blob/598aca2/src/types/types.ts#L22)
