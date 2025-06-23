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

[src/types/types.ts:1584](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1584)

___

### error

• `Optional` **error**: `string`

Optional error field.

#### Defined in

[src/types/types.ts:1580](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1580)

___

### from

• **from**: `string`

From address of the transaction.

#### Defined in

[src/types/types.ts:1566](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1566)

___

### gas

• **gas**: `string`

Gas provided for call as a hex string.

#### Defined in

[src/types/types.ts:1572](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1572)

___

### gasUsed

• **gasUsed**: `string`

Gas used during the call as a hex string.

#### Defined in

[src/types/types.ts:1574](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1574)

___

### input

• **input**: `string`

Call data.

#### Defined in

[src/types/types.ts:1576](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1576)

___

### output

• **output**: `string`

Return data.

#### Defined in

[src/types/types.ts:1578](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1578)

___

### revertReason

• `Optional` **revertReason**: `string`

Solidity revert reason, if the call reverted.

#### Defined in

[src/types/types.ts:1582](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1582)

___

### to

• **to**: `string`

To address of the transaction.

#### Defined in

[src/types/types.ts:1568](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1568)

___

### type

• **type**: `string`

The type of call: `CALL` or `CREATE` for the top-level call.

#### Defined in

[src/types/types.ts:1564](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1564)

___

### value

• **value**: `string`

Amount of value transfer as a hex string.

#### Defined in

[src/types/types.ts:1570](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1570)
