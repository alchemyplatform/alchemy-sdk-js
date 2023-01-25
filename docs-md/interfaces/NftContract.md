[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftContract

# Interface: NftContract

Alchemy representation of an NFT contract.

The BaseNftContract does not hold any metadata information and only contains
the address. The NftContract additionally contains the tokenType, name,
symbol, and more.

## Hierarchy

- [`BaseNftContract`](BaseNftContract.md)

  ↳ **`NftContract`**

  ↳↳ [`ContractForOwner`](ContractForOwner.md)

## Table of contents

### Properties

- [address](NftContract.md#address)
- [contractDeployer](NftContract.md#contractdeployer)
- [deployedBlockNumber](NftContract.md#deployedblocknumber)
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

[src/api/nft.ts:21](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/api/nft.ts#L21)

___

### contractDeployer

• `Optional` **contractDeployer**: `string`

The address that deployed the NFT contract.

#### Defined in

[src/api/nft.ts:48](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/api/nft.ts#L48)

___

### deployedBlockNumber

• `Optional` **deployedBlockNumber**: `number`

The block number the NFT contract deployed in.

#### Defined in

[src/api/nft.ts:50](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/api/nft.ts#L50)

___

### name

• `Optional` **name**: `string`

The name of the contract.

#### Defined in

[src/api/nft.ts:37](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/api/nft.ts#L37)

___

### openSea

• `Optional` **openSea**: [`OpenSeaCollectionMetadata`](OpenSeaCollectionMetadata.md)

OpenSea's metadata for the contract.

#### Defined in

[src/api/nft.ts:46](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/api/nft.ts#L46)

___

### symbol

• `Optional` **symbol**: `string`

The symbol of the contract.

#### Defined in

[src/api/nft.ts:39](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/api/nft.ts#L39)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of the token in the contract.

#### Defined in

[src/api/nft.ts:35](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/api/nft.ts#L35)

___

### totalSupply

• `Optional` **totalSupply**: `string`

The number of NFTs in the contract as an integer string. This field is only
available on ERC-721 contracts.

#### Defined in

[src/api/nft.ts:44](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/api/nft.ts#L44)
