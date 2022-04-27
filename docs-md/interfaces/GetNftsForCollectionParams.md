[exploring-pioneer](../README.md) / [Exports](../modules.md) / GetNftsForCollectionParams

# Interface: GetNftsForCollectionParams

Parameters object for the {@link (getNftsForCollection:2)} and
{@link (getNftsForCollectionPaginated:2)} functions.

This interface is used to fetch NFTs with their associated metadata. To get
Nfts without their associated metadata, use [GetBaseNftsForCollectionParams](GetBaseNftsForCollectionParams.md).

## Table of contents

### Properties

- [contractAddress](GetNftsForCollectionParams.md#contractaddress)
- [omitMetadata](GetNftsForCollectionParams.md#omitmetadata)
- [pageKey](GetNftsForCollectionParams.md#pagekey)

## Properties

### contractAddress

• **contractAddress**: `string`

The contract address of the collection.

#### Defined in

[types/types.ts:347](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/types/types.ts#L347)

___

### omitMetadata

• `Optional` **omitMetadata**: `boolean`

Optional boolean flag to omit NFT metadata. Defaults to `false`.

#### Defined in

[types/types.ts:356](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/types/types.ts#L356)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [CollectionBaseNftsResponse](CollectionBaseNftsResponse.md) or
[CollectionNftsResponse](CollectionNftsResponse.md)to use for pagination.

#### Defined in

[types/types.ts:353](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/types/types.ts#L353)
