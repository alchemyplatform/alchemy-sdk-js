[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetNftsByWalletRequest

# Interface: GetNftsByWalletRequest

The request fields of [PortfolioNamespace.getNftsByWallet](../classes/PortfolioNamespace.md#getnftsbywallet).

## Table of contents

### Properties

- [addresses](GetNftsByWalletRequest.md#addresses)
- [pageKey](GetNftsByWalletRequest.md#pagekey)
- [pageSize](GetNftsByWalletRequest.md#pagesize)
- [withMetadata](GetNftsByWalletRequest.md#withmetadata)

## Properties

### addresses

• **addresses**: [`PortfolioAddress`](PortfolioAddress.md)[]

A list of wallet addresses to query.

#### Defined in

[src/types/portfolio-types.ts:107](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/portfolio-types.ts#L107)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional. The cursor that points to the current set of results.

#### Defined in

[src/types/portfolio-types.ts:113](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/portfolio-types.ts#L113)

___

### pageSize

• `Optional` **pageSize**: `number`

Optional. Sets the number of items per page.

#### Defined in

[src/types/portfolio-types.ts:116](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/portfolio-types.ts#L116)

___

### withMetadata

• **withMetadata**: `boolean`

If set to true, returns metadata.

#### Defined in

[src/types/portfolio-types.ts:110](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/portfolio-types.ts#L110)
