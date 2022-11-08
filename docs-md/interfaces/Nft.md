[alchemy-sdk](../README.md) / [Exports](../modules.md) / Nft

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

[src/api/nft.ts:58](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/api/nft.ts#L58)

___

### description

• **description**: `string`

The NFT description.

#### Defined in

[src/api/nft.ts:64](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/api/nft.ts#L64)

___

### media

• **media**: [`Media`](Media.md)[]

URIs for accessing the NFT's media assets.

#### Defined in

[src/api/nft.ts:82](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/api/nft.ts#L82)

___

### metadataError

• **metadataError**: `undefined` \| `string`

Holds an error message if there was an issue fetching metadata.

#### Defined in

[src/api/nft.ts:70](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/api/nft.ts#L70)

___

### rawMetadata

• **rawMetadata**: `undefined` \| [`NftMetadata`](NftMetadata.md)

The raw metadata fetched from the metadata URL specified by the NFT. The
field is undefined if Alchemy was unable to fetch metadata.

#### Defined in

[src/api/nft.ts:76](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/api/nft.ts#L76)

___

### spamInfo

• `Optional` **spamInfo**: [`SpamInfo`](SpamInfo.md)

Detailed information on why an NFT was classified as spam.

#### Defined in

[src/api/nft.ts:85](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/api/nft.ts#L85)

___

### timeLastUpdated

• **timeLastUpdated**: `string`

When the NFT was last updated in the blockchain. Represented in ISO-8601 format.

#### Defined in

[src/api/nft.ts:67](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/api/nft.ts#L67)

___

### title

• **title**: `string`

The NFT title.

#### Defined in

[src/api/nft.ts:61](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/api/nft.ts#L61)

___

### tokenId

• **tokenId**: `string`

The NFT token ID as an integer string.

#### Inherited from

[BaseNft](BaseNft.md).[tokenId](BaseNft.md#tokenid)

#### Defined in

[src/api/nft.ts:46](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/api/nft.ts#L46)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of ERC token, if known.

#### Inherited from

[BaseNft](BaseNft.md).[tokenType](BaseNft.md#tokentype)

#### Defined in

[src/api/nft.ts:48](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/api/nft.ts#L48)

___

### tokenUri

• **tokenUri**: `undefined` \| [`TokenUri`](TokenUri.md)

URIs for accessing the NFT's metadata blob.

#### Defined in

[src/api/nft.ts:79](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/api/nft.ts#L79)
