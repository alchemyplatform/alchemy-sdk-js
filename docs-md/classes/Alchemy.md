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

[src/api/alchemy.ts:44](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/api/alchemy.ts#L44)

## Properties

### config

• `Readonly` **config**: [`AlchemyConfig`](AlchemyConfig.md)

Holds the setting information for the instance of the Alchemy SDK client
and allows access to the underlying providers.

#### Defined in

[src/api/alchemy.ts:36](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/api/alchemy.ts#L36)

___

### core

• `Readonly` **core**: [`CoreNamespace`](CoreNamespace.md)

The `core` namespace contains the core eth json-rpc calls and Alchemy's
Enhanced APIs.

#### Defined in

[src/api/alchemy.ts:22](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/api/alchemy.ts#L22)

___

### nft

• `Readonly` **nft**: [`NftNamespace`](NftNamespace.md)

The `nft` namespace contains methods for Alchemy's NFT API.

#### Defined in

[src/api/alchemy.ts:25](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/api/alchemy.ts#L25)

___

### transact

• `Readonly` **transact**: [`TransactNamespace`](TransactNamespace.md)

#### Defined in

[src/api/alchemy.ts:30](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/api/alchemy.ts#L30)

___

### ws

• `Readonly` **ws**: [`WebSocketNamespace`](WebSocketNamespace.md)

The `ws` namespace contains methods for using WebSockets and creating subscriptions.

#### Defined in

[src/api/alchemy.ts:28](https://github.com/alchemyplatform/alchemy-sdk-js/blob/53be393/src/api/alchemy.ts#L28)
