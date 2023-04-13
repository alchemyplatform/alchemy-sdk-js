[alchemy-sdk](../README.md) / [Exports](../modules.md) / SimulateAssetChangesChange

# Interface: SimulateAssetChangesChange

Represents an asset change from a call to
[TransactNamespace.simulateAssetChanges](../classes/TransactNamespace.md#simulateassetchanges).

## Table of contents

### Properties

- [amount](SimulateAssetChangesChange.md#amount)
- [assetType](SimulateAssetChangesChange.md#assettype)
- [changeType](SimulateAssetChangesChange.md#changetype)
- [contractAddress](SimulateAssetChangesChange.md#contractaddress)
- [decimals](SimulateAssetChangesChange.md#decimals)
- [from](SimulateAssetChangesChange.md#from)
- [logo](SimulateAssetChangesChange.md#logo)
- [name](SimulateAssetChangesChange.md#name)
- [rawAmount](SimulateAssetChangesChange.md#rawamount)
- [symbol](SimulateAssetChangesChange.md#symbol)
- [to](SimulateAssetChangesChange.md#to)
- [tokenId](SimulateAssetChangesChange.md#tokenid)

## Properties

### amount

• `Optional` **amount**: `string`

The amount as an integer string. This value is calculated by applying the
`decimals` field to the `rawAmount` field. Only available on TRANSFER
changes for NATIVE and ERC20 assets, or ERC721/ERC1155 disapprove changes
(field set to '0').

#### Defined in

[src/types/types.ts:1922](https://github.com/alchemyplatform/alchemy-sdk-js/blob/85196e8/src/types/types.ts#L1922)

___

### assetType

• **assetType**: [`SimulateAssetType`](../enums/SimulateAssetType.md)

The type of asset from the transaction.

#### Defined in

[src/types/types.ts:1898](https://github.com/alchemyplatform/alchemy-sdk-js/blob/85196e8/src/types/types.ts#L1898)

___

### changeType

• **changeType**: [`SimulateChangeType`](../enums/SimulateChangeType.md)

The type of change from the transaction.

#### Defined in

[src/types/types.ts:1901](https://github.com/alchemyplatform/alchemy-sdk-js/blob/85196e8/src/types/types.ts#L1901)

___

### contractAddress

• `Optional` **contractAddress**: `string`

The contract address of the asset. Only applicable to ERC20, ERC721,
ERC1155, NFT and SPECIAL_NFT transactions.

#### Defined in

[src/types/types.ts:1941](https://github.com/alchemyplatform/alchemy-sdk-js/blob/85196e8/src/types/types.ts#L1941)

___

### decimals

• `Optional` **decimals**: `number`

The number of decimals used by the ERC20 token. Set to 0 for APPROVE
changes. Field is undefined if it's not defined in the contract and not
available from other sources.

#### Defined in

[src/types/types.ts:1935](https://github.com/alchemyplatform/alchemy-sdk-js/blob/85196e8/src/types/types.ts#L1935)

___

### from

• **from**: `string`

The from address.

#### Defined in

[src/types/types.ts:1904](https://github.com/alchemyplatform/alchemy-sdk-js/blob/85196e8/src/types/types.ts#L1904)

___

### logo

• `Optional` **logo**: `string`

URL for the logo of the asset, if available. Only applicable to ERC20 transactions.

#### Defined in

[src/types/types.ts:1946](https://github.com/alchemyplatform/alchemy-sdk-js/blob/85196e8/src/types/types.ts#L1946)

___

### name

• `Optional` **name**: `string`

The name of the asset transferred, if available.

#### Defined in

[src/types/types.ts:1925](https://github.com/alchemyplatform/alchemy-sdk-js/blob/85196e8/src/types/types.ts#L1925)

___

### rawAmount

• `Optional` **rawAmount**: `string`

The raw amount as an integer string. Only available on TRANSFER changes for
NATIVE and ERC20 assets, or ERC721/ERC1155 disapprove changes (field set to
'0').

#### Defined in

[src/types/types.ts:1914](https://github.com/alchemyplatform/alchemy-sdk-js/blob/85196e8/src/types/types.ts#L1914)

___

### symbol

• `Optional` **symbol**: `string`

The symbol of the asset transferred if available.

#### Defined in

[src/types/types.ts:1928](https://github.com/alchemyplatform/alchemy-sdk-js/blob/85196e8/src/types/types.ts#L1928)

___

### to

• **to**: `string`

The to address.

#### Defined in

[src/types/types.ts:1907](https://github.com/alchemyplatform/alchemy-sdk-js/blob/85196e8/src/types/types.ts#L1907)

___

### tokenId

• `Optional` **tokenId**: `string`

The token id of the asset transferred. Only applicable to ERC721,
ERC1155 and SPECIAL_NFT NFTs.

#### Defined in

[src/types/types.ts:1952](https://github.com/alchemyplatform/alchemy-sdk-js/blob/85196e8/src/types/types.ts#L1952)
