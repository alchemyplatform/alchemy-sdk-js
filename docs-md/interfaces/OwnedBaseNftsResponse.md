[alchemy-sdk](../README.md) / [Exports](../modules.md) / OwnedBaseNftsResponse

# Interface: OwnedBaseNftsResponse

The response object for the [getNftsForOwner](../classes/NftNamespace.md#getnftsforowner) and
[getNftsForOwnerIterator](../classes/NftNamespace.md#getnftsforowneriterator) functions. The object contains the NFTs
without metadata owned by the provided address, along with pagination
information and the total count.

## Table of contents

### Properties

- [ownedNfts](OwnedBaseNftsResponse.md#ownednfts)
- [pageKey](OwnedBaseNftsResponse.md#pagekey)
- [totalCount](OwnedBaseNftsResponse.md#totalcount)
- [validAt](OwnedBaseNftsResponse.md#validat)

## Properties

### ownedNfts

• **ownedNfts**: [`OwnedBaseNft`](OwnedBaseNft.md)[]

The NFTs owned by the provided address.

#### Defined in

[src/types/nft-types.ts:260](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/nft-types.ts#L260)

___

### pageKey

• `Optional` **pageKey**: `string`

Pagination token that can be passed into another request to fetch the next
NFTs. If there is no page key, then there are no more NFTs to fetch.

#### Defined in

[src/types/nft-types.ts:266](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/nft-types.ts#L266)

___

### totalCount

• **totalCount**: `number`

The total count of NFTs owned by the provided address.

#### Defined in

[src/types/nft-types.ts:269](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/nft-types.ts#L269)

___

### validAt

• **validAt**: [`OwnedNftsValidAt`](OwnedNftsValidAt.md)

Block Information of the block as of which the corresponding data is valid

#### Defined in

[src/types/nft-types.ts:274](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/nft-types.ts#L274)
