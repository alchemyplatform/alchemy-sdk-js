[alchemy-sdk](../README.md) / [Exports](../modules.md) / TransferredNft

# Interface: TransferredNft

NFT with extra data for a single NFT that was transferred or minted.

## Hierarchy

- [`Nft`](Nft.md)

  ↳ **`TransferredNft`**

## Table of contents

### Properties

- [acquiredAt](TransferredNft.md#acquiredat)
- [animation](TransferredNft.md#animation)
- [blockNumber](TransferredNft.md#blocknumber)
- [collection](TransferredNft.md#collection)
- [contract](TransferredNft.md#contract)
- [description](TransferredNft.md#description)
- [from](TransferredNft.md#from)
- [image](TransferredNft.md#image)
- [mint](TransferredNft.md#mint)
- [name](TransferredNft.md#name)
- [raw](TransferredNft.md#raw)
- [timeLastUpdated](TransferredNft.md#timelastupdated)
- [to](TransferredNft.md#to)
- [tokenId](TransferredNft.md#tokenid)
- [tokenType](TransferredNft.md#tokentype)
- [tokenUri](TransferredNft.md#tokenuri)
- [transactionHash](TransferredNft.md#transactionhash)

## Properties

### acquiredAt

• `Optional` **acquiredAt**: [`AcquiredAt`](AcquiredAt.md)

Time at which the NFT was most recently acquired by the user. Only
available when specifying `orderBy: NftOrdering.TRANSFERTIME` in the
request.

#### Inherited from

[Nft](Nft.md).[acquiredAt](Nft.md#acquiredat)

#### Defined in

[src/types/nft-types.ts:1286](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L1286)

___

### animation

• `Optional` **animation**: `Object`

Animation information for the NFT.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `cachedUrl?` | `string` | URL of the animation stored in Alchemy's cache. |
| `contentType?` | `string` | The type of the animation media. |
| `size?` | `number` | The size of the animation in bytes. |

#### Inherited from

[Nft](Nft.md).[animation](Nft.md#animation)

#### Defined in

[src/types/nft-types.ts:1267](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L1267)

___

### blockNumber

• **blockNumber**: `string`

The block number as a hex string of when the transfer or mint occurred.

#### Defined in

[src/types/nft-types.ts:625](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L625)

___

### collection

• `Optional` **collection**: [`BaseNftCollection`](BaseNftCollection.md)

Collection metadata for the NFT, if available.

#### Inherited from

[Nft](Nft.md).[collection](Nft.md#collection)

#### Defined in

[src/types/nft-types.ts:1288](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L1288)

___

### contract

• **contract**: [`NftContractForNft`](NftContractForNft.md)

The NFT's underlying contract and relevant contract metadata.

#### Inherited from

[Nft](Nft.md).[contract](Nft.md#contract)

#### Defined in

[src/types/nft-types.ts:1255](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L1255)

___

### description

• `Optional` **description**: `string`

The NFT description.

#### Inherited from

[Nft](Nft.md).[description](Nft.md#description)

#### Defined in

[src/types/nft-types.ts:1263](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L1263)

___

### from

• **from**: `string`

The address the NFT was from. For minted NFTs, this field is the set to
`0x0000000000000000000000000000000000000000`.

#### Defined in

[src/types/nft-types.ts:619](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L619)

___

### image

• **image**: [`NftImage`](NftImage.md)

Media URLs and information for the NFT

#### Inherited from

[Nft](Nft.md).[image](Nft.md#image)

#### Defined in

[src/types/nft-types.ts:1265](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L1265)

___

### mint

• `Optional` **mint**: [`NftMint`](NftMint.md)

Mint information for the NFT.

#### Inherited from

[Nft](Nft.md).[mint](Nft.md#mint)

#### Defined in

[src/types/nft-types.ts:1290](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L1290)

___

### name

• `Optional` **name**: `string`

The NFT name.

#### Inherited from

[Nft](Nft.md).[name](Nft.md#name)

#### Defined in

[src/types/nft-types.ts:1261](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L1261)

___

### raw

• **raw**: [`NftRawMetadata`](NftRawMetadata.md)

The raw metadata for the NFT based on the metadata URI on the NFT contract.

#### Inherited from

[Nft](Nft.md).[raw](Nft.md#raw)

#### Defined in

[src/types/nft-types.ts:1276](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L1276)

___

### timeLastUpdated

• **timeLastUpdated**: `string`

When the NFT was last updated in the blockchain. Represented in ISO-8601 format.

#### Inherited from

[Nft](Nft.md).[timeLastUpdated](Nft.md#timelastupdated)

#### Defined in

[src/types/nft-types.ts:1280](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L1280)

___

### to

• `Optional` **to**: `string`

The address the NFT was sent or minted to.

#### Defined in

[src/types/nft-types.ts:621](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L621)

___

### tokenId

• **tokenId**: `string`

The NFT token ID as an integer string.

#### Inherited from

[Nft](Nft.md).[tokenId](Nft.md#tokenid)

#### Defined in

[src/types/nft-types.ts:1257](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L1257)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of NFT.

#### Inherited from

[Nft](Nft.md).[tokenType](Nft.md#tokentype)

#### Defined in

[src/types/nft-types.ts:1259](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L1259)

___

### tokenUri

• `Optional` **tokenUri**: `string`

URIs for accessing the NFT's metadata blob.

#### Inherited from

[Nft](Nft.md).[tokenUri](Nft.md#tokenuri)

#### Defined in

[src/types/nft-types.ts:1278](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L1278)

___

### transactionHash

• **transactionHash**: `string`

The transaction hash where the transfer or mint occurred.

#### Defined in

[src/types/nft-types.ts:623](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fb68bb4a/src/types/nft-types.ts#L623)
