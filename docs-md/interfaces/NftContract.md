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

[src/api/nft.ts:22](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/api/nft.ts#L22)

___

### contractDeployer

• `Optional` **contractDeployer**: `string`

The address that deployed the NFT contract.

#### Defined in

[src/api/nft.ts:49](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/api/nft.ts#L49)

___

### deployedBlockNumber

• `Optional` **deployedBlockNumber**: `number`

The block number the NFT contract deployed in.

#### Defined in

[src/api/nft.ts:51](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/api/nft.ts#L51)

___

### name

• `Optional` **name**: `string`

The name of the contract.

#### Defined in

[src/api/nft.ts:38](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/api/nft.ts#L38)

___

### openSea

• `Optional` **openSea**: [`OpenSeaCollectionMetadata`](OpenSeaCollectionMetadata.md)

OpenSea's metadata for the contract.

#### Defined in

[src/api/nft.ts:47](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/api/nft.ts#L47)

___

### symbol

• `Optional` **symbol**: `string`

The symbol of the contract.

#### Defined in

[src/api/nft.ts:40](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/api/nft.ts#L40)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of the token in the contract.

#### Defined in

[src/api/nft.ts:36](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/api/nft.ts#L36)

___

### totalSupply

• `Optional` **totalSupply**: `string`

The number of NFTs in the contract as an integer string. This field is only
available on ERC-721 contracts.

#### Defined in

[src/api/nft.ts:45](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/api/nft.ts#L45)
