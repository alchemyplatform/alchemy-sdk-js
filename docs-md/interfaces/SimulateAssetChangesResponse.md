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

[src/types/types.ts:852](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/types.ts#L852)

___

### error

• `Optional` **error**: [`SimulateAssetChangesError`](SimulateAssetChangesError.md)

Optional error field that is present if an error occurred.

#### Defined in

[src/types/types.ts:859](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/types.ts#L859)

___

### gasUsed

• `Optional` **gasUsed**: `string`

The amount of gas used by the transaction represented as a hex string. The
field is undefined if an error occurred.

#### Defined in

[src/types/types.ts:857](https://github.com/alchemyplatform/alchemy-sdk-js/blob/7ae04a5/src/types/types.ts#L857)
