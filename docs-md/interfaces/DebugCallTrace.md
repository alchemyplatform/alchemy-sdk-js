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

[src/types/types.ts:2591](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/types/types.ts#L2591)

___

### error

• `Optional` **error**: `string`

Optional error field.

#### Defined in

[src/types/types.ts:2587](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/types/types.ts#L2587)

___

### from

• **from**: `string`

From address of the transaction.

#### Defined in

[src/types/types.ts:2573](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/types/types.ts#L2573)

___

### gas

• **gas**: `string`

Gas provided for call as a hex string.

#### Defined in

[src/types/types.ts:2579](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/types/types.ts#L2579)

___

### gasUsed

• **gasUsed**: `string`

Gas used during the call as a hex string.

#### Defined in

[src/types/types.ts:2581](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/types/types.ts#L2581)

___

### input

• **input**: `string`

Call data.

#### Defined in

[src/types/types.ts:2583](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/types/types.ts#L2583)

___

### output

• **output**: `string`

Return data.

#### Defined in

[src/types/types.ts:2585](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/types/types.ts#L2585)

___

### revertReason

• `Optional` **revertReason**: `string`

Solidity revert reason, if the call reverted.

#### Defined in

[src/types/types.ts:2589](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/types/types.ts#L2589)

___

### to

• **to**: `string`

To address of the transaction.

#### Defined in

[src/types/types.ts:2575](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/types/types.ts#L2575)

___

### type

• **type**: `string`

The type of call: `CALL` or `CREATE` for the top-level call.

#### Defined in

[src/types/types.ts:2571](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/types/types.ts#L2571)

___

### value

• **value**: `string`

Amount of value transfer as a hex string.

#### Defined in

[src/types/types.ts:2577](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/types/types.ts#L2577)
