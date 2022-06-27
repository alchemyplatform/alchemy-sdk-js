# Alchemy SDK for Javascript

Alchemy SDK helps developers use Alchemy's APIs and endpoints more efficiently. This is a lightweight, modular SDK built
on top of Ethers.js that encapsulates common usage patterns and abstracts away the complexities of both our HTTP and
JSON-RPC endpoints.

Note that the SDK is still in public beta. Alchemy reserves the right to (and almost certainly will) make breaking
API changes in subsequent releases (don't write production code around it just yet).

## Getting started

```
npm install @alch/alchemy-sdk
```

After installing the app, you can then import and use the SDK:

```ts
import { Network, initializeAlchemy } from '@alch/alchemy-sdk';

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: 'demo', // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
  maxRetries: 10
};

const alchemy = initializeAlchemy(settings);
```

The SDK's modular approach exports all Alchemy functions at the top-level to reduce bundle size (only the functions you
import
and use will be included). This means you access each method using the following pattern:

```ts
// Initializing the alchemy config object
import { initializeAlchemy, getNftsForOwner } from '@alch/alchemy-sdk';

const alchemy = initializeAlchemy(); // using default settings - pass in a settings object to specify your API key and network

getNftsForOwner(alchemy, '0xshah.eth').then(console.log);
```

However, this can make it harder to discover the full API surface. If you want your IDE to find all functions, you can
alternatively import
the entire SDK (though this is not recommended, as it will increase the bundle size):

```ts
import * as alchemySdk from '@alch/alchemy-sdk';

const alchemy = alchemySdk.initializeAlchemy();
alchemySdk.getNftsForOwner(alchemy, '0xshah.eth').then(console.log);
```

### Preventing Breaking Changes

The SDK is currently in public beta, and will have breaking changes made. To protect your project from breaking changes,
make sure to pin the version of the SDK you are using in your `package.json` file. Please check the release notes to see
if any breaking changes have been made. While the SDK in the public beta, minor versions may contain breaking changes,
but patch versions should be safe to use.

To pin to a specific version in your `package.json` file:

```
{
  "dependencies": {
    "@alch/alchemy-sdk": "1.1.0"
  }
}
```

## SDK Structure

The `Alchemy` object returned by `initializeAlchemy()` provides access to the Alchemy API. An optional config
object can be passed in when initializing to set your API key, change the network, or specify the max number of retries.

There are two different patterns for the Alchemy object to be used:

1. It can be passed into top-level functions like `getNftsForOwner()` or `getAssetTransfers()`. The current supported
   functions using this pattern are the Alchemy NFT API endpoints and Alchemy Enhanced APIs.

