[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetContractsForOwnerOptions

# Interface: GetContractsForOwnerOptions

Optional parameters object for the [getContractsForOwner](../classes/NftNamespace.md#getcontractsforowner) method

## Table of contents

### Properties

- [excludeFilters](GetContractsForOwnerOptions.md#excludefilters)
- [includeFilters](GetContractsForOwnerOptions.md#includefilters)
- [orderBy](GetContractsForOwnerOptions.md#orderby)
- [pageKey](GetContractsForOwnerOptions.md#pagekey)
- [pageSize](GetContractsForOwnerOptions.md#pagesize)

## Properties

### excludeFilters

• `Optional` **excludeFilters**: [`NftFilters`](../enums/NftFilters.md)[]

Optional list of filters applied to the query. NFTs that match one or more
of these filters are excluded from the response. May not be used in
conjunction with [includeFilters](GetContractsForOwnerOptions.md#includefilters)

#### Defined in

[src/types/nft-types.ts:513](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L513)

___

### includeFilters

• `Optional` **includeFilters**: [`NftFilters`](../enums/NftFilters.md)[]

Optional list of filters applied to the query. NFTs that match one or more
of these filters are included in the response. May not be used in
conjunction with [excludeFilters](GetContractsForOwnerOptions.md#excludefilters).

#### Defined in

[src/types/nft-types.ts:506](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L506)

___

### orderBy

• `Optional` **orderBy**: [`TRANSFERTIME`](../enums/NftOrdering.md#transfertime)

Order in which to return results. By default, results are ordered by
contract address and token ID in lexicographic order.

#### Defined in

[src/types/nft-types.ts:519](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L519)

___

### pageKey

• `Optional` **pageKey**: `string`

Key for pagination to use to fetch results from the next page if available.

#### Defined in

[src/types/nft-types.ts:493](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L493)

___

### pageSize

• `Optional` **pageSize**: `number`

Configure the number of NFTs to return in each response. Maximum pages size
is 100. Defaults to 100.

#### Defined in

[src/types/nft-types.ts:499](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L499)
