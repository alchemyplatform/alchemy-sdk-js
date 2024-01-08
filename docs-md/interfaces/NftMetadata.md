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

[src/types/nft-types.ts:45](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6dc36f9/src/types/nft-types.ts#L45)

___

### background\_color

• `Optional` **background\_color**: `string`

Background color of the NFT item. Usually defined as a 6 character hex string.

#### Defined in

[src/types/nft-types.ts:42](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6dc36f9/src/types/nft-types.ts#L42)

___

### description

• `Optional` **description**: `string`

A human-readable description of the NFT asset.

#### Defined in

[src/types/nft-types.ts:30](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6dc36f9/src/types/nft-types.ts#L30)

___

### external\_url

• `Optional` **external\_url**: `string`

The image URL that appears along the top of the NFT asset page. This tends
to be the highest resolution image.

#### Defined in

[src/types/nft-types.ts:39](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6dc36f9/src/types/nft-types.ts#L39)

___

### image

• `Optional` **image**: `string`

URL to the NFT asset image.

#### Defined in

[src/types/nft-types.ts:33](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6dc36f9/src/types/nft-types.ts#L33)

___

### name

• `Optional` **name**: `string`

Name of the NFT asset.

#### Defined in

[src/types/nft-types.ts:27](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6dc36f9/src/types/nft-types.ts#L27)
