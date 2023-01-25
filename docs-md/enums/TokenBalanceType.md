[alchemy-sdk](../README.md) / [Exports](../modules.md) / TokenBalanceType

# Enumeration: TokenBalanceType

Token Types for the `getTokenBalances()` endpoint.

## Table of contents

### Enumeration members

- [DEFAULT\_TOKENS](TokenBalanceType.md#default_tokens)
- [ERC20](TokenBalanceType.md#erc20)

## Enumeration members

### DEFAULT\_TOKENS

• **DEFAULT\_TOKENS** = `"DEFAULT_TOKENS"`

Option to fetch the top 100 tokens by 24-hour volume. This option is only
available on Mainnet in Ethereum, Polygon, and Arbitrum.

#### Defined in

[src/types/types.ts:102](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/types/types.ts#L102)

___

### ERC20

• **ERC20** = `"erc20"`

Option to fetch the set of ERC-20 tokens that the address as ever held. his
list is produced by an address's historical transfer activity and includes
all tokens that the address has ever received.

#### Defined in

[src/types/types.ts:109](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/types/types.ts#L109)
