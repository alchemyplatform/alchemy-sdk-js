[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftWebhookParams

# Interface: NftWebhookParams

Params to pass in when calling [NotifyNamespace.createWebhook](../classes/NotifyNamespace.md#createwebhook) in order
to create a [NftActivityWebhook](NftActivityWebhook.md) or [NftMetadataUpdateWebhook](NftMetadataUpdateWebhook.md).

## Hierarchy

- [`BaseWebhookParams`](BaseWebhookParams.md)

  ↳ **`NftWebhookParams`**

## Table of contents

### Properties

- [filters](NftWebhookParams.md#filters)
- [name](NftWebhookParams.md#name)
- [network](NftWebhookParams.md#network)

## Properties

### filters

• **filters**: [`NftFilter`](NftFilter.md)[]

Array of NFT filters the webhook should track.

#### Defined in

[src/types/types.ts:1291](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1291)

___

### name

• `Optional` **name**: `string`

Optional name for the webhook.

#### Inherited from

[BaseWebhookParams](BaseWebhookParams.md).[name](BaseWebhookParams.md#name)

#### Defined in

[src/types/types.ts:1266](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1266)

___

### network

• `Optional` **network**: [`Network`](../enums/Network.md)

Optional network to create the webhook on. If omitted, the webhook will be
created on network of the app provided in the api key config.

#### Defined in

[src/types/types.ts:1296](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1296)
