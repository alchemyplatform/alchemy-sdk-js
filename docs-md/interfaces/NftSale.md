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

[src/types/types.ts:1105](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L1105)

___

### bundleIndex

• **bundleIndex**: `number`

The index of the token within the bundle of NFTs sold in the sale.

#### Defined in

[src/types/types.ts:1111](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L1111)

___

### buyerAddress

• **buyerAddress**: `string`

The address of the buyer in the NFT sale.

#### Defined in

[src/types/types.ts:1081](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L1081)

___

### contractAddress

• **contractAddress**: `string`

The NFT contract address.

#### Defined in

[src/types/types.ts:1072](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L1072)

___

### logIndex

• **logIndex**: `number`

The log number of the sale event emitted within the block.

#### Defined in

[src/types/types.ts:1108](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L1108)

___

### marketplace

• **marketplace**: [`NftSaleMarketplace`](../enums/NftSaleMarketplace.md)

The marketplace the sale took place on.

#### Defined in

[src/types/types.ts:1069](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L1069)

___

### marketplaceFee

• `Optional` **marketplaceFee**: [`NftSaleFeeData`](NftSaleFeeData.md)

The payment from buyer to the marketplace.

**`deprecated`** Please use `protocolFee` instead.

#### Defined in

[src/types/types.ts:1096](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L1096)

___

### protocolFee

• `Optional` **protocolFee**: [`NftSaleFeeData`](NftSaleFeeData.md)

The payment from buyer to the marketplace.

#### Defined in

[src/types/types.ts:1099](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L1099)

___

### quantity

• **quantity**: `string`

The number of tokens sold in the sale as a decimal integer string.

#### Defined in

[src/types/types.ts:1078](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L1078)

___

### royaltyFee

• `Optional` **royaltyFee**: [`NftSaleFeeData`](NftSaleFeeData.md)

The payment from buyer to the royalty address of the NFT collection.

#### Defined in

[src/types/types.ts:1102](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L1102)

___

### sellerAddress

• **sellerAddress**: `string`

The address of the seller in the NFT sale.

#### Defined in

[src/types/types.ts:1084](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L1084)

___

### sellerFee

• **sellerFee**: [`NftSaleFeeData`](NftSaleFeeData.md)

The payment from buyer to the seller.

#### Defined in

[src/types/types.ts:1090](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L1090)

___

### taker

• **taker**: [`NftSaleTakerType`](../enums/NftSaleTakerType.md)

Whether the price taker in the trade was the buyer or the seller.

#### Defined in

[src/types/types.ts:1087](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L1087)

___

### tokenId

• **tokenId**: `string`

The decimal token ID of the NFT being sold.

#### Defined in

[src/types/types.ts:1075](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L1075)

___

### transactionHash

• **transactionHash**: `string`

The transactionHash of the NFT sale.

#### Defined in

[src/types/types.ts:1114](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L1114)
