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

[src/types/types.ts:1449](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/types/types.ts#L1449)

___

### removeFilters

• **removeFilters**: [`NftFilter`](NftFilter.md)[]

Existing filters to remove.

#### Defined in

[src/types/types.ts:1451](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/types/types.ts#L1451)
