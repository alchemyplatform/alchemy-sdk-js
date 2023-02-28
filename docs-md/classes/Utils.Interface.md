[alchemy-sdk](../README.md) / [Exports](../modules.md) / [Utils](../modules/Utils.md) / Interface

# Class: Interface

[Utils](../modules/Utils.md).Interface

## Table of contents

### Constructors

- [constructor](Utils.Interface.md#constructor)

### Properties

- [\_abiCoder](Utils.Interface.md#_abicoder)
- [\_isInterface](Utils.Interface.md#_isinterface)
- [deploy](Utils.Interface.md#deploy)
- [errors](Utils.Interface.md#errors)
- [events](Utils.Interface.md#events)
- [fragments](Utils.Interface.md#fragments)
- [functions](Utils.Interface.md#functions)
- [structs](Utils.Interface.md#structs)

### Methods

- [\_decodeParams](Utils.Interface.md#_decodeparams)
- [\_encodeParams](Utils.Interface.md#_encodeparams)
- [decodeErrorResult](Utils.Interface.md#decodeerrorresult)
- [decodeEventLog](Utils.Interface.md#decodeeventlog)
- [decodeFunctionData](Utils.Interface.md#decodefunctiondata)
- [decodeFunctionResult](Utils.Interface.md#decodefunctionresult)
- [encodeDeploy](Utils.Interface.md#encodedeploy)
- [encodeErrorResult](Utils.Interface.md#encodeerrorresult)
- [encodeEventLog](Utils.Interface.md#encodeeventlog)
- [encodeFilterTopics](Utils.Interface.md#encodefiltertopics)
- [encodeFunctionData](Utils.Interface.md#encodefunctiondata)
- [encodeFunctionResult](Utils.Interface.md#encodefunctionresult)
- [format](Utils.Interface.md#format)
- [getError](Utils.Interface.md#geterror)
- [getEvent](Utils.Interface.md#getevent)
- [getEventTopic](Utils.Interface.md#geteventtopic)
- [getFunction](Utils.Interface.md#getfunction)
- [getSighash](Utils.Interface.md#getsighash)
- [parseError](Utils.Interface.md#parseerror)
- [parseLog](Utils.Interface.md#parselog)
- [parseTransaction](Utils.Interface.md#parsetransaction)
- [getAbiCoder](Utils.Interface.md#getabicoder)
- [getAddress](Utils.Interface.md#getaddress)
- [getEventTopic](Utils.Interface.md#geteventtopic-1)
- [getSighash](Utils.Interface.md#getsighash-1)
- [isInterface](Utils.Interface.md#isinterface)

## Constructors

### constructor

• **new Interface**(`fragments`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fragments` | `string` \| readonly (`string` \| `Fragment` \| `JsonFragment`)[] |

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:52

## Properties

### \_abiCoder

• `Readonly` **\_abiCoder**: `AbiCoder`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:50

___

### \_isInterface

• `Readonly` **\_isInterface**: `boolean`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:51

___

### deploy

• `Readonly` **deploy**: `ConstructorFragment`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:49

___

### errors

• `Readonly` **errors**: `Object`

#### Index signature

▪ [name: `string`]: `ErrorFragment`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:37

___

### events

• `Readonly` **events**: `Object`

#### Index signature

▪ [name: `string`]: `EventFragment`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:40

___

### fragments

• `Readonly` **fragments**: readonly `Fragment`[]

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:36

___

### functions

• `Readonly` **functions**: `Object`

#### Index signature

▪ [name: `string`]: `FunctionFragment`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:43

___

### structs

• `Readonly` **structs**: `Object`

#### Index signature

▪ [name: `string`]: `any`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:46

## Methods

### \_decodeParams

▸ **_decodeParams**(`params`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | readonly `ParamType`[] |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:63

___

### \_encodeParams

▸ **_encodeParams**(`params`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | readonly `ParamType`[] |
| `values` | readonly `any`[] |

#### Returns

`string`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:64

___

### decodeErrorResult

▸ **decodeErrorResult**(`fragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fragment` | `string` \| `ErrorFragment` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:66

___

### decodeEventLog

▸ **decodeEventLog**(`eventFragment`, `data`, `topics?`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFragment` | `string` \| `EventFragment` |
| `data` | `BytesLike` |
| `topics?` | readonly `string`[] |

#### Returns

`Result`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:77

___

### decodeFunctionData

▸ **decodeFunctionData**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | `string` \| `FunctionFragment` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:68

___

### decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `Result`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | `string` \| `FunctionFragment` |
| `data` | `BytesLike` |

#### Returns

`Result`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:70

___

### encodeDeploy

▸ **encodeDeploy**(`values?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `values?` | readonly `any`[] |

#### Returns

`string`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:65

___

### encodeErrorResult

▸ **encodeErrorResult**(`fragment`, `values?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fragment` | `string` \| `ErrorFragment` |
| `values?` | readonly `any`[] |

#### Returns

`string`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:67

___

### encodeEventLog

▸ **encodeEventLog**(`eventFragment`, `values`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFragment` | `string` \| `EventFragment` |
| `values` | readonly `any`[] |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `data` | `string` |
| `topics` | `string`[] |

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:73

___

### encodeFilterTopics

▸ **encodeFilterTopics**(`eventFragment`, `values`): (`string` \| `string`[])[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFragment` | `string` \| `EventFragment` |
| `values` | readonly `any`[] |

#### Returns

(`string` \| `string`[])[]

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:72

___

### encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | `string` \| `FunctionFragment` |
| `values?` | readonly `any`[] |

#### Returns

`string`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:69

___

### encodeFunctionResult

▸ **encodeFunctionResult**(`functionFragment`, `values?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | `string` \| `FunctionFragment` |
| `values?` | readonly `any`[] |

#### Returns

`string`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:71

___

### format

▸ **format**(`format?`): `string` \| `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `format?` | `string` |

#### Returns

`string` \| `string`[]

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:53

___

### getError

▸ **getError**(`nameOrSignatureOrSighash`): `ErrorFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrSighash` | `string` |

#### Returns

`ErrorFragment`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:60

___

### getEvent

▸ **getEvent**(`nameOrSignatureOrTopic`): `EventFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrTopic` | `string` |

#### Returns

`EventFragment`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:59

___

### getEventTopic

▸ **getEventTopic**(`eventFragment`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFragment` | `string` \| `EventFragment` |

#### Returns

`string`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:62

___

### getFunction

▸ **getFunction**(`nameOrSignatureOrSighash`): `FunctionFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrSighash` | `string` |

#### Returns

`FunctionFragment`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:58

___

### getSighash

▸ **getSighash**(`fragment`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fragment` | `string` \| `ErrorFragment` \| `FunctionFragment` |

#### Returns

`string`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:61

___

### parseError

▸ **parseError**(`data`): `ErrorDescription`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `BytesLike` |

#### Returns

`ErrorDescription`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:86

___

### parseLog

▸ **parseLog**(`log`): `LogDescription`

#### Parameters

| Name | Type |
| :------ | :------ |
| `log` | `Object` |
| `log.data` | `string` |
| `log.topics` | `string`[] |

#### Returns

`LogDescription`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:82

___

### parseTransaction

▸ **parseTransaction**(`tx`): `TransactionDescription`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `Object` |
| `tx.data` | `string` |
| `tx.value?` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`TransactionDescription`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:78

___

### getAbiCoder

▸ `Static` **getAbiCoder**(): `AbiCoder`

#### Returns

`AbiCoder`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:54

___

### getAddress

▸ `Static` **getAddress**(`address`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`string`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:55

___

### getEventTopic

▸ `Static` **getEventTopic**(`eventFragment`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFragment` | `EventFragment` |

#### Returns

`string`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:57

___

### getSighash

▸ `Static` **getSighash**(`fragment`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fragment` | `ErrorFragment` \| `FunctionFragment` |

#### Returns

`string`

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:56

___

### isInterface

▸ `Static` **isInterface**(`value`): value is Interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is Interface

#### Defined in

node_modules/@ethersproject/abi/lib/interface.d.ts:87
