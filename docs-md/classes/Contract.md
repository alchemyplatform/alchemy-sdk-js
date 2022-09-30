[alchemy-sdk](../README.md) / [Exports](../modules.md) / Contract

# Class: Contract

The Contract class is a wrapper around the Contract class from ethers.js and
is exported here for convenience.

## Hierarchy

- `Contract`

  ↳ **`Contract`**

## Table of contents

### Constructors

- [constructor](Contract.md#constructor)

### Properties

- [\_deployedPromise](Contract.md#_deployedpromise)
- [\_runningEvents](Contract.md#_runningevents)
- [\_wrappedEmits](Contract.md#_wrappedemits)
- [address](Contract.md#address)
- [callStatic](Contract.md#callstatic)
- [deployTransaction](Contract.md#deploytransaction)
- [estimateGas](Contract.md#estimategas)
- [filters](Contract.md#filters)
- [functions](Contract.md#functions)
- [interface](Contract.md#interface)
- [populateTransaction](Contract.md#populatetransaction)
- [provider](Contract.md#provider)
- [resolvedAddress](Contract.md#resolvedaddress)
- [signer](Contract.md#signer)

### Methods

- [\_checkRunningEvents](Contract.md#_checkrunningevents)
- [\_deployed](Contract.md#_deployed)
- [\_wrapEvent](Contract.md#_wrapevent)
- [attach](Contract.md#attach)
- [connect](Contract.md#connect)
- [deployed](Contract.md#deployed)
- [emit](Contract.md#emit)
- [fallback](Contract.md#fallback)
- [listenerCount](Contract.md#listenercount)
- [listeners](Contract.md#listeners)
- [off](Contract.md#off)
- [on](Contract.md#on)
- [once](Contract.md#once)
- [queryFilter](Contract.md#queryfilter)
- [removeAllListeners](Contract.md#removealllisteners)
- [removeListener](Contract.md#removelistener)
- [getContractAddress](Contract.md#getcontractaddress)
- [getInterface](Contract.md#getinterface)
- [isIndexed](Contract.md#isindexed)

## Constructors

### constructor

• **new Contract**(`addressOrName`, `contractInterface`, `signerOrProvider?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressOrName` | `string` |
| `contractInterface` | `ContractInterface` |
| `signerOrProvider?` | `Signer` \| `Provider` |

#### Inherited from

EthersContract.constructor

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:107

## Properties

### \_deployedPromise

• **\_deployedPromise**: `Promise`<`Contract`\>

#### Inherited from

EthersContract.\_deployedPromise

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:100

___

### \_runningEvents

• **\_runningEvents**: `Object`

#### Index signature

▪ [eventTag: `string`]: `RunningEvent`

#### Inherited from

EthersContract.\_runningEvents

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:101

___

### \_wrappedEmits

• **\_wrappedEmits**: `Object`

#### Index signature

▪ [eventTag: `string`]: (...`args`: `any`[]) => `void`

#### Inherited from

EthersContract.\_wrappedEmits

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:104

___

### address

• `Readonly` **address**: `string`

#### Inherited from

EthersContract.address

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:79

___

### callStatic

• `Readonly` **callStatic**: `Object`

#### Index signature

▪ [name: `string`]: `ContractFunction`

#### Inherited from

EthersContract.callStatic

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:86

___

### deployTransaction

• `Readonly` **deployTransaction**: `TransactionResponse`

#### Inherited from

EthersContract.deployTransaction

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:99

___

### estimateGas

• `Readonly` **estimateGas**: `Object`

#### Index signature

▪ [name: `string`]: `ContractFunction`<`BigNumber`\>

#### Inherited from

EthersContract.estimateGas

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:89

___

### filters

• `Readonly` **filters**: `Object`

#### Index signature

▪ [name: `string`]: (...`args`: `any`[]) => `EventFilter`

#### Inherited from

EthersContract.filters

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:95

___

### functions

• `Readonly` **functions**: `Object`

#### Index signature

▪ [name: `string`]: `ContractFunction`

#### Inherited from

EthersContract.functions

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:83

___

### interface

• `Readonly` **interface**: `Interface`

#### Inherited from

EthersContract.interface

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:80

___

### populateTransaction

• `Readonly` **populateTransaction**: `Object`

#### Index signature

▪ [name: `string`]: `ContractFunction`<`PopulatedTransaction`\>

#### Inherited from

EthersContract.populateTransaction

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:92

___

### provider

• `Readonly` **provider**: `Provider`

#### Inherited from

EthersContract.provider

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:82

___

### resolvedAddress

• `Readonly` **resolvedAddress**: `Promise`<`string`\>

#### Inherited from

EthersContract.resolvedAddress

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:98

___

### signer

• `Readonly` **signer**: `Signer`

#### Inherited from

EthersContract.signer

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:81

## Methods

### \_checkRunningEvents

▸ **_checkRunningEvents**(`runningEvent`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `runningEvent` | `RunningEvent` |

#### Returns

`void`

#### Inherited from

EthersContract.\_checkRunningEvents

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:121

___

### \_deployed

▸ **_deployed**(`blockTag?`): `Promise`<`Contract`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockTag?` | `BlockTag` |

#### Returns

`Promise`<`Contract`\>

#### Inherited from

EthersContract.\_deployed

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:114

___

### \_wrapEvent

▸ **_wrapEvent**(`runningEvent`, `log`, `listener`): `Event`

#### Parameters

| Name | Type |
| :------ | :------ |
| `runningEvent` | `RunningEvent` |
| `log` | `Log` |
| `listener` | `Listener` |

#### Returns

`Event`

#### Inherited from

EthersContract.\_wrapEvent

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:122

___

### attach

▸ **attach**(`addressOrName`): `Contract`

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressOrName` | `string` |

#### Returns

`Contract`

#### Inherited from

EthersContract.attach

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:117

___

### connect

▸ **connect**(`signerOrProvider`): `Contract`

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerOrProvider` | `string` \| `Signer` \| `Provider` |

#### Returns

`Contract`

#### Inherited from

EthersContract.connect

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:116

___

### deployed

▸ **deployed**(): `Promise`<`Contract`\>

#### Returns

`Promise`<`Contract`\>

#### Inherited from

EthersContract.deployed

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:113

___

### emit

▸ **emit**(`eventName`, ...`args`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `EventFilter` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Inherited from

EthersContract.emit

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:127

___

### fallback

▸ **fallback**(`overrides?`): `Promise`<`TransactionResponse`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | `TransactionRequest` |

#### Returns

`Promise`<`TransactionResponse`\>

#### Inherited from

EthersContract.fallback

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:115

___

### listenerCount

▸ **listenerCount**(`eventName?`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName?` | `string` \| `EventFilter` |

#### Returns

`number`

#### Inherited from

EthersContract.listenerCount

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:128

___

### listeners

▸ **listeners**(`eventName?`): `Listener`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName?` | `string` \| `EventFilter` |

#### Returns

`Listener`[]

#### Inherited from

EthersContract.listeners

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:129

___

### off

▸ **off**(`eventName`, `listener`): [`Contract`](Contract.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `EventFilter` |
| `listener` | `Listener` |

#### Returns

[`Contract`](Contract.md)

#### Inherited from

EthersContract.off

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:131

___

### on

▸ **on**(`event`, `listener`): [`Contract`](Contract.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `EventFilter` |
| `listener` | `Listener` |

#### Returns

[`Contract`](Contract.md)

#### Inherited from

EthersContract.on

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:125

___

### once

▸ **once**(`event`, `listener`): [`Contract`](Contract.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `EventFilter` |
| `listener` | `Listener` |

#### Returns

[`Contract`](Contract.md)

#### Inherited from

EthersContract.once

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:126

___

### queryFilter

▸ **queryFilter**(`event`, `fromBlockOrBlockhash?`, `toBlock?`): `Promise`<`Event`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `EventFilter` |
| `fromBlockOrBlockhash?` | `BlockTag` |
| `toBlock?` | `BlockTag` |

#### Returns

`Promise`<`Event`[]\>

#### Inherited from

EthersContract.queryFilter

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:124

___

### removeAllListeners

▸ **removeAllListeners**(`eventName?`): [`Contract`](Contract.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName?` | `string` \| `EventFilter` |

#### Returns

[`Contract`](Contract.md)

#### Inherited from

EthersContract.removeAllListeners

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:130

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`Contract`](Contract.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `EventFilter` |
| `listener` | `Listener` |

#### Returns

[`Contract`](Contract.md)

#### Inherited from

EthersContract.removeListener

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:132

___

### getContractAddress

▸ `Static` **getContractAddress**(`transaction`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `Object` |
| `transaction.from` | `string` |
| `transaction.nonce` | `BigNumberish` |

#### Returns

`string`

#### Inherited from

EthersContract.getContractAddress

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:108

___

### getInterface

▸ `Static` **getInterface**(`contractInterface`): `Interface`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractInterface` | `ContractInterface` |

#### Returns

`Interface`

#### Inherited from

EthersContract.getInterface

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:112

___

### isIndexed

▸ `Static` **isIndexed**(`value`): value is Indexed

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is Indexed

#### Inherited from

EthersContract.isIndexed

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:118
