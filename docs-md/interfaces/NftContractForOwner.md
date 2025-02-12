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

[src/types/nft-types.ts:1159](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L1159)

___

### contractDeployer

• `Optional` **contractDeployer**: `string`

The address that deployed the NFT contract.

#### Inherited from

[NftContract](NftContract.md).[contractDeployer](NftContract.md#contractdeployer)

#### Defined in

[src/types/nft-types.ts:1174](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L1174)

___

### deployedBlockNumber

• `Optional` **deployedBlockNumber**: `number`

The block number the NFT contract deployed in.

#### Inherited from

[NftContract](NftContract.md).[deployedBlockNumber](NftContract.md#deployedblocknumber)

#### Defined in

[src/types/nft-types.ts:1176](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L1176)

___

### displayNft

• **displayNft**: [`DisplayNftForContract`](DisplayNftForContract.md)

Object containing an NFT owned by the owner for this particular contract.
Use this to display a sample NFT for the contract.

#### Defined in

[src/types/nft-types.ts:565](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L565)

___

### image

• **image**: [`NftImage`](NftImage.md)

Object containing different URLs for the NFT media.

#### Defined in

[src/types/nft-types.ts:568](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L568)

___

### isSpam

• **isSpam**: `boolean`

Whether the NFT contract is considered spam.

#### Defined in

[src/types/nft-types.ts:559](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L559)

___

### name

• `Optional` **name**: `string`

The name of the contract.

#### Inherited from

[NftContract](NftContract.md).[name](NftContract.md#name)

#### Defined in

[src/types/nft-types.ts:1163](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L1163)

___

### numDistinctTokensOwned

• **numDistinctTokensOwned**: `string`

Number of distinct token IDs held by the owner. For non-fungible tokens
this will be equal to the totalBalance, but it may be lower if the user
holds some fungible ERC1155 tokens.

#### Defined in

[src/types/nft-types.ts:556](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L556)

___

### openSeaMetadata

• **openSeaMetadata**: [`OpenSeaCollectionMetadata`](OpenSeaCollectionMetadata.md)

OpenSea's metadata for the contract.

#### Inherited from

[NftContract](NftContract.md).[openSeaMetadata](NftContract.md#openseametadata)

#### Defined in

[src/types/nft-types.ts:1172](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L1172)

___

### symbol

• `Optional` **symbol**: `string`

The symbol of the contract.

#### Inherited from

[NftContract](NftContract.md).[symbol](NftContract.md#symbol)

#### Defined in

[src/types/nft-types.ts:1165](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L1165)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of the token in the contract.

#### Inherited from

[NftContract](NftContract.md).[tokenType](NftContract.md#tokentype)

#### Defined in

[src/types/nft-types.ts:1161](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L1161)

___

### totalBalance

• **totalBalance**: `string`

Sum of NFT balances across all token IDs held by the owner. For
non-fungible tokens this will be equal to the numDistinctTokensOwned, but
it may be higher if the user holds some fungible ERC1155 tokens.

#### Defined in

[src/types/nft-types.ts:549](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L549)

___

### totalSupply

• `Optional` **totalSupply**: `string`

The number of NFTs in the contract as an integer string. This field is only
available on ERC-721 contracts.

#### Inherited from

[NftContract](NftContract.md).[totalSupply](NftContract.md#totalsupply)

#### Defined in

[src/types/nft-types.ts:1170](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L1170)
