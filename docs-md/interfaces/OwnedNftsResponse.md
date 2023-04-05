[alchemy-sdk](../README.md) / [Exports](../modules.md) / OwnedNftsResponse

# Interface: OwnedNftsResponse

The response object for the [getNftsForOwner](../classes/NftNamespace.md#getnftsforowner) and
[getNftsForOwnerIterator](../classes/NftNamespace.md#getnftsforowneriterator) functions. The object contains the NFTs with
metadata owned by the provided address, along with pagination information and
the total count.

## Table of contents

### Properties

- [blockHash](OwnedNftsResponse.md#blockhash)
- [ownedNfts](OwnedNftsResponse.md#ownednfts)
- [pageKey](OwnedNftsResponse.md#pagekey)
- [totalCount](OwnedNftsResponse.md#totalcount)

## Properties

### blockHash

• **blockHash**: `string`

The canonical head block hash of when your request was received.

#### Defined in

[src/types/types.ts:774](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/types/types.ts#L774)

___

### ownedNfts

• `Readonly` **ownedNfts**: [`OwnedNft`](OwnedNft.md)[]

The NFTs owned by the provided address.

#### Defined in

[src/types/types.ts:762](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/types/types.ts#L762)

___

### pageKey

• `Optional` `Readonly` **pageKey**: `string`

Pagination token that can be passed into another request to fetch the next
NFTs. If there is no page key, then there are no more NFTs to fetch.

#### Defined in

[src/types/types.ts:768](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/types/types.ts#L768)

___

### totalCount

• `Readonly` **totalCount**: `number`

The total count of NFTs owned by the provided address.

#### Defined in

[src/types/types.ts:771](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/types/types.ts#L771)
