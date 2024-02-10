import { RawContractBaseNft, RawGetNftSalesResponse, RawNft, RawNftCollection, RawNftContract, RawNftContractForNft, RawNftContractForOwner, RawOwnedBaseNft } from '../internal/raw-interfaces';
import { BaseNft, GetNftSalesResponse, Nft, NftCollection, NftContract, NftContractForNft, NftContractForOwner } from '../types/nft-types';
export declare function formatBlock(block: string | number): string;
export declare function getNftContractForNftFromRaw(rawNftContract: RawNftContractForNft): NftContractForNft;
export declare function getNftContractsForOwnerFromRaw(rawNftContract: RawNftContractForOwner): NftContractForOwner;
export declare function getNftContractFromRaw(rawNftContract: RawNftContract): NftContract;
export declare function getNftCollectionFromRaw(rawNftCollection: RawNftCollection): NftCollection;
export declare function getBaseNftFromRaw(rawBaseNft: RawOwnedBaseNft): BaseNft;
export declare function getBaseNftFromRaw(rawContractBaseNft: RawContractBaseNft, contractAddress: string): BaseNft;
export declare function getNftFromRaw(rawNft: RawNft): Nft;
export declare function getNftSalesFromRaw(rawNftSales: RawGetNftSalesResponse): GetNftSalesResponse;
export declare const IS_BROWSER: boolean;
declare type WithNullableFields<T> = T extends undefined ? null | undefined : T extends (infer U)[] ? WithNullableFields<U>[] : T extends object ? {
    [K in keyof T]: WithNullableFields<T[K]>;
} : T;
export declare function nullsToUndefined<U>(obj: WithNullableFields<U>): U;
export {};
