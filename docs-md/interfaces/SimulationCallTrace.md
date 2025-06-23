[alchemy-sdk](../README.md) / [Exports](../modules.md) / SimulationCallTrace

# Interface: SimulationCallTrace

Debug call trace in a [SimulateExecutionResponse](SimulateExecutionResponse.md).

## Hierarchy

- `Omit`<[`DebugCallTrace`](DebugCallTrace.md), ``"revertReason"`` \| ``"calls"``\>

  ↳ **`SimulationCallTrace`**

## Table of contents

### Properties

- [decoded](SimulationCallTrace.md#decoded)
- [error](SimulationCallTrace.md#error)
- [from](SimulationCallTrace.md#from)
- [gas](SimulationCallTrace.md#gas)
- [gasUsed](SimulationCallTrace.md#gasused)
- [input](SimulationCallTrace.md#input)
- [output](SimulationCallTrace.md#output)
- [to](SimulationCallTrace.md#to)
- [type](SimulationCallTrace.md#type)
- [value](SimulationCallTrace.md#value)

## Properties

### decoded

• `Optional` **decoded**: [`DecodedDebugCallTrace`](DecodedDebugCallTrace.md)

A decoded version of the call. Provided on a best-effort basis.

#### Defined in

[src/types/types.ts:1036](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1036)

___

### error

• `Optional` **error**: `string`

Optional error field.

#### Inherited from

Omit.error

#### Defined in

[src/types/types.ts:1580](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1580)

___

### from

• **from**: `string`

From address of the transaction.

#### Inherited from

Omit.from

#### Defined in

[src/types/types.ts:1566](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1566)

___

### gas

• **gas**: `string`

Gas provided for call as a hex string.

#### Inherited from

Omit.gas

#### Defined in

[src/types/types.ts:1572](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1572)

___

### gasUsed

• **gasUsed**: `string`

Gas used during the call as a hex string.

#### Inherited from

Omit.gasUsed

#### Defined in

[src/types/types.ts:1574](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1574)

___

### input

• **input**: `string`

Call data.

#### Inherited from

Omit.input

#### Defined in

[src/types/types.ts:1576](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1576)

___

### output

• **output**: `string`

Return data.

#### Inherited from

Omit.output

#### Defined in

[src/types/types.ts:1578](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1578)

___

### to

• **to**: `string`

To address of the transaction.

#### Inherited from

Omit.to

#### Defined in

[src/types/types.ts:1568](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1568)

___

### type

• **type**: [`DebugCallType`](../enums/DebugCallType.md)

The type of call.

#### Overrides

Omit.type

#### Defined in

[src/types/types.ts:1034](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1034)

___

### value

• **value**: `string`

Amount of value transfer as a hex string.

#### Inherited from

Omit.value

#### Defined in

[src/types/types.ts:1570](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1570)
