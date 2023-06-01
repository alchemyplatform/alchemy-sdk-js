[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftContractForOwner

# Interface: NftContractForOwner

Represents a single NFT contract data in the [GetContractsForOwnerResponse](GetContractsForOwnerResponse.md).

## Hierarchy

- [`NftContract`](NftContract.md)

  ↳ **`NftContractForOwner`**

## Table of contents

### Properties

- [address](NftContractForOwner.md#address)
- [contractDeployer](NftContractForOwner.md#contractdeployer)
- [deployedBlockNumber](NftContractForOwner.md#deployedblocknumber)
- [displayNft](NftContractForOwner.md#displaynft)
- [image](NftContractForOwner.md#image)
- [isSpam](NftContractForOwner.md#isspam)
- [name](NftContractForOwner.md#name)
- [numDistinctTokensOwned](NftContractForOwner.md#numdistincttokensowned)
- [openSeaMetadata](NftContractForOwner.md#openseametadata)
- [symbol](NftContractForOwner.md#symbol)
- [tokenType](NftContractForOwner.md#tokentype)
- [totalBalance](NftContractForOwner.md#totalbalance)
- [totalSupply](NftContractForOwner.md#totalsupply)

## Properties

### address

• **address**: `string`

The address of the NFT contract.

#### Inherited from

[NftContract](NftContract.md).[address](NftContract.md#address)

#### Defined in

[src/api/nft.ts:20](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L20)

___

### contractDeployer

• `Optional` **contractDeployer**: `string`

The address that deployed the NFT contract.

#### Inherited from

[NftContract](NftContract.md).[contractDeployer](NftContract.md#contractdeployer)

#### Defined in

[src/api/nft.ts:35](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L35)

___

### deployedBlockNumber

• `Optional` **deployedBlockNumber**: `number`

The block number the NFT contract deployed in.

#### Inherited from

[NftContract](NftContract.md).[deployedBlockNumber](NftContract.md#deployedblocknumber)

#### Defined in

[src/api/nft.ts:37](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L37)

___

### displayNft

• **displayNft**: [`DisplayNftForContract`](DisplayNftForContract.md)

Object containing an NFT owned by the owner for this particular contract.
Use this to display a sample NFT for the contract.

#### Defined in

[src/types/types.ts:1018](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L1018)

___

### image

• **image**: [`NftImage`](NftImage.md)

Object containing different URLs for the NFT media.

#### Defined in

[src/types/types.ts:1021](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L1021)

___

### isSpam

• **isSpam**: `boolean`

Whether the NFT contract is considered spam.

#### Defined in

[src/types/types.ts:1012](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L1012)

___

### name

• `Optional` **name**: `string`

The name of the contract.

#### Inherited from

[NftContract](NftContract.md).[name](NftContract.md#name)

#### Defined in

[src/api/nft.ts:24](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L24)

___

### numDistinctTokensOwned

• **numDistinctTokensOwned**: `string`

Number of distinct token IDs held by the owner. For non-fungible tokens
this will be equal to the totalBalance, but it may be lower if the user
holds some fungible ERC1155 tokens.

#### Defined in

[src/types/types.ts:1009](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L1009)

___

### openSeaMetadata

• **openSeaMetadata**: [`OpenSeaCollectionMetadata`](OpenSeaCollectionMetadata.md)

OpenSea's metadata for the contract.

#### Inherited from

[NftContract](NftContract.md).[openSeaMetadata](NftContract.md#openseametadata)

#### Defined in

[src/api/nft.ts:33](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L33)

___

### symbol

• `Optional` **symbol**: `string`

The symbol of the contract.

#### Inherited from

[NftContract](NftContract.md).[symbol](NftContract.md#symbol)

#### Defined in

[src/api/nft.ts:26](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L26)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of the token in the contract.

#### Inherited from

[NftContract](NftContract.md).[tokenType](NftContract.md#tokentype)

#### Defined in

[src/api/nft.ts:22](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L22)

___

### totalBalance

• **totalBalance**: `string`

Sum of NFT balances across all token IDs held by the owner. For
non-fungible tokens this will be equal to the numDistinctTokensOwned, but
it may be higher if the user holds some fungible ERC1155 tokens.

#### Defined in

[src/types/types.ts:1002](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L1002)

___

### totalSupply

• `Optional` **totalSupply**: `string`

The number of NFTs in the contract as an integer string. This field is only
available on ERC-721 contracts.

#### Inherited from

[NftContract](NftContract.md).[totalSupply](NftContract.md#totalsupply)

#### Defined in

[src/api/nft.ts:31](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L31)
