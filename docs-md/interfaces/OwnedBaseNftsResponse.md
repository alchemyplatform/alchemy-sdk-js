[alchemy-sdk](../README.md) / [Exports](../modules.md) / OwnedBaseNftsResponse

# Interface: OwnedBaseNftsResponse

The response object for the [getNftsForOwner](../classes/NftNamespace.md#getnftsforowner) and
[getNftsForOwnerIterator](../classes/NftNamespace.md#getnftsforowneriterator) functions. The object contains the NFTs
without metadata owned by the provided address, along with pagination
information and the total count.

## Table of contents

### Properties

- [blockHash](OwnedBaseNftsResponse.md#blockhash)
- [ownedNfts](OwnedBaseNftsResponse.md#ownednfts)
- [pageKey](OwnedBaseNftsResponse.md#pagekey)
- [totalCount](OwnedBaseNftsResponse.md#totalcount)

## Properties

### blockHash

• **blockHash**: `string`

The canonical head block hash of when your request was received.

#### Defined in

[src/types/types.ts:810](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L810)

___

### ownedNfts

• `Readonly` **ownedNfts**: [`OwnedBaseNft`](OwnedBaseNft.md)[]

The NFTs owned by the provided address.

#### Defined in

[src/types/types.ts:798](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L798)

___

### pageKey

• `Optional` `Readonly` **pageKey**: `string`

Pagination token that can be passed into another request to fetch the next
NFTs. If there is no page key, then there are no more NFTs to fetch.

#### Defined in

[src/types/types.ts:804](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L804)

___

### totalCount

• `Readonly` **totalCount**: `number`

The total count of NFTs owned by the provided address.

#### Defined in

[src/types/types.ts:807](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L807)
