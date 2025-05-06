[alchemy-sdk](../README.md) / [Exports](../modules.md) / DebugPrestateTracer

# Interface: DebugPrestateTracer

Tracer used with debug methods in the [DebugNamespace](../classes/DebugNamespace.md).

This tracer replays the transaction and tracks every part of state that was
touched during the transaction.

Returns a [DebugPrestateTrace](../modules.md#debugprestatetrace). This contains sufficient information to
create a local execution of the transaction from a custom assembled genesis
block.

## Table of contents

### Properties

- [onlyTopCall](DebugPrestateTracer.md#onlytopcall)
- [type](DebugPrestateTracer.md#type)

## Properties

### onlyTopCall

• `Optional` **onlyTopCall**: `boolean`

Whether to only trace the main (top-level) calls and ignore sub-calls.
Defaults to `false`.

#### Defined in

[src/types/types.ts:1551](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/types/types.ts#L1551)

___

### type

• **type**: [`PRESTATE_TRACER`](../enums/DebugTracerType.md#prestate_tracer)

Specified type is `PRESTATE_TRACER`.

#### Defined in

[src/types/types.ts:1546](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/types/types.ts#L1546)
