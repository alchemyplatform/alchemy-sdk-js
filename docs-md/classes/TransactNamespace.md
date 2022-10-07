[alchemy-sdk](../README.md) / [Exports](../modules.md) / TransactNamespace

# Class: TransactNamespace

The Transact namespace contains methods used for sending transactions and
checking on the state of submitted transactions.

Do not call this constructor directly. Instead, instantiate an Alchemy object
with `const alchemy = new Alchemy(config)` and then access the core namespace
via `alchemy.transact`.

## Table of contents

### Methods

- [\_sendGasOptimizedTransaction](TransactNamespace.md#_sendgasoptimizedtransaction)
- [cancelPrivateTransaction](TransactNamespace.md#cancelprivatetransaction)
- [estimateGas](TransactNamespace.md#estimategas)
- [getMaxPriorityFeePerGas](TransactNamespace.md#getmaxpriorityfeepergas)
- [getTransaction](TransactNamespace.md#gettransaction)
- [getTransactionJobStatus](TransactNamespace.md#gettransactionjobstatus)
- [sendGasOptimizedTransaction](TransactNamespace.md#sendgasoptimizedtransaction)
- [sendPrivateTransaction](TransactNamespace.md#sendprivatetransaction)
- [sendTransaction](TransactNamespace.md#sendtransaction)
- [waitForTransaction](TransactNamespace.md#waitfortransaction)

## Methods

### \_sendGasOptimizedTransaction

▸ `Private` **_sendGasOptimizedTransaction**(`signedTransactions`, `methodName`): `Promise`<[`TransactionJobResponse`](../interfaces/TransactionJobResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signedTransactions` | `string`[] |
| `methodName` | `string` |

#### Returns

`Promise`<[`TransactionJobResponse`](../interfaces/TransactionJobResponse.md)\>

#### Defined in

[src/api/transact-namespace.ts:309](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/api/transact-namespace.ts#L309)

___

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

[src/api/transact-namespace.ts:80](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/api/transact-namespace.ts#L80)

___

### estimateGas

▸ **estimateGas**(`transaction`): `Promise`<`BigNumber`\>

Returns an estimate of the amount of gas that would be required to submit
transaction to the network.

An estimate may not be accurate since there could be another transaction on
the network that was not accounted for, but after being mined affects the
relevant state.

This is an alias for [CoreNamespace.estimateGas](CoreNamespace.md#estimategas).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transaction` | `Deferrable`<`TransactionRequest`\> | The transaction to estimate gas for. |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[src/api/transact-namespace.ts:143](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/api/transact-namespace.ts#L143)

___

### getMaxPriorityFeePerGas

▸ **getMaxPriorityFeePerGas**(): `Promise`<`number`\>

Returns a fee per gas (in wei) that is an estimate of how much you can pay
as a priority fee, or "tip", to get a transaction included in the current block.

This number is generally used to set the `maxPriorityFeePerGas` field in a
transaction request.

#### Returns

`Promise`<`number`\>

#### Defined in

[src/api/transact-namespace.ts:159](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/api/transact-namespace.ts#L159)

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

[src/api/transact-namespace.ts:106](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/api/transact-namespace.ts#L106)

___

### getTransactionJobStatus

▸ `Private` **getTransactionJobStatus**(`transactionJobId`): `Promise`<[`TransactionJobStatusResponse`](../interfaces/TransactionJobStatusResponse.md)\>

Returns the state of the transaction job returned by the
[sendGasOptimizedTransaction](TransactNamespace.md#sendgasoptimizedtransaction). *

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionJobId` | `string` |

#### Returns

`Promise`<[`TransactionJobStatusResponse`](../interfaces/TransactionJobStatusResponse.md)\>

#### Defined in

[src/api/transact-namespace.ts:298](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/api/transact-namespace.ts#L298)

___

### sendGasOptimizedTransaction

▸ **sendGasOptimizedTransaction**(`signedTransactions`): `Promise`<[`TransactionJobResponse`](../interfaces/TransactionJobResponse.md)\>

Instead of sending a single transaction that might not get mined, this
method allows you to send the same transaction multiple times, with
different gas prices and gas limits. This should result in lower fees paid.

Alchemy will submit the cheapest transaction, and if it does not get mined,
the next cheapest transaction will be submitted. This process will continue
until one of the transactions is mined, or until all transactions are rejected.

To have Alchemy automatically generate a fee and gas spread, pass in a
{@link TransactionRequest} object and a [Wallet](Wallet.md) as a signer.

This method returns a response object containing the transaction hash for
each of the signed transactions and a transaction job id that can be used
to track the state of the transaction job.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signedTransactions` | `string`[] | An array of signed transactions to send. Each   transaction in the array must have the same values, but with different   gas and fee values. |

#### Returns

`Promise`<[`TransactionJobResponse`](../interfaces/TransactionJobResponse.md)\>

#### Defined in

[src/api/transact-namespace.ts:215](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/api/transact-namespace.ts#L215)

▸ **sendGasOptimizedTransaction**(`transaction`, `wallet`): `Promise`<[`TransactionJobResponse`](../interfaces/TransactionJobResponse.md)\>

Instead of sending a single transaction that might not get mined, this
method will generate a series of five EIP-1559 transactions with different
gas prices in order to minimize the final fees paid.

Alchemy will submit the cheapest transaction, and if it does not get mined,
the next cheapest transaction will be submitted. This process will continue
until one of the transactions is mined, or until all transactions are rejected.

To calculate the fee, gas, and gas spread for each transaction, this method
first calculates the base fee from the latest block, estimates the gas for
the transaction, and then calculates the fee and gas spread for the
transaction. The five transactions will have 90%, 100%, 110%, 120%, and
130% of the max priority fee per gas.

Note that you can also pass in an array of pre-signed transactions with set
gas levels for more granular control over gas.

This method returns a response object containing the transaction hash for
each of the signed transactions and a transaction job id that can be used
to track the state of the transaction job.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transaction` | `TransactionRequest` | The raw transaction to send. |
| `wallet` | [`Wallet`](Wallet.md) | A wallet to use to sign the transaction. |

#### Returns

`Promise`<[`TransactionJobResponse`](../interfaces/TransactionJobResponse.md)\>

#### Defined in

[src/api/transact-namespace.ts:246](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/api/transact-namespace.ts#L246)

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
| `maxBlockNumber?` | `number` | Optional highest block number in which the   transaction should be included. |
| `options?` | [`SendPrivateTransactionOptions`](../interfaces/SendPrivateTransactionOptions.md) | Options to configure the request. |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/api/transact-namespace.ts:48](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/api/transact-namespace.ts#L48)

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

[src/api/transact-namespace.ts:123](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/api/transact-namespace.ts#L123)

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

[src/api/transact-namespace.ts:184](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/api/transact-namespace.ts#L184)
