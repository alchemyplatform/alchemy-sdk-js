[alchemy-sdk](../README.md) / [Exports](../modules.md) / CoreNamespace

# Class: CoreNamespace

The core namespace contains all commonly-used [Ethers.js
Provider](https://docs.ethers.io/v5/api/providers/api-providers/#AlchemyProvider)
methods. If you are already using Ethers.js, you should be simply able to
replace the Ethers.js Provider object with `alchemy.core` when accessing
provider methods and it should just work.

Do not call this constructor directly. Instead, instantiate an Alchemy object
with `const alchemy = new Alchemy(config)` and then access the core namespace
via `alchemy.core`.

## Table of contents

### Methods

- [call](CoreNamespace.md#call)
- [estimateGas](CoreNamespace.md#estimategas)
- [findContractDeployer](CoreNamespace.md#findcontractdeployer)
- [getAssetTransfers](CoreNamespace.md#getassettransfers)
- [getBalance](CoreNamespace.md#getbalance)
- [getBlock](CoreNamespace.md#getblock)
- [getBlockNumber](CoreNamespace.md#getblocknumber)
- [getBlockWithTransactions](CoreNamespace.md#getblockwithtransactions)
- [getCode](CoreNamespace.md#getcode)
- [getFeeData](CoreNamespace.md#getfeedata)
- [getGasPrice](CoreNamespace.md#getgasprice)
- [getLogs](CoreNamespace.md#getlogs)
- [getNetwork](CoreNamespace.md#getnetwork)
- [getStorageAt](CoreNamespace.md#getstorageat)
- [getTokenBalances](CoreNamespace.md#gettokenbalances)
- [getTokenMetadata](CoreNamespace.md#gettokenmetadata)
- [getTokensForOwner](CoreNamespace.md#gettokensforowner)
- [getTransaction](CoreNamespace.md#gettransaction)
- [getTransactionCount](CoreNamespace.md#gettransactioncount)
- [getTransactionReceipt](CoreNamespace.md#gettransactionreceipt)
- [getTransactionReceipts](CoreNamespace.md#gettransactionreceipts)
- [isContractAddress](CoreNamespace.md#iscontractaddress)
- [lookupAddress](CoreNamespace.md#lookupaddress)
- [ready](CoreNamespace.md#ready)
- [resolveName](CoreNamespace.md#resolvename)
- [send](CoreNamespace.md#send)
- [sendTransaction](CoreNamespace.md#sendtransaction)
- [waitForTransaction](CoreNamespace.md#waitfortransaction)

## Methods

### call

▸ **call**(`transaction`, `blockTag?`): `Promise`<`string`\>

Returns the result of executing the transaction, using call. A call does
not require any ether, but cannot change any state. This is useful for
calling getters on Contracts.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transaction` | `Deferrable`<[`TransactionRequest`](../modules.md#transactionrequest)\> | The transaction to execute. |
| `blockTag?` | [`BlockTag`](../modules.md#blocktag) \| `Promise`<[`BlockTag`](../modules.md#blocktag)\> | The optional block number or hash to get the call for. |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/api/core-namespace.ts:242](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L242)

___

### estimateGas

▸ **estimateGas**(`transaction`): `Promise`<[`BigNumber`](BigNumber.md)\>

Returns an estimate of the amount of gas that would be required to submit
transaction to the network.

An estimate may not be accurate since there could be another transaction on
the network that was not accounted for, but after being mined affects the
relevant state.

This is an alias for [TransactNamespace.estimateGas](TransactNamespace.md#estimategas).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transaction` | `Deferrable`<[`TransactionRequest`](../modules.md#transactionrequest)\> | The transaction to estimate gas for. |

#### Returns

`Promise`<[`BigNumber`](BigNumber.md)\>

#### Defined in

[src/api/core-namespace.ts:263](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L263)

___

### findContractDeployer

▸ **findContractDeployer**(`contractAddress`): `Promise`<[`DeployResult`](../interfaces/DeployResult.md)\>

Finds the address that deployed the provided contract and block number it
was deployed in.

NOTE: This method performs a binary search across all blocks since genesis
and can take a long time to complete. This method is a convenience method
that will eventually be replaced by a single call to an Alchemy endpoint
with this information cached.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The contract address to find the deployer for. |

#### Returns

`Promise`<[`DeployResult`](../interfaces/DeployResult.md)\>

#### Defined in

[src/api/core-namespace.ts:384](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L384)

___

### getAssetTransfers

▸ **getAssetTransfers**(`params`): `Promise`<[`AssetTransfersWithMetadataResponse`](../interfaces/AssetTransfersWithMetadataResponse.md)\>

Get transactions for specific addresses. See the web documentation for the
full details:
https://docs.alchemy.com/alchemy/enhanced-apis/transfers-api#alchemy_getassettransfers

This overload requires [AssetTransfersWithMetadataParams.withMetadata](../interfaces/AssetTransfersWithMetadataParams.md#withmetadata)
to be set to `true`, which results in additional metadata returned in the
response object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`AssetTransfersWithMetadataParams`](../interfaces/AssetTransfersWithMetadataParams.md) | An object containing fields for the asset transfer query |

#### Returns

`Promise`<[`AssetTransfersWithMetadataResponse`](../interfaces/AssetTransfersWithMetadataResponse.md)\>

#### Defined in

[src/api/core-namespace.ts:611](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L611)

▸ **getAssetTransfers**(`params`): `Promise`<[`AssetTransfersResponse`](../interfaces/AssetTransfersResponse.md)\>

Get transactions for specific addresses. See the web documentation for the
full details:
https://docs.alchemy.com/alchemy/enhanced-apis/transfers-api#alchemy_getassettransfers

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`AssetTransfersParams`](../interfaces/AssetTransfersParams.md) | An object containing fields for the asset transfer query. |

#### Returns

`Promise`<[`AssetTransfersResponse`](../interfaces/AssetTransfersResponse.md)\>

#### Defined in

[src/api/core-namespace.ts:623](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L623)

___

### getBalance

▸ **getBalance**(`addressOrName`, `blockTag?`): `Promise`<[`BigNumber`](BigNumber.md)\>

Returns the balance of a given address as of the provided block.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressOrName` | `string` \| `Promise`<`string`\> | The address or name of the account to get the balance for. |
| `blockTag?` | [`BlockTag`](../modules.md#blocktag) \| `Promise`<[`BlockTag`](../modules.md#blocktag)\> | The optional block number or hash to get the balance for.   Defaults to 'latest' if unspecified. |

#### Returns

`Promise`<[`BigNumber`](BigNumber.md)\>

#### Defined in

[src/api/core-namespace.ts:69](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L69)

___

### getBlock

▸ **getBlock**(`blockHashOrBlockTag`): `Promise`<[`Block`](../interfaces/Block.md)\>

Returns the block from the network based on the provided block number or
hash. Transactions on the block are represented as an array of transaction
hashes. To get the full transaction details on the block, use
[getBlockWithTransactions](CoreNamespace.md#getblockwithtransactions) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockHashOrBlockTag` | [`BlockTag`](../modules.md#blocktag) \| `Promise`<[`BlockTag`](../modules.md#blocktag)\> | The block number or hash to get the block for. |

#### Returns

`Promise`<[`Block`](../interfaces/Block.md)\>

#### Defined in

[src/api/core-namespace.ts:151](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L151)

___

### getBlockNumber

▸ **getBlockNumber**(): `Promise`<`number`\>

Returns the block number of the most recently mined block.

#### Returns

`Promise`<`number`\>

#### Defined in

[src/api/core-namespace.ts:188](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L188)

___

### getBlockWithTransactions

▸ **getBlockWithTransactions**(`blockHashOrBlockTag`): `Promise`<[`BlockWithTransactions`](../interfaces/BlockWithTransactions.md)\>

Returns the block from the network based on the provided block number or
hash. Transactions on the block are represented as an array of
[TransactionResponse](../interfaces/TransactionResponse.md) objects.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockHashOrBlockTag` | [`BlockTag`](../modules.md#blocktag) \| `Promise`<[`BlockTag`](../modules.md#blocktag)\> | The block number or hash to get the block for. |

#### Returns

`Promise`<[`BlockWithTransactions`](../interfaces/BlockWithTransactions.md)\>

#### Defined in

[src/api/core-namespace.ts:166](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L166)

___

### getCode

▸ **getCode**(`addressOrName`, `blockTag?`): `Promise`<`string`\>

Returns the contract code of the provided address at the block. If there is
no contract deployed, the result is `0x`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressOrName` | `string` \| `Promise`<`string`\> | The address or name of the account to get the code for. |
| `blockTag?` | [`BlockTag`](../modules.md#blocktag) \| `Promise`<[`BlockTag`](../modules.md#blocktag)\> | The optional block number or hash to get the code for.   Defaults to 'latest' if unspecified. |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/api/core-namespace.ts:98](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L98)

___

### getFeeData

▸ **getFeeData**(): `Promise`<[`FeeData`](../interfaces/FeeData.md)\>

Returns the recommended fee data to use in a transaction.

For an EIP-1559 transaction, the maxFeePerGas and maxPriorityFeePerGas
should be used.

For legacy transactions and networks which do not support EIP-1559, the
gasPrice should be used.

#### Returns

`Promise`<[`FeeData`](../interfaces/FeeData.md)\>

#### Defined in

[src/api/core-namespace.ts:214](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L214)

___

### getGasPrice

▸ **getGasPrice**(): `Promise`<[`BigNumber`](BigNumber.md)\>

Returns the best guess of the current gas price to use in a transaction.

#### Returns

`Promise`<[`BigNumber`](BigNumber.md)\>

#### Defined in

[src/api/core-namespace.ts:198](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L198)

___

### getLogs

▸ **getLogs**(`filter`): `Promise`<[`Log`](../interfaces/Log.md)[]\>

Returns an array of logs that match the provided filter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | [`Filter`](../interfaces/Filter.md) \| [`FilterByBlockHash`](../interfaces/FilterByBlockHash.md) \| `Promise`<[`Filter`](../interfaces/Filter.md) \| [`FilterByBlockHash`](../interfaces/FilterByBlockHash.md)\> | The filter object to use. |

#### Returns

`Promise`<[`Log`](../interfaces/Log.md)[]\>

#### Defined in

[src/api/core-namespace.ts:354](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L354)

___

### getNetwork

▸ **getNetwork**(): `Promise`<`Network`\>

Returns the {@link EthersNetworkAlias} Alchemy is connected to.

#### Returns

`Promise`<`Network`\>

#### Defined in

[src/api/core-namespace.ts:178](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L178)

___

### getStorageAt

▸ **getStorageAt**(`addressOrName`, `position`, `blockTag?`): `Promise`<`string`\>

Return the value of the provided position at the provided address, at the
provided block in `Bytes32` format.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressOrName` | `string` \| `Promise`<`string`\> | The address or name of the account to get the code for. |
| `position` | [`BigNumberish`](../modules.md#bignumberish) \| `Promise`<[`BigNumberish`](../modules.md#bignumberish)\> | The position of the storage slot to get. |
| `blockTag?` | [`BlockTag`](../modules.md#blocktag) \| `Promise`<[`BlockTag`](../modules.md#blocktag)\> | The optional block number or hash to get the code for.   Defaults to 'latest' if unspecified. |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/api/core-namespace.ts:116](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L116)

___

### getTokenBalances

▸ **getTokenBalances**(`addressOrName`): `Promise`<[`TokenBalancesResponseErc20`](../interfaces/TokenBalancesResponseErc20.md)\>

Returns the ERC-20 token balances for a specific owner address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressOrName` | `string` | The owner address to get the token balances for. |

#### Returns

`Promise`<[`TokenBalancesResponseErc20`](../interfaces/TokenBalancesResponseErc20.md)\>

#### Defined in

[src/api/core-namespace.ts:425](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L425)

▸ **getTokenBalances**(`addressOrName`, `contractAddresses?`): `Promise`<[`TokenBalancesResponse`](../interfaces/TokenBalancesResponse.md)\>

Returns the token balances for a specific owner address given a list of contracts.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressOrName` | `string` | The owner address to get the token balances for. |
| `contractAddresses?` | `string`[] | A list of contract addresses to check. If omitted,   all ERC-20 tokens will be checked. |

#### Returns

`Promise`<[`TokenBalancesResponse`](../interfaces/TokenBalancesResponse.md)\>

#### Defined in

[src/api/core-namespace.ts:437](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L437)

▸ **getTokenBalances**(`addressOrName`, `options`): `Promise`<[`TokenBalancesResponseErc20`](../interfaces/TokenBalancesResponseErc20.md)\>

Returns the ERC-20 token balances for a specific owner.

This overload covers the erc-20 token type which includes a page key in the response.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressOrName` | `string` | The owner address to get the token balances for. |
| `options` | [`TokenBalancesOptionsErc20`](../interfaces/TokenBalancesOptionsErc20.md) | Token type options set to ERC-20 with optional page key. |

#### Returns

`Promise`<[`TokenBalancesResponseErc20`](../interfaces/TokenBalancesResponseErc20.md)\>

#### Defined in

[src/api/core-namespace.ts:451](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L451)

▸ **getTokenBalances**(`addressOrName`, `options`): `Promise`<[`TokenBalancesResponse`](../interfaces/TokenBalancesResponse.md)\>

Returns the token balances for a specific owner, fetching from the top 100
tokens by 24 hour volume.

This overload covers the default token type which includes a page key in
the response.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressOrName` | `string` | The owner address to get the token balances for. |
| `options` | [`TokenBalancesOptionsDefaultTokens`](../interfaces/TokenBalancesOptionsDefaultTokens.md) | Token type options set to ERC-20 with optional page key. |

#### Returns

`Promise`<[`TokenBalancesResponse`](../interfaces/TokenBalancesResponse.md)\>

#### Defined in

[src/api/core-namespace.ts:467](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L467)

___

### getTokenMetadata

▸ **getTokenMetadata**(`address`): `Promise`<[`TokenMetadataResponse`](../interfaces/TokenMetadataResponse.md)\>

Returns metadata for a given token contract address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | The contract address to get metadata for. |

#### Returns

`Promise`<[`TokenMetadataResponse`](../interfaces/TokenMetadataResponse.md)\>

#### Defined in

[src/api/core-namespace.ts:590](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L590)

___

### getTokensForOwner

▸ **getTokensForOwner**(`addressOrName`, `options?`): `Promise`<[`GetTokensForOwnerResponse`](../interfaces/GetTokensForOwnerResponse.md)\>

Returns the tokens that the specified address owns, along with the amount
of each token and the relevant metadata.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressOrName` | `string` | The owner address to get the tokens with balances for. |
| `options?` | [`GetTokensForOwnerOptions`](../interfaces/GetTokensForOwnerOptions.md) | Additional options to pass to the request. |

#### Returns

`Promise`<[`GetTokensForOwnerResponse`](../interfaces/GetTokensForOwnerResponse.md)\>

#### Defined in

[src/api/core-namespace.ts:525](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L525)

___

### getTransaction

▸ **getTransaction**(`transactionHash`): `Promise`<``null`` \| [`TransactionResponse`](../interfaces/TransactionResponse.md)\>

Returns the transaction with hash or null if the transaction is unknown.

If a transaction has not been mined, this method will search the
transaction pool. Various backends may have more restrictive transaction
pool access (e.g. if the gas price is too low or the transaction was only
recently sent and not yet indexed) in which case this method may also return null.

NOTE: This is an alias for [TransactNamespace.getTransaction](TransactNamespace.md#gettransaction).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionHash` | `string` \| `Promise`<`string`\> | The hash of the transaction to get. |

#### Returns

`Promise`<``null`` \| [`TransactionResponse`](../interfaces/TransactionResponse.md)\>

#### Defined in

[src/api/core-namespace.ts:283](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L283)

___

### getTransactionCount

▸ **getTransactionCount**(`addressOrName`, `blockTag?`): `Promise`<`number`\>

Returns the number of transactions ever sent from the provided address, as
of the provided block tag. This value is used as the nonce for the next
transaction from the address sent to the network.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressOrName` | `string` \| `Promise`<`string`\> | The address or name of the account to get the nonce for. |
| `blockTag?` | [`BlockTag`](../modules.md#blocktag) \| `Promise`<[`BlockTag`](../modules.md#blocktag)\> | The optional block number or hash to get the nonce for. |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/api/core-namespace.ts:134](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L134)

___

### getTransactionReceipt

▸ **getTransactionReceipt**(`transactionHash`): `Promise`<``null`` \| [`TransactionReceipt`](../interfaces/TransactionReceipt.md)\>

Returns the transaction receipt for hash or null if the transaction has not
been mined.

To stall until the transaction has been mined, consider the
waitForTransaction method below.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionHash` | `string` \| `Promise`<`string`\> | The hash of the transaction to get. |

#### Returns

`Promise`<``null`` \| [`TransactionReceipt`](../interfaces/TransactionReceipt.md)\>

#### Defined in

[src/api/core-namespace.ts:300](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L300)

___

### getTransactionReceipts

▸ **getTransactionReceipts**(`params`): `Promise`<[`TransactionReceiptsResponse`](../interfaces/TransactionReceiptsResponse.md)\>

Gets all transaction receipts for a given block by number or block hash.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`TransactionReceiptsParams`](../modules.md#transactionreceiptsparams) | An object containing fields for the transaction receipt query. |

#### Returns

`Promise`<[`TransactionReceiptsResponse`](../interfaces/TransactionReceiptsResponse.md)\>

#### Defined in

[src/api/core-namespace.ts:638](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L638)

___

### isContractAddress

▸ **isContractAddress**(`address`): `Promise`<`boolean`\>

Checks if the provided address is a smart contract.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | The address to check type for. |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/api/core-namespace.ts:83](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L83)

___

### lookupAddress

▸ **lookupAddress**(`address`): `Promise`<``null`` \| `string`\>

Performs a reverse lookup of the address in ENS using the Reverse Registrar. If the name does not exist, or the forward lookup does not match, null is returned.

An ENS name requires additional configuration to setup a reverse record, so not all ENS addresses will map back to the original ENS domain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | The address to look up the ENS domain name for. |

#### Returns

`Promise`<``null`` \| `string`\>

#### Defined in

[src/api/core-namespace.ts:662](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L662)

___

### ready

▸ **ready**(): `Promise`<`Network`\>

Returns a Promise which will stall until the network has heen established,
ignoring errors due to the target node not being active yet.

This can be used for testing or attaching scripts to wait until the node is
up and running smoothly.

#### Returns

`Promise`<`Network`\>

#### Defined in

[src/api/core-namespace.ts:228](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L228)

___

### resolveName

▸ **resolveName**(`name`): `Promise`<``null`` \| `string`\>

Returns the underlying owner address for the provided ENS address, or `null`
if the ENS name does not have an underlying address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The ENS address name to resolve. |

#### Returns

`Promise`<``null`` \| `string`\>

#### Defined in

[src/api/core-namespace.ts:650](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L650)

___

### send

▸ **send**(`method`, `params`): `Promise`<`any`\>

Allows sending a raw message to the Alchemy backend.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `method` | `string` | The method to call. |
| `params` | `any`[] | The parameters to pass to the method. |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/api/core-namespace.ts:367](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L367)

___

### sendTransaction

▸ **sendTransaction**(`signedTransaction`): `Promise`<[`TransactionResponse`](../interfaces/TransactionResponse.md)\>

Submits transaction to the network to be mined. The transaction must be
signed, and be valid (i.e. the nonce is correct and the account has
sufficient balance to pay for the transaction).

NOTE: This is an alias for [TransactNamespace.getTransaction](TransactNamespace.md#gettransaction).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signedTransaction` | `string` \| `Promise`<`string`\> | The signed transaction to send. |

#### Returns

`Promise`<[`TransactionResponse`](../interfaces/TransactionResponse.md)\>

#### Defined in

[src/api/core-namespace.ts:317](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L317)

___

### waitForTransaction

▸ **waitForTransaction**(`transactionHash`, `confirmations?`, `timeout?`): `Promise`<``null`` \| [`TransactionReceipt`](../interfaces/TransactionReceipt.md)\>

Returns a promise which will not resolve until specified transaction hash is mined.

If {@link confirmations} is 0, this method is non-blocking and if the
transaction has not been mined returns null. Otherwise, this method will
block until the transaction has confirmed blocks mined on top of the block
in which it was mined.

NOTE: This is an alias for [TransactNamespace.getTransaction](TransactNamespace.md#gettransaction).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionHash` | `string` | The hash of the transaction to wait for. |
| `confirmations?` | `number` | The number of blocks to wait for. |
| `timeout?` | `number` | The maximum time to wait for the transaction to confirm. |

#### Returns

`Promise`<``null`` \| [`TransactionReceipt`](../interfaces/TransactionReceipt.md)\>

#### Defined in

[src/api/core-namespace.ts:339](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/api/core-namespace.ts#L339)
