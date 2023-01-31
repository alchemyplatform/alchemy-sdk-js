[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetNftSalesResponse

# Interface: GetNftSalesResponse

The response for the [NftNamespace.getNftSales](../classes/NftNamespace.md#getnftsales) method.

## Table of contents

### Properties

- [nftSales](GetNftSalesResponse.md#nftsales)
- [pageKey](GetNftSalesResponse.md#pagekey)

## Properties

### nftSales

• **nftSales**: [`NftSale`](NftSale.md)[]

List of NFT sales that match the query

#### Defined in

[src/types/types.ts:1148](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1148)

___

### pageKey

• `Optional` **pageKey**: `string`

The page key to use to fetch the next page if more results are available.

#### Defined in

[src/types/types.ts:1145](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1145)
