[@alch/alchemy-sdk](../README.md) / [Exports](../modules.md) / GetNftsForNftContractOptions

# Interface: GetNftsForNftContractOptions

Optional parameters object for the [getNftsForNftContract](../classes/Alchemy.md#getnftsfornftcontract) and
[getNftsForNftContractIterator](../classes/Alchemy.md#getnftsfornftcontractiterator) functions.

This interface is used to fetch NFTs with their associated metadata. To get
Nfts without their associated metadata, use [GetBaseNftsForNftContractOptions](GetBaseNftsForNftContractOptions.md).

## Table of contents

### Properties

- [omitMetadata](GetNftsForNftContractOptions.md#omitmetadata)
- [pageKey](GetNftsForNftContractOptions.md#pagekey)

## Properties

### omitMetadata

• `Optional` **omitMetadata**: `boolean`

Optional boolean flag to omit NFT metadata. Defaults to `false`.

#### Defined in

[types/types.ts:495](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L495)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [NftContractBaseNftsResponse](NftContractBaseNftsResponse.md) or
[NftContractNftsResponse](NftContractNftsResponse.md)to use for pagination.

#### Defined in

[types/types.ts:492](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L492)
