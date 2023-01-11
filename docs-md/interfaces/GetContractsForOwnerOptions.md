[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetContractsForOwnerOptions

# Interface: GetContractsForOwnerOptions

Optional parameters object for the the [getContractsForOwner](../classes/NftNamespace.md#getcontractsforowner) method

## Table of contents

### Properties

- [excludeFilters](GetContractsForOwnerOptions.md#excludefilters)
- [includeFilters](GetContractsForOwnerOptions.md#includefilters)
- [orderBy](GetContractsForOwnerOptions.md#orderby)
- [pageKey](GetContractsForOwnerOptions.md#pagekey)

## Properties

### excludeFilters

• `Optional` **excludeFilters**: [`NftFilters`](../enums/NftFilters.md)[]

Optional list of filters applied to the query. NFTs that match one or more
of these filters are excluded from the response. May not be used in
conjunction with [includeFilters](GetContractsForOwnerOptions.md#includefilters)

#### Defined in

[src/types/types.ts:915](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L915)

___

### includeFilters

• `Optional` **includeFilters**: [`NftFilters`](../enums/NftFilters.md)[]

Optional list of filters applied to the query. NFTs that match one or more
of these filters are included in the response. May not be used in
conjunction with [excludeFilters](GetContractsForOwnerOptions.md#excludefilters).

#### Defined in

[src/types/types.ts:908](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L908)

___

### orderBy

• `Optional` **orderBy**: [`TRANSFERTIME`](../enums/NftOrdering.md#transfertime)

Order in which to return results. By default, results are ordered by
contract address and token ID in lexicographic order.

#### Defined in

[src/types/types.ts:921](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L921)

___

### pageKey

• `Optional` **pageKey**: `string`

Key for pagination to use to fetch results from the next page if available.

#### Defined in

[src/types/types.ts:901](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L901)
