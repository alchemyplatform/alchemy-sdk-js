[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetNftSalesResponse

# Interface: GetNftSalesResponse

The response for the [NftNamespace.getNftSales](../classes/NftNamespace.md#getnftsales) method.

## Table of contents

### Properties

- [nftSales](GetNftSalesResponse.md#nftsales)
- [pageKey](GetNftSalesResponse.md#pagekey)
- [validAt](GetNftSalesResponse.md#validat)

## Properties

### nftSales

• **nftSales**: [`NftSale`](NftSale.md)[]

List of NFT sales that match the query

#### Defined in

[src/types/types.ts:1200](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L1200)

___

### pageKey

• `Optional` **pageKey**: `string`

The page key to use to fetch the next page if more results are available.

#### Defined in

[src/types/types.ts:1208](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L1208)

___

### validAt

• **validAt**: [`NftSaleValidAt`](NftSaleValidAt.md)

Block Information of the block as of which the corresponding data is valid.

#### Defined in

[src/types/types.ts:1204](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L1204)
