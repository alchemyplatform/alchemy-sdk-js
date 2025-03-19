[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftActivityWebhook

# Interface: NftActivityWebhook

The NFT Activity Webhook tracks all ERC721 and ERC1155 activity. This can be
used to notify your app with real time state changes when an NFT is
transferred between addresses.

## Hierarchy

- [`Webhook`](Webhook.md)

  ↳ **`NftActivityWebhook`**

## Table of contents

### Properties

- [appId](NftActivityWebhook.md#appid)
- [id](NftActivityWebhook.md#id)
- [isActive](NftActivityWebhook.md#isactive)
- [network](NftActivityWebhook.md#network)
- [signingKey](NftActivityWebhook.md#signingkey)
- [timeCreated](NftActivityWebhook.md#timecreated)
- [type](NftActivityWebhook.md#type)
- [url](NftActivityWebhook.md#url)
- [version](NftActivityWebhook.md#version)

## Properties

### appId

• `Optional` **appId**: `string`

The app id of the app used for the webhook. This field is only present on
[MinedTransactionWebhook](MinedTransactionWebhook.md) and [DroppedTransactionWebhook](DroppedTransactionWebhook.md)

#### Inherited from

[Webhook](Webhook.md).[appId](Webhook.md#appid)

#### Defined in

[src/types/types.ts:1123](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L1123)

___

### id

• **id**: `string`

The webhook's unique id.

#### Inherited from

[Webhook](Webhook.md).[id](Webhook.md#id)

#### Defined in

[src/types/types.ts:1104](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L1104)

___

### isActive

• **isActive**: `boolean`

Whether the webhook is currently active

#### Inherited from

[Webhook](Webhook.md).[isActive](Webhook.md#isactive)

#### Defined in

[src/types/types.ts:1112](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L1112)

___

### network

• **network**: [`Network`](../enums/Network.md)

The network the webhook is on.

#### Inherited from

[Webhook](Webhook.md).[network](Webhook.md#network)

#### Defined in

[src/types/types.ts:1106](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L1106)

___

### signingKey

• **signingKey**: `string`

The signing key used to verify payloads for the webhook.

#### Inherited from

[Webhook](Webhook.md).[signingKey](Webhook.md#signingkey)

#### Defined in

[src/types/types.ts:1116](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L1116)

___

### timeCreated

• **timeCreated**: `string`

The creation time of the webhook as an ISO string.

#### Inherited from

[Webhook](Webhook.md).[timeCreated](Webhook.md#timecreated)

#### Defined in

[src/types/types.ts:1114](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L1114)

___

### type

• **type**: [`NFT_ACTIVITY`](../enums/WebhookType.md#nft_activity)

The type of webhook.

#### Overrides

[Webhook](Webhook.md).[type](Webhook.md#type)

#### Defined in

[src/types/types.ts:1175](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L1175)

___

### url

• **url**: `string`

The url that the webhook sends its payload to.

#### Inherited from

[Webhook](Webhook.md).[url](Webhook.md#url)

#### Defined in

[src/types/types.ts:1110](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L1110)

___

### version

• **version**: [`WebhookVersion`](../enums/WebhookVersion.md)

The webhook version. All newly created webhooks default to V2.

#### Inherited from

[Webhook](Webhook.md).[version](Webhook.md#version)

#### Defined in

[src/types/types.ts:1118](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L1118)
