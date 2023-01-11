[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetNftSalesOptions

# Interface: GetNftSalesOptions

Optional parameters object for the [getNftSales](../classes/NftNamespace.md#getnftsales) endpoint.

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

[src/types/types.ts:986](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L986)

___

### fromBlock

• `Optional` **fromBlock**: `number` \| ``"latest"``

The block number to start fetching NFT sales data from.

#### Defined in

[src/types/types.ts:974](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L974)

___

### limit

• `Optional` **limit**: `number`

The maximum number of NFT sales to return.

#### Defined in

[src/types/types.ts:998](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L998)

___

### marketplace

• `Optional` **marketplace**: [`NftSaleMarketplace`](../enums/NftSaleMarketplace.md)

The NFT marketplace to filter sales by.

#### Defined in

[src/types/types.ts:983](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L983)

___

### order

• `Optional` **order**: [`SortingOrder`](../enums/SortingOrder.md)

Whether to return the results in ascending or descending order by block number.

#### Defined in

[src/types/types.ts:980](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L980)

___

### pageKey

• `Optional` **pageKey**: `string`

Key for pagination to use to fetch results from the next page if available.

#### Defined in

[src/types/types.ts:1001](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1001)

___

### sellerAddress

• `Optional` **sellerAddress**: `string`

The address of the NFT seller to filter sales by.

#### Defined in

[src/types/types.ts:989](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L989)

___

### taker

• `Optional` **taker**: [`NftSaleTakerType`](../enums/NftSaleTakerType.md)

Filter by whether the buyer or seller was the taker in the NFT trade.
Defaults to returning both buyer and seller taker trades.

#### Defined in

[src/types/types.ts:995](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L995)

___

### toBlock

• `Optional` **toBlock**: `number` \| ``"latest"``

The block number limit to fetch NFT sales data from.

#### Defined in

[src/types/types.ts:977](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L977)
