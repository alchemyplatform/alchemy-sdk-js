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

[src/types/types.ts:2478](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7bf2430/src/types/types.ts#L2478)

___

### error

• `Optional` **error**: `string`

Optional error field.

#### Defined in

[src/types/types.ts:2474](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7bf2430/src/types/types.ts#L2474)

___

### from

• **from**: `string`

From address of the transaction.

#### Defined in

[src/types/types.ts:2460](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7bf2430/src/types/types.ts#L2460)

___

### gas

• **gas**: `string`

Gas provided for call as a hex string.

#### Defined in

[src/types/types.ts:2466](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7bf2430/src/types/types.ts#L2466)

___

### gasUsed

• **gasUsed**: `string`

Gas used during the call as a hex string.

#### Defined in

[src/types/types.ts:2468](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7bf2430/src/types/types.ts#L2468)

___

### input

• **input**: `string`

Call data.

#### Defined in

[src/types/types.ts:2470](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7bf2430/src/types/types.ts#L2470)

___

### output

• **output**: `string`

Return data.

#### Defined in

[src/types/types.ts:2472](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7bf2430/src/types/types.ts#L2472)

___

### revertReason

• `Optional` **revertReason**: `string`

Solidity revert reason, if the call reverted.

#### Defined in

[src/types/types.ts:2476](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7bf2430/src/types/types.ts#L2476)

___

### to

• **to**: `string`

To address of the transaction.

#### Defined in

[src/types/types.ts:2462](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7bf2430/src/types/types.ts#L2462)

___

### type

• **type**: `string`

The type of call: `CALL` or `CREATE` for the top-level call.

#### Defined in

[src/types/types.ts:2458](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7bf2430/src/types/types.ts#L2458)

___

### value

• **value**: `string`

Amount of value transfer as a hex string.

#### Defined in

[src/types/types.ts:2464](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7bf2430/src/types/types.ts#L2464)
