[alchemy-sdk](../README.md) / [Exports](../modules.md) / DebugNamespace

# Class: DebugNamespace

The Debug namespace contains methods to access the non-standard RPC methods
for inspecting and debugging transactions.

For more information on the different methods and use cases please read our
[documentation](https://docs.alchemy.com/reference/debug-api-quickstart).

Do not call this constructor directly. Instead, instantiate an Alchemy object
with `const alchemy = new Alchemy(config)` and then access the debug namespace
via `alchemy.debug`.

## Table of contents

### Methods

- [traceBlock](DebugNamespace.md#traceblock)
- [traceCall](DebugNamespace.md#tracecall)
- [traceTransaction](DebugNamespace.md#tracetransaction)

## Methods

### traceBlock

▸ **traceBlock**(`blockIdentifier`, `tracer`): `Promise`<[`DebugCallTrace`](../interfaces/DebugCallTrace.md)\>

Replays a block that has already been mined.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockIdentifier` | `string` \| `number` | The block to debug the transaction in. Can be a block hash, block number hex string, or commitment level. |
| `tracer` | [`DebugCallTracer`](../interfaces/DebugCallTracer.md) | Tracer type and configuration. |

#### Returns

`Promise`<[`DebugCallTrace`](../interfaces/DebugCallTrace.md)\>

#### Defined in

[src/api/debug-namespace.ts:120](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/api/debug-namespace.ts#L120)

▸ **traceBlock**(`blockIdentifier`, `tracer`): `Promise`<[`DebugPrestateTrace`](../modules.md#debugprestatetrace)\>

Replays a block that has already been mined.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockIdentifier` | `string` \| `number` | The block to debug the transaction in. Can be a block hash, block number hex string, or commitment level. |
| `tracer` | [`DebugPrestateTracer`](../interfaces/DebugPrestateTracer.md) | Tracer type and configuration. |

#### Returns

`Promise`<[`DebugPrestateTrace`](../modules.md#debugprestatetrace)\>

#### Defined in

[src/api/debug-namespace.ts:131](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/api/debug-namespace.ts#L131)

___

### traceCall

▸ **traceCall**(`transaction`, `blockIdentifier`, `tracer`): `Promise`<[`DebugCallTrace`](../interfaces/DebugCallTrace.md)\>

Runs an `eth_call` with the context of the provided block execution using the
final state of the parent block as the base.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transaction` | [`DebugTransaction`](../interfaces/DebugTransaction.md) | The transaction to debug trace. |
| `blockIdentifier` | `string` | The block to debug the transaction in. Can be a block hash, block number hex string, or commitment level. |
| `tracer` | [`DebugCallTracer`](../interfaces/DebugCallTracer.md) | Tracer type and configuration. |

#### Returns

`Promise`<[`DebugCallTrace`](../interfaces/DebugCallTrace.md)\>

#### Defined in

[src/api/debug-namespace.ts:36](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/api/debug-namespace.ts#L36)

▸ **traceCall**(`transaction`, `blockIdentifier`, `tracer`): `Promise`<[`DebugPrestateTrace`](../modules.md#debugprestatetrace)\>

Runs an `eth_call` with the context of the provided block execution using the
final state of the parent block as the base.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transaction` | [`DebugTransaction`](../interfaces/DebugTransaction.md) | The transaction to debug trace. |
| `blockIdentifier` | `string` | The block to debug the transaction in. Can be a block hash, block number hex string, or commitment level. |
| `tracer` | [`DebugPrestateTracer`](../interfaces/DebugPrestateTracer.md) | Tracer type and configuration. |

#### Returns

`Promise`<[`DebugPrestateTrace`](../modules.md#debugprestatetrace)\>

#### Defined in

[src/api/debug-namespace.ts:51](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/api/debug-namespace.ts#L51)

___

### traceTransaction

▸ **traceTransaction**(`transactionHash`, `tracer`, `timeout?`): `Promise`<[`DebugCallTrace`](../interfaces/DebugCallTrace.md)\>

Attempts to run the transaction in the exact same manner as it was executed
on the network. It will replay any transaction that may have been executed
prior to this one before it and will then attempt to execute the transaction
that corresponds to the given hash.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionHash` | `string` | The transaction hash of the transaction to trace. |
| `tracer` | [`DebugCallTracer`](../interfaces/DebugCallTracer.md) | Tracer type and configuration. |
| `timeout?` | `string` | A duration string of decimal numbers that overrides the default timeout of 5 seconds for JavaScript-based tracing calls. Max timeout is "10s". Valid time units are "ns", "us", "ms", "s" each with optional fraction, such as "300ms" or "2s45ms". |

#### Returns

`Promise`<[`DebugCallTrace`](../interfaces/DebugCallTrace.md)\>

#### Defined in

[src/api/debug-namespace.ts:79](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/api/debug-namespace.ts#L79)

▸ **traceTransaction**(`transactionHash`, `tracer`, `timeout?`): `Promise`<[`DebugPrestateTrace`](../modules.md#debugprestatetrace)\>

Attempts to run the transaction in the exact same manner as it was executed
on the network. It will replay any transaction that may have been executed
prior to this one before it and will then attempt to execute the transaction
that corresponds to the given hash.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionHash` | `string` | The transaction hash of the transaction to trace. |
| `tracer` | [`DebugPrestateTracer`](../interfaces/DebugPrestateTracer.md) | Tracer type and configuration. |
| `timeout?` | `string` | A duration string of decimal numbers that overrides the default timeout of 5 seconds for JavaScript-based tracing calls. Max timeout is "10s". Valid time units are "ns", "us", "ms", "s" each with optional fraction, such as "300ms" or "2s45ms". |

#### Returns

`Promise`<[`DebugPrestateTrace`](../modules.md#debugprestatetrace)\>

#### Defined in

[src/api/debug-namespace.ts:98](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e62e5c7/src/api/debug-namespace.ts#L98)
