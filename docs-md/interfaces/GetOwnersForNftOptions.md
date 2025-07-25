[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetOwnersForNftOptions

# Interface: GetOwnersForNftOptions

Optional parameters object for the [getOwnersForNft](../classes/NftNamespace.md#getownersfornft) method.

This interface configures options when fetching the owner addresses of the
provided NFT contract.

## Table of contents

### Properties

- [pageKey](GetOwnersForNftOptions.md#pagekey)
- [pageSize](GetOwnersForNftOptions.md#pagesize)

## Properties

### pageKey

• `Optional` **pageKey**: `string`

Optional page key to paginate the next page for large requests.

#### Defined in

[src/types/nft-types.ts:1074](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/nft-types.ts#L1074)

___

### pageSize

• `Optional` **pageSize**: `number`

Sets the total number of owners to return in the response.

#### Defined in

[src/types/nft-types.ts:1079](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/types/nft-types.ts#L1079)
