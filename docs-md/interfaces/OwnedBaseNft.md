[@alch/alchemy-sdk](../README.md) / [Exports](../modules.md) / OwnedBaseNft

# Interface: OwnedBaseNft

Represents an NFT without metadata owned by an address.

## Hierarchy

- [`BaseNft`](../classes/BaseNft.md)

  ↳ **`OwnedBaseNft`**

## Table of contents

### Properties

- [balance](OwnedBaseNft.md#balance)
- [contract](OwnedBaseNft.md#contract)
- [tokenId](OwnedBaseNft.md#tokenid)
- [tokenType](OwnedBaseNft.md#tokentype)

## Properties

### balance

• `Readonly` **balance**: `number`

The token balance of the NFT.

#### Defined in

[src/types/types.ts:308](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0fdf0d4/src/types/types.ts#L308)

___

### contract

• `Readonly` **contract**: [`NftContract`](NftContract.md)

#### Inherited from

[BaseNft](../classes/BaseNft.md).[contract](../classes/BaseNft.md#contract)

#### Defined in

[src/api/nft.ts:21](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0fdf0d4/src/api/nft.ts#L21)

___

### tokenId

• `Readonly` **tokenId**: `string`

#### Inherited from

[BaseNft](../classes/BaseNft.md).[tokenId](../classes/BaseNft.md#tokenid)

___

### tokenType

• `Readonly` **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

#### Inherited from

[BaseNft](../classes/BaseNft.md).[tokenType](../classes/BaseNft.md#tokentype)
