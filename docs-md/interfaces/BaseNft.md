[@alch/alchemy-sdk](../README.md) / [Exports](../modules.md) / BaseNft

# Interface: BaseNft

Alchemy representation of a base NFT that doesn't contain metadata.

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

[api/nft.ts:34](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/nft.ts#L34)

___

### tokenId

• **tokenId**: `string`

The NFT token ID as an integer string.

#### Defined in

[api/nft.ts:36](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/nft.ts#L36)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of ERC token, if known.

#### Defined in

[api/nft.ts:38](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/nft.ts#L38)
