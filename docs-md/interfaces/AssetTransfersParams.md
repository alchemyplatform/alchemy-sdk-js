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

[src/types/types.ts:211](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L211)

___

### contractAddresses

• `Optional` **contractAddresses**: `string`[]

List of contract addresses to filter for - only applies to "erc20",
"erc721", "erc1155" transfers. Defaults to all address if omitted.

#### Defined in

[src/types/types.ts:202](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L202)

___

### excludeZeroValue

• `Optional` **excludeZeroValue**: `boolean`

Whether to exclude transfers with zero value. Note that zero value is
different than null value. Defaults to `false` if omitted.

#### Defined in

[src/types/types.ts:208](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L208)

___

### fromAddress

• `Optional` **fromAddress**: `string`

The from address to filter transfers by. This value defaults to a wildcard
for all addresses if omitted.

#### Defined in

[src/types/types.ts:190](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L190)

___

### fromBlock

• `Optional` **fromBlock**: `string`

The starting block to check for transfers. This value is inclusive and
defaults to `0x0` if omitted.

#### Defined in

[src/types/types.ts:172](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L172)

___

### maxCount

• `Optional` **maxCount**: `number`

The maximum number of results to return per page. Defaults to 1000 if omitted.

#### Defined in

[src/types/types.ts:214](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L214)

___

### order

• `Optional` **order**: [`AssetTransfersOrder`](../enums/AssetTransfersOrder.md)

Whether to return results in ascending or descending order by block number.
Defaults to ascending if omitted.

#### Defined in

[src/types/types.ts:184](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L184)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [OwnedBaseNftsResponse](OwnedBaseNftsResponse.md)
[AssetTransfersResult](AssetTransfersResult.md)to use for pagination.

#### Defined in

[src/types/types.ts:220](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L220)

___

### toAddress

• `Optional` **toAddress**: `string`

The to address to filter transfers by. This value defaults to a wildcard
for all address if omitted.

#### Defined in

[src/types/types.ts:196](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L196)

___

### toBlock

• `Optional` **toBlock**: `string`

The ending block to check for transfers. This value is inclusive and
defaults to the latest block if omitted.

#### Defined in

[src/types/types.ts:178](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L178)

___

### withMetadata

• `Optional` **withMetadata**: `boolean`

Whether to include additional metadata about each transfer event. Defaults
to `false` if omitted.

#### Defined in

[src/types/types.ts:226](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L226)
