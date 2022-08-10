[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetNftsForContractOptions

# Interface: GetNftsForContractOptions

Optional parameters object for the [getNftsForContract](../classes/NftNamespace.md#getnftsforcontract) and
[getNftsForContractIterator](../classes/NftNamespace.md#getnftsforcontractiterator) functions.

This interface is used to fetch NFTs with their associated metadata. To get
Nfts without their associated metadata, use [GetBaseNftsForContractOptions](GetBaseNftsForContractOptions.md).

## Table of contents

### Properties

- [omitMetadata](GetNftsForContractOptions.md#omitmetadata)
- [pageKey](GetNftsForContractOptions.md#pagekey)
- [pageSize](GetNftsForContractOptions.md#pagesize)

## Properties

### omitMetadata

• `Optional` **omitMetadata**: `boolean`

Optional boolean flag to omit NFT metadata. Defaults to `false`.

#### Defined in

[src/types/types.ts:513](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fd39d10/src/types/types.ts#L513)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [NftContractBaseNftsResponse](NftContractBaseNftsResponse.md) or
[NftContractNftsResponse](NftContractNftsResponse.md)to use for pagination.

#### Defined in

[src/types/types.ts:510](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fd39d10/src/types/types.ts#L510)

___

### pageSize

• `Optional` **pageSize**: `number`

Sets the total number of NFTs to return in the response. Defaults to 100.

#### Defined in

[src/types/types.ts:516](https://github.com/alchemyplatform/alchemy-sdk-js/blob/fd39d10/src/types/types.ts#L516)
