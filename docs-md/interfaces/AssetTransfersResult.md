[alchemy-sdk](../README.md) / [Exports](../modules.md) / AssetTransfersResult

# Interface: AssetTransfersResult

Represents a transfer event that is returned in a [AssetTransfersResponse](AssetTransfersResponse.md).

## Hierarchy

- **`AssetTransfersResult`**

  ↳ [`AssetTransfersWithMetadataResult`](AssetTransfersWithMetadataResult.md)

## Table of contents

### Properties

- [asset](AssetTransfersResult.md#asset)
- [blockNum](AssetTransfersResult.md#blocknum)
- [category](AssetTransfersResult.md#category)
- [erc1155Metadata](AssetTransfersResult.md#erc1155metadata)
- [erc721TokenId](AssetTransfersResult.md#erc721tokenid)
- [from](AssetTransfersResult.md#from)
- [hash](AssetTransfersResult.md#hash)
- [rawContract](AssetTransfersResult.md#rawcontract)
- [to](AssetTransfersResult.md#to)
- [tokenId](AssetTransfersResult.md#tokenid)
- [uniqueId](AssetTransfersResult.md#uniqueid)
- [value](AssetTransfersResult.md#value)

## Properties

### asset

• **asset**: ``null`` \| `string`

Returns the token's symbol or ETH for other transfers. `null` if the
information was not available.

#### Defined in

[src/types/types.ts:474](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/types/types.ts#L474)

___

### blockNum

• **blockNum**: `string`

The block number where the transfer occurred.

#### Defined in

[src/types/types.ts:441](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/types/types.ts#L441)

___

### category

• **category**: [`AssetTransfersCategory`](../enums/AssetTransfersCategory.md)

The category of the transfer.

#### Defined in

[src/types/types.ts:438](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/types/types.ts#L438)

___

### erc1155Metadata

• **erc1155Metadata**: ``null`` \| [`ERC1155Metadata`](ERC1155Metadata.md)[]

A list of ERC1155 metadata objects if the asset transferred is an ERC1155
token. `null` if not an ERC1155 transfer.

#### Defined in

[src/types/types.ts:465](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/types/types.ts#L465)

___

### erc721TokenId

• **erc721TokenId**: ``null`` \| `string`

The raw ERC721 token id of the transfer as a hex string. `null` if not an
ERC721 transfer.

#### Defined in

[src/types/types.ts:459](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/types/types.ts#L459)

___

### from

• **from**: `string`

The from address of the transfer.

#### Defined in

[src/types/types.ts:444](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/types/types.ts#L444)

___

### hash

• **hash**: `string`

The transaction hash of the transfer transaction.

#### Defined in

[src/types/types.ts:477](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/types/types.ts#L477)

___

### rawContract

• **rawContract**: [`RawContract`](RawContract.md)

Information about the raw contract of the asset transferred.

#### Defined in

[src/types/types.ts:480](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/types/types.ts#L480)

___

### to

• **to**: ``null`` \| `string`

The to address of the transfer.

#### Defined in

[src/types/types.ts:447](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/types/types.ts#L447)

___

### tokenId

• **tokenId**: ``null`` \| `string`

The token id of the token transferred.

#### Defined in

[src/types/types.ts:468](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/types/types.ts#L468)

___

### uniqueId

• **uniqueId**: `string`

The unique ID of the transfer.

#### Defined in

[src/types/types.ts:435](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/types/types.ts#L435)

___

### value

• **value**: ``null`` \| `number`

Converted asset transfer value as a number (raw value divided by contract
decimal). `null` if ERC721 transfer or contract decimal not available.

#### Defined in

[src/types/types.ts:453](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/types/types.ts#L453)
