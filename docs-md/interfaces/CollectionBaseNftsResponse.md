[exploring-pioneer](../README.md) / [Exports](../modules.md) / CollectionBaseNftsResponse

# Interface: CollectionBaseNftsResponse

The response object for the {@link (getNftsForCollection:1)} function. The
object contains the NFTs without metadata inside the collection.

## Table of contents

### Properties

- [nfts](CollectionBaseNftsResponse.md#nfts)
- [pageKey](CollectionBaseNftsResponse.md#pagekey)

## Properties

### nfts

• **nfts**: [`BaseNft`](../classes/BaseNft.md)[]

An array of NFTs without metadata.

#### Defined in

[types/types.ts:390](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/types/types.ts#L390)

___

### pageKey

• `Optional` **pageKey**: `string`

Pagination token that can be passed into another request to fetch the next
NFTs. If there is no page key, then there are no more NFTs to fetch.

#### Defined in

[types/types.ts:396](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/types/types.ts#L396)
