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

#### Inherited from

[BaseNftContract](BaseNftContract.md).[address](BaseNftContract.md#address)

#### Defined in

[src/api/nft.ts:9](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6507682/src/api/nft.ts#L9)

___

### name

• `Optional` **name**: `string`

The name of the contract.

#### Defined in

[src/api/nft.ts:21](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6507682/src/api/nft.ts#L21)

___

### symbol

• `Optional` **symbol**: `string`

The symbol of the contract.

#### Defined in

[src/api/nft.ts:23](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6507682/src/api/nft.ts#L23)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of the token in the contract.

#### Defined in

[src/api/nft.ts:19](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6507682/src/api/nft.ts#L19)

___

### totalSupply

• `Optional` **totalSupply**: `number`

The number of NFTs in the contract.

#### Defined in

[src/api/nft.ts:25](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6507682/src/api/nft.ts#L25)
