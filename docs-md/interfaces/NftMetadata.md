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

[src/types/types.ts:531](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/types/types.ts#L531)

___

### background\_color

• `Optional` **background\_color**: `string`

Background color of the NFT item. Usually defined as a 6 character hex string.

#### Defined in

[src/types/types.ts:528](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/types/types.ts#L528)

___

### description

• `Optional` **description**: `string`

A human-readable description of the NFT asset.

#### Defined in

[src/types/types.ts:516](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/types/types.ts#L516)

___

### external\_url

• `Optional` **external\_url**: `string`

The image URL that appears along the top of the NFT asset page. This tends
to be the highest resolution image.

#### Defined in

[src/types/types.ts:525](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/types/types.ts#L525)

___

### image

• `Optional` **image**: `string`

URL to the NFT asset image.

#### Defined in

[src/types/types.ts:519](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/types/types.ts#L519)

___

### name

• `Optional` **name**: `string`

Name of the NFT asset.

#### Defined in

[src/types/types.ts:513](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/types/types.ts#L513)
