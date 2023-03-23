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

[src/types/types.ts:2186](https://github.com/alchemyplatform/alchemy-sdk-js/blob/a162d40/src/types/types.ts#L2186)

___

### webhooks

• **webhooks**: [`Webhook`](Webhook.md)[]

All webhooks attached to the provided auth token.

#### Defined in

[src/types/types.ts:2184](https://github.com/alchemyplatform/alchemy-sdk-js/blob/a162d40/src/types/types.ts#L2184)
