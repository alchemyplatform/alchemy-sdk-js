[alchemy-sdk](../README.md) / [Exports](../modules.md) / Nft

# Interface: Nft

Alchemy representation of an NFT.

The BaseNft object does not hold any metadata information and only contains
the NFT contract and token ID. The Nft object additionally contains the NFT
metadata, token URI information, and media.

## Hierarchy

- **`Nft`**

  ↳ [`OwnedNft`](OwnedNft.md)

  ↳ [`TransferredNft`](TransferredNft.md)

## Table of contents

### Properties

- [acquiredAt](Nft.md#acquiredat)
- [collection](Nft.md#collection)
- [contract](Nft.md#contract)
- [description](Nft.md#description)
- [image](Nft.md#image)
- [mint](Nft.md#mint)
- [name](Nft.md#name)
- [raw](Nft.md#raw)
- [timeLastUpdated](Nft.md#timelastupdated)
- [tokenId](Nft.md#tokenid)
- [tokenType](Nft.md#tokentype)
- [tokenUri](Nft.md#tokenuri)

## Properties

### acquiredAt

• `Optional` **acquiredAt**: [`AcquiredAt`](AcquiredAt.md)

Time at which the NFT was most recently acquired by the user. Only
available when specifying `orderBy: NftOrdering.TRANSFERTIME` in the
request.

#### Defined in

[src/types/nft-types.ts:1278](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/nft-types.ts#L1278)

___

### collection

• `Optional` **collection**: [`BaseNftCollection`](BaseNftCollection.md)

Collection metadata for the NFT, if available.

#### Defined in

[src/types/nft-types.ts:1280](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/nft-types.ts#L1280)

___

### contract

• **contract**: [`NftContractForNft`](NftContractForNft.md)

The NFT's underlying contract and relevant contract metadata.

#### Defined in

[src/types/nft-types.ts:1256](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/nft-types.ts#L1256)

___

### description

• `Optional` **description**: `string`

The NFT description.

#### Defined in

[src/types/nft-types.ts:1264](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/nft-types.ts#L1264)

___

### image

• **image**: [`NftImage`](NftImage.md)

Media URLs and information for the NFT

#### Defined in

[src/types/nft-types.ts:1266](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/nft-types.ts#L1266)

___

### mint

• `Optional` **mint**: [`NftMint`](NftMint.md)

Mint information for the NFT.

#### Defined in

[src/types/nft-types.ts:1282](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/nft-types.ts#L1282)

___

### name

• `Optional` **name**: `string`

The NFT name.

#### Defined in

[src/types/nft-types.ts:1262](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/nft-types.ts#L1262)

___

### raw

• **raw**: [`NftRawMetadata`](NftRawMetadata.md)

The raw metadata for the NFT based on the metadata URI on the NFT contract.

#### Defined in

[src/types/nft-types.ts:1268](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/nft-types.ts#L1268)

___

### timeLastUpdated

• **timeLastUpdated**: `string`

When the NFT was last updated in the blockchain. Represented in ISO-8601 format.

#### Defined in

[src/types/nft-types.ts:1272](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/nft-types.ts#L1272)

___

### tokenId

• **tokenId**: `string`

The NFT token ID as an integer string.

#### Defined in

[src/types/nft-types.ts:1258](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/nft-types.ts#L1258)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of NFT.

#### Defined in

[src/types/nft-types.ts:1260](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/nft-types.ts#L1260)

___

### tokenUri

• `Optional` **tokenUri**: `string`

URIs for accessing the NFT's metadata blob.

#### Defined in

[src/types/nft-types.ts:1270](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/nft-types.ts#L1270)
