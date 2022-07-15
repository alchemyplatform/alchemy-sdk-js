[@alch/alchemy-sdk](../README.md) / [Exports](../modules.md) / RefreshNftContractResult

# Interface: RefreshNftContractResult

The refresh result response object returned by [refreshNftContract](../classes/Alchemy.md#refreshnftcontract).

## Table of contents

### Properties

- [contractAddress](RefreshNftContractResult.md#contractaddress)
- [progress](RefreshNftContractResult.md#progress)
- [refreshState](RefreshNftContractResult.md#refreshstate)

## Properties

### contractAddress

• **contractAddress**: `string`

The NFT contract address that was passed in to be refreshed.

#### Defined in

[types/types.ts:412](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L412)

___

### progress

• **progress**: ``null`` \| `string`

Percentage of tokens currently refreshed, represented as an integer string.
Field can be null if the refresh has not occurred.

#### Defined in

[types/types.ts:421](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L421)

___

### refreshState

• **refreshState**: [`RefreshState`](../enums/RefreshState.md)

The current state of the refresh request.

#### Defined in

[types/types.ts:415](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L415)
