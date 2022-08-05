# Alchemy SDK for Javascript

The Alchemy SDK is the most comprehensive, stable, and powerful Javascript SDK available today to interact with the blockchain. It supports the exact same syntax and functionality of the Ethers.js `AlchemyProvider` and `WebSocketProvider`, making it a 1:1 mapping for anyone using the Ethers.js `Provider` to access the blockchain.

However, it adds a significant amount of improved functionality on top of Ethers.js, such as easy access to Alchemy’s Enhanced and NFT APIs, robust WebSockets, and quality-of life improvements such as automated retries. 

Finally, it leverages Alchemy's hardened node infrastructure, guaranteeing best-in-class reliability, scalability, and data correctness, and is undergoing active development by Alchmy's engineers.

> :warning: **WARNING:** The `@alch/alchemy-sdk` package is now deprecated as of the v2.0.0 release. Please use the `alchemy-sdk` package instead. Note that upgrading from v1 to v2 will be a breaking change. To upgrade to v2.0.0 from v1.X.X, simply run the following in your project root:

```
npm uninstall @alch/alchemy-sdk
npm install alchemy-sdk@latest
```

> 🙋‍♀️ **FEATURE REQUESTS:** We'd love your thoughts on what would improve your web3 dev process the most! If you have 5 minutes, tell us what you want at our [Feature Request feedback form](https://alchemyapi.typeform.com/sdk-feedback), and we'd love to build it for you:

## Getting started

```
npm install alchemy-sdk
```

After installing the app, you can then import and use the SDK:

```ts
import { Network, Alchemy } from 'alchemy-sdk';

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: 'demo', // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET // Replace with your network.
};

const alchemy = new Alchemy(settings);
```

The `Alchemy` object returned by `new Alchemy()` provides access to the Alchemy API. An optional config object can be passed in when initializing to set your API key, change the network, or specify the max number of retries.

## Using the Alchemy SDK

The Alchemy SDK currently supports three different namespaces, including:

- `core`: All commonly-used Ethers.js Provider methods and Alchemy Enhanced API methods
- `nft`: All Alchemy NFT API methods
- `ws`: All WebSockets methods

If you are already using Ethers.js, you should be simply able to replace the Ethers.js Provider object with `alchemy.core` and it should just work.

```ts
import { Alchemy } from 'alchemy-sdk';

// Using default settings - pass in a settings object to specify your API key and network
const alchemy = new Alchemy();

// Access standard Ethers.js JSON-RPC node request
alchemy.core.getBlockNumber().then(console.log);

// Access Alchemy Enhanced API requests
alchemy.core
  .getTokenBalances('0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE')
  .then(console.log);

// Access the Alchemy NFT API
alchemy.nft.getNftsForOwner('vitalik.eth').then(console.log);

// Access WebSockets and Alchemy-specific WS methods
alchemy.ws.on(
  {
    method: 'alchemy_pendingTransactions'
  },
  res => console.log(res)
);
```

## Alchemy Core

