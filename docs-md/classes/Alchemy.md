[alchemy-sdk](../README.md) / [Exports](../modules.md) / Alchemy

# Class: Alchemy

The Alchemy SDK client. This class is the main entry point into Alchemy's
APIs and separates functionality into different namespaces.

Each SDK instance is associated with a specific network and API key. To use a
different network or API key, create a new instance of [Alchemy](Alchemy.md).

## Table of contents

### Constructors

- [constructor](Alchemy.md#constructor)

### Properties

- [config](Alchemy.md#config)
- [core](Alchemy.md#core)
- [nft](Alchemy.md#nft)
- [ws](Alchemy.md#ws)

## Constructors

### constructor

• **new Alchemy**(`settings?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `settings?` | [`AlchemySettings`](../interfaces/AlchemySettings.md) |

#### Defined in

[src/api/alchemy.ts:41](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae75103/src/api/alchemy.ts#L41)

## Properties

### config

• `Readonly` **config**: [`AlchemyConfig`](AlchemyConfig.md)

Holds the setting information for the instance of the Alchemy SDK client
and allows access to the underlying providers.

#### Defined in

[src/api/alchemy.ts:33](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae75103/src/api/alchemy.ts#L33)

___

### core

• `Readonly` **core**: [`CoreNamespace`](CoreNamespace.md)

The `core` namespace contains the core eth json-rpc calls and Alchemy's
Enhanced APIs.

#### Defined in

[src/api/alchemy.ts:21](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae75103/src/api/alchemy.ts#L21)

___

### nft

• `Readonly` **nft**: [`NftNamespace`](NftNamespace.md)

The `nft` namespace contains methods for Alchemy's NFT API.

#### Defined in

[src/api/alchemy.ts:24](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae75103/src/api/alchemy.ts#L24)

___

### ws

• `Readonly` **ws**: [`WebSocketNamespace`](WebSocketNamespace.md)

The `ws` namespace contains methods for using WebSockets and creating subscriptions.

#### Defined in

[src/api/alchemy.ts:27](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae75103/src/api/alchemy.ts#L27)
