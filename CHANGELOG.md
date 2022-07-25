# Changelog for Alchemy SDK for JavaScript
<!--LATEST=2.0.0-->
<!--ENTRYINSERT-->

## 2.0.0
* feature: Top level package has moved from `@alch/alchemy-sdk` to `alchemy-sdk` for convenience. New command to install is `npm install alchemy-sdk`
* feature: Updated instantiation syntax: `initializeAlchemy(settings)` is now `new Alchemy(settings)`
* feature: Added three namespaces under the Alchemy object: `core`, `nft`, and `ws`. All Ethers.js provider methods and Alchemy Enhanced APIs (other than NFT) are under `core`.
* feature: Moved top-level methods under the Alchemy object. Instead of `getNftsByOwner(alchemy, 'vitalik.eth')`, now methods are called using `alchemy.nft.getNftsByOwner('vitalik.eth')`
* feature: Ethers.js Alchemy Provider methods are now directly embedded under `alchemy.core`
* feature: Ethers.js WebSocket Provider methods are now directly embedded under `alchemy.ws`
* feature: The settings object is now a config module under `alchemy.config`.
* feature: If necessary, the full Ethers.js Provider is now available under `alchemy.config.getProvider()` as a promise to reduce bundle size.
* feature: If necessary, the full WebSocket Provider is now available under `alchemy.config.getWebSocketProvider()` as a promise to reduce bundle size.
* feature: Dynamic imports for large methods (in particular, Ethers.js methods) are now supported. Initial package size for the Alchemy SDK is 20kB, and will only download Ethers.js packages when a relevant method is called.
* feature: Methods including Collection in the NFT package have been renamed to `Contract`: for instance, `getNftsForCollection` is now `getNftsForContract`.
