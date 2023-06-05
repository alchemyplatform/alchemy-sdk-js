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

[src/types/types.ts:2575](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L2575)

___

### error

• `Optional` **error**: `string`

Optional error field.

#### Defined in

[src/types/types.ts:2571](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L2571)

___

### from

• **from**: `string`

From address of the transaction.

#### Defined in

[src/types/types.ts:2557](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L2557)

___

### gas

• **gas**: `string`

Gas provided for call as a hex string.

#### Defined in

[src/types/types.ts:2563](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L2563)

___

### gasUsed

• **gasUsed**: `string`

Gas used during the call as a hex string.

#### Defined in

[src/types/types.ts:2565](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L2565)

___

### input

• **input**: `string`

Call data.

#### Defined in

[src/types/types.ts:2567](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L2567)

___

### output

• **output**: `string`

Return data.

#### Defined in

[src/types/types.ts:2569](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L2569)

___

### revertReason

• `Optional` **revertReason**: `string`

Solidity revert reason, if the call reverted.

#### Defined in

[src/types/types.ts:2573](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L2573)

___

### to

• **to**: `string`

To address of the transaction.

#### Defined in

[src/types/types.ts:2559](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L2559)

___

### type

• **type**: `string`

The type of call: `CALL` or `CREATE` for the top-level call.

#### Defined in

[src/types/types.ts:2555](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L2555)

___

### value

• **value**: `string`

Amount of value transfer as a hex string.

#### Defined in

[src/types/types.ts:2561](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L2561)
