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

[src/types/types.ts:1034](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1034)

___

### id

• **id**: `string`

The webhook's unique id.

#### Inherited from

[Webhook](Webhook.md).[id](Webhook.md#id)

#### Defined in

[src/types/types.ts:1015](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1015)

___

### isActive

• **isActive**: `boolean`

Whether the webhook is currently active

#### Inherited from

[Webhook](Webhook.md).[isActive](Webhook.md#isactive)

#### Defined in

[src/types/types.ts:1023](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1023)

___

### network

• **network**: [`Network`](../enums/Network.md)

The network the webhook is on.

#### Inherited from

[Webhook](Webhook.md).[network](Webhook.md#network)

#### Defined in

[src/types/types.ts:1017](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1017)

___

### signingKey

• **signingKey**: `string`

The signing key used to verify payloads for the webhook.

#### Inherited from

[Webhook](Webhook.md).[signingKey](Webhook.md#signingkey)

#### Defined in

[src/types/types.ts:1027](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1027)

___

### timeCreated

• **timeCreated**: `string`

The creation time of the webhook as an ISO string.

#### Inherited from

[Webhook](Webhook.md).[timeCreated](Webhook.md#timecreated)

#### Defined in

[src/types/types.ts:1025](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1025)

___

### type

• **type**: [`GRAPHQL`](../enums/WebhookType.md#graphql)

The type of webhook.

#### Overrides

[Webhook](Webhook.md).[type](Webhook.md#type)

#### Defined in

[src/types/types.ts:1105](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1105)

___

### url

• **url**: `string`

The url that the webhook sends its payload to.

#### Inherited from

[Webhook](Webhook.md).[url](Webhook.md#url)

#### Defined in

[src/types/types.ts:1021](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1021)

___

### version

• **version**: [`WebhookVersion`](../enums/WebhookVersion.md)

The webhook version. All newly created webhooks default to V2.

#### Inherited from

[Webhook](Webhook.md).[version](Webhook.md#version)

#### Defined in

[src/types/types.ts:1029](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1029)
