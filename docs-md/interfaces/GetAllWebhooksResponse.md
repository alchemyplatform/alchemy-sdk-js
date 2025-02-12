[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetAllWebhooksResponse

# Interface: GetAllWebhooksResponse

The response for a [NotifyNamespace.getAllWebhooks](../classes/NotifyNamespace.md#getallwebhooks) method.

## Table of contents

### Properties

- [totalCount](GetAllWebhooksResponse.md#totalcount)
- [webhooks](GetAllWebhooksResponse.md#webhooks)

## Properties

### totalCount

• **totalCount**: `number`

The total number of webhooks.

#### Defined in

[src/types/types.ts:1205](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L1205)

___

### webhooks

• **webhooks**: [`Webhook`](Webhook.md)[]

All webhooks attached to the provided auth token.

#### Defined in

[src/types/types.ts:1203](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L1203)
