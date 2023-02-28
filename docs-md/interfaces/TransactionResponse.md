[alchemy-sdk](../README.md) / [Exports](../modules.md) / TransactionResponse

# Interface: TransactionResponse

## Hierarchy

- `Transaction`

  ↳ **`TransactionResponse`**

## Table of contents

### Properties

- [accessList](TransactionResponse.md#accesslist)
- [blockHash](TransactionResponse.md#blockhash)
- [blockNumber](TransactionResponse.md#blocknumber)
- [chainId](TransactionResponse.md#chainid)
- [confirmations](TransactionResponse.md#confirmations)
- [data](TransactionResponse.md#data)
- [from](TransactionResponse.md#from)
- [gasLimit](TransactionResponse.md#gaslimit)
- [gasPrice](TransactionResponse.md#gasprice)
- [hash](TransactionResponse.md#hash)
- [maxFeePerGas](TransactionResponse.md#maxfeepergas)
- [maxPriorityFeePerGas](TransactionResponse.md#maxpriorityfeepergas)
- [nonce](TransactionResponse.md#nonce)
- [r](TransactionResponse.md#r)
- [raw](TransactionResponse.md#raw)
- [s](TransactionResponse.md#s)
- [timestamp](TransactionResponse.md#timestamp)
- [to](TransactionResponse.md#to)
- [type](TransactionResponse.md#type)
- [v](TransactionResponse.md#v)
- [value](TransactionResponse.md#value)

### Methods

- [wait](TransactionResponse.md#wait)

## Properties

### accessList

• `Optional` **accessList**: `AccessList`

#### Inherited from

Transaction.accessList

#### Defined in

node_modules/@ethersproject/transactions/lib/index.d.ts:40

___

### blockHash

• `Optional` **blockHash**: `string`

#### Defined in

node_modules/@ethersproject/abstract-provider/lib/index.d.ts:26

___

### blockNumber

• `Optional` **blockNumber**: `number`

#### Defined in

node_modules/@ethersproject/abstract-provider/lib/index.d.ts:25

___

### chainId

• **chainId**: `number`

#### Inherited from

Transaction.chainId

#### Defined in

node_modules/@ethersproject/transactions/lib/index.d.ts:35

___

### confirmations

• **confirmations**: `number`

#### Defined in

node_modules/@ethersproject/abstract-provider/lib/index.d.ts:28

___

### data

• **data**: `string`

#### Inherited from

Transaction.data

#### Defined in

node_modules/@ethersproject/transactions/lib/index.d.ts:33

___

### from

• **from**: `string`

#### Overrides

Transaction.from

#### Defined in

node_modules/@ethersproject/abstract-provider/lib/index.d.ts:29

___

### gasLimit

• **gasLimit**: [`BigNumber`](../classes/BigNumber.md)

#### Inherited from

Transaction.gasLimit

#### Defined in

node_modules/@ethersproject/transactions/lib/index.d.ts:31

___

### gasPrice

• `Optional` **gasPrice**: [`BigNumber`](../classes/BigNumber.md)

#### Inherited from

Transaction.gasPrice

#### Defined in

node_modules/@ethersproject/transactions/lib/index.d.ts:32

___

### hash

• **hash**: `string`

#### Overrides

Transaction.hash

#### Defined in

node_modules/@ethersproject/abstract-provider/lib/index.d.ts:24

___

### maxFeePerGas

• `Optional` **maxFeePerGas**: [`BigNumber`](../classes/BigNumber.md)

#### Inherited from

Transaction.maxFeePerGas

#### Defined in

node_modules/@ethersproject/transactions/lib/index.d.ts:42

___

### maxPriorityFeePerGas

• `Optional` **maxPriorityFeePerGas**: [`BigNumber`](../classes/BigNumber.md)

#### Inherited from

Transaction.maxPriorityFeePerGas

#### Defined in

node_modules/@ethersproject/transactions/lib/index.d.ts:41

___

### nonce

• **nonce**: `number`

#### Inherited from

Transaction.nonce

#### Defined in

node_modules/@ethersproject/transactions/lib/index.d.ts:30

___

### r

• `Optional` **r**: `string`

#### Inherited from

Transaction.r

#### Defined in

node_modules/@ethersproject/transactions/lib/index.d.ts:36

___

### raw

• `Optional` **raw**: `string`

#### Defined in

node_modules/@ethersproject/abstract-provider/lib/index.d.ts:30

___

### s

• `Optional` **s**: `string`

#### Inherited from

Transaction.s

#### Defined in

node_modules/@ethersproject/transactions/lib/index.d.ts:37

___

### timestamp

• `Optional` **timestamp**: `number`

#### Defined in

node_modules/@ethersproject/abstract-provider/lib/index.d.ts:27

___

### to

• `Optional` **to**: `string`

#### Inherited from

Transaction.to

#### Defined in

node_modules/@ethersproject/transactions/lib/index.d.ts:28

___

### type

• `Optional` **type**: ``null`` \| `number`

#### Inherited from

Transaction.type

#### Defined in

node_modules/@ethersproject/transactions/lib/index.d.ts:39

___

### v

• `Optional` **v**: `number`

#### Inherited from

Transaction.v

#### Defined in

node_modules/@ethersproject/transactions/lib/index.d.ts:38

___

### value

• **value**: [`BigNumber`](../classes/BigNumber.md)

#### Inherited from

Transaction.value

#### Defined in

node_modules/@ethersproject/transactions/lib/index.d.ts:34

## Methods

### wait

▸ **wait**(`confirmations?`): `Promise`<[`TransactionReceipt`](TransactionReceipt.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `confirmations?` | `number` |

#### Returns

`Promise`<[`TransactionReceipt`](TransactionReceipt.md)\>

#### Defined in

node_modules/@ethersproject/abstract-provider/lib/index.d.ts:31
