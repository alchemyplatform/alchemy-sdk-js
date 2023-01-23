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

[src/types/types.ts:456](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L456)

___

### background\_color

• `Optional` **background\_color**: `string`

Background color of the NFT item. Usually defined as a 6 character hex string.

#### Defined in

[src/types/types.ts:453](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L453)

___

### description

• `Optional` **description**: `string`

A human-readable description of the NFT asset.

#### Defined in

[src/types/types.ts:441](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L441)

___

### external\_url

• `Optional` **external\_url**: `string`

The image URL that appears along the top of the NFT asset page. This tends
to be the highest resolution image.

#### Defined in

[src/types/types.ts:450](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L450)

___

### image

• `Optional` **image**: `string`

URL to the NFT asset image.

#### Defined in

[src/types/types.ts:444](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L444)

___

### name

• `Optional` **name**: `string`

Name of the NFT asset.

#### Defined in

[src/types/types.ts:438](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L438)
