[alchemy-sdk](../README.md) / [Exports](../modules.md) / Wallet

# Class: Wallet

The Wallet class inherits Signer and can sign transactions and messages using
a private key as a standard Externally Owned Account (EOA).

SDK's custom implementation of Ethers.js's 'Wallet'.

Primary difference from Ethers.js 'Wallet' is that you can pass in either a
Provider or an Alchemy object. This implementation will intelligently detect
the format and set the provider accordingly.

**`override`**

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
- [alchemyProviderPromise](Wallet.md#alchemyproviderpromise)
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
- [getWallet](Wallet.md#getwallet)
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

• **new Wallet**(`privateKey`, `alchemyOrProvider?`)

Overload permits users to pass in either a standard Provider or an Alchemy
object. The constructor will detect the object type and handle appropriately.

**`override`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `BytesLike` \| `ExternallyOwnedAccount` \| `SigningKey` |
| `alchemyOrProvider?` | [`Alchemy`](Alchemy.md) \| `Provider` |

#### Overrides

EthersWallet.constructor

#### Defined in

[src/api/alchemy-wallet.ts:39](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/api/alchemy-wallet.ts#L39)

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

### alchemyProviderPromise

• `Private` `Optional` **alchemyProviderPromise**: `Promise`<`Provider`\>

#### Defined in

[src/api/alchemy-wallet.ts:31](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/api/alchemy-wallet.ts#L31)

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

Returns the result of calling using the transactionRequest, with this
account address being used as the from field.

**`override`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transaction` | `Deferrable`<[`TransactionRequest`](../modules.md#transactionrequest)\> | To make a call on |
| `blockTag?` | [`BlockTag`](../modules.md#blocktag) | The block to make the call on |

#### Returns

`Promise`<`string`\>

#### Overrides

EthersWallet.call

#### Defined in

[src/api/alchemy-wallet.ts:102](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/api/alchemy-wallet.ts#L102)

___

### checkTransaction

▸ **checkTransaction**(`transaction`): `Deferrable`<[`TransactionRequest`](../modules.md#transactionrequest)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `Deferrable`<[`TransactionRequest`](../modules.md#transactionrequest)\> |

#### Returns

`Deferrable`<[`TransactionRequest`](../modules.md#transactionrequest)\>

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

▸ **estimateGas**(`transaction`): `Promise`<[`BigNumber`](BigNumber.md)\>

Returns the result of estimating the cost to send the transactionRequest,
with this account address being used as the from field.

**`override`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transaction` | `Deferrable`<[`TransactionRequest`](../modules.md#transactionrequest)\> | Transaction to estimate the gas on |

#### Returns

`Promise`<[`BigNumber`](BigNumber.md)\>

#### Overrides

EthersWallet.estimateGas

#### Defined in

[src/api/alchemy-wallet.ts:90](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/api/alchemy-wallet.ts#L90)

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

▸ **getBalance**(`blockTag?`): `Promise`<[`BigNumber`](BigNumber.md)\>

Returns the balance of this wallet at blockTag.

**`override`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockTag?` | [`BlockTag`](../modules.md#blocktag) | The block to check the balance of |

#### Returns

`Promise`<[`BigNumber`](BigNumber.md)\>

#### Overrides

EthersWallet.getBalance

#### Defined in

[src/api/alchemy-wallet.ts:66](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/api/alchemy-wallet.ts#L66)

___

### getChainId

▸ **getChainId**(): `Promise`<`number`\>

Returns the chain ID this wallet is connected to.

**`override`**

#### Returns

`Promise`<`number`\>

#### Overrides

EthersWallet.getChainId

#### Defined in

[src/api/alchemy-wallet.ts:142](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/api/alchemy-wallet.ts#L142)

___

### getFeeData

▸ **getFeeData**(): `Promise`<[`FeeData`](../interfaces/FeeData.md)\>

Returns the current recommended FeeData to use in a transaction.

For an EIP-1559 transaction, the maxFeePerGas and maxPriorityFeePerGas
should be used.

For legacy transactions and networks which do not support EIP-1559, the
gasPrice should be used.

**`override`**

#### Returns

`Promise`<[`FeeData`](../interfaces/FeeData.md)\>

#### Overrides

EthersWallet.getFeeData

#### Defined in

[src/api/alchemy-wallet.ts:166](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/api/alchemy-wallet.ts#L166)

___

### getGasPrice

▸ **getGasPrice**(): `Promise`<[`BigNumber`](BigNumber.md)\>

Returns the current gas price.

**`override`**

#### Returns

`Promise`<[`BigNumber`](BigNumber.md)\>

#### Overrides

EthersWallet.getGasPrice

#### Defined in

[src/api/alchemy-wallet.ts:151](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/api/alchemy-wallet.ts#L151)

___

### getTransactionCount

▸ **getTransactionCount**(`blockTag?`): `Promise`<`number`\>

Returns the number of transactions this account has ever sent. This is the
value required to be included in transactions as the nonce.

**`override`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockTag?` | [`BlockTag`](../modules.md#blocktag) | The block to check the transaction count on |

#### Returns

`Promise`<`number`\>

#### Overrides

EthersWallet.getTransactionCount

#### Defined in

[src/api/alchemy-wallet.ts:77](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/api/alchemy-wallet.ts#L77)

___

### getWallet

▸ `Private` **getWallet**(): `Promise`<`Wallet`\>

#### Returns

`Promise`<`Wallet`\>

#### Defined in

[src/api/alchemy-wallet.ts:182](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/api/alchemy-wallet.ts#L182)

___

### populateTransaction

▸ **populateTransaction**(`transaction`): `Promise`<[`TransactionRequest`](../modules.md#transactionrequest)\>

Populates ALL keys for a transaction and checks that `from` matches this
`Signer`. Resolves ENS names and populates fields like `gasPrice`, `gasLimit`,
`nonce`, and `chainId` if they are not provided.

**`override`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transaction` | `Deferrable`<[`TransactionRequest`](../modules.md#transactionrequest)\> | The transaction to populate. |

#### Returns

`Promise`<[`TransactionRequest`](../modules.md#transactionrequest)\>

#### Overrides

EthersWallet.populateTransaction

#### Defined in

[src/api/alchemy-wallet.ts:117](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/api/alchemy-wallet.ts#L117)

___

### resolveName

▸ **resolveName**(`name`): `Promise`<`string`\>

Looks up the address of name. If the name is not owned, or does not have a
Resolver configured, or the Resolver does not have an address configured,
null is returned.

**`override`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of the ENS address |

#### Returns

`Promise`<`string`\>

#### Overrides

EthersWallet.resolveName

#### Defined in

[src/api/alchemy-wallet.ts:178](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/api/alchemy-wallet.ts#L178)

___

### sendTransaction

▸ **sendTransaction**(`transaction`): `Promise`<[`TransactionResponse`](../interfaces/TransactionResponse.md)\>

Populates all fields in a transaction, signs it and sends it to the network

**`override`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transaction` | `Deferrable`<[`TransactionRequest`](../modules.md#transactionrequest)\> | The transaction to send. |

#### Returns

`Promise`<[`TransactionResponse`](../interfaces/TransactionResponse.md)\>

#### Overrides

EthersWallet.sendTransaction

#### Defined in

[src/api/alchemy-wallet.ts:131](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/api/alchemy-wallet.ts#L131)

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
| `transaction` | [`TransactionRequest`](../modules.md#transactionrequest) |

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
