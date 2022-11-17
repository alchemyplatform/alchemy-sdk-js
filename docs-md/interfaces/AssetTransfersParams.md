[alchemy-sdk](../README.md) / [Exports](../modules.md) / AssetTransfersParams

# Interface: AssetTransfersParams

Parameters for the [CoreNamespace.getAssetTransfers](../classes/CoreNamespace.md#getassettransfers) method.

## Hierarchy

- **`AssetTransfersParams`**

  ↳ [`AssetTransfersWithMetadataParams`](AssetTransfersWithMetadataParams.md)

## Table of contents

### Properties

- [category](AssetTransfersParams.md#category)
- [contractAddresses](AssetTransfersParams.md#contractaddresses)
- [excludeZeroValue](AssetTransfersParams.md#excludezerovalue)
- [fromAddress](AssetTransfersParams.md#fromaddress)
- [fromBlock](AssetTransfersParams.md#fromblock)
- [maxCount](AssetTransfersParams.md#maxcount)
- [order](AssetTransfersParams.md#order)
- [pageKey](AssetTransfersParams.md#pagekey)
- [toAddress](AssetTransfersParams.md#toaddress)
- [toBlock](AssetTransfersParams.md#toblock)
- [withMetadata](AssetTransfersParams.md#withmetadata)

## Properties

### category

• **category**: [`AssetTransfersCategory`](../enums/AssetTransfersCategory.md)[]

REQUIRED field. An array of categories to get transfers for.

#### Defined in

[src/types/types.ts:238](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8b1ae5c/src/types/types.ts#L238)

___

### contractAddresses

• `Optional` **contractAddresses**: `string`[]

List of contract addresses to filter for - only applies to "erc20",
"erc721", "erc1155" transfers. Defaults to all address if omitted.

#### Defined in

[src/types/types.ts:229](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8b1ae5c/src/types/types.ts#L229)

___

### excludeZeroValue

• `Optional` **excludeZeroValue**: `boolean`

Whether to exclude transfers with zero value. Note that zero value is
different than null value. Defaults to `false` if omitted.

#### Defined in

[src/types/types.ts:235](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8b1ae5c/src/types/types.ts#L235)

___

### fromAddress

• `Optional` **fromAddress**: `string`

The from address to filter transfers by. This value defaults to a wildcard
for all addresses if omitted.

#### Defined in

[src/types/types.ts:217](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8b1ae5c/src/types/types.ts#L217)

___

### fromBlock

• `Optional` **fromBlock**: `string`

The starting block to check for transfers. This value is inclusive and
defaults to `0x0` if omitted.

#### Defined in

[src/types/types.ts:199](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8b1ae5c/src/types/types.ts#L199)

___

### maxCount

• `Optional` **maxCount**: `number`

The maximum number of results to return per page. Defaults to 1000 if omitted.

#### Defined in

[src/types/types.ts:241](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8b1ae5c/src/types/types.ts#L241)

___

### order

• `Optional` **order**: [`SortingOrder`](../enums/SortingOrder.md)

Whether to return results in ascending or descending order by block number.
Defaults to ascending if omitted.

#### Defined in

[src/types/types.ts:211](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8b1ae5c/src/types/types.ts#L211)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [OwnedBaseNftsResponse](OwnedBaseNftsResponse.md)
[AssetTransfersResult](AssetTransfersResult.md)to use for pagination.

#### Defined in

[src/types/types.ts:247](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8b1ae5c/src/types/types.ts#L247)

___

### toAddress

• `Optional` **toAddress**: `string`

The to address to filter transfers by. This value defaults to a wildcard
for all address if omitted.

#### Defined in

[src/types/types.ts:223](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8b1ae5c/src/types/types.ts#L223)

___

### toBlock

• `Optional` **toBlock**: `string`

The ending block to check for transfers. This value is inclusive and
defaults to the latest block if omitted.

#### Defined in

[src/types/types.ts:205](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8b1ae5c/src/types/types.ts#L205)

___

### withMetadata

• `Optional` **withMetadata**: `boolean`

Whether to include additional metadata about each transfer event. Defaults
to `false` if omitted.

#### Defined in

[src/types/types.ts:253](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8b1ae5c/src/types/types.ts#L253)
