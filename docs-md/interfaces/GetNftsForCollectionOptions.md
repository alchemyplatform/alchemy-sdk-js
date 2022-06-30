[@alch/alchemy-sdk](../README.md) / [Exports](../modules.md) / GetNftsForCollectionOptions

# Interface: GetNftsForCollectionOptions

Optional parameters object for the [getNftsForCollection](../modules.md#getnftsforcollection) and
[getNftsForCollectionIterator](../modules.md#getnftsforcollectioniterator) functions.

This interface is used to fetch NFTs with their associated metadata. To get
Nfts without their associated metadata, use [GetBaseNftsForCollectionOptions](GetBaseNftsForCollectionOptions.md).

## Table of contents

### Properties

- [omitMetadata](GetNftsForCollectionOptions.md#omitmetadata)
- [pageKey](GetNftsForCollectionOptions.md#pagekey)

## Properties

### omitMetadata

• `Optional` **omitMetadata**: `boolean`

Optional boolean flag to omit NFT metadata. Defaults to `false`.

#### Defined in

[src/types/types.ts:423](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/types/types.ts#L423)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [CollectionBaseNftsResponse](CollectionBaseNftsResponse.md) or
[CollectionNftsResponse](CollectionNftsResponse.md)to use for pagination.

#### Defined in

[src/types/types.ts:420](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/types/types.ts#L420)
