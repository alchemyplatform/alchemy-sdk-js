[alchemy-sdk](../README.md) / [Exports](../modules.md) / EventFilter

# Interface: EventFilter

Filter object used to filter logs by when using [CoreNamespace.getLogs](../classes/CoreNamespace.md#getlogs)

## Hierarchy

- **`EventFilter`**

  ↳ [`FilterByBlockHash`](FilterByBlockHash.md)

  ↳ [`Filter`](Filter.md)

## Table of contents

### Properties

- [address](EventFilter.md#address)
- [topics](EventFilter.md#topics)

## Properties

### address

• `Optional` **address**: `string` \| `string`[]

The address to filter by. If omitted, filters for all addresses.

#### Defined in

[src/types/types.ts:2572](https://github.com/alchemyplatform/alchemy-sdk-js/blob/85196e8/src/types/types.ts#L2572)

___

### topics

• `Optional` **topics**: (``null`` \| `string` \| `string`[])[]

The topics to filter by, or null to match any topics.

#### Defined in

[src/types/types.ts:2574](https://github.com/alchemyplatform/alchemy-sdk-js/blob/85196e8/src/types/types.ts#L2574)
