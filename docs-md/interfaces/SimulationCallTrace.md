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

[src/types/types.ts:918](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L918)

___

### error

• `Optional` **error**: `string`

Optional error field.

#### Inherited from

Omit.error

#### Defined in

[src/types/types.ts:1433](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1433)

___

### from

• **from**: `string`

From address of the transaction.

#### Inherited from

Omit.from

#### Defined in

[src/types/types.ts:1419](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1419)

___

### gas

• **gas**: `string`

Gas provided for call as a hex string.

#### Inherited from

Omit.gas

#### Defined in

[src/types/types.ts:1425](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1425)

___

### gasUsed

• **gasUsed**: `string`

Gas used during the call as a hex string.

#### Inherited from

Omit.gasUsed

#### Defined in

[src/types/types.ts:1427](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1427)

___

### input

• **input**: `string`

Call data.

#### Inherited from

Omit.input

#### Defined in

[src/types/types.ts:1429](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1429)

___

### output

• **output**: `string`

Return data.

#### Inherited from

Omit.output

#### Defined in

[src/types/types.ts:1431](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1431)

___

### to

• **to**: `string`

To address of the transaction.

#### Inherited from

Omit.to

#### Defined in

[src/types/types.ts:1421](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1421)

___

### type

• **type**: [`DebugCallType`](../enums/DebugCallType.md)

The type of call.

#### Overrides

Omit.type

#### Defined in

[src/types/types.ts:916](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L916)

___

### value

• **value**: `string`

Amount of value transfer as a hex string.

#### Inherited from

Omit.value

#### Defined in

[src/types/types.ts:1423](https://github.com/alchemyplatform/alchemy-sdk-js/blob/277f926/src/types/types.ts#L1423)
