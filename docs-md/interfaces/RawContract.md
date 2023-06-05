[alchemy-sdk](../README.md) / [Exports](../modules.md) / RawContract

# Interface: RawContract

Information about the underlying contract for the asset that was transferred
in a [AssetTransfersResult](AssetTransfersResult.md) object.

## Table of contents

### Properties

- [address](RawContract.md#address)
- [decimal](RawContract.md#decimal)
- [value](RawContract.md#value)

## Properties

### address

• **address**: ``null`` \| `string`

The contract address. `null` if it was an internal or external transfer.

#### Defined in

[src/types/types.ts:1516](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1516)

___

### decimal

• **decimal**: ``null`` \| `string`

The number of decimals in the contract as a hex string. `null` if the value
is not in the contract and not available from other sources.

#### Defined in

[src/types/types.ts:1522](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1522)

___

### value

• **value**: ``null`` \| `string`

The raw transfer value as a hex string. `null` if the transfer was for an
ERC721 or ERC1155 token.

#### Defined in

[src/types/types.ts:1513](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L1513)
