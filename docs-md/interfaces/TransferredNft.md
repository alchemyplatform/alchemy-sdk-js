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
- [contract](TransferredNft.md#contract)
- [description](TransferredNft.md#description)
- [from](TransferredNft.md#from)
- [image](TransferredNft.md#image)
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

[src/api/nft.ts:97](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L97)

___

### blockNumber

• **blockNumber**: `string`

The block number as a hex string of when the transfer or mint occurred.

#### Defined in

[src/types/types.ts:1111](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L1111)

___

### contract

• **contract**: `NftContractForNft`

The NFT's underlying contract and relevant contract metadata.

#### Inherited from

[Nft](Nft.md).[contract](Nft.md#contract)

#### Defined in

[src/api/nft.ts:75](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L75)

___

### description

• `Optional` **description**: `string`

The NFT description.

#### Inherited from

[Nft](Nft.md).[description](Nft.md#description)

#### Defined in

[src/api/nft.ts:83](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L83)

___

### from

• **from**: `string`

The address the NFT was from. For minted NFTs, this field is the set to
`0x0000000000000000000000000000000000000000`.

#### Defined in

[src/types/types.ts:1105](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L1105)

___

### image

• **image**: [`NftImage`](NftImage.md)

Media URLs and information for the NFT

#### Inherited from

[Nft](Nft.md).[image](Nft.md#image)

#### Defined in

[src/api/nft.ts:85](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L85)

___

### name

• `Optional` **name**: `string`

The NFT name.

#### Inherited from

[Nft](Nft.md).[name](Nft.md#name)

#### Defined in

[src/api/nft.ts:81](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L81)

___

### raw

• **raw**: `NftRawMetadata`

The raw metadata for the NFT based on the metadata URI on the NFT contract.

#### Inherited from

[Nft](Nft.md).[raw](Nft.md#raw)

#### Defined in

[src/api/nft.ts:87](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L87)

___

### timeLastUpdated

• **timeLastUpdated**: `string`

When the NFT was last updated in the blockchain. Represented in ISO-8601 format.

#### Inherited from

[Nft](Nft.md).[timeLastUpdated](Nft.md#timelastupdated)

#### Defined in

[src/api/nft.ts:91](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L91)

___

### to

• `Optional` **to**: `string`

The address the NFT was sent or minted to.

#### Defined in

[src/types/types.ts:1107](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L1107)

___

### tokenId

• **tokenId**: `string`

The NFT token ID as an integer string.

#### Inherited from

[Nft](Nft.md).[tokenId](Nft.md#tokenid)

#### Defined in

[src/api/nft.ts:77](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L77)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of NFT.

#### Inherited from

[Nft](Nft.md).[tokenType](Nft.md#tokentype)

#### Defined in

[src/api/nft.ts:79](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L79)

___

### tokenUri

• `Optional` **tokenUri**: `string`

URIs for accessing the NFT's metadata blob.

#### Inherited from

[Nft](Nft.md).[tokenUri](Nft.md#tokenuri)

#### Defined in

[src/api/nft.ts:89](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L89)

___

### transactionHash

• **transactionHash**: `string`

The transaction hash where the transfer or mint occurred.

#### Defined in

[src/types/types.ts:1109](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L1109)
