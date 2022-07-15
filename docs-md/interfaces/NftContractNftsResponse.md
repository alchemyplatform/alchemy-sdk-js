[@alch/alchemy-sdk](../README.md) / [Exports](../modules.md) / NftContractNftsResponse

# Interface: NftContractNftsResponse

The response object for the [getNftsForNftContract](../classes/Alchemy.md#getnftsfornftcontract) function. The object
contains the NFTs with metadata inside the NFT contract.

## Table of contents

### Properties

- [nfts](NftContractNftsResponse.md#nfts)
- [pageKey](NftContractNftsResponse.md#pagekey)

## Properties

### nfts

• **nfts**: [`Nft`](Nft.md)[]

An array of NFTs with metadata.

#### Defined in

[types/types.ts:543](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L543)

___

### pageKey

• `Optional` **pageKey**: `string`

Pagination token that can be passed into another request to fetch the next
NFTs. If there is no page key, then there are no more NFTs to fetch.

#### Defined in

[types/types.ts:549](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L549)
