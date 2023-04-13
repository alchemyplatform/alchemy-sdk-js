[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetNftsForContractOptions

# Interface: GetNftsForContractOptions

Optional parameters object for the [getNftsForContract](../classes/NftNamespace.md#getnftsforcontract) and
[getNftsForContractIterator](../classes/NftNamespace.md#getnftsforcontractiterator) functions.

This interface is used to fetch NFTs with their associated metadata. To get
Nfts without their associated metadata, use [GetBaseNftsForContractOptions](GetBaseNftsForContractOptions.md).

## Table of contents

### Properties

- [omitMetadata](GetNftsForContractOptions.md#omitmetadata)
- [pageKey](GetNftsForContractOptions.md#pagekey)
- [pageSize](GetNftsForContractOptions.md#pagesize)
- [tokenUriTimeoutInMs](GetNftsForContractOptions.md#tokenuritimeoutinms)

## Properties

### omitMetadata

• `Optional` **omitMetadata**: `boolean`

Optional boolean flag to omit NFT metadata. Defaults to `false`.

#### Defined in

[src/types/types.ts:1511](https://github.com/alchemyplatform/alchemy-sdk-js/blob/85196e8/src/types/types.ts#L1511)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [NftContractBaseNftsResponse](NftContractBaseNftsResponse.md) or
[NftContractNftsResponse](NftContractNftsResponse.md)to use for pagination.

#### Defined in

[src/types/types.ts:1508](https://github.com/alchemyplatform/alchemy-sdk-js/blob/85196e8/src/types/types.ts#L1508)

___

### pageSize

• `Optional` **pageSize**: `number`

Sets the total number of NFTs to return in the response. Defaults to 100.
Maximum page size is 100.

#### Defined in

[src/types/types.ts:1517](https://github.com/alchemyplatform/alchemy-sdk-js/blob/85196e8/src/types/types.ts#L1517)

___

### tokenUriTimeoutInMs

• `Optional` **tokenUriTimeoutInMs**: `number`

No set timeout by default - When metadata is requested, this parameter is
the timeout (in milliseconds) for the website hosting the metadata to
respond. If you want to only access the cache and not live fetch any
metadata for cache misses then set this value to 0.

#### Defined in

[src/types/types.ts:1525](https://github.com/alchemyplatform/alchemy-sdk-js/blob/85196e8/src/types/types.ts#L1525)
