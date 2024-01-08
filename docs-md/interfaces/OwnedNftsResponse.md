[alchemy-sdk](../README.md) / [Exports](../modules.md) / OwnedNftsResponse

# Interface: OwnedNftsResponse

The response object for the [getNftsForOwner](../classes/NftNamespace.md#getnftsforowner) and
[getNftsForOwnerIterator](../classes/NftNamespace.md#getnftsforowneriterator) functions. The object contains the NFTs with
metadata owned by the provided address, along with pagination information and
the total count.

## Table of contents

### Properties

- [ownedNfts](OwnedNftsResponse.md#ownednfts)
- [pageKey](OwnedNftsResponse.md#pagekey)
- [totalCount](OwnedNftsResponse.md#totalcount)
- [validAt](OwnedNftsResponse.md#validat)

## Properties

### ownedNfts

• **ownedNfts**: [`OwnedNft`](OwnedNft.md)[]

The NFTs owned by the provided address.

#### Defined in

[src/types/nft-types.ts:233](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6dc36f9/src/types/nft-types.ts#L233)

___

### pageKey

• `Optional` **pageKey**: `string`

Pagination token that can be passed into another request to fetch the next
NFTs. If there is no page key, then there are no more NFTs to fetch.

#### Defined in

[src/types/nft-types.ts:239](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6dc36f9/src/types/nft-types.ts#L239)

___

### totalCount

• **totalCount**: `number`

The total count of NFTs owned by the provided address.

#### Defined in

[src/types/nft-types.ts:242](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6dc36f9/src/types/nft-types.ts#L242)

___

### validAt

• **validAt**: [`OwnedNftsValidAt`](OwnedNftsValidAt.md)

Block Information of the block as of which the corresponding data is valid

#### Defined in

[src/types/nft-types.ts:247](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6dc36f9/src/types/nft-types.ts#L247)
