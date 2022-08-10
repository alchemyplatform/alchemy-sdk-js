[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetBaseNftsForOwnerOptions

# Interface: GetBaseNftsForOwnerOptions

Optional parameters object for the [getNftsForOwner](../classes/NftNamespace.md#getnftsforowner) and
[getNftsForOwnerIterator](../classes/NftNamespace.md#getnftsforowneriterator) functions.

This interface is used to fetch NFTs without their associated metadata. To
get Nfts with their associated metadata, use [GetNftsForOwnerOptions](GetNftsForOwnerOptions.md).

## Table of contents

### Properties

- [contractAddresses](GetBaseNftsForOwnerOptions.md#contractaddresses)
- [excludeFilters](GetBaseNftsForOwnerOptions.md#excludefilters)
- [omitMetadata](GetBaseNftsForOwnerOptions.md#omitmetadata)
- [pageKey](GetBaseNftsForOwnerOptions.md#pagekey)

## Properties

### contractAddresses

• `Optional` **contractAddresses**: `string`[]

Optional list of contract addresses to filter the results by. Limit is 20.

#### Defined in

[src/types/types.ts:278](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fd39d10/src/types/types.ts#L278)

___

### excludeFilters

• `Optional` **excludeFilters**: [`SPAM`](../enums/NftExcludeFilters.md#spam)[]

Optional list of filters applied to the query. NFTs that match one or more
of these filters are excluded from the response.

#### Defined in

[src/types/types.ts:284](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fd39d10/src/types/types.ts#L284)

___

### omitMetadata

• **omitMetadata**: ``true``

Optional boolean flag to include NFT metadata. Defaults to `false`.

#### Defined in

[src/types/types.ts:287](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fd39d10/src/types/types.ts#L287)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [OwnedBaseNftsResponse](OwnedBaseNftsResponse.md) or
[OwnedNftsResponse](OwnedNftsResponse.md)to use for pagination.

#### Defined in

[src/types/types.ts:275](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fd39d10/src/types/types.ts#L275)
