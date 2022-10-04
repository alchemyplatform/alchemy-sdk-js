# Changelog for Alchemy SDK for JavaScript

## Unreleased

### Major Changes

- Added `TransactNamespace.sendGasOptimizedTransaction()`. Instead of sending a single transaction that might not get mined, this method allows you to send the same transaction multiple times, with different gas prices and gas limits. This should result in lower fees paid.

### Minor Changes

- Added the `AIDROPS` enum to `NftNamespace.getNftsForOwner()`.
- Added the `spamInfo` field to the response for `getNftsForOwner()` and `getNftsForContract()`.

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
