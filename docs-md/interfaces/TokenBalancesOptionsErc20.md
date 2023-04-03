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

[src/types/types.ts:124](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5fad342/src/types/types.ts#L124)

___

### type

• **type**: [`ERC20`](../enums/TokenBalanceType.md#erc20)

The ERC-20 token type.

#### Defined in

[src/types/types.ts:121](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5fad342/src/types/types.ts#L121)
