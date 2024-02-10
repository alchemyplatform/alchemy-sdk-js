import { Network as NetworkFromEthers } from '@ethersproject/networks';
import { Network } from '../types/types';
export declare const DEFAULT_ALCHEMY_API_KEY = "demo";
export declare const DEFAULT_NETWORK = Network.ETH_MAINNET;
export declare const DEFAULT_MAX_RETRIES = 5;
export declare const DEFAULT_REQUEST_TIMEOUT = 0;
export declare function getAlchemyNftHttpUrl(network: Network, apiKey: string): string;
export declare function getAlchemyWsUrl(network: Network, apiKey: string): string;
export declare function getAlchemyWebhookHttpUrl(): string;
export declare enum AlchemyApiType {
    BASE = 0,
    NFT = 1,
    WEBHOOK = 2
}
/**
 * Mapping of network names to their corresponding Network strings used to
 * create an Ethers.js Provider instance.
 */
export declare const EthersNetwork: {
    "eth-mainnet": string;
    "eth-goerli": string;
    "eth-sepolia": string;
    "opt-mainnet": string;
    "opt-goerli": string;
    "opt-sepolia": string;
    "arb-mainnet": string;
    "arb-goerli": string;
    "arb-sepolia": string;
    "polygon-mainnet": string;
    "polygon-mumbai": string;
    "astar-mainnet": string;
    "polygonzkevm-mainnet": string;
    "polygonzkevm-testnet": string;
    "base-mainnet": string;
    "base-goerli": string;
    "base-sepolia": string;
};
/**
 * Mapping of network names to their corresponding Ethers Network objects. These
 * networks are not yet supported by Ethers and are listed here to be overriden
 * in the provider.
 */
export declare const CustomNetworks: {
    [key: string]: NetworkFromEthers;
};
export declare function noop(): void;
export declare const ETH_NULL_VALUE = "0x";
export declare const ETH_NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
