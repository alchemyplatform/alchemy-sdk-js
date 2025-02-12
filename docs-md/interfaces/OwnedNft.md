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
- [collection](OwnedNft.md#collection)
- [contract](OwnedNft.md#contract)
- [description](OwnedNft.md#description)
- [image](OwnedNft.md#image)
- [mint](OwnedNft.md#mint)
- [name](OwnedNft.md#name)
- [raw](OwnedNft.md#raw)
- [timeLastUpdated](OwnedNft.md#timelastupdated)
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

[src/types/nft-types.ts:1278](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L1278)

___

### balance

• **balance**: `string`

The token balance of the NFT.

#### Defined in

[src/types/nft-types.ts:284](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L284)

___

### collection

• `Optional` **collection**: [`BaseNftCollection`](BaseNftCollection.md)

Collection metadata for the NFT, if available.

#### Inherited from

[Nft](Nft.md).[collection](Nft.md#collection)

#### Defined in

[src/types/nft-types.ts:1280](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L1280)

___

### contract

• **contract**: [`NftContractForNft`](NftContractForNft.md)

The NFT's underlying contract and relevant contract metadata.

#### Inherited from

[Nft](Nft.md).[contract](Nft.md#contract)

#### Defined in

[src/types/nft-types.ts:1256](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L1256)

___

### description

• `Optional` **description**: `string`

The NFT description.

#### Inherited from

[Nft](Nft.md).[description](Nft.md#description)

#### Defined in

[src/types/nft-types.ts:1264](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L1264)

___

### image

• **image**: [`NftImage`](NftImage.md)

Media URLs and information for the NFT

#### Inherited from

[Nft](Nft.md).[image](Nft.md#image)

#### Defined in

[src/types/nft-types.ts:1266](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L1266)

___

### mint

• `Optional` **mint**: [`NftMint`](NftMint.md)

Mint information for the NFT.

#### Inherited from

[Nft](Nft.md).[mint](Nft.md#mint)

#### Defined in

[src/types/nft-types.ts:1282](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L1282)

___

### name

• `Optional` **name**: `string`

The NFT name.

#### Inherited from

[Nft](Nft.md).[name](Nft.md#name)

#### Defined in

[src/types/nft-types.ts:1262](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L1262)

___

### raw

• **raw**: [`NftRawMetadata`](NftRawMetadata.md)

The raw metadata for the NFT based on the metadata URI on the NFT contract.

#### Inherited from

[Nft](Nft.md).[raw](Nft.md#raw)

#### Defined in

[src/types/nft-types.ts:1268](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L1268)

___

### timeLastUpdated

• **timeLastUpdated**: `string`

When the NFT was last updated in the blockchain. Represented in ISO-8601 format.

#### Inherited from

[Nft](Nft.md).[timeLastUpdated](Nft.md#timelastupdated)

#### Defined in

[src/types/nft-types.ts:1272](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L1272)

___

### tokenId

• **tokenId**: `string`

The NFT token ID as an integer string.

#### Inherited from

[Nft](Nft.md).[tokenId](Nft.md#tokenid)

#### Defined in

[src/types/nft-types.ts:1258](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L1258)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of NFT.

#### Inherited from

[Nft](Nft.md).[tokenType](Nft.md#tokentype)

#### Defined in

[src/types/nft-types.ts:1260](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L1260)

___

### tokenUri

• `Optional` **tokenUri**: `string`

URIs for accessing the NFT's metadata blob.

#### Inherited from

[Nft](Nft.md).[tokenUri](Nft.md#tokenuri)

#### Defined in

[src/types/nft-types.ts:1270](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/nft-types.ts#L1270)
