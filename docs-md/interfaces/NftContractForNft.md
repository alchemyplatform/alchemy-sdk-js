[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftContractForNft

# Interface: NftContractForNft

NFT contract metadata with spam information.

## Hierarchy

- [`NftContract`](NftContract.md)

  ↳ **`NftContractForNft`**

## Table of contents

### Properties

- [address](NftContractForNft.md#address)
- [contractDeployer](NftContractForNft.md#contractdeployer)
- [deployedBlockNumber](NftContractForNft.md#deployedblocknumber)
- [isSpam](NftContractForNft.md#isspam)
- [name](NftContractForNft.md#name)
- [openSeaMetadata](NftContractForNft.md#openseametadata)
- [spamClassifications](NftContractForNft.md#spamclassifications)
- [symbol](NftContractForNft.md#symbol)
- [tokenType](NftContractForNft.md#tokentype)
- [totalSupply](NftContractForNft.md#totalsupply)

## Properties

### address

• **address**: `string`

The address of the NFT contract.

#### Inherited from

[NftContract](NftContract.md).[address](NftContract.md#address)

#### Defined in

[src/types/nft-types.ts:1143](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1143)

___

### contractDeployer

• `Optional` **contractDeployer**: `string`

The address that deployed the NFT contract.

#### Inherited from

[NftContract](NftContract.md).[contractDeployer](NftContract.md#contractdeployer)

#### Defined in

[src/types/nft-types.ts:1158](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1158)

___

### deployedBlockNumber

• `Optional` **deployedBlockNumber**: `number`

The block number the NFT contract deployed in.

#### Inherited from

[NftContract](NftContract.md).[deployedBlockNumber](NftContract.md#deployedblocknumber)

#### Defined in

[src/types/nft-types.ts:1160](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1160)

___

### isSpam

• `Optional` **isSpam**: `boolean`

Whether the NFT contract is marked as spam.

#### Defined in

[src/types/nft-types.ts:1166](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1166)

___

### name

• `Optional` **name**: `string`

The name of the contract.

#### Inherited from

[NftContract](NftContract.md).[name](NftContract.md#name)

#### Defined in

[src/types/nft-types.ts:1147](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1147)

___

### openSeaMetadata

• **openSeaMetadata**: [`OpenSeaCollectionMetadata`](OpenSeaCollectionMetadata.md)

OpenSea's metadata for the contract.

#### Inherited from

[NftContract](NftContract.md).[openSeaMetadata](NftContract.md#openseametadata)

#### Defined in

[src/types/nft-types.ts:1156](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1156)

___

### spamClassifications

• **spamClassifications**: [`NftSpamClassification`](../enums/NftSpamClassification.md)[]

Potential reasons why an NFT Contract was classified as spam.

#### Defined in

[src/types/nft-types.ts:1168](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1168)

___

### symbol

• `Optional` **symbol**: `string`

The symbol of the contract.

#### Inherited from

[NftContract](NftContract.md).[symbol](NftContract.md#symbol)

#### Defined in

[src/types/nft-types.ts:1149](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1149)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of the token in the contract.

#### Inherited from

[NftContract](NftContract.md).[tokenType](NftContract.md#tokentype)

#### Defined in

[src/types/nft-types.ts:1145](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1145)

___

### totalSupply

• `Optional` **totalSupply**: `string`

The number of NFTs in the contract as an integer string. This field is only
available on ERC-721 contracts.

#### Inherited from

[NftContract](NftContract.md).[totalSupply](NftContract.md#totalsupply)

#### Defined in

[src/types/nft-types.ts:1154](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1154)
