[alchemy-sdk](../README.md) / [Exports](../modules.md) / RefreshContractResult

# Interface: RefreshContractResult

The refresh result response object returned by [refreshContract](../classes/NftNamespace.md#refreshcontract).

## Table of contents

### Properties

- [contractAddress](RefreshContractResult.md#contractaddress)
- [progress](RefreshContractResult.md#progress)
- [refreshState](RefreshContractResult.md#refreshstate)

## Properties

### contractAddress

• **contractAddress**: `string`

The NFT contract address that was passed in to be refreshed.

#### Defined in

[src/types/types.ts:1388](https://github.com/alchemyplatform/alchemy-sdk-js/blob/85196e8/src/types/types.ts#L1388)

___

### progress

• **progress**: ``null`` \| `string`

Percentage of tokens currently refreshed, represented as an integer string.
Field can be null if the refresh has not occurred.

#### Defined in

[src/types/types.ts:1397](https://github.com/alchemyplatform/alchemy-sdk-js/blob/85196e8/src/types/types.ts#L1397)

___

### refreshState

• **refreshState**: [`RefreshState`](../enums/RefreshState.md)

The current state of the refresh request.

#### Defined in

[src/types/types.ts:1391](https://github.com/alchemyplatform/alchemy-sdk-js/blob/85196e8/src/types/types.ts#L1391)
