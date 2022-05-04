[alchemy-evm-js](../README.md) / [Exports](../modules.md) / CollectionBaseNftsResponse

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

[types/types.ts:393](https://github.com/alchemyplatform/alchemy-evm-js/blob/9408ee9/src/types/types.ts#L393)

___

### pageKey

• `Optional` **pageKey**: `string`

Pagination token that can be passed into another request to fetch the next
NFTs. If there is no page key, then there are no more NFTs to fetch.

#### Defined in

[types/types.ts:399](https://github.com/alchemyplatform/alchemy-evm-js/blob/9408ee9/src/types/types.ts#L399)
