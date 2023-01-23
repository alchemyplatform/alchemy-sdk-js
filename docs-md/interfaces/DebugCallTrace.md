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

[src/types/types.ts:2033](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L2033)

___

### error

• `Optional` **error**: `string`

Optional error field.

#### Defined in

[src/types/types.ts:2029](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L2029)

___

### from

• **from**: `string`

From address of the transaction.

#### Defined in

[src/types/types.ts:2015](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L2015)

___

### gas

• **gas**: `string`

Gas provided for call as a hex string.

#### Defined in

[src/types/types.ts:2021](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L2021)

___

### gasUsed

• **gasUsed**: `string`

Gas used during the call as a hex string.

#### Defined in

[src/types/types.ts:2023](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L2023)

___

### input

• **input**: `string`

Call data.

#### Defined in

[src/types/types.ts:2025](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L2025)

___

### output

• **output**: `string`

Return data.

#### Defined in

[src/types/types.ts:2027](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L2027)

___

### revertReason

• `Optional` **revertReason**: `string`

Solidity revert reason, if the call reverted.

#### Defined in

[src/types/types.ts:2031](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L2031)

___

### to

• **to**: `string`

To address of the transaction.

#### Defined in

[src/types/types.ts:2017](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L2017)

___

### type

• **type**: `string`

The type of call: `CALL` or `CREATE` for the top-level call.

#### Defined in

[src/types/types.ts:2013](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L2013)

___

### value

• **value**: `string`

Amount of value transfer as a hex string.

#### Defined in

[src/types/types.ts:2019](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L2019)
