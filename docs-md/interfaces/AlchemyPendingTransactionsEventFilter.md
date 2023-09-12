[alchemy-sdk](../README.md) / [Exports](../modules.md) / AlchemyPendingTransactionsEventFilter

# Interface: AlchemyPendingTransactionsEventFilter

Event filter for the [AlchemyWebSocketProvider.on](../classes/AlchemyWebSocketProvider.md#on) and
[AlchemyWebSocketProvider.once](../classes/AlchemyWebSocketProvider.md#once) methods to use Alchemy's custom
`alchemy_pendingTransactions` endpoint.

Returns the transaction information for all pending transactions that match a
given filter. For full documentation, see:
[https://docs.alchemy.com/reference/alchemy-pendingtransactions](https://docs.alchemy.com/reference/alchemy-pendingtransactions)

Note that excluding all optional parameters will return transaction
information for ALL pending transactions that are added to the mempool.

## Table of contents

### Properties

- [fromAddress](AlchemyPendingTransactionsEventFilter.md#fromaddress)
- [hashesOnly](AlchemyPendingTransactionsEventFilter.md#hashesonly)
- [method](AlchemyPendingTransactionsEventFilter.md#method)
- [toAddress](AlchemyPendingTransactionsEventFilter.md#toaddress)

## Properties

### fromAddress

• `Optional` **fromAddress**: `string` \| `string`[]

Filter pending transactions sent FROM the provided address or array of
addresses.

If a [AlchemyPendingTransactionsEventFilter.toAddress](AlchemyPendingTransactionsEventFilter.md#toaddress) is also
present, then this filter will return transactions sent from the
`fromAddress` OR transactions received by the `toAddress`.

#### Defined in

[src/types/types.ts:1788](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e05babb/src/types/types.ts#L1788)

___

### hashesOnly

• `Optional` **hashesOnly**: `boolean`

Whether to only include transaction hashes and exclude the rest of the
transaction response for a smaller payload. Defaults to false (by default,
the entire transaction response is included).

Note that setting only [hashesOnly](AlchemyPendingTransactionsEventFilter.md#hashesonly) to true will return the same
response as subscribing to `newPendingTransactions`.

#### Defined in

[src/types/types.ts:1808](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e05babb/src/types/types.ts#L1808)

___

### method

• **method**: [`PENDING_TRANSACTIONS`](../enums/AlchemySubscription.md#pending_transactions)

#### Defined in

[src/types/types.ts:1778](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e05babb/src/types/types.ts#L1778)

___

### toAddress

• `Optional` **toAddress**: `string` \| `string`[]

Filter pending transactions sent TO the provided address or array of
addresses.

If a [AlchemyPendingTransactionsEventFilter.fromAddress](AlchemyPendingTransactionsEventFilter.md#fromaddress) is also
present, then this filter will return transactions sent from the
`fromAddress` OR transactions received by the `toAddress`.

#### Defined in

[src/types/types.ts:1798](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e05babb/src/types/types.ts#L1798)
