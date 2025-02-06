[alchemy-sdk](../README.md) / [Exports](../modules.md) / CustomGraphqlWebhookParams

# Interface: CustomGraphqlWebhookParams

Params to pass in when calling [NotifyNamespace.createWebhook](../classes/NotifyNamespace.md#createwebhook) in order
to create a [CustomGraphqlWebhook](CustomGraphqlWebhook.md)

## Table of contents

### Properties

- [appId](CustomGraphqlWebhookParams.md#appid)
- [graphqlQuery](CustomGraphqlWebhookParams.md#graphqlquery)
- [network](CustomGraphqlWebhookParams.md#network)
- [skipEmptyMessages](CustomGraphqlWebhookParams.md#skipemptymessages)

## Properties

### appId

• `Optional` **appId**: `string`

App IDs are now required for graphQL webhooks. You can find the app ID
following the steps here:
[https://docs.alchemy.com/reference/notify-api-faq#where-can-i-find-the-app-id](https://docs.alchemy.com/reference/notify-api-faq#where-can-i-find-the-app-id).

The webhook will be created on the app and network associated with the appId.
To find the app id of a project, go to the Alchemy Dashboard in the Apps tab.
After clicking on an app, the app id is the string in the URL following 'apps/'.

Note that although this property is marked as optional, it is *actually required*
for creating a custom GraphQL webhook. This is a workaround to avoid a breaking
change in the API.

#### Defined in

[src/types/types.ts:1290](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L1290)

___

### graphqlQuery

• **graphqlQuery**: `string`

GraphQL query

#### Defined in

[src/types/types.ts:1266](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L1266)

___

### network

• `Optional` **network**: [`Network`](../enums/Network.md)

Optional network to create the webhook on. If omitted, the webhook will be
created on network of the app provided in the api key config.

#### Defined in

[src/types/types.ts:1271](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L1271)

___

### skipEmptyMessages

• `Optional` **skipEmptyMessages**: `boolean`

Whether to only receive webhooks if the query on the block is not empty.
Defaults to false.

#### Defined in

[src/types/types.ts:1276](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L1276)
