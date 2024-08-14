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

  ↳ [`CustomGraphqlWebhook`](CustomGraphqlWebhook.md)

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

[src/types/types.ts:1088](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4e3af22/src/types/types.ts#L1088)

___

### id

• **id**: `string`

The webhook's unique id.

#### Defined in

[src/types/types.ts:1069](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4e3af22/src/types/types.ts#L1069)

___

### isActive

• **isActive**: `boolean`

Whether the webhook is currently active

#### Defined in

[src/types/types.ts:1077](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4e3af22/src/types/types.ts#L1077)

___

### network

• **network**: [`Network`](../enums/Network.md)

The network the webhook is on.

#### Defined in

[src/types/types.ts:1071](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4e3af22/src/types/types.ts#L1071)

___

### signingKey

• **signingKey**: `string`

The signing key used to verify payloads for the webhook.

#### Defined in

[src/types/types.ts:1081](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4e3af22/src/types/types.ts#L1081)

___

### timeCreated

• **timeCreated**: `string`

The creation time of the webhook as an ISO string.

#### Defined in

[src/types/types.ts:1079](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4e3af22/src/types/types.ts#L1079)

___

### type

• **type**: [`WebhookType`](../enums/WebhookType.md)

The type of webhook.

#### Defined in

[src/types/types.ts:1073](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4e3af22/src/types/types.ts#L1073)

___

### url

• **url**: `string`

The url that the webhook sends its payload to.

#### Defined in

[src/types/types.ts:1075](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4e3af22/src/types/types.ts#L1075)

___

### version

• **version**: [`WebhookVersion`](../enums/WebhookVersion.md)

The webhook version. All newly created webhooks default to V2.

#### Defined in

[src/types/types.ts:1083](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4e3af22/src/types/types.ts#L1083)
