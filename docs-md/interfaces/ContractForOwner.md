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

[src/api/nft.ts:21](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/api/nft.ts#L21)

___

### contractDeployer

• `Optional` **contractDeployer**: `string`

The address that deployed the NFT contract.

#### Inherited from

[NftContract](NftContract.md).[contractDeployer](NftContract.md#contractdeployer)

#### Defined in

[src/api/nft.ts:48](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/api/nft.ts#L48)

___

### deployedBlockNumber

• `Optional` **deployedBlockNumber**: `number`

The block number the NFT contract deployed in.

#### Inherited from

[NftContract](NftContract.md).[deployedBlockNumber](NftContract.md#deployedblocknumber)

#### Defined in

[src/api/nft.ts:50](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/api/nft.ts#L50)

___

### isSpam

• **isSpam**: `boolean`

#### Defined in

[src/types/types.ts:1048](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/types/types.ts#L1048)

___

### media

• **media**: [`Media`](Media.md)[]

Alternative NFT metadata for this contract to be parsed manually.

#### Defined in

[src/types/types.ts:1054](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/types/types.ts#L1054)

___

### name

• `Optional` **name**: `string`

The name of the contract.

#### Inherited from

[NftContract](NftContract.md).[name](NftContract.md#name)

#### Defined in

[src/api/nft.ts:37](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/api/nft.ts#L37)

___

### numDistinctTokensOwned

• **numDistinctTokensOwned**: `number`

Number of distinct token IDs held by the owner. For non-fungible tokens
this will be equal to the totalBalance, but it may be lower if the user
holds some fungible ERC1155 tokens.

#### Defined in

[src/types/types.ts:1046](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/types/types.ts#L1046)

___

### openSea

• `Optional` **openSea**: [`OpenSeaCollectionMetadata`](OpenSeaCollectionMetadata.md)

OpenSea's metadata for the contract.

#### Inherited from

[NftContract](NftContract.md).[openSea](NftContract.md#opensea)

#### Defined in

[src/api/nft.ts:46](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/api/nft.ts#L46)

___

### symbol

• `Optional` **symbol**: `string`

The symbol of the contract.

#### Inherited from

[NftContract](NftContract.md).[symbol](NftContract.md#symbol)

#### Defined in

[src/api/nft.ts:39](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/api/nft.ts#L39)

___

### title

• **title**: `string`

The title of the token held by the owner.

#### Defined in

[src/types/types.ts:1039](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/types/types.ts#L1039)

___

### tokenId

• **tokenId**: `string`

One of the tokens from this contract held by the owner.

#### Defined in

[src/types/types.ts:1051](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/types/types.ts#L1051)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of the token in the contract.

#### Inherited from

[NftContract](NftContract.md).[tokenType](NftContract.md#tokentype)

#### Defined in

[src/api/nft.ts:35](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/api/nft.ts#L35)

___

### totalBalance

• **totalBalance**: `number`

Sum of NFT balances across all token IDs held by the owner. For
non-fungible tokens this will be equal to the numDistinctTokensOwned, but
it may be higher if the user holds some fungible ERC1155 tokens.

#### Defined in

[src/types/types.ts:1036](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/types/types.ts#L1036)

___

### totalSupply

• `Optional` **totalSupply**: `string`

The number of NFTs in the contract as an integer string. This field is only
available on ERC-721 contracts.

#### Inherited from

[NftContract](NftContract.md).[totalSupply](NftContract.md#totalsupply)

#### Defined in

[src/api/nft.ts:44](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/api/nft.ts#L44)
