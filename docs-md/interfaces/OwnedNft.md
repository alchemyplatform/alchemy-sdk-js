[alchemy-sdk](../README.md) / [Exports](../modules.md) / OwnedNft

# Interface: OwnedNft

Represents an NFT with metadata owned by an address.

## Hierarchy

- [`Nft`](Nft.md)

  ↳ **`OwnedNft`**

## Table of contents

### Properties

- [acquiredAt](OwnedNft.md#acquiredat)
- [balance](OwnedNft.md#balance)
- [contract](OwnedNft.md#contract)
- [description](OwnedNft.md#description)
- [media](OwnedNft.md#media)
- [metadataError](OwnedNft.md#metadataerror)
- [rawMetadata](OwnedNft.md#rawmetadata)
- [spamInfo](OwnedNft.md#spaminfo)
- [timeLastUpdated](OwnedNft.md#timelastupdated)
- [title](OwnedNft.md#title)
- [tokenId](OwnedNft.md#tokenid)
- [tokenType](OwnedNft.md#tokentype)
- [tokenUri](OwnedNft.md#tokenuri)

## Properties

### acquiredAt

• `Optional` **acquiredAt**: [`AcquiredAt`](AcquiredAt.md)

Time at which the NFT was most recently acquired by the user. Only
available when specifying `orderBy: NftOrdering.TRANSFERTIME` in the
request.

#### Inherited from

[Nft](Nft.md).[acquiredAt](Nft.md#acquiredat)

#### Defined in

[src/api/nft.ts:116](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5992f68/src/api/nft.ts#L116)

___

### balance

• `Readonly` **balance**: `number`

The token balance of the NFT.

#### Defined in

[src/types/types.ts:823](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5992f68/src/types/types.ts#L823)

___

### contract

• **contract**: [`NftContract`](NftContract.md)

The NFT's underlying contract and relevant contract metadata.

#### Inherited from

[Nft](Nft.md).[contract](Nft.md#contract)

#### Defined in

[src/api/nft.ts:82](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5992f68/src/api/nft.ts#L82)

___

### description

• **description**: `string`

The NFT description.

#### Inherited from

[Nft](Nft.md).[description](Nft.md#description)

#### Defined in

[src/api/nft.ts:88](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5992f68/src/api/nft.ts#L88)

___

### media

• **media**: [`Media`](Media.md)[]

URIs for accessing the NFT's media assets.

#### Inherited from

[Nft](Nft.md).[media](Nft.md#media)

#### Defined in

[src/api/nft.ts:106](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5992f68/src/api/nft.ts#L106)

___

### metadataError

• **metadataError**: `undefined` \| `string`

Holds an error message if there was an issue fetching metadata.

#### Inherited from

[Nft](Nft.md).[metadataError](Nft.md#metadataerror)

#### Defined in

[src/api/nft.ts:94](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5992f68/src/api/nft.ts#L94)

___

### rawMetadata

• **rawMetadata**: `undefined` \| [`NftMetadata`](NftMetadata.md)

The raw metadata fetched from the metadata URL specified by the NFT. The
field is undefined if Alchemy was unable to fetch metadata.

#### Inherited from

[Nft](Nft.md).[rawMetadata](Nft.md#rawmetadata)

#### Defined in

[src/api/nft.ts:100](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5992f68/src/api/nft.ts#L100)

___

### spamInfo

• `Optional` **spamInfo**: [`SpamInfo`](SpamInfo.md)

Detailed information on why an NFT was classified as spam.

#### Inherited from

[Nft](Nft.md).[spamInfo](Nft.md#spaminfo)

#### Defined in

[src/api/nft.ts:109](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5992f68/src/api/nft.ts#L109)

___

### timeLastUpdated

• **timeLastUpdated**: `string`

When the NFT was last updated in the blockchain. Represented in ISO-8601 format.

#### Inherited from

[Nft](Nft.md).[timeLastUpdated](Nft.md#timelastupdated)

#### Defined in

[src/api/nft.ts:91](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5992f68/src/api/nft.ts#L91)

___

### title

• **title**: `string`

The NFT title.

#### Inherited from

[Nft](Nft.md).[title](Nft.md#title)

#### Defined in

[src/api/nft.ts:85](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5992f68/src/api/nft.ts#L85)

___

### tokenId

• **tokenId**: `string`

The NFT token ID as an integer string.

#### Inherited from

[Nft](Nft.md).[tokenId](Nft.md#tokenid)

#### Defined in

[src/api/nft.ts:66](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5992f68/src/api/nft.ts#L66)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of ERC token, if known.

#### Inherited from

[Nft](Nft.md).[tokenType](Nft.md#tokentype)

#### Defined in

[src/api/nft.ts:68](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5992f68/src/api/nft.ts#L68)

___

### tokenUri

• **tokenUri**: `undefined` \| [`TokenUri`](TokenUri.md)

URIs for accessing the NFT's metadata blob.

#### Inherited from

[Nft](Nft.md).[tokenUri](Nft.md#tokenuri)

#### Defined in

[src/api/nft.ts:103](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5992f68/src/api/nft.ts#L103)
