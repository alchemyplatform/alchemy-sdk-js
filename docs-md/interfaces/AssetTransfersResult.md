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

[src/types/types.ts:551](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/types.ts#L551)

___

### blockNum

• **blockNum**: `string`

The block number where the transfer occurred.

#### Defined in

[src/types/types.ts:518](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/types.ts#L518)

___

### category

• **category**: [`AssetTransfersCategory`](../enums/AssetTransfersCategory.md)

The category of the transfer.

#### Defined in

[src/types/types.ts:515](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/types.ts#L515)

___

### erc1155Metadata

• **erc1155Metadata**: ``null`` \| [`ERC1155Metadata`](ERC1155Metadata.md)[]

A list of ERC1155 metadata objects if the asset transferred is an ERC1155
token. `null` if not an ERC1155 transfer.

#### Defined in

[src/types/types.ts:542](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/types.ts#L542)

___

### erc721TokenId

• **erc721TokenId**: ``null`` \| `string`

The raw ERC721 token id of the transfer as a hex string. `null` if not an
ERC721 transfer.

#### Defined in

[src/types/types.ts:536](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/types.ts#L536)

___

### from

• **from**: `string`

The from address of the transfer.

#### Defined in

[src/types/types.ts:521](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/types.ts#L521)

___

### hash

• **hash**: `string`

The transaction hash of the transfer transaction.

#### Defined in

[src/types/types.ts:554](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/types.ts#L554)

___

### rawContract

• **rawContract**: [`RawContract`](RawContract.md)

Information about the raw contract of the asset transferred.

#### Defined in

[src/types/types.ts:557](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/types.ts#L557)

___

### to

• **to**: ``null`` \| `string`

The to address of the transfer.

#### Defined in

[src/types/types.ts:524](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/types.ts#L524)

___

### tokenId

• **tokenId**: ``null`` \| `string`

The token id of the token transferred.

#### Defined in

[src/types/types.ts:545](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/types.ts#L545)

___

### uniqueId

• **uniqueId**: `string`

The unique ID of the transfer.

#### Defined in

[src/types/types.ts:512](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/types.ts#L512)

___

### value

• **value**: ``null`` \| `number`

Converted asset transfer value as a number (raw value divided by contract
decimal). `null` if ERC721 transfer or contract decimal not available.

#### Defined in

[src/types/types.ts:530](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/types.ts#L530)
