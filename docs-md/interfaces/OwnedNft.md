[@alch/alchemy-sdk](../README.md) / [Exports](../modules.md) / OwnedNft

# Interface: OwnedNft

Represents an NFT with metadata owned by an address.

## Hierarchy

- [`Nft`](Nft.md)

  ↳ **`OwnedNft`**

## Table of contents

### Properties

- [balance](OwnedNft.md#balance)
- [contract](OwnedNft.md#contract)
- [description](OwnedNft.md#description)
- [media](OwnedNft.md#media)
- [metadataError](OwnedNft.md#metadataerror)
- [rawMetadata](OwnedNft.md#rawmetadata)
- [timeLastUpdated](OwnedNft.md#timelastupdated)
- [title](OwnedNft.md#title)
- [tokenId](OwnedNft.md#tokenid)
- [tokenType](OwnedNft.md#tokentype)
- [tokenUri](OwnedNft.md#tokenuri)

## Properties

### balance

• `Readonly` **balance**: `number`

The token balance of the NFT.

#### Defined in

[src/types/types.ts:298](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/types/types.ts#L298)

___

### contract

• **contract**: [`BaseNftContract`](BaseNftContract.md)

#### Inherited from

[Nft](Nft.md).[contract](Nft.md#contract)

#### Defined in

[src/api/nft.ts:33](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L33)

___

### description

• **description**: `string`

The NFT description.

#### Inherited from

[Nft](Nft.md).[description](Nft.md#description)

#### Defined in

[src/api/nft.ts:50](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L50)

___

### media

• **media**: [`TokenUri`](TokenUri.md)[]

URIs for accessing the NFT's media assets.

#### Inherited from

[Nft](Nft.md).[media](Nft.md#media)

#### Defined in

[src/api/nft.ts:68](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L68)

___

### metadataError

• **metadataError**: `undefined` \| `string`

Holds an error message if there was an issue fetching metadata.

#### Inherited from

[Nft](Nft.md).[metadataError](Nft.md#metadataerror)

#### Defined in

[src/api/nft.ts:56](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L56)

___

### rawMetadata

• **rawMetadata**: `undefined` \| [`NftMetadata`](NftMetadata.md)

The raw metadata fetched from the metadata URL specified by the NFT. The
field is undefined if Alchemy was unable to fetch metadata.

#### Inherited from

[Nft](Nft.md).[rawMetadata](Nft.md#rawmetadata)

#### Defined in

[src/api/nft.ts:62](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L62)

___

### timeLastUpdated

• **timeLastUpdated**: `string`

When the NFT was last updated in the blockchain. Represented in ISO-8601 format.

#### Inherited from

[Nft](Nft.md).[timeLastUpdated](Nft.md#timelastupdated)

#### Defined in

[src/api/nft.ts:53](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L53)

___

### title

• **title**: `string`

The NFT title.

#### Inherited from

[Nft](Nft.md).[title](Nft.md#title)

#### Defined in

[src/api/nft.ts:47](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L47)

___

### tokenId

• **tokenId**: `string`

The NFT token ID as an integer string.

#### Inherited from

[Nft](Nft.md).[tokenId](Nft.md#tokenid)

#### Defined in

[src/api/nft.ts:35](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L35)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of ERC token, if known.

#### Inherited from

[Nft](Nft.md).[tokenType](Nft.md#tokentype)

#### Defined in

[src/api/nft.ts:37](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L37)

___

### tokenUri

• **tokenUri**: `undefined` \| [`TokenUri`](TokenUri.md)

URIs for accessing the NFT's metadata blob.

#### Inherited from

[Nft](Nft.md).[tokenUri](Nft.md#tokenuri)

#### Defined in

[src/api/nft.ts:65](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/api/nft.ts#L65)
