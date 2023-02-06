[alchemy-sdk](../README.md) / [Exports](../modules.md) / AssetTransfersCategory

# Enumeration: AssetTransfersCategory

Categories of transfers to use with the [AssetTransfersParams](../interfaces/AssetTransfersParams.md) request
object when using [CoreNamespace.getAssetTransfers](../classes/CoreNamespace.md#getassettransfers).

## Table of contents

### Enumeration members

- [ERC1155](AssetTransfersCategory.md#erc1155)
- [ERC20](AssetTransfersCategory.md#erc20)
- [ERC721](AssetTransfersCategory.md#erc721)
- [EXTERNAL](AssetTransfersCategory.md#external)
- [INTERNAL](AssetTransfersCategory.md#internal)
- [SPECIALNFT](AssetTransfersCategory.md#specialnft)

## Enumeration members

### ERC1155

• **ERC1155** = `"erc1155"`

ERC1155 transfers.

#### Defined in

[src/types/types.ts:369](https://github.com/alchemyplatform/alchemy-sdk-js/blob/a8bc079/src/types/types.ts#L369)

___

### ERC20

• **ERC20** = `"erc20"`

ERC20 transfers.

#### Defined in

[src/types/types.ts:363](https://github.com/alchemyplatform/alchemy-sdk-js/blob/a8bc079/src/types/types.ts#L363)

___

### ERC721

• **ERC721** = `"erc721"`

ERC721 transfers.

#### Defined in

[src/types/types.ts:366](https://github.com/alchemyplatform/alchemy-sdk-js/blob/a8bc079/src/types/types.ts#L366)

___

### EXTERNAL

• **EXTERNAL** = `"external"`

Top level ETH transactions that occur where the `fromAddress` is an
external user-created address. External addresses have private keys and are
accessed by users.

#### Defined in

[src/types/types.ts:353](https://github.com/alchemyplatform/alchemy-sdk-js/blob/a8bc079/src/types/types.ts#L353)

___

### INTERNAL

• **INTERNAL** = `"internal"`

Top level ETH transactions that occur where the `fromAddress` is an
internal, smart contract address. For example, a smart contract calling
another smart contract or sending

#### Defined in

[src/types/types.ts:360](https://github.com/alchemyplatform/alchemy-sdk-js/blob/a8bc079/src/types/types.ts#L360)

___

### SPECIALNFT

• **SPECIALNFT** = `"specialnft"`

Special contracts that don't follow ERC 721/1155, (ex: CryptoKitties).

#### Defined in

[src/types/types.ts:372](https://github.com/alchemyplatform/alchemy-sdk-js/blob/a8bc079/src/types/types.ts#L372)
