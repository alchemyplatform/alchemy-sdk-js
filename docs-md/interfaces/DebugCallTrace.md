[alchemy-sdk](../README.md) / [Exports](../modules.md) / DebugCallTrace

# Interface: DebugCallTrace

Debug result returned when using a [DebugCallTracer](DebugCallTracer.md).

## Table of contents

### Properties

- [calls](DebugCallTrace.md#calls)
- [error](DebugCallTrace.md#error)
- [from](DebugCallTrace.md#from)
- [gas](DebugCallTrace.md#gas)
- [gasUsed](DebugCallTrace.md#gasused)
- [input](DebugCallTrace.md#input)
- [output](DebugCallTrace.md#output)
- [revertReason](DebugCallTrace.md#revertreason)
- [to](DebugCallTrace.md#to)
- [type](DebugCallTrace.md#type)
- [value](DebugCallTrace.md#value)

## Properties

### calls

• `Optional` **calls**: [`DebugCallTrace`](DebugCallTrace.md)[]

Array of sub-calls executed as part of the original call.

#### Defined in

[src/types/types.ts:1436](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/types.ts#L1436)

___

### error

• `Optional` **error**: `string`

Optional error field.

#### Defined in

[src/types/types.ts:1432](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/types.ts#L1432)

___

### from

• **from**: `string`

From address of the transaction.

#### Defined in

[src/types/types.ts:1418](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/types.ts#L1418)

___

### gas

• **gas**: `string`

Gas provided for call as a hex string.

#### Defined in

[src/types/types.ts:1424](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/types.ts#L1424)

___

### gasUsed

• **gasUsed**: `string`

Gas used during the call as a hex string.

#### Defined in

[src/types/types.ts:1426](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/types.ts#L1426)

___

### input

• **input**: `string`

Call data.

#### Defined in

[src/types/types.ts:1428](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/types.ts#L1428)

___

### output

• **output**: `string`

Return data.

#### Defined in

[src/types/types.ts:1430](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/types.ts#L1430)

___

### revertReason

• `Optional` **revertReason**: `string`

Solidity revert reason, if the call reverted.

#### Defined in

[src/types/types.ts:1434](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/types.ts#L1434)

___

### to

• **to**: `string`

To address of the transaction.

#### Defined in

[src/types/types.ts:1420](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/types.ts#L1420)

___

### type

• **type**: `string`

The type of call: `CALL` or `CREATE` for the top-level call.

#### Defined in

[src/types/types.ts:1416](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/types.ts#L1416)

___

### value

• **value**: `string`

Amount of value transfer as a hex string.

#### Defined in

[src/types/types.ts:1422](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/types.ts#L1422)
