[alchemy-sdk](../README.md) / [Exports](../modules.md) / SimulateChangeType

# Enumeration: SimulateChangeType

Change type returned when calling [TransactNamespace.simulateAssetChanges](../classes/TransactNamespace.md#simulateassetchanges).

## Table of contents

### Enumeration members

- [APPROVE](SimulateChangeType.md#approve)
- [TRANSFER](SimulateChangeType.md#transfer)

## Enumeration members

### APPROVE

• **APPROVE** = `"APPROVE"`

Represents a transaction that approved or disapproved permissions for a
contract.

APPROVE without token ID → approve all tokens
APPROVE without amount → approve all amount
APPROVE with zero amount → approval being cleared

#### Defined in

[src/types/types.ts:1920](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ee5b9ee/src/types/types.ts#L1920)

___

### TRANSFER

• **TRANSFER** = `"TRANSFER"`

Represents a transaction that transferred tokens from one address to another.

#### Defined in

[src/types/types.ts:1925](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ee5b9ee/src/types/types.ts#L1925)
