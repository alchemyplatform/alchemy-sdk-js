[alchemy-sdk](../README.md) / [Exports](../modules.md) / SimulateAssetChangesResponse

# Interface: SimulateAssetChangesResponse

Response object for the [TransactNamespace.simulateAssetChanges](../classes/TransactNamespace.md#simulateassetchanges) method.

## Table of contents

### Properties

- [changes](SimulateAssetChangesResponse.md#changes)
- [error](SimulateAssetChangesResponse.md#error)
- [gasUsed](SimulateAssetChangesResponse.md#gasused)

## Properties

### changes

• **changes**: [`SimulateAssetChangesChange`](SimulateAssetChangesChange.md)[]

An array of asset changes that resulted from the transaction.

#### Defined in

[src/types/types.ts:1931](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7bf2430/src/types/types.ts#L1931)

___

### error

• `Optional` **error**: [`SimulateAssetChangesError`](SimulateAssetChangesError.md)

Optional error field that is present if an error occurred.

#### Defined in

[src/types/types.ts:1938](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7bf2430/src/types/types.ts#L1938)

___

### gasUsed

• `Optional` **gasUsed**: `string`

The amount of gas used by the transaction represented as a hex string. The
field is undefined if an error occurred.

#### Defined in

[src/types/types.ts:1936](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7bf2430/src/types/types.ts#L1936)
