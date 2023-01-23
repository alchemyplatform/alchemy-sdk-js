[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftContractNftsResponse

# Interface: NftContractNftsResponse

The response object for the [getNftsForContract](../classes/NftNamespace.md#getnftsforcontract) function. The object
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

[src/types/types.ts:1451](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L1451)

___

### pageKey

• `Optional` **pageKey**: `string`

Pagination token that can be passed into another request to fetch the next
NFTs. If there is no page key, then there are no more NFTs to fetch.

#### Defined in

[src/types/types.ts:1457](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L1457)
