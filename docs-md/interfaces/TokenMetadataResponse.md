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

[src/types/types.ts:156](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L156)

___

### logo

• **logo**: ``null`` \| `string`

URL link to the token's logo. Is `null` if the logo is not available.

#### Defined in

[src/types/types.ts:159](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L159)

___

### name

• **name**: ``null`` \| `string`

The token's name. Is `null` if the name is not defined in the contract and
not available from other sources.

#### Defined in

[src/types/types.ts:144](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L144)

___

### symbol

• **symbol**: ``null`` \| `string`

The token's symbol. Is `null` if the symbol is not defined in the contract
and not available from other sources.

#### Defined in

[src/types/types.ts:150](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L150)
