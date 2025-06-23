[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetNftCollectionsByWalletRequest

# Interface: GetNftCollectionsByWalletRequest

The request fields of [PortfolioNamespace.getNftCollectionsByWallet](../classes/PortfolioNamespace.md#getnftcollectionsbywallet).

## Table of contents

### Properties

- [addresses](GetNftCollectionsByWalletRequest.md#addresses)
- [pageKey](GetNftCollectionsByWalletRequest.md#pagekey)
- [pageSize](GetNftCollectionsByWalletRequest.md#pagesize)
- [withMetadata](GetNftCollectionsByWalletRequest.md#withmetadata)

## Properties

### addresses

• **addresses**: [`PortfolioAddress`](PortfolioAddress.md)[]

A list of wallet addresses to query.

#### Defined in

[src/types/portfolio-types.ts:144](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/portfolio-types.ts#L144)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional. The cursor that points to the current set of results.

#### Defined in

[src/types/portfolio-types.ts:150](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/portfolio-types.ts#L150)

___

### pageSize

• `Optional` **pageSize**: `number`

Optional. Sets the number of items per page.

#### Defined in

[src/types/portfolio-types.ts:153](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/portfolio-types.ts#L153)

___

### withMetadata

• **withMetadata**: `boolean`

If set to true, returns metadata.

#### Defined in

[src/types/portfolio-types.ts:147](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/portfolio-types.ts#L147)
