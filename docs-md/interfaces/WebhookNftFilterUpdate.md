[alchemy-sdk](../README.md) / [Exports](../modules.md) / WebhookNftFilterUpdate

# Interface: WebhookNftFilterUpdate

Params object when calling [NotifyNamespace.updateWebhook](../classes/NotifyNamespace.md#updatewebhook) to add and
remove NFT filters for a [NftActivityWebhook](NftActivityWebhook.md).

## Table of contents

### Properties

- [addFilters](WebhookNftFilterUpdate.md#addfilters)
- [removeFilters](WebhookNftFilterUpdate.md#removefilters)

## Properties

### addFilters

• **addFilters**: [`NftFilter`](NftFilter.md)[]

The filters to additionally track.

#### Defined in

[src/types/types.ts:1346](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L1346)

___

### removeFilters

• **removeFilters**: [`NftFilter`](NftFilter.md)[]

Existing filters to remove.

#### Defined in

[src/types/types.ts:1348](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L1348)
