[alchemy-sdk](../README.md) / [Exports](../modules.md) / AddressWebhookParams

# Interface: AddressWebhookParams

Params to pass in when calling [NotifyNamespace.createWebhook](../classes/NotifyNamespace.md#createwebhook) in order
to create a [AddressActivityWebhook](AddressActivityWebhook.md).

## Hierarchy

- [`BaseWebhookParams`](BaseWebhookParams.md)

  ↳ **`AddressWebhookParams`**

## Table of contents

### Properties

- [addresses](AddressWebhookParams.md#addresses)
- [name](AddressWebhookParams.md#name)
- [network](AddressWebhookParams.md#network)

## Properties

### addresses

• **addresses**: `string`[]

Array of addresses the webhook should activity for.

#### Defined in

[src/types/types.ts:1333](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/types.ts#L1333)

___

### name

• `Optional` **name**: `string`

Optional name for the webhook.

#### Inherited from

[BaseWebhookParams](BaseWebhookParams.md).[name](BaseWebhookParams.md#name)

#### Defined in

[src/types/types.ts:1261](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/types.ts#L1261)

___

### network

• `Optional` **network**: [`Network`](../enums/Network.md)

Optional network to create the webhook on. If omitted, the webhook will be
created on network of the app provided in the api key config.

#### Defined in

[src/types/types.ts:1338](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/types.ts#L1338)
