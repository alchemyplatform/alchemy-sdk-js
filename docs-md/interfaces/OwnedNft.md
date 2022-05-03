[alchemy-evm-js](../README.md) / [Exports](../modules.md) / OwnedNft

# Interface: OwnedNft

Represents an NFT with metadata owned by an address.

## Hierarchy

- [`Nft`](../classes/Nft.md)

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

[types/types.ts:289](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/types/types.ts#L289)

___

### contract

• `Readonly` **contract**: [`NftContract`](NftContract.md)

#### Inherited from

[Nft](../classes/Nft.md).[contract](../classes/Nft.md#contract)

#### Defined in

[api/nft.ts:21](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/nft.ts#L21)

___

### description

• `Readonly` **description**: `string`

The NFT description.

#### Inherited from

[Nft](../classes/Nft.md).[description](../classes/Nft.md#description)

#### Defined in

[api/nft.ts:59](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/nft.ts#L59)

___

### media

• `Readonly` **media**: [`TokenUri`](TokenUri.md)[] = `[]`

URIs for accessing the NFT's media assets.

#### Inherited from

[Nft](../classes/Nft.md).[media](../classes/Nft.md#media)

#### Defined in

[api/nft.ts:77](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/nft.ts#L77)

___

### metadataError

• `Readonly` **metadataError**: `undefined` \| `string`

Holds an error message if there was an issue fetching metadata.

#### Inherited from

[Nft](../classes/Nft.md).[metadataError](../classes/Nft.md#metadataerror)

#### Defined in

[api/nft.ts:65](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/nft.ts#L65)

___

### rawMetadata

• `Readonly` **rawMetadata**: `undefined` \| [`NftMetadata`](NftMetadata.md)

The raw metadata fetched from the metadata URL specified by the NFT. The
field is undefined if Alchemy was unable to fetch metadata.

#### Inherited from

[Nft](../classes/Nft.md).[rawMetadata](../classes/Nft.md#rawmetadata)

#### Defined in

[api/nft.ts:71](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/nft.ts#L71)

___

### timeLastUpdated

• `Readonly` **timeLastUpdated**: `string`

When the NFT was last updated in the blockchain. Represented in ISO-8601 format.

#### Inherited from

[Nft](../classes/Nft.md).[timeLastUpdated](../classes/Nft.md#timelastupdated)

#### Defined in

[api/nft.ts:62](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/nft.ts#L62)

___

### title

• `Readonly` **title**: `string`

The NFT title.

#### Inherited from

[Nft](../classes/Nft.md).[title](../classes/Nft.md#title)

#### Defined in

[api/nft.ts:56](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/nft.ts#L56)

___

### tokenId

• `Readonly` **tokenId**: `string`

#### Inherited from

[Nft](../classes/Nft.md).[tokenId](../classes/Nft.md#tokenid)

___

### tokenType

• `Readonly` **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

#### Inherited from

[Nft](../classes/Nft.md).[tokenType](../classes/Nft.md#tokentype)

___

### tokenUri

• `Readonly` **tokenUri**: `undefined` \| [`TokenUri`](TokenUri.md)

URIs for accessing the NFT's metadata blob.

#### Inherited from

[Nft](../classes/Nft.md).[tokenUri](../classes/Nft.md#tokenuri)

#### Defined in

[api/nft.ts:74](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/api/nft.ts#L74)
