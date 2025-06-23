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
- [portfolio](Alchemy.md#portfolio)
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

[src/api/alchemy.ts:75](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/api/alchemy.ts#L75)

## Properties

### config

• `Readonly` **config**: [`AlchemyConfig`](AlchemyConfig.md)

Holds the setting information for the instance of the Alchemy SDK client
and allows access to the underlying providers.

#### Defined in

[src/api/alchemy.ts:44](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/api/alchemy.ts#L44)

___

### core

• `Readonly` **core**: [`CoreNamespace`](CoreNamespace.md)

The `core` namespace contains the core eth json-rpc calls and Alchemy's
Enhanced APIs.

#### Defined in

[src/api/alchemy.ts:26](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/api/alchemy.ts#L26)

___

### debug

• `Readonly` **debug**: [`DebugNamespace`](DebugNamespace.md)

The `debug` namespace contains methods for inspecting and debugging
transactions.

#### Defined in

[src/api/alchemy.ts:56](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/api/alchemy.ts#L56)

___

### nft

• `Readonly` **nft**: [`NftNamespace`](NftNamespace.md)

The `nft` namespace contains methods for Alchemy's NFT API.

#### Defined in

[src/api/alchemy.ts:29](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/api/alchemy.ts#L29)

___

### notify

• `Readonly` **notify**: [`NotifyNamespace`](NotifyNamespace.md)

The `notify` namespace contains methods for creating and managing webhooks
as part of the Notify API.

#### Defined in

[src/api/alchemy.ts:50](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/api/alchemy.ts#L50)

___

### portfolio

• `Readonly` **portfolio**: [`PortfolioNamespace`](PortfolioNamespace.md)

The `portfolio` namespace contains methods for getting data needed to view onchain assets.
Portfolio APIs include everything you need to build a view of a user’s assets: fungibles,
NFTs, and their transactions.

#### Defined in

[src/api/alchemy.ts:66](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/api/alchemy.ts#L66)

___

### prices

• `Readonly` **prices**: [`PricesNamespace`](PricesNamespace.md)

The `prices` namespace contains methods for getting token price data.

#### Defined in

[src/api/alchemy.ts:59](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/api/alchemy.ts#L59)

___

### transact

• `Readonly` **transact**: [`TransactNamespace`](TransactNamespace.md)

The `transact` namespace contains methods for sending transactions and
checking on the state of submitted transasctions.

#### Defined in

[src/api/alchemy.ts:38](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/api/alchemy.ts#L38)

___

### ws

• `Readonly` **ws**: [`WebSocketNamespace`](WebSocketNamespace.md)

The `ws` namespace contains methods for using WebSockets and creating subscriptions.

#### Defined in

[src/api/alchemy.ts:32](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/api/alchemy.ts#L32)
