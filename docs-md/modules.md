[alchemy-sdk](README.md) / Exports

# alchemy-sdk

## Table of contents

### Namespaces

- [Utils](modules/Utils.md)

### Enumerations

- [AssetTransfersCategory](enums/AssetTransfersCategory.md)
- [AssetTransfersOrder](enums/AssetTransfersOrder.md)
- [Network](enums/Network.md)
- [NftExcludeFilters](enums/NftExcludeFilters.md)
- [NftTokenType](enums/NftTokenType.md)
- [RefreshState](enums/RefreshState.md)
- [TokenBalanceType](enums/TokenBalanceType.md)

### Classes

- [Alchemy](classes/Alchemy.md)
- [AlchemyConfig](classes/AlchemyConfig.md)
- [AlchemyProvider](classes/AlchemyProvider.md)
- [AlchemyWebSocketProvider](classes/AlchemyWebSocketProvider.md)
- [Contract](classes/Contract.md)
- [ContractFactory](classes/ContractFactory.md)
- [CoreNamespace](classes/CoreNamespace.md)
- [NftNamespace](classes/NftNamespace.md)
- [TransactNamespace](classes/TransactNamespace.md)
- [Wallet](classes/Wallet.md)
- [WebSocketNamespace](classes/WebSocketNamespace.md)

### Interfaces

- [AlchemySettings](interfaces/AlchemySettings.md)
- [AssetTransfersMetadata](interfaces/AssetTransfersMetadata.md)
- [AssetTransfersParams](interfaces/AssetTransfersParams.md)
- [AssetTransfersResponse](interfaces/AssetTransfersResponse.md)
- [AssetTransfersResult](interfaces/AssetTransfersResult.md)
- [AssetTransfersWithMetadataParams](interfaces/AssetTransfersWithMetadataParams.md)
- [AssetTransfersWithMetadataResponse](interfaces/AssetTransfersWithMetadataResponse.md)
- [AssetTransfersWithMetadataResult](interfaces/AssetTransfersWithMetadataResult.md)
- [BaseNft](interfaces/BaseNft.md)
- [BaseNftContract](interfaces/BaseNftContract.md)
- [DeployResult](interfaces/DeployResult.md)
- [ERC1155Metadata](interfaces/ERC1155Metadata.md)
- [FloorPriceError](interfaces/FloorPriceError.md)
- [FloorPriceMarketplace](interfaces/FloorPriceMarketplace.md)
- [GetBaseNftsForContractOptions](interfaces/GetBaseNftsForContractOptions.md)
- [GetBaseNftsForOwnerOptions](interfaces/GetBaseNftsForOwnerOptions.md)
- [GetFloorPriceResponse](interfaces/GetFloorPriceResponse.md)
- [GetNftsForContractOptions](interfaces/GetNftsForContractOptions.md)
- [GetNftsForOwnerOptions](interfaces/GetNftsForOwnerOptions.md)
- [GetOwnersForContractOptions](interfaces/GetOwnersForContractOptions.md)
- [GetOwnersForContractResponse](interfaces/GetOwnersForContractResponse.md)
- [GetOwnersForContractWithTokenBalancesOptions](interfaces/GetOwnersForContractWithTokenBalancesOptions.md)
- [GetOwnersForContractWithTokenBalancesResponse](interfaces/GetOwnersForContractWithTokenBalancesResponse.md)
- [GetOwnersForNftResponse](interfaces/GetOwnersForNftResponse.md)
- [Media](interfaces/Media.md)
- [Nft](interfaces/Nft.md)
- [NftContract](interfaces/NftContract.md)
- [NftContractBaseNftsResponse](interfaces/NftContractBaseNftsResponse.md)
- [NftContractNftsResponse](interfaces/NftContractNftsResponse.md)
- [NftContractOwner](interfaces/NftContractOwner.md)
- [NftContractTokenBalance](interfaces/NftContractTokenBalance.md)
- [NftMetadata](interfaces/NftMetadata.md)
- [OwnedBaseNft](interfaces/OwnedBaseNft.md)
- [OwnedBaseNftsResponse](interfaces/OwnedBaseNftsResponse.md)
- [OwnedNft](interfaces/OwnedNft.md)
- [OwnedNftsResponse](interfaces/OwnedNftsResponse.md)
- [RawContract](interfaces/RawContract.md)
- [RefreshContractResult](interfaces/RefreshContractResult.md)
- [SendPrivateTransactionOptions](interfaces/SendPrivateTransactionOptions.md)
- [TokenBalanceFailure](interfaces/TokenBalanceFailure.md)
- [TokenBalanceSuccess](interfaces/TokenBalanceSuccess.md)
- [TokenBalancesOptionsDefaultTokens](interfaces/TokenBalancesOptionsDefaultTokens.md)
- [TokenBalancesOptionsErc20](interfaces/TokenBalancesOptionsErc20.md)
- [TokenBalancesResponse](interfaces/TokenBalancesResponse.md)
- [TokenBalancesResponseErc20](interfaces/TokenBalancesResponseErc20.md)
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

