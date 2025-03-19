[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetOwnersForContractWithTokenBalancesOptions

# Interface: GetOwnersForContractWithTokenBalancesOptions

Optional parameters object for the [getNftsForContract](../classes/NftNamespace.md#getnftsforcontract) method.

This interface configures options when fetching the owner addresses of the
provided contract.

## Table of contents

### Properties

- [block](GetOwnersForContractWithTokenBalancesOptions.md#block)
- [pageKey](GetOwnersForContractWithTokenBalancesOptions.md#pagekey)
- [withTokenBalances](GetOwnersForContractWithTokenBalancesOptions.md#withtokenbalances)

## Properties

### block

• `Optional` **block**: `string`

The block number in hex or decimal to fetch owners for.

#### Defined in

[src/types/nft-types.ts:1059](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/nft-types.ts#L1059)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key to paginate the next page for large requests.

#### Defined in

[src/types/nft-types.ts:1062](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/nft-types.ts#L1062)

___

### withTokenBalances

• **withTokenBalances**: ``true``

Whether to include the token balances per token id for each owner. Defaults
to false when omitted.

#### Defined in

[src/types/nft-types.ts:1056](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/types/nft-types.ts#L1056)
