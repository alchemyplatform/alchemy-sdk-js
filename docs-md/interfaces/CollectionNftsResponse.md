[alchemy-evm-js](../README.md) / [Exports](../modules.md) / CollectionNftsResponse

# Interface: CollectionNftsResponse

The response object for the [getNftsForCollection](../modules.md#getnftsforcollection) function. The object
contains the NFTs with metadata inside the collection.

## Table of contents

### Properties

- [nfts](CollectionNftsResponse.md#nfts)
- [pageKey](CollectionNftsResponse.md#pagekey)

## Properties

### nfts

• **nfts**: [`Nft`](../classes/Nft.md)[]

An array of NFTs with metadata.

#### Defined in

[types/types.ts:410](https://github.com/alchemyplatform/alchemy-evm-js/blob/0259d36/src/types/types.ts#L410)

___

### pageKey

• `Optional` **pageKey**: `string`

Pagination token that can be passed into another request to fetch the next
NFTs. If there is no page key, then there are no more NFTs to fetch.

#### Defined in

[types/types.ts:416](https://github.com/alchemyplatform/alchemy-evm-js/blob/0259d36/src/types/types.ts#L416)