[src/types/types.ts:1030](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L1030)

___

### AlchemyPendingTransactionsEventFilter

Ƭ **AlchemyPendingTransactionsEventFilter**: `Object`

Event filter for the [AlchemyWebSocketProvider.on](classes/AlchemyWebSocketProvider.md#on) and
[AlchemyWebSocketProvider.once](classes/AlchemyWebSocketProvider.md#once) methods to use Alchemy's custom
`alchemy_pendingTransactions` endpoint.

Returns the transaction information for all pending transactions that match a
given filter. For full documentation, see:
https://docs.alchemy.com/alchemy/enhanced-apis/subscription-api-websockets#alchemy_pendingtransactions

Note that excluding all optional parameters will return transaction
information for ALL pending transactions that are added to the mempool.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `fromAddress?` | `string` \| `string`[] | - |
| `hashesOnly?` | `boolean` | Whether to only include transaction hashes and exclude the rest of the transaction response for a smaller payload. Defaults to false (by default, the entire transaction response is included).  Note that setting only [hashesOnly](modules.md#hashesonly) to true will return the same response as subscribing to `newPendingTransactions`. |
| `method` | ``"alchemy_pendingTransactions"`` | - |
| `toAddress?` | `string` \| `string`[] | Filter pending transactions sent TO the provided address or array of addresses. |

#### Defined in

[src/types/types.ts:1006](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L1006)

___

### LogLevel

Ƭ **LogLevel**: ``"debug"`` \| ``"info"`` \| ``"warn"`` \| ``"error"`` \| ``"silent"``

The level of verbosity for the logger.

#### Defined in

[src/util/logger.ts:22](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/util/logger.ts#L22)

___

### TokenBalance

Ƭ **TokenBalance**: [`TokenBalanceSuccess`](interfaces/TokenBalanceSuccess.md) \| [`TokenBalanceFailure`](interfaces/TokenBalanceFailure.md)

#### Defined in

[src/types/types.ts:118](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L118)

___

### TransactionReceiptsParams

Ƭ **TransactionReceiptsParams**: [`TransactionReceiptsBlockNumber`](interfaces/TransactionReceiptsBlockNumber.md) \| [`TransactionReceiptsBlockHash`](interfaces/TransactionReceiptsBlockHash.md)

The parameters to use with the [CoreNamespace.getTransactionReceipts](classes/CoreNamespace.md#gettransactionreceipts) method.

#### Defined in

[src/types/types.ts:793](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L793)

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

[src/api/util.ts:9](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/util.ts#L9)

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

[src/api/util.ts:29](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/util.ts#L29)

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

[src/util/logger.ts:56](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/util/logger.ts#L56)

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

[src/api/util.ts:19](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/util.ts#L19)
