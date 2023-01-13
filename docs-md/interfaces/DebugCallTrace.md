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

[src/types/types.ts:1990](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1990)

___

### error

• `Optional` **error**: `string`

Optional error field.

#### Defined in

[src/types/types.ts:1986](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1986)

___

### from

• **from**: `string`

From address of the transaction.

#### Defined in

[src/types/types.ts:1972](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1972)

___

### gas

• **gas**: `string`

Gas provided for call as a hex string.

#### Defined in

[src/types/types.ts:1978](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1978)

___

### gasUsed

• **gasUsed**: `string`

Gas used during the call as a hex string.

#### Defined in

[src/types/types.ts:1980](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1980)

___

### input

• **input**: `string`

Call data.

#### Defined in

[src/types/types.ts:1982](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1982)

___

### output

• **output**: `string`

Return data.

#### Defined in

[src/types/types.ts:1984](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1984)

___

### revertReason

• `Optional` **revertReason**: `string`

Solidity revert reason, if the call reverted.

#### Defined in

[src/types/types.ts:1988](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1988)

___

### to

• **to**: `string`

To address of the transaction.

#### Defined in

[src/types/types.ts:1974](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1974)

___

### type

• **type**: `string`

The type of call: `CALL` or `CREATE` for the top-level call.

#### Defined in

[src/types/types.ts:1970](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1970)

___

### value

• **value**: `string`

Amount of value transfer as a hex string.

#### Defined in

[src/types/types.ts:1976](https://github.com/alchemyplatform/alchemy-sdk-js/blob/0c05b32/src/types/types.ts#L1976)
