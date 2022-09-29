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
- [value](AssetTransfersResult.md#value)

## Properties

### asset

• **asset**: ``null`` \| `string`

Returns the token's symbol or ETH for other transfers. `null` if the
information was not available.

#### Defined in

[src/types/types.ts:360](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L360)

___

### blockNum

• **blockNum**: `string`

The block number where the transfer occurred.

#### Defined in

[src/types/types.ts:327](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L327)

___

### category

• **category**: [`AssetTransfersCategory`](../enums/AssetTransfersCategory.md)

The category of the transfer.

#### Defined in

[src/types/types.ts:324](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L324)

___

### erc1155Metadata

• **erc1155Metadata**: ``null`` \| [`ERC1155Metadata`](ERC1155Metadata.md)[]

A list of ERC1155 metadata objects if the asset transferred is an ERC1155
token. `null` if not an ERC1155 transfer.

#### Defined in

[src/types/types.ts:351](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L351)

___

### erc721TokenId

• **erc721TokenId**: ``null`` \| `string`

The raw ERC721 token id of the transfer as a hex string. `null` if not an
ERC721 transfer.

#### Defined in

[src/types/types.ts:345](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L345)

___

### from

• **from**: `string`

The from address of the transfer.

#### Defined in

[src/types/types.ts:330](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L330)

___

### hash

• **hash**: `string`

The transaction hash of the transfer transaction.

#### Defined in

[src/types/types.ts:363](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L363)

___

### rawContract

• **rawContract**: [`RawContract`](RawContract.md)

Information about the raw contract of the asset transferred.

#### Defined in

[src/types/types.ts:366](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L366)

___

### to

• **to**: ``null`` \| `string`

The to address of the transfer.

#### Defined in

[src/types/types.ts:333](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L333)

___

### tokenId

• **tokenId**: ``null`` \| `string`

The token id of the token transferred.

#### Defined in

[src/types/types.ts:354](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L354)

___

### value

• **value**: ``null`` \| `number`

Converted asset transfer value as a number (raw value divided by contract
decimal). `null` if ERC721 transfer or contract decimal not available.

#### Defined in

[src/types/types.ts:339](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L339)
