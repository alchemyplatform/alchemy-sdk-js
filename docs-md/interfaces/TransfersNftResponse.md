[alchemy-sdk](../README.md) / [Exports](../modules.md) / TransfersNftResponse

# Interface: TransfersNftResponse

Response object for NFT methods that fetch NFTs that were transferred or
minted (ex: [NftNamespace.getTransfersForOwner](../classes/NftNamespace.md#gettransfersforowner) or
[NftNamespace.getMintedNfts](../classes/NftNamespace.md#getmintednfts)).

## Table of contents

### Properties

- [nfts](TransfersNftResponse.md#nfts)
- [pageKey](TransfersNftResponse.md#pagekey)

## Properties

### nfts

• **nfts**: [`TransferredNft`](TransferredNft.md)[]

An array of NFTs.

#### Defined in

[src/types/nft-types.ts:607](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/nft-types.ts#L607)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key to use to fetch the next group of NFTs.

#### Defined in

[src/types/nft-types.ts:609](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/nft-types.ts#L609)
