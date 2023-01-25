[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftMetadataBatchOptions

# Interface: NftMetadataBatchOptions

Additional options for the [NftNamespace.getNftMetadataBatch](../classes/NftNamespace.md#getnftmetadatabatch) method.

## Table of contents

### Properties

- [refreshCache](NftMetadataBatchOptions.md#refreshcache)
- [tokenUriTimeoutInMs](NftMetadataBatchOptions.md#tokenuritimeoutinms)

## Properties

### refreshCache

• `Optional` **refreshCache**: `boolean`

Whether to refresh the metadata for the given NFT token before returning
the response. Defaults to false for faster response times.

#### Defined in

[src/types/types.ts:850](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/types/types.ts#L850)

___

### tokenUriTimeoutInMs

• `Optional` **tokenUriTimeoutInMs**: `number`

No set timeout by default - When metadata is requested, this parameter is
the timeout (in milliseconds) for the website hosting the metadata to
respond. If you want to only access the cache and not live fetch any
metadata for cache misses then set this value to 0.

#### Defined in

[src/types/types.ts:844](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/types/types.ts#L844)
