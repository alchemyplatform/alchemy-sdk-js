[alchemy-sdk](../README.md) / [Exports](../modules.md) / FloorPriceMarketplace

# Interface: FloorPriceMarketplace

The successful object returned by the [getFloorPrice](../classes/NftNamespace.md#getfloorprice) call for each
marketplace (e.g. looksRare).

## Table of contents

### Properties

- [collectionUrl](FloorPriceMarketplace.md#collectionurl)
- [floorPrice](FloorPriceMarketplace.md#floorprice)
- [priceCurrency](FloorPriceMarketplace.md#pricecurrency)
- [retrievedAt](FloorPriceMarketplace.md#retrievedat)

## Properties

### collectionUrl

• **collectionUrl**: `string`

The link to the collection on the given marketplace

#### Defined in

[src/types/nft-types.ts:460](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6dc36f9/src/types/nft-types.ts#L460)

___

### floorPrice

• **floorPrice**: `number`

The floor price of the collection on the given marketplace

#### Defined in

[src/types/nft-types.ts:456](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6dc36f9/src/types/nft-types.ts#L456)

___

### priceCurrency

• **priceCurrency**: `string`

The currency in which the floor price is denominated

#### Defined in

[src/types/nft-types.ts:458](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6dc36f9/src/types/nft-types.ts#L458)

___

### retrievedAt

• **retrievedAt**: `string`

UTC timestamp of when the floor price was retrieved from the marketplace

#### Defined in

[src/types/nft-types.ts:462](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6dc36f9/src/types/nft-types.ts#L462)
