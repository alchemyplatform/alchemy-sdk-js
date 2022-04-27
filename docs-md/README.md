exploring-pioneer / [Exports](modules.md)

# exploring-pioneer

This is a prototype for the Alchemy JS SDK.

The goal is to create a lightweight, modular SDK that encapsulates common usage patterns and abstracts away the
complexities of the HTTP endpoints. To start, we're trying to create feature parity with the existing `alchemy-web3`
library. From there, we'll add additional features and higher level abstractions.

## Getting started

The SDK is currently packaged in the repository as a tarball file. To install, copy the `exploring-pioneer-1.0.0.tgz`
file in this repo into your project's root directory and run:

```
npm install exploring-pioneer-1.0.0.tgz
```

After installing the app, you can then import and use the SDK:

```ts
import { AlchemyConfig, Network, initializeAlchemy } from 'exploring-pioneer';

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings: AlchemyConfig = {
  apiKey: 'your-api-key',
  network: Network.ETH_RINKEBY,
  maxRetries: 10
};

const alchemy = initializeAlchemy(settings);
```

The SDK's modular approach exports all functions at the top-level to reduce bundle size. However,
this can make it harder to discover the full API surface. If you want your IDE to find all functions, you can import
the entire SDK:

```ts
import * as alchemySdk from 'exploring-pioneer';

const alchemy = alchemySdk.initializeAlchemy();
alchemySdk.getNfts(alchemy, { owner: '0x123' });
```

## SDK Structure

The `Alchemy` object returned by `initializeAlchemy()` is an object that holds configuration settings. An optional
config object can be passed in when initializing to set a custom API key, change the network, or specify the max number
of retries. The object can be passed into other top-level functions like `getNfts()` or `getAssetTransfers()`. The
current supported functions are the NFT API endpoints and Alchemy Enhanced APIs.

The `Alchemy.getProvider()` function uses the
Ethers.js [AlchemyProvider](https://docs.ethers.io/v5/api/providers/api-providers/#AlchemyProvider) and returns it. This
allows you to perform the core json-rpc calls with the Alchemy as your provider.

Here's an example of how this could be used:

```ts
// NFT API
import { getNfts } from 'exploring-pioneer';

getNfts(alchemy, { owner: '0xABC' }).then(nfts => {
  console.log(nfts);
});

// Enhanced API
import { getAssetTransfers } from 'exploring-pioneer';

getAssetTransfers(alchemy, {
  fromAddress: '0xABC...',
  toAddress: '0xDEF...'
}).then(transfers => {
  console.log(transfers);
});

// ETH JSON-RPC calls through ethers.js Provider
const ethersAlchemyProvider = alchemy.getProvider();
ethersAlchemyProvider
  .send('eth_getBalance', ['0xABC...', 'latest'])
  .then(console.log);
```

## NFT Module

The SDK currently supports the following NFT endpoints:

- `getNfts()`: Get NFTs for an owner address.
- `getNftsPaginated()`: Get NFTs for an owner address, paginated.
- `getNftMetadata()`: Gets the NFT metadata for a contract address and tokenId.
- `getNftsForCollection()`: Gets all NFTs for a contract address.
- `getNftForCollectionPaginated()`: Gets all NFTs for a contract address, paginated.
- `getOwnersForToken()`: Get all the owners for a given NFT contract address and token ID.
- `checkOwnership()`: Checks that the provided owner address owns one or more of the provided NFT contract addresses.

### Comparing `BaseNft` and `Nft`

The SDK currently uses `BaseNft` and `Nft` classes to represent NFTs returned by the Alchemy. The `BaseNft` object does
not hold any metadata information and only contains the NFT contract and token ID. The `Nft` object additionally
contains the NFT metadata, token URI information, and media.

By default, the SDK will return the `Nft` object. You can optionally choose to fetch the `BaseNft` object instead by
setting the `omitMetadata` parameter to `true`. The documentation describes the different parameter and response
interfaces in more detail.

### Pagination

The Alchemy endpoints return 100 NFTs per page. To get the next page, you can pass in the `pageKey` returned by the
previous call. To simplify paginating through all NFTs, the SDK provides `getNftsPaginated()`
and `getNftsForCollectionPaginated()` functions that paginate through all NFTs and yields them via an `AsyncIterable`.

Here's an example of how to paginate through all NFTs:

```ts
const ownedNfts = [];
for await (const nft of getNftsPaginated(alchemy, {
  owner: '0xABC'
})) {
  ownedNfts.push(nft);
}
```

### API Differences

The NFT API in the SDK standardizes response types to reduce developer friction, but note this results in some
differences with the Alchemy REST endpoints:

- SDK standardizes to `omitMetadata` parameter (vs. `withMetadata`).
- Standardization to `pageKey` parameter for pagination (vs. `nextToken`/`startToken`)
- Empty `TokenUri` fields are omitted.
- Token ID is always normalized to a hex string on `BaseNft` and `Nft.
- Some fields omitted in the REST response are included in the SDK response in order to return an `Nft` object.
- Some fields in the SDK's `Nft` object are named differently than the REST response.

## Documentation

The SDK is documented via `tsdoc` comments in the source code. The generated types and documentation are included when
using an IDE. To browse the documentation separately, you can view the generated API interfaces
in `etc/exploring-pioneer.api.md`. There are also generated Markdown files for each endpoint in the `docs-md` directory,
or as a webpage by opening `docs/index.html` in your browser.

## Stuff I need to support still

There's a long list, but here are the main ones:

- Websocket support
- Retry count support for json-rpc calls (currently only HTTP calls are retried)
- More config options for the base ethers.js AlchemyProvider.
- Most of these changes require extending the base ethers.js SDK with custom implementations.
- Separating SDK into separate packages.
