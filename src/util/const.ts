import { Network as NetworkFromEthers } from '@ethersproject/networks';

import { Network } from '../types/types';

export const DEFAULT_ALCHEMY_API_KEY = 'demo';
export const DEFAULT_NETWORK = Network.ETH_MAINNET;
export const DEFAULT_MAX_RETRIES = 5;

/** Maximum size of a batch on the rpc provider. */
export const DEFAULT_MAX_REQUEST_BATCH_SIZE = 100;

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

export function getAlchemyWebhookHttpUrl(): string {
  return 'https://dashboard.alchemy.com/api';
}

export enum AlchemyApiType {
  BASE,
  NFT,
  WEBHOOK
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
  [Network.OPT_GOERLI]: 'optimism-goerli',
  [Network.ARB_MAINNET]: 'arbitrum',
  [Network.ARB_RINKEBY]: 'arbitrum-rinkeby',
  [Network.ARB_GOERLI]: 'arbitrum-goerli',
  [Network.MATIC_MAINNET]: 'matic',
  [Network.MATIC_MUMBAI]: 'maticmum',
  [Network.ASTAR_MAINNET]: 'astar-mainnet'
};

/**
 * Mapping of network names to their corresponding Ethers Network objects. These
 * networks are not yet supported by Ethers and are listed here to be overriden
 * in the provider.
 */
export const CustomNetworks: { [key: string]: NetworkFromEthers } = {
  'arbitrum-goerli': {
    chainId: 421613,
    name: 'arbitrum-goerli'
  },
  'astar-mainnet': {
    chainId: 592,
    name: 'astar-mainnet'
  }
};

export function noop(): void {
  // It's a no-op
}

export const ETH_NULL_VALUE = '0x';
