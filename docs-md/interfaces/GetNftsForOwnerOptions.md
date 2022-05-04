[alchemy-evm-js](../README.md) / [Exports](../modules.md) / GetNftsForOwnerOptions

# Interface: GetNftsForOwnerOptions

Optional parameters object for the [getNftsForOwner](../modules.md#getnftsforowner) and
[getNftsForOwnerIterator](../modules.md#getnftsforowneriterator) functions.

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

[types/types.ts:186](https://github.com/alchemyplatform/alchemy-evm-js/blob/9408ee9/src/types/types.ts#L186)

___

### excludeFilters

• `Optional` **excludeFilters**: [`SPAM`](../enums/NftExcludeFilters.md#spam)[]

Optional list of filters applied to the query. NFTs that match one or more
of these filters are excluded from the response.

#### Defined in

[types/types.ts:192](https://github.com/alchemyplatform/alchemy-evm-js/blob/9408ee9/src/types/types.ts#L192)

___

### omitMetadata

• `Optional` **omitMetadata**: `boolean`

Optional boolean flag to omit NFT metadata. Defaults to `false`.

#### Defined in

[types/types.ts:195](https://github.com/alchemyplatform/alchemy-evm-js/blob/9408ee9/src/types/types.ts#L195)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [OwnedBaseNftsResponse](OwnedBaseNftsResponse.md) or
[OwnedNftsResponse](OwnedNftsResponse.md)to use for pagination.

#### Defined in

[types/types.ts:183](https://github.com/alchemyplatform/alchemy-evm-js/blob/9408ee9/src/types/types.ts#L183)
