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

[src/types/types.ts:635](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/types.ts#L635)

___

### progress

• **progress**: ``null`` \| `string`

Percentage of tokens currently refreshed, represented as an integer string.
Field can be null if the refresh has not occurred.

#### Defined in

[src/types/types.ts:644](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/types.ts#L644)

___

### refreshState

• **refreshState**: [`NftRefreshState`](../enums/NftRefreshState.md)

The current state of the refresh request.

#### Defined in

[src/types/types.ts:638](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/types.ts#L638)
