[alchemy-sdk](../README.md) / [Exports](../modules.md) / OwnedBaseNftsResponse

# Interface: OwnedBaseNftsResponse

The response object for the [getNftsForOwner](../classes/NftNamespace.md#getnftsforowner) and
{@link getNftsForOwnerIterator)} functions. The object contains the NFTs
without metadata owned by the provided address, along with pagination
information and the total count.

## Table of contents

### Properties

- [ownedNfts](OwnedBaseNftsResponse.md#ownednfts)
- [pageKey](OwnedBaseNftsResponse.md#pagekey)
- [totalCount](OwnedBaseNftsResponse.md#totalcount)

## Properties

### ownedNfts

• `Readonly` **ownedNfts**: [`OwnedBaseNft`](OwnedBaseNft.md)[]

The NFTs owned by the provided address.

#### Defined in

[src/types/types.ts:333](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fd39d10/src/types/types.ts#L333)

___

### pageKey

• `Optional` `Readonly` **pageKey**: `string`

Pagination token that can be passed into another request to fetch the next
NFTs. If there is no page key, then there are no more NFTs to fetch.

#### Defined in

[src/types/types.ts:339](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fd39d10/src/types/types.ts#L339)

___

### totalCount

• `Readonly` **totalCount**: `number`

The total count of NFTs owned by the provided address.

#### Defined in

[src/types/types.ts:342](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fd39d10/src/types/types.ts#L342)
