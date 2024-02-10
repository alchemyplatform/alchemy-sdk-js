/// <reference types="jest" />
import { BaseNft, Nft, NftContract, NftSaleMarketplace, NftSaleTakerType, NftTokenType, OwnedBaseNft, OwnedNft } from '../src';
import { RawNft, RawNftContractForNft, RawNftContractForOwner, RawNftSale, RawOpenSeaCollectionMetadata, RawOwnedBaseNft, RawOwnedNft } from '../src/internal/raw-interfaces';
import { BlockHead, LogsEvent } from '../src/internal/websocket-backfiller';
export declare const TEST_WALLET_PRIVATE_KEY = "dd5bdf09397b1fdf98e4f72c66047d5104b1511fa7dc1b8fdddd61a150f732c9";
export declare const TEST_WALLET_PUBLIC_ADDRESS = "0x4b9007B0BcE78cfB634032ec31Ed56adB464287b";
export declare function createRawOpenSeaCollectionMetadata(): RawOpenSeaCollectionMetadata;
export declare function createRawOwnedBaseNft(address: string, tokenId: string, balance: string): RawOwnedBaseNft;
export declare function createOwnedBaseNft(address: string, tokenId: string, balance: string): OwnedBaseNft;
export declare function createBaseNft(contractAddress: string, tokenId: string): BaseNft;
export declare function createNft(title: string, address: string, tokenId: string, tokenType?: NftTokenType, tokenUri?: string): Nft;
export declare function createRawNftContract(address: string, overrides?: Partial<RawNftContractForNft>): RawNftContractForNft;
export declare function createRawNft(contractAddress: string, name: string, tokenId: string, tokenType?: NftTokenType, overrides?: Partial<RawNft>): RawNft;
export declare function createRawOwnedNft(title: string, address: string, tokenId: string, balance: string, tokenType?: NftTokenType, contract?: Partial<RawNftContractForNft>): RawOwnedNft;
export declare function createOwnedNft(title: string, address: string, tokenId: string, balance: string, tokenType?: NftTokenType): OwnedNft;
export declare function createRawNftSale(marketplaceAddress: string, contractAddress: string, tokenId: string, marketplace: NftSaleMarketplace, taker: NftSaleTakerType, buyerAddress: string, sellerAddress: string): RawNftSale;
export declare function createRawContractForOwner(address: string, overrides?: Partial<RawNftContractForOwner>): RawNftContractForOwner;
export declare function verifyNftContractMetadata(actualNftContract: NftContract, expectedNftContract: NftContract, address: string, name: string, symbol: string, totalSupply: string, tokenType?: NftTokenType, openSea?: RawOpenSeaCollectionMetadata): void;
export declare type Mocked<T> = T & {
    [K in keyof T]: T[K] extends Function ? T[K] & jest.Mock : T[K];
};
/** A Promise implementation for deferred resolution. */
export declare class Deferred<R> {
    promise: Promise<R>;
    constructor();
    resolve: (value: R | Promise<R>) => void;
    reject: (reason: Error) => void;
}
export declare function makeNewHeadsEvent(blockNumber: number, hash: string): BlockHead;
export declare function makeLogsEvent(blockNumber: number, blockHash: string, isRemoved?: boolean, logIndex?: number): LogsEvent;
export declare const TESTING_PRIVATE_KEY = "dd5bdf09397b1fdf98e4f72c66047d5104b1511fa7dc1b8fdddd61a150f732c9";
export declare const TESTING_PUBLIC_ADDRESS = "0x4b9007B0BcE78cfB634032ec31Ed56adB464287b";
export declare function loadAlchemyEnv(): Promise<void>;
