[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetTransfersForContractOptions

# Interface: GetTransfersForContractOptions

Optional parameters object for the [NftNamespace.getTransfersForOwner](../classes/NftNamespace.md#gettransfersforowner)
method.

## Table of contents

### Properties

- [fromBlock](GetTransfersForContractOptions.md#fromblock)
- [order](GetTransfersForContractOptions.md#order)
- [pageKey](GetTransfersForContractOptions.md#pagekey)
- [toBlock](GetTransfersForContractOptions.md#toblock)

## Properties

### fromBlock

• `Optional` **fromBlock**: [`BlockTag`](../modules.md#blocktag)

Starting block (inclusive) to get transfers from.

#### Defined in

[src/types/nft-types.ts:581](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5cfa150/src/types/nft-types.ts#L581)

___

### order

• `Optional` **order**: [`SortingOrder`](../enums/SortingOrder.md)

Whether to return results in ascending or descending order by block number.
Defaults to ascending if omitted.

#### Defined in

[src/types/nft-types.ts:588](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5cfa150/src/types/nft-types.ts#L588)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [TransfersNftResponse](TransfersNftResponse.md) to use for
pagination.

#### Defined in

[src/types/nft-types.ts:593](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5cfa150/src/types/nft-types.ts#L593)

___

### toBlock

• `Optional` **toBlock**: [`BlockTag`](../modules.md#blocktag)

Ending block (inclusive) to get transfers from.

#### Defined in

[src/types/nft-types.ts:583](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5cfa150/src/types/nft-types.ts#L583)
