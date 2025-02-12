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

[src/types/types.ts:242](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L242)

___

### pageKey

• `Optional` **pageKey**: `string`

An optional page key to passed into the next request to fetch the next page
of token balances.

#### Defined in

[src/types/types.ts:237](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L237)

___

### tokenBalances

• **tokenBalances**: [`TokenBalance`](../modules.md#tokenbalance)[]

#### Inherited from

[TokenBalancesResponse](TokenBalancesResponse.md).[tokenBalances](TokenBalancesResponse.md#tokenbalances)

#### Defined in

[src/types/types.ts:243](https://github.com/stanleyjones/alchemy-sdk-js/blob/1bebd8bb/src/types/types.ts#L243)
