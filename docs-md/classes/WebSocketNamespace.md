[alchemy-sdk](../README.md) / [Exports](../modules.md) / WebSocketNamespace

# Class: WebSocketNamespace

The Websocket namespace contains all subscription related functions that
allow you to subscribe to events and receive updates as they occur. The
underlying WebSocket provider has additional logic to handle reconnections
and automatically backfills missed events.

Do not call this constructor directly. Instead, instantiate an Alchemy object
with `const alchemy = new Alchemy(config)` and then access the core namespace
via `alchemy.ws`.

## Table of contents

### Methods

- [listenerCount](WebSocketNamespace.md#listenercount)
- [listeners](WebSocketNamespace.md#listeners)
- [off](WebSocketNamespace.md#off)
- [on](WebSocketNamespace.md#on)
- [once](WebSocketNamespace.md#once)
- [removeAllListeners](WebSocketNamespace.md#removealllisteners)

## Methods

### listenerCount

▸ **listenerCount**(`eventName?`): `Promise`<`number`\>

Returns the number of listeners for the provided {@link eventName} event. If
no event is provided, the total number of listeners for all events is returned.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName?` | [`AlchemyEventType`](../modules.md#alchemyeventtype) | The event to get the number of listeners for. |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/api/websocket-namespace.ts:92](https://github.com/alchemyplatform/alchemy-sdk-js/blob/3091a11/src/api/websocket-namespace.ts#L92)

___

### listeners

▸ **listeners**(`eventName?`): `Promise`<`Listener`[]\>

Returns an array of listeners for the provided {@link eventName} event. If
no event is provided, all listeners will be included.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName?` | [`AlchemyEventType`](../modules.md#alchemyeventtype) | The event to get the listeners for. |

#### Returns

`Promise`<`Listener`[]\>

#### Defined in

[src/api/websocket-namespace.ts:103](https://github.com/alchemyplatform/alchemy-sdk-js/blob/3091a11/src/api/websocket-namespace.ts#L103)

___

### off

▸ **off**(`eventName`, `listener?`): [`WebSocketNamespace`](WebSocketNamespace.md)

Removes the provided {@link listener} for the {@link eventName} event. If no
listener is provided, all listeners for the event will be removed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | [`AlchemyEventType`](../modules.md#alchemyeventtype) | The event to unlisten to. |
| `listener?` | `Listener` | The listener to remove. |

#### Returns

[`WebSocketNamespace`](WebSocketNamespace.md)

#### Defined in

[src/api/websocket-namespace.ts:62](https://github.com/alchemyplatform/alchemy-sdk-js/blob/3091a11/src/api/websocket-namespace.ts#L62)

___

### on

▸ **on**(`eventName`, `listener`): [`WebSocketNamespace`](WebSocketNamespace.md)

Adds a listener to be triggered for each {@link eventName} event. Also
includes Alchemy's Subscription API events. See [AlchemyEventType](../modules.md#alchemyeventtype) for
how to use them.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | [`AlchemyEventType`](../modules.md#alchemyeventtype) | The event to listen for. |
| `listener` | `Listener` | The listener to call when the event is triggered. |

#### Returns

[`WebSocketNamespace`](WebSocketNamespace.md)

#### Defined in

[src/api/websocket-namespace.ts:29](https://github.com/alchemyplatform/alchemy-sdk-js/blob/3091a11/src/api/websocket-namespace.ts#L29)

___

### once

▸ **once**(`eventName`, `listener`): [`WebSocketNamespace`](WebSocketNamespace.md)

Adds a listener to be triggered for only the next {@link eventName} event,
after which it will be removed. Also includes Alchemy's Subscription API
events. See [AlchemyEventType](../modules.md#alchemyeventtype) for how to use them.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | [`AlchemyEventType`](../modules.md#alchemyeventtype) | The event to listen for. |
| `listener` | `Listener` | The listener to call when the event is triggered. |

#### Returns

[`WebSocketNamespace`](WebSocketNamespace.md)

#### Defined in

[src/api/websocket-namespace.ts:46](https://github.com/alchemyplatform/alchemy-sdk-js/blob/3091a11/src/api/websocket-namespace.ts#L46)

___

### removeAllListeners

▸ **removeAllListeners**(`eventName?`): [`WebSocketNamespace`](WebSocketNamespace.md)

Remove all listeners for the provided {@link eventName} event. If no event
is provided, all events and their listeners are removed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName?` | [`AlchemyEventType`](../modules.md#alchemyeventtype) | The event to remove all listeners for. |

#### Returns

[`WebSocketNamespace`](WebSocketNamespace.md)

#### Defined in

[src/api/websocket-namespace.ts:77](https://github.com/alchemyplatform/alchemy-sdk-js/blob/3091a11/src/api/websocket-namespace.ts#L77)
