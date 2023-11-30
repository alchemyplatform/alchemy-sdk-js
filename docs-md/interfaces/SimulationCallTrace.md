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

[src/types/types.ts:2075](https://github.com/alchemyplatform/alchemy-sdk-js/blob/432c999/src/types/types.ts#L2075)

___

### error

• `Optional` **error**: `string`

Optional error field.

#### Inherited from

Omit.error

#### Defined in

[src/types/types.ts:2590](https://github.com/alchemyplatform/alchemy-sdk-js/blob/432c999/src/types/types.ts#L2590)

___

### from

• **from**: `string`

From address of the transaction.

#### Inherited from

Omit.from

#### Defined in

[src/types/types.ts:2576](https://github.com/alchemyplatform/alchemy-sdk-js/blob/432c999/src/types/types.ts#L2576)

___

### gas

• **gas**: `string`

Gas provided for call as a hex string.

#### Inherited from

Omit.gas

#### Defined in

[src/types/types.ts:2582](https://github.com/alchemyplatform/alchemy-sdk-js/blob/432c999/src/types/types.ts#L2582)

___

### gasUsed

• **gasUsed**: `string`

Gas used during the call as a hex string.

#### Inherited from

Omit.gasUsed

#### Defined in

[src/types/types.ts:2584](https://github.com/alchemyplatform/alchemy-sdk-js/blob/432c999/src/types/types.ts#L2584)

___

### input

• **input**: `string`

Call data.

#### Inherited from

Omit.input

#### Defined in

[src/types/types.ts:2586](https://github.com/alchemyplatform/alchemy-sdk-js/blob/432c999/src/types/types.ts#L2586)

___

### output

• **output**: `string`

Return data.

#### Inherited from

Omit.output

#### Defined in

[src/types/types.ts:2588](https://github.com/alchemyplatform/alchemy-sdk-js/blob/432c999/src/types/types.ts#L2588)

___

### to

• **to**: `string`

To address of the transaction.

#### Inherited from

Omit.to

#### Defined in

[src/types/types.ts:2578](https://github.com/alchemyplatform/alchemy-sdk-js/blob/432c999/src/types/types.ts#L2578)

___

### type

• **type**: [`DebugCallType`](../enums/DebugCallType.md)

The type of call.

#### Overrides

Omit.type

#### Defined in

[src/types/types.ts:2073](https://github.com/alchemyplatform/alchemy-sdk-js/blob/432c999/src/types/types.ts#L2073)

___

### value

• **value**: `string`

Amount of value transfer as a hex string.

#### Inherited from

Omit.value

#### Defined in

[src/types/types.ts:2580](https://github.com/alchemyplatform/alchemy-sdk-js/blob/432c999/src/types/types.ts#L2580)
