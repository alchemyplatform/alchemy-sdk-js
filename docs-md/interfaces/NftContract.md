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
- [openSea](NftContract.md#opensea)
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

[src/api/nft.ts:17](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8b1ae5c/src/api/nft.ts#L17)

___

### name

• `Optional` **name**: `string`

The name of the contract.

#### Defined in

[src/api/nft.ts:29](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8b1ae5c/src/api/nft.ts#L29)

___

### openSea

• `Optional` **openSea**: [`OpenSeaCollectionMetadata`](OpenSeaCollectionMetadata.md)

OpenSea's metadata for the contract.

#### Defined in

[src/api/nft.ts:35](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8b1ae5c/src/api/nft.ts#L35)

___

### symbol

• `Optional` **symbol**: `string`

The symbol of the contract.

#### Defined in

[src/api/nft.ts:31](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8b1ae5c/src/api/nft.ts#L31)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of the token in the contract.

#### Defined in

[src/api/nft.ts:27](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8b1ae5c/src/api/nft.ts#L27)

___

### totalSupply

• `Optional` **totalSupply**: `string`

The number of NFTs in the contract as an integer string.

#### Defined in

[src/api/nft.ts:33](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8b1ae5c/src/api/nft.ts#L33)
