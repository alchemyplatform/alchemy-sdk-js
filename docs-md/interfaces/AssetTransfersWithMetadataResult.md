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

[src/types/types.ts:538](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L538)

___

### blockNum

• **blockNum**: `string`

The block number where the transfer occurred.

#### Inherited from

[AssetTransfersResult](AssetTransfersResult.md).[blockNum](AssetTransfersResult.md#blocknum)

#### Defined in

[src/types/types.ts:505](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L505)

___

### category

• **category**: [`AssetTransfersCategory`](../enums/AssetTransfersCategory.md)

The category of the transfer.

#### Inherited from

[AssetTransfersResult](AssetTransfersResult.md).[category](AssetTransfersResult.md#category)

#### Defined in

[src/types/types.ts:502](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L502)

___

### erc1155Metadata

• **erc1155Metadata**: ``null`` \| [`ERC1155Metadata`](ERC1155Metadata.md)[]

A list of ERC1155 metadata objects if the asset transferred is an ERC1155
token. `null` if not an ERC1155 transfer.

#### Inherited from

[AssetTransfersResult](AssetTransfersResult.md).[erc1155Metadata](AssetTransfersResult.md#erc1155metadata)

#### Defined in

[src/types/types.ts:529](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L529)

___

### erc721TokenId

• **erc721TokenId**: ``null`` \| `string`

The raw ERC721 token id of the transfer as a hex string. `null` if not an
ERC721 transfer.

#### Inherited from

[AssetTransfersResult](AssetTransfersResult.md).[erc721TokenId](AssetTransfersResult.md#erc721tokenid)

#### Defined in

[src/types/types.ts:523](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L523)

___

### from

• **from**: `string`

The from address of the transfer.

#### Inherited from

[AssetTransfersResult](AssetTransfersResult.md).[from](AssetTransfersResult.md#from)

#### Defined in

[src/types/types.ts:508](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L508)

___

### hash

• **hash**: `string`

The transaction hash of the transfer transaction.

#### Inherited from

[AssetTransfersResult](AssetTransfersResult.md).[hash](AssetTransfersResult.md#hash)

#### Defined in

[src/types/types.ts:541](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L541)

___

### metadata

• **metadata**: [`AssetTransfersMetadata`](AssetTransfersMetadata.md)

Additional metadata about the transfer event.

#### Defined in

[src/types/types.ts:555](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L555)

___

### rawContract

• **rawContract**: [`RawContract`](RawContract.md)

Information about the raw contract of the asset transferred.

#### Inherited from

[AssetTransfersResult](AssetTransfersResult.md).[rawContract](AssetTransfersResult.md#rawcontract)

#### Defined in

[src/types/types.ts:544](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L544)

___

### to

• **to**: ``null`` \| `string`

The to address of the transfer.

#### Inherited from

[AssetTransfersResult](AssetTransfersResult.md).[to](AssetTransfersResult.md#to)

#### Defined in

[src/types/types.ts:511](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L511)

___

### tokenId

• **tokenId**: ``null`` \| `string`

The token id of the token transferred.

#### Inherited from

[AssetTransfersResult](AssetTransfersResult.md).[tokenId](AssetTransfersResult.md#tokenid)

#### Defined in

[src/types/types.ts:532](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L532)

___

### uniqueId

• **uniqueId**: `string`

The unique ID of the transfer.

#### Inherited from

[AssetTransfersResult](AssetTransfersResult.md).[uniqueId](AssetTransfersResult.md#uniqueid)

#### Defined in

[src/types/types.ts:499](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L499)

___

### value

• **value**: ``null`` \| `number`

Converted asset transfer value as a number (raw value divided by contract
decimal). `null` if ERC721 transfer or contract decimal not available.

#### Inherited from

[AssetTransfersResult](AssetTransfersResult.md).[value](AssetTransfersResult.md#value)

#### Defined in

[src/types/types.ts:517](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L517)
