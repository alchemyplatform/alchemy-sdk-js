[alchemy-sdk](../README.md) / [Exports](../modules.md) / AssetTransfersWithMetadataParams

# Interface: AssetTransfersWithMetadataParams

Parameters for the [CoreNamespace.getAssetTransfers](../classes/CoreNamespace.md#getassettransfers) method that
includes metadata.

## Hierarchy

- [`AssetTransfersParams`](AssetTransfersParams.md)

  ↳ **`AssetTransfersWithMetadataParams`**

## Table of contents

### Properties

- [category](AssetTransfersWithMetadataParams.md#category)
- [contractAddresses](AssetTransfersWithMetadataParams.md#contractaddresses)
- [excludeZeroValue](AssetTransfersWithMetadataParams.md#excludezerovalue)
- [fromAddress](AssetTransfersWithMetadataParams.md#fromaddress)
- [fromBlock](AssetTransfersWithMetadataParams.md#fromblock)
- [maxCount](AssetTransfersWithMetadataParams.md#maxcount)
- [order](AssetTransfersWithMetadataParams.md#order)
- [pageKey](AssetTransfersWithMetadataParams.md#pagekey)
- [toAddress](AssetTransfersWithMetadataParams.md#toaddress)
- [toBlock](AssetTransfersWithMetadataParams.md#toblock)
- [withMetadata](AssetTransfersWithMetadataParams.md#withmetadata)

## Properties

### category

• **category**: [`AssetTransfersCategory`](../enums/AssetTransfersCategory.md)[]

REQUIRED field. An array of categories to get transfers for.

#### Inherited from

[AssetTransfersParams](AssetTransfersParams.md).[category](AssetTransfersParams.md#category)

#### Defined in

[src/types/types.ts:405](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L405)

___

### contractAddresses

• `Optional` **contractAddresses**: `string`[]

List of contract addresses to filter for - only applies to "erc20",
"erc721", "erc1155" transfers. Defaults to all address if omitted.

#### Inherited from

[AssetTransfersParams](AssetTransfersParams.md).[contractAddresses](AssetTransfersParams.md#contractaddresses)

#### Defined in

[src/types/types.ts:396](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L396)

___

### excludeZeroValue

• `Optional` **excludeZeroValue**: `boolean`

Whether to exclude transfers with zero value. Note that zero value is
different than null value. Defaults to `true` if omitted.

#### Inherited from

[AssetTransfersParams](AssetTransfersParams.md).[excludeZeroValue](AssetTransfersParams.md#excludezerovalue)

#### Defined in

[src/types/types.ts:402](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L402)

___

### fromAddress

• `Optional` **fromAddress**: `string`

The from address to filter transfers by. This value defaults to a wildcard
for all addresses if omitted.

#### Inherited from

[AssetTransfersParams](AssetTransfersParams.md).[fromAddress](AssetTransfersParams.md#fromaddress)

#### Defined in

[src/types/types.ts:384](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L384)

___

### fromBlock

• `Optional` **fromBlock**: `string`

The starting block to check for transfers. This value is inclusive and
defaults to `0x0` if omitted.

#### Inherited from

[AssetTransfersParams](AssetTransfersParams.md).[fromBlock](AssetTransfersParams.md#fromblock)

#### Defined in

[src/types/types.ts:366](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L366)

___

### maxCount

• `Optional` **maxCount**: `number`

The maximum number of results to return per page. Defaults to 1000 if omitted.

#### Inherited from

[AssetTransfersParams](AssetTransfersParams.md).[maxCount](AssetTransfersParams.md#maxcount)

#### Defined in

[src/types/types.ts:408](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L408)

___

### order

• `Optional` **order**: [`SortingOrder`](../enums/SortingOrder.md)

Whether to return results in ascending or descending order by block number.
Defaults to ascending if omitted.

#### Inherited from

[AssetTransfersParams](AssetTransfersParams.md).[order](AssetTransfersParams.md#order)

#### Defined in

[src/types/types.ts:378](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L378)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [OwnedBaseNftsResponse](OwnedBaseNftsResponse.md)
[AssetTransfersResult](AssetTransfersResult.md)to use for pagination.

#### Inherited from

[AssetTransfersParams](AssetTransfersParams.md).[pageKey](AssetTransfersParams.md#pagekey)

#### Defined in

[src/types/types.ts:414](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L414)

___

### toAddress

• `Optional` **toAddress**: `string`

The to address to filter transfers by. This value defaults to a wildcard
for all address if omitted.

#### Inherited from

[AssetTransfersParams](AssetTransfersParams.md).[toAddress](AssetTransfersParams.md#toaddress)

#### Defined in

[src/types/types.ts:390](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L390)

___

### toBlock

• `Optional` **toBlock**: `string`

The ending block to check for transfers. This value is inclusive and
defaults to the latest block if omitted.

#### Inherited from

[AssetTransfersParams](AssetTransfersParams.md).[toBlock](AssetTransfersParams.md#toblock)

#### Defined in

[src/types/types.ts:372](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L372)

___

### withMetadata

• **withMetadata**: ``true``

Whether to include additional metadata about each transfer event. Defaults
to `false` if omitted.

#### Overrides

[AssetTransfersParams](AssetTransfersParams.md).[withMetadata](AssetTransfersParams.md#withmetadata)

#### Defined in

[src/types/types.ts:430](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/types.ts#L430)
