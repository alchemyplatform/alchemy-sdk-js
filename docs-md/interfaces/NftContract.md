[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftContract

# Interface: NftContract

Alchemy representation of an NFT contract.

The BaseNftContract does not hold any metadata information and only contains
the address. The NftContract additionally contains the tokenType, name,
symbol, and more.

## Hierarchy

- **`NftContract`**

  ↳ [`NftContractForOwner`](NftContractForOwner.md)

  ↳ [`NftContractForNft`](NftContractForNft.md)

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

[src/types/nft-types.ts:1143](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1143)

___

### contractDeployer

• `Optional` **contractDeployer**: `string`

The address that deployed the NFT contract.

#### Defined in

[src/types/nft-types.ts:1158](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1158)

___

### deployedBlockNumber

• `Optional` **deployedBlockNumber**: `number`

The block number the NFT contract deployed in.

#### Defined in

[src/types/nft-types.ts:1160](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1160)

___

### name

• `Optional` **name**: `string`

The name of the contract.

#### Defined in

[src/types/nft-types.ts:1147](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1147)

___

### openSeaMetadata

• **openSeaMetadata**: [`OpenSeaCollectionMetadata`](OpenSeaCollectionMetadata.md)

OpenSea's metadata for the contract.

#### Defined in

[src/types/nft-types.ts:1156](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1156)

___

### symbol

• `Optional` **symbol**: `string`

The symbol of the contract.

#### Defined in

[src/types/nft-types.ts:1149](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1149)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of the token in the contract.

#### Defined in

[src/types/nft-types.ts:1145](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1145)

___

### totalSupply

• `Optional` **totalSupply**: `string`

The number of NFTs in the contract as an integer string. This field is only
available on ERC-721 contracts.

#### Defined in

[src/types/nft-types.ts:1154](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1154)
