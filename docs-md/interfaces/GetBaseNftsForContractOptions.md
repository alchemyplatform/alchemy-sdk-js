[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetBaseNftsForContractOptions

# Interface: GetBaseNftsForContractOptions

Optional parameters object for the [getNftsForContract](../classes/NftNamespace.md#getnftsforcontract) and
[getNftsForContractIterator](../classes/NftNamespace.md#getnftsforcontractiterator) functions.

This interface is used to fetch NFTs without their associated metadata. To
get Nfts with their associated metadata, use [GetNftsForContractOptions](GetNftsForContractOptions.md).

## Table of contents

### Properties

- [omitMetadata](GetBaseNftsForContractOptions.md#omitmetadata)
- [pageKey](GetBaseNftsForContractOptions.md#pagekey)
- [pageSize](GetBaseNftsForContractOptions.md#pagesize)
- [tokenUriTimeoutInMs](GetBaseNftsForContractOptions.md#tokenuritimeoutinms)

## Properties

### omitMetadata

• **omitMetadata**: ``false``

Optional boolean flag to omit NFT metadata. Defaults to `false`.

#### Defined in

[src/types/types.ts:1365](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L1365)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [NftContractBaseNftsResponse](NftContractBaseNftsResponse.md) or
[NftContractNftsResponse](NftContractNftsResponse.md)to use for pagination.

#### Defined in

[src/types/types.ts:1362](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L1362)

___

### pageSize

• `Optional` **pageSize**: `number`

Sets the total number of NFTs to return in the response. Defaults to 100.
Maximum page size is 100.

#### Defined in

[src/types/types.ts:1371](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L1371)

___

### tokenUriTimeoutInMs

• `Optional` **tokenUriTimeoutInMs**: `number`

No set timeout by default - When metadata is requested, this parameter is
the timeout (in milliseconds) for the website hosting the metadata to
respond. If you want to only access the cache and not live fetch any
metadata for cache misses then set this value to 0.

#### Defined in

[src/types/types.ts:1379](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L1379)
