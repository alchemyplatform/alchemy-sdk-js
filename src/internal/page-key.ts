import { Network } from '../types/types';

type NetworkPageKeys = Map<Network, NetworkPageKey>;

interface UnichainPageKeyValue {
  networkPageKeys: NetworkPageKeys;
  expiresAt: number;
}

export class NetworkPageKey {
  // When a network has no next page we will save a page key with this
  // value. The hasNextPage() method will return false for any page key
  // matching this value.
  private NO_MORE_PAGES = 'NO_MORE_PAGES';

  private pageKey: string;

  constructor(pageKey?: any) {
    this.pageKey = pageKey ? pageKey.toString() : this.NO_MORE_PAGES;
  }

  public value(): string {
    return this.pageKey;
  }

  public hasNextPage(): boolean {
    return this.value() !== this.NO_MORE_PAGES;
  }
}

// As of today, the API expires page keys in 15 minutes. We set the
// unichain expiration to be less than that in order to ensure that
// we never deal with expired network keys.
const DEFAULT_UNICHAIN_PAGE_KEY_EXPIRATION_MS = 1_000 * 60 * 10;

export class UnichainPageKeyCache {
  private pageKeyExpirationMs: number;
  private cache: Record<string, UnichainPageKeyValue>;

  constructor(
    cache: Record<string, UnichainPageKeyValue> = {},
    pageKeyExpirationMs: number = DEFAULT_UNICHAIN_PAGE_KEY_EXPIRATION_MS
  ) {
    this.cache = cache;
    this.pageKeyExpirationMs = pageKeyExpirationMs;
  }

  public static generateKey(networkPageKeys: NetworkPageKeys): string | null {
    const anyHasNextPage = Array.from(networkPageKeys.values()).find(key =>
      key.hasNextPage()
    );
    if (!anyHasNextPage) {
      return null;
    }

    return `${Date.now()}${Math.round(Math.random() * 100000000)}`;
  }

  public set(unichainKey: string, networkPageKeys: NetworkPageKeys): void {
    this.cache[unichainKey] = {
      networkPageKeys,
      expiresAt: Date.now() + this.pageKeyExpirationMs
    };
  }

  public get(unichainKey: string): UnichainPageKeyValue | null {
    return this.cache[unichainKey] || null;
  }

  public getNetworkPageKeys(unichainKey: string | null): NetworkPageKeys {
    if (!unichainKey) {
      return new Map();
    }

    const value = this.get(unichainKey);
    if (!value) {
      return new Map();
    }

    // We provde a custom error for an expired unichain page key, because
    // if we allowed the request to hit the API then the developer would
    // get back a more cryptic error about page keys from the API.
    if (Date.now() > value.expiresAt) {
      throw new Error('Unichain page key is expired.');
    }

    return value.networkPageKeys;
  }
}
