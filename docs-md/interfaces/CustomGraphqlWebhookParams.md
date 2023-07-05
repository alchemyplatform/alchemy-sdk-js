[alchemy-sdk](../README.md) / [Exports](../modules.md) / CustomGraphqlWebhookParams

# Interface: CustomGraphqlWebhookParams

Params to pass in when calling [NotifyNamespace.createWebhook](../classes/NotifyNamespace.md#createwebhook) in order
to create a [CustomGraphqlWebhook](CustomGraphqlWebhook.md)

## Table of contents

### Properties

- [graphqlQuery](CustomGraphqlWebhookParams.md#graphqlquery)
- [network](CustomGraphqlWebhookParams.md#network)

## Properties

### graphqlQuery

• **graphqlQuery**: `string`

GraphQL query

#### Defined in

[src/types/types.ts:2329](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ee5b9ee/src/types/types.ts#L2329)

___

### network

• `Optional` **network**: [`Network`](../enums/Network.md)

Optional network to create the webhook on. If omitted, the webhook will be
created on network of the app provided in the api key config.

#### Defined in

[src/types/types.ts:2334](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ee5b9ee/src/types/types.ts#L2334)
