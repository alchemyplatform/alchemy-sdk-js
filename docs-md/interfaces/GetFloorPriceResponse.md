[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetFloorPriceResponse

# Interface: GetFloorPriceResponse

The response object for the [getFloorPrice](../classes/NftNamespace.md#getfloorprice) method.

## Table of contents

### Properties

- [looksRare](GetFloorPriceResponse.md#looksrare)
- [openSea](GetFloorPriceResponse.md#opensea)

## Properties

### looksRare

• `Readonly` **looksRare**: [`FloorPriceMarketplace`](FloorPriceMarketplace.md) \| [`FloorPriceError`](FloorPriceError.md)

#### Defined in

[src/types/types.ts:891](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L891)

___

### openSea

• `Readonly` **openSea**: [`FloorPriceMarketplace`](FloorPriceMarketplace.md) \| [`FloorPriceError`](FloorPriceError.md)

Name of the NFT marketplace where the collection is listed. Current
marketplaces supported: OpenSea, LooksRare

#### Defined in

[src/types/types.ts:890](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L890)
