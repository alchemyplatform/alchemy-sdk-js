[alchemy-sdk](../README.md) / [Exports](../modules.md) / ContractForOwner

# Interface: ContractForOwner

Represents a single NFT contract data in the [GetContractsForOwnerResponse](GetContractsForOwnerResponse.md).

## Hierarchy

- [`NftContract`](NftContract.md)

  ↳ **`ContractForOwner`**

## Table of contents

### Properties

- [address](ContractForOwner.md#address)
- [contractDeployer](ContractForOwner.md#contractdeployer)
- [deployedBlockNumber](ContractForOwner.md#deployedblocknumber)
- [isSpam](ContractForOwner.md#isspam)
- [media](ContractForOwner.md#media)
- [name](ContractForOwner.md#name)
- [numDistinctTokensOwned](ContractForOwner.md#numdistincttokensowned)
- [openSea](ContractForOwner.md#opensea)
- [symbol](ContractForOwner.md#symbol)
- [title](ContractForOwner.md#title)
- [tokenId](ContractForOwner.md#tokenid)
- [tokenType](ContractForOwner.md#tokentype)
- [totalBalance](ContractForOwner.md#totalbalance)
- [totalSupply](ContractForOwner.md#totalsupply)

## Properties

### address

• **address**: `string`

The address of the contract.

#### Inherited from

[NftContract](NftContract.md).[address](NftContract.md#address)

#### Defined in

[src/api/nft.ts:22](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/api/nft.ts#L22)

___

### contractDeployer

• `Optional` **contractDeployer**: `string`

The address that deployed the NFT contract.

#### Inherited from

[NftContract](NftContract.md).[contractDeployer](NftContract.md#contractdeployer)

#### Defined in

[src/api/nft.ts:49](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/api/nft.ts#L49)

___

### deployedBlockNumber

• `Optional` **deployedBlockNumber**: `number`

The block number the NFT contract deployed in.

#### Inherited from

[NftContract](NftContract.md).[deployedBlockNumber](NftContract.md#deployedblocknumber)

#### Defined in

[src/api/nft.ts:51](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/api/nft.ts#L51)

___

### isSpam

• **isSpam**: `boolean`

#### Defined in

[src/types/types.ts:1069](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L1069)

___

### media

• **media**: [`Media`](Media.md)[]

Alternative NFT metadata for this contract to be parsed manually.

#### Defined in

[src/types/types.ts:1075](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L1075)

___

### name

• `Optional` **name**: `string`

The name of the contract.

#### Inherited from

[NftContract](NftContract.md).[name](NftContract.md#name)

#### Defined in

[src/api/nft.ts:38](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/api/nft.ts#L38)

___

### numDistinctTokensOwned

• **numDistinctTokensOwned**: `number`

Number of distinct token IDs held by the owner. For non-fungible tokens
this will be equal to the totalBalance, but it may be lower if the user
holds some fungible ERC1155 tokens.

#### Defined in

[src/types/types.ts:1067](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L1067)

___

### openSea

• `Optional` **openSea**: [`OpenSeaCollectionMetadata`](OpenSeaCollectionMetadata.md)

OpenSea's metadata for the contract.

#### Inherited from

[NftContract](NftContract.md).[openSea](NftContract.md#opensea)

#### Defined in

[src/api/nft.ts:47](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/api/nft.ts#L47)

___

### symbol

• `Optional` **symbol**: `string`

The symbol of the contract.

#### Inherited from

[NftContract](NftContract.md).[symbol](NftContract.md#symbol)

#### Defined in

[src/api/nft.ts:40](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/api/nft.ts#L40)

___

### title

• **title**: `string`

The title of the token held by the owner.

#### Defined in

[src/types/types.ts:1060](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L1060)

___

### tokenId

• **tokenId**: `string`

One of the tokens from this contract held by the owner.

#### Defined in

[src/types/types.ts:1072](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L1072)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of the token in the contract.

#### Inherited from

[NftContract](NftContract.md).[tokenType](NftContract.md#tokentype)

#### Defined in

[src/api/nft.ts:36](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/api/nft.ts#L36)

___

### totalBalance

• **totalBalance**: `number`

Sum of NFT balances across all token IDs held by the owner. For
non-fungible tokens this will be equal to the numDistinctTokensOwned, but
it may be higher if the user holds some fungible ERC1155 tokens.

#### Defined in

[src/types/types.ts:1057](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L1057)

___

### totalSupply

• `Optional` **totalSupply**: `string`

The number of NFTs in the contract as an integer string. This field is only
available on ERC-721 contracts.

#### Inherited from

[NftContract](NftContract.md).[totalSupply](NftContract.md#totalsupply)

#### Defined in

[src/api/nft.ts:45](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/api/nft.ts#L45)
