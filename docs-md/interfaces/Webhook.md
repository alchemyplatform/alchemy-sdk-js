[alchemy-sdk](../README.md) / [Exports](../modules.md) / Webhook

# Interface: Webhook

SDK representation of a Webhook in the Notify API.

## Hierarchy

- **`Webhook`**

  ↳ [`MinedTransactionWebhook`](MinedTransactionWebhook.md)

  ↳ [`DroppedTransactionWebhook`](DroppedTransactionWebhook.md)

  ↳ [`AddressActivityWebhook`](AddressActivityWebhook.md)

  ↳ [`NftActivityWebhook`](NftActivityWebhook.md)

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

[src/types/types.ts:1657](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1657)

___

### id

• **id**: `string`

The webhook's unique id.

#### Defined in

[src/types/types.ts:1638](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1638)

___

### isActive

• **isActive**: `boolean`

Whether the webhook is currently active

#### Defined in

[src/types/types.ts:1646](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1646)

___

### network

• **network**: [`Network`](../enums/Network.md)

The network the webhook is on.

#### Defined in

[src/types/types.ts:1640](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1640)

___

### signingKey

• **signingKey**: `string`

The signing key used to verify payloads for the webhook.

#### Defined in

[src/types/types.ts:1650](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1650)

___

### timeCreated

• **timeCreated**: `string`

The creation time of the webhook as an ISO string.

#### Defined in

[src/types/types.ts:1648](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1648)

___

### type

• **type**: [`WebhookType`](../enums/WebhookType.md)

The type of webhook.

#### Defined in

[src/types/types.ts:1642](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1642)

___

### url

• **url**: `string`

The url that the webhook sends its payload to.

#### Defined in

[src/types/types.ts:1644](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1644)

___

### version

• **version**: [`WebhookVersion`](../enums/WebhookVersion.md)

The webhook version. All newly created webhooks default to V2.

#### Defined in

[src/types/types.ts:1652](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1652)
