[alchemy-sdk](../README.md) / [Exports](../modules.md) / Media

# Interface: Media

Represents the URI information for the NFT's media assets.

## Table of contents

### Properties

- [format](Media.md#format)
- [gateway](Media.md#gateway)
- [raw](Media.md#raw)
- [thumbnail](Media.md#thumbnail)

## Properties

### format

• `Optional` **format**: `string`

The media format (ex: jpg, gif, png) of the [gateway](Media.md#gateway) and
[thumbnail](Media.md#thumbnail) assets.

#### Defined in

[src/types/types.ts:222](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6507682/src/types/types.ts#L222)

___

### gateway

• **gateway**: `string`

Public gateway URI for the raw URI. Generally offers better performance.

#### Defined in

[src/types/types.ts:213](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6507682/src/types/types.ts#L213)

___

### raw

• **raw**: `string`

URI for the location of the NFT's original metadata blob for media (ex: the
original IPFS link).

#### Defined in

[src/types/types.ts:210](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6507682/src/types/types.ts#L210)

___

### thumbnail

• `Optional` **thumbnail**: `string`

URL for a resized thumbnail of the NFT media asset.

#### Defined in

[src/types/types.ts:216](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6507682/src/types/types.ts#L216)
