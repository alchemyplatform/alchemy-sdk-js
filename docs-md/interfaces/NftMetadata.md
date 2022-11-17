[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftMetadata

# Interface: NftMetadata

Represents NFT metadata that holds fields. Note that since there is no
standard metadata format, the fields are not guaranteed to be present.

## Hierarchy

- `Record`<`string`, `any`\>

  ↳ **`NftMetadata`**

## Table of contents

### Properties

- [attributes](NftMetadata.md#attributes)
- [background\_color](NftMetadata.md#background_color)
- [description](NftMetadata.md#description)
- [external\_url](NftMetadata.md#external_url)
- [image](NftMetadata.md#image)
- [name](NftMetadata.md#name)

## Properties

### attributes

• `Optional` **attributes**: `Record`<`string`, `any`\>[]

The traits, attributes, and characteristics for the NFT asset.

#### Defined in

[src/types/types.ts:449](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8b1ae5c/src/types/types.ts#L449)

___

### background\_color

• `Optional` **background\_color**: `string`

Background color of the NFT item. Usually defined as a 6 character hex string.

#### Defined in

[src/types/types.ts:446](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8b1ae5c/src/types/types.ts#L446)

___

### description

• `Optional` **description**: `string`

A human-readable description of the NFT asset.

#### Defined in

[src/types/types.ts:434](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8b1ae5c/src/types/types.ts#L434)

___

### external\_url

• `Optional` **external\_url**: `string`

The image URL that appears along the top of the NFT asset page. This tends
to be the highest resolution image.

#### Defined in

[src/types/types.ts:443](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8b1ae5c/src/types/types.ts#L443)

___

### image

• `Optional` **image**: `string`

URL to the NFT asset image.

#### Defined in

[src/types/types.ts:437](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8b1ae5c/src/types/types.ts#L437)

___

### name

• `Optional` **name**: `string`

Name of the NFT asset.

#### Defined in

[src/types/types.ts:431](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8b1ae5c/src/types/types.ts#L431)
