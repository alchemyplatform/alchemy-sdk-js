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

[src/types/types.ts:1974](https://github.com/alchemyplatform/alchemy-sdk-js/blob/aeb51c8/src/types/types.ts#L1974)

___

### error

• `Optional` **error**: `string`

Optional error field.

#### Inherited from

Omit.error

#### Defined in

[src/types/types.ts:2424](https://github.com/alchemyplatform/alchemy-sdk-js/blob/aeb51c8/src/types/types.ts#L2424)

___

### from

• **from**: `string`

From address of the transaction.

#### Inherited from

Omit.from

#### Defined in

[src/types/types.ts:2410](https://github.com/alchemyplatform/alchemy-sdk-js/blob/aeb51c8/src/types/types.ts#L2410)

___

### gas

• **gas**: `string`

Gas provided for call as a hex string.

#### Inherited from

Omit.gas

#### Defined in

[src/types/types.ts:2416](https://github.com/alchemyplatform/alchemy-sdk-js/blob/aeb51c8/src/types/types.ts#L2416)

___

### gasUsed

• **gasUsed**: `string`

Gas used during the call as a hex string.

#### Inherited from

Omit.gasUsed

#### Defined in

[src/types/types.ts:2418](https://github.com/alchemyplatform/alchemy-sdk-js/blob/aeb51c8/src/types/types.ts#L2418)

___

### input

• **input**: `string`

Call data.

#### Inherited from

Omit.input

#### Defined in

[src/types/types.ts:2420](https://github.com/alchemyplatform/alchemy-sdk-js/blob/aeb51c8/src/types/types.ts#L2420)

___

### output

• **output**: `string`

Return data.

#### Inherited from

Omit.output

#### Defined in

[src/types/types.ts:2422](https://github.com/alchemyplatform/alchemy-sdk-js/blob/aeb51c8/src/types/types.ts#L2422)

___

### to

• **to**: `string`

To address of the transaction.

#### Inherited from

Omit.to

#### Defined in

[src/types/types.ts:2412](https://github.com/alchemyplatform/alchemy-sdk-js/blob/aeb51c8/src/types/types.ts#L2412)

___

### type

• **type**: [`DebugCallType`](../enums/DebugCallType.md)

The type of call.

#### Overrides

Omit.type

#### Defined in

[src/types/types.ts:1972](https://github.com/alchemyplatform/alchemy-sdk-js/blob/aeb51c8/src/types/types.ts#L1972)

___

### value

• **value**: `string`

Amount of value transfer as a hex string.

#### Inherited from

Omit.value

#### Defined in

[src/types/types.ts:2414](https://github.com/alchemyplatform/alchemy-sdk-js/blob/aeb51c8/src/types/types.ts#L2414)
