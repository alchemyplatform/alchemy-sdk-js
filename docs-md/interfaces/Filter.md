[alchemy-sdk](../README.md) / [Exports](../modules.md) / Filter

# Interface: Filter

Filter object used to filter logs by block number range when using
[CoreNamespace.getLogs](../classes/CoreNamespace.md#getlogs)

## Hierarchy

- [`EventFilter`](EventFilter.md)

  ↳ **`Filter`**

## Table of contents

### Properties

- [address](Filter.md#address)
- [fromBlock](Filter.md#fromblock)
- [toBlock](Filter.md#toblock)
- [topics](Filter.md#topics)

## Properties

### address

• `Optional` **address**: `string` \| `string`[]

The address to filter by. If omitted, filters for all addresses.

#### Inherited from

[EventFilter](EventFilter.md).[address](EventFilter.md#address)

#### Defined in

[src/types/types.ts:1467](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6dc36f9/src/types/types.ts#L1467)

___

### fromBlock

• `Optional` **fromBlock**: [`BlockTag`](../modules.md#blocktag)

The starting block (inclusive) to search for logs matching the filter.

#### Defined in

[src/types/types.ts:1457](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6dc36f9/src/types/types.ts#L1457)

___

### toBlock

• `Optional` **toBlock**: [`BlockTag`](../modules.md#blocktag)

The end block (inclusive) to search for logs matching the filter.

#### Defined in

[src/types/types.ts:1459](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6dc36f9/src/types/types.ts#L1459)

___

### topics

• `Optional` **topics**: (``null`` \| `string` \| `string`[])[]

The topics to filter by, or null to match any topics.

#### Inherited from

[EventFilter](EventFilter.md).[topics](EventFilter.md#topics)

#### Defined in

[src/types/types.ts:1469](https://github.com/alchemyplatform/alchemy-sdk-js/blob/6dc36f9/src/types/types.ts#L1469)
