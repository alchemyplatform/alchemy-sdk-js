[@alch/alchemy-sdk](../README.md) / [Exports](../modules.md) / GetNftsForOwnerOptions

# Interface: GetNftsForOwnerOptions

Optional parameters object for the [getNftsForOwner](../classes/Alchemy.md#getnftsforowner) and
[getNftsForOwnerIterator](../classes/Alchemy.md#getnftsforowneriterator) functions.

This interface is used to fetch NFTs with their associated metadata. To get
Nfts without their associated metadata, use [GetBaseNftsForOwnerOptions](GetBaseNftsForOwnerOptions.md).

## Table of contents

### Properties

- [contractAddresses](GetNftsForOwnerOptions.md#contractaddresses)
- [excludeFilters](GetNftsForOwnerOptions.md#excludefilters)
- [omitMetadata](GetNftsForOwnerOptions.md#omitmetadata)
- [pageKey](GetNftsForOwnerOptions.md#pagekey)

## Properties

### contractAddresses

• `Optional` **contractAddresses**: `string`[]

Optional list of contract addresses to filter the results by. Limit is 20.

#### Defined in

[types/types.ts:231](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L231)

___

### excludeFilters

• `Optional` **excludeFilters**: [`SPAM`](../enums/NftExcludeFilters.md#spam)[]

Optional list of filters applied to the query. NFTs that match one or more
of these filters are excluded from the response.

#### Defined in

[types/types.ts:237](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L237)

___

### omitMetadata

• `Optional` **omitMetadata**: `boolean`

Optional boolean flag to omit NFT metadata. Defaults to `false`.

#### Defined in

[types/types.ts:240](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L240)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [OwnedBaseNftsResponse](OwnedBaseNftsResponse.md) or
[OwnedNftsResponse](OwnedNftsResponse.md)to use for pagination.

#### Defined in

[types/types.ts:228](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L228)
