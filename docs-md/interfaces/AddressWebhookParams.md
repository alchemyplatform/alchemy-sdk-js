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

[src/types/types.ts:1302](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L1302)

___

### network

• `Optional` **network**: [`Network`](../enums/Network.md)

Optional network to create the webhook on. If omitted, the webhook will be
created on network of the app provided in the api key config.

#### Defined in

[src/types/types.ts:1307](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L1307)
