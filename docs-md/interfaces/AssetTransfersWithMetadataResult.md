[alchemy-sdk](../README.md) / [Exports](../modules.md) / AssetTransfersWithMetadataResult

# Interface: AssetTransfersWithMetadataResult

Represents a transfer event that is returned in a
[AssetTransfersResponse](AssetTransfersResponse.md) when [AssetTransfersWithMetadataParams](AssetTransfersWithMetadataParams.md) are used.

## Hierarchy

- [`AssetTransfersResult`](AssetTransfersResult.md)

  ↳ **`AssetTransfersWithMetadataResult`**

## Table of contents

### Properties

- [asset](AssetTransfersWithMetadataResult.md#asset)
- [blockNum](AssetTransfersWithMetadataResult.md#blocknum)
- [category](AssetTransfersWithMetadataResult.md#category)
- [erc1155Metadata](AssetTransfersWithMetadataResult.md#erc1155metadata)
- [erc721TokenId](AssetTransfersWithMetadataResult.md#erc721tokenid)
- [from](AssetTransfersWithMetadataResult.md#from)
- [hash](AssetTransfersWithMetadataResult.md#hash)
- [metadata](AssetTransfersWithMetadataResult.md#metadata)
- [rawContract](AssetTransfersWithMetadataResult.md#rawcontract)
- [to](AssetTransfersWithMetadataResult.md#to)
- [tokenId](AssetTransfersWithMetadataResult.md#tokenid)
- [uniqueId](AssetTransfersWithMetadataResult.md#uniqueid)
- [value](AssetTransfersWithMetadataResult.md#value)

## Properties

### asset

• **asset**: ``null`` \| `string`

Returns the token's symbol or ETH for other transfers. `null` if the
information was not available.

#### Inherited from

[AssetTransfersResult](AssetTransfersResult.md).[asset](AssetTransfersResult.md#asset)

#### Defined in

[src/types/types.ts:451](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L451)

___

### blockNum

• **blockNum**: `string`

The block number where the transfer occurred.

#### Inherited from

[AssetTransfersResult](AssetTransfersResult.md).[blockNum](AssetTransfersResult.md#blocknum)

#### Defined in

[src/types/types.ts:418](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L418)

___

### category

• **category**: [`AssetTransfersCategory`](../enums/AssetTransfersCategory.md)

The category of the transfer.

#### Inherited from

[AssetTransfersResult](AssetTransfersResult.md).[category](AssetTransfersResult.md#category)

#### Defined in

[src/types/types.ts:415](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L415)

___

### erc1155Metadata

• **erc1155Metadata**: ``null`` \| [`ERC1155Metadata`](ERC1155Metadata.md)[]

A list of ERC1155 metadata objects if the asset transferred is an ERC1155
token. `null` if not an ERC1155 transfer.

#### Inherited from

[AssetTransfersResult](AssetTransfersResult.md).[erc1155Metadata](AssetTransfersResult.md#erc1155metadata)

#### Defined in

[src/types/types.ts:442](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L442)

___

### erc721TokenId

• **erc721TokenId**: ``null`` \| `string`

The raw ERC721 token id of the transfer as a hex string. `null` if not an
ERC721 transfer.

#### Inherited from

[AssetTransfersResult](AssetTransfersResult.md).[erc721TokenId](AssetTransfersResult.md#erc721tokenid)

#### Defined in

[src/types/types.ts:436](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L436)

___

### from

• **from**: `string`

The from address of the transfer.

#### Inherited from

[AssetTransfersResult](AssetTransfersResult.md).[from](AssetTransfersResult.md#from)

#### Defined in

[src/types/types.ts:421](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L421)

___

### hash

• **hash**: `string`

The transaction hash of the transfer transaction.

#### Inherited from

[AssetTransfersResult](AssetTransfersResult.md).[hash](AssetTransfersResult.md#hash)

#### Defined in

[src/types/types.ts:454](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L454)

___

### metadata

• **metadata**: [`AssetTransfersMetadata`](AssetTransfersMetadata.md)

Additional metadata about the transfer event.

#### Defined in

[src/types/types.ts:468](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L468)

___

### rawContract

• **rawContract**: [`RawContract`](RawContract.md)

Information about the raw contract of the asset transferred.

#### Inherited from

[AssetTransfersResult](AssetTransfersResult.md).[rawContract](AssetTransfersResult.md#rawcontract)

#### Defined in

[src/types/types.ts:457](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L457)

___

### to

• **to**: ``null`` \| `string`

The to address of the transfer.

#### Inherited from

[AssetTransfersResult](AssetTransfersResult.md).[to](AssetTransfersResult.md#to)

#### Defined in

[src/types/types.ts:424](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L424)

___

### tokenId

• **tokenId**: ``null`` \| `string`

The token id of the token transferred.

#### Inherited from

[AssetTransfersResult](AssetTransfersResult.md).[tokenId](AssetTransfersResult.md#tokenid)

#### Defined in

[src/types/types.ts:445](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L445)

___

### uniqueId

• **uniqueId**: `string`

The unique ID of the transfer.

#### Inherited from

[AssetTransfersResult](AssetTransfersResult.md).[uniqueId](AssetTransfersResult.md#uniqueid)

#### Defined in

[src/types/types.ts:412](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L412)

___

### value

• **value**: ``null`` \| `number`

Converted asset transfer value as a number (raw value divided by contract
decimal). `null` if ERC721 transfer or contract decimal not available.

#### Inherited from

[AssetTransfersResult](AssetTransfersResult.md).[value](AssetTransfersResult.md#value)

#### Defined in

[src/types/types.ts:430](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L430)
