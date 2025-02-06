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
- [debug](Alchemy.md#debug)
- [nft](Alchemy.md#nft)
- [notify](Alchemy.md#notify)
- [prices](Alchemy.md#prices)
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

[src/api/alchemy.ts:67](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/api/alchemy.ts#L67)

## Properties

### config

• `Readonly` **config**: [`AlchemyConfig`](AlchemyConfig.md)

Holds the setting information for the instance of the Alchemy SDK client
and allows access to the underlying providers.

#### Defined in

[src/api/alchemy.ts:43](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/api/alchemy.ts#L43)

___

### core

• `Readonly` **core**: [`CoreNamespace`](CoreNamespace.md)

The `core` namespace contains the core eth json-rpc calls and Alchemy's
Enhanced APIs.

#### Defined in

[src/api/alchemy.ts:25](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/api/alchemy.ts#L25)

___

### debug

• `Readonly` **debug**: [`DebugNamespace`](DebugNamespace.md)

The `debug` namespace contains methods for inspecting and debugging
transactions.

#### Defined in

[src/api/alchemy.ts:55](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/api/alchemy.ts#L55)

___

### nft

• `Readonly` **nft**: [`NftNamespace`](NftNamespace.md)

The `nft` namespace contains methods for Alchemy's NFT API.

#### Defined in

[src/api/alchemy.ts:28](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/api/alchemy.ts#L28)

___

### notify

• `Readonly` **notify**: [`NotifyNamespace`](NotifyNamespace.md)

The `notify` namespace contains methods for creating and managing webhooks
as part of the Notify API.

#### Defined in

[src/api/alchemy.ts:49](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/api/alchemy.ts#L49)

___

### prices

• `Readonly` **prices**: [`PricesNamespace`](PricesNamespace.md)

The `prices` namespace contains methods for getting token price data.

#### Defined in

[src/api/alchemy.ts:58](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/api/alchemy.ts#L58)

___

### transact

• `Readonly` **transact**: [`TransactNamespace`](TransactNamespace.md)

The `transact` namespace contains methods for sending transactions and
checking on the state of submitted transasctions.

#### Defined in

[src/api/alchemy.ts:37](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/api/alchemy.ts#L37)

___

### ws

• `Readonly` **ws**: [`WebSocketNamespace`](WebSocketNamespace.md)

The `ws` namespace contains methods for using WebSockets and creating subscriptions.

#### Defined in

[src/api/alchemy.ts:31](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8f119ad1/src/api/alchemy.ts#L31)
