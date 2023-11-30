[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetNftMetadataOptions

# Interface: GetNftMetadataOptions

Additional options for the [NftNamespace.getNftMetadata](../classes/NftNamespace.md#getnftmetadata) method.

## Table of contents

### Properties

- [refreshCache](GetNftMetadataOptions.md#refreshcache)
- [tokenType](GetNftMetadataOptions.md#tokentype)
- [tokenUriTimeoutInMs](GetNftMetadataOptions.md#tokenuritimeoutinms)

## Properties

### refreshCache

• `Optional` **refreshCache**: `boolean`

Whether to refresh the metadata for the given NFT token before returning
the response. Defaults to false for faster response times.

#### Defined in

[src/types/types.ts:924](https://github.com/alchemyplatform/alchemy-sdk-js/blob/432c999/src/types/types.ts#L924)

___

### tokenType

• `Optional` **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

Optional field to specify the type of token to speed up the query.

#### Defined in

[src/types/types.ts:911](https://github.com/alchemyplatform/alchemy-sdk-js/blob/432c999/src/types/types.ts#L911)

___

### tokenUriTimeoutInMs

• `Optional` **tokenUriTimeoutInMs**: `number`

No set timeout by default - When metadata is requested, this parameter is
the timeout (in milliseconds) for the website hosting the metadata to
respond. If you want to only access the cache and not live fetch any
metadata for cache misses then set this value to 0.

#### Defined in

[src/types/types.ts:918](https://github.com/alchemyplatform/alchemy-sdk-js/blob/432c999/src/types/types.ts#L918)
