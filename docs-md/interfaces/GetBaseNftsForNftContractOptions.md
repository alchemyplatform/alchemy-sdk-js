[@alch/alchemy-sdk](../README.md) / [Exports](../modules.md) / GetBaseNftsForNftContractOptions

# Interface: GetBaseNftsForNftContractOptions

Optional parameters object for the [getNftsForNftContract](../classes/Alchemy.md#getnftsfornftcontract) and
[getNftsForNftContractIterator](../classes/Alchemy.md#getnftsfornftcontractiterator) functions.

This interface is used to fetch NFTs without their associated metadata. To
get Nfts with their associated metadata, use [GetNftsForNftContractOptions](GetNftsForNftContractOptions.md).

## Table of contents

### Properties

- [omitMetadata](GetBaseNftsForNftContractOptions.md#omitmetadata)
- [pageKey](GetBaseNftsForNftContractOptions.md#pagekey)

## Properties

### omitMetadata

• **omitMetadata**: ``false``

Optional boolean flag to omit NFT metadata. Defaults to `false`.

#### Defined in

[types/types.ts:515](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L515)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [NftContractBaseNftsResponse](NftContractBaseNftsResponse.md) or
[NftContractNftsResponse](NftContractNftsResponse.md)to use for pagination.

#### Defined in

[types/types.ts:512](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L512)
