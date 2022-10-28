import { Network } from '../types/types';

const PAGE_KEY_EXPIRATION_MS = 1_000 * 60 * 10;
const NO_MORE_PAGES_STRING = 'FINISHED';

type NetworkPageKeys = Map<Network, NetworkPageKey>;

interface UnichainPageKeyValue {
  networkPageKeys: NetworkPageKeys;
  expiresAt: number;
}

export class NetworkPageKey {
  private pageKey: string;

  constructor(pageKey?: any) {
    this.pageKey = pageKey ? pageKey.toString() : NO_MORE_PAGES_STRING;
  }

  public value(): string {
    return this.pageKey;
  }

  public hasNextPage(): boolean {
    return this.value() !== NO_MORE_PAGES_STRING;
  }
}

export class UnichainPageKeyCache {
  private cache: Record<string, UnichainPageKeyValue>;

  constructor() {
    this.cache = {};
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
      expiresAt: Date.now() + PAGE_KEY_EXPIRATION_MS
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

    if (Date.now() > value.expiresAt) {
      throw new Error('Page key is expired.');
    }

    return value.networkPageKeys;
  }
}
