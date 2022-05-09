[alchemy-sdk](../README.md) / [Exports](../modules.md) / OwnedBaseNft

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

[types/types.ts:299](https://github.com/alchemyplatform/alchemy-evm-js/blob/45d638a/src/types/types.ts#L299)

___

### contract

• `Readonly` **contract**: [`NftContract`](NftContract.md)

#### Inherited from

[BaseNft](../classes/BaseNft.md).[contract](../classes/BaseNft.md#contract)

#### Defined in

[api/nft.ts:21](https://github.com/alchemyplatform/alchemy-evm-js/blob/45d638a/src/api/nft.ts#L21)

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
