[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftMetadataUpdateWebhook

# Interface: NftMetadataUpdateWebhook

The NFT Metadata Update Webhook tracks all ERC721 and ERC1155 metadata updates.
This can be used to notify your app with real time state changes when an NFT's
metadata changes.

## Hierarchy

- [`Webhook`](Webhook.md)

  ↳ **`NftMetadataUpdateWebhook`**

## Table of contents

### Properties

- [appId](NftMetadataUpdateWebhook.md#appid)
- [id](NftMetadataUpdateWebhook.md#id)
- [isActive](NftMetadataUpdateWebhook.md#isactive)
- [network](NftMetadataUpdateWebhook.md#network)
- [signingKey](NftMetadataUpdateWebhook.md#signingkey)
- [timeCreated](NftMetadataUpdateWebhook.md#timecreated)
- [type](NftMetadataUpdateWebhook.md#type)
- [url](NftMetadataUpdateWebhook.md#url)
- [version](NftMetadataUpdateWebhook.md#version)

## Properties

### appId

• `Optional` **appId**: `string`

The app id of the app used for the webhook. This field is only present on
[MinedTransactionWebhook](MinedTransactionWebhook.md) and [DroppedTransactionWebhook](DroppedTransactionWebhook.md)

#### Inherited from

[Webhook](Webhook.md).[appId](Webhook.md#appid)

#### Defined in

[src/types/types.ts:1126](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L1126)

___

### id

• **id**: `string`

The webhook's unique id.

#### Inherited from

[Webhook](Webhook.md).[id](Webhook.md#id)

#### Defined in

[src/types/types.ts:1107](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L1107)

___

### isActive

• **isActive**: `boolean`

Whether the webhook is currently active

#### Inherited from

[Webhook](Webhook.md).[isActive](Webhook.md#isactive)

#### Defined in

[src/types/types.ts:1115](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L1115)

___

### network

• **network**: [`Network`](../enums/Network.md)

The network the webhook is on.

#### Inherited from

[Webhook](Webhook.md).[network](Webhook.md#network)

#### Defined in

[src/types/types.ts:1109](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L1109)

___

### signingKey

• **signingKey**: `string`

The signing key used to verify payloads for the webhook.

#### Inherited from

[Webhook](Webhook.md).[signingKey](Webhook.md#signingkey)

#### Defined in

[src/types/types.ts:1119](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L1119)

___

### timeCreated

• **timeCreated**: `string`

The creation time of the webhook as an ISO string.

#### Inherited from

[Webhook](Webhook.md).[timeCreated](Webhook.md#timecreated)

#### Defined in

[src/types/types.ts:1117](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L1117)

___

### type

• **type**: [`NFT_METADATA_UPDATE`](../enums/WebhookType.md#nft_metadata_update)

The type of webhook.

#### Overrides

[Webhook](Webhook.md).[type](Webhook.md#type)

#### Defined in

[src/types/types.ts:1187](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L1187)

___

### url

• **url**: `string`

The url that the webhook sends its payload to.

#### Inherited from

[Webhook](Webhook.md).[url](Webhook.md#url)

#### Defined in

[src/types/types.ts:1113](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L1113)

___

### version

• **version**: [`WebhookVersion`](../enums/WebhookVersion.md)

The webhook version. All newly created webhooks default to V2.

#### Inherited from

[Webhook](Webhook.md).[version](Webhook.md#version)

#### Defined in

[src/types/types.ts:1121](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L1121)
