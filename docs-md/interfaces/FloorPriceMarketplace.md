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

[src/types/types.ts:966](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ee5b9ee/src/types/types.ts#L966)

___

### floorPrice

• `Readonly` **floorPrice**: `number`

The floor price of the collection on the given marketplace

#### Defined in

[src/types/types.ts:962](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ee5b9ee/src/types/types.ts#L962)

___

### priceCurrency

• `Readonly` **priceCurrency**: `string`

The currency in which the floor price is denominated

#### Defined in

[src/types/types.ts:964](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ee5b9ee/src/types/types.ts#L964)

___

### retrievedAt

• `Readonly` **retrievedAt**: `string`

UTC timestamp of when the floor price was retrieved from the marketplace

#### Defined in

[src/types/types.ts:968](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ee5b9ee/src/types/types.ts#L968)
