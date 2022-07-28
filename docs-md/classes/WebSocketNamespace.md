[alchemy-sdk](../README.md) / [Exports](../modules.md) / WebSocketNamespace

# Class: WebSocketNamespace

## Table of contents

### Constructors

- [constructor](WebSocketNamespace.md#constructor)

### Methods

- [listenerCount](WebSocketNamespace.md#listenercount)
- [listeners](WebSocketNamespace.md#listeners)
- [off](WebSocketNamespace.md#off)
- [on](WebSocketNamespace.md#on)
- [once](WebSocketNamespace.md#once)
- [removeAllListeners](WebSocketNamespace.md#removealllisteners)

## Constructors

### constructor

• **new WebSocketNamespace**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`AlchemyConfig`](AlchemyConfig.md) |

#### Defined in

[src/api/websocket-namespace.ts:6](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae75103/src/api/websocket-namespace.ts#L6)

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

[src/api/websocket-namespace.ts:80](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae75103/src/api/websocket-namespace.ts#L80)

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

[src/api/websocket-namespace.ts:91](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae75103/src/api/websocket-namespace.ts#L91)

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

[src/api/websocket-namespace.ts:50](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae75103/src/api/websocket-namespace.ts#L50)

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

[src/api/websocket-namespace.ts:17](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae75103/src/api/websocket-namespace.ts#L17)

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

[src/api/websocket-namespace.ts:34](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae75103/src/api/websocket-namespace.ts#L34)

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

[src/api/websocket-namespace.ts:65](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae75103/src/api/websocket-namespace.ts#L65)
