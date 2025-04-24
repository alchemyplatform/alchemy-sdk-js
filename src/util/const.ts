import { Network as NetworkFromEthers } from '@ethersproject/networks';

import { Network } from '../types/types';

export const DEFAULT_ALCHEMY_API_KEY = 'demo';
export const DEFAULT_NETWORK = Network.ETH_MAINNET;
export const DEFAULT_MAX_RETRIES = 5;
export const DEFAULT_REQUEST_TIMEOUT = 0; // 0 = no timeout

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
  return `https://${network}.g.alchemy.com/nft/v3/${apiKey}`;
}

export function getAlchemyWsUrl(network: Network, apiKey: string): string {
  return `wss://${network}.g.alchemy.com/v2/${apiKey}`;
}

export function getAlchemyWebhookHttpUrl(): string {
  return 'https://dashboard.alchemy.com/api';
}

export function getPricesBaseUrl(apiKey: string): string {
  return `https://api.g.alchemy.com/prices/v1/${apiKey}`;
}

export enum AlchemyApiType {
  BASE,
  NFT,
  WEBHOOK,
  PRICES
}

/**
 * Mapping of network names to their corresponding Network strings used to
 * create an Ethers.js Provider instance.
 */
export const EthersNetwork = {
  [Network.ETH_MAINNET]: 'mainnet',
  [Network.ETH_GOERLI]: 'goerli',
  [Network.ETH_SEPOLIA]: 'sepolia',
  [Network.ETH_HOLESKY]: 'holesky',
  [Network.OPT_MAINNET]: 'optimism',
  [Network.OPT_GOERLI]: 'optimism-goerli',
  [Network.OPT_SEPOLIA]: 'optimism-sepolia',
  [Network.ARB_MAINNET]: 'arbitrum',
  [Network.ARB_GOERLI]: 'arbitrum-goerli',
  [Network.ARB_SEPOLIA]: 'arbitrum-sepolia',
  [Network.MATIC_MAINNET]: 'matic',
  [Network.MATIC_MUMBAI]: 'maticmum',
  [Network.MATIC_AMOY]: 'maticamoy',
  [Network.SOLANA_MAINNET]: null, // Solana networks are not supported by ethers.js
  [Network.SOLANA_DEVNET]: null, // Solana networks are not supported by ethers.js
  [Network.ASTAR_MAINNET]: 'astar-mainnet',
  [Network.POLYGONZKEVM_MAINNET]: 'polygonzkevm-mainnet',
  [Network.POLYGONZKEVM_TESTNET]: 'polygonzkevm-testnet',
  [Network.POLYGONZKEVM_CARDONA]: 'polygonzkevm-cardona',
  [Network.BASE_MAINNET]: 'base-mainnet',
  [Network.BASE_GOERLI]: 'base-goerli',
  [Network.BASE_SEPOLIA]: 'base-sepolia',
  [Network.ZKSYNC_MAINNET]: 'zksync-mainnet',
  [Network.ZKSYNC_SEPOLIA]: 'zksync-sepolia',
  [Network.SHAPE_MAINNET]: 'shape-mainnet',
  [Network.SHAPE_SEPOLIA]: 'shape-sepolia',
  [Network.LINEA_MAINNET]: 'linea-mainnet',
  [Network.LINEA_SEPOLIA]: 'linea-sepolia',
  [Network.FANTOM_MAINNET]: 'fantom-mainnet',
  [Network.FANTOM_TESTNET]: 'fantom-testnet',
  [Network.ZETACHAIN_MAINNET]: 'zetachain-mainnet',
  [Network.ZETACHAIN_TESTNET]: 'zetachain-testnet',
  [Network.ARBNOVA_MAINNET]: 'arbnova-mainnet',
  [Network.BLAST_MAINNET]: 'blast-mainnet',
  [Network.BLAST_SEPOLIA]: 'blast-sepolia',
  [Network.MANTLE_MAINNET]: 'mantle-mainnet',
  [Network.MANTLE_SEPOLIA]: 'mantle-sepolia',
  [Network.SCROLL_MAINNET]: 'scroll-mainnet',
  [Network.SCROLL_SEPOLIA]: 'scroll-sepolia',
  [Network.GNOSIS_MAINNET]: 'gnosis-mainnet',
  [Network.GNOSIS_CHIADO]: 'gnosis-chiado',
  [Network.BNB_MAINNET]: 'bnb-mainnet',
  [Network.BNB_TESTNET]: 'bnb-testnet',
  [Network.AVAX_MAINNET]: 'avax-mainnet',
  [Network.AVAX_FUJI]: 'avax-fuji',
  [Network.CELO_MAINNET]: 'celo-mainnet',
  [Network.CELO_ALFAJORES]: 'celo-alfajores',
  [Network.METIS_MAINNET]: 'metis-mainnet',
  [Network.OPBNB_MAINNET]: 'opbnb-mainnet',
  [Network.OPBNB_TESTNET]: 'opbnb-testnet',
  [Network.BERACHAIN_BARTIO]: 'berachain-bartio',
  [Network.BERACHAIN_MAINNET]: 'berachain-mainnet',
  [Network.SONEIUM_MAINNET]: 'soneium-mainnet',
  [Network.SONEIUM_MINATO]: 'soneium-minato',
  [Network.WORLDCHAIN_MAINNET]: 'worldchain-mainnet',
  [Network.WORLDCHAIN_SEPOLIA]: 'worldchain-sepolia',
  [Network.ROOTSTOCK_MAINNET]: 'rootstock-mainnet',
  [Network.ROOTSTOCK_TESTNET]: 'rootstock-testnet',
  [Network.FLOW_MAINNET]: 'flow-mainnet',
  [Network.FLOW_TESTNET]: 'flow-testnet',
  [Network.ZORA_MAINNET]: 'zora-mainnet',
  [Network.ZORA_SEPOLIA]: 'zora-sepolia',
  [Network.FRAX_MAINNET]: 'frax-mainnet',
  [Network.FRAX_SEPOLIA]: 'frax-sepolia',
  [Network.POLYNOMIAL_MAINNET]: 'polynomial-mainnet',
  [Network.POLYNOMIAL_SEPOLIA]: 'polynomial-sepolia',
  [Network.CROSSFI_MAINNET]: 'crossfi-mainnet',
  [Network.CROSSFI_TESTNET]: 'crossfi-testnet',
  [Network.APECHAIN_MAINNET]: 'apechain-mainnet',
  [Network.APECHAIN_CURTIS]: 'apechain-curtis',
  [Network.LENS_SEPOLIA]: 'lens-sepolia',
  [Network.GEIST_MAINNET]: 'geist-mainnet',
  [Network.GEIST_POLTER]: 'geist-polter',
  [Network.LUMIA_PRISM]: 'lumia-prism',
  [Network.LUMIA_TESTNET]: 'lumia-testnet',
  [Network.UNICHAIN_MAINNET]: 'unichain-mainnet',
  [Network.UNICHAIN_SEPOLIA]: 'unichain-sepolia',
  [Network.SONIC_MAINNET]: 'sonic-mainnet',
  [Network.SONIC_BLAZE]: 'sonic-blaze',
  [Network.XMTP_TESTNET]: 'xmtp-testnet',
  [Network.ABSTRACT_MAINNET]: 'abstract-mainnet',
  [Network.ABSTRACT_TESTNET]: 'abstract-testnet',
  [Network.DEGEN_MAINNET]: 'degen-mainnet',
  [Network.INK_MAINNET]: 'ink-mainnet',
  [Network.INK_SEPOLIA]: 'ink-sepolia',
  [Network.SEI_MAINNET]: 'sei-mainnet',
  [Network.SEI_TESTNET]: 'sei-testnet',
  [Network.RONIN_MAINNET]: 'ronin-mainnet',
  [Network.RONIN_SAIGON]: 'ronin-saigon',
  [Network.MONAD_TESTNET]: 'monad-testnet',
  [Network.SETTLUS_SEPTESTNET]: 'settlus-septestnet'
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
  'arbitrum-sepolia': {
    chainId: 421614,
    name: 'arbitrum-sepolia'
  },
  'astar-mainnet': {
    chainId: 592,
    name: 'astar-mainnet'
  },
  sepolia: {
    chainId: 11155111,
    name: 'sepolia'
  },
  holesky: {
    chainId: 17000,
    name: 'holesky'
  },
  'optimism-sepolia': {
    chainId: 11155420,
    name: 'optimism-sepolia'
  },
  'polygonzkevm-mainnet': {
    chainId: 1101,
    name: 'polygonzkevm-mainnet'
  },
  'polygonzkevm-testnet': {
    chainId: 1442,
    name: 'polygonzkevm-testnet'
  },
  'polygonzkevm-cardona': {
    chainId: 2442,
    name: 'polygonzkevm-cardona'
  },
  'base-mainnet': {
    chainId: 8453,
    name: 'base-mainnet'
  },
  'base-goerli': {
    chainId: 84531,
    name: 'base-goerli'
  },
  'base-sepolia': {
    chainId: 84532,
    name: 'base-sepolia'
  },
  maticamoy: {
    chainId: 80002,
    name: 'maticamoy'
  },
  'zksync-mainnet': {
    chainId: 324,
    name: 'zksync-mainnet'
  },
  'zksync-sepolia': {
    chainId: 300,
    name: 'zksync-sepolia'
  },
  'shape-mainnet': {
    chainId: 360,
    name: 'shape-mainnet'
  },
  'shape-sepolia': {
    chainId: 11011,
    name: 'shape-sepolia'
  },
  'linea-mainnet': {
    chainId: 59144,
    name: 'linea-mainnet'
  },
  'linea-sepolia': {
    chainId: 59141,
    name: 'linea-sepolia'
  },
  'fantom-mainnet': {
    chainId: 250,
    name: 'fantom-mainnet'
  },
  'fantom-testnet': {
    chainId: 4002,
    name: 'fantom-testnet'
  },
  'zetachain-mainnet': {
    chainId: 7000,
    name: 'zetachain-mainnet'
  },
  'zetachain-testnet': {
    chainId: 7001,
    name: 'zetachain-testnet'
  },
  'arbnova-mainnet': {
    chainId: 42170,
    name: 'arbnova-mainnet'
  },
  'blast-mainnet': {
    chainId: 81457,
    name: 'blast-mainnet'
  },
  'blast-sepolia': {
    chainId: 168587773,
    name: 'blast-sepolia'
  },
  'mantle-mainnet': {
    chainId: 5000,
    name: 'mantle-mainnet'
  },
  'mantle-sepolia': {
    chainId: 5003,
    name: 'mantle-sepolia'
  },
  'scroll-mainnet': {
    chainId: 534352,
    name: 'scroll-mainnet'
  },
  'scroll-sepolia': {
    chainId: 534351,
    name: 'scroll-sepolia'
  },
  'gnosis-mainnet': {
    chainId: 100,
    name: 'gnosis-mainnet'
  },
  'gnosis-chiado': {
    chainId: 10200,
    name: 'gnosis-chiado'
  },
  'bnb-mainnet': {
    chainId: 56,
    name: 'bnb-mainnet'
  },
  'bnb-testnet': {
    chainId: 97,
    name: 'bnb-testnet'
  },
  'avax-mainnet': {
    chainId: 43114,
    name: 'avax-mainnet'
  },
  'avax-fuji': {
    chainId: 43113,
    name: 'avax-fuji'
  },
  'celo-mainnet': {
    chainId: 42220,
    name: 'celo-mainnet'
  },
  'celo-alfajores': {
    chainId: 44787,
    name: 'celo-alfajores'
  },
  'metis-mainnet': {
    chainId: 1088,
    name: 'metis-mainnet'
  },
  'opbnb-mainnet': {
    chainId: 204,
    name: 'opbnb-mainnet'
  },
  'opbnb-testnet': {
    chainId: 5611,
    name: 'opbnb-testnet'
  },
  'berachain-bartio': {
    chainId: 80084,
    name: 'berachain-bartio'
  },
  'berachain-mainnet': {
    chainId: 80094,
    name: 'berachain-mainnet'
  },
  'soneium-mainnet': {
    chainId: 1868,
    name: 'soneium-mainnet'
  },
  'soneium-minato': {
    chainId: 0x79a,
    name: 'soneium-minato'
  },
  'worldchain-mainnet': {
    chainId: 0x1e0,
    name: 'worldchain-mainnet'
  },
  'worldchain-sepolia': {
    chainId: 0x12c1,
    name: 'worldchain-sepolia'
  },
  'rootstock-mainnet': {
    chainId: 0x1e,
    name: 'rootstock-mainnet'
  },
  'rootstock-testnet': {
    chainId: 0x1f,
    name: 'rootstock-testnet'
  },
  'flow-mainnet': {
    chainId: 747,
    name: 'flow-mainnet'
  },
  'flow-testnet': {
    chainId: 545,
    name: 'flow-testnet'
  },
  'zora-mainnet': {
    chainId: 7777777,
    name: 'zora-mainnet'
  },
  'zora-sepolia': {
    chainId: 999999999,
    name: 'zora-sepolia'
  },
  'frax-mainnet': {
    chainId: 252,
    name: 'frax-mainnet'
  },
  'frax-sepolia': {
    chainId: 2522,
    name: 'frax-sepolia'
  },
  'polynomial-mainnet': {
    chainId: 8008,
    name: 'polynomial-mainnet'
  },
  'polynomial-sepolia': {
    chainId: 8009,
    name: 'polynomial-sepolia'
  },
  'crossfi-mainnet': {
    chainId: 4158,
    name: 'crossfi-mainnet'
  },
  'crossfi-testnet': {
    chainId: 4157,
    name: 'crossfi-testnet'
  },
  'apechain-mainnet': {
    chainId: 33139,
    name: 'apechain-mainnet'
  },
  'apechain-curtis': {
    chainId: 33111,
    name: 'apechain-curtis'
  },
  'lens-sepolia': {
    chainId: 0x90f7,
    name: 'lens-sepolia'
  },
  'geist-mainnet': {
    chainId: 63157,
    name: 'geist-mainnet'
  },
  'geist-polter': {
    chainId: 631571,
    name: 'geist-polter'
  },
  'lumia-prism': {
    chainId: 0x3b4c8eb9,
    name: 'lumia-prism'
  },
  'lumia-testnet': {
    chainId: 0x7467cbf8,
    name: 'lumia-testnet'
  },
  'unichain-mainnet': {
    chainId: 130,
    name: 'unichain-mainnet'
  },
  'unichain-sepolia': {
    chainId: 0x515,
    name: 'unichain-sepolia'
  },
  'sonic-mainnet': {
    chainId: 0x92,
    name: 'sonic-mainnet'
  },
  'sonic-blaze': {
    chainId: 0xdede,
    name: 'sonic-blaze'
  },
  'xmtp-testnet': {
    chainId: 241320161,
    name: 'xmtp-testnet'
  },
  'abstract-mainnet': {
    chainId: 2741,
    name: 'abstract-mainnet'
  },
  'abstract-testnet': {
    chainId: 11124,
    name: 'abstract-testnet'
  },
  'degen-mainnet': {
    chainId: 0x27bc86aa,
    name: 'degen-mainnet'
  },
  'ink-mainnet': {
    chainId: 0xdef1,
    name: 'ink-mainnet'
  },
  'ink-sepolia': {
    chainId: 0xba5ed,
    name: 'ink-sepolia'
  },
  'sei-mainnet': {
    chainId: 1329,
    name: 'sei-mainnet'
  },
  'sei-testnet': {
    chainId: 1328,
    name: 'sei-testnet'
  },
  'ronin-mainnet': {
    chainId: 2020,
    name: 'ronin-mainnet'
  },
  'ronin-saigon': {
    chainId: 2021,
    name: 'ronin-saigon'
  },
  'monad-testnet': {
    chainId: 0x279f,
    name: 'monad-testnet'
  },
  'settlus-septestnet': {
    chainId: 0x14fd,
    name: 'settlus-septestnet'
  }
};

export function noop(): void {
  // It's a no-op
}

export const ETH_NULL_VALUE = '0x';

export const ETH_NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
