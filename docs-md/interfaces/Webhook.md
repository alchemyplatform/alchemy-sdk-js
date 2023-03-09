[alchemy-sdk](../README.md) / [Exports](../modules.md) / Webhook

# Interface: Webhook

SDK representation of a Webhook in the Notify API.

## Hierarchy

- **`Webhook`**

  ↳ [`MinedTransactionWebhook`](MinedTransactionWebhook.md)

  ↳ [`DroppedTransactionWebhook`](DroppedTransactionWebhook.md)

  ↳ [`AddressActivityWebhook`](AddressActivityWebhook.md)

  ↳ [`NftActivityWebhook`](NftActivityWebhook.md)

  ↳ [`NftMetadataUpdateWebhook`](NftMetadataUpdateWebhook.md)

## Table of contents

### Properties

- [appId](Webhook.md#appid)
- [id](Webhook.md#id)
- [isActive](Webhook.md#isactive)
- [network](Webhook.md#network)
- [signingKey](Webhook.md#signingkey)
- [timeCreated](Webhook.md#timecreated)
- [type](Webhook.md#type)
- [url](Webhook.md#url)
- [version](Webhook.md#version)

## Properties

### appId

• `Optional` **appId**: `string`

The app id of the app used for the webhook. This field is only present on
[MinedTransactionWebhook](MinedTransactionWebhook.md) and [DroppedTransactionWebhook](DroppedTransactionWebhook.md)

#### Defined in

[src/types/types.ts:2116](https://github.com/alchemyplatform/alchemy-sdk-js/blob/f2b072e/src/types/types.ts#L2116)

___

### id

• **id**: `string`

The webhook's unique id.

#### Defined in

[src/types/types.ts:2097](https://github.com/alchemyplatform/alchemy-sdk-js/blob/f2b072e/src/types/types.ts#L2097)

___

### isActive

• **isActive**: `boolean`

Whether the webhook is currently active

#### Defined in

[src/types/types.ts:2105](https://github.com/alchemyplatform/alchemy-sdk-js/blob/f2b072e/src/types/types.ts#L2105)

___

### network

• **network**: [`Network`](../enums/Network.md)

The network the webhook is on.

#### Defined in

[src/types/types.ts:2099](https://github.com/alchemyplatform/alchemy-sdk-js/blob/f2b072e/src/types/types.ts#L2099)

___

### signingKey

• **signingKey**: `string`

The signing key used to verify payloads for the webhook.

#### Defined in

[src/types/types.ts:2109](https://github.com/alchemyplatform/alchemy-sdk-js/blob/f2b072e/src/types/types.ts#L2109)

___

### timeCreated

• **timeCreated**: `string`

The creation time of the webhook as an ISO string.

#### Defined in

[src/types/types.ts:2107](https://github.com/alchemyplatform/alchemy-sdk-js/blob/f2b072e/src/types/types.ts#L2107)

___

### type

• **type**: [`WebhookType`](../enums/WebhookType.md)

The type of webhook.

#### Defined in

[src/types/types.ts:2101](https://github.com/alchemyplatform/alchemy-sdk-js/blob/f2b072e/src/types/types.ts#L2101)

___

### url

• **url**: `string`

The url that the webhook sends its payload to.

#### Defined in

[src/types/types.ts:2103](https://github.com/alchemyplatform/alchemy-sdk-js/blob/f2b072e/src/types/types.ts#L2103)

___

### version

• **version**: [`WebhookVersion`](../enums/WebhookVersion.md)

The webhook version. All newly created webhooks default to V2.

#### Defined in

[src/types/types.ts:2111](https://github.com/alchemyplatform/alchemy-sdk-js/blob/f2b072e/src/types/types.ts#L2111)
