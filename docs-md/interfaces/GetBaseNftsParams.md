[exploring-pioneer](../README.md) / [Exports](../modules.md) / GetBaseNftsParams

# Interface: GetBaseNftsParams

Parameters object for the {@link (getNfts:1)} and {@link (getNftsPaginated:1)} functions.

This interface is used to fetch NFTs without their associated metadata. To
get Nfts with their associated metadata, use [GetNftsParams](GetNftsParams.md).

## Table of contents

### Properties

- [contractAddresses](GetBaseNftsParams.md#contractaddresses)
- [omitMetadata](GetBaseNftsParams.md#omitmetadata)
- [owner](GetBaseNftsParams.md#owner)
- [pageKey](GetBaseNftsParams.md#pagekey)

## Properties

### contractAddresses

• `Optional` **contractAddresses**: `string`[]

Optional list of contract addresses to filter the results by. Limit is 20.

#### Defined in

[types/types.ts:223](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/types/types.ts#L223)

___

### omitMetadata

• **omitMetadata**: ``true``

Optional boolean flag to include NFT metadata. Defaults to `false`.

#### Defined in

[types/types.ts:226](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/types/types.ts#L226)

___

### owner

• **owner**: `string`

The owner address of the NFTs.

#### Defined in

[types/types.ts:214](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/types/types.ts#L214)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [OwnedBaseNftsResponse](OwnedBaseNftsResponse.md) or
[OwnedNftsResponse](OwnedNftsResponse.md)to use for pagination.

#### Defined in

[types/types.ts:220](https://github.com/alchemyplatform/exploring-pioneer/blob/7c86334/src/types/types.ts#L220)
