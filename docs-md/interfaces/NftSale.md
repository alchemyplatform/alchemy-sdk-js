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

[src/types/types.ts:1190](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1190)

___

### bundleIndex

• **bundleIndex**: `number`

The index of the token within the bundle of NFTs sold in the sale.

#### Defined in

[src/types/types.ts:1196](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1196)

___

### buyerAddress

• **buyerAddress**: `string`

The address of the buyer in the NFT sale.

#### Defined in

[src/types/types.ts:1166](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1166)

___

### contractAddress

• **contractAddress**: `string`

The NFT contract address.

#### Defined in

[src/types/types.ts:1157](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1157)

___

### logIndex

• **logIndex**: `number`

The log number of the sale event emitted within the block.

#### Defined in

[src/types/types.ts:1193](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1193)

___

### marketplace

• **marketplace**: [`NftSaleMarketplace`](../enums/NftSaleMarketplace.md)

The marketplace the sale took place on.

#### Defined in

[src/types/types.ts:1154](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1154)

___

### marketplaceFee

• `Optional` **marketplaceFee**: [`NftSaleFeeData`](NftSaleFeeData.md)

The payment from buyer to the marketplace.

**`deprecated`** Please use `protocolFee` instead.

#### Defined in

[src/types/types.ts:1181](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1181)

___

### protocolFee

• `Optional` **protocolFee**: [`NftSaleFeeData`](NftSaleFeeData.md)

The payment from buyer to the marketplace.

#### Defined in

[src/types/types.ts:1184](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1184)

___

### quantity

• **quantity**: `string`

The number of tokens sold in the sale as a decimal integer string.

#### Defined in

[src/types/types.ts:1163](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1163)

___

### royaltyFee

• `Optional` **royaltyFee**: [`NftSaleFeeData`](NftSaleFeeData.md)

The payment from buyer to the royalty address of the NFT collection.

#### Defined in

[src/types/types.ts:1187](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1187)

___

### sellerAddress

• **sellerAddress**: `string`

The address of the seller in the NFT sale.

#### Defined in

[src/types/types.ts:1169](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1169)

___

### sellerFee

• **sellerFee**: [`NftSaleFeeData`](NftSaleFeeData.md)

The payment from buyer to the seller.

#### Defined in

[src/types/types.ts:1175](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1175)

___

### taker

• **taker**: [`NftSaleTakerType`](../enums/NftSaleTakerType.md)

Whether the price taker in the trade was the buyer or the seller.

#### Defined in

[src/types/types.ts:1172](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1172)

___

### tokenId

• **tokenId**: `string`

The decimal token ID of the NFT being sold.

#### Defined in

[src/types/types.ts:1160](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1160)

___

### transactionHash

• **transactionHash**: `string`

The transactionHash of the NFT sale.

#### Defined in

[src/types/types.ts:1199](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1199)
