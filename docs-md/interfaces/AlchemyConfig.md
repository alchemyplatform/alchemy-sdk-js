[alchemy-evm-js](../README.md) / [Exports](../modules.md) / AlchemyConfig

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

[types/types.ts:13](https://github.com/alchemyplatform/alchemy-evm-js/blob/0259d36/src/types/types.ts#L13)

___

### maxRetries

• `Optional` **maxRetries**: `number`

The maximum number of retries to attempt if a request fails. Defaults to 5.

#### Defined in

[types/types.ts:19](https://github.com/alchemyplatform/alchemy-evm-js/blob/0259d36/src/types/types.ts#L19)

___

### network

• `Optional` **network**: [`Network`](../enums/Network.md)

The name of the network.

#### Defined in

[types/types.ts:16](https://github.com/alchemyplatform/alchemy-evm-js/blob/0259d36/src/types/types.ts#L16)
