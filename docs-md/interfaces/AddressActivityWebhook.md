[alchemy-sdk](../README.md) / [Exports](../modules.md) / AddressActivityWebhook

# Interface: AddressActivityWebhook

An Address Activity Webhook tracks ETH, ERC20, ERC721, and ERC1155 transfers
for the provided addresses. This can be used to notify your app with
real-time state changes when your tracked addresses send or receive tokens.

## Hierarchy

- [`Webhook`](Webhook.md)

  ↳ **`AddressActivityWebhook`**

## Table of contents

### Properties

- [appId](AddressActivityWebhook.md#appid)
- [id](AddressActivityWebhook.md#id)
- [isActive](AddressActivityWebhook.md#isactive)
- [network](AddressActivityWebhook.md#network)
- [signingKey](AddressActivityWebhook.md#signingkey)
- [timeCreated](AddressActivityWebhook.md#timecreated)
- [type](AddressActivityWebhook.md#type)
- [url](AddressActivityWebhook.md#url)
- [version](AddressActivityWebhook.md#version)

## Properties

### appId

• `Optional` **appId**: `string`

The app id of the app used for the webhook. This field is only present on
[MinedTransactionWebhook](MinedTransactionWebhook.md) and [DroppedTransactionWebhook](DroppedTransactionWebhook.md)

#### Inherited from

[Webhook](Webhook.md).[appId](Webhook.md#appid)

#### Defined in

[src/types/types.ts:1037](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/types.ts#L1037)

___

### id

• **id**: `string`

The webhook's unique id.

#### Inherited from

[Webhook](Webhook.md).[id](Webhook.md#id)

#### Defined in

[src/types/types.ts:1018](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/types.ts#L1018)

___

### isActive

• **isActive**: `boolean`

Whether the webhook is currently active

#### Inherited from

[Webhook](Webhook.md).[isActive](Webhook.md#isactive)

#### Defined in

[src/types/types.ts:1026](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/types.ts#L1026)

___

### network

• **network**: [`Network`](../enums/Network.md)

The network the webhook is on.

#### Inherited from

[Webhook](Webhook.md).[network](Webhook.md#network)

#### Defined in

[src/types/types.ts:1020](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/types.ts#L1020)

___

### signingKey

• **signingKey**: `string`

The signing key used to verify payloads for the webhook.

#### Inherited from

[Webhook](Webhook.md).[signingKey](Webhook.md#signingkey)

#### Defined in

[src/types/types.ts:1030](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/types.ts#L1030)

___

### timeCreated

• **timeCreated**: `string`

The creation time of the webhook as an ISO string.

#### Inherited from

[Webhook](Webhook.md).[timeCreated](Webhook.md#timecreated)

#### Defined in

[src/types/types.ts:1028](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/types.ts#L1028)

___

### type

• **type**: [`ADDRESS_ACTIVITY`](../enums/WebhookType.md#address_activity)

The type of webhook.

#### Overrides

[Webhook](Webhook.md).[type](Webhook.md#type)

#### Defined in

[src/types/types.ts:1080](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/types.ts#L1080)

___

### url

• **url**: `string`

The url that the webhook sends its payload to.

#### Inherited from

[Webhook](Webhook.md).[url](Webhook.md#url)

#### Defined in

[src/types/types.ts:1024](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/types.ts#L1024)

___

### version

• **version**: [`WebhookVersion`](../enums/WebhookVersion.md)

The webhook version. All newly created webhooks default to V2.

#### Inherited from

[Webhook](Webhook.md).[version](Webhook.md#version)

#### Defined in

[src/types/types.ts:1032](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/types.ts#L1032)
