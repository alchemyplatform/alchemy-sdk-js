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

[src/types/types.ts:1437](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1437)

___

### error

• `Optional` **error**: `string`

Optional error field.

#### Defined in

[src/types/types.ts:1433](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1433)

___

### from

• **from**: `string`

From address of the transaction.

#### Defined in

[src/types/types.ts:1419](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1419)

___

### gas

• **gas**: `string`

Gas provided for call as a hex string.

#### Defined in

[src/types/types.ts:1425](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1425)

___

### gasUsed

• **gasUsed**: `string`

Gas used during the call as a hex string.

#### Defined in

[src/types/types.ts:1427](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1427)

___

### input

• **input**: `string`

Call data.

#### Defined in

[src/types/types.ts:1429](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1429)

___

### output

• **output**: `string`

Return data.

#### Defined in

[src/types/types.ts:1431](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1431)

___

### revertReason

• `Optional` **revertReason**: `string`

Solidity revert reason, if the call reverted.

#### Defined in

[src/types/types.ts:1435](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1435)

___

### to

• **to**: `string`

To address of the transaction.

#### Defined in

[src/types/types.ts:1421](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1421)

___

### type

• **type**: `string`

The type of call: `CALL` or `CREATE` for the top-level call.

#### Defined in

[src/types/types.ts:1417](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1417)

___

### value

• **value**: `string`

Amount of value transfer as a hex string.

#### Defined in

[src/types/types.ts:1423](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1423)
