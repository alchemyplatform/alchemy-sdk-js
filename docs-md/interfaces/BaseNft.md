[alchemy-sdk](../README.md) / [Exports](../modules.md) / BaseNft

# Interface: BaseNft

Alchemy representation of an NFT that doesn't contain metadata.

The BaseNft object does not hold any metadata information and only contains
the NFT contract and token ID. The Nft object additionally contains the NFT
metadata, token URI information, and media.

## Hierarchy

- **`BaseNft`**

  ↳ [`Nft`](Nft.md)

  ↳ [`OwnedBaseNft`](OwnedBaseNft.md)

## Table of contents

### Properties

- [contract](BaseNft.md#contract)
- [tokenId](BaseNft.md#tokenid)
- [tokenType](BaseNft.md#tokentype)

## Properties

### contract

• **contract**: [`BaseNftContract`](BaseNftContract.md)

#### Defined in

[src/api/nft.ts:56](https://github.com/alchemyplatform/alchemy-sdk-js/blob/d97ef0d/src/api/nft.ts#L56)

___

### tokenId

• **tokenId**: `string`

The NFT token ID as an integer string.

#### Defined in

[src/api/nft.ts:58](https://github.com/alchemyplatform/alchemy-sdk-js/blob/d97ef0d/src/api/nft.ts#L58)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of ERC token, if known.

#### Defined in

[src/api/nft.ts:60](https://github.com/alchemyplatform/alchemy-sdk-js/blob/d97ef0d/src/api/nft.ts#L60)
