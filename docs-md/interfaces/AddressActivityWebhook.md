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

[src/types/types.ts:1292](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/types/types.ts#L1292)

___

### id

• **id**: `string`

The webhook's unique id.

#### Inherited from

[Webhook](Webhook.md).[id](Webhook.md#id)

#### Defined in

[src/types/types.ts:1273](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/types/types.ts#L1273)

___

### isActive

• **isActive**: `boolean`

Whether the webhook is currently active

#### Inherited from

[Webhook](Webhook.md).[isActive](Webhook.md#isactive)

#### Defined in

[src/types/types.ts:1281](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/types/types.ts#L1281)

___

### network

• **network**: [`Network`](../enums/Network.md)

The network the webhook is on.

#### Inherited from

[Webhook](Webhook.md).[network](Webhook.md#network)

#### Defined in

[src/types/types.ts:1275](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/types/types.ts#L1275)

___

### signingKey

• **signingKey**: `string`

The signing key used to verify payloads for the webhook.

#### Inherited from

[Webhook](Webhook.md).[signingKey](Webhook.md#signingkey)

#### Defined in

[src/types/types.ts:1285](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/types/types.ts#L1285)

___

### timeCreated

• **timeCreated**: `string`

The creation time of the webhook as an ISO string.

#### Inherited from

[Webhook](Webhook.md).[timeCreated](Webhook.md#timecreated)

#### Defined in

[src/types/types.ts:1283](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/types/types.ts#L1283)

___

### type

• **type**: [`ADDRESS_ACTIVITY`](../enums/WebhookType.md#address_activity)

The type of webhook.

#### Overrides

[Webhook](Webhook.md).[type](Webhook.md#type)

#### Defined in

[src/types/types.ts:1333](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/types/types.ts#L1333)

___

### url

• **url**: `string`

The url that the webhook sends its payload to.

#### Inherited from

[Webhook](Webhook.md).[url](Webhook.md#url)

#### Defined in

[src/types/types.ts:1279](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/types/types.ts#L1279)

___

### version

• **version**: [`WebhookVersion`](../enums/WebhookVersion.md)

The webhook version. All newly created webhooks default to V2.

#### Inherited from

[Webhook](Webhook.md).[version](Webhook.md#version)

#### Defined in

[src/types/types.ts:1287](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/types/types.ts#L1287)
