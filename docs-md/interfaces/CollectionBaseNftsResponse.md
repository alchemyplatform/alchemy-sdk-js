[@alch/alchemy-sdk](../README.md) / [Exports](../modules.md) / CollectionBaseNftsResponse

# Interface: CollectionBaseNftsResponse

The response object for the [getNftsForCollection](../modules.md#getnftsforcollection) function. The object
contains the NFTs without metadata inside the collection.

## Table of contents

### Properties

- [nfts](CollectionBaseNftsResponse.md#nfts)
- [pageKey](CollectionBaseNftsResponse.md#pagekey)

## Properties

### nfts

• **nfts**: [`BaseNft`](../classes/BaseNft.md)[]

An array of NFTs without metadata.

#### Defined in

[src/types/types.ts:412](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0fdf0d4/src/types/types.ts#L412)

___

### pageKey

• `Optional` **pageKey**: `string`

Pagination token that can be passed into another request to fetch the next
NFTs. If there is no page key, then there are no more NFTs to fetch.

#### Defined in

[src/types/types.ts:418](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0fdf0d4/src/types/types.ts#L418)
