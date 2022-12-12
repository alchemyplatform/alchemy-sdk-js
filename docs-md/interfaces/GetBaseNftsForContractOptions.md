[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetBaseNftsForContractOptions

# Interface: GetBaseNftsForContractOptions

Optional parameters object for the [getNftsForContract](../classes/NftNamespace.md#getnftsforcontract) and
[getNftsForContractIterator](../classes/NftNamespace.md#getnftsforcontractiterator) functions.

This interface is used to fetch NFTs without their associated metadata. To
get Nfts with their associated metadata, use [GetNftsForContractOptions](GetNftsForContractOptions.md).

## Table of contents

### Properties

- [omitMetadata](GetBaseNftsForContractOptions.md#omitmetadata)
- [pageKey](GetBaseNftsForContractOptions.md#pagekey)
- [pageSize](GetBaseNftsForContractOptions.md#pagesize)

## Properties

### omitMetadata

• **omitMetadata**: ``false``

Optional boolean flag to omit NFT metadata. Defaults to `false`.

#### Defined in

[src/types/types.ts:1176](https://github.com/alchemyplatform/alchemy-sdk-js/blob/d97ef0d/src/types/types.ts#L1176)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [NftContractBaseNftsResponse](NftContractBaseNftsResponse.md) or
[NftContractNftsResponse](NftContractNftsResponse.md)to use for pagination.

#### Defined in

[src/types/types.ts:1173](https://github.com/alchemyplatform/alchemy-sdk-js/blob/d97ef0d/src/types/types.ts#L1173)

___

### pageSize

• `Optional` **pageSize**: `number`

Sets the total number of NFTs to return in the response. Defaults to 100.
Maximum page size is 100.

#### Defined in

[src/types/types.ts:1182](https://github.com/alchemyplatform/alchemy-sdk-js/blob/d97ef0d/src/types/types.ts#L1182)
