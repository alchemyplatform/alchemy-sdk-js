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

[src/types/types.ts:564](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L564)

___

### blockNum

• **blockNum**: `string`

The block number where the transfer occurred.

#### Defined in

[src/types/types.ts:531](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L531)

___

### category

• **category**: [`AssetTransfersCategory`](../enums/AssetTransfersCategory.md)

The category of the transfer.

#### Defined in

[src/types/types.ts:528](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L528)

___

### erc1155Metadata

• **erc1155Metadata**: ``null`` \| [`ERC1155Metadata`](ERC1155Metadata.md)[]

A list of ERC1155 metadata objects if the asset transferred is an ERC1155
token. `null` if not an ERC1155 transfer.

#### Defined in

[src/types/types.ts:555](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L555)

___

### erc721TokenId

• **erc721TokenId**: ``null`` \| `string`

The raw ERC721 token id of the transfer as a hex string. `null` if not an
ERC721 transfer.

#### Defined in

[src/types/types.ts:549](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L549)

___

### from

• **from**: `string`

The from address of the transfer.

#### Defined in

[src/types/types.ts:534](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L534)

___

### hash

• **hash**: `string`

The transaction hash of the transfer transaction.

#### Defined in

[src/types/types.ts:567](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L567)

___

### rawContract

• **rawContract**: [`RawContract`](RawContract.md)

Information about the raw contract of the asset transferred.

#### Defined in

[src/types/types.ts:570](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L570)

___

### to

• **to**: ``null`` \| `string`

The to address of the transfer.

#### Defined in

[src/types/types.ts:537](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L537)

___

### tokenId

• **tokenId**: ``null`` \| `string`

The token id of the token transferred.

#### Defined in

[src/types/types.ts:558](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L558)

___

### uniqueId

• **uniqueId**: `string`

The unique ID of the transfer.

#### Defined in

[src/types/types.ts:525](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L525)

___

### value

• **value**: ``null`` \| `number`

Converted asset transfer value as a number (raw value divided by contract
decimal). `null` if ERC721 transfer or contract decimal not available.

#### Defined in

[src/types/types.ts:543](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L543)
