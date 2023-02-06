[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetMintedNftsResponse

# Interface: GetMintedNftsResponse

**`deprecated`** Use [TransfersNftResponse](TransfersNftResponse.md) instead.

## Table of contents

### Properties

- [nfts](GetMintedNftsResponse.md#nfts)
- [pageKey](GetMintedNftsResponse.md#pagekey)

## Properties

### nfts

• **nfts**: [`Nft`](Nft.md)[]

An array of the minted NFTs for the provided owner address.

#### Defined in

[src/types/types.ts:1150](https://github.com/alchemyplatform/alchemy-sdk-js/blob/a8bc079/src/types/types.ts#L1150)

___

### pageKey

• `Optional` **pageKey**: `string`

Key for pagination to use to fetch results from the next page if available.

#### Defined in

[src/types/types.ts:1153](https://github.com/alchemyplatform/alchemy-sdk-js/blob/a8bc079/src/types/types.ts#L1153)
