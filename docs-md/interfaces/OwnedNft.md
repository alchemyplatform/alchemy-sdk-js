[alchemy-sdk](../README.md) / [Exports](../modules.md) / OwnedNft

# Interface: OwnedNft

Represents an NFT with metadata owned by an address.

## Hierarchy

- [`Nft`](Nft.md)

  ↳ **`OwnedNft`**

## Table of contents

### Properties

- [acquiredAt](OwnedNft.md#acquiredat)
- [animation](OwnedNft.md#animation)
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

[src/types/nft-types.ts:1288](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/nft-types.ts#L1288)

___

### animation

• `Optional` **animation**: `Object`

Animation information for the NFT.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `cachedUrl?` | `string` | URL of the animation stored in Alchemy's cache. |
| `contentType?` | `string` | The type of the animation media. |
| `originalUrl?` | `string` | The original URL of the animation as stored on the contract. |
| `size?` | `number` | The size of the animation in bytes. |

#### Inherited from

[Nft](Nft.md).[animation](Nft.md#animation)

#### Defined in

[src/types/nft-types.ts:1267](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/nft-types.ts#L1267)

___

### balance

• **balance**: `string`

The token balance of the NFT.

#### Defined in

[src/types/nft-types.ts:283](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/nft-types.ts#L283)

___

### collection

• `Optional` **collection**: [`BaseNftCollection`](BaseNftCollection.md)

Collection metadata for the NFT, if available.

#### Inherited from

[Nft](Nft.md).[collection](Nft.md#collection)

#### Defined in

[src/types/nft-types.ts:1290](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/nft-types.ts#L1290)

___

### contract

• **contract**: [`NftContractForNft`](NftContractForNft.md)

The NFT's underlying contract and relevant contract metadata.

#### Inherited from

[Nft](Nft.md).[contract](Nft.md#contract)

#### Defined in

[src/types/nft-types.ts:1255](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/nft-types.ts#L1255)

___

### description

• `Optional` **description**: `string`

The NFT description.

#### Inherited from

[Nft](Nft.md).[description](Nft.md#description)

#### Defined in

[src/types/nft-types.ts:1263](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/nft-types.ts#L1263)

___

### image

• **image**: [`NftImage`](NftImage.md)

Media URLs and information for the NFT

#### Inherited from

[Nft](Nft.md).[image](Nft.md#image)

#### Defined in

[src/types/nft-types.ts:1265](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/nft-types.ts#L1265)

___

### mint

• `Optional` **mint**: [`NftMint`](NftMint.md)

Mint information for the NFT.

#### Inherited from

[Nft](Nft.md).[mint](Nft.md#mint)

#### Defined in

[src/types/nft-types.ts:1292](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/nft-types.ts#L1292)

___

### name

• `Optional` **name**: `string`

The NFT name.

#### Inherited from

[Nft](Nft.md).[name](Nft.md#name)

#### Defined in

[src/types/nft-types.ts:1261](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/nft-types.ts#L1261)

___

### raw

• **raw**: [`NftRawMetadata`](NftRawMetadata.md)

The raw metadata for the NFT based on the metadata URI on the NFT contract.

#### Inherited from

[Nft](Nft.md).[raw](Nft.md#raw)

#### Defined in

[src/types/nft-types.ts:1278](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/nft-types.ts#L1278)

___

### timeLastUpdated

• **timeLastUpdated**: `string`

When the NFT was last updated in the blockchain. Represented in ISO-8601 format.

#### Inherited from

[Nft](Nft.md).[timeLastUpdated](Nft.md#timelastupdated)

#### Defined in

[src/types/nft-types.ts:1282](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/nft-types.ts#L1282)

___

### tokenId

• **tokenId**: `string`

The NFT token ID as an integer string.

#### Inherited from

[Nft](Nft.md).[tokenId](Nft.md#tokenid)

#### Defined in

[src/types/nft-types.ts:1257](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/nft-types.ts#L1257)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of NFT.

#### Inherited from

[Nft](Nft.md).[tokenType](Nft.md#tokentype)

#### Defined in

[src/types/nft-types.ts:1259](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/nft-types.ts#L1259)

___

### tokenUri

• `Optional` **tokenUri**: `string`

URIs for accessing the NFT's metadata blob.

#### Inherited from

[Nft](Nft.md).[tokenUri](Nft.md#tokenuri)

#### Defined in

[src/types/nft-types.ts:1280](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/nft-types.ts#L1280)
