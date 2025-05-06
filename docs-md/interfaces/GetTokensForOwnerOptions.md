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

[src/types/types.ts:292](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/types/types.ts#L292)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [GetTokensForOwnerResponse](GetTokensForOwnerResponse.md) to use for
pagination.

#### Defined in

[src/types/types.ts:297](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/types/types.ts#L297)
