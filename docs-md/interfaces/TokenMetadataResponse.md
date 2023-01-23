[alchemy-sdk](../README.md) / [Exports](../modules.md) / TokenMetadataResponse

# Interface: TokenMetadataResponse

Response object for the [CoreNamespace.getTokenMetadata](../classes/CoreNamespace.md#gettokenmetadata) method.

## Table of contents

### Properties

- [decimals](TokenMetadataResponse.md#decimals)
- [logo](TokenMetadataResponse.md#logo)
- [name](TokenMetadataResponse.md#name)
- [symbol](TokenMetadataResponse.md#symbol)

## Properties

### decimals

• **decimals**: ``null`` \| `number`

The number of decimals of the token. Returns `null` if not defined in the
contract and not available from other sources.

#### Defined in

[src/types/types.ts:190](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L190)

___

### logo

• **logo**: ``null`` \| `string`

URL link to the token's logo. Is `null` if the logo is not available.

#### Defined in

[src/types/types.ts:193](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L193)

___

### name

• **name**: ``null`` \| `string`

The token's name. Is `null` if the name is not defined in the contract and
not available from other sources.

#### Defined in

[src/types/types.ts:178](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L178)

___

### symbol

• **symbol**: ``null`` \| `string`

The token's symbol. Is `null` if the symbol is not defined in the contract
and not available from other sources.

#### Defined in

[src/types/types.ts:184](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c023713/src/types/types.ts#L184)
