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
  network: Network.ETH_RINKEBY
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

The `Alchemy.getProvider()` function lazy loads the
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

## Stuff I need to support still

There's a long list, but here are the main ones:

- Websocket API / Subscription API
- Retry count support for json-rpc calls (currently only HTTP calls are retried)
- More config options for the base ethers.js AlchemyProvider.
- I will finish documentation at a later stage, but for now, you can find a list of the top-level functions in markdown
  in the `exploring-pioneer/docs/exploring-pioneer.md` file.
