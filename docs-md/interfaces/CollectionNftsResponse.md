[exploring-pioneer](../README.md) / [Exports](../modules.md) / CollectionNftsResponse

# Interface: CollectionNftsResponse

The response object for the {@link (getNftsForCollection:2)} function. The
object contains the NFTs with metadata inside the collection.

## Table of contents

### Properties

- [nfts](CollectionNftsResponse.md#nfts)
- [pageKey](CollectionNftsResponse.md#pagekey)

## Properties

### nfts

• **nfts**: [`Nft`](../classes/Nft.md)[]

An array of NFTs with metadata.

#### Defined in

[types/types.ts:407](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/types/types.ts#L407)

___

### pageKey

• `Optional` **pageKey**: `string`

Pagination token that can be passed into another request to fetch the next
NFTs. If there is no page key, then there are no more NFTs to fetch.

#### Defined in

[types/types.ts:413](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/types/types.ts#L413)
