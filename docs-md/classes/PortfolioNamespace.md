[alchemy-sdk](../README.md) / [Exports](../modules.md) / PortfolioNamespace

# Class: PortfolioNamespace

The Portfolio namespace contains methods for getting data needed to build a portfolio.

Do not call this constructor directly. Instead, instantiate an Alchemy object
with `const alchemy = new Alchemy(config)` and then access the portfolio namespace
via `alchemy.portfolio`.

## Table of contents

### Methods

- [getNftCollectionsByWallet](PortfolioNamespace.md#getnftcollectionsbywallet)
- [getNftsByWallet](PortfolioNamespace.md#getnftsbywallet)
- [getTokenBalancesByWallet](PortfolioNamespace.md#gettokenbalancesbywallet)
- [getTokensByWallet](PortfolioNamespace.md#gettokensbywallet)
- [getTransactionsByWallet](PortfolioNamespace.md#gettransactionsbywallet)

## Methods

### getNftCollectionsByWallet

▸ **getNftCollectionsByWallet**(`addresses`, `withMetadata?`, `pageKey?`, `pageSize?`): `Promise`<[`GetNftCollectionsByWalletResponse`](../interfaces/GetNftCollectionsByWalletResponse.md)\>

Fetches NFT collections (contracts) for multiple wallet addresses and networks. Returns a list of
collections and metadata for each wallet/network combination.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `addresses` | [`PortfolioAddress`](../interfaces/PortfolioAddress.md)[] | `undefined` | Array of address and networks pairs (limit 2 pairs, max 15 networks each). |
| `withMetadata` | `boolean` | `true` | Boolean. If set to true, returns metadata. (default: true) |
| `pageKey?` | `string` | `undefined` | Optional. The cursor that points to the current set of results. |
| `pageSize?` | `number` | `undefined` | Optional. Sets the number of items per page. |

#### Returns

`Promise`<[`GetNftCollectionsByWalletResponse`](../interfaces/GetNftCollectionsByWalletResponse.md)\>

Promise containing a list of NFT collections for each wallet/network combination.

#### Defined in

[src/api/portfolio-namespace.ts:116](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/api/portfolio-namespace.ts#L116)

___

### getNftsByWallet

▸ **getNftsByWallet**(`addresses`, `withMetadata?`, `pageKey?`, `pageSize?`): `Promise`<[`GetNftsByWalletResponse`](../interfaces/GetNftsByWalletResponse.md)\>

Fetches NFTs for multiple wallet addresses and networks.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `addresses` | [`PortfolioAddress`](../interfaces/PortfolioAddress.md)[] | `undefined` | Array of network/address pairs to fetch NFTs for. |
| `withMetadata` | `boolean` | `true` | Boolean. If set to true, returns metadata. Setting this to false will reduce payload size and may result in a faster API call. (default: true) |
| `pageKey?` | `string` | `undefined` | Optional. The cursor that points to the current set of results. |
| `pageSize?` | `number` | `undefined` | Optional. Sets the number of items per page. |

#### Returns

`Promise`<[`GetNftsByWalletResponse`](../interfaces/GetNftsByWalletResponse.md)\>

Promise containing a list of NFTs and metadata for each wallet/network combination.

#### Defined in

[src/api/portfolio-namespace.ts:90](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/api/portfolio-namespace.ts#L90)

___

### getTokenBalancesByWallet

▸ **getTokenBalancesByWallet**(`addresses`, `includeNativeTokens?`): `Promise`<[`GetTokenBalancesByWalletResponse`](../interfaces/GetTokenBalancesByWalletResponse.md)\>

Fetches fungible tokens (native and ERC-20) for multiple wallet addresses and networks.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `addresses` | [`PortfolioAddress`](../interfaces/PortfolioAddress.md)[] | `undefined` | Array of network/address pairs (limit 2 pairs, max 5 networks each). |
| `includeNativeTokens` | `boolean` | `true` | Boolean. Whether to include each chain’s native token in the response (e.g. ETH on Ethereum). The native token will have a null contract address. (default: true)   * @returns Promise containing a list of tokens with balances for each wallet/network combination |

#### Returns

`Promise`<[`GetTokenBalancesByWalletResponse`](../interfaces/GetTokenBalancesByWalletResponse.md)\>

#### Defined in

[src/api/portfolio-namespace.ts:68](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/api/portfolio-namespace.ts#L68)

___

### getTokensByWallet

▸ **getTokensByWallet**(`addresses`, `withMetadata?`, `withPrices?`, `includeNativeTokens?`): `Promise`<[`GetTokensByWalletResponse`](../interfaces/GetTokensByWalletResponse.md)\>

Fetches fungible tokens (native and ERC-20) for multiple wallet addresses
and networks.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `addresses` | [`PortfolioAddress`](../interfaces/PortfolioAddress.md)[] | `undefined` | Array of network/address pairs                    (limit 2 pairs, max 5 networks each). |
| `withMetadata` | `boolean` | `true` | Boolean. If set to true, returns metadata. Setting                                this to false will reduce payload size and                                may result in a faster API call.                                (default: true) |
| `withPrices` | `boolean` | `true` | Boolean. If set to true, returns token prices. Setting                              this to false will reduce payload size and may                              result in a faster API call. (default: true) |
| `includeNativeTokens` | `boolean` | `true` | Boolean. Whether to include each chain’s                                       native token in the response                                       (e.g. ETH on Ethereum). The native                                       token will have a null contract                                       address. (default: true) |

#### Returns

`Promise`<[`GetTokensByWalletResponse`](../interfaces/GetTokensByWalletResponse.md)\>

Promise containing a list of tokens with balances, prices, and
         metadata for each wallet/network combination.

#### Defined in

[src/api/portfolio-namespace.ts:46](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/api/portfolio-namespace.ts#L46)

___

### getTransactionsByWallet

▸ **getTransactionsByWallet**(`addresses`, `before?`, `after?`, `limit?`): `Promise`<[`GetTransactionsByWalletResponse`](../interfaces/GetTransactionsByWalletResponse.md)\>

Fetches all historical transactions (internal & external) for multiple wallet addresses and networks.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addresses` | [`PortfolioAddress`](../interfaces/PortfolioAddress.md)[] | Array of network/address pairs to fetch transactions for. |
| `before?` | `string` | Optional. The cursor that points to the previous set of results. |
| `after?` | `string` | Optional. The cursor that points to the end of the current set of results. |
| `limit?` | `number` | Optional. Sets the maximum number of items per page (Max: 100) |

#### Returns

`Promise`<[`GetTransactionsByWalletResponse`](../interfaces/GetTransactionsByWalletResponse.md)\>

Promise containing a list of transaction objects with metadata and log information.

#### Defined in

[src/api/portfolio-namespace.ts:142](https://github.com/alchemyplatform/alchemy-sdk-js/blob/1ee40cb2/src/api/portfolio-namespace.ts#L142)
