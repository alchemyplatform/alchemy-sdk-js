# Alchemy SDK for Javascript

Alchemy SDK helps developers use Alchemy's APIs and endpoints more efficiently. This is a lightweight, modular SDK
that encapsulates common usage patterns and abstracts away the complexities of both our HTTP and JSON-RPC endpoints.

Note that the SDK is still in private beta and is not published in NPM. Alchemy reserves the right to (and almost certainly will) make breaking
API changes in subsequent releases (don't write production code around it just yet).

## Getting started

Download the `alchemy-sdk-1.0.0.tgz` file in this repo into your project's root directory and run:

```
npm install alchemy-sdk-1.0.0.tgz
```

After installing the app, you can then import and use the SDK:

```ts
import { AlchemyConfig, Network, initializeAlchemy } from 'alchemy-sdk';

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: 'your-api-key',
  network: Network.ETH_RINKEBY,
  maxRetries: 10
};

const alchemy = initializeAlchemy(settings);
```

The SDK's modular approach exports all functions at the top-level to reduce bundle size (only the functions you import and use will be included). This means you access each method using the following pattern:

```ts
// Initializing the alchemy config object
import { initializeAlchemy } from 'alchemy-sdk';

const alchemy = initializeAlchemy(); // using default settings - pass in a settings object to specify your API key and network

// Import and call a method, passing in the alchemy config object
import { getNftsForOwner } from 'alchemy-sdk';

getNftsForOwner(alchemy, '0xshah.eth').then(console.log);
```

However, this can make it harder to discover the full API surface. If you want your IDE to find all functions, you can alternatively import
the entire SDK (though this is not recommended, as it will increase the bundle size):

```ts
import * as alchemySdk from 'alchemy-sdk';

const alchemy = alchemySdk.initializeAlchemy();
alchemySdk.getNftsForOwner(alchemy, '0xshah.eth').then(console.log);
```

## SDK Structure

The `Alchemy` object returned by `initializeAlchemy()` is an object that holds configuration settings. An optional
config object can be passed in when initializing to set your API key, change the network, or specify the max number
of retries. The `Alchemy` object is then passed into other top-level functions like `getNftsForOwner()` or `getAssetTransfers()`.
The current supported functions using this pattern are the NFT API endpoints and Alchemy Enhanced APIs.

## Ethers.js for standard JSON-RPC Calls

To access standard JSON-RPC calls not in the NFT API or Alchemy Enhanced APIs, the SDK includes Ethers.js. The `Alchemy.getProvider()` function configures the Ethers.js [AlchemyProvider](https://docs.ethers.io/v5/api/providers/api-providers/#AlchemyProvider) and returns it. This
allows you to perform core json-rpc calls with an Alchemy provider, just as you normally would with Ethers. If you are already using Ethers, you can simply use the provider from `alchemy-sdk` and the rest of your code should just work:

```ts
import { initializeAlchemy } from 'alchemy-sdk';
const alchemy = initializeAlchemy();

// ETH JSON-RPC calls through ethers.js Provider
const ethersAlchemyProvider = alchemy.getProvider();
ethersAlchemyProvider
  .getBalance('0x994b342dd87fc825f66e51ffa3ef71ad818b6893', 'latest')
  .then(console.log);
```

Consult the [Ethers.js documentation](https://docs.ethers.io/v5/) for how to use it to call standard JSON-RPC methods.

## NFT Module

The SDK currently supports the following [NFT API](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api) endpoints:

- `getNftMetadata()`: Gets the NFT metadata for a contract address and tokenId.
- `getNftsForOwner()`: Get NFTs for an owner address.
- `getNftsForOwnerIterator()`: Get NFTs for an owner address as an async iterator (handles paging automatically).
- `getNftsForCollection()`: Gets all NFTs for a contract address.
- `getNftForCollectionIterator()`: Gets all NFTs for a contract address as an async iterator (handles paging automatically).
- `getOwnersForNft()`: Get all the owners for a given NFT contract address and token ID.
- `checkNftOwnership()`: Checks that the provided owner address owns one or more of the provided NFT contract addresses.
- `findContractDeployer()`: Finds the contract deployer and block number for a given NFT contract address.
- `refreshNftMetadata()`: Refreshes the cached NFT metadata for a contract address and tokenId.

### Comparing `BaseNft` and `Nft`

The SDK currently uses the `BaseNft` and `Nft` classes to represent NFTs returned by the Alchemy. The `BaseNft` object does
not hold any metadata information and only contains the NFT contract and token ID. The `Nft` object additionally
contains the NFT metadata, token URI information, and media.

By default, the SDK will return the `Nft` object. You can optionally choose to fetch the `BaseNft` object instead by
setting the `omitMetadata` parameter to `true`. The SDK documentation describes the different parameter and response
interfaces in more detail.

### Pagination

The Alchemy NFT endpoints return 100 results per page. To get the next page, you can pass in the `pageKey` returned by the
previous call. To simplify paginating through all results, the SDK provides the `getNftsIterator()`
and `getNftsForCollectionIterator()` functions that automatically paginate through all NFTs and yields them via
an `AsyncIterable`.

Here's an example of how to paginate through all the NFTs in Vitalik's ENS address:

```ts
import { getNftsForOwnerIterator } from 'alchemy-sdk';

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

- Websocket support
- Retry count support for json-rpc calls (currently only HTTP calls are retried)
- More config options for the base ethers.js AlchemyProvider.
- Most of these changes require extending the base ethers.js SDK with custom implementations.
- Separating SDK into separate packages.

## Examples

Below are a few usage examples:

Getting the NFTs owned by an address.

```ts
// Get how many NFTs an address owns.
import { getNftsForOwner, getNftsForOwnerIterator } from 'alchemy-sdk';
import { NftExcludeFilters } from 'alchemy-sdk';

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
import { getOwnersForNft, getNftsForCollectionIterator } from 'alchemy-sdk';

// Bored Ape Yacht Club contract address.
const baycAddress = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';

async function main() {
  for await (const nft of getNftsForCollectionIterator(alchemy, baycAddress, {
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
import { getTokenBalances } from 'alchemy-sdk';

getTokenBalances(alchemy, '0x994b342dd87fc825f66e51ffa3ef71ad818b6893').then(
  console.log
);
```
