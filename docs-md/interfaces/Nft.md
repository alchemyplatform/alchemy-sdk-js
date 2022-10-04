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
- [spaminfo](Nft.md#spaminfo)
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

[src/api/nft.ts:49](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L49)

---

### description

• **description**: `string`

The NFT description.

#### Defined in

[src/api/nft.ts:55](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L55)

---

### media

• **media**: [`Media`](Media.md)[]

URIs for accessing the NFT's media assets.

#### Defined in

[src/api/nft.ts:73](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L73)

---

### metadataError

• **metadataError**: `undefined` \| `string`

Holds an error message if there was an issue fetching metadata.

#### Defined in

[src/api/nft.ts:61](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L61)

---

### rawMetadata

• **rawMetadata**: `undefined` \| [`NftMetadata`](NftMetadata.md)

The raw metadata fetched from the metadata URL specified by the NFT. The
field is undefined if Alchemy was unable to fetch metadata.

#### Defined in

[src/api/nft.ts:67](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L67)

---

### spamInfo

• **spamInfo**: [`SpamInfo`](SpamInfo.md)

Whether and why the NFT contract that issued this token is considered spam.

#### Defined in

[src/api/nft.ts:82](https://github.com/alchemyplatform/alchemy-sdk-js/blob/560b3e2/src/api/nft.ts#L82)

---

### timeLastUpdated

• **timeLastUpdated**: `string`

When the NFT was last updated in the blockchain. Represented in ISO-8601 format.

#### Defined in

[src/api/nft.ts:58](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L58)

---

### title

• **title**: `string`

The NFT title.

#### Defined in

[src/api/nft.ts:52](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L52)

---

### tokenId

• **tokenId**: `string`

The NFT token ID as an integer string.

#### Inherited from

[BaseNft](BaseNft.md).[tokenId](BaseNft.md#tokenid)

#### Defined in

[src/api/nft.ts:37](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L37)

---

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of ERC token, if known.

#### Inherited from

[BaseNft](BaseNft.md).[tokenType](BaseNft.md#tokentype)

#### Defined in

[src/api/nft.ts:39](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L39)

---

### tokenUri

• **tokenUri**: `undefined` \| [`TokenUri`](TokenUri.md)

URIs for accessing the NFT's metadata blob.

#### Defined in

[src/api/nft.ts:70](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L70)
