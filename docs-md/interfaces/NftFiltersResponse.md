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

[src/types/types.ts:2318](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/types/types.ts#L2318)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key used to fetch the remaining filters.

#### Defined in

[src/types/types.ts:2322](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/types/types.ts#L2322)

___

### totalCount

• **totalCount**: `number`

The total number of NFT filters on the webhook.

#### Defined in

[src/types/types.ts:2320](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/types/types.ts#L2320)
