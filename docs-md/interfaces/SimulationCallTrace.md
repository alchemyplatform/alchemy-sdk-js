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

[src/types/types.ts:972](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4e3af22/src/types/types.ts#L972)

___

### error

• `Optional` **error**: `string`

Optional error field.

#### Inherited from

Omit.error

#### Defined in

[src/types/types.ts:1506](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4e3af22/src/types/types.ts#L1506)

___

### from

• **from**: `string`

From address of the transaction.

#### Inherited from

Omit.from

#### Defined in

[src/types/types.ts:1492](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4e3af22/src/types/types.ts#L1492)

___

### gas

• **gas**: `string`

Gas provided for call as a hex string.

#### Inherited from

Omit.gas

#### Defined in

[src/types/types.ts:1498](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4e3af22/src/types/types.ts#L1498)

___

### gasUsed

• **gasUsed**: `string`

Gas used during the call as a hex string.

#### Inherited from

Omit.gasUsed

#### Defined in

[src/types/types.ts:1500](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4e3af22/src/types/types.ts#L1500)

___

### input

• **input**: `string`

Call data.

#### Inherited from

Omit.input

#### Defined in

[src/types/types.ts:1502](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4e3af22/src/types/types.ts#L1502)

___

### output

• **output**: `string`

Return data.

#### Inherited from

Omit.output

#### Defined in

[src/types/types.ts:1504](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4e3af22/src/types/types.ts#L1504)

___

### to

• **to**: `string`

To address of the transaction.

#### Inherited from

Omit.to

#### Defined in

[src/types/types.ts:1494](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4e3af22/src/types/types.ts#L1494)

___

### type

• **type**: [`DebugCallType`](../enums/DebugCallType.md)

The type of call.

#### Overrides

Omit.type

#### Defined in

[src/types/types.ts:970](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4e3af22/src/types/types.ts#L970)

___

### value

• **value**: `string`

Amount of value transfer as a hex string.

#### Inherited from

Omit.value

#### Defined in

[src/types/types.ts:1496](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4e3af22/src/types/types.ts#L1496)
