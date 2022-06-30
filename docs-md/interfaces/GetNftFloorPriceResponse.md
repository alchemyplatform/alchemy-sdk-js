[@alch/alchemy-sdk](../README.md) / [Exports](../modules.md) / GetNftFloorPriceResponse

# Interface: GetNftFloorPriceResponse

The response object for the [getNftFloorPrice](../modules.md#getnftfloorprice) method.

## Table of contents

### Properties

- [looksRare](GetNftFloorPriceResponse.md#looksrare)
- [openSea](GetNftFloorPriceResponse.md#opensea)

## Properties

### looksRare

• `Readonly` **looksRare**: [`FloorPriceMarketplace`](FloorPriceMarketplace.md) \| [`FloorPriceError`](FloorPriceError.md)

#### Defined in

[src/types/types.ts:370](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/types/types.ts#L370)

___

### openSea

• `Readonly` **openSea**: [`FloorPriceMarketplace`](FloorPriceMarketplace.md) \| [`FloorPriceError`](FloorPriceError.md)

Name of the NFT marketplace where the collection is listed. Current
marketplaces supported: OpenSea, LooksRare

#### Defined in

[src/types/types.ts:369](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/types/types.ts#L369)
