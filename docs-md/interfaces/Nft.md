[@alch/alchemy-sdk](../README.md) / [Exports](../modules.md) / Nft

# Interface: Nft

Alchemy representation of an NFT.

## Hierarchy

- [`BaseNft`](BaseNft.md)

  ↳ **`Nft`**

  ↳↳ [`OwnedNft`](OwnedNft.md)

## Table of contents

### Properties

- [contract](Nft.md#contract)
- [description](Nft.md#description)
- [media](Nft.md#media)
- [metadataError](Nft.md#metadataerror)
- [rawMetadata](Nft.md#rawmetadata)
- [timeLastUpdated](Nft.md#timelastupdated)
- [title](Nft.md#title)
- [tokenId](Nft.md#tokenid)
- [tokenType](Nft.md#tokentype)
- [tokenUri](Nft.md#tokenuri)

## Properties

### contract

• **contract**: [`BaseNftContract`](BaseNftContract.md)

#### Inherited from

[BaseNft](BaseNft.md).[contract](BaseNft.md#contract)

#### Defined in

[api/nft.ts:34](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/nft.ts#L34)

___

### description

• **description**: `string`

The NFT description.

#### Defined in

[api/nft.ts:51](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/nft.ts#L51)

___

### media

• **media**: [`Media`](Media.md)[]

URIs for accessing the NFT's media assets.

#### Defined in

[api/nft.ts:69](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/nft.ts#L69)

___

### metadataError

• **metadataError**: `undefined` \| `string`

Holds an error message if there was an issue fetching metadata.

#### Defined in

[api/nft.ts:57](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/nft.ts#L57)

___

### rawMetadata

• **rawMetadata**: `undefined` \| [`NftMetadata`](NftMetadata.md)

The raw metadata fetched from the metadata URL specified by the NFT. The
field is undefined if Alchemy was unable to fetch metadata.

#### Defined in

[api/nft.ts:63](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/nft.ts#L63)

___

### timeLastUpdated

• **timeLastUpdated**: `string`

When the NFT was last updated in the blockchain. Represented in ISO-8601 format.

#### Defined in

[api/nft.ts:54](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/nft.ts#L54)

___

### title

• **title**: `string`

The NFT title.

#### Defined in

[api/nft.ts:48](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/nft.ts#L48)

___

### tokenId

• **tokenId**: `string`

The NFT token ID as an integer string.

#### Inherited from

[BaseNft](BaseNft.md).[tokenId](BaseNft.md#tokenid)

#### Defined in

[api/nft.ts:36](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/nft.ts#L36)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of ERC token, if known.

#### Inherited from

[BaseNft](BaseNft.md).[tokenType](BaseNft.md#tokentype)

#### Defined in

[api/nft.ts:38](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/nft.ts#L38)

___

### tokenUri

• **tokenUri**: `undefined` \| [`TokenUri`](TokenUri.md)

URIs for accessing the NFT's metadata blob.

#### Defined in

[api/nft.ts:66](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/nft.ts#L66)
