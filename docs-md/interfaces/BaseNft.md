[alchemy-sdk](../README.md) / [Exports](../modules.md) / BaseNft

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

[src/api/nft.ts:35](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L35)

___

### tokenId

• **tokenId**: `string`

The NFT token ID as an integer string.

#### Defined in

[src/api/nft.ts:37](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L37)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of ERC token, if known.

#### Defined in

[src/api/nft.ts:39](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L39)
