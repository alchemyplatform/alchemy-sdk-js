[alchemy-sdk](../README.md) / [Exports](../modules.md) / Nft

# Class: Nft

Alchemy representation of an NFT.

## Hierarchy

- [`BaseNft`](BaseNft.md)

  ↳ **`Nft`**

  ↳↳ [`OwnedNft`](../interfaces/OwnedNft.md)

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

• `Readonly` **contract**: [`NftContract`](../interfaces/NftContract.md)

#### Inherited from

[BaseNft](BaseNft.md).[contract](BaseNft.md#contract)

#### Defined in

[api/nft.ts:21](https://github.com/alchemyplatform/alchemy-evm-js/blob/45d638a/src/api/nft.ts#L21)

___

### description

• `Readonly` **description**: `string`

The NFT description.

#### Defined in

[api/nft.ts:59](https://github.com/alchemyplatform/alchemy-evm-js/blob/45d638a/src/api/nft.ts#L59)

___

### media

• `Readonly` **media**: [`TokenUri`](../interfaces/TokenUri.md)[] = `[]`

URIs for accessing the NFT's media assets.

#### Defined in

[api/nft.ts:77](https://github.com/alchemyplatform/alchemy-evm-js/blob/45d638a/src/api/nft.ts#L77)

___

### metadataError

• `Readonly` **metadataError**: `undefined` \| `string`

Holds an error message if there was an issue fetching metadata.

#### Defined in

[api/nft.ts:65](https://github.com/alchemyplatform/alchemy-evm-js/blob/45d638a/src/api/nft.ts#L65)

___

### rawMetadata

• `Readonly` **rawMetadata**: `undefined` \| [`NftMetadata`](../interfaces/NftMetadata.md)

The raw metadata fetched from the metadata URL specified by the NFT. The
field is undefined if Alchemy was unable to fetch metadata.

#### Defined in

[api/nft.ts:71](https://github.com/alchemyplatform/alchemy-evm-js/blob/45d638a/src/api/nft.ts#L71)

___

### timeLastUpdated

• `Readonly` **timeLastUpdated**: `string`

When the NFT was last updated in the blockchain. Represented in ISO-8601 format.

#### Defined in

[api/nft.ts:62](https://github.com/alchemyplatform/alchemy-evm-js/blob/45d638a/src/api/nft.ts#L62)

___

### title

• `Readonly` **title**: `string`

The NFT title.

#### Defined in

[api/nft.ts:56](https://github.com/alchemyplatform/alchemy-evm-js/blob/45d638a/src/api/nft.ts#L56)

___

### tokenId

• `Readonly` **tokenId**: `string`

#### Inherited from

[BaseNft](BaseNft.md).[tokenId](BaseNft.md#tokenid)

___

### tokenType

• `Readonly` **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

#### Inherited from

[BaseNft](BaseNft.md).[tokenType](BaseNft.md#tokentype)

___

### tokenUri

• `Readonly` **tokenUri**: `undefined` \| [`TokenUri`](../interfaces/TokenUri.md)

URIs for accessing the NFT's metadata blob.

#### Defined in

[api/nft.ts:74](https://github.com/alchemyplatform/alchemy-evm-js/blob/45d638a/src/api/nft.ts#L74)
