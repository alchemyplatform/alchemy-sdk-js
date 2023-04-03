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

[src/types/types.ts:2505](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5fad342/src/types/types.ts#L2505)

___

### error

• `Optional` **error**: `string`

Optional error field.

#### Defined in

[src/types/types.ts:2501](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5fad342/src/types/types.ts#L2501)

___

### from

• **from**: `string`

From address of the transaction.

#### Defined in

[src/types/types.ts:2487](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5fad342/src/types/types.ts#L2487)

___

### gas

• **gas**: `string`

Gas provided for call as a hex string.

#### Defined in

[src/types/types.ts:2493](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5fad342/src/types/types.ts#L2493)

___

### gasUsed

• **gasUsed**: `string`

Gas used during the call as a hex string.

#### Defined in

[src/types/types.ts:2495](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5fad342/src/types/types.ts#L2495)

___

### input

• **input**: `string`

Call data.

#### Defined in

[src/types/types.ts:2497](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5fad342/src/types/types.ts#L2497)

___

### output

• **output**: `string`

Return data.

#### Defined in

[src/types/types.ts:2499](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5fad342/src/types/types.ts#L2499)

___

### revertReason

• `Optional` **revertReason**: `string`

Solidity revert reason, if the call reverted.

#### Defined in

[src/types/types.ts:2503](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5fad342/src/types/types.ts#L2503)

___

### to

• **to**: `string`

To address of the transaction.

#### Defined in

[src/types/types.ts:2489](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5fad342/src/types/types.ts#L2489)

___

### type

• **type**: `string`

The type of call: `CALL` or `CREATE` for the top-level call.

#### Defined in

[src/types/types.ts:2485](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5fad342/src/types/types.ts#L2485)

___

### value

• **value**: `string`

Amount of value transfer as a hex string.

#### Defined in

[src/types/types.ts:2491](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5fad342/src/types/types.ts#L2491)
