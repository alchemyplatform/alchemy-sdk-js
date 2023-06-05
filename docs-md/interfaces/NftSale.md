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

[src/types/types.ts:1295](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1295)

___

### bundleIndex

• **bundleIndex**: `number`

The index of the token within the bundle of NFTs sold in the sale.

#### Defined in

[src/types/types.ts:1301](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1301)

___

### buyerAddress

• **buyerAddress**: `string`

The address of the buyer in the NFT sale.

#### Defined in

[src/types/types.ts:1271](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1271)

___

### contractAddress

• **contractAddress**: `string`

The NFT contract address.

#### Defined in

[src/types/types.ts:1262](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1262)

___

### logIndex

• **logIndex**: `number`

The log number of the sale event emitted within the block.

#### Defined in

[src/types/types.ts:1298](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1298)

___

### marketplace

• **marketplace**: [`NftSaleMarketplace`](../enums/NftSaleMarketplace.md)

The marketplace the sale took place on.

#### Defined in

[src/types/types.ts:1259](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1259)

___

### marketplaceFee

• `Optional` **marketplaceFee**: [`NftSaleFeeData`](NftSaleFeeData.md)

The payment from buyer to the marketplace.

**`deprecated`** Please use `protocolFee` instead.

#### Defined in

[src/types/types.ts:1286](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1286)

___

### protocolFee

• `Optional` **protocolFee**: [`NftSaleFeeData`](NftSaleFeeData.md)

The payment from buyer to the marketplace.

#### Defined in

[src/types/types.ts:1289](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1289)

___

### quantity

• **quantity**: `string`

The number of tokens sold in the sale as a decimal integer string.

#### Defined in

[src/types/types.ts:1268](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1268)

___

### royaltyFee

• `Optional` **royaltyFee**: [`NftSaleFeeData`](NftSaleFeeData.md)

The payment from buyer to the royalty address of the NFT collection.

#### Defined in

[src/types/types.ts:1292](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1292)

___

### sellerAddress

• **sellerAddress**: `string`

The address of the seller in the NFT sale.

#### Defined in

[src/types/types.ts:1274](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1274)

___

### sellerFee

• **sellerFee**: [`NftSaleFeeData`](NftSaleFeeData.md)

The payment from buyer to the seller.

#### Defined in

[src/types/types.ts:1280](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1280)

___

### taker

• **taker**: [`NftSaleTakerType`](../enums/NftSaleTakerType.md)

Whether the price taker in the trade was the buyer or the seller.

#### Defined in

[src/types/types.ts:1277](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1277)

___

### tokenId

• **tokenId**: `string`

The decimal token ID of the NFT being sold.

#### Defined in

[src/types/types.ts:1265](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1265)

___

### transactionHash

• **transactionHash**: `string`

The transactionHash of the NFT sale.

#### Defined in

[src/types/types.ts:1304](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1304)
