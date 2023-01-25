[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftFilter

# Interface: NftFilter

NFT to track on a [NftActivityWebhook](NftActivityWebhook.md).

## Table of contents

### Properties

- [contractAddress](NftFilter.md#contractaddress)
- [tokenId](NftFilter.md#tokenid)

## Properties

### contractAddress

• **contractAddress**: `string`

The contract address of the NFT.

#### Defined in

[src/types/types.ts:2056](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/types/types.ts#L2056)

___

### tokenId

• `Optional` **tokenId**: `BigNumberish`

The token id of the NFT to track. If this field is omitted, defaults to
tracking all NFTs for the provided contract address.

#### Defined in

[src/types/types.ts:2061](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/types/types.ts#L2061)
