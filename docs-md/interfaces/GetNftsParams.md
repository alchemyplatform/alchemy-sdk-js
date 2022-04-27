[exploring-pioneer](../README.md) / [Exports](../modules.md) / GetNftsParams

# Interface: GetNftsParams

Parameters object for the {@link (getNfts:2)} and {@link (getNftsPaginated:2)} functions.

This interface is used to fetch NFTs with their associated metadata. To get
Nfts without their associated metadata, use [GetBaseNftsParams](GetBaseNftsParams.md).

## Table of contents

### Properties

- [contractAddresses](GetNftsParams.md#contractaddresses)
- [omitMetadata](GetNftsParams.md#omitmetadata)
- [owner](GetNftsParams.md#owner)
- [pageKey](GetNftsParams.md#pagekey)

## Properties

### contractAddresses

• `Optional` **contractAddresses**: `string`[]

Optional list of contract addresses to filter the results by. Limit is 20.

#### Defined in

[types/types.ts:198](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/types/types.ts#L198)

___

### omitMetadata

• `Optional` **omitMetadata**: `boolean`

Optional boolean flag to omit NFT metadata. Defaults to `false`.

#### Defined in

[types/types.ts:201](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/types/types.ts#L201)

___

### owner

• **owner**: `string`

The owner address of the NFTs.

#### Defined in

[types/types.ts:189](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/types/types.ts#L189)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [OwnedBaseNftsResponse](OwnedBaseNftsResponse.md) or
[OwnedNftsResponse](OwnedNftsResponse.md)to use for pagination.

#### Defined in

[types/types.ts:195](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/types/types.ts#L195)
