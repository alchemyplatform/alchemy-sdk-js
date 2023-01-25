[alchemy-sdk](../README.md) / [Exports](../modules.md) / TokenBalancesResponseErc20

# Interface: TokenBalancesResponseErc20

Response object for when the [TokenBalancesOptionsErc20](TokenBalancesOptionsErc20.md) options are
used. A page key may be returned if the provided address has many transfers.

## Hierarchy

- [`TokenBalancesResponse`](TokenBalancesResponse.md)

  ↳ **`TokenBalancesResponseErc20`**

## Table of contents

### Properties

- [address](TokenBalancesResponseErc20.md#address)
- [pageKey](TokenBalancesResponseErc20.md#pagekey)
- [tokenBalances](TokenBalancesResponseErc20.md#tokenbalances)

## Properties

### address

• **address**: `string`

#### Inherited from

[TokenBalancesResponse](TokenBalancesResponse.md).[address](TokenBalancesResponse.md#address)

#### Defined in

[src/types/types.ts:147](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/types/types.ts#L147)

___

### pageKey

• `Optional` **pageKey**: `string`

An optional page key to passed into the next request to fetch the next page
of token balances.

#### Defined in

[src/types/types.ts:142](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/types/types.ts#L142)

___

### tokenBalances

• **tokenBalances**: [`TokenBalance`](../modules.md#tokenbalance)[]

#### Inherited from

[TokenBalancesResponse](TokenBalancesResponse.md).[tokenBalances](TokenBalancesResponse.md#tokenbalances)

#### Defined in

[src/types/types.ts:148](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/types/types.ts#L148)
