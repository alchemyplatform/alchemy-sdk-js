[alchemy-sdk](../README.md) / [Exports](../modules.md) / AddressWebhookParams

# Interface: AddressWebhookParams

Params to pass in when calling [NotifyNamespace.createWebhook](../classes/NotifyNamespace.md#createwebhook) in order
to create a [AddressActivityWebhook](AddressActivityWebhook.md).

## Table of contents

### Properties

- [addresses](AddressWebhookParams.md#addresses)
- [network](AddressWebhookParams.md#network)

## Properties

### addresses

• **addresses**: `string`[]

Array of addresses the webhook should activity for.

#### Defined in

[src/types/types.ts:2298](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/types/types.ts#L2298)

___

### network

• `Optional` **network**: [`Network`](../enums/Network.md)

Optional network to create the webhook on. If omitted, the webhook will be
created on network of the app provided in the api key config.

#### Defined in

[src/types/types.ts:2303](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/types/types.ts#L2303)
