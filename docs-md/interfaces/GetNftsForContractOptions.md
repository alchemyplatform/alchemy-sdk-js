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

[src/types/types.ts:858](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L858)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [NftContractBaseNftsResponse](NftContractBaseNftsResponse.md) or
[NftContractNftsResponse](NftContractNftsResponse.md)to use for pagination.

#### Defined in

[src/types/types.ts:855](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L855)

___

### pageSize

• `Optional` **pageSize**: `number`

Sets the total number of NFTs to return in the response. Defaults to 100.
Maximum page size is 100.

#### Defined in

[src/types/types.ts:864](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L864)

___

### tokenUriTimeoutInMs

• `Optional` **tokenUriTimeoutInMs**: `number`

No set timeout by default - When metadata is requested, this parameter is
the timeout (in milliseconds) for the website hosting the metadata to
respond. If you want to only access the cache and not live fetch any
metadata for cache misses then set this value to 0.

#### Defined in

[src/types/types.ts:872](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L872)
