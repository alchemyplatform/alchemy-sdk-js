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

[src/types/types.ts:2456](https://github.com/alchemyplatform/alchemy-sdk-js/blob/aeb51c8/src/types/types.ts#L2456)

___

### topics

• `Optional` **topics**: (``null`` \| `string` \| `string`[])[]

The topics to filter by, or null to match any topics.

#### Defined in

[src/types/types.ts:2458](https://github.com/alchemyplatform/alchemy-sdk-js/blob/aeb51c8/src/types/types.ts#L2458)
