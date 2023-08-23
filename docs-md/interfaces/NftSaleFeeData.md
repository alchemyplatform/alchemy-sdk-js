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

[src/types/types.ts:1334](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/types/types.ts#L1334)

___

### decimal

• **decimal**: `number`

The number of decimals of the token used for the payment.

**`deprecated`** Please use `decimals` instead. This field contains a typo
and will always be undefined. It's been marked as deprecated to avoid
breaking changes.

#### Defined in

[src/types/types.ts:1345](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/types/types.ts#L1345)

___

### decimals

• **decimals**: `number`

The number of decimals of the token used for the payment.

#### Defined in

[src/types/types.ts:1348](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/types/types.ts#L1348)

___

### symbol

• **symbol**: `string`

The symbol of the token used for the payment.

#### Defined in

[src/types/types.ts:1337](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/types/types.ts#L1337)
