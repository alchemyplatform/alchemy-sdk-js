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

[src/types/types.ts:1360](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1360)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key used to fetch the remaining filters.

#### Defined in

[src/types/types.ts:1364](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1364)

___

### totalCount

• **totalCount**: `number`

The total number of NFT filters on the webhook.

#### Defined in

[src/types/types.ts:1362](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1362)
