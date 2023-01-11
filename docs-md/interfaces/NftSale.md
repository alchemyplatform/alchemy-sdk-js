[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftSale

# Interface: NftSale

Represents a single NFT sale data in the [GetNftSalesResponse](GetNftSalesResponse.md).

## Table of contents

### Properties

- [blockNumber](NftSale.md#blocknumber)
- [bundleIndex](NftSale.md#bundleindex)
- [buyerAddress](NftSale.md#buyeraddress)
- [contractAddress](NftSale.md#contractaddress)
- [logIndex](NftSale.md#logindex)
- [marketplace](NftSale.md#marketplace)
- [marketplaceFee](NftSale.md#marketplacefee)
- [quantity](NftSale.md#quantity)
- [royaltyFee](NftSale.md#royaltyfee)
- [sellerAddress](NftSale.md#selleraddress)
- [sellerFee](NftSale.md#sellerfee)
- [taker](NftSale.md#taker)
- [tokenId](NftSale.md#tokenid)
- [transactionHash](NftSale.md#transactionhash)

## Properties

### blockNumber

• **blockNumber**: `number`

The block number the NFT sale took place in.

#### Defined in

[src/types/types.ts:1067](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1067)

___

### bundleIndex

• **bundleIndex**: `number`

The index of the token within the bundle of NFTs sold in the sale.

#### Defined in

[src/types/types.ts:1073](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1073)

___

### buyerAddress

• **buyerAddress**: `string`

The address of the buyer in the NFT sale.

#### Defined in

[src/types/types.ts:1049](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1049)

___

### contractAddress

• **contractAddress**: `string`

The NFT contract address.

#### Defined in

[src/types/types.ts:1040](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1040)

___

### logIndex

• **logIndex**: `number`

The log number of the sale event emitted within the block.

#### Defined in

[src/types/types.ts:1070](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1070)

___

### marketplace

• **marketplace**: [`NftSaleMarketplace`](../enums/NftSaleMarketplace.md)

The marketplace the sale took place on.

#### Defined in

[src/types/types.ts:1037](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1037)

___

### marketplaceFee

• `Optional` **marketplaceFee**: [`NftSaleFeeData`](NftSaleFeeData.md)

The payment from buyer to the marketplace.

#### Defined in

[src/types/types.ts:1061](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1061)

___

### quantity

• **quantity**: `string`

The number of tokens sold in the sale as a decimal integer string.

#### Defined in

[src/types/types.ts:1046](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1046)

___

### royaltyFee

• `Optional` **royaltyFee**: [`NftSaleFeeData`](NftSaleFeeData.md)

The payment from buyer to the royalty address of the NFT collection.

#### Defined in

[src/types/types.ts:1064](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1064)

___

### sellerAddress

• **sellerAddress**: `string`

The address of the seller in the NFT sale.

#### Defined in

[src/types/types.ts:1052](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1052)

___

### sellerFee

• **sellerFee**: [`NftSaleFeeData`](NftSaleFeeData.md)

The payment from buyer to the seller.

#### Defined in

[src/types/types.ts:1058](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1058)

___

### taker

• **taker**: [`NftSaleTakerType`](../enums/NftSaleTakerType.md)

Whether the price taker in the trade was the buyer or the seller.

#### Defined in

[src/types/types.ts:1055](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1055)

___

### tokenId

• **tokenId**: `string`

The decimal token ID of the NFT being sold.

#### Defined in

[src/types/types.ts:1043](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1043)

___

### transactionHash

• **transactionHash**: `string`

The transactionHash of the NFT sale.

#### Defined in

[src/types/types.ts:1076](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1076)
