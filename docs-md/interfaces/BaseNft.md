[alchemy-sdk](../README.md) / [Exports](../modules.md) / BaseNft

# Interface: BaseNft

Alchemy representation of an NFT that doesn't contain metadata.

The BaseNft object does not hold any metadata information and only contains
the NFT contract and token ID. The Nft object additionally contains the NFT
metadata, token URI information, and media.

## Hierarchy

- **`BaseNft`**

  ↳ [`OwnedBaseNft`](OwnedBaseNft.md)

## Table of contents

### Properties

- [contractAddress](BaseNft.md#contractaddress)
- [tokenId](BaseNft.md#tokenid)

## Properties

### contractAddress

• **contractAddress**: `string`

The contract address of the NFT.

#### Defined in

[src/types/nft-types.ts:1240](https://github.com/alchemyplatform/alchemy-sdk-js/blob/44aa50c/src/types/nft-types.ts#L1240)

___

### tokenId

• **tokenId**: `string`

The NFT token ID as an integer string.

#### Defined in

[src/types/nft-types.ts:1242](https://github.com/alchemyplatform/alchemy-sdk-js/blob/44aa50c/src/types/nft-types.ts#L1242)
