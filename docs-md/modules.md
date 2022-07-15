[@alch/alchemy-sdk](README.md) / Exports

# @alch/alchemy-sdk

## Table of contents

### Enumerations

- [AssetTransfersCategory](enums/AssetTransfersCategory.md)
- [AssetTransfersOrder](enums/AssetTransfersOrder.md)
- [Network](enums/Network.md)
- [NftExcludeFilters](enums/NftExcludeFilters.md)
- [NftTokenType](enums/NftTokenType.md)
- [RefreshState](enums/RefreshState.md)

### Classes

- [Alchemy](classes/Alchemy.md)

### Interfaces

- [AlchemyConfig](interfaces/AlchemyConfig.md)
- [AssetTransfersParams](interfaces/AssetTransfersParams.md)
- [AssetTransfersResponse](interfaces/AssetTransfersResponse.md)
- [AssetTransfersResult](interfaces/AssetTransfersResult.md)
- [BaseNft](interfaces/BaseNft.md)
- [BaseNftContract](interfaces/BaseNftContract.md)
- [DeployResult](interfaces/DeployResult.md)
- [ERC1155Metadata](interfaces/ERC1155Metadata.md)
- [FloorPriceError](interfaces/FloorPriceError.md)
- [FloorPriceMarketplace](interfaces/FloorPriceMarketplace.md)
- [GetBaseNftsForNftContractOptions](interfaces/GetBaseNftsForNftContractOptions.md)
- [GetBaseNftsForOwnerOptions](interfaces/GetBaseNftsForOwnerOptions.md)
- [GetNftFloorPriceResponse](interfaces/GetNftFloorPriceResponse.md)
- [GetNftsForNftContractOptions](interfaces/GetNftsForNftContractOptions.md)
- [GetNftsForOwnerOptions](interfaces/GetNftsForOwnerOptions.md)
- [GetOwnersForNftContractResponse](interfaces/GetOwnersForNftContractResponse.md)
- [GetOwnersForNftResponse](interfaces/GetOwnersForNftResponse.md)
- [Media](interfaces/Media.md)
- [Nft](interfaces/Nft.md)
- [NftContract](interfaces/NftContract.md)
- [NftContractBaseNftsResponse](interfaces/NftContractBaseNftsResponse.md)
- [NftContractNftsResponse](interfaces/NftContractNftsResponse.md)
- [NftMetadata](interfaces/NftMetadata.md)
- [OwnedBaseNft](interfaces/OwnedBaseNft.md)
- [OwnedBaseNftsResponse](interfaces/OwnedBaseNftsResponse.md)
- [OwnedNft](interfaces/OwnedNft.md)
- [OwnedNftsResponse](interfaces/OwnedNftsResponse.md)
- [RawContract](interfaces/RawContract.md)
- [RefreshNftContractResult](interfaces/RefreshNftContractResult.md)
- [TokenBalanceFailure](interfaces/TokenBalanceFailure.md)
- [TokenBalanceSuccess](interfaces/TokenBalanceSuccess.md)
- [TokenBalancesResponse](interfaces/TokenBalancesResponse.md)
- [TokenMetadataResponse](interfaces/TokenMetadataResponse.md)
- [TokenUri](interfaces/TokenUri.md)
- [TransactionReceiptsBlockHash](interfaces/TransactionReceiptsBlockHash.md)
- [TransactionReceiptsBlockNumber](interfaces/TransactionReceiptsBlockNumber.md)
- [TransactionReceiptsResponse](interfaces/TransactionReceiptsResponse.md)

### Type aliases

