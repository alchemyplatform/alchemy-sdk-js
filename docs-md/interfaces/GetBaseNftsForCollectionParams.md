[exploring-pioneer](../README.md) / [Exports](../modules.md) / GetBaseNftsForCollectionParams

# Interface: GetBaseNftsForCollectionParams

Parameters object for the {@link (getNftsForCollection:1)} and
{@link (getNftsForCollectionPaginated:1)} functions.

This interface is used to fetch NFTs without their associated metadata. To
get Nfts with their associated metadata, use [GetNftsForCollectionParams](GetNftsForCollectionParams.md).

## Table of contents

### Properties

- [contractAddress](GetBaseNftsForCollectionParams.md#contractaddress)
- [omitMetadata](GetBaseNftsForCollectionParams.md#omitmetadata)
- [pageKey](GetBaseNftsForCollectionParams.md#pagekey)

## Properties

### contractAddress

• **contractAddress**: `string`

The contract address of the collection.

#### Defined in

[types/types.ts:370](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/types/types.ts#L370)

___

### omitMetadata

• **omitMetadata**: ``false``

Optional boolean flag to omit NFT metadata. Defaults to `false`.

#### Defined in

[types/types.ts:379](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/types/types.ts#L379)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [CollectionBaseNftsResponse](CollectionBaseNftsResponse.md) or
[CollectionNftsResponse](CollectionNftsResponse.md)to use for pagination.

#### Defined in

[types/types.ts:376](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/types/types.ts#L376)
