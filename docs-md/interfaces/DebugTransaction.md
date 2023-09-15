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

[src/types/types.ts:1316](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/types.ts#L1316)

___

### from

• `Optional` **from**: `string`

The address the transaction is sent from.

#### Defined in

[src/types/types.ts:1308](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/types.ts#L1308)

___

### gas

• `Optional` **gas**: `string`

The gas provided for the transaction execution, as a hex string.

#### Defined in

[src/types/types.ts:1310](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/types.ts#L1310)

___

### gasPrice

• `Optional` **gasPrice**: `string`

The gas price to use as a hex string.

#### Defined in

[src/types/types.ts:1312](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/types.ts#L1312)

___

### to

• `Optional` **to**: `string`

The address the transaction is directed to.

#### Defined in

[src/types/types.ts:1306](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/types.ts#L1306)

___

### value

• `Optional` **value**: `string`

The value associated with the transaction as a hex string.

#### Defined in

[src/types/types.ts:1314](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/types.ts#L1314)
