[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftContract

# Interface: NftContract

Alchemy representation of an NFT contract.

The BaseNftContract does not hold any metadata information and only contains
the address. The NftContract additionally contains the tokenType, name,
symbol, and more.

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

[src/api/nft.ts:21](https://github.com/alchemyplatform/alchemy-sdk-js/blob/d97ef0d/src/api/nft.ts#L21)

___

### name

• `Optional` **name**: `string`

The name of the contract.

#### Defined in

[src/api/nft.ts:37](https://github.com/alchemyplatform/alchemy-sdk-js/blob/d97ef0d/src/api/nft.ts#L37)

___

### openSea

• `Optional` **openSea**: [`OpenSeaCollectionMetadata`](OpenSeaCollectionMetadata.md)

OpenSea's metadata for the contract.

#### Defined in

[src/api/nft.ts:43](https://github.com/alchemyplatform/alchemy-sdk-js/blob/d97ef0d/src/api/nft.ts#L43)

___

### symbol

• `Optional` **symbol**: `string`

The symbol of the contract.

#### Defined in

[src/api/nft.ts:39](https://github.com/alchemyplatform/alchemy-sdk-js/blob/d97ef0d/src/api/nft.ts#L39)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of the token in the contract.

#### Defined in

[src/api/nft.ts:35](https://github.com/alchemyplatform/alchemy-sdk-js/blob/d97ef0d/src/api/nft.ts#L35)

___

### totalSupply

• `Optional` **totalSupply**: `string`

The number of NFTs in the contract as an integer string.

#### Defined in

[src/api/nft.ts:41](https://github.com/alchemyplatform/alchemy-sdk-js/blob/d97ef0d/src/api/nft.ts#L41)
