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

[src/types/types.ts:2528](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L2528)

___

### error

• `Optional` **error**: `string`

Optional error field.

#### Defined in

[src/types/types.ts:2524](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L2524)

___

### from

• **from**: `string`

From address of the transaction.

#### Defined in

[src/types/types.ts:2510](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L2510)

___

### gas

• **gas**: `string`

Gas provided for call as a hex string.

#### Defined in

[src/types/types.ts:2516](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L2516)

___

### gasUsed

• **gasUsed**: `string`

Gas used during the call as a hex string.

#### Defined in

[src/types/types.ts:2518](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L2518)

___

### input

• **input**: `string`

Call data.

#### Defined in

[src/types/types.ts:2520](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L2520)

___

### output

• **output**: `string`

Return data.

#### Defined in

[src/types/types.ts:2522](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L2522)

___

### revertReason

• `Optional` **revertReason**: `string`

Solidity revert reason, if the call reverted.

#### Defined in

[src/types/types.ts:2526](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L2526)

___

### to

• **to**: `string`

To address of the transaction.

#### Defined in

[src/types/types.ts:2512](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L2512)

___

### type

• **type**: `string`

The type of call: `CALL` or `CREATE` for the top-level call.

#### Defined in

[src/types/types.ts:2508](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L2508)

___

### value

• **value**: `string`

Amount of value transfer as a hex string.

#### Defined in

[src/types/types.ts:2514](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/types/types.ts#L2514)
