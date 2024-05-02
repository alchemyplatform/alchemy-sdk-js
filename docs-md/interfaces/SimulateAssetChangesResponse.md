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

[src/types/types.ts:858](https://github.com/alchemyplatform/alchemy-sdk-js/blob/311be54/src/types/types.ts#L858)

___

### error

• `Optional` **error**: [`SimulateAssetChangesError`](SimulateAssetChangesError.md)

Optional error field that is present if an error occurred.

#### Defined in

[src/types/types.ts:865](https://github.com/alchemyplatform/alchemy-sdk-js/blob/311be54/src/types/types.ts#L865)

___

### gasUsed

• `Optional` **gasUsed**: `string`

The amount of gas used by the transaction represented as a hex string. The
field is undefined if an error occurred.

#### Defined in

[src/types/types.ts:863](https://github.com/alchemyplatform/alchemy-sdk-js/blob/311be54/src/types/types.ts#L863)
