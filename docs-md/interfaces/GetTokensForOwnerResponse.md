[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetTokensForOwnerResponse

# Interface: GetTokensForOwnerResponse

Response object for [CoreNamespace.getTokensForOwner](../classes/CoreNamespace.md#gettokensforowner).

## Table of contents

### Properties

- [pageKey](GetTokensForOwnerResponse.md#pagekey)
- [tokens](GetTokensForOwnerResponse.md#tokens)

## Properties

### pageKey

• `Optional` **pageKey**: `string`

Page key for the next page of results, if one exists.

#### Defined in

[src/types/types.ts:307](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/types.ts#L307)

___

### tokens

• **tokens**: [`OwnedToken`](OwnedToken.md)[]

Owned tokens for the provided addresses along with relevant metadata.

#### Defined in

[src/types/types.ts:305](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/types.ts#L305)
