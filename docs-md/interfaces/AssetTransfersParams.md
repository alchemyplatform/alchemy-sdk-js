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

[src/types/types.ts:319](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/types.ts#L319)

___

### contractAddresses

• `Optional` **contractAddresses**: `string`[]

List of contract addresses to filter for - only applies to "erc20",
"erc721", "erc1155" transfers. Defaults to all address if omitted.

#### Defined in

[src/types/types.ts:310](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/types.ts#L310)

___

### excludeZeroValue

• `Optional` **excludeZeroValue**: `boolean`

Whether to exclude transfers with zero value. Note that zero value is
different than null value. Defaults to `true` if omitted.

#### Defined in

[src/types/types.ts:316](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/types.ts#L316)

___

### fromAddress

• `Optional` **fromAddress**: `string`

The from address to filter transfers by. This value defaults to a wildcard
for all addresses if omitted.

#### Defined in

[src/types/types.ts:298](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/types.ts#L298)

___

### fromBlock

• `Optional` **fromBlock**: `string`

The starting block to check for transfers. This value is inclusive and
defaults to `0x0` if omitted.

#### Defined in

[src/types/types.ts:280](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/types.ts#L280)

___

### maxCount

• `Optional` **maxCount**: `number`

The maximum number of results to return per page. Defaults to 1000 if omitted.

#### Defined in

[src/types/types.ts:322](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/types.ts#L322)

___

### order

• `Optional` **order**: [`SortingOrder`](../enums/SortingOrder.md)

Whether to return results in ascending or descending order by block number.
Defaults to ascending if omitted.

#### Defined in

[src/types/types.ts:292](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/types.ts#L292)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [OwnedBaseNftsResponse](OwnedBaseNftsResponse.md)
[AssetTransfersResult](AssetTransfersResult.md)to use for pagination.

#### Defined in

[src/types/types.ts:328](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/types.ts#L328)

___

### toAddress

• `Optional` **toAddress**: `string`

The to address to filter transfers by. This value defaults to a wildcard
for all address if omitted.

#### Defined in

[src/types/types.ts:304](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/types.ts#L304)

___

### toBlock

• `Optional` **toBlock**: `string`

The ending block to check for transfers. This value is inclusive and
defaults to the latest block if omitted.

#### Defined in

[src/types/types.ts:286](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/types.ts#L286)

___

### withMetadata

• `Optional` **withMetadata**: `boolean`

Whether to include additional metadata about each transfer event. Defaults
to `false` if omitted.

#### Defined in

[src/types/types.ts:334](https://github.com/alchemyplatform/alchemy-sdk-js/blob/89d639ce/src/types/types.ts#L334)
