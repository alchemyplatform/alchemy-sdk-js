[alchemy-sdk](../README.md) / [Exports](../modules.md) / ContractFactory

# Class: ContractFactory

The ContractFactory class is a wrapper around the ContractFactory class from
ethers.js and is exported here for convenience.

## Hierarchy

- `ContractFactory`

  ↳ **`ContractFactory`**

## Table of contents

### Constructors

- [constructor](ContractFactory.md#constructor)

### Properties

- [bytecode](ContractFactory.md#bytecode)
- [interface](ContractFactory.md#interface)
- [signer](ContractFactory.md#signer)

### Methods

- [attach](ContractFactory.md#attach)
- [connect](ContractFactory.md#connect)
- [deploy](ContractFactory.md#deploy)
- [getDeployTransaction](ContractFactory.md#getdeploytransaction)
- [fromSolidity](ContractFactory.md#fromsolidity)
- [getContract](ContractFactory.md#getcontract)
- [getContractAddress](ContractFactory.md#getcontractaddress)
- [getInterface](ContractFactory.md#getinterface)

## Constructors

### constructor

• **new ContractFactory**(`contractInterface`, `bytecode`, `signer?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractInterface` | `ContractInterface` |
| `bytecode` | `BytesLike` \| { `object`: `string`  } |
| `signer?` | `Signer` |

#### Inherited from

EthersContractFactory.constructor

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:141

## Properties

### bytecode

• `Readonly` **bytecode**: `string`

#### Inherited from

EthersContractFactory.bytecode

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:139

___

### interface

• `Readonly` **interface**: `Interface`

#### Inherited from

EthersContractFactory.interface

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:138

___

### signer

• `Readonly` **signer**: `Signer`

#### Inherited from

EthersContractFactory.signer

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:140

## Methods

### attach

▸ **attach**(`address`): `Contract`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Contract`

#### Inherited from

EthersContractFactory.attach

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:146

___

### connect

▸ **connect**(`signer`): `ContractFactory`

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `Signer` |

#### Returns

`ContractFactory`

#### Inherited from

EthersContractFactory.connect

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:147

___

### deploy

▸ **deploy**(...`args`): `Promise`<`Contract`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`Promise`<`Contract`\>

#### Inherited from

EthersContractFactory.deploy

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:145

___

### getDeployTransaction

▸ **getDeployTransaction**(...`args`): `TransactionRequest`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`TransactionRequest`

#### Inherited from

EthersContractFactory.getDeployTransaction

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:144

___

### fromSolidity

▸ `Static` **fromSolidity**(`compilerOutput`, `signer?`): `ContractFactory`

#### Parameters

| Name | Type |
| :------ | :------ |
| `compilerOutput` | `any` |
| `signer?` | `Signer` |

#### Returns

`ContractFactory`

#### Inherited from

EthersContractFactory.fromSolidity

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:148

___

### getContract

▸ `Static` **getContract**(`address`, `contractInterface`, `signer?`): `Contract`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `contractInterface` | `ContractInterface` |
| `signer?` | `Signer` |

#### Returns

`Contract`

#### Inherited from

EthersContractFactory.getContract

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:154

___

### getContractAddress

▸ `Static` **getContractAddress**(`tx`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `Object` |
| `tx.from` | `string` |
| `tx.nonce` | `number` \| `BytesLike` \| `BigNumber` |

#### Returns

`string`

#### Inherited from

EthersContractFactory.getContractAddress

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:150

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

EthersContractFactory.getInterface

#### Defined in

node_modules/@ethersproject/contracts/lib/index.d.ts:149
