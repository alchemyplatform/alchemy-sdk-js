[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetOwnersForContractOptions

# Interface: GetOwnersForContractOptions

Optional parameters object for the [getNftsForContract](../classes/NftNamespace.md#getnftsforcontract) method.

This interface configures options when fetching the owner addresses of the
provided contract.

## Table of contents

### Properties

- [block](GetOwnersForContractOptions.md#block)
- [includeCount](GetOwnersForContractOptions.md#includecount)
- [pageKey](GetOwnersForContractOptions.md#pagekey)
- [withTokenBalances](GetOwnersForContractOptions.md#withtokenbalances)

## Properties

### block

• `Optional` **block**: `string`

The block number in hex or decimal to fetch owners for.

#### Defined in

[src/types/nft-types.ts:1031](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8c9409f/src/types/nft-types.ts#L1031)

___

### includeCount

• `Optional` **includeCount**: `boolean`

If true, include total count of owners in the response. Only applicable
when `withTokenBalances` is not set to `true`.

#### Defined in

[src/types/nft-types.ts:1040](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8c9409f/src/types/nft-types.ts#L1040)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key to paginate the next page for large requests.

#### Defined in

[src/types/nft-types.ts:1034](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8c9409f/src/types/nft-types.ts#L1034)

___

### withTokenBalances

• `Optional` **withTokenBalances**: `boolean`

Whether to include the token balances per token id for each owner. Defaults
to false when omitted.

#### Defined in

[src/types/nft-types.ts:1028](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8c9409f/src/types/nft-types.ts#L1028)
