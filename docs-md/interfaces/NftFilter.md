[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftFilter

# Interface: NftFilter

NFT to track on a [NftActivityWebhook](NftActivityWebhook.md) or [NftMetadataUpdateWebhook](NftMetadataUpdateWebhook.md).

## Table of contents

### Properties

- [contractAddress](NftFilter.md#contractaddress)
- [tokenId](NftFilter.md#tokenid)

## Properties

### contractAddress

• **contractAddress**: `string`

The contract address of the NFT.

#### Defined in

[src/types/types.ts:1204](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5cfa150/src/types/types.ts#L1204)

___

### tokenId

• `Optional` **tokenId**: [`BigNumberish`](../modules.md#bignumberish)

The token id of the NFT to track. If this field is omitted, defaults to
tracking all NFTs for the provided contract address.

#### Defined in

[src/types/types.ts:1209](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5cfa150/src/types/types.ts#L1209)
