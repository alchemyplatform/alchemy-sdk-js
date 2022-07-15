[@alch/alchemy-sdk](../README.md) / [Exports](../modules.md) / GetNftFloorPriceResponse

# Interface: GetNftFloorPriceResponse

The response object for the [getNftFloorPrice](../classes/Alchemy.md#getnftfloorprice) method.

## Table of contents

### Properties

- [looksRare](GetNftFloorPriceResponse.md#looksrare)
- [openSea](GetNftFloorPriceResponse.md#opensea)

## Properties

### looksRare

• `Readonly` **looksRare**: [`FloorPriceMarketplace`](FloorPriceMarketplace.md) \| [`FloorPriceError`](FloorPriceError.md)

#### Defined in

[types/types.ts:406](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L406)

___

### openSea

• `Readonly` **openSea**: [`FloorPriceMarketplace`](FloorPriceMarketplace.md) \| [`FloorPriceError`](FloorPriceError.md)

Name of the NFT marketplace where the collection is listed. Current
marketplaces supported: OpenSea, LooksRare

#### Defined in

[types/types.ts:405](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L405)
