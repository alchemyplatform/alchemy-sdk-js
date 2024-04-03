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

[src/types/nft-types.ts:938](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/nft-types.ts#L938)

___

### decimal

• **decimal**: ``null`` \| `string`

The number of decimals in the contract as a hex string. `null` if the value
is not in the contract and not available from other sources.

#### Defined in

[src/types/nft-types.ts:944](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/nft-types.ts#L944)

___

### value

• **value**: ``null`` \| `string`

The raw transfer value as a hex string. `null` if the transfer was for an
ERC721 or ERC1155 token.

#### Defined in

[src/types/nft-types.ts:935](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/nft-types.ts#L935)
