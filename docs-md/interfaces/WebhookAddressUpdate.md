[alchemy-sdk](../README.md) / [Exports](../modules.md) / WebhookAddressUpdate

# Interface: WebhookAddressUpdate

Params object when calling [NotifyNamespace.updateWebhook](../classes/NotifyNamespace.md#updatewebhook) to add and
remove addresses for a [AddressActivityWebhook](AddressActivityWebhook.md).

## Table of contents

### Properties

- [addAddresses](WebhookAddressUpdate.md#addaddresses)
- [removeAddresses](WebhookAddressUpdate.md#removeaddresses)

## Properties

### addAddresses

• **addAddresses**: `string`[]

The addresses to additionally track.

#### Defined in

[src/types/types.ts:1460](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/types/types.ts#L1460)

___

### removeAddresses

• **removeAddresses**: `string`[]

Existing addresses to remove.

#### Defined in

[src/types/types.ts:1462](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/types/types.ts#L1462)
