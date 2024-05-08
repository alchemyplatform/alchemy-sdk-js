[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftContractBaseNftsResponse

# Interface: NftContractBaseNftsResponse

The response object for the [getNftsForContract](../classes/NftNamespace.md#getnftsforcontract) function. The object
contains the NFTs without metadata inside the NFT contract.

## Table of contents

### Properties

- [nfts](NftContractBaseNftsResponse.md#nfts)
- [pageKey](NftContractBaseNftsResponse.md#pagekey)

## Properties

### nfts

• **nfts**: [`BaseNft`](BaseNft.md)[]

An array of NFTs without metadata.

#### Defined in

[src/types/nft-types.ts:1091](https://github.com/alchemyplatform/alchemy-sdk-js/blob/311be54/src/types/nft-types.ts#L1091)

___

### pageKey

• `Optional` **pageKey**: `string`

Pagination token that can be passed into another request to fetch the next
NFTs. If there is no page key, then there are no more NFTs to fetch.

#### Defined in

[src/types/nft-types.ts:1097](https://github.com/alchemyplatform/alchemy-sdk-js/blob/311be54/src/types/nft-types.ts#L1097)
