[exploring-pioneer](../README.md) / [Exports](../modules.md) / OwnedNftsResponse

# Interface: OwnedNftsResponse

The response object for the {@link (getNfts:2)} and
{@link (getNftsPaginated:2)} functions. The object contains the NFTs with
metadata owned by the provided address, along with pagination information and
the total count.

## Table of contents

### Properties

- [ownedNfts](OwnedNftsResponse.md#ownednfts)
- [pageKey](OwnedNftsResponse.md#pagekey)
- [totalCount](OwnedNftsResponse.md#totalcount)

## Properties

### ownedNfts

• `Readonly` **ownedNfts**: [`OwnedNft`](OwnedNft.md)[]

The NFTs owned by the provided address.

#### Defined in

[types/types.ts:239](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/types/types.ts#L239)

___

### pageKey

• `Optional` `Readonly` **pageKey**: `string`

Pagination token that can be passed into another request to fetch the next
NFTs. If there is no page key, then there are no more NFTs to fetch.

#### Defined in

[types/types.ts:245](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/types/types.ts#L245)

___

### totalCount

• `Readonly` **totalCount**: `number`

The total count of NFTs owned by the provided address.

#### Defined in

[types/types.ts:248](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/types/types.ts#L248)
