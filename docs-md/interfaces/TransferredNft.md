[alchemy-sdk](../README.md) / [Exports](../modules.md) / TransferredNft

# Interface: TransferredNft

NFT with extra data for a single NFT that was transferred or minted.

## Hierarchy

- [`Nft`](Nft.md)

  ↳ **`TransferredNft`**

## Table of contents

### Properties

- [acquiredAt](TransferredNft.md#acquiredat)
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

[src/types/nft-types.ts:1262](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1262)

___

### blockNumber

• **blockNumber**: `string`

The block number as a hex string of when the transfer or mint occurred.

#### Defined in

[src/types/nft-types.ts:622](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L622)

___

### collection

• `Optional` **collection**: [`BaseNftCollection`](BaseNftCollection.md)

Collection metadata for the NFT, if available.

#### Inherited from

[Nft](Nft.md).[collection](Nft.md#collection)

#### Defined in

[src/types/nft-types.ts:1264](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1264)

___

### contract

• **contract**: [`NftContractForNft`](NftContractForNft.md)

The NFT's underlying contract and relevant contract metadata.

#### Inherited from

[Nft](Nft.md).[contract](Nft.md#contract)

#### Defined in

[src/types/nft-types.ts:1240](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1240)

___

### description

• `Optional` **description**: `string`

The NFT description.

#### Inherited from

[Nft](Nft.md).[description](Nft.md#description)

#### Defined in

[src/types/nft-types.ts:1248](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1248)

___

### from

• **from**: `string`

The address the NFT was from. For minted NFTs, this field is the set to
`0x0000000000000000000000000000000000000000`.

#### Defined in

[src/types/nft-types.ts:616](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L616)

___

### image

• **image**: [`NftImage`](NftImage.md)

Media URLs and information for the NFT

#### Inherited from

[Nft](Nft.md).[image](Nft.md#image)

#### Defined in

[src/types/nft-types.ts:1250](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1250)

___

### mint

• `Optional` **mint**: [`NftMint`](NftMint.md)

Mint information for the NFT.

#### Inherited from

[Nft](Nft.md).[mint](Nft.md#mint)

#### Defined in

[src/types/nft-types.ts:1266](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1266)

___

### name

• `Optional` **name**: `string`

The NFT name.

#### Inherited from

[Nft](Nft.md).[name](Nft.md#name)

#### Defined in

[src/types/nft-types.ts:1246](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1246)

___

### raw

• **raw**: [`NftRawMetadata`](NftRawMetadata.md)

The raw metadata for the NFT based on the metadata URI on the NFT contract.

#### Inherited from

[Nft](Nft.md).[raw](Nft.md#raw)

#### Defined in

[src/types/nft-types.ts:1252](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1252)

___

### timeLastUpdated

• **timeLastUpdated**: `string`

When the NFT was last updated in the blockchain. Represented in ISO-8601 format.

#### Inherited from

[Nft](Nft.md).[timeLastUpdated](Nft.md#timelastupdated)

#### Defined in

[src/types/nft-types.ts:1256](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1256)

___

### to

• `Optional` **to**: `string`

The address the NFT was sent or minted to.

#### Defined in

[src/types/nft-types.ts:618](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L618)

___

### tokenId

• **tokenId**: `string`

The NFT token ID as an integer string.

#### Inherited from

[Nft](Nft.md).[tokenId](Nft.md#tokenid)

#### Defined in

[src/types/nft-types.ts:1242](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1242)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of NFT.

#### Inherited from

[Nft](Nft.md).[tokenType](Nft.md#tokentype)

#### Defined in

[src/types/nft-types.ts:1244](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1244)

___

### tokenUri

• `Optional` **tokenUri**: `string`

URIs for accessing the NFT's metadata blob.

#### Inherited from

[Nft](Nft.md).[tokenUri](Nft.md#tokenuri)

#### Defined in

[src/types/nft-types.ts:1254](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L1254)

___

### transactionHash

• **transactionHash**: `string`

The transaction hash where the transfer or mint occurred.

#### Defined in

[src/types/nft-types.ts:620](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/nft-types.ts#L620)
