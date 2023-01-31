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

[src/types/types.ts:1103](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1103)

___

### fromBlock

• `Optional` **fromBlock**: `number` \| ``"latest"``

The block number to start fetching NFT sales data from.

#### Defined in

[src/types/types.ts:1091](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1091)

___

### limit

• `Optional` **limit**: `number`

The maximum number of NFT sales to return.

#### Defined in

[src/types/types.ts:1115](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1115)

___

### marketplace

• `Optional` **marketplace**: [`NftSaleMarketplace`](../enums/NftSaleMarketplace.md)

The NFT marketplace to filter sales by.

#### Defined in

[src/types/types.ts:1100](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1100)

___

### order

• `Optional` **order**: [`SortingOrder`](../enums/SortingOrder.md)

Whether to return the results in ascending or descending order by block number.

#### Defined in

[src/types/types.ts:1097](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1097)

___

### pageKey

• `Optional` **pageKey**: `string`

Key for pagination to use to fetch results from the next page if available.

#### Defined in

[src/types/types.ts:1118](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1118)

___

### sellerAddress

• `Optional` **sellerAddress**: `string`

The address of the NFT seller to filter sales by.

#### Defined in

[src/types/types.ts:1106](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1106)

___

### taker

• `Optional` **taker**: [`NftSaleTakerType`](../enums/NftSaleTakerType.md)

Filter by whether the buyer or seller was the taker in the NFT trade.
Defaults to returning both buyer and seller taker trades.

#### Defined in

[src/types/types.ts:1112](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1112)

___

### toBlock

• `Optional` **toBlock**: `number` \| ``"latest"``

The block number limit to fetch NFT sales data from.

#### Defined in

[src/types/types.ts:1094](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1094)