The core package contains all commonly-used [Ethers.js Provider](https://docs.ethers.io/v5/api/providers/api-providers/#AlchemyProvider) methods. If you are already using Ethers.js, you should be simply able to replace the Ethers.js Provider object with `alchemy.core` and it should just work.

It also includes the majority of Alchemy Enhanced APIs, including:

- `getTokenMetadata()`: Get the metadata for a token contract address.
- `getTokenBalances()`: Gets the token balances for an owner given a list of contracts.
- `getAssetTransfers()`: Get transactions for specific addresses.
- `getTransactionReceipts()`: Gets all transaction receipts for a given block.

### Accessing the full Ethers.js Provider

To keep the package clean, we don't support certain uncommonly-used Ethers.js Provider methods as top-level methods in the Alchemy `core` namespace - for example, `provider.formatter`. If you'd like to access these methods, simply use the `alchemy.config.getProvider()` function to configure the
Ethers.js Provider [AlchemyProvider](https://docs.ethers.io/v5/api/providers/api-providers/#AlchemyProvider) and return it.

```ts
import { Alchemy } from 'alchemy-sdk';
const alchemy = new Alchemy();

async function runAlchemy() {
  const ethersProvider = await alchemy.config.getProvider();
  console.log(ethersProvider.formatter);
}
runAlchemy();
```

## Alchemy WebSockets

In addition to the built-in Ethers.js listeners, the Alchemy SDK includes support for [Alchemy's Subscription API](https://docs.alchemy.com/alchemy/enhanced-apis/subscription-api-websockets). This allows you to subscribe to events and receive updates as they occur.

The `alchemy.ws` instance can be used can be used like the standard Ethers.js [WebSocketProvider](https://docs.ethers.io/v5/api/providers/other/#WebSocketProvider) to add listeners for Alchemy events:

```ts
import { Alchemy } from 'alchemy-sdk';

const alchemy = new Alchemy();

// Listen to all new pending transactions.
alchemy.ws.on("block", res => console.log(res));

// Listen to only the next transaction on the USDC contract.
alchemy.ws.once(
  {
    method: 'alchemy_pendingTransactions',
    toAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
  },
  res => console.log(res)
);

// Remove all listeners.
alchemy.ws.removeAllListeners();
```

The SDK brings multiple improvements to ensure correct WebSocket behavior in cases of temporary network failure or
dropped connections. As with any network connection, you should not assume that a WebSocket will remain open forever
without interruption, but correctly handling dropped connections and reconnection by hand can be challenging to get
right. The Alchemy SDK automatically handles these failures with no configuration necessary. The main benefits are:

- Resilient event delivery: Unlike standard Web3.js or Ethers.js, you will not permanently miss events which arrive
  while the backing WebSocket is temporarily down. Instead, you will receive these events as soon as the connection
  is reopened. Note that if the connection is down for more than 120 blocks (approximately 20 minutes), you may
  still miss some events that were not part of the most recent 120 blocks.
- Lowered rate of failure: Compared to standard Web3.js or Ethers.js, there are fewer failures when sending requests
  over the WebSocket while the connection is down. The Alchemy SDK will attempt to send the requests once the connection
  is reopened. Note that it is still possible, with a lower likelihood, for outgoing requests to be lost,
  so you should still have error handling as with any network request.

## Alchemy NFT API

The SDK currently supports the following [NFT API](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api) endpoints
under the `alchemy.nft` namespace:

- `getNftMetadata()`: Get the NFT metadata for a contract address and tokenId.
- `getContractMetadata()`: Get the metadata associated with an NFT contract
- `getNftsForOwner()`: Get NFTs for an owner address.
- `getNftsForOwnerIterator()`: Get NFTs for an owner address as an async iterator (handles paging automatically).
- `getNftsForContract()`: Get all NFTs for a contract address.
- `getNftForContractIterator()`: Get all NFTs for a contract address as an async iterator (handles paging
  automatically).
- `getOwnersForNft()`: Get all the owners for a given NFT contract address and a particular token ID.
- `getOwnersForContract()`: Get all the owners for a given NFT contract address.
- `checkNftOwnership()`: Check that the provided owner address owns one or more of the provided NFT contract addresses.
- `isSpamContract()`: Check whether the given NFT contract address is a spam contract as defined by Alchemy (see the [NFT API FAQ](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/nft-api-faq#nft-spam-classification))
- `getSpamContracts()`: Returns a list of all spam contracts marked by Alchemy.
- `findContractDeployer()`: Find the contract deployer and block number for a given NFT contract address.
- `refreshNftMetadata()`: Refresh the cached NFT metadata for a contract address and a single tokenId.
- `refreshContract()`: Enqueues the specified contract address to have all token ids' metadata refreshed.
- `getFloorPrice()`: Return the floor prices of a NFT contract by marketplace.

### Comparing `BaseNft` and `Nft`

The SDK currently uses the `BaseNft` and `Nft` classes to represent NFTs returned by the Alchemy. The `BaseNft` object
does
not hold any metadata information and only contains the NFT contract and token ID. The `Nft` object additionally
contains the NFT metadata, token URI information, and media.

By default, the SDK will return the `Nft` object. You can optionally choose to fetch the `BaseNft` object instead by
setting the `omitMetadata` parameter to `true`. The SDK documentation describes the different parameter and response
interfaces in more detail.

### Pagination

The Alchemy NFT endpoints return 100 results per page. To get the next page, you can pass in the `pageKey` returned by
the
previous call. To simplify paginating through all results, the SDK provides the `getNftsIterator()`
and `getNftsForContractIterator()` functions that automatically paginate through all NFTs and yields them via
an `AsyncIterable`.

Here's an example of how to paginate through all the NFTs in Vitalik's ENS address:

```ts
import { Alchemy } from 'alchemy-sdk';

const alchemy = new Alchemy();

async function main() {
  const ownerAddress = 'vitalik.eth';
  for await (const nft of alchemy.nft.getNftsForOwnerIterator(ownerAddress)) {
    console.log('ownedNft:', nft);
  }
}

main();
```

### SDK vs API Differences

The NFT API in the SDK standardizes response types to reduce developer friction, but note this results in some
differences compared to the Alchemy REST endpoints:

- Methods referencing `Collection` have been renamed to use the name `Contract` for greater accuracy: e.g. `getNftsForContract`.
- Some methods have different naming that the REST API counterparts in order to provide a consistent API interface (
  e.g. `getNftsForOwner()` is `alchemy_getNfts`, `getOwnersForNft()` is `alchemy_getOwnersForToken`).
- SDK standardizes to `omitMetadata` parameter (vs. `withMetadata`).
- Standardization to `pageKey` parameter for pagination (vs. `nextToken`/`startToken`)
- Empty `TokenUri` fields are omitted.
- Token ID is always normalized to an integer string on `BaseNft` and `Nft`.
- Some fields omitted in the REST response are included in the SDK response in order to return an `Nft` object.
- Some fields in the SDK's `Nft` object are named differently than the REST response.

## Documentation

The SDK is documented via `tsdoc` comments in the source code. The generated types and documentation are included when
using an IDE. To browse the documentation separately, you can view the generated API interfaces
in `etc/alchemy-sdk.api.md`. You can view generated Markdown files for each endpoint in the `docs-md` directory,
or as a webpage by opening `docs/index.html` in your browser.

## Future Work

There's a long list, but here are the main ones:

- Retry count support for json-rpc calls (currently only for NFT API calls).
- More config options for the base ethers.js AlchemyProvider.

## Usage Examples

### Getting the NFTs owned by an address

```ts
import { NftExcludeFilters, Alchemy } from 'alchemy-sdk';

const alchemy = new Alchemy();

// Get how many NFTs an address owns.
alchemy.nft.getNftsForOwner('vitalik.eth').then(nfts => {
  console.log(nfts.totalCount);
});

// Get all the image urls for all the NFTs an address owns.
async function main() {
  for await (const nft of alchemy.nft.getNftsForOwnerIterator('vitalik.eth')) {
    console.log(nft.media);
  }
}

main();

// Filter out spam NFTs.
alchemy.nft
  .getNftsForOwner('vitalik.eth', {
    excludeFilters: [NftExcludeFilters.SPAM]
  })
  .then(console.log);
```

### Getting all the owners of the BAYC NFT

```ts
import { Alchemy } from 'alchemy-sdk';

const alchemy = new Alchemy();

// Bored Ape Yacht Club contract address.
const baycAddress = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';

async function main() {
  for await (const nft of alchemy.nft.getNftsForContractIterator(baycAddress, {
    // Omit the NFT metadata for smaller payloads.
    omitMetadata: true
  })) {
    await alchemy.nft
      .getOwnersForNft(nft.contract.address, nft.tokenId)
      .then(response =>
        console.log('owners:', response.owners, 'tokenId:', nft.tokenId)
      );
  }
}

main();
```

### Get all outbound transfers for a provided address

```ts
import { Alchemy } from 'alchemy-sdk';

const alchemy = new Alchemy();

alchemy.core
  .getTokenBalances('0x994b342dd87fc825f66e51ffa3ef71ad818b6893')
  .then(console.log);
```

## Questions and Feedback

If you have any questions, issues, or feedback, please file an issue
on [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js/issues), or drop us a message on
our [Discord](https://discord.com/channels/735965332958871634/983472322998575174) channel for the SDK.
