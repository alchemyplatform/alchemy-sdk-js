[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftMetadataBatchToken

# Interface: NftMetadataBatchToken

Represents an NFT token to fetch metadata for in a
[NftNamespace.getNftMetadataBatch](../classes/NftNamespace.md#getnftmetadatabatch) method.

## Table of contents

### Properties

- [contractAddress](NftMetadataBatchToken.md#contractaddress)
- [tokenId](NftMetadataBatchToken.md#tokenid)
- [tokenType](NftMetadataBatchToken.md#tokentype)

## Properties

### contractAddress

• **contractAddress**: `string`

The NFT contract address. Limited to ERC721 and ERC1155 tokens.

#### Defined in

[src/types/nft-types.ts:422](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/nft-types.ts#L422)

___

### tokenId

• **tokenId**: [`BigNumberish`](../modules.md#bignumberish)

The id of the NFT.

#### Defined in

[src/types/nft-types.ts:425](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/nft-types.ts#L425)

___

### tokenType

• `Optional` **tokenType**: [`ERC721`](../enums/NftTokenType.md#erc721) \| [`ERC1155`](../enums/NftTokenType.md#erc1155)

Optional field to specify the type of token to speed up the query.

#### Defined in

[src/types/nft-types.ts:428](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/nft-types.ts#L428)
