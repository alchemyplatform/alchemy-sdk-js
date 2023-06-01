[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftContract

# Interface: NftContract

Alchemy representation of an NFT contract.

The BaseNftContract does not hold any metadata information and only contains
the address. The NftContract additionally contains the tokenType, name,
symbol, and more.

## Hierarchy

- **`NftContract`**

  ↳ [`NftContractForOwner`](NftContractForOwner.md)

## Table of contents

### Properties

- [address](NftContract.md#address)
- [contractDeployer](NftContract.md#contractdeployer)
- [deployedBlockNumber](NftContract.md#deployedblocknumber)
- [name](NftContract.md#name)
- [openSeaMetadata](NftContract.md#openseametadata)
- [symbol](NftContract.md#symbol)
- [tokenType](NftContract.md#tokentype)
- [totalSupply](NftContract.md#totalsupply)

## Properties

### address

• **address**: `string`

The address of the NFT contract.

#### Defined in

[src/api/nft.ts:20](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L20)

___

### contractDeployer

• `Optional` **contractDeployer**: `string`

The address that deployed the NFT contract.

#### Defined in

[src/api/nft.ts:35](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L35)

___

### deployedBlockNumber

• `Optional` **deployedBlockNumber**: `number`

The block number the NFT contract deployed in.

#### Defined in

[src/api/nft.ts:37](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L37)

___

### name

• `Optional` **name**: `string`

The name of the contract.

#### Defined in

[src/api/nft.ts:24](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L24)

___

### openSeaMetadata

• **openSeaMetadata**: [`OpenSeaCollectionMetadata`](OpenSeaCollectionMetadata.md)

OpenSea's metadata for the contract.

#### Defined in

[src/api/nft.ts:33](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L33)

___

### symbol

• `Optional` **symbol**: `string`

The symbol of the contract.

#### Defined in

[src/api/nft.ts:26](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L26)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of the token in the contract.

#### Defined in

[src/api/nft.ts:22](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L22)

___

### totalSupply

• `Optional` **totalSupply**: `string`

The number of NFTs in the contract as an integer string. This field is only
available on ERC-721 contracts.

#### Defined in

[src/api/nft.ts:31](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L31)
