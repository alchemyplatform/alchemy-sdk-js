[alchemy-sdk](../README.md) / [Exports](../modules.md) / Wallet

# Class: Wallet

## Hierarchy

- `Wallet`

  ↳ **`Wallet`**

## Table of contents

### Constructors

- [constructor](Wallet.md#constructor)

### Properties

- [\_isSigner](Wallet.md#_issigner)
- [\_mnemonic](Wallet.md#_mnemonic)
- [\_signingKey](Wallet.md#_signingkey)
- [address](Wallet.md#address)
- [provider](Wallet.md#provider)

### Accessors

- [mnemonic](Wallet.md#mnemonic)
- [privateKey](Wallet.md#privatekey)
- [publicKey](Wallet.md#publickey)

### Methods

- [\_checkProvider](Wallet.md#_checkprovider)
- [\_signTypedData](Wallet.md#_signtypeddata)
- [call](Wallet.md#call)
- [checkTransaction](Wallet.md#checktransaction)
- [connect](Wallet.md#connect)
- [encrypt](Wallet.md#encrypt)
- [estimateGas](Wallet.md#estimategas)
- [getAddress](Wallet.md#getaddress)
- [getBalance](Wallet.md#getbalance)
- [getChainId](Wallet.md#getchainid)
- [getFeeData](Wallet.md#getfeedata)
- [getGasPrice](Wallet.md#getgasprice)
- [getTransactionCount](Wallet.md#gettransactioncount)
- [populateTransaction](Wallet.md#populatetransaction)
- [resolveName](Wallet.md#resolvename)
- [sendTransaction](Wallet.md#sendtransaction)
- [signMessage](Wallet.md#signmessage)
- [signTransaction](Wallet.md#signtransaction)
- [createRandom](Wallet.md#createrandom)
- [fromEncryptedJson](Wallet.md#fromencryptedjson)
- [fromEncryptedJsonSync](Wallet.md#fromencryptedjsonsync)
- [fromMnemonic](Wallet.md#frommnemonic)
- [isSigner](Wallet.md#issigner)

## Constructors

### constructor

• **new Wallet**(`privateKey`, `provider?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `BytesLike` \| `ExternallyOwnedAccount` \| `SigningKey` |
| `provider?` | `Provider` |

#### Inherited from

EthersWallet.constructor

#### Defined in

node_modules/@ethersproject/wallet/lib/index.d.ts:13

## Properties

### \_isSigner

• `Readonly` **\_isSigner**: `boolean`

#### Inherited from

EthersWallet.\_isSigner

#### Defined in

node_modules/@ethersproject/abstract-signer/lib/index.d.ts:29

___

### \_mnemonic

• `Readonly` **\_mnemonic**: () => `Mnemonic`

#### Type declaration

▸ (): `Mnemonic`

##### Returns

`Mnemonic`

#### Inherited from

EthersWallet.\_mnemonic

#### Defined in

node_modules/@ethersproject/wallet/lib/index.d.ts:12

___

### \_signingKey

• `Readonly` **\_signingKey**: () => `SigningKey`

#### Type declaration

▸ (): `SigningKey`

##### Returns

`SigningKey`

#### Inherited from

EthersWallet.\_signingKey

#### Defined in

node_modules/@ethersproject/wallet/lib/index.d.ts:11

___

### address

• `Readonly` **address**: `string`

#### Inherited from

EthersWallet.address

#### Defined in

node_modules/@ethersproject/wallet/lib/index.d.ts:9

___

### provider

• `Readonly` **provider**: `Provider`

#### Inherited from

EthersWallet.provider

#### Defined in

node_modules/@ethersproject/wallet/lib/index.d.ts:10

## Accessors

### mnemonic

• `get` **mnemonic**(): `Mnemonic`

#### Returns

`Mnemonic`

#### Inherited from

EthersWallet.mnemonic

#### Defined in

node_modules/@ethersproject/wallet/lib/index.d.ts:14

___

### privateKey

• `get` **privateKey**(): `string`

#### Returns

`string`

#### Inherited from

EthersWallet.privateKey

#### Defined in

node_modules/@ethersproject/wallet/lib/index.d.ts:15

___

### publicKey

• `get` **publicKey**(): `string`

#### Returns

`string`

#### Inherited from

EthersWallet.publicKey

#### Defined in

node_modules/@ethersproject/wallet/lib/index.d.ts:16

## Methods

### \_checkProvider

▸ **_checkProvider**(`operation?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operation?` | `string` |

#### Returns

`void`

#### Inherited from

EthersWallet.\_checkProvider

#### Defined in

node_modules/@ethersproject/abstract-signer/lib/index.d.ts:42

___

### \_signTypedData

▸ **_signTypedData**(`domain`, `types`, `value`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `TypedDataDomain` |
| `types` | `Record`<`string`, `TypedDataField`[]\> |
| `value` | `Record`<`string`, `any`\> |

#### Returns

`Promise`<`string`\>

#### Inherited from

EthersWallet.\_signTypedData

#### Defined in

node_modules/@ethersproject/wallet/lib/index.d.ts:21

___

### call

▸ **call**(`transaction`, `blockTag?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `Deferrable`<`TransactionRequest`\> |
| `blockTag?` | `BlockTag` |

#### Returns

`Promise`<`string`\>

#### Inherited from

EthersWallet.call

#### Defined in

node_modules/@ethersproject/abstract-signer/lib/index.d.ts:34

___

### checkTransaction

▸ **checkTransaction**(`transaction`): `Deferrable`<`TransactionRequest`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `Deferrable`<`TransactionRequest`\> |

#### Returns

`Deferrable`<`TransactionRequest`\>

#### Inherited from

EthersWallet.checkTransaction

#### Defined in

node_modules/@ethersproject/abstract-signer/lib/index.d.ts:40

___

### connect

▸ **connect**(`provider`): `Wallet`

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `Provider` |

#### Returns

`Wallet`

#### Inherited from

EthersWallet.connect

#### Defined in

node_modules/@ethersproject/wallet/lib/index.d.ts:18

___

### encrypt

▸ **encrypt**(`password`, `options?`, `progressCallback?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `password` | `string` \| `Bytes` |
| `options?` | `any` |
| `progressCallback?` | `ProgressCallback` |

#### Returns

`Promise`<`string`\>

#### Inherited from

EthersWallet.encrypt

#### Defined in

node_modules/@ethersproject/wallet/lib/index.d.ts:22

___

### estimateGas

▸ **estimateGas**(`transaction`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `Deferrable`<`TransactionRequest`\> |

#### Returns

`Promise`<`BigNumber`\>

#### Inherited from

EthersWallet.estimateGas

#### Defined in

node_modules/@ethersproject/abstract-signer/lib/index.d.ts:33

___

### getAddress

▸ **getAddress**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Inherited from

EthersWallet.getAddress

#### Defined in

node_modules/@ethersproject/wallet/lib/index.d.ts:17

___

### getBalance

▸ **getBalance**(`blockTag?`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockTag?` | `BlockTag` |

#### Returns

`Promise`<`BigNumber`\>

#### Inherited from

EthersWallet.getBalance

#### Defined in

node_modules/@ethersproject/abstract-signer/lib/index.d.ts:31

___

### getChainId

▸ **getChainId**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

#### Inherited from

EthersWallet.getChainId

#### Defined in

node_modules/@ethersproject/abstract-signer/lib/index.d.ts:36

___

### getFeeData

▸ **getFeeData**(): `Promise`<`FeeData`\>

#### Returns

`Promise`<`FeeData`\>

#### Inherited from

EthersWallet.getFeeData

#### Defined in

node_modules/@ethersproject/abstract-signer/lib/index.d.ts:38

___

### getGasPrice

▸ **getGasPrice**(): `Promise`<`BigNumber`\>

#### Returns

`Promise`<`BigNumber`\>

#### Inherited from

EthersWallet.getGasPrice

#### Defined in

node_modules/@ethersproject/abstract-signer/lib/index.d.ts:37

___

### getTransactionCount

▸ **getTransactionCount**(`blockTag?`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockTag?` | `BlockTag` |

#### Returns

`Promise`<`number`\>

#### Inherited from

EthersWallet.getTransactionCount

#### Defined in

node_modules/@ethersproject/abstract-signer/lib/index.d.ts:32

___

### populateTransaction

▸ **populateTransaction**(`transaction`): `Promise`<`TransactionRequest`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `Deferrable`<`TransactionRequest`\> |

#### Returns

`Promise`<`TransactionRequest`\>

#### Inherited from

EthersWallet.populateTransaction

#### Defined in

node_modules/@ethersproject/abstract-signer/lib/index.d.ts:41

___

### resolveName

▸ **resolveName**(`name`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

EthersWallet.resolveName

#### Defined in

node_modules/@ethersproject/abstract-signer/lib/index.d.ts:39

___

### sendTransaction

▸ **sendTransaction**(`transaction`): `Promise`<`TransactionResponse`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `Deferrable`<`TransactionRequest`\> |

#### Returns

`Promise`<`TransactionResponse`\>

#### Inherited from

EthersWallet.sendTransaction

#### Defined in

node_modules/@ethersproject/abstract-signer/lib/index.d.ts:35

___

### signMessage

▸ **signMessage**(`message`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` \| `Bytes` |

#### Returns

`Promise`<`string`\>

#### Inherited from

EthersWallet.signMessage

#### Defined in

node_modules/@ethersproject/wallet/lib/index.d.ts:20

___

### signTransaction

▸ **signTransaction**(`transaction`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `TransactionRequest` |

#### Returns

`Promise`<`string`\>

#### Inherited from

EthersWallet.signTransaction

#### Defined in

node_modules/@ethersproject/wallet/lib/index.d.ts:19

___

### createRandom

▸ `Static` **createRandom**(`options?`): `Wallet`

 Static methods to create Wallet instances.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `any` |

#### Returns

`Wallet`

#### Inherited from

EthersWallet.createRandom

#### Defined in

node_modules/@ethersproject/wallet/lib/index.d.ts:26

___

### fromEncryptedJson

▸ `Static` **fromEncryptedJson**(`json`, `password`, `progressCallback?`): `Promise`<`Wallet`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `string` |
| `password` | `string` \| `Bytes` |
| `progressCallback?` | `ProgressCallback` |

#### Returns

`Promise`<`Wallet`\>

#### Inherited from

EthersWallet.fromEncryptedJson

#### Defined in

node_modules/@ethersproject/wallet/lib/index.d.ts:27

___

### fromEncryptedJsonSync

▸ `Static` **fromEncryptedJsonSync**(`json`, `password`): `Wallet`

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `string` |
| `password` | `string` \| `Bytes` |

#### Returns

`Wallet`

#### Inherited from

EthersWallet.fromEncryptedJsonSync

#### Defined in

node_modules/@ethersproject/wallet/lib/index.d.ts:28

___

### fromMnemonic

▸ `Static` **fromMnemonic**(`mnemonic`, `path?`, `wordlist?`): `Wallet`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mnemonic` | `string` |
| `path?` | `string` |
| `wordlist?` | `Wordlist` |

#### Returns

`Wallet`

#### Inherited from

EthersWallet.fromMnemonic

#### Defined in

node_modules/@ethersproject/wallet/lib/index.d.ts:29

___

### isSigner

▸ `Static` **isSigner**(`value`): value is Signer

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is Signer

#### Inherited from

EthersWallet.isSigner

#### Defined in

node_modules/@ethersproject/abstract-signer/lib/index.d.ts:43