- [AlchemyEventType](modules.md#alchemyeventtype)
- [AlchemyPendingTransactionsEventFilter](modules.md#alchemypendingtransactionseventfilter)
- [LogLevel](modules.md#loglevel)
- [TokenBalance](modules.md#tokenbalance)
- [TransactionReceiptsParams](modules.md#transactionreceiptsparams)

### Functions

- [fromHex](modules.md#fromhex)
- [isHex](modules.md#ishex)
- [setLogLevel](modules.md#setloglevel)
- [toHex](modules.md#tohex)

## Type aliases

### AlchemyEventType

Ƭ **AlchemyEventType**: `EventType` \| [`AlchemyPendingTransactionsEventFilter`](modules.md#alchemypendingtransactionseventfilter)

Alchemy's event filter that extends the default {@link EventType} interface to
also include Alchemy's Subscription API.

#### Defined in

[types/types.ts:604](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L604)

___

### AlchemyPendingTransactionsEventFilter

Ƭ **AlchemyPendingTransactionsEventFilter**: `Object`

Event filter for the {@link AlchemyWebSocketProvider.on} and
{@link AlchemyWebSocketProvider.once} methods to use Alchemy's custom
`alchemy_pendingTransactions` endpoint.

Returns the transaction information for all pending transactions that match a
given filter. For full documentation, see:
https://docs.alchemy.com/alchemy/enhanced-apis/subscription-api-websockets#alchemy_pendingtransactions

Note that excluding all optional parameters will return transaction
information for ALL pending transactions that are added to the mempool.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `fromAddress?` | `string` \| `string`[] | Filter pending transactions sent FROM the provided address or array of addresses. |
| `hashesOnly?` | `boolean` | Whether to only include transaction hashes and exclude the rest of the transaction response for a smaller payload. Defaults to false (by default, the entire transaction response is included).  Note that setting only [hashesOnly](modules.md#hashesonly) to true will return the same response as subscribing to `newPendingTransactions`. |
| `method` | ``"alchemy_pendingTransactions"`` | - |
| `toAddress?` | `string` \| `string`[] | Filter pending transactions sent TO the provided address or array of addresses. |

#### Defined in

[types/types.ts:579](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L579)

___

### LogLevel

Ƭ **LogLevel**: ``"debug"`` \| ``"info"`` \| ``"warn"`` \| ``"error"`` \| ``"silent"``

The level of verbosity for the logger.

#### Defined in

[util/logger.ts:22](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/util/logger.ts#L22)

___

### TokenBalance

Ƭ **TokenBalance**: [`TokenBalanceSuccess`](interfaces/TokenBalanceSuccess.md) \| [`TokenBalanceFailure`](interfaces/TokenBalanceFailure.md)

#### Defined in

[types/types.ts:55](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L55)

___

### TransactionReceiptsParams

Ƭ **TransactionReceiptsParams**: [`TransactionReceiptsBlockNumber`](interfaces/TransactionReceiptsBlockNumber.md) \| [`TransactionReceiptsBlockHash`](interfaces/TransactionReceiptsBlockHash.md)

#### Defined in

[types/types.ts:456](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/types/types.ts#L456)

## Functions

### fromHex

▸ **fromHex**(`hexString`): `number`

Converts a hex string to a decimal number.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hexString` | `string` | The hex string to convert. |

#### Returns

`number`

#### Defined in

[api/util.ts:11](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/util.ts#L11)

___

### isHex

▸ **isHex**(`possibleHexString`): `boolean`

Checks if a value is a hex string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `possibleHexString` | `string` | The value to check. |

#### Returns

`boolean`

#### Defined in

[api/util.ts:31](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/util.ts#L31)

___

### setLogLevel

▸ **setLogLevel**(`logLevel`): `void`

Configures the verbosity of logging. The default log level is `info`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `logLevel` | [`LogLevel`](modules.md#loglevel) | The verbosity of logging. Can be any of the following values:    - `debug`: The most verbose logging level.   - `info`: The default logging level.   - `warn`: A logging level for non-critical issues.   - `error`: A logging level for critical issues.   - `silent`: Turn off all logging. |

#### Returns

`void`

#### Defined in

[util/logger.ts:56](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/util/logger.ts#L56)

___

### toHex

▸ **toHex**(`num`): `string`

Converts a number to a hex string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `num` | `number` | The number to convert to hex. |

#### Returns

`string`

#### Defined in

[api/util.ts:21](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/util.ts#L21)
