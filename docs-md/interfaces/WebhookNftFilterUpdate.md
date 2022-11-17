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

[src/types/types.ts:1651](https://github.com/alchemyplatform/alchemy-sdk-js/blob/30d9ef5/src/types/types.ts#L1651)

___

### removeFilters

• **removeFilters**: [`NftFilter`](NftFilter.md)[]

Existing filters to remove.

#### Defined in

[src/types/types.ts:1653](https://github.com/alchemyplatform/alchemy-sdk-js/blob/30d9ef5/src/types/types.ts#L1653)
