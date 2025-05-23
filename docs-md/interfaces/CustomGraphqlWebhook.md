[alchemy-sdk](../README.md) / [Exports](../modules.md) / CustomGraphqlWebhook

# Interface: CustomGraphqlWebhook

The Custom Webhook can track any event on every block (think transfers, staking,
minting, burning, approvals, etc.)
This can be used to notify your app with real time changes whenever an
EOA or a smart contract performs any action on-chain.

## Hierarchy

- [`Webhook`](Webhook.md)

  ↳ **`CustomGraphqlWebhook`**

## Table of contents

### Properties

- [appId](CustomGraphqlWebhook.md#appid)
- [id](CustomGraphqlWebhook.md#id)
- [isActive](CustomGraphqlWebhook.md#isactive)
- [name](CustomGraphqlWebhook.md#name)
- [network](CustomGraphqlWebhook.md#network)
- [signingKey](CustomGraphqlWebhook.md#signingkey)
- [timeCreated](CustomGraphqlWebhook.md#timecreated)
- [type](CustomGraphqlWebhook.md#type)
- [url](CustomGraphqlWebhook.md#url)
- [version](CustomGraphqlWebhook.md#version)

## Properties

### appId

• `Optional` **appId**: `string`

The app id of the app used for the webhook. This field is only present on
[MinedTransactionWebhook](MinedTransactionWebhook.md) and [DroppedTransactionWebhook](DroppedTransactionWebhook.md)

#### Inherited from

[Webhook](Webhook.md).[appId](Webhook.md#appid)

#### Defined in

[src/types/types.ts:1147](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/types.ts#L1147)

___

### id

• **id**: `string`

The webhook's unique id.

#### Inherited from

[Webhook](Webhook.md).[id](Webhook.md#id)

#### Defined in

[src/types/types.ts:1128](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/types.ts#L1128)

___

### isActive

• **isActive**: `boolean`

Whether the webhook is currently active

#### Inherited from

[Webhook](Webhook.md).[isActive](Webhook.md#isactive)

#### Defined in

[src/types/types.ts:1136](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/types.ts#L1136)

___

### name

• `Optional` **name**: `string`

The name of the webhook.

#### Inherited from

[Webhook](Webhook.md).[name](Webhook.md#name)

#### Defined in

[src/types/types.ts:1149](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/types.ts#L1149)

___

### network

• **network**: [`Network`](../enums/Network.md)

The network the webhook is on.

#### Inherited from

[Webhook](Webhook.md).[network](Webhook.md#network)

#### Defined in

[src/types/types.ts:1130](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/types.ts#L1130)

___

### signingKey

• **signingKey**: `string`

The signing key used to verify payloads for the webhook.

#### Inherited from

[Webhook](Webhook.md).[signingKey](Webhook.md#signingkey)

#### Defined in

[src/types/types.ts:1140](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/types.ts#L1140)

___

### timeCreated

• **timeCreated**: `string`

The creation time of the webhook as an ISO string.

#### Inherited from

[Webhook](Webhook.md).[timeCreated](Webhook.md#timecreated)

#### Defined in

[src/types/types.ts:1138](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/types.ts#L1138)

___

### type

• **type**: [`GRAPHQL`](../enums/WebhookType.md#graphql)

The type of webhook.

#### Overrides

[Webhook](Webhook.md).[type](Webhook.md#type)

#### Defined in

[src/types/types.ts:1220](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/types.ts#L1220)

___

### url

• **url**: `string`

The url that the webhook sends its payload to.

#### Inherited from

[Webhook](Webhook.md).[url](Webhook.md#url)

#### Defined in

[src/types/types.ts:1134](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/types.ts#L1134)

___

### version

• **version**: [`WebhookVersion`](../enums/WebhookVersion.md)

The webhook version. All newly created webhooks default to V2.

#### Inherited from

[Webhook](Webhook.md).[version](Webhook.md#version)

#### Defined in

[src/types/types.ts:1142](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/types.ts#L1142)
