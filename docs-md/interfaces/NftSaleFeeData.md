[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftSaleFeeData

# Interface: NftSaleFeeData

Fee detail for an NFT sale.

## Table of contents

### Properties

- [amount](NftSaleFeeData.md#amount)
- [decimal](NftSaleFeeData.md#decimal)
- [decimals](NftSaleFeeData.md#decimals)
- [symbol](NftSaleFeeData.md#symbol)

## Properties

### amount

• **amount**: `string`

The fee payment amount as a decimal integer string.

#### Defined in

[src/types/types.ts:1329](https://github.com/alchemyplatform/alchemy-sdk-js/blob/46e9716/src/types/types.ts#L1329)

___

### decimal

• **decimal**: `number`

The number of decimals of the token used for the payment.

**`deprecated`** Please use `decimals` instead. This field contains a typo
and will always be undefined. It's been marked as deprecated to avoid
breaking changes.

#### Defined in

[src/types/types.ts:1340](https://github.com/alchemyplatform/alchemy-sdk-js/blob/46e9716/src/types/types.ts#L1340)

___

### decimals

• **decimals**: `number`

The number of decimals of the token used for the payment.

#### Defined in

[src/types/types.ts:1343](https://github.com/alchemyplatform/alchemy-sdk-js/blob/46e9716/src/types/types.ts#L1343)

___

### symbol

• **symbol**: `string`

The symbol of the token used for the payment.

#### Defined in

[src/types/types.ts:1332](https://github.com/alchemyplatform/alchemy-sdk-js/blob/46e9716/src/types/types.ts#L1332)
