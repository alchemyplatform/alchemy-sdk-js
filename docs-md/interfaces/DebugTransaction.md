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

[src/types/types.ts:2316](https://github.com/alchemyplatform/alchemy-sdk-js/blob/340ad5a/src/types/types.ts#L2316)

___

### from

• `Optional` **from**: `string`

The address the transaction is sent from.

#### Defined in

[src/types/types.ts:2308](https://github.com/alchemyplatform/alchemy-sdk-js/blob/340ad5a/src/types/types.ts#L2308)

___

### gas

• `Optional` **gas**: `string`

The gas provided for the transaction execution, as a hex string.

#### Defined in

[src/types/types.ts:2310](https://github.com/alchemyplatform/alchemy-sdk-js/blob/340ad5a/src/types/types.ts#L2310)

___

### gasPrice

• `Optional` **gasPrice**: `string`

The gas price to use as a hex string.

#### Defined in

[src/types/types.ts:2312](https://github.com/alchemyplatform/alchemy-sdk-js/blob/340ad5a/src/types/types.ts#L2312)

___

### to

• `Optional` **to**: `string`

The address the transaction is directed to.

#### Defined in

[src/types/types.ts:2306](https://github.com/alchemyplatform/alchemy-sdk-js/blob/340ad5a/src/types/types.ts#L2306)

___

### value

• `Optional` **value**: `string`

The value associated with the transaction as a hex string.

#### Defined in

[src/types/types.ts:2314](https://github.com/alchemyplatform/alchemy-sdk-js/blob/340ad5a/src/types/types.ts#L2314)
