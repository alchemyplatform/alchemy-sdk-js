[alchemy-sdk](../README.md) / [Exports](../modules.md) / AlchemyWebSocketProvider

# Class: AlchemyWebSocketProvider

SDK's custom implementation fo the ethers.js's 'AlchemyWebSocketProvider'.

Do not call this constructor directly. Instead, instantiate an instance of
[Alchemy](Alchemy.md) and call {@link Alchemy.config.getWebSocketProvider()}.

## Hierarchy

- `WebSocketProvider`

  ↳ **`AlchemyWebSocketProvider`**

## Implements

- `CommunityResourcable`

## Table of contents

### Properties

- [\_bootstrapPoll](AlchemyWebSocketProvider.md#_bootstrappoll)
- [\_detectNetwork](AlchemyWebSocketProvider.md#_detectnetwork)
- [\_emitted](AlchemyWebSocketProvider.md#_emitted)
- [\_eventLoopCache](AlchemyWebSocketProvider.md#_eventloopcache)
- [\_events](AlchemyWebSocketProvider.md#_events)
- [\_fastBlockNumber](AlchemyWebSocketProvider.md#_fastblocknumber)
- [\_fastBlockNumberPromise](AlchemyWebSocketProvider.md#_fastblocknumberpromise)
- [\_fastQueryDate](AlchemyWebSocketProvider.md#_fastquerydate)
- [\_internalBlockNumber](AlchemyWebSocketProvider.md#_internalblocknumber)
- [\_isProvider](AlchemyWebSocketProvider.md#_isprovider)
- [\_lastBlockNumber](AlchemyWebSocketProvider.md#_lastblocknumber)
- [\_maxFilterBlockRange](AlchemyWebSocketProvider.md#_maxfilterblockrange)
- [\_maxInternalBlockNumber](AlchemyWebSocketProvider.md#_maxinternalblocknumber)
- [\_network](AlchemyWebSocketProvider.md#_network)
- [\_networkPromise](AlchemyWebSocketProvider.md#_networkpromise)
- [\_nextId](AlchemyWebSocketProvider.md#_nextid)
- [\_pendingFilter](AlchemyWebSocketProvider.md#_pendingfilter)
- [\_poller](AlchemyWebSocketProvider.md#_poller)
- [\_pollingInterval](AlchemyWebSocketProvider.md#_pollinginterval)
- [\_requests](AlchemyWebSocketProvider.md#_requests)
- [\_subIds](AlchemyWebSocketProvider.md#_subids)
- [\_subs](AlchemyWebSocketProvider.md#_subs)
- [\_websocket](AlchemyWebSocketProvider.md#_websocket)
- [\_wsReady](AlchemyWebSocketProvider.md#_wsready)
- [anyNetwork](AlchemyWebSocketProvider.md#anynetwork)
- [apiKey](AlchemyWebSocketProvider.md#apikey)
- [connection](AlchemyWebSocketProvider.md#connection)
- [disableCcipRead](AlchemyWebSocketProvider.md#disableccipread)
- [formatter](AlchemyWebSocketProvider.md#formatter)

### Accessors

- [\_cache](AlchemyWebSocketProvider.md#_cache)
- [blockNumber](AlchemyWebSocketProvider.md#blocknumber)
- [network](AlchemyWebSocketProvider.md#network)
- [polling](AlchemyWebSocketProvider.md#polling)
- [pollingInterval](AlchemyWebSocketProvider.md#pollinginterval)
- [ready](AlchemyWebSocketProvider.md#ready)
- [websocket](AlchemyWebSocketProvider.md#websocket)

### Methods

- [\_call](AlchemyWebSocketProvider.md#_call)
- [\_getAddress](AlchemyWebSocketProvider.md#_getaddress)
- [\_getBlock](AlchemyWebSocketProvider.md#_getblock)
- [\_getBlockTag](AlchemyWebSocketProvider.md#_getblocktag)
- [\_getFastBlockNumber](AlchemyWebSocketProvider.md#_getfastblocknumber)
- [\_getFilter](AlchemyWebSocketProvider.md#_getfilter)
- [\_getInternalBlockNumber](AlchemyWebSocketProvider.md#_getinternalblocknumber)
- [\_getResolver](AlchemyWebSocketProvider.md#_getresolver)
- [\_getTransactionRequest](AlchemyWebSocketProvider.md#_gettransactionrequest)
- [\_listenerCount](AlchemyWebSocketProvider.md#_listenercount)
- [\_listeners](AlchemyWebSocketProvider.md#_listeners)
- [\_off](AlchemyWebSocketProvider.md#_off)
- [\_ready](AlchemyWebSocketProvider.md#_ready)
- [\_removeAllListeners](AlchemyWebSocketProvider.md#_removealllisteners)
- [\_setFastBlockNumber](AlchemyWebSocketProvider.md#_setfastblocknumber)
- [\_startPending](AlchemyWebSocketProvider.md#_startpending)
- [\_uncachedDetectNetwork](AlchemyWebSocketProvider.md#_uncacheddetectnetwork)
- [\_waitForTransaction](AlchemyWebSocketProvider.md#_waitfortransaction)
- [\_wrapTransaction](AlchemyWebSocketProvider.md#_wraptransaction)
- [addListener](AlchemyWebSocketProvider.md#addlistener)
- [call](AlchemyWebSocketProvider.md#call)
- [ccipReadFetch](AlchemyWebSocketProvider.md#ccipreadfetch)
- [destroy](AlchemyWebSocketProvider.md#destroy)
- [detectNetwork](AlchemyWebSocketProvider.md#detectnetwork)
- [emitEvent](AlchemyWebSocketProvider.md#emitevent)
- [estimateGas](AlchemyWebSocketProvider.md#estimategas)
- [getAvatar](AlchemyWebSocketProvider.md#getavatar)
- [getBalance](AlchemyWebSocketProvider.md#getbalance)
- [getBlock](AlchemyWebSocketProvider.md#getblock)
- [getBlockNumber](AlchemyWebSocketProvider.md#getblocknumber)
- [getBlockWithTransactions](AlchemyWebSocketProvider.md#getblockwithtransactions)
- [getCode](AlchemyWebSocketProvider.md#getcode)
- [getEtherPrice](AlchemyWebSocketProvider.md#getetherprice)
- [getFeeData](AlchemyWebSocketProvider.md#getfeedata)
- [getGasPrice](AlchemyWebSocketProvider.md#getgasprice)
- [getLogs](AlchemyWebSocketProvider.md#getlogs)
- [getNetwork](AlchemyWebSocketProvider.md#getnetwork)
- [getResolver](AlchemyWebSocketProvider.md#getresolver)
- [getSigner](AlchemyWebSocketProvider.md#getsigner)
- [getStorageAt](AlchemyWebSocketProvider.md#getstorageat)
- [getTransaction](AlchemyWebSocketProvider.md#gettransaction)
- [getTransactionCount](AlchemyWebSocketProvider.md#gettransactioncount)
- [getTransactionReceipt](AlchemyWebSocketProvider.md#gettransactionreceipt)
- [getUncheckedSigner](AlchemyWebSocketProvider.md#getuncheckedsigner)
- [isCommunityResource](AlchemyWebSocketProvider.md#iscommunityresource)
- [listAccounts](AlchemyWebSocketProvider.md#listaccounts)
- [listenerCount](AlchemyWebSocketProvider.md#listenercount)
- [listeners](AlchemyWebSocketProvider.md#listeners)
- [lookupAddress](AlchemyWebSocketProvider.md#lookupaddress)
- [off](AlchemyWebSocketProvider.md#off)
- [on](AlchemyWebSocketProvider.md#on)
- [once](AlchemyWebSocketProvider.md#once)
- [perform](AlchemyWebSocketProvider.md#perform)
- [poll](AlchemyWebSocketProvider.md#poll)
- [prepareRequest](AlchemyWebSocketProvider.md#preparerequest)
- [removeAllListeners](AlchemyWebSocketProvider.md#removealllisteners)
- [removeListener](AlchemyWebSocketProvider.md#removelistener)
- [resetEventsBlock](AlchemyWebSocketProvider.md#reseteventsblock)
- [resolveName](AlchemyWebSocketProvider.md#resolvename)
- [send](AlchemyWebSocketProvider.md#send)
- [sendTransaction](AlchemyWebSocketProvider.md#sendtransaction)
- [waitForTransaction](AlchemyWebSocketProvider.md#waitfortransaction)
- [defaultUrl](AlchemyWebSocketProvider.md#defaulturl)
- [getFormatter](AlchemyWebSocketProvider.md#getformatter)
- [hexlifyTransaction](AlchemyWebSocketProvider.md#hexlifytransaction)
- [isProvider](AlchemyWebSocketProvider.md#isprovider)

## Properties

### \_bootstrapPoll

• **\_bootstrapPoll**: `Timer`

#### Inherited from

WebSocketProvider.\_bootstrapPoll

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:66

___

### \_detectNetwork

• `Readonly` **\_detectNetwork**: `Promise`<`Network`\>

#### Inherited from

WebSocketProvider.\_detectNetwork

#### Defined in

node_modules/@ethersproject/providers/lib/websocket-provider.d.ts:25

___

### \_emitted

• **\_emitted**: `Object`

#### Index signature

▪ [eventName: `string`]: `number` \| ``"pending"``

#### Inherited from

WebSocketProvider.\_emitted

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:61

___

### \_eventLoopCache

• **\_eventLoopCache**: `Record`<`string`, `Promise`<`any`\>\>

#### Inherited from

WebSocketProvider.\_eventLoopCache

#### Defined in

node_modules/@ethersproject/providers/lib/json-rpc-provider.d.ts:32

___

### \_events

• **\_events**: `EthersEvent`[] = `[]`

#### Overrides

WebSocketProvider.\_events

#### Defined in

[src/api/alchemy-websocket-provider.ts:81](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/alchemy-websocket-provider.ts#L81)

___

### \_fastBlockNumber

• **\_fastBlockNumber**: `number`

#### Inherited from

WebSocketProvider.\_fastBlockNumber

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:69

___

### \_fastBlockNumberPromise

• **\_fastBlockNumberPromise**: `Promise`<`number`\>

#### Inherited from

WebSocketProvider.\_fastBlockNumberPromise

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:70

___

### \_fastQueryDate

• **\_fastQueryDate**: `number`

#### Inherited from

WebSocketProvider.\_fastQueryDate

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:71

___

### \_internalBlockNumber

• **\_internalBlockNumber**: `Promise`<{ `blockNumber`: `number` ; `reqTime`: `number` ; `respTime`: `number`  }\>

#### Inherited from

WebSocketProvider.\_internalBlockNumber

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:73

___

### \_isProvider

• `Readonly` **\_isProvider**: `boolean`

#### Inherited from

WebSocketProvider.\_isProvider

#### Defined in

node_modules/@ethersproject/abstract-provider/lib/index.d.ts:152

___

### \_lastBlockNumber

• **\_lastBlockNumber**: `number`

#### Inherited from

WebSocketProvider.\_lastBlockNumber

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:67

___

### \_maxFilterBlockRange

• **\_maxFilterBlockRange**: `number`

#### Inherited from

WebSocketProvider.\_maxFilterBlockRange

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:68

___

### \_maxInternalBlockNumber

• **\_maxInternalBlockNumber**: `number`

#### Inherited from

WebSocketProvider.\_maxInternalBlockNumber

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:72

___

### \_network

• **\_network**: `Network`

#### Inherited from

WebSocketProvider.\_network

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:58

___

### \_networkPromise

• **\_networkPromise**: `Promise`<`Network`\>

#### Inherited from

WebSocketProvider.\_networkPromise

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:57

___

### \_nextId

• **\_nextId**: `number`

#### Inherited from

WebSocketProvider.\_nextId

#### Defined in

node_modules/@ethersproject/providers/lib/json-rpc-provider.d.ts:31

___

### \_pendingFilter

• **\_pendingFilter**: `Promise`<`number`\>

#### Inherited from

WebSocketProvider.\_pendingFilter

#### Defined in

node_modules/@ethersproject/providers/lib/json-rpc-provider.d.ts:30

___

### \_poller

• **\_poller**: `Timer`

#### Inherited from

WebSocketProvider.\_poller

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:65

___

### \_pollingInterval

• **\_pollingInterval**: `number`

#### Inherited from

WebSocketProvider.\_pollingInterval

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:64

___

### \_requests

• `Readonly` **\_requests**: `Object`

#### Index signature

▪ [name: `string`]: `InflightRequest`

#### Inherited from

WebSocketProvider.\_requests

#### Defined in

node_modules/@ethersproject/providers/lib/websocket-provider.d.ts:22

___

### \_subIds

• `Readonly` **\_subIds**: `Object`

#### Index signature

▪ [tag: `string`]: `Promise`<`string`\>

#### Inherited from

WebSocketProvider.\_subIds

#### Defined in

node_modules/@ethersproject/providers/lib/websocket-provider.d.ts:26

___

### \_subs

• `Readonly` **\_subs**: `Object`

#### Index signature

▪ [name: `string`]: `Subscription`

#### Inherited from

WebSocketProvider.\_subs

#### Defined in

node_modules/@ethersproject/providers/lib/websocket-provider.d.ts:29

___

### \_websocket

• `Readonly` **\_websocket**: `any`

#### Inherited from

WebSocketProvider.\_websocket

#### Defined in

node_modules/@ethersproject/providers/lib/websocket-provider.d.ts:21

___

### \_wsReady

• **\_wsReady**: `boolean`

#### Inherited from

WebSocketProvider.\_wsReady

#### Defined in

node_modules/@ethersproject/providers/lib/websocket-provider.d.ts:32

___

### anyNetwork

• `Readonly` **anyNetwork**: `boolean`

#### Inherited from

WebSocketProvider.anyNetwork

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:78

___

### apiKey

• `Readonly` **apiKey**: `string`

#### Defined in

[src/api/alchemy-websocket-provider.ts:82](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/alchemy-websocket-provider.ts#L82)

___

### connection

• `Readonly` **connection**: `ConnectionInfo`

#### Inherited from

WebSocketProvider.connection

#### Defined in

node_modules/@ethersproject/providers/lib/json-rpc-provider.d.ts:29

___

### disableCcipRead

• **disableCcipRead**: `boolean`

#### Inherited from

WebSocketProvider.disableCcipRead

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:79

___

### formatter

• **formatter**: `Formatter`

#### Inherited from

WebSocketProvider.formatter

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:60

## Accessors

### \_cache

• `get` **_cache**(): `Record`<`string`, `Promise`<`any`\>\>

#### Returns

`Record`<`string`, `Promise`<`any`\>\>

#### Inherited from

WebSocketProvider.\_cache

#### Defined in

node_modules/@ethersproject/providers/lib/json-rpc-provider.d.ts:33

___

### blockNumber

• `get` **blockNumber**(): `number`

#### Returns

`number`

#### Inherited from

WebSocketProvider.blockNumber

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:101

___

### network

• `get` **network**(): `Network`

#### Returns

`Network`

#### Inherited from

WebSocketProvider.network

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:98

___

### polling

• `set` **polling**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Inherited from

WebSocketProvider.polling

#### Defined in

node_modules/@ethersproject/providers/lib/websocket-provider.d.ts:40

___

### pollingInterval

• `get` **pollingInterval**(): `number`

#### Returns

`number`

#### Inherited from

WebSocketProvider.pollingInterval

#### Defined in

node_modules/@ethersproject/providers/lib/websocket-provider.d.ts:36

• `set` **pollingInterval**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

WebSocketProvider.pollingInterval

#### Defined in

node_modules/@ethersproject/providers/lib/websocket-provider.d.ts:38

___

### ready

• `get` **ready**(): `Promise`<`Network`\>

#### Returns

`Promise`<`Network`\>

#### Inherited from

WebSocketProvider.ready

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:91

___

### websocket

• `get` **websocket**(): `WebSocketLike`

#### Returns

`WebSocketLike`

#### Inherited from

WebSocketProvider.websocket

#### Defined in

node_modules/@ethersproject/providers/lib/websocket-provider.d.ts:34

## Methods

### \_call

▸ **_call**(`transaction`, `blockTag`, `attempt`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | [`TransactionRequest`](../modules.md#transactionrequest) |
| `blockTag` | [`BlockTag`](../modules.md#blocktag) |
| `attempt` | `number` |

#### Returns

`Promise`<`string`\>

#### Inherited from

WebSocketProvider.\_call

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:127

___

### \_getAddress

▸ **_getAddress**(`addressOrName`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressOrName` | `string` \| `Promise`<`string`\> |

#### Returns

`Promise`<`string`\>

#### Inherited from

WebSocketProvider.\_getAddress

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:130

___

### \_getBlock

▸ **_getBlock**(`blockHashOrBlockTag`, `includeTransactions?`): `Promise`<[`Block`](../interfaces/Block.md) \| [`BlockWithTransactions`](../interfaces/BlockWithTransactions.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockHashOrBlockTag` | [`BlockTag`](../modules.md#blocktag) \| `Promise`<[`BlockTag`](../modules.md#blocktag)\> |
| `includeTransactions?` | `boolean` |

#### Returns

`Promise`<[`Block`](../interfaces/Block.md) \| [`BlockWithTransactions`](../interfaces/BlockWithTransactions.md)\>

#### Inherited from

WebSocketProvider.\_getBlock

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:131

___

### \_getBlockTag

▸ **_getBlockTag**(`blockTag`): `Promise`<[`BlockTag`](../modules.md#blocktag)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockTag` | [`BlockTag`](../modules.md#blocktag) \| `Promise`<[`BlockTag`](../modules.md#blocktag)\> |

#### Returns

`Promise`<[`BlockTag`](../modules.md#blocktag)\>

#### Inherited from

WebSocketProvider.\_getBlockTag

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:138

___

### \_getFastBlockNumber

▸ **_getFastBlockNumber**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

#### Inherited from

WebSocketProvider.\_getFastBlockNumber

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:106

___

### \_getFilter

▸ **_getFilter**(`filter`): `Promise`<`Filter` \| `FilterByBlockHash`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | `Filter` \| `FilterByBlockHash` \| `Promise`<`Filter` \| `FilterByBlockHash`\> |

#### Returns

`Promise`<`Filter` \| `FilterByBlockHash`\>

#### Inherited from

WebSocketProvider.\_getFilter

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:126

___

### \_getInternalBlockNumber

▸ **_getInternalBlockNumber**(`maxAge`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxAge` | `number` |

#### Returns

`Promise`<`number`\>

#### Inherited from

WebSocketProvider.\_getInternalBlockNumber

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:95

___

### \_getResolver

▸ **_getResolver**(`name`, `operation?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `operation?` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

WebSocketProvider.\_getResolver

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:140

___

### \_getTransactionRequest

▸ **_getTransactionRequest**(`transaction`): `Promise`<`Transaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `Deferrable`<[`TransactionRequest`](../modules.md#transactionrequest)\> |

#### Returns

`Promise`<`Transaction`\>

#### Inherited from

WebSocketProvider.\_getTransactionRequest

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:125

___

### \_listenerCount

▸ `Private` **_listenerCount**(`eventName?`): `number`

DO NOT MODIFY.

Original code copied over from ether.js's `BaseProvider.listenerCount()`.

This method is copied over directly in order to implement Alchemy's unique
subscription types. The only difference is that this method calls
{@link getAlchemyEventTag} instead of the original `getEventTag()` method in
order to parse the Alchemy subscription event.

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName?` | [`AlchemyEventType`](../modules.md#alchemyeventtype) |

#### Returns

`number`

#### Defined in

[src/api/alchemy-websocket-provider.ts:947](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/alchemy-websocket-provider.ts#L947)

___

### \_listeners

▸ `Private` **_listeners**(`eventName?`): `Listener`[]

DO NOT MODIFY.

Original code copied over from ether.js's `BaseProvider.listeners()`.

This method is copied over directly in order to implement Alchemy's unique
subscription types. The only difference is that this method calls
{@link getAlchemyEventTag} instead of the original `getEventTag()` method in
order to parse the Alchemy subscription event.

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName?` | [`AlchemyEventType`](../modules.md#alchemyeventtype) |

#### Returns

`Listener`[]

#### Defined in

[src/api/alchemy-websocket-provider.ts:970](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/alchemy-websocket-provider.ts#L970)

___

### \_off

▸ `Private` **_off**(`eventName`, `listener?`): [`AlchemyWebSocketProvider`](AlchemyWebSocketProvider.md)

DO NOT MODIFY.

Original code copied over from ether.js's `BaseProvider.off()`.

This method is copied over directly in order to implement Alchemy's unique
subscription types. The only difference is that this method calls
{@link getAlchemyEventTag} instead of the original `getEventTag()` method in
order to parse the Alchemy subscription event.

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | [`AlchemyEventType`](../modules.md#alchemyeventtype) |
| `listener?` | `Listener` |

#### Returns

[`AlchemyWebSocketProvider`](AlchemyWebSocketProvider.md)

#### Defined in

[src/api/alchemy-websocket-provider.ts:871](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/alchemy-websocket-provider.ts#L871)

___

### \_ready

▸ **_ready**(): `Promise`<`Network`\>

#### Returns

`Promise`<`Network`\>

#### Inherited from

WebSocketProvider.\_ready

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:90

___

### \_removeAllListeners

▸ `Private` **_removeAllListeners**(`eventName`): [`AlchemyWebSocketProvider`](AlchemyWebSocketProvider.md)

DO NOT MODIFY.

Original code copied over from ether.js's `BaseProvider.removeAllListeners()`.

This method is copied over directly in order to implement Alchemy's unique
subscription types. The only difference is that this method calls
{@link getAlchemyEventTag} instead of the original `getEventTag()` method in
order to parse the Alchemy subscription event.

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | [`AlchemyEventType`](../modules.md#alchemyeventtype) |

#### Returns

[`AlchemyWebSocketProvider`](AlchemyWebSocketProvider.md)

#### Defined in

[src/api/alchemy-websocket-provider.ts:911](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/alchemy-websocket-provider.ts#L911)

___

### \_setFastBlockNumber

▸ **_setFastBlockNumber**(`blockNumber`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockNumber` | `number` |

#### Returns

`void`

#### Inherited from

WebSocketProvider.\_setFastBlockNumber

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:107

___

### \_startPending

▸ **_startPending**(): `void`

#### Returns

`void`

#### Inherited from

WebSocketProvider.\_startPending

#### Defined in

node_modules/@ethersproject/providers/lib/json-rpc-provider.d.ts:45

___

### \_uncachedDetectNetwork

▸ **_uncachedDetectNetwork**(): `Promise`<`Network`\>

#### Returns

`Promise`<`Network`\>

#### Inherited from

WebSocketProvider.\_uncachedDetectNetwork

#### Defined in

node_modules/@ethersproject/providers/lib/json-rpc-provider.d.ts:37

___

### \_waitForTransaction

▸ **_waitForTransaction**(`transactionHash`, `confirmations`, `timeout`, `replaceable`): `Promise`<[`TransactionReceipt`](../interfaces/TransactionReceipt.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionHash` | `string` |
| `confirmations` | `number` |
| `timeout` | `number` |
| `replaceable` | `Object` |
| `replaceable.data` | `string` |
| `replaceable.from` | `string` |
| `replaceable.nonce` | `number` |
| `replaceable.startBlock` | `number` |
| `replaceable.to` | `string` |
| `replaceable.value` | [`BigNumber`](BigNumber.md) |

#### Returns

`Promise`<[`TransactionReceipt`](../interfaces/TransactionReceipt.md)\>

#### Inherited from

WebSocketProvider.\_waitForTransaction

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:109

___

### \_wrapTransaction

▸ **_wrapTransaction**(`tx`, `hash?`, `startBlock?`): [`TransactionResponse`](../interfaces/TransactionResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `Transaction` |
| `hash?` | `string` |
| `startBlock?` | `number` |

#### Returns

[`TransactionResponse`](../interfaces/TransactionResponse.md)

#### Inherited from

WebSocketProvider.\_wrapTransaction

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:123

___

### addListener

▸ **addListener**(`eventName`, `listener`): `Provider`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | [`EventType`](../modules.md#eventtype) |
| `listener` | `Listener` |

#### Returns

`Provider`

#### Inherited from

WebSocketProvider.addListener

#### Defined in

node_modules/@ethersproject/abstract-provider/lib/index.d.ts:149

___

### call

▸ **call**(`transaction`, `blockTag?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `Deferrable`<[`TransactionRequest`](../modules.md#transactionrequest)\> |
| `blockTag?` | [`BlockTag`](../modules.md#blocktag) \| `Promise`<[`BlockTag`](../modules.md#blocktag)\> |

#### Returns

`Promise`<`string`\>

#### Inherited from

WebSocketProvider.call

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:128

___

### ccipReadFetch

▸ **ccipReadFetch**(`tx`, `calldata`, `urls`): `Promise`<``null`` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `Transaction` |
| `calldata` | `string` |
| `urls` | `string`[] |

#### Returns

`Promise`<``null`` \| `string`\>

#### Inherited from

WebSocketProvider.ccipReadFetch

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:94

___

### destroy

▸ **destroy**(): `Promise`<`void`\>

**`override`**

#### Returns

`Promise`<`void`\>

#### Overrides

WebSocketProvider.destroy

#### Defined in

[src/api/alchemy-websocket-provider.ts:407](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/alchemy-websocket-provider.ts#L407)

___

### detectNetwork

▸ **detectNetwork**(): `Promise`<`Network`\>

#### Returns

`Promise`<`Network`\>

#### Inherited from

WebSocketProvider.detectNetwork

#### Defined in

node_modules/@ethersproject/providers/lib/websocket-provider.d.ts:35

___

### emitEvent

▸ `Private` **emitEvent**<`T`\>(`virtualId`, `result`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `virtualId` | `string` |
| `result` | `T` |

#### Returns

`void`

#### Defined in

[src/api/alchemy-websocket-provider.ts:703](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/alchemy-websocket-provider.ts#L703)

___

### estimateGas

▸ **estimateGas**(`transaction`): `Promise`<[`BigNumber`](BigNumber.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `Deferrable`<[`TransactionRequest`](../modules.md#transactionrequest)\> |

#### Returns

`Promise`<[`BigNumber`](BigNumber.md)\>

#### Inherited from

WebSocketProvider.estimateGas

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:129

___

### getAvatar

▸ **getAvatar**(`nameOrAddress`): `Promise`<``null`` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrAddress` | `string` |

#### Returns

`Promise`<``null`` \| `string`\>

#### Inherited from

WebSocketProvider.getAvatar

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:143

___

### getBalance

▸ **getBalance**(`addressOrName`, `blockTag?`): `Promise`<[`BigNumber`](BigNumber.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressOrName` | `string` \| `Promise`<`string`\> |
| `blockTag?` | [`BlockTag`](../modules.md#blocktag) \| `Promise`<[`BlockTag`](../modules.md#blocktag)\> |

#### Returns

`Promise`<[`BigNumber`](BigNumber.md)\>

#### Inherited from

WebSocketProvider.getBalance

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:119

___

### getBlock

▸ **getBlock**(`blockHashOrBlockTag`): `Promise`<[`Block`](../interfaces/Block.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockHashOrBlockTag` | [`BlockTag`](../modules.md#blocktag) \| `Promise`<[`BlockTag`](../modules.md#blocktag)\> |

#### Returns

`Promise`<[`Block`](../interfaces/Block.md)\>

#### Inherited from

WebSocketProvider.getBlock

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:132

___

### getBlockNumber

▸ **getBlockNumber**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

#### Inherited from

WebSocketProvider.getBlockNumber

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:117

___

### getBlockWithTransactions

▸ **getBlockWithTransactions**(`blockHashOrBlockTag`): `Promise`<[`BlockWithTransactions`](../interfaces/BlockWithTransactions.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockHashOrBlockTag` | [`BlockTag`](../modules.md#blocktag) \| `Promise`<[`BlockTag`](../modules.md#blocktag)\> |

#### Returns

`Promise`<[`BlockWithTransactions`](../interfaces/BlockWithTransactions.md)\>

#### Inherited from

WebSocketProvider.getBlockWithTransactions

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:133

___

### getCode

▸ **getCode**(`addressOrName`, `blockTag?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressOrName` | `string` \| `Promise`<`string`\> |
| `blockTag?` | [`BlockTag`](../modules.md#blocktag) \| `Promise`<[`BlockTag`](../modules.md#blocktag)\> |

#### Returns

`Promise`<`string`\>

#### Inherited from

WebSocketProvider.getCode

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:121

___

### getEtherPrice

▸ **getEtherPrice**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

#### Inherited from

WebSocketProvider.getEtherPrice

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:137

___

### getFeeData

▸ **getFeeData**(): `Promise`<[`FeeData`](../interfaces/FeeData.md)\>

#### Returns

`Promise`<[`FeeData`](../interfaces/FeeData.md)\>

#### Inherited from

WebSocketProvider.getFeeData

#### Defined in

node_modules/@ethersproject/abstract-provider/lib/index.d.ts:127

___

### getGasPrice

▸ **getGasPrice**(): `Promise`<[`BigNumber`](BigNumber.md)\>

#### Returns

`Promise`<[`BigNumber`](BigNumber.md)\>

#### Inherited from

WebSocketProvider.getGasPrice

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:118

___

### getLogs

▸ **getLogs**(`filter`): `Promise`<[`Log`](../interfaces/Log.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | `Filter` \| `FilterByBlockHash` \| `Promise`<`Filter` \| `FilterByBlockHash`\> |

#### Returns

`Promise`<[`Log`](../interfaces/Log.md)[]\>

#### Inherited from

WebSocketProvider.getLogs

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:136

___

### getNetwork

▸ **getNetwork**(): `Promise`<`Network`\>

#### Returns

`Promise`<`Network`\>

#### Inherited from

WebSocketProvider.getNetwork

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:100

___

### getResolver

▸ **getResolver**(`name`): `Promise`<``null`` \| `Resolver`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<``null`` \| `Resolver`\>

#### Inherited from

WebSocketProvider.getResolver

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:139

___

### getSigner

▸ **getSigner**(`addressOrIndex?`): `JsonRpcSigner`

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressOrIndex?` | `string` \| `number` |

#### Returns

`JsonRpcSigner`

#### Inherited from

WebSocketProvider.getSigner

#### Defined in

node_modules/@ethersproject/providers/lib/json-rpc-provider.d.ts:38

___

### getStorageAt

▸ **getStorageAt**(`addressOrName`, `position`, `blockTag?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressOrName` | `string` \| `Promise`<`string`\> |
| `position` | [`BigNumberish`](../modules.md#bignumberish) \| `Promise`<[`BigNumberish`](../modules.md#bignumberish)\> |
| `blockTag?` | [`BlockTag`](../modules.md#blocktag) \| `Promise`<[`BlockTag`](../modules.md#blocktag)\> |

#### Returns

`Promise`<`string`\>

#### Inherited from

WebSocketProvider.getStorageAt

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:122

___

### getTransaction

▸ **getTransaction**(`transactionHash`): `Promise`<[`TransactionResponse`](../interfaces/TransactionResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionHash` | `string` \| `Promise`<`string`\> |

#### Returns

`Promise`<[`TransactionResponse`](../interfaces/TransactionResponse.md)\>

#### Inherited from

WebSocketProvider.getTransaction

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:134

___

### getTransactionCount

▸ **getTransactionCount**(`addressOrName`, `blockTag?`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressOrName` | `string` \| `Promise`<`string`\> |
| `blockTag?` | [`BlockTag`](../modules.md#blocktag) \| `Promise`<[`BlockTag`](../modules.md#blocktag)\> |

#### Returns

`Promise`<`number`\>

#### Inherited from

WebSocketProvider.getTransactionCount

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:120

___

### getTransactionReceipt

▸ **getTransactionReceipt**(`transactionHash`): `Promise`<[`TransactionReceipt`](../interfaces/TransactionReceipt.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionHash` | `string` \| `Promise`<`string`\> |

#### Returns

`Promise`<[`TransactionReceipt`](../interfaces/TransactionReceipt.md)\>

#### Inherited from

WebSocketProvider.getTransactionReceipt

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:135

___

### getUncheckedSigner

▸ **getUncheckedSigner**(`addressOrIndex?`): `UncheckedJsonRpcSigner`

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressOrIndex?` | `string` \| `number` |

#### Returns

`UncheckedJsonRpcSigner`

#### Inherited from

WebSocketProvider.getUncheckedSigner

#### Defined in

node_modules/@ethersproject/providers/lib/json-rpc-provider.d.ts:39

___

### isCommunityResource

▸ **isCommunityResource**(): `boolean`

Overrides the ether's `isCommunityResource()` method. Returns true if the
current api key is the default key.

**`override`**

#### Returns

`boolean`

#### Implementation of

CommunityResourcable.isCommunityResource

#### Defined in

[src/api/alchemy-websocket-provider.ts:419](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/alchemy-websocket-provider.ts#L419)

___

### listAccounts

▸ **listAccounts**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Inherited from

WebSocketProvider.listAccounts

#### Defined in

node_modules/@ethersproject/providers/lib/json-rpc-provider.d.ts:40

___

### listenerCount

▸ **listenerCount**(`eventName?`): `number`

Returns the number of listeners for the provided {@link eventName} event. If
no event is provided, the total number of listeners for all events is returned.

**`override`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName?` | [`AlchemyEventType`](../modules.md#alchemyeventtype) | The event to get the number of listeners for. |

#### Returns

`number`

#### Overrides

WebSocketProvider.listenerCount

#### Defined in

[src/api/alchemy-websocket-provider.ts:223](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/alchemy-websocket-provider.ts#L223)

___

### listeners

▸ **listeners**(`eventName?`): `Listener`[]

Returns an array of listeners for the provided {@link eventName} event. If
no event is provided, all listeners will be included.

**`override`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName?` | [`AlchemyEventType`](../modules.md#alchemyeventtype) | The event to get the listeners for. |

#### Returns

`Listener`[]

#### Overrides

WebSocketProvider.listeners

#### Defined in

[src/api/alchemy-websocket-provider.ts:239](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/alchemy-websocket-provider.ts#L239)

___

### lookupAddress

▸ **lookupAddress**(`address`): `Promise`<``null`` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` \| `Promise`<`string`\> |

#### Returns

`Promise`<``null`` \| `string`\>

#### Inherited from

WebSocketProvider.lookupAddress

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:142

___

### off

▸ **off**(`eventName`, `listener?`): [`AlchemyWebSocketProvider`](AlchemyWebSocketProvider.md)

Removes the provided {@link listener} for the {@link eventName} event. If no
listener is provided, all listeners for the event will be removed.

**`override`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | [`AlchemyEventType`](../modules.md#alchemyeventtype) | Event to unlisten to. |
| `listener?` | `Listener` | The listener function to remove. |

#### Returns

[`AlchemyWebSocketProvider`](AlchemyWebSocketProvider.md)

#### Overrides

WebSocketProvider.off

#### Defined in

[src/api/alchemy-websocket-provider.ts:191](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/alchemy-websocket-provider.ts#L191)

___

### on

▸ **on**(`eventName`, `listener`): [`AlchemyWebSocketProvider`](AlchemyWebSocketProvider.md)

Overridden implementation of ethers that includes Alchemy based subscriptions.

**`override`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | [`AlchemyEventType`](../modules.md#alchemyeventtype) | Event to subscribe to |
| `listener` | `Listener` | The listener function to call when the event is triggered. |

#### Returns

[`AlchemyWebSocketProvider`](AlchemyWebSocketProvider.md)

#### Overrides

WebSocketProvider.on

#### Defined in

[src/api/alchemy-websocket-provider.ts:163](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/alchemy-websocket-provider.ts#L163)

___

### once

▸ **once**(`eventName`, `listener`): [`AlchemyWebSocketProvider`](AlchemyWebSocketProvider.md)

Overridden implementation of ethers that includes Alchemy based
subscriptions. Adds a listener to the triggered for only the next
{@link eventName} event, after which it will be removed.

**`override`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | [`AlchemyEventType`](../modules.md#alchemyeventtype) | Event to subscribe to |
| `listener` | `Listener` | The listener function to call when the event is triggered. |

#### Returns

[`AlchemyWebSocketProvider`](AlchemyWebSocketProvider.md)

#### Overrides

WebSocketProvider.once

#### Defined in

[src/api/alchemy-websocket-provider.ts:178](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/alchemy-websocket-provider.ts#L178)

___

### perform

▸ **perform**(`method`, `params`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `string` |
| `params` | `any` |

#### Returns

`Promise`<`any`\>

#### Inherited from

WebSocketProvider.perform

#### Defined in

node_modules/@ethersproject/providers/lib/json-rpc-provider.d.ts:43

___

### poll

▸ **poll**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

WebSocketProvider.poll

#### Defined in

node_modules/@ethersproject/providers/lib/websocket-provider.d.ts:39

___

### prepareRequest

▸ **prepareRequest**(`method`, `params`): [`string`, `any`[]]

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `string` |
| `params` | `any` |

#### Returns

[`string`, `any`[]]

#### Inherited from

WebSocketProvider.prepareRequest

#### Defined in

node_modules/@ethersproject/providers/lib/json-rpc-provider.d.ts:42

___

### removeAllListeners

▸ **removeAllListeners**(`eventName?`): [`AlchemyWebSocketProvider`](AlchemyWebSocketProvider.md)

Remove all listeners for the provided {@link eventName} event. If no event
is provided, all events and their listeners are removed.

**`override`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName?` | [`AlchemyEventType`](../modules.md#alchemyeventtype) | The event to remove all listeners for. |

#### Returns

[`AlchemyWebSocketProvider`](AlchemyWebSocketProvider.md)

#### Overrides

WebSocketProvider.removeAllListeners

#### Defined in

[src/api/alchemy-websocket-provider.ts:207](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4a7f568/src/api/alchemy-websocket-provider.ts#L207)

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): `Provider`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | [`EventType`](../modules.md#eventtype) |
| `listener` | `Listener` |

#### Returns

`Provider`

#### Inherited from

WebSocketProvider.removeListener

#### Defined in

node_modules/@ethersproject/abstract-provider/lib/index.d.ts:150

___

### resetEventsBlock

▸ **resetEventsBlock**(`blockNumber`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockNumber` | `number` |

#### Returns

`void`

#### Inherited from

WebSocketProvider.resetEventsBlock

#### Defined in

node_modules/@ethersproject/providers/lib/websocket-provider.d.ts:37

___

### resolveName

▸ **resolveName**(`name`): `Promise`<``null`` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` \| `Promise`<`string`\> |

#### Returns

`Promise`<``null`` \| `string`\>

#### Inherited from

WebSocketProvider.resolveName

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:141

___

### send

▸ **send**(`method`, `params?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `string` |
| `params?` | `any`[] |

#### Returns

`Promise`<`any`\>

#### Inherited from

WebSocketProvider.send

#### Defined in

node_modules/@ethersproject/providers/lib/websocket-provider.d.ts:41

___

### sendTransaction

▸ **sendTransaction**(`signedTransaction`): `Promise`<[`TransactionResponse`](../interfaces/TransactionResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signedTransaction` | `string` \| `Promise`<`string`\> |

#### Returns

`Promise`<[`TransactionResponse`](../interfaces/TransactionResponse.md)\>

#### Inherited from

WebSocketProvider.sendTransaction

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:124

___

### waitForTransaction

▸ **waitForTransaction**(`transactionHash`, `confirmations?`, `timeout?`): `Promise`<[`TransactionReceipt`](../interfaces/TransactionReceipt.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionHash` | `string` |
| `confirmations?` | `number` |
| `timeout?` | `number` |

#### Returns

`Promise`<[`TransactionReceipt`](../interfaces/TransactionReceipt.md)\>

#### Inherited from

WebSocketProvider.waitForTransaction

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:108

___

### defaultUrl

▸ `Static` **defaultUrl**(): `string`

#### Returns

`string`

#### Inherited from

WebSocketProvider.defaultUrl

#### Defined in

node_modules/@ethersproject/providers/lib/websocket-provider.d.ts:42

___

### getFormatter

▸ `Static` **getFormatter**(): `Formatter`

#### Returns

`Formatter`

#### Inherited from

WebSocketProvider.getFormatter

#### Defined in

node_modules/@ethersproject/providers/lib/base-provider.d.ts:92

___

### hexlifyTransaction

▸ `Static` **hexlifyTransaction**(`transaction`, `allowExtra?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | [`TransactionRequest`](../modules.md#transactionrequest) |
| `allowExtra?` | `Object` |

#### Returns

`Object`

#### Inherited from

WebSocketProvider.hexlifyTransaction

#### Defined in

node_modules/@ethersproject/providers/lib/json-rpc-provider.d.ts:47

___

### isProvider

▸ `Static` **isProvider**(`value`): value is Provider

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is Provider

#### Inherited from

WebSocketProvider.isProvider

#### Defined in

node_modules/@ethersproject/abstract-provider/lib/index.d.ts:154
