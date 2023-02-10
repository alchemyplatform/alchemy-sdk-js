[alchemy-sdk](../README.md) / [Exports](../modules.md) / TransactNamespace

# Class: TransactNamespace

The Transact namespace contains methods used for sending transactions and
checking on the state of submitted transactions.

Do not call this constructor directly. Instead, instantiate an Alchemy object
with `const alchemy = new Alchemy(config)` and then access the transact
namespace via `alchemy.transact`.

## Table of contents

### Methods

- [cancelPrivateTransaction](TransactNamespace.md#cancelprivatetransaction)
- [estimateGas](TransactNamespace.md#estimategas)
- [getMaxPriorityFeePerGas](TransactNamespace.md#getmaxpriorityfeepergas)
- [getTransaction](TransactNamespace.md#gettransaction)
- [sendPrivateTransaction](TransactNamespace.md#sendprivatetransaction)
- [sendTransaction](TransactNamespace.md#sendtransaction)
- [simulateAssetChanges](TransactNamespace.md#simulateassetchanges)
- [simulateExecution](TransactNamespace.md#simulateexecution)
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

[src/api/transact-namespace.ts:86](https://github.com/alchemyplatform/alchemy-sdk-js/blob/aeb51c8/src/api/transact-namespace.ts#L86)

___

### estimateGas

▸ **estimateGas**(`transaction`): `Promise`<[`BigNumber`](BigNumber.md)\>

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

`Promise`<[`BigNumber`](BigNumber.md)\>

#### Defined in

[src/api/transact-namespace.ts:204](https://github.com/alchemyplatform/alchemy-sdk-js/blob/aeb51c8/src/api/transact-namespace.ts#L204)

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

[src/api/transact-namespace.ts:220](https://github.com/alchemyplatform/alchemy-sdk-js/blob/aeb51c8/src/api/transact-namespace.ts#L220)

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

[src/api/transact-namespace.ts:167](https://github.com/alchemyplatform/alchemy-sdk-js/blob/aeb51c8/src/api/transact-namespace.ts#L167)

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

[src/api/transact-namespace.ts:54](https://github.com/alchemyplatform/alchemy-sdk-js/blob/aeb51c8/src/api/transact-namespace.ts#L54)

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

[src/api/transact-namespace.ts:184](https://github.com/alchemyplatform/alchemy-sdk-js/blob/aeb51c8/src/api/transact-namespace.ts#L184)

___

### simulateAssetChanges

▸ **simulateAssetChanges**(`transaction`, `blockIdentifier?`): `Promise`<[`SimulateAssetChangesResponse`](../interfaces/SimulateAssetChangesResponse.md)\>

Simulates the asset changes resulting from a single transaction.

Returns list of asset changes that occurred during the transaction
simulation. Note that this method does not run the transaction on the
blockchain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transaction` | [`DebugTransaction`](../interfaces/DebugTransaction.md) | The transaction to simulate. |
| `blockIdentifier?` | `string` | Optional block identifier to simulate the transaction in. |

#### Returns

`Promise`<[`SimulateAssetChangesResponse`](../interfaces/SimulateAssetChangesResponse.md)\>

#### Defined in

[src/api/transact-namespace.ts:110](https://github.com/alchemyplatform/alchemy-sdk-js/blob/aeb51c8/src/api/transact-namespace.ts#L110)

___

### simulateExecution

▸ **simulateExecution**(`transaction`, `blockIdentifier?`): `Promise`<[`SimulateExecutionResponse`](../interfaces/SimulateExecutionResponse.md)\>

Simulates a single transaction and the resulting and returns list of
decoded traces and logs that occurred during the transaction simulation.

Note that this method does not run the transaction on the blockchain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transaction` | [`DebugTransaction`](../interfaces/DebugTransaction.md) | The transaction to simulate. |
| `blockIdentifier?` | `string` | Optional block identifier to simulate the transaction in. |

#### Returns

`Promise`<[`SimulateExecutionResponse`](../interfaces/SimulateExecutionResponse.md)\>

#### Defined in

[src/api/transact-namespace.ts:137](https://github.com/alchemyplatform/alchemy-sdk-js/blob/aeb51c8/src/api/transact-namespace.ts#L137)

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

[src/api/transact-namespace.ts:245](https://github.com/alchemyplatform/alchemy-sdk-js/blob/aeb51c8/src/api/transact-namespace.ts#L245)
