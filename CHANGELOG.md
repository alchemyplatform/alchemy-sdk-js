# Changelog for Alchemy SDK for JavaScript

## Unreleased

### Major Changes

- Added support for Zksync Mainnet and Sepolia via the `Network.ZKSYNC_MAINNET` and `Network.ZKSYNC_SEPOLIA` enums.

### Minor Changes

## 3.2.0

### Major Changes

- Added support for Polygon Amoy network via the `Network.MATIC_AMOY` enum.

### Minor Changes

## 3.1.2

### Major Changes

### Minor Changes

- Upgraded the `axios` dependency to `v1.6.5`, fixing a vulnerable version #397. Thanks @mpsq for the contribution!

## 3.1.1

### Major Changes

### Minor Changes

- Added endpoints for `isAirdropNft()` and `reportSpam()` in `NftNamespace`.
- Added a missing `marketplaceAddress` field to the `NftSale` in `NftNamespace.getNftSales()`.
- Fixed an incorrect field name for `bannerImageUrl` in `OpenSeaCollectionMetadata`. Deprecated the old field name `imageBannerUrl`.
- Added support for Base networks in `NotifyNamespace`.

## 3.1.0

### Major Changes

- Added support for Optimism Sepolia and Base Sepolia via the `Network.OPT_SEPOLIA` and `Network.BASE_SEPOLIA` enums.

### Minor Changes

## 3.0.0

### Major Changes

- For a full list of changes to V3 from V2, please visit: https://docs.alchemy.com/reference/alchemy-sdk-v2-to-v3-migration-guide. There, you can also find the API reference for v2 endpoints as well. V3 primarily involves changes to use the V3 NFT API.

## 2.11.0

### Minor Changes

- Added support for Arbitrum Sepolia network via the `Network.ARB_SEPOLIA` enum.

## 2.10.1

### Major Changes

### Minor Changes

- Fixed a bug in the `Log` object where the `removed` field was not included in the response.

## 2.10.0

### Major Changes

- Add support for Base

### Minor Changes

## 2.9.2

### Major Changes

- Added a new method `CoreNamespace.isContractAddress()` to easily check if an address is a contract or EOA. The method accepts a string address and returns a boolean value indicating if the given address is a contract address or not.

### Minor Changes

- Fixed a bug where `GetOwnersForContractResponse` was missing the `pageKey` field.

## 2.9.1

### Major Changes

### Minor Changes

- Add the `refreshCache` parameter to NFT rarity endpoints to allow users to update stale rarity values.
- Add the `includeCount` parameter to getOwnersForContract.

## 2.9.0

### Major Changes

- Fixed a bug with in `NftNamespace.getNftSales()` in which there was a typo in `decimal` field of the `NftSaleFeeData` object. The field is now correctly named `decimals`, and `decimal` is marked deprecated to avoid a breaking change.

### Minor Changes

- Added redundancy to `CoreNamespace.getTokensForOwner()` to handle failures when fetching token metadata.
- Added support for the `acquiredAt` field for ordered `getNftsForOwner` queries. Only available when specifying `orderBy: NftOrdering.TRANSFERTIME` in the request.
- Added the `NftSaleMarketplace.BLUR` marketplace enum to the `NftNamespace.getNftSales()` method return.
- Added support for the `validAt` response field to `NftNamespace.getNftSales()`.

## 2.8.3

### Major Changes

### Minor Changes

