[alchemy-sdk](../README.md) / [Exports](../modules.md) / DebugCallTracer

# Interface: DebugCallTracer

Tracer used with debug methods in the [DebugNamespace](../classes/DebugNamespace.md).

This tracer tracks all call frames executed during a transaction, including
depth 0. The returned result [DebugCallTrace](DebugCallTrace.md) is a nested list of call
frames executed as part of the call.

Here are some things to note when using the call tracer:
- Calls to precompiles are also included in the result.
- In case a frame reverts, the field output will contain the raw return data.
- In case the top level frame reverts, its `revertReason` field will contain
  the parsed reason of revert as returned by the Solidity contract

## Table of contents

### Properties

- [onlyTopCall](DebugCallTracer.md#onlytopcall)
- [type](DebugCallTracer.md#type)

## Properties

### onlyTopCall

• `Optional` **onlyTopCall**: `boolean`

Whether to only trace the main (top-level) calls and ignore sub-calls.
Defaults to `false`.

#### Defined in

[src/types/types.ts:2543](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/types/types.ts#L2543)

___

### type

• **type**: [`CALL_TRACER`](../enums/DebugTracerType.md#call_tracer)

Specified type is `CALL_TRACER`.

#### Defined in

[src/types/types.ts:2538](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c7197b9/src/types/types.ts#L2538)
