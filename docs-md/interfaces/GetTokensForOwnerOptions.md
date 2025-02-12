[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetTokensForOwnerOptions

# Interface: GetTokensForOwnerOptions

Optional params to pass into [CoreNamespace.getTokensForOwner](../classes/CoreNamespace.md#gettokensforowner).

## Table of contents

### Properties

- [contractAddresses](GetTokensForOwnerOptions.md#contractaddresses)
- [pageKey](GetTokensForOwnerOptions.md#pagekey)

## Properties

### contractAddresses

• `Optional` **contractAddresses**: `string`[] \| [`TokenBalanceType`](../enums/TokenBalanceType.md)

List of contract addresses to filter by. If omitted, defaults to
[TokenBalanceType.ERC20](../enums/TokenBalanceType.md#erc20).

#### Defined in

[src/types/types.ts:268](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L268)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [GetTokensForOwnerResponse](GetTokensForOwnerResponse.md) to use for
pagination.

#### Defined in

[src/types/types.ts:273](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L273)
