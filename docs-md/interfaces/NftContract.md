[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftContract

# Interface: NftContract

Alchemy representation of an NFT contract.

## Hierarchy

- [`BaseNftContract`](BaseNftContract.md)

  ↳ **`NftContract`**

## Table of contents

### Properties

- [address](NftContract.md#address)
- [name](NftContract.md#name)
- [symbol](NftContract.md#symbol)
- [tokenType](NftContract.md#tokentype)
- [totalSupply](NftContract.md#totalsupply)

## Properties

### address

• **address**: `string`

The address of the contract.

#### Inherited from

[BaseNftContract](BaseNftContract.md).[address](BaseNftContract.md#address)

#### Defined in

[src/api/nft.ts:16](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/api/nft.ts#L16)

___

### name

• `Optional` **name**: `string`

The name of the contract.

#### Defined in

[src/api/nft.ts:28](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/api/nft.ts#L28)

___

### symbol

• `Optional` **symbol**: `string`

The symbol of the contract.

#### Defined in

[src/api/nft.ts:30](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/api/nft.ts#L30)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of the token in the contract.

#### Defined in

[src/api/nft.ts:26](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/api/nft.ts#L26)

___

### totalSupply

• `Optional` **totalSupply**: `string`

The number of NFTs in the contract as an integer string.

#### Defined in

[src/api/nft.ts:32](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/api/nft.ts#L32)
