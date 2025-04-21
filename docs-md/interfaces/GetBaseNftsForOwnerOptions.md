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
- [includeFilters](GetBaseNftsForOwnerOptions.md#includefilters)
- [omitMetadata](GetBaseNftsForOwnerOptions.md#omitmetadata)
- [orderBy](GetBaseNftsForOwnerOptions.md#orderby)
- [pageKey](GetBaseNftsForOwnerOptions.md#pagekey)
- [pageSize](GetBaseNftsForOwnerOptions.md#pagesize)
- [tokenUriTimeoutInMs](GetBaseNftsForOwnerOptions.md#tokenuritimeoutinms)

## Properties

### contractAddresses

• `Optional` **contractAddresses**: `string`[]

Optional list of contract addresses to filter the results by. Limit is 20.

#### Defined in

[src/types/nft-types.ts:160](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L160)

___

### excludeFilters

• `Optional` **excludeFilters**: [`NftFilters`](../enums/NftFilters.md)[]

Optional list of filters applied to the query. NFTs that match one or more
of these filters are excluded from the response.

#### Defined in

[src/types/nft-types.ts:166](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L166)

___

### includeFilters

• `Optional` **includeFilters**: [`NftFilters`](../enums/NftFilters.md)[]

Optional list of filters applied to the query. NFTs that match one or more
of these filters are included in the response.

#### Defined in

[src/types/nft-types.ts:172](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L172)

___

### omitMetadata

• **omitMetadata**: ``true``

Optional boolean flag to include NFT metadata. Defaults to `false`.

#### Defined in

[src/types/nft-types.ts:181](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L181)

___

### orderBy

• `Optional` **orderBy**: [`TRANSFERTIME`](../enums/NftOrdering.md#transfertime)

Order in which to return results. By default, results are ordered by
contract address and token ID in lexicographic order.

#### Defined in

[src/types/nft-types.ts:195](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L195)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [OwnedBaseNftsResponse](OwnedBaseNftsResponse.md) or
[OwnedNftsResponse](OwnedNftsResponse.md)to use for pagination.

#### Defined in

[src/types/nft-types.ts:157](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L157)

___

### pageSize

• `Optional` **pageSize**: `number`

Sets the total number of NFTs to return in the response. Defaults to 100.
Maximum page size is 100.

#### Defined in

[src/types/nft-types.ts:178](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L178)

___

### tokenUriTimeoutInMs

• `Optional` **tokenUriTimeoutInMs**: `number`

No set timeout by default - When metadata is requested, this parameter is
the timeout (in milliseconds) for the website hosting the metadata to
respond. If you want to only access the cache and not live fetch any
metadata for cache misses then set this value to 0.

#### Defined in

[src/types/nft-types.ts:189](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L189)
