[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetTransactionsByWalletRequest

# Interface: GetTransactionsByWalletRequest

The request fields of [PortfolioNamespace.getTransactionsByWallet](../classes/PortfolioNamespace.md#gettransactionsbywallet).

## Table of contents

### Properties

- [addresses](GetTransactionsByWalletRequest.md#addresses)
- [after](GetTransactionsByWalletRequest.md#after)
- [before](GetTransactionsByWalletRequest.md#before)
- [limit](GetTransactionsByWalletRequest.md#limit)

## Properties

### addresses

• **addresses**: [`PortfolioAddress`](PortfolioAddress.md)[]

A list of wallet addresses to query.

#### Defined in

[src/types/portfolio-types.ts:184](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/portfolio-types.ts#L184)

___

### after

• `Optional` **after**: `string`

Optional. The cursor that points to the end of the current set of results.

#### Defined in

[src/types/portfolio-types.ts:190](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/portfolio-types.ts#L190)

___

### before

• `Optional` **before**: `string`

Optional. The cursor that points to the previous set of results.

#### Defined in

[src/types/portfolio-types.ts:187](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/portfolio-types.ts#L187)

___

### limit

• `Optional` **limit**: `number`

Optional. Sets the maximum number of items per page (Max: 100).

#### Defined in

[src/types/portfolio-types.ts:193](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/portfolio-types.ts#L193)
