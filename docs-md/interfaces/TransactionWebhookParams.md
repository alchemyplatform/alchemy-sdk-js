[alchemy-sdk](../README.md) / [Exports](../modules.md) / TransactionWebhookParams

# Interface: TransactionWebhookParams

Params to pass in when calling [NotifyNamespace.createWebhook](../classes/NotifyNamespace.md#createwebhook) in order
to create a [MinedTransactionWebhook](MinedTransactionWebhook.md) or [DroppedTransactionWebhook](DroppedTransactionWebhook.md).

The webhook will be created on the app and network associated with the appId.
To find the app id of a project, go to the Alchemy Dashboard in the Apps tab.
After clicking on an app, the app id is the string in the URL following 'apps/'.

This is a temporary workaround for now. We're planning on detecting the app
id from the provided api key directly. Stay tuned!

## Table of contents

### Properties

- [appId](TransactionWebhookParams.md#appid)

## Properties

### appId

• **appId**: `string`

The app id of the project to create the webhook on.

#### Defined in

[src/types/types.ts:1208](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4e3af22/src/types/types.ts#L1208)
