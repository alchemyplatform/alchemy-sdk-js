[alchemy-sdk](../README.md) / [Exports](../modules.md) / Nft

# Interface: Nft

Alchemy representation of an NFT.

The BaseNft object does not hold any metadata information and only contains
the NFT contract and token ID. The Nft object additionally contains the NFT
metadata, token URI information, and media.

## Hierarchy

- [`BaseNft`](BaseNft.md)

  ↳ **`Nft`**

  ↳↳ [`OwnedNft`](OwnedNft.md)

  ↳↳ [`TransferredNft`](TransferredNft.md)

## Table of contents

### Properties

- [contract](Nft.md#contract)
- [description](Nft.md#description)
- [media](Nft.md#media)
- [metadataError](Nft.md#metadataerror)
- [rawMetadata](Nft.md#rawmetadata)
- [spamInfo](Nft.md#spaminfo)
- [timeLastUpdated](Nft.md#timelastupdated)
- [title](Nft.md#title)
- [tokenId](Nft.md#tokenid)
- [tokenType](Nft.md#tokentype)
- [tokenUri](Nft.md#tokenuri)

## Properties

### contract

• **contract**: [`NftContract`](NftContract.md)

The NFT's underlying contract and relevant contract metadata.

#### Overrides

[BaseNft](BaseNft.md).[contract](BaseNft.md#contract)

#### Defined in

[src/api/nft.ts:81](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/nft.ts#L81)

___

### description

• **description**: `string`

The NFT description.

#### Defined in

[src/api/nft.ts:87](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/nft.ts#L87)

___

### media

• **media**: [`Media`](Media.md)[]

URIs for accessing the NFT's media assets.

#### Defined in

[src/api/nft.ts:105](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/nft.ts#L105)

___

### metadataError

• **metadataError**: `undefined` \| `string`

Holds an error message if there was an issue fetching metadata.

#### Defined in

[src/api/nft.ts:93](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/nft.ts#L93)

___

### rawMetadata

• **rawMetadata**: `undefined` \| [`NftMetadata`](NftMetadata.md)

The raw metadata fetched from the metadata URL specified by the NFT. The
field is undefined if Alchemy was unable to fetch metadata.

#### Defined in

[src/api/nft.ts:99](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/nft.ts#L99)

___

### spamInfo

• `Optional` **spamInfo**: [`SpamInfo`](SpamInfo.md)

Detailed information on why an NFT was classified as spam.

#### Defined in

[src/api/nft.ts:108](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/nft.ts#L108)

___

### timeLastUpdated

• **timeLastUpdated**: `string`

When the NFT was last updated in the blockchain. Represented in ISO-8601 format.

#### Defined in

[src/api/nft.ts:90](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/nft.ts#L90)

___

### title

• **title**: `string`

The NFT title.

#### Defined in

[src/api/nft.ts:84](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/nft.ts#L84)

___

### tokenId

• **tokenId**: `string`

The NFT token ID as an integer string.

#### Inherited from

[BaseNft](BaseNft.md).[tokenId](BaseNft.md#tokenid)

#### Defined in

[src/api/nft.ts:65](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/nft.ts#L65)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of ERC token, if known.

#### Inherited from

[BaseNft](BaseNft.md).[tokenType](BaseNft.md#tokentype)

#### Defined in

[src/api/nft.ts:67](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/nft.ts#L67)

___

### tokenUri

• **tokenUri**: `undefined` \| [`TokenUri`](TokenUri.md)

URIs for accessing the NFT's metadata blob.

#### Defined in

[src/api/nft.ts:102](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/nft.ts#L102)
