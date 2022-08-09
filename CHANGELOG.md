# Changelog for Alchemy SDK for JavaScript

## Unreleased

- Added correct `withMetadata` typing to `AssetTransfersResponse`.

### Minor Changes
- Added an optional `url` setting to `AlchemySettings` to allow specifying a custom hardcoded URL to send all requests to.


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
