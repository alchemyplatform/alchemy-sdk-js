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

[src/types/types.ts:2258](https://github.com/alchemyplatform/alchemy-sdk-js/blob/340ad5a/src/types/types.ts#L2258)

___

### removeFilters

• **removeFilters**: [`NftFilter`](NftFilter.md)[]

Existing filters to remove.

#### Defined in

[src/types/types.ts:2260](https://github.com/alchemyplatform/alchemy-sdk-js/blob/340ad5a/src/types/types.ts#L2260)
