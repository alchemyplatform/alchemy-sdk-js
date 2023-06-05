[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetNftSalesOptions

# Interface: GetNftSalesOptions

Optional parameters object for the [NftNamespace.getNftSales](../classes/NftNamespace.md#getnftsales) method.

This interface is used to filter the NFT sales data.

## Hierarchy

- **`GetNftSalesOptions`**

  ↳ [`GetNftSalesOptionsByContractAddress`](GetNftSalesOptionsByContractAddress.md)

## Table of contents

### Properties

- [buyerAddress](GetNftSalesOptions.md#buyeraddress)
- [fromBlock](GetNftSalesOptions.md#fromblock)
- [limit](GetNftSalesOptions.md#limit)
- [marketplace](GetNftSalesOptions.md#marketplace)
- [order](GetNftSalesOptions.md#order)
- [pageKey](GetNftSalesOptions.md#pagekey)
- [sellerAddress](GetNftSalesOptions.md#selleraddress)
- [taker](GetNftSalesOptions.md#taker)
- [toBlock](GetNftSalesOptions.md#toblock)

## Properties

### buyerAddress

• `Optional` **buyerAddress**: `string`

The address of the NFT buyer to filter sales by.

#### Defined in

[src/types/types.ts:1205](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1205)

___

### fromBlock

• `Optional` **fromBlock**: `number` \| ``"latest"``

The block number to start fetching NFT sales data from.

#### Defined in

[src/types/types.ts:1193](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1193)

___

### limit

• `Optional` **limit**: `number`

The maximum number of NFT sales to return.

#### Defined in

[src/types/types.ts:1217](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1217)

___

### marketplace

• `Optional` **marketplace**: [`NftSaleMarketplace`](../enums/NftSaleMarketplace.md)

The NFT marketplace to filter sales by.

#### Defined in

[src/types/types.ts:1202](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1202)

___

### order

• `Optional` **order**: [`SortingOrder`](../enums/SortingOrder.md)

Whether to return the results in ascending or descending order by block number.

#### Defined in

[src/types/types.ts:1199](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1199)

___

### pageKey

• `Optional` **pageKey**: `string`

Key for pagination to use to fetch results from the next page if available.

#### Defined in

[src/types/types.ts:1220](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1220)

___

### sellerAddress

• `Optional` **sellerAddress**: `string`

The address of the NFT seller to filter sales by.

#### Defined in

[src/types/types.ts:1208](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1208)

___

### taker

• `Optional` **taker**: [`NftSaleTakerType`](../enums/NftSaleTakerType.md)

Filter by whether the buyer or seller was the taker in the NFT trade.
Defaults to returning both buyer and seller taker trades.

#### Defined in

[src/types/types.ts:1214](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1214)

___

### toBlock

• `Optional` **toBlock**: `number` \| ``"latest"``

The block number limit to fetch NFT sales data from.

#### Defined in

[src/types/types.ts:1196](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1196)
