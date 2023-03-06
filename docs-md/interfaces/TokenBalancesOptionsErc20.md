[alchemy-sdk](../README.md) / [Exports](../modules.md) / TokenBalancesOptionsErc20

# Interface: TokenBalancesOptionsErc20

Optional params to pass into `getTokenBalances()` to fetch all ERC-20 tokens
instead of passing in an array of contract addresses to fetch balances for.

## Table of contents

### Properties

- [pageKey](TokenBalancesOptionsErc20.md#pagekey)
- [type](TokenBalancesOptionsErc20.md#type)

## Properties

### pageKey

• `Optional` **pageKey**: `string`

Optional page key for pagination (only applicable to TokenBalanceType.ERC20)

#### Defined in

[src/types/types.ts:123](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7bf2430/src/types/types.ts#L123)

___

### type

• **type**: [`ERC20`](../enums/TokenBalanceType.md#erc20)

The ERC-20 token type.

#### Defined in

[src/types/types.ts:120](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7bf2430/src/types/types.ts#L120)
