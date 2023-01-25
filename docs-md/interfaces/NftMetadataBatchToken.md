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

[src/types/types.ts:827](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/types/types.ts#L827)

___

### tokenId

• **tokenId**: `BigNumberish`

The id of the NFT.

#### Defined in

[src/types/types.ts:830](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/types/types.ts#L830)

___

### tokenType

• `Optional` **tokenType**: [`ERC721`](../enums/NftTokenType.md#erc721) \| [`ERC1155`](../enums/NftTokenType.md#erc1155)

Optional field to specify the type of token to speed up the query.

#### Defined in

[src/types/types.ts:833](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/types/types.ts#L833)
