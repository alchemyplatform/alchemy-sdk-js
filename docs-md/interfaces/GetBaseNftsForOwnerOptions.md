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

[src/types/nft-types.ts:161](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L161)

___

### excludeFilters

• `Optional` **excludeFilters**: [`NftFilters`](../enums/NftFilters.md)[]

Optional list of filters applied to the query. NFTs that match one or more
of these filters are excluded from the response.

#### Defined in

[src/types/nft-types.ts:167](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L167)

___

### includeFilters

• `Optional` **includeFilters**: [`NftFilters`](../enums/NftFilters.md)[]

Optional list of filters applied to the query. NFTs that match one or more
of these filters are included in the response.

#### Defined in

[src/types/nft-types.ts:173](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L173)

___

### omitMetadata

• **omitMetadata**: ``true``

Optional boolean flag to include NFT metadata. Defaults to `false`.

#### Defined in

[src/types/nft-types.ts:182](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L182)

___

### orderBy

• `Optional` **orderBy**: [`TRANSFERTIME`](../enums/NftOrdering.md#transfertime)

Order in which to return results. By default, results are ordered by
contract address and token ID in lexicographic order.

#### Defined in

[src/types/nft-types.ts:196](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L196)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [OwnedBaseNftsResponse](OwnedBaseNftsResponse.md) or
[OwnedNftsResponse](OwnedNftsResponse.md)to use for pagination.

#### Defined in

[src/types/nft-types.ts:158](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L158)

___

### pageSize

• `Optional` **pageSize**: `number`

Sets the total number of NFTs to return in the response. Defaults to 100.
Maximum page size is 100.

#### Defined in

[src/types/nft-types.ts:179](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L179)

___

### tokenUriTimeoutInMs

• `Optional` **tokenUriTimeoutInMs**: `number`

No set timeout by default - When metadata is requested, this parameter is
the timeout (in milliseconds) for the website hosting the metadata to
respond. If you want to only access the cache and not live fetch any
metadata for cache misses then set this value to 0.

#### Defined in

[src/types/nft-types.ts:190](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L190)
