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

[src/types/types.ts:2594](https://github.com/alchemyplatform/alchemy-sdk-js/blob/432c999/src/types/types.ts#L2594)

___

### error

• `Optional` **error**: `string`

Optional error field.

#### Defined in

[src/types/types.ts:2590](https://github.com/alchemyplatform/alchemy-sdk-js/blob/432c999/src/types/types.ts#L2590)

___

### from

• **from**: `string`

From address of the transaction.

#### Defined in

[src/types/types.ts:2576](https://github.com/alchemyplatform/alchemy-sdk-js/blob/432c999/src/types/types.ts#L2576)

___

### gas

• **gas**: `string`

Gas provided for call as a hex string.

#### Defined in

[src/types/types.ts:2582](https://github.com/alchemyplatform/alchemy-sdk-js/blob/432c999/src/types/types.ts#L2582)

___

### gasUsed

• **gasUsed**: `string`

Gas used during the call as a hex string.

#### Defined in

[src/types/types.ts:2584](https://github.com/alchemyplatform/alchemy-sdk-js/blob/432c999/src/types/types.ts#L2584)

___

### input

• **input**: `string`

Call data.

#### Defined in

[src/types/types.ts:2586](https://github.com/alchemyplatform/alchemy-sdk-js/blob/432c999/src/types/types.ts#L2586)

___

### output

• **output**: `string`

Return data.

#### Defined in

[src/types/types.ts:2588](https://github.com/alchemyplatform/alchemy-sdk-js/blob/432c999/src/types/types.ts#L2588)

___

### revertReason

• `Optional` **revertReason**: `string`

Solidity revert reason, if the call reverted.

#### Defined in

[src/types/types.ts:2592](https://github.com/alchemyplatform/alchemy-sdk-js/blob/432c999/src/types/types.ts#L2592)

___

### to

• **to**: `string`

To address of the transaction.

#### Defined in

[src/types/types.ts:2578](https://github.com/alchemyplatform/alchemy-sdk-js/blob/432c999/src/types/types.ts#L2578)

___

### type

• **type**: `string`

The type of call: `CALL` or `CREATE` for the top-level call.

#### Defined in

[src/types/types.ts:2574](https://github.com/alchemyplatform/alchemy-sdk-js/blob/432c999/src/types/types.ts#L2574)

___

### value

• **value**: `string`

Amount of value transfer as a hex string.

#### Defined in

[src/types/types.ts:2580](https://github.com/alchemyplatform/alchemy-sdk-js/blob/432c999/src/types/types.ts#L2580)
