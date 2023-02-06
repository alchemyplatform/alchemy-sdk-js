[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftWebhookParams

# Interface: NftWebhookParams

Params to pass in when calling [NotifyNamespace.createWebhook](../classes/NotifyNamespace.md#createwebhook) in order
to create a [NftActivityWebhook](NftActivityWebhook.md).

## Table of contents

### Properties

- [filters](NftWebhookParams.md#filters)
- [network](NftWebhookParams.md#network)

## Properties

### filters

• **filters**: [`NftFilter`](NftFilter.md)[]

Array of NFT filters the webhook should track.

#### Defined in

[src/types/types.ts:2192](https://github.com/alchemyplatform/alchemy-sdk-js/blob/a8bc079/src/types/types.ts#L2192)

___

### network

• `Optional` **network**: [`Network`](../enums/Network.md)

Optional network to create the webhook on. If omitted, the webhook will be
created on network of the app provided in the api key config.

#### Defined in

[src/types/types.ts:2197](https://github.com/alchemyplatform/alchemy-sdk-js/blob/a8bc079/src/types/types.ts#L2197)
