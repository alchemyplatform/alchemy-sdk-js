[alchemy-sdk](../README.md) / [Exports](../modules.md) / TokenPrice

# Interface: TokenPrice

Represents a token's price information at a specific point in time.

## Table of contents

### Properties

- [currency](TokenPrice.md#currency)
- [lastUpdatedAt](TokenPrice.md#lastupdatedat)
- [value](TokenPrice.md#value)

## Properties

### currency

• **currency**: `string`

The currency the price is denominated in (e.g. 'usd').

#### Defined in

[src/types/prices-types.ts:56](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/prices-types.ts#L56)

___

### lastUpdatedAt

• **lastUpdatedAt**: `string`

ISO timestamp of when the price was last updated.

#### Defined in

[src/types/prices-types.ts:60](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/prices-types.ts#L60)

___

### value

• **value**: `string`

The price value as a string to preserve precision.

#### Defined in

[src/types/prices-types.ts:58](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/prices-types.ts#L58)
