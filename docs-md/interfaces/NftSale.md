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
- [protocolFee](NftSale.md#protocolfee)
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

[src/types/types.ts:1305](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L1305)

___

### bundleIndex

• **bundleIndex**: `number`

The index of the token within the bundle of NFTs sold in the sale.

#### Defined in

[src/types/types.ts:1311](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L1311)

___

### buyerAddress

• **buyerAddress**: `string`

The address of the buyer in the NFT sale.

#### Defined in

[src/types/types.ts:1281](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L1281)

___

### contractAddress

• **contractAddress**: `string`

The NFT contract address.

#### Defined in

[src/types/types.ts:1272](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L1272)

___

### logIndex

• **logIndex**: `number`

The log number of the sale event emitted within the block.

#### Defined in

[src/types/types.ts:1308](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L1308)

___

### marketplace

• **marketplace**: [`NftSaleMarketplace`](../enums/NftSaleMarketplace.md)

The marketplace the sale took place on.

#### Defined in

[src/types/types.ts:1269](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L1269)

___

### marketplaceFee

• `Optional` **marketplaceFee**: [`NftSaleFeeData`](NftSaleFeeData.md)

The payment from buyer to the marketplace.

**`deprecated`** Please use `protocolFee` instead.

#### Defined in

[src/types/types.ts:1296](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L1296)

___

### protocolFee

• `Optional` **protocolFee**: [`NftSaleFeeData`](NftSaleFeeData.md)

The payment from buyer to the marketplace.

#### Defined in

[src/types/types.ts:1299](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L1299)

___

### quantity

• **quantity**: `string`

The number of tokens sold in the sale as a decimal integer string.

#### Defined in

[src/types/types.ts:1278](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L1278)

___

### royaltyFee

• `Optional` **royaltyFee**: [`NftSaleFeeData`](NftSaleFeeData.md)

The payment from buyer to the royalty address of the NFT collection.

#### Defined in

[src/types/types.ts:1302](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L1302)

___

### sellerAddress

• **sellerAddress**: `string`

The address of the seller in the NFT sale.

#### Defined in

[src/types/types.ts:1284](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L1284)

___

### sellerFee

• **sellerFee**: [`NftSaleFeeData`](NftSaleFeeData.md)

The payment from buyer to the seller.

#### Defined in

[src/types/types.ts:1290](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L1290)

___

### taker

• **taker**: [`NftSaleTakerType`](../enums/NftSaleTakerType.md)

Whether the price taker in the trade was the buyer or the seller.

#### Defined in

[src/types/types.ts:1287](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L1287)

___

### tokenId

• **tokenId**: `string`

The decimal token ID of the NFT being sold.

#### Defined in

[src/types/types.ts:1275](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L1275)

___

### transactionHash

• **transactionHash**: `string`

The transactionHash of the NFT sale.

#### Defined in

[src/types/types.ts:1314](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L1314)
