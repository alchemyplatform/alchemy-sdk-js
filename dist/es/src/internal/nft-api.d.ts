import { BigNumberish } from '@ethersproject/bignumber';
import { AlchemyConfig } from '../api/alchemy-config';
import { BaseNft, ComputeRarityResponse, GetBaseNftsForContractOptions, GetBaseNftsForOwnerOptions, GetContractMetadataBatchResponse, GetContractsForOwnerOptions, GetContractsForOwnerResponse, GetFloorPriceResponse, GetMintedNftsOptions, GetNftMetadataBatchResponse, GetNftMetadataOptions, GetNftSalesOptions, GetNftSalesOptionsByContractAddress, GetNftSalesResponse, GetNftsForContractOptions, GetNftsForOwnerOptions, GetOwnersForContractOptions, GetOwnersForContractResponse, GetOwnersForContractWithTokenBalancesOptions, GetOwnersForContractWithTokenBalancesResponse, GetOwnersForNftResponse, GetSpamContractsResponse, GetTransfersForContractOptions, IsAirdropNftResponse, IsSpamContractResponse, Nft, NftAttributesResponse, NftCollection, NftContract, NftContractBaseNftsResponse, NftContractNftsResponse, NftMetadataBatchOptions, NftMetadataBatchToken, OwnedBaseNft, OwnedBaseNftsResponse, OwnedNft, OwnedNftsResponse, SearchContractMetadataResponse, TransfersNftResponse } from '../types/nft-types';
import { AssetTransfersResponse, GetTransfersForOwnerOptions, GetTransfersForOwnerTransferType, RefreshContractResult } from '../types/types';
/**
 * This file contains the underlying implementations for exposed API surface in
 * the {@link NftNamespace}. By moving the methods out into a separate file,
 * other namespaces can access these methods without depending on the entire
 * NftNamespace.
 */
/**
 * Get the NFT metadata for the provided contract address.
 */
export declare function getNftMetadata(config: AlchemyConfig, contractAddress: string, tokenId: BigNumberish, options?: GetNftMetadataOptions, srcMethod?: string): Promise<Nft>;
export declare function getNftMetadataBatch(config: AlchemyConfig, tokens: Array<NftMetadataBatchToken>, options?: NftMetadataBatchOptions): Promise<GetNftMetadataBatchResponse>;
export declare function getContractMetadata(config: AlchemyConfig, contractAddress: string, srcMethod?: string): Promise<NftContract>;
export declare function getContractMetadataBatch(config: AlchemyConfig, contractAddresses: string[]): Promise<GetContractMetadataBatchResponse>;
export declare function getCollectionMetadata(config: AlchemyConfig, collectionSlug: string, srcMethod?: string): Promise<NftCollection>;
export declare function getNftsForOwnerIterator(config: AlchemyConfig, owner: string, options?: GetNftsForOwnerOptions | GetBaseNftsForOwnerOptions, srcMethod?: string): AsyncIterable<OwnedBaseNft | OwnedNft>;
export declare function getNftsForOwner(config: AlchemyConfig, owner: string, options?: GetNftsForOwnerOptions | GetBaseNftsForOwnerOptions, srcMethod?: string): Promise<OwnedNftsResponse | OwnedBaseNftsResponse>;
export declare function getNftsForContract(config: AlchemyConfig, contractAddress: string, options?: GetBaseNftsForContractOptions | GetNftsForContractOptions, srcMethod?: string): Promise<NftContractNftsResponse | NftContractBaseNftsResponse>;
export declare function getNftsForContractIterator(config: AlchemyConfig, contractAddress: string, options?: GetBaseNftsForContractOptions | GetNftsForContractOptions, srcMethod?: string): AsyncIterable<BaseNft | Nft>;
export declare function getOwnersForContract(config: AlchemyConfig, contractAddress: string, options?: GetOwnersForContractWithTokenBalancesOptions | GetOwnersForContractOptions, srcMethod?: string): Promise<GetOwnersForContractResponse | GetOwnersForContractWithTokenBalancesResponse>;
export declare function getContractsForOwner(config: AlchemyConfig, owner: string, options?: GetContractsForOwnerOptions, srcMethod?: string): Promise<GetContractsForOwnerResponse>;
export declare function getOwnersForNft(config: AlchemyConfig, contractAddress: string, tokenId: BigNumberish, options?: GetOwnersForContractOptions, srcMethod?: string): Promise<GetOwnersForNftResponse>;
export declare function getMintedNfts(config: AlchemyConfig, owner: string, options?: GetMintedNftsOptions): Promise<TransfersNftResponse>;
export declare function getTransfersForOwner(config: AlchemyConfig, owner: string, transferType: GetTransfersForOwnerTransferType, options?: GetTransfersForOwnerOptions): Promise<TransfersNftResponse>;
export declare function getTransfersForContract(config: AlchemyConfig, contract: string, options?: GetTransfersForContractOptions): Promise<TransfersNftResponse>;
export declare function verifyNftOwnership(config: AlchemyConfig, owner: string, contractAddresses: string | string[], srcMethod?: string): Promise<boolean | {
    [contractAddress: string]: boolean;
}>;
export declare function isSpamContract(config: AlchemyConfig, contractAddress: string, srcMethod?: string): Promise<IsSpamContractResponse>;
export declare function getSpamContracts(config: AlchemyConfig, srcMethod?: string): Promise<GetSpamContractsResponse>;
export declare function reportSpam(config: AlchemyConfig, contractAddress: string, srcMethod?: string): Promise<void>;
export declare function isAirdropNft(config: AlchemyConfig, contractAddress: string, tokenId: string, srcMethod?: string): Promise<IsAirdropNftResponse>;
export declare function getFloorPrice(config: AlchemyConfig, contractAddress: string, srcMethod?: string): Promise<GetFloorPriceResponse>;
export declare function getNftSales(config: AlchemyConfig, options?: GetNftSalesOptions | GetNftSalesOptionsByContractAddress, srcMethod?: string): Promise<GetNftSalesResponse>;
export declare function computeRarity(config: AlchemyConfig, contractAddress: string, tokenId: BigNumberish, srcMethod?: string): Promise<ComputeRarityResponse>;
export declare function searchContractMetadata(config: AlchemyConfig, query: string, srcMethod?: string): Promise<SearchContractMetadataResponse>;
export declare function summarizeNftAttributes(config: AlchemyConfig, contractAddress: string, srcMethod?: string): Promise<NftAttributesResponse>;
export declare function refreshNftMetadata(config: AlchemyConfig, contractAddress: string, tokenId: BigNumberish, srcMethod?: string): Promise<boolean>;
export declare function refreshContract(config: AlchemyConfig, contractAddress: string, srcMethod?: string): Promise<RefreshContractResult>;
/**
 * Given an AssetTransfersResponse, fetches the NFTs associated with the
 * transfers and collates them with transfer metadata.
 *
 * VISIBLE FOR TESTING
 */
export declare function getNftsForTransfers(config: AlchemyConfig, response: AssetTransfersResponse): Promise<TransfersNftResponse>;
