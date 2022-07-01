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

[src/api/nft.ts:33](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L33)

___

### description

• **description**: `string`

The NFT description.

#### Defined in

[src/api/nft.ts:50](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L50)

___

### media

• **media**: [`TokenUri`](TokenUri.md)[]

URIs for accessing the NFT's media assets.

#### Defined in

[src/api/nft.ts:68](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L68)

___

### metadataError

• **metadataError**: `undefined` \| `string`

Holds an error message if there was an issue fetching metadata.

#### Defined in

[src/api/nft.ts:56](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L56)

___

### rawMetadata

• **rawMetadata**: `undefined` \| [`NftMetadata`](NftMetadata.md)

The raw metadata fetched from the metadata URL specified by the NFT. The
field is undefined if Alchemy was unable to fetch metadata.

#### Defined in

[src/api/nft.ts:62](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L62)

___

### timeLastUpdated

• **timeLastUpdated**: `string`

When the NFT was last updated in the blockchain. Represented in ISO-8601 format.

#### Defined in

[src/api/nft.ts:53](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L53)

___

### title

• **title**: `string`

The NFT title.

#### Defined in

[src/api/nft.ts:47](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L47)

___

### tokenId

• **tokenId**: `string`

The NFT token ID as an integer string.

#### Inherited from

[BaseNft](BaseNft.md).[tokenId](BaseNft.md#tokenid)

#### Defined in

[src/api/nft.ts:35](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L35)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of ERC token, if known.

#### Inherited from

[BaseNft](BaseNft.md).[tokenType](BaseNft.md#tokentype)

#### Defined in

[src/api/nft.ts:37](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L37)

___

### tokenUri

• **tokenUri**: `undefined` \| [`TokenUri`](TokenUri.md)

URIs for accessing the NFT's metadata blob.

#### Defined in

[src/api/nft.ts:65](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L65)
