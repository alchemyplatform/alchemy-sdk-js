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

[src/types/types.ts:1468](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8c9409f/src/types/types.ts#L1468)

___

### fromBlock

• `Optional` **fromBlock**: [`BlockTag`](../modules.md#blocktag)

The starting block (inclusive) to search for logs matching the filter.

#### Defined in

[src/types/types.ts:1458](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8c9409f/src/types/types.ts#L1458)

___

### toBlock

• `Optional` **toBlock**: [`BlockTag`](../modules.md#blocktag)

The end block (inclusive) to search for logs matching the filter.

#### Defined in

[src/types/types.ts:1460](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8c9409f/src/types/types.ts#L1460)

___

### topics

• `Optional` **topics**: (``null`` \| `string` \| `string`[])[]

The topics to filter by, or null to match any topics.

#### Inherited from

[EventFilter](EventFilter.md).[topics](EventFilter.md#topics)

#### Defined in

[src/types/types.ts:1470](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8c9409f/src/types/types.ts#L1470)
