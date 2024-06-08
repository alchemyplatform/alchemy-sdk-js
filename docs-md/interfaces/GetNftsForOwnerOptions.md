[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetNftsForOwnerOptions

# Interface: GetNftsForOwnerOptions

Optional parameters object for the [getNftsForOwner](../classes/NftNamespace.md#getnftsforowner) and
[getNftsForOwnerIterator](../classes/NftNamespace.md#getnftsforowneriterator) functions.

This interface is used to fetch NFTs with their associated metadata. To get
Nfts without their associated metadata, use [GetBaseNftsForOwnerOptions](GetBaseNftsForOwnerOptions.md).

## Table of contents

### Properties

- [contractAddresses](GetNftsForOwnerOptions.md#contractaddresses)
- [excludeFilters](GetNftsForOwnerOptions.md#excludefilters)
- [includeFilters](GetNftsForOwnerOptions.md#includefilters)
- [omitMetadata](GetNftsForOwnerOptions.md#omitmetadata)
- [orderBy](GetNftsForOwnerOptions.md#orderby)
- [pageKey](GetNftsForOwnerOptions.md#pagekey)
- [pageSize](GetNftsForOwnerOptions.md#pagesize)
- [tokenUriTimeoutInMs](GetNftsForOwnerOptions.md#tokenuritimeoutinms)

## Properties

### contractAddresses

• `Optional` **contractAddresses**: `string`[]

Optional list of contract addresses to filter the results by. Limit is 20.

#### Defined in

[src/types/nft-types.ts:106](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c4bab3e/src/types/nft-types.ts#L106)

___

### excludeFilters

• `Optional` **excludeFilters**: [`NftFilters`](../enums/NftFilters.md)[]

Optional list of filters applied to the query. NFTs that match one or more
of these filters are excluded from the response.

#### Defined in

[src/types/nft-types.ts:112](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c4bab3e/src/types/nft-types.ts#L112)

___

### includeFilters

• `Optional` **includeFilters**: [`NftFilters`](../enums/NftFilters.md)[]

Optional list of filters applied to the query. NFTs that match one or more
of these filters are included in the response.

#### Defined in

[src/types/nft-types.ts:118](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c4bab3e/src/types/nft-types.ts#L118)

___

### omitMetadata

• `Optional` **omitMetadata**: `boolean`

Optional boolean flag to omit NFT metadata. Defaults to `false`.

#### Defined in

[src/types/nft-types.ts:127](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c4bab3e/src/types/nft-types.ts#L127)

___

### orderBy

• `Optional` **orderBy**: [`TRANSFERTIME`](../enums/NftOrdering.md#transfertime)

Order in which to return results. By default, results are ordered by
contract address and token ID in lexicographic order.

#### Defined in

[src/types/nft-types.ts:141](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c4bab3e/src/types/nft-types.ts#L141)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [OwnedBaseNftsResponse](OwnedBaseNftsResponse.md) or
[OwnedNftsResponse](OwnedNftsResponse.md)to use for pagination.

#### Defined in

[src/types/nft-types.ts:103](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c4bab3e/src/types/nft-types.ts#L103)

___

### pageSize

• `Optional` **pageSize**: `number`

Sets the total number of NFTs to return in the response. Defaults to 100.
Maximum page size is 100.

#### Defined in

[src/types/nft-types.ts:124](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c4bab3e/src/types/nft-types.ts#L124)

___

### tokenUriTimeoutInMs

• `Optional` **tokenUriTimeoutInMs**: `number`

No set timeout by default - When metadata is requested, this parameter is
the timeout (in milliseconds) for the website hosting the metadata to
respond. If you want to only access the cache and not live fetch any
metadata for cache misses then set this value to 0.

#### Defined in

[src/types/nft-types.ts:135](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c4bab3e/src/types/nft-types.ts#L135)
