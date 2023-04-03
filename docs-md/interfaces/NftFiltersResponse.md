[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftFiltersResponse

# Interface: NftFiltersResponse

Response object for the [NotifyNamespace.getNftFilters](../classes/NotifyNamespace.md#getnftfilters) method.

## Table of contents

### Properties

- [filters](NftFiltersResponse.md#filters)
- [pageKey](NftFiltersResponse.md#pagekey)
- [totalCount](NftFiltersResponse.md#totalcount)

## Properties

### filters

• **filters**: [`NftFilter`](NftFilter.md)[]

The NFT filters on the provided webhook.

#### Defined in

[src/types/types.ts:2287](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5fad342/src/types/types.ts#L2287)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key used to fetch the remaining filters.

#### Defined in

[src/types/types.ts:2291](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5fad342/src/types/types.ts#L2291)

___

### totalCount

• **totalCount**: `number`

The total number of NFT filters on the webhook.

#### Defined in

[src/types/types.ts:2289](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5fad342/src/types/types.ts#L2289)
