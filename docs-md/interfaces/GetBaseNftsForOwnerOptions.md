[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetBaseNftsForOwnerOptions

# Interface: GetBaseNftsForOwnerOptions

Optional parameters object for the [getNftsForOwner](../classes/NftNamespace.md#getnftsforowner) and
[getNftsForOwnerIterator](../classes/NftNamespace.md#getnftsforowneriterator) functions.

This interface is used to fetch NFTs without their associated metadata. To
get Nfts with their associated metadata, use [GetNftsForOwnerOptions](GetNftsForOwnerOptions.md).

## Table of contents

### Properties

- [contractAddresses](GetBaseNftsForOwnerOptions.md#contractaddresses)
- [excludeFilters](GetBaseNftsForOwnerOptions.md#excludefilters)
- [omitMetadata](GetBaseNftsForOwnerOptions.md#omitmetadata)
- [pageKey](GetBaseNftsForOwnerOptions.md#pagekey)
- [pageSize](GetBaseNftsForOwnerOptions.md#pagesize)
- [tokenUriTimeoutInMs](GetBaseNftsForOwnerOptions.md#tokenuritimeoutinms)

## Properties

### contractAddresses

• `Optional` **contractAddresses**: `string`[]

Optional list of contract addresses to filter the results by. Limit is 20.

#### Defined in

[src/types/types.ts:562](https://github.com/alchemyplatform/alchemy-sdk-js/blob/3091a11/src/types/types.ts#L562)

___

### excludeFilters

• `Optional` **excludeFilters**: [`NftExcludeFilters`](../enums/NftExcludeFilters.md)[]

Optional list of filters applied to the query. NFTs that match one or more
of these filters are excluded from the response.

#### Defined in

[src/types/types.ts:568](https://github.com/alchemyplatform/alchemy-sdk-js/blob/3091a11/src/types/types.ts#L568)

___

### omitMetadata

• **omitMetadata**: ``true``

Optional boolean flag to include NFT metadata. Defaults to `false`.

#### Defined in

[src/types/types.ts:577](https://github.com/alchemyplatform/alchemy-sdk-js/blob/3091a11/src/types/types.ts#L577)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [OwnedBaseNftsResponse](OwnedBaseNftsResponse.md) or
[OwnedNftsResponse](OwnedNftsResponse.md)to use for pagination.

#### Defined in

[src/types/types.ts:559](https://github.com/alchemyplatform/alchemy-sdk-js/blob/3091a11/src/types/types.ts#L559)

___

### pageSize

• `Optional` **pageSize**: `number`

Sets the total number of NFTs to return in the response. Defaults to 100.
Maximum page size is 100.

#### Defined in

[src/types/types.ts:574](https://github.com/alchemyplatform/alchemy-sdk-js/blob/3091a11/src/types/types.ts#L574)

___

### tokenUriTimeoutInMs

• `Optional` **tokenUriTimeoutInMs**: `number`

No set timeout by default - When metadata is requested, this parameter is
the timeout (in milliseconds) for the website hosting the metadata to
respond. If you want to only access the cache and not live fetch any
metadata for cache misses then set this value to 0.

#### Defined in

[src/types/types.ts:585](https://github.com/alchemyplatform/alchemy-sdk-js/blob/3091a11/src/types/types.ts#L585)
