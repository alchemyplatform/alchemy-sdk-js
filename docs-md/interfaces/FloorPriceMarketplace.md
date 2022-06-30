[@alch/alchemy-sdk](../README.md) / [Exports](../modules.md) / FloorPriceMarketplace

# Interface: FloorPriceMarketplace

The successful object returned by the [getNftFloorPrice](../modules.md#getnftfloorprice) call for each
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

[src/types/types.ts:343](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/types/types.ts#L343)

___

### floorPrice

• `Readonly` **floorPrice**: `number`

The floor price of the collection on the given marketplace

#### Defined in

[src/types/types.ts:339](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/types/types.ts#L339)

___

### priceCurrency

• `Readonly` **priceCurrency**: `string`

The currency in which the floor price is denominated

#### Defined in

[src/types/types.ts:341](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/types/types.ts#L341)

___

### retrievedAt

• `Readonly` **retrievedAt**: `string`

UTC timestamp of when the floor price was retrieved from the marketplace

#### Defined in

[src/types/types.ts:345](https://github.com/alchemyplatform/alchemy-sdk-js/blob/9fe1224/src/types/types.ts#L345)
