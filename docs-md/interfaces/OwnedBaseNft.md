[alchemy-sdk](../README.md) / [Exports](../modules.md) / OwnedBaseNft

# Interface: OwnedBaseNft

Represents an NFT without metadata owned by an address.

## Hierarchy

- [`BaseNft`](BaseNft.md)

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

[src/types/types.ts:833](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5992f68/src/types/types.ts#L833)

___

### contract

• **contract**: [`BaseNftContract`](BaseNftContract.md)

#### Inherited from

[BaseNft](BaseNft.md).[contract](BaseNft.md#contract)

#### Defined in

[src/api/nft.ts:64](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5992f68/src/api/nft.ts#L64)

___

### tokenId

• **tokenId**: `string`

The NFT token ID as an integer string.

#### Inherited from

[BaseNft](BaseNft.md).[tokenId](BaseNft.md#tokenid)

#### Defined in

[src/api/nft.ts:66](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5992f68/src/api/nft.ts#L66)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of ERC token, if known.

#### Inherited from

[BaseNft](BaseNft.md).[tokenType](BaseNft.md#tokentype)

#### Defined in

[src/api/nft.ts:68](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5992f68/src/api/nft.ts#L68)
