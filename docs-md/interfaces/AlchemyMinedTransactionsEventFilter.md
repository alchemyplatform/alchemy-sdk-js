[alchemy-sdk](../README.md) / [Exports](../modules.md) / AlchemyMinedTransactionsEventFilter

# Interface: AlchemyMinedTransactionsEventFilter

Event filter for the [AlchemyWebSocketProvider.on](../classes/AlchemyWebSocketProvider.md#on) and
[AlchemyWebSocketProvider.once](../classes/AlchemyWebSocketProvider.md#once) methods to use Alchemy's custom
`alchemy_minedTransactions` endpoint.

Returns the transaction information for all mined transactions that match the
provided filter. For full documentation, see:
[https://docs.alchemy.com/reference/alchemy-minedtransactions](https://docs.alchemy.com/reference/alchemy-minedtransactions)

Note that excluding all optional parameters will return transaction
information for ALL mined transactions.

## Table of contents

### Properties

- [addresses](AlchemyMinedTransactionsEventFilter.md#addresses)
- [hashesOnly](AlchemyMinedTransactionsEventFilter.md#hashesonly)
- [includeRemoved](AlchemyMinedTransactionsEventFilter.md#includeremoved)
- [method](AlchemyMinedTransactionsEventFilter.md#method)

## Properties

### addresses

• `Optional` **addresses**: [`NonEmptyArray`](../modules.md#nonemptyarray)<[`AlchemyMinedTransactionsAddress`](../modules.md#alchemyminedtransactionsaddress)\>

Address filters to subscribe to. Defaults to all transactions if omitted.
Limit 100 address filters. Requires a non-empty array.

#### Defined in

[src/types/types.ts:740](https://github.com/alchemyplatform/alchemy-sdk-js/blob/44aa50c/src/types/types.ts#L740)

___

### hashesOnly

• `Optional` **hashesOnly**: `boolean`

Whether to only include transaction hashes and exclude the rest of the
transaction response for a smaller payload. Defaults to false (by default,
the entire transaction response is included).

#### Defined in

[src/types/types.ts:753](https://github.com/alchemyplatform/alchemy-sdk-js/blob/44aa50c/src/types/types.ts#L753)

___

### includeRemoved

• `Optional` **includeRemoved**: `boolean`

Whether to include transactions that were removed from the mempool.
Defaults to false.

#### Defined in

[src/types/types.ts:746](https://github.com/alchemyplatform/alchemy-sdk-js/blob/44aa50c/src/types/types.ts#L746)

___

### method

• **method**: [`MINED_TRANSACTIONS`](../enums/AlchemySubscription.md#mined_transactions)

#### Defined in

[src/types/types.ts:734](https://github.com/alchemyplatform/alchemy-sdk-js/blob/44aa50c/src/types/types.ts#L734)
