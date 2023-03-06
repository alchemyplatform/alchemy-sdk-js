[alchemy-sdk](../README.md) / [Exports](../modules.md) / DebugTransaction

# Interface: DebugTransaction

Transaction object used in [DebugNamespace.traceCall](../classes/DebugNamespace.md#tracecall), [TransactNamespace.simulateAssetChanges](../classes/TransactNamespace.md#simulateassetchanges) and [TransactNamespace.simulateExecution](../classes/TransactNamespace.md#simulateexecution).

## Table of contents

### Properties

- [data](DebugTransaction.md#data)
- [from](DebugTransaction.md#from)
- [gas](DebugTransaction.md#gas)
- [gasPrice](DebugTransaction.md#gasprice)
- [to](DebugTransaction.md#to)
- [value](DebugTransaction.md#value)

## Properties

### data

• `Optional` **data**: `string`

The data associated with the transaction.

#### Defined in

[src/types/types.ts:2358](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7bf2430/src/types/types.ts#L2358)

___

### from

• `Optional` **from**: `string`

The address the transaction is sent from.

#### Defined in

[src/types/types.ts:2350](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7bf2430/src/types/types.ts#L2350)

___

### gas

• `Optional` **gas**: `string`

The gas provided for the transaction execution, as a hex string.

#### Defined in

[src/types/types.ts:2352](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7bf2430/src/types/types.ts#L2352)

___

### gasPrice

• `Optional` **gasPrice**: `string`

The gas price to use as a hex string.

#### Defined in

[src/types/types.ts:2354](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7bf2430/src/types/types.ts#L2354)

___

### to

• `Optional` **to**: `string`

The address the transaction is directed to.

#### Defined in

[src/types/types.ts:2348](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7bf2430/src/types/types.ts#L2348)

___

### value

• `Optional` **value**: `string`

The value associated with the transaction as a hex string.

#### Defined in

[src/types/types.ts:2356](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7bf2430/src/types/types.ts#L2356)