- Fixed a bug with `NotifyNamespace` when creating webhooks on ETH_SEPOLIA, OPT_GOERLI, and ARB_GOERLI.
- Fixed a bug with `Wallet.populateTransaction()` where the method would never resolve.
- Fixed a bug with `NftNamespace.getMintedNfts()` and `NftNamespace.getTransfersForOwner()` where the method would always throw an error for certain addresses (#318).

## 2.8.2

### Major Changes

### Minor Changes

- Moved the `exports.default` field to be the last field. This fixed a bug introduced in `2.8.1` that prevented certain frameworks from building (#313).

## 2.8.1

### Major Changes

### Minor Changes

- Fixed a bug where the SDK was not compatible with `moduleResolution: bundler` when using `typescript` at `v5.0`(#302). Thanks @florrdv!
- Fixed a bug with `getTransfersForOwner()` and `getTransfersForContract()` methods in the `NftNamespace`, where some NFTs would not be returned if the NFT was transferred multiple times.

## 2.8.0

### Major Changes

Added PolygonZkEvm Mainnet and Testnet limited support to the sdk

### Minor Changes

## 2.7.0

### Major Changes

- Added `CustomGraphqlWebhook` to be used with the `NotifyNamespace`. This webhook uses graphql to track any event on every block.

### Minor Changes

## 2.6.3

### Major Changes

### Minor Changes

- Added support for a `pageKey` and `pageSize` parameter in `NftNamespace.getOwnersforNft` to allow for pagination of the results.

## 2.6.2

### Major Changes

### Minor Changes

- Added additional descriptive tokenTypes in NFT- and contract-level metadata, for contracts which don't support any NFT standard.

## 2.6.1

### Major Changes

### Minor Changes

- Added the `title` field to `ContractForOwner` to represent the title of the token held by the owner.
- Fixed a bug where the `media` field in `ContractForOwner` was a `Media` object rather than a `Media[]` array.
- Added support for the Eth Sepolia network via the `Network.ETH_SEPOLIA` enum.

## 2.6.0

### Major Changes

- Added the `NftMetadataUpdateWebhook` to be used with the `NotifyNamespace`. This webhook tracks all ERC721 and ERC1155 token metadata updates.

### Minor Changes

## 2.5.0

### Major Changes

- Added `TransactNamespace.simulateAssetChangesBundle()` to simulate a list of transactions in sequence and return a list of asset changes.
- Added `TransactNamespace.simulateExecutionBundle()` to simulate a list of transactions in sequence and return a list of decoded logs and traces.
- Added `NftNamespace.getContractMetadataBatch()` to get the metadata associated with multiple NFT contracts in a single request.

### Minor Changes

- Added exports for Ethers.js types and interfaces used by the SDK.
- Added the `pageSize` parameter to the `NftNamespace.getContractsForOwner()` method.

## 2.4.3

### Major Changes

### Minor Changes

- Added a missing `gas` field in the `DebugTransaction` interface to specify the gas provided for a transaction execution.
- Fixed a bug with `NftNamespace.getMintedNfts()`, `NftNamespace.getTransfersForOwner()`, and `NftNamespace.getTransfersForContract()` where the method would incorrectly error if the specified address had no transfers.
- Added the `BigNumber` ethers export. You can access this by importing `BigNumber` along with the other exports in the package.

## 2.4.2

### Major Changes

### Minor Changes

- Added the `CoreNamespace.getTokensForOwner()` method to get all the token balances and token metadata for a given address.
- Added the `wyvern` and `cryptopunks` marketplaces in the `NftSaleMarketplace` enum to the `NftNamespace.getNftSales()` method.
- Added the `blockHash` field to the `OwnedNftsResponse` returned by `NftNamespace.getNftsForOwner()` to track the block hash that the request was based on.

## 2.4.1

### Major Changes

### Minor Changes

- Added the `NftNamespace.getTransfersForOwner()` method to get all NFT transfers to or from a provided owner address.
- Added the `NftNamespace.getTransfersForContract()` method to all the NFT transfers for a provided NFT contract address.
- Deprecated the `GetMintedNftsResponse` interface in favor of the `TransfersNftResponse`. The `TransfersNftResponse` contains the same properties as the `GetMintedNftsResponse` and includes additional fields about the transfer.

## 2.4.0

### Major Changes

- Added `TransactNamespace.simulateAssetChanges()` to simulate a transaction and return a list of asset changes.
- Added `TransactNamespace.simulateExecution()` to simulate a transaction and return a list of decoded logs and traces.

### Minor Changes

## 2.3.1

### Major Changes

### Minor Changes

- Added support for passing in a `null` `tokenId` when using NFT Webhook Filters, which allows you to listen to all token ids in a collection.
- Added `NftNamespace.getMintedNfts()` to fetch all the NFTs an owner address minted, optionally filtered by a set of specific NFT contracts.
- Added the option to pass in an `EventFilter` with multiple addresses to the `CoreNamespace.getLogs()` method.
- Fixed a bug where the `protocolFee` was not included in the response for `NftNamespace.getNftSales()`. Deprecated the existing `marketplaceFee` property in favor of the new `protocolFee` property.

## 2.3.0

### Major Changes

- Added the `DebugNamespace` to the top-level `Alchemy` object. The `DebugNamespace` is used to replay and inspect transactions and mined blocks in greater detail.

### Minor Changes

- Added the `tokenUriTimeoutInMs` option to `NftNamespace.getNftsForContract()` to specify the timeout duration for fetching an NFT's underlying metadata.
- Fixed a bug where using `AlchemySubscriptions.PENDING_TRANSACTIONS` with a string array input would throw an error (#222).
- Added support for the `refreshCache` option in `NftNamespace.getNftMetadata()`. This option is now available when using the `options` overload. The original method without the `options` overload is now deprecated.
- Added support for the `requestTimeout` option in the `AlchemySettings` object to configure a timeout for `NftNamespace` and `NotifyNamespace` methods. Thanks @Abbaskt!
- Added the `contractDeployer` and `deployedBlockNumber` into the `NftContract` object. Methods that return NFTs such as `NftNamespace.getNftsForOwner()` and `NftNamespace.getContractsForOwner()` now include this information under the `contract` field.

## 2.2.5

### Major Changes

- Added `NftNamespace.getContractsForOwner()` to fetch all NFT contracts for a specified owner address.

### Minor Changes

- Fixed a bug in `NftNamespace.getNftsForOwner()` where the `openSea` metadata was not included in the returned NFT.
- Marked the `NftExcludeFilters` type as deprecated. Please use `NftFilters` instead.
- Added support for the `orderBy` param to `NftNamespace.getNftsForOwner()` and `NftNamespace.getContractsForOwner()`.

## 2.2.4

### Major Changes

### Minor Changes

- Fixed a bug where `newHeads` subscriptions would error and crash when reconnecting to the websocket.
- Fixed a bug where certain subscriptions would not reconnect after the websocket reconnected.
- Added exports for `toUtf8Bytes` and `toUtf8String` in `Utils`.

## 2.2.3

### Major Changes

### Minor Changes

- Fixed a typo with the `AlchemySettings.batchRequests` property.

## 2.2.2 (DEPRECATED)

### Major Changes

### Minor Changes

- Added support for ENS resolution to the `NotifyNamespace` and `WebsocketNamespace` methods.
- Added the `batchRequests` setting in `AlchemySettings`. Enabling this setting will automatically batch and send json-rpc requests to reduce network overhead.
- Included new export for the `Interface` class from ethers to simplify encoding ABI when using `eth_call`.
- Added support for the `NftNamespace.getNftMetadataBatch()` method to fetch metadata for multiple NFTs in a single call.
- Added support for the `NftNamespace.getNftSales()` method to fetch NFT sales across different marketplaces. Thanks @xeno097!

## 2.2.1

### Major Changes

### Minor Changes

- Fixed a bug where `AlchemyConfig.getWebsocketProvider()` was not exported as a public method. This method allows you get the underlying `WebsocketProvider` that is implemented by ethers.
- Added the `NftNamespace.summarizeNftAttributes()` method to get the summary of attribute prevalence for all NFTs in a contract.
- Added the `NftNamespace.searchContractMetadata()` method to search for a keyword across ERC721 and ERC1155 contract metadata.
- Added support for ENS resolution on several `CoreNamespace` methods. You should now be able to pass in an ENS domain into any param that requires an owner address.
- Added the `CoreNamespace.resolveName()` and `CoreNamespace.lookupAddress()` methods to resolve and lookup ENS domains and their owner addresses.
- Fixed a bug where the `Accept-Encoding` header was incorrectly included in requests that originated from the browser (#174).
- Added the `openSea` response to `NftNamespace.getContractMetadata()`to match the REST endpoint (#162).

## 2.2.0

### Major Changes

- Added the `NotifyNamespace` to the top-level `Alchemy` object. The `NotifyNamespace` is used to perform CRUD operations on webhooks in the Notify API.
- Added the `alchemy_minedTransactions` subscription event to the `WebsocketNamespace`. This subscription emits full transaction objects or hashes that are mined on the network based on provided filters.
- Added the `NftNamespace.computeRarity()` method to get the rarity attributes of the provided NFT. Thanks @xeno097!

### Minor Changes

## 2.1.1

### Minor Changes

- Added the `AIDROPS` enum to `NftNamespace.getNftsForOwner()`.
- Added the `spamInfo` field to the response for `getNftsForOwner()` and `getNftsForContract()`.
- Fixed a bug where type declarations were not available when using `NodeNext` module resolution. Thanks @quentinverlhac!
- Marked Ropsten, Rinkeby, and Kovan `Network` enums as deprecated. Please switch over to Sepolia.

## 2.1.0

### Major Changes

- POTENTIALLY BREAKING: Fixed a typing bug where the `totalSupply` field in an `NftContract` should have type `string` instead of `number`.
- Updated the `Nft` class to include the contract metadata in the `Nft.contract` field.
- Added commonly used utility methods from ethers.js into a top-level `Utils` export.
- Added the `NftNamespace.verifyNftOwnership()` method to replace the deprecated `checkNftOwnership()` method.
- Added `Contract` and `ContractFactory` exports from ethers into the top-level exports.

### Minor Changes

- Added support for `withTokenBalances` in `NftNamespace.getOwnersForContract()`.
- Added support for the `erc20` token type and pagination for `CoreNamespace.getTokenBalances()`.
- Added `bytes` field to the `Media` object in the NFT metadata responses to indicate the size of the media in bytes. Note that the `size` field is not supported by the backend and will be removed in the next version.

## 2.0.4

### Minor Changes

- Added a `size` field to the `Media` object in the NFT metadata responses to indicate the size of the media in bytes.
- Bumped `@ethersproject` dependencies to `v5.7.0` to support `safe` and `finalized` blocks.

## 2.0.3

### Minor Changes

- Added support for the `pageSize` parameter in `GetNftsForOwnerOptions` to specify the number of NFTs fetched when using `alchemy.nft.getNftsForOwner()`.
- Added support for a Wallet object. This object is identical to the Ethers `Wallet` class.
- Added support for Arbitrum Goerli network via the `Network.ARB_GOERLI` enum.
- Added support for the AStar Mainnet network via the `Network.ASTAR_MAINNET` enum.
- Added typed request/response overloads for `CoreNamespace.getAssetTransfers()` for when the `withMetadata` param is true.
- Added support the `tokenUriTimeoutInMs` parameter on `getNftsForOwner()`, `getNftMetadata()`, and `getNftsForContract()`.

## 2.0.2

### Major Changes

- Added the `transact` namespace for functionality relating to sending transactions. This includes the Flashbots methods `sendPrivateTransaction` and `cancelPrivateTransaction`.

### Minor Changes

- Removed the deprecated `TOKEN` enum from `AssetTransfersCategory`.
- Added support for Optimism Goerli network via the `Network.OPT_GOERLI` enum.
- Added the `pageSize` parameter in `GetNftsForContractOptions` to specify the number of NFTs fetched when using `alchemy.nft.getNftsForContract`.
- Added correct `withMetadata` typing to `AssetTransfersResponse`.

## 2.0.1

### Minor Changes

- Added an optional `url` setting to `AlchemySettings` to allow specifying a custom hardcoded URL to send all requests to.
- Fixed a bug where the SDK would incorrectly include a gzip header in browser environments

## 2.0.0

### Major Changes

- Top level package has moved from `@alch/alchemy-sdk` to `alchemy-sdk` for convenience. New command to install is `npm install alchemy-sdk`
- Updated instantiation syntax: `initializeAlchemy(settings)` is now `new Alchemy(settings)`
- Added three namespaces under the Alchemy object: `core`, `nft`, and `ws`. All Ethers.js provider methods and Alchemy Enhanced APIs (other than NFT) are under `core`.
- Moved top-level methods under the Alchemy object. Instead of `getNftsByOwner(alchemy, 'vitalik.eth')`, now methods are called using `alchemy.nft.getNftsByOwner('vitalik.eth')`
- Ethers.js Alchemy Provider methods are now directly embedded under `alchemy.core`
- Ethers.js WebSocket Provider methods are now directly embedded under `alchemy.ws`
- The settings object is now a config module under `alchemy.config`.
- If necessary, the full Ethers.js Provider is now available under `alchemy.config.getProvider()` as a promise to reduce bundle size.
- If necessary, the full WebSocket Provider is now available under `alchemy.config.getWebSocketProvider()` as a promise to reduce bundle size.
- Dynamic imports for large methods (in particular, Ethers.js methods) are now supported. Initial package size for the Alchemy SDK is 20kB, and will only download Ethers.js packages when a relevant method is called.
- Methods including Collection in the NFT package have been renamed to `Contract`: for instance, `getNftsForCollection` is now `getNftsForContract`.
