[alchemy-sdk](../README.md) / [Exports](../modules.md) / TransactNamespace

# Class: TransactNamespace

The Transact namespace contains methods used for sending transactions and
checking on the state of submitted transactions.

Do not call this constructor directly. Instead, instantiate an Alchemy object
with `const alchemy = new Alchemy(config)` and then access the core namespace
via `alchemy.transact`.

## Table of contents

### Methods

- [cancelPrivateTransaction](TransactNamespace.md#cancelprivatetransaction)
- [getTransaction](TransactNamespace.md#gettransaction)
- [sendPrivateTransaction](TransactNamespace.md#sendprivatetransaction)
- [sendTransaction](TransactNamespace.md#sendtransaction)
- [waitForTransaction](TransactNamespace.md#waitfortransaction)

## Methods

### cancelPrivateTransaction

▸ **cancelPrivateTransaction**(`transactionHash`): `Promise`<`boolean`\>

Stops the provided private transaction from being submitted for future
blocks. A transaction can only be cancelled if the request is signed by the
same key as the [sendPrivateTransaction](TransactNamespace.md#sendprivatetransaction) call submitting the
transaction in first place.

Please note that fast mode transactions cannot be cancelled using this method.

Returns a boolean indicating whether the cancellation was successful.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionHash` | `string` | Transaction hash of private tx to be cancelled |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/api/transact-namespace.ts:64](https://github.com/alchemyplatform/alchemy-sdk-js/blob/145ea50/src/api/transact-namespace.ts#L64)

___

### getTransaction

▸ **getTransaction**(`transactionHash`): `Promise`<``null`` \| `TransactionResponse`\>

Returns the transaction with hash or null if the transaction is unknown.

If a transaction has not been mined, this method will search the
transaction pool. Various backends may have more restrictive transaction
pool access (e.g. if the gas price is too low or the transaction was only
recently sent and not yet indexed) in which case this method may also return null.

NOTE: This is an alias for [CoreNamespace.getTransaction](CoreNamespace.md#gettransaction).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionHash` | `string` \| `Promise`<`string`\> | The hash of the transaction to get. |

#### Returns

`Promise`<``null`` \| `TransactionResponse`\>

#### Defined in

[src/api/transact-namespace.ts:90](https://github.com/alchemyplatform/alchemy-sdk-js/blob/145ea50/src/api/transact-namespace.ts#L90)

___

### sendPrivateTransaction

▸ **sendPrivateTransaction**(`signedTransaction`, `maxBlockNumber?`, `options?`): `Promise`<`string`\>

Used to send a single transaction to Flashbots. Flashbots will attempt to
send the transaction to miners for the next 25 blocks.

Returns the transaction hash of the submitted transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signedTransaction` | `string` | The raw, signed transaction as a hash. |
| `maxBlockNumber?` | `number` | Optional hex-encoded number string. Highest block   number in which the transaction should be included. |
| `options?` | [`SendPrivateTransactionOptions`](../interfaces/SendPrivateTransactionOptions.md) | Options to configure the request. |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/api/transact-namespace.ts:32](https://github.com/alchemyplatform/alchemy-sdk-js/blob/145ea50/src/api/transact-namespace.ts#L32)

___

### sendTransaction

▸ **sendTransaction**(`signedTransaction`): `Promise`<`TransactionResponse`\>

Submits transaction to the network to be mined. The transaction must be
signed, and be valid (i.e. the nonce is correct and the account has
sufficient balance to pay for the transaction).

NOTE: This is an alias for [CoreNamespace.sendTransaction](CoreNamespace.md#sendtransaction).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signedTransaction` | `string` \| `Promise`<`string`\> | The signed transaction to send. |

#### Returns

`Promise`<`TransactionResponse`\>

#### Defined in

[src/api/transact-namespace.ts:107](https://github.com/alchemyplatform/alchemy-sdk-js/blob/145ea50/src/api/transact-namespace.ts#L107)

___

### waitForTransaction

▸ **waitForTransaction**(`transactionHash`, `confirmations?`, `timeout?`): `Promise`<``null`` \| `TransactionReceipt`\>

Returns a promise which will not resolve until specified transaction hash is mined.

If {@link confirmations} is 0, this method is non-blocking and if the
transaction has not been mined returns null. Otherwise, this method will
block until the transaction has confirmed blocks mined on top of the block
in which it was mined.

NOTE: This is an alias for [CoreNamespace.waitForTransaction](CoreNamespace.md#waitfortransaction).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionHash` | `string` | The hash of the transaction to wait for. |
| `confirmations?` | `number` | The number of blocks to wait for. |
| `timeout?` | `number` | The maximum time to wait for the transaction to confirm. |

#### Returns

`Promise`<``null`` \| `TransactionReceipt`\>

#### Defined in

[src/api/transact-namespace.ts:129](https://github.com/alchemyplatform/alchemy-sdk-js/blob/145ea50/src/api/transact-namespace.ts#L129)
