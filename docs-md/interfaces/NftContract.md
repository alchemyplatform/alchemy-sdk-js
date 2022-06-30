[@alch/alchemy-sdk](../README.md) / [Exports](../modules.md) / NftContract

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

[src/api/nft.ts:8](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L8)

___

### name

• `Optional` **name**: `string`

The name of the contract.

#### Defined in

[src/api/nft.ts:20](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L20)

___

### symbol

• `Optional` **symbol**: `string`

The symbol of the contract.

#### Defined in

[src/api/nft.ts:22](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L22)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of the token in the contract.

#### Defined in

[src/api/nft.ts:18](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L18)

___

### totalSupply

• `Optional` **totalSupply**: `number`

The number of NFTs in the contract.

#### Defined in

[src/api/nft.ts:24](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L24)
