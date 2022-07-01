import { Network } from '../types/types';

export const DEFAULT_CONTRACT_ADDRESSES = 'DEFAULT_TOKENS';
export const DEFAULT_ALCHEMY_API_KEY = 'demo';
export const DEFAULT_NETWORK = Network.ETH_MAINNET;
export const DEFAULT_MAX_RETRIES = 5;

/**
 * Returns the base URL for making Alchemy API requests. The `alchemy.com`
 * endpoints only work with non eth json-rpc requests.
 *
 * @internal
 */
export function getAlchemyHttpUrl(network: Network, apiKey: string): string {
  return `https://${network}.g.alchemy.com/v2/${apiKey}`;
}

export function getAlchemyNftHttpUrl(network: Network, apiKey: string): string {
  return `https://${network}.g.alchemy.com/nft/v2/${apiKey}`;
}

export function getAlchemyWsUrl(network: Network, apiKey: string): string {
  return `wss://${network}.g.alchemy.com/v2/${apiKey}`;
}

export enum AlchemyApiType {
  BASE,
  NFT
}

/**
 * Mapping of network names to their corresponding Network strings used to
 * create an Ethers.js Provider instance.
 */
export const EthersNetwork = {
  [Network.ETH_MAINNET]: 'mainnet',
  [Network.ETH_ROPSTEN]: 'ropsten',
  [Network.ETH_GOERLI]: 'goerli',
  [Network.ETH_KOVAN]: 'kovan',
  [Network.ETH_RINKEBY]: 'rinkeby',
  [Network.OPT_MAINNET]: 'optimism',
  [Network.OPT_KOVAN]: 'optimism-kovan',
  [Network.ARB_MAINNET]: 'arbitrum',
  [Network.ARB_RINKEBY]: 'arbitrum-rinkeby',
  [Network.MATIC_MAINNET]: 'matic',
  [Network.MATIC_MUMBAI]: 'maticmum'
};

export function noop(): void {
  // It's a no-op
}
