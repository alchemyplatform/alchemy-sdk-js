/**
 * This file contains the raw HTTP responses returned by the Alchemy endpoints.
 * These types are not exposed to the end user and are instead used internally
 * by the SDK to construct the SDK's returned types.
 */
/** Information on the time at which an NFT was last acquired. */
export interface RawAcquiredAt {
    /** Timestamp of the block at which an NFT was last acquired. */
    blockTimestamp?: string;
    /** Block number of the block at which an NFT was last acquired. */
    blockNumber?: number;
}
export interface RawNftData {
    tokenUri: string | null;
    metadata: Record<string, any>;
    error: string | null;
}
export interface RawNftMint {
    mintAddress?: string;
    blockNumber?: number;
    timestamp?: string;
    transactionHash?: string;
}
export interface RawNftContract {
    address: string;
    tokenType: string;
    name: string | null;
    symbol: string | null;
    totalSupply: string | null;
    contractDeployer: string | null;
    deployedBlockNumber: number | null;
    openSeaMetadata: RawOpenSeaCollectionMetadata;
}
export interface RawGetFloorPriceResponse {
    openSea: RawFloorPriceSuccess | RawFloorPriceFailure;
    looksRare: RawFloorPriceSuccess | RawFloorPriceFailure;
}
export interface RawFloorPriceSuccess {
    floorPrice: number;
    priceCurrency: string;
    collectionUrl: string;
    retrievedAt: string;
    error: null;
}
export interface RawFloorPriceFailure {
    floorPrice: null;
    priceCurrency: null;
    collectionUrl: null;
    retrievedAt: null;
    error: string;
}
export interface RawNftCollectionFloorPrice {
    marketplace: string | null;
    floorPrice: number | null;
    priceCurrency: string | null;
}
export interface RawBaseNftCollection {
    name: string;
    slug: string | null;
    externalUrl: string | null;
    bannerImageUrl: string | null;
}
/** OpenSea's full metadata for an NFT collection. */
export interface RawOpenSeaCollectionMetadata {
    floorPrice: number | null;
    collectionName: string | null;
    collectionSlug: string | null;
    safelistRequestStatus: string | null;
    imageUrl: string | null;
    bannerImageUrl: string | null;
    description: string | null;
    externalUrl: string | null;
    twitterUsername: string | null;
    discordUrl: string | null;
    lastIngestedAt: string;
}
export interface RawNftsForOwnerValidAt {
    blockNumber: number | null;
    blockHash: string;
    blockTimestamp: string | null;
}
export interface RawGetOwnersForContractWithTokenBalancesResponse {
    owners: RawOwnerAddress[];
    pageKey: string | null;
}
export interface RawOwnerAddress {
    ownerAddress: string;
    tokenBalances: RawTokenBalances[];
}
export interface RawTokenBalances {
    tokenId: string;
    balance: string;
}
export interface RawReingestContractResponse {
    contractAddress: string;
    reingestionState: string;
    progress: string | null;
}
export interface RawWebhook {
    id: string;
    network: string;
    webhook_type: string;
    webhook_url: string;
    is_active: boolean;
    time_created: number;
    signing_key: string;
    version: string;
    app_id?: string;
}
export interface RawWebhookPagination {
    cursors: {
        after?: string;
    };
    total_count: number;
}
export interface RawGetAllWebhooksResponse {
    data: RawWebhook[];
}
export interface RawAddressActivityResponse {
    data: string[];
    pagination: RawWebhookPagination;
}
export interface RawCustomGraphqlWebhookConfig {
    data: {
        webhook_id: string;
        graphql_query: string;
    };
}
export interface RawNftFilter {
    contract_address: string;
    token_id: string;
}
export interface RawNftFiltersResponse {
    data: RawNftFilter[];
    pagination: RawWebhookPagination;
}
export interface RawCreateWebhookResponse {
    data: RawWebhook;
}
export interface RawNftFilterParam {
    contract_address: string;
    token_id?: string;
}
export interface RawSearchContractMetadataResponse {
    contracts: RawNftContract[];
}
export interface RawComputeRarityResponse {
    rarities: RawNftAttributeRarity[];
}
export interface RawNftAttributeRarity {
    value: string;
    traitType: string;
    prevalence: number;
}
export interface RawNftAttributesResponse {
    summary: Record<string, Record<string, number>>;
    totalSupply: string;
    contractAddress: string;
}
export interface RawGetNftSalesResponse {
    nftSales: RawNftSale[];
    validAt: RawNftSaleValidAt;
    pageKey: string | null;
}
export interface RawNftSale {
    marketplace: string;
    marketplaceAddress: string;
    contractAddress: string;
    tokenId: string;
    quantity: string;
    buyerAddress: string;
    sellerAddress: string;
    taker: string;
    sellerFee: RawNftSaleFeeData;
    protocolFee: RawNftSaleFeeData;
    royaltyFee: RawNftSaleFeeData;
    blockNumber: number;
    logIndex: number;
    bundleIndex: number;
    transactionHash: string;
}
export interface RawNftSaleValidAt {
    blockNumber: number;
    blockHash: string | null;
    blockTimestamp: string | null;
}
export interface RawNftSaleFeeData {
    amount: string | null;
    tokenAddress: string | null;
    symbol: string | null;
    decimals: number | null;
}
export interface RawGetContractsForOwnerResponse {
    contracts: RawNftContractForOwner[];
    pageKey: string | null;
    totalCount: number;
}
export interface RawNftContractForOwner extends RawNftContract, RawNftContractOwnershipInfo {
    displayNft: RawDisplayNftForContract;
    image: RawNftImage;
}
export interface RawGetNftMetadataBatchResponse {
    nfts: Array<RawNft>;
}
export interface RawGetContractMetadataBatchResponse {
    contracts: RawNftContract[];
}
export interface RawIsSpamContractResponse {
    isSpamContract: boolean;
}
export interface RawGetSpamContractsResponse {
    contractAddresses: string[];
}
export interface RawIsAirdropNftResponse {
    isAirdrop: boolean;
}
export interface RawDisplayNftForContract {
    tokenId: string;
    name: string | null;
}
export interface RawNftImage {
    cachedUrl: string | null;
    thumbnailUrl: string | null;
    pngUrl: string | null;
    contentType: string | null;
    size: number | null;
    originalUrl: string | null;
}
export interface RawNftContractOwnershipInfo {
    totalBalance: string;
    numDistinctTokensOwned: string;
    isSpam: boolean;
}
