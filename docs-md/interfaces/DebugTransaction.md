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

[src/types/types.ts:1464](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1464)

___

### from

• `Optional` **from**: `string`

The address the transaction is sent from.

#### Defined in

[src/types/types.ts:1456](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1456)

___

### gas

• `Optional` **gas**: `string`

The gas provided for the transaction execution, as a hex string.

#### Defined in

[src/types/types.ts:1458](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1458)

___

### gasPrice

• `Optional` **gasPrice**: `string`

The gas price to use as a hex string.

#### Defined in

[src/types/types.ts:1460](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1460)

___

### to

• `Optional` **to**: `string`

The address the transaction is directed to.

#### Defined in

[src/types/types.ts:1454](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1454)

___

### value

• `Optional` **value**: `string`

The value associated with the transaction as a hex string.

#### Defined in

[src/types/types.ts:1462](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/types.ts#L1462)
