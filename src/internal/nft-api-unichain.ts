import { AlchemyConfig } from '../api/alchemy-config';
import {
  GetBaseNftsForOwnerUnichainOptions,
  GetNftsForOwnerUnichainOptions,
  Network,
  OwnedBaseNftsResponse,
  OwnedBaseNftsResponseUnichain,
  OwnedNftsResponse,
  OwnedNftsResponseUnichain
} from '../types/types';
import { getNftsForOwner } from './nft-api';
import { NetworkPageKey, UnichainPageKeyCache } from './page-key';

function networksAreEqual(a: Network[], b: Network[]): boolean {
  return JSON.stringify(a.sort()) === JSON.stringify(b.sort());
}

function validateParams(
  networks: Network[],
  options:
    | GetNftsForOwnerUnichainOptions
    | GetBaseNftsForOwnerUnichainOptions = {}
): {
  unichainPageKeyCache: UnichainPageKeyCache;
  networkPageKeys: Map<Network, NetworkPageKey>;
} {
  // We could default to all networks, but as we add or remove support for
  // various networks that list can change. We force developers to explicitly
  // list their desired networks so that their code is future-proof.
  if (!networks || networks.length === 0) {
    throw new Error(
      'Must provide a `networks` parameter for unichain requests.'
    );
  }

  const { unichainPageKeyCache, pageKey = null } = options;

  // This should be provided by default in the namespace, so realistically
  // should never happen. In non-unichain methods we do not use a page key
  // cache because page keys are handled by the API. However we have no API
  // for unichain, and so the SDK needs to handle page keys.
  if (!unichainPageKeyCache) {
    throw new Error('No page key cache was provided.');
  }

  const networkPageKeys = unichainPageKeyCache.getNetworkPageKeys(pageKey);

  // If the user made an initial request for a set of networks, we do not
  // allow them to change networks on the next page. We could technically
  // allow this, but it would require significantly more magic.
  const originalNetworks = Array.from(networkPageKeys.keys());
  if (pageKey && !networksAreEqual(originalNetworks, networks)) {
    throw new Error('Networks must not change between pages.');
  }

  return {
    unichainPageKeyCache,
    networkPageKeys
  };
}

function buildResponseWithPageKey(
  networks: Network[],
  networkResults: (OwnedNftsResponse | OwnedBaseNftsResponse)[],
  unichainPageKeyCache: UnichainPageKeyCache
) {
  const response: OwnedNftsResponseUnichain = {
    nftsByNetwork: new Map()
  };
  const networkPageKeys = new Map();

  for (let i = 0; i < networks.length; i++) {
    const network = networks[i];
    const resultsForNetwork = networkResults[i];

    response.nftsByNetwork.set(network, resultsForNetwork);
    networkPageKeys.set(network, new NetworkPageKey(resultsForNetwork.pageKey));
  }

  const unichainPageKey = UnichainPageKeyCache.generateKey(networkPageKeys);
  if (unichainPageKey) {
    unichainPageKeyCache.set(unichainPageKey, networkPageKeys);
    return {
      ...response,
      pageKey: unichainPageKey
    };
  }

  return response;
}

export async function getNftsForOwnerUnichain(
  config: AlchemyConfig,
  owner: string,
  networks: Network[],
  options:
    | GetNftsForOwnerUnichainOptions
    | GetBaseNftsForOwnerUnichainOptions = {}
): Promise<OwnedNftsResponseUnichain | OwnedBaseNftsResponseUnichain> {
  const {
    getNftsForOwnerFn = getNftsForOwner,
    pageKey: _pageKey,
    unichainPageKeyCache: _unichainPageKeyCache,
    ...baseOptions
  } = options;

  const { unichainPageKeyCache, networkPageKeys } = validateParams(
    networks,
    options
  );

  const networkResults = await Promise.all(
    networks.map(network => {
      // Copies the default configuration and replaces the network.
      const networkConfig = config._clone({
        network
      });

      const networkPageKey = networkPageKeys.get(network);
      // In non-unichain requests the developer will interpret a _missing_
      // page key to mean that there are no more pages. For a unichain
      // request, however, some networks might have no page key while the
      // others do. In this case the unichain request still needs to send
      // back a page key. This page key will point to network-specific keys
      // that may or may not be empty. So when we run the network-specific
      // request we first have to check if there _is_ a next page.
      if (networkPageKey && !networkPageKey.hasNextPage()) {
        return {
          // If we have already returned all the NFTs for a network, then
          // the next page will return an empty set.
          ownedNfts: [],
          // Todo: Normally a request for page > 1 would still return the
          // same totalCount as the first page. Since we are returning an
          // empty set without calling the API we don't know the real total
          // count. With some more clever caching we could get it from a
          // previous page.
          totalCount: 0
        };
      }

      const pageKeyOption = networkPageKey && networkPageKey.value();

      return getNftsForOwnerFn(networkConfig, owner, {
        ...baseOptions,
        pageKey: pageKeyOption
      });
    })
  );

  return buildResponseWithPageKey(
    networks,
    networkResults,
    unichainPageKeyCache
  );
}
