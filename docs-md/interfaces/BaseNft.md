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

[src/api/nft.ts:44](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/api/nft.ts#L44)

___

### tokenId

• **tokenId**: `string`

The NFT token ID as an integer string.

#### Defined in

[src/api/nft.ts:46](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/api/nft.ts#L46)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of ERC token, if known.

#### Defined in

[src/api/nft.ts:48](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/api/nft.ts#L48)
