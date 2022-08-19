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

• `Readonly` **collectionUrl**: `string`

The link to the collection on the given marketplace

#### Defined in

[src/types/types.ts:605](https://github.com/alchemyplatform/alchemy-sdk-js/blob/145ea50/src/types/types.ts#L605)

___

### floorPrice

• `Readonly` **floorPrice**: `number`

The floor price of the collection on the given marketplace

#### Defined in

[src/types/types.ts:601](https://github.com/alchemyplatform/alchemy-sdk-js/blob/145ea50/src/types/types.ts#L601)

___

### priceCurrency

• `Readonly` **priceCurrency**: `string`

The currency in which the floor price is denominated

#### Defined in

[src/types/types.ts:603](https://github.com/alchemyplatform/alchemy-sdk-js/blob/145ea50/src/types/types.ts#L603)

___

### retrievedAt

• `Readonly` **retrievedAt**: `string`

UTC timestamp of when the floor price was retrieved from the marketplace

#### Defined in

[src/types/types.ts:607](https://github.com/alchemyplatform/alchemy-sdk-js/blob/145ea50/src/types/types.ts#L607)
