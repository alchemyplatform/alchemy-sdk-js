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
- [notify](Alchemy.md#notify)
- [transact](Alchemy.md#transact)
- [ws](Alchemy.md#ws)

## Constructors

### constructor

• **new Alchemy**(`settings?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `settings?` | [`AlchemySettings`](../interfaces/AlchemySettings.md) |

#### Defined in

[src/api/alchemy.ts:55](https://github.com/alchemyplatform/alchemy-sdk-js/blob/d97ef0d/src/api/alchemy.ts#L55)

## Properties

### config

• `Readonly` **config**: [`AlchemyConfig`](AlchemyConfig.md)

Holds the setting information for the instance of the Alchemy SDK client
and allows access to the underlying providers.

#### Defined in

[src/api/alchemy.ts:41](https://github.com/alchemyplatform/alchemy-sdk-js/blob/d97ef0d/src/api/alchemy.ts#L41)

___

### core

• `Readonly` **core**: [`CoreNamespace`](CoreNamespace.md)

The `core` namespace contains the core eth json-rpc calls and Alchemy's
Enhanced APIs.

#### Defined in

[src/api/alchemy.ts:23](https://github.com/alchemyplatform/alchemy-sdk-js/blob/d97ef0d/src/api/alchemy.ts#L23)

___

### nft

• `Readonly` **nft**: [`NftNamespace`](NftNamespace.md)

The `nft` namespace contains methods for Alchemy's NFT API.

#### Defined in

[src/api/alchemy.ts:26](https://github.com/alchemyplatform/alchemy-sdk-js/blob/d97ef0d/src/api/alchemy.ts#L26)

___

### notify

• `Readonly` **notify**: [`NotifyNamespace`](NotifyNamespace.md)

The `notify` namespace contains methods for creating and managing webhooks
as part of the Notify API.

#### Defined in

[src/api/alchemy.ts:47](https://github.com/alchemyplatform/alchemy-sdk-js/blob/d97ef0d/src/api/alchemy.ts#L47)

___

### transact

• `Readonly` **transact**: [`TransactNamespace`](TransactNamespace.md)

The `transact` namespace contains methods for sending transactions and
checking on the state of submitted transasctions.

#### Defined in

[src/api/alchemy.ts:35](https://github.com/alchemyplatform/alchemy-sdk-js/blob/d97ef0d/src/api/alchemy.ts#L35)

___

### ws

• `Readonly` **ws**: [`WebSocketNamespace`](WebSocketNamespace.md)

The `ws` namespace contains methods for using WebSockets and creating subscriptions.

#### Defined in

[src/api/alchemy.ts:29](https://github.com/alchemyplatform/alchemy-sdk-js/blob/d97ef0d/src/api/alchemy.ts#L29)
