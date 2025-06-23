[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetTransactionsByWalletResponse

# Interface: GetTransactionsByWalletResponse

The response type of [PortfolioNamespace.getTransactionsByWallet](../classes/PortfolioNamespace.md#gettransactionsbywallet).

## Table of contents

### Properties

- [after](GetTransactionsByWalletResponse.md#after)
- [before](GetTransactionsByWalletResponse.md#before)
- [totalCount](GetTransactionsByWalletResponse.md#totalcount)
- [transactions](GetTransactionsByWalletResponse.md#transactions)

## Properties

### after

• `Optional` **after**: `string`

The cursor that points to the end of the current set of results.

#### Defined in

[src/types/portfolio-types.ts:206](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/portfolio-types.ts#L206)

___

### before

• `Optional` **before**: `string`

The cursor that points to the previous set of results.

#### Defined in

[src/types/portfolio-types.ts:203](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/portfolio-types.ts#L203)

___

### totalCount

• `Optional` **totalCount**: `number`

Total count of the response items.

#### Defined in

[src/types/portfolio-types.ts:209](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/portfolio-types.ts#L209)

___

### transactions

• **transactions**: [`TransactionReceipt`](TransactionReceipt.md)[]

List of transactions by address. [TransactionReceipt](TransactionReceipt.md)

#### Defined in

[src/types/portfolio-types.ts:212](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/portfolio-types.ts#L212)