2. It can be used to generate an Ethers.js provider that allows access to Alchemy Provider-specific
   [Ethers.js methods](https://docs.ethers.io/v5/single-page/). These encompass most standard JSON-RPC requests to
   the blockchain.

## Ethers.js for standard JSON-RPC Calls

To access standard JSON-RPC calls not in the NFT API or Alchemy Enhanced APIs, the SDK includes Ethers.js.
The `Alchemy.getProvider()` function configures the
Ethers.js [AlchemyProvider](https://docs.ethers.io/v5/api/providers/api-providers/#AlchemyProvider) and returns it. This
allows you to perform core JSON-RPC calls with an Alchemy provider, just as you normally would with Ethers. If you are
already using Ethers, you can simply use the provider from `alchemy-sdk` and the rest of your code should just work:

```ts
import { initializeAlchemy } from '@alch/alchemy-sdk';

const alchemy = initializeAlchemy();

// ETH JSON-RPC calls through ethers.js Provider
const ethersAlchemyProvider = alchemy.getProvider();
ethersAlchemyProvider
  .getBalance('0x994b342dd87fc825f66e51ffa3ef71ad818b6893', 'latest')
  .then(console.log);
```

Consult the [Ethers.js documentation](https://docs.ethers.io/v5/) for how to use it to call standard JSON-RPC methods.

## Websockets and Subscription Listeners

In addition to the built-in Ethers.js listeners, the Alchemy SDK includes support for Alchemy's Subscription API. This
allows you to subscribe to events and receive updates
as they occur. The two supported subscriptions are
[alchemy_newFullPendingTransactions](https://alchemy.com/alchemy/enhanced-apis/subscription-api-websockets#alchemy_newfullpendingtransactions)
and
[alchemy_filteredNewFullPendingTransactions](https://alchemy.com/alchemy/enhanced-apis/subscription-api-websockets#alchemy_filterednewfullpendingtransactions)
.

The `Alchemy.getWebsocketProvider()` function configures the
Alchemy [AlchemyWebSocketProvider](https://docs.ethers.io/v5/api/providers/api-providers/#AlchemyWebSocketProvider) and
returns it. This can be used like the standard Ethers.js Websocket provider to add listeners for Alchemy events:

```ts
import { initializeAlchemy } from '@alch/alchemy-sdk';

const alchemy = initializeAlchemy();

const websocketProvider = alchemy.getWebsocketProvider();

// Listen to all new pending transactions.
websocketProvider.on(
  {
    method: 'alchemy_newFullPendingTransactions'
  },
  res => console.log(res)
);

// Listen to all transactions on the USDC contract.
websocketProvider.on(
  {
    method: 'alchemy_filteredNewFullPendingTransactions',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
  },
  res => console.log(res)
);
```

The SDK brings multiple improvements to ensure correct WebSocket behavior in cases of temporary network failure or
dropped connections. As with any network connection, you should not assume that a WebSocket will remain open forever
without interruption, but correctly handling dropped connections and reconnection by hand can be challenging to get
right. `alchemy-sdk` automatically handles these failures with no configuration necessary. The main benefits are:

- Resilient event delivery: Unlike standard Web3.js or Ethers.js, you will not permanently miss events which arrive
  while the backing WebSocket is temporarily down. Instead, you will receive these events as soon as the connection
  is reopened. Note that if the connection is down for more than 120 blocks (approximately 20 minutes), you may
  still miss some events that were not part of the most recent 120 blocks.
- Lowered rate of failure: Compared to standard Web3.js or Ethers.js, there are fewer failures when sending requests
  over the WebSocket while the connection is down. Alchemy Web3 will attempt to send the requests once the connection
  is reopened. Note that it is still possible, with a lower likelihood, for outgoing requests to be lost,
  so you should still have error handling as with any network request.

## NFT Module

The SDK currently supports the following [NFT API](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api) endpoints:

- `getNftMetadata()`: Get the NFT metadata for a contract address and tokenId.
- `getNftsForOwner()`: Get NFTs for an owner address.
- `getNftsForOwnerIterator()`: Get NFTs for an owner address as an async iterator (handles paging automatically).
- `getNftsForNftContract()`: Get all NFTs for a contract address.
- `getNftForNftContractIterator()`: Get all NFTs for a contract address as an async iterator (handles paging
  automatically).
- `getOwnersForNft()`: Get all the owners for a given NFT contract address and a particular token ID.
- `getOwnersForNftContract()`: Get all the owners for a given NFT contract address.
- `checkNftOwnership()`: Check that the provided owner address owns one or more of the provided NFT contract addresses.
- `findContractDeployer()`: Find the contract deployer and block number for a given NFT contract address.
- `refreshNftMetadata()`: Refresh the cached NFT metadata for a contract address and tokenId.

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
and `getNftsForNftContractIterator()` functions that automatically paginate through all NFTs and yields them via
an `AsyncIterable`.

Here's an example of how to paginate through all the NFTs in Vitalik's ENS address:

```ts
import { initializeAlchemy, getNftsForOwnerIterator } from '@alch/alchemy-sdk';
const alchemy = initializeAlchemy();

async function main() {
  const ownerAddress = 'vitalik.eth';
  for await (const nft of getNftsForOwnerIterator(alchemy, ownerAddress)) {
    console.log('ownedNft:', nft);
  }
}

main();
```

### SDK vs API Differences

The NFT API in the SDK standardizes response types to reduce developer friction, but note this results in some
differences compared to the Alchemy REST endpoints:

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

## Examples

Below are a few usage examples:

Getting the NFTs owned by an address.

```ts
import {
  getNftsForOwner,
  getNftsForOwnerIterator,
  NftExcludeFilters,
  initializeAlchemy
} from '@alch/alchemy-sdk';

const alchemy = initializeAlchemy();

// Get how many NFTs an address owns.
getNftsForOwner(alchemy, '0xshah.eth').then(nfts => {
  console.log(nfts.totalCount);
});

// Get all the image urls for all the NFTs an address owns.
async function main() {
  for await (const nft of getNftsForOwnerIterator(alchemy, '0xshah.eth')) {
    console.log(nft.media);
  }
}

main();

// Filter out spam NFTs.
getNftsForOwner(alchemy, '0xshah.eth', {
  excludeFilters: [NftExcludeFilters.SPAM]
}).then(console.log);
```

Getting all the owners of the BAYC NFT.

```ts
import {
  getOwnersForNft,
  getNftsForNftContractIterator,
  initializeAlchemy
} from '@alch/alchemy-sdk';

const alchemy = initializeAlchemy();

// Bored Ape Yacht Club contract address.
const baycAddress = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';

async function main() {
  for await (const nft of getNftsForNftContractIterator(alchemy, baycAddress, {
    // Omit the NFT metadata for smaller payloads.
    omitMetadata: true
  })) {
    await getOwnersForNft(alchemy, nft).then(response =>
      console.log('owners:', response.owners, 'tokenId:', nft.tokenId)
    );
  }
}

main();
```

Get all outbound transfers for a provided address.

```ts
import { getTokenBalances, initializeAlchemy } from '@alch/alchemy-sdk';
const alchemy = initializeAlchemy();

getTokenBalances(alchemy, '0x994b342dd87fc825f66e51ffa3ef71ad818b6893').then(
  console.log
);
```

## Questions and Feedback

If you have any questions, issues, or feedback, please file an issue
on [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js/issues), or drop us a message on
our [Discord](https://discord.com/channels/735965332958871634/983472322998575174) channel for the SDK.
