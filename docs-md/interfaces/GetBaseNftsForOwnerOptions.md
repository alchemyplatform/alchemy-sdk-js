[@alch/alchemy-sdk](../README.md) / [Exports](../modules.md) / GetBaseNftsForOwnerOptions

# Interface: GetBaseNftsForOwnerOptions

Optional parameters object for the [getNftsForOwner](../classes/Alchemy.md#getnftsforowner) and
[getNftsForOwnerIterator](../classes/Alchemy.md#getnftsforowneriterator) functions.

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

[types/types.ts:260](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L260)

___

### excludeFilters

• `Optional` **excludeFilters**: [`SPAM`](../enums/NftExcludeFilters.md#spam)[]

Optional list of filters applied to the query. NFTs that match one or more
of these filters are excluded from the response.

#### Defined in

[types/types.ts:266](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L266)

___

### omitMetadata

• **omitMetadata**: ``true``

Optional boolean flag to include NFT metadata. Defaults to `false`.

#### Defined in

[types/types.ts:269](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L269)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [OwnedBaseNftsResponse](OwnedBaseNftsResponse.md) or
[OwnedNftsResponse](OwnedNftsResponse.md)to use for pagination.

#### Defined in

[types/types.ts:257](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L257)
