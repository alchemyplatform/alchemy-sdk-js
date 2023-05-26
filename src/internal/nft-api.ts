import { BigNumber, BigNumberish } from '@ethersproject/bignumber';

import { AlchemyConfig } from '../api/alchemy-config';
import { BaseNft, Nft, NftContract } from '../api/nft';
import {
  AssetTransfersCategory,
  AssetTransfersParams,
  AssetTransfersResponse,
  AssetTransfersResult,
  ComputeRarityResponse,
  GetBaseNftsForContractOptions,
  GetBaseNftsForOwnerOptions,
  GetContractMetadataBatchResponse,
  GetContractsForOwnerOptions,
  GetContractsForOwnerResponse,
  GetFloorPriceResponse,
  GetMintedNftsOptions,
  GetNftMetadataBatchResponse,
  GetNftMetadataOptions,
  GetNftSalesOptions,
  GetNftSalesOptionsByContractAddress,
  GetNftSalesResponse,
  GetNftsForContractOptions,
  GetNftsForOwnerOptions,
  GetOwnersForContractOptions,
  GetOwnersForContractResponse,
  GetOwnersForContractWithTokenBalancesOptions,
  GetOwnersForContractWithTokenBalancesResponse,
  GetOwnersForNftResponse,
  GetSpamContractsResponse,
  GetTransfersForContractOptions,
  GetTransfersForOwnerOptions,
  GetTransfersForOwnerTransferType,
  IsSpamContractResponse,
  NftAttributesResponse,
  NftContractBaseNftsResponse,
  NftContractNftsResponse,
  NftFilters,
  NftMetadataBatchOptions,
  NftMetadataBatchToken,
  NftOrdering,
  NftRefreshState,
  NftSaleMarketplace,
  NftSaleTakerType,
  NftTokenType,
  OwnedBaseNft,
  OwnedBaseNftsResponse,
  OwnedNft,
  OwnedNftsResponse,
  RefreshContractResult,
  SearchContractMetadataResponse,
  SortingOrder,
  TransfersNftResponse
} from '../types/types';
import { AlchemyApiType, ETH_NULL_ADDRESS } from '../util/const';
import { sanitizeTokenType } from '../util/inputSanitization';
import {
  getBaseNftFromRaw,
  getNftContractFromRaw,
  getNftContractsForOwnerFromRaw,
  getNftFromRaw,
  getNftSalesFromRaw,
  nullsToUndefined
} from '../util/util';
import { getAssetTransfers } from './core-api';
import { paginateEndpoint, requestHttpWithBackoff } from './dispatch';
import {
  RawComputeRarityResponse,
  RawContractBaseNft,
  RawGetBaseNftsForContractResponse,
  RawGetBaseNftsResponse,
  RawGetContractMetadataBatchResponse,
  RawGetContractsForOwnerResponse,
  RawGetNftMetadataBatchResponse,
  RawGetNftSalesResponse,
  RawGetNftsForContractResponse,
  RawGetNftsResponse,
  RawGetOwnersForContractResponse,
  RawGetOwnersForContractWithTokenBalancesResponse,
  RawGetSpamContractsResponse,
  RawIsSpamContractResponse,
  RawNft,
  RawNftAttributesResponse,
  RawNftContractForNft,
  RawOwnedBaseNft,
  RawOwnedNft,
  RawReingestContractResponse,
  RawSearchContractMetadataResponse
} from './raw-interfaces';

/**
 * This file contains the underlying implementations for exposed API surface in
 * the {@link NftNamespace}. By moving the methods out into a separate file,
 * other namespaces can access these methods without depending on the entire
 * NftNamespace.
 */

/**
 * Get the NFT metadata for the provided contract address.
 */
export async function getNftMetadata(
  config: AlchemyConfig,
  contractAddress: string,
  tokenId: BigNumberish,
  options?: GetNftMetadataOptions,
  srcMethod = 'getNftMetadata'
): Promise<Nft> {
  const response = await requestHttpWithBackoff<GetNftMetadataParams, RawNft>(
    config,
    AlchemyApiType.NFT,
    'getNFTMetadata',
    srcMethod,
    {
      contractAddress,
      tokenId: BigNumber.from(tokenId!).toString(),
      tokenType: sanitizeTokenType(options?.tokenType),
      tokenUriTimeoutInMs: options?.tokenUriTimeoutInMs,
      refreshCache: options?.refreshCache
    }
  );
  return getNftFromRaw(response);
}

export async function getNftMetadataBatch(
  config: AlchemyConfig,
  tokens: Array<NftMetadataBatchToken>,
  options?: NftMetadataBatchOptions
): Promise<GetNftMetadataBatchResponse> {
  const data = {
    tokens,
    tokenUriTimeoutInMs: options?.tokenUriTimeoutInMs,
    refreshCache: options?.refreshCache
  };
  const response = await requestHttpWithBackoff<
    {},
    RawGetNftMetadataBatchResponse
  >(
    config,
    AlchemyApiType.NFT,
    'getNFTMetadataBatch',
    'getNftMetadataBatch',
    {},
    {
      method: 'POST',
      data
    }
  );
  return {
    nfts: response.nfts.map(nft => getNftFromRaw(nft))
  };
}

export async function getContractMetadata(
  config: AlchemyConfig,
  contractAddress: string,
  srcMethod = 'getContractMetadata'
): Promise<NftContract> {
  const response = await requestHttpWithBackoff<
    GetContractMetadataParams,
    RawNftContractForNft
  >(config, AlchemyApiType.NFT, 'getContractMetadata', srcMethod, {
    contractAddress
  });

  return getNftContractFromRaw(response);
}

export async function getContractMetadataBatch(
  config: AlchemyConfig,
  contractAddresses: string[]
): Promise<GetContractMetadataBatchResponse> {
  const response = await requestHttpWithBackoff<
    {},
    RawGetContractMetadataBatchResponse
  >(
    config,
    AlchemyApiType.NFT,
    'getContractMetadataBatch',
    'getContractMetadataBatch',
    {},
    {
      method: 'POST',
      data: { contractAddresses }
    }
  );

  return {
    contracts: response.contracts.map(getNftContractFromRaw)
  };
}

export async function* getNftsForOwnerIterator(
  config: AlchemyConfig,
  owner: string,
  options?: GetNftsForOwnerOptions | GetBaseNftsForOwnerOptions,
  srcMethod = 'getNftsForOwnerIterator'
): AsyncIterable<OwnedBaseNft | OwnedNft> {
  const withMetadata = omitMetadataToWithMetadata(options?.omitMetadata);
  for await (const response of paginateEndpoint(
    config,
    AlchemyApiType.NFT,
    'getNFTsForOwner',
    srcMethod,
    'pageKey',
    'pageKey',
    {
      contractAddresses: options?.contractAddresses,
      pageKey: options?.pageKey,
      excludeFilters: options?.excludeFilters,
      includeFilters: options?.includeFilters,
      owner,
      withMetadata,
      tokenUriTimeoutInMs: options?.tokenUriTimeoutInMs,
      orderBy: options?.orderBy
    }
  )) {
    for (const ownedNft of response.ownedNfts as
      | RawOwnedNft[]
      | RawOwnedBaseNft[]) {
      yield {
        ...nftFromGetNftResponse(ownedNft),
        balance: ownedNft.balance
      };
    }
  }
}

export async function getNftsForOwner(
  config: AlchemyConfig,
  owner: string,
  options?: GetNftsForOwnerOptions | GetBaseNftsForOwnerOptions,
  srcMethod = 'getNftsForOwner'
): Promise<OwnedNftsResponse | OwnedBaseNftsResponse> {
  const withMetadata = omitMetadataToWithMetadata(options?.omitMetadata);
  const response = await requestHttpWithBackoff<
    GetNftsAlchemyParams,
    RawGetBaseNftsResponse | RawGetNftsResponse
  >(config, AlchemyApiType.NFT, 'getNFTsForOwner', srcMethod, {
    contractAddresses: options?.contractAddresses,
    pageKey: options?.pageKey,
    excludeFilters: options?.excludeFilters,
    includeFilters: options?.includeFilters,
    owner,
    pageSize: options?.pageSize,
    withMetadata,
    tokenUriTimeoutInMs: options?.tokenUriTimeoutInMs,
    orderBy: options?.orderBy
  });
  if (withMetadata) {
    return nullsToUndefined<OwnedNftsResponse>({
      ownedNfts: response.ownedNfts.map(res => ({
        ...getNftFromRaw(res as RawOwnedNft),
        balance: res.balance
      })),
      pageKey: response.pageKey,
      totalCount: response.totalCount,
      blockHash: response.blockHash
    });
  }

  return nullsToUndefined<OwnedBaseNftsResponse>({
    ownedNfts: response.ownedNfts.map(res => ({
      ...getBaseNftFromRaw(res as RawOwnedBaseNft),
      balance: res.balance
    })),
    pageKey: response.pageKey,
    totalCount: response.totalCount,
    blockHash: response.blockHash
  });
}

export async function getNftsForContract(
  config: AlchemyConfig,
  contractAddress: string,
  options?: GetBaseNftsForContractOptions | GetNftsForContractOptions,
  srcMethod = 'getNftsForContract'
): Promise<NftContractNftsResponse | NftContractBaseNftsResponse> {
  const withMetadata = omitMetadataToWithMetadata(options?.omitMetadata);
  const response = await requestHttpWithBackoff<
    GetNftsForContractAlchemyParams,
    RawGetBaseNftsForContractResponse | RawGetNftsForContractResponse
  >(config, AlchemyApiType.NFT, 'getNFTsForContract', srcMethod, {
    contractAddress,
    pageKey: options?.pageKey,
    withMetadata,
    limit: options?.pageSize ?? undefined,
    tokenUriTimeoutInMs: options?.tokenUriTimeoutInMs
  });

  if (withMetadata) {
    return nullsToUndefined<NftContractNftsResponse>({
      nfts: response.nfts.map(res => getNftFromRaw(res as RawNft)),
      pageKey: response.pageKey
    });
  }

  return nullsToUndefined<NftContractBaseNftsResponse>({
    nfts: response.nfts.map(res =>
      getBaseNftFromRaw(res as RawContractBaseNft, contractAddress)
    ),
    pageKey: response.pageKey
  });
}

export async function* getNftsForContractIterator(
  config: AlchemyConfig,
  contractAddress: string,
  options?: GetBaseNftsForContractOptions | GetNftsForContractOptions,
  srcMethod = 'getNftsForContractIterator'
): AsyncIterable<BaseNft | Nft> {
  const withMetadata = omitMetadataToWithMetadata(options?.omitMetadata);
  for await (const response of paginateEndpoint(
    config,
    AlchemyApiType.NFT,
    'getNFTsForContract',
    srcMethod,
    'pageKey',
    'pageKey',
    {
      contractAddress,
      pageKey: options?.pageKey,
      withMetadata
    }
  )) {
    for (const nft of response.nfts as RawContractBaseNft[] | RawNft[]) {
      yield nftFromGetNftContractResponse(nft, contractAddress);
    }
  }
}

export async function getOwnersForContract(
  config: AlchemyConfig,
  contractAddress: string,
  options?:
    | GetOwnersForContractWithTokenBalancesOptions
    | GetOwnersForContractOptions,
  srcMethod = 'getOwnersForContract'
): Promise<
  GetOwnersForContractResponse | GetOwnersForContractWithTokenBalancesResponse
> {
  // Cast to `any` to avoid more type wrangling.
  const response = await requestHttpWithBackoff<
    GetOwnersForNftContractAlchemyParams,
    | RawGetOwnersForContractResponse
    | RawGetOwnersForContractWithTokenBalancesResponse
  >(config, AlchemyApiType.NFT, 'getOwnersForContract', srcMethod, {
    ...options,
    contractAddress
  });

  if (options?.withTokenBalances) {
    return nullsToUndefined<GetOwnersForContractWithTokenBalancesResponse>({
      owners: (response as RawGetOwnersForContractWithTokenBalancesResponse)
        .owners,
      pageKey: response.pageKey
    });
  }
  return nullsToUndefined<GetOwnersForContractResponse>({
    owners: response.owners as string[],
    pageKey: response.pageKey
  });
}

export async function getContractsForOwner(
  config: AlchemyConfig,
  owner: string,
  options?: GetContractsForOwnerOptions,
  srcMethod = 'getContractsForOwner'
): Promise<GetContractsForOwnerResponse> {
  const response = await requestHttpWithBackoff<
    GetContractsForOwnerParams,
    RawGetContractsForOwnerResponse
  >(config, AlchemyApiType.NFT, 'getContractsForOwner', srcMethod, {
    owner,
    excludeFilters: options?.excludeFilters,
    includeFilters: options?.includeFilters,
    pageKey: options?.pageKey,
    pageSize: options?.pageSize,
    orderBy: options?.orderBy
  });

  return nullsToUndefined<GetContractsForOwnerResponse>({
    contracts: response.contracts.map(getNftContractsForOwnerFromRaw),
    pageKey: response.pageKey,
    totalCount: response.totalCount
  });
}

export async function getOwnersForNft(
  config: AlchemyConfig,
  contractAddress: string,
  tokenId: BigNumberish,
  options?: GetOwnersForContractOptions,
  srcMethod = 'getOwnersForNft'
): Promise<GetOwnersForNftResponse> {
  return requestHttpWithBackoff(
    config,
    AlchemyApiType.NFT,
    'getOwnersForNFT',
    srcMethod,
    {
      contractAddress,
      tokenId: BigNumber.from(tokenId!).toString(),
      ...options
    }
  );
}

export async function getMintedNfts(
  config: AlchemyConfig,
  owner: string,
  options?: GetMintedNftsOptions
): Promise<TransfersNftResponse> {
  const provider = await config.getProvider();
  const ownerAddress = await provider._getAddress(owner);
  const category = nftTokenTypeToCategory(options?.tokenType);
  const params: AssetTransfersParams = {
    fromBlock: '0x0',
    fromAddress: ETH_NULL_ADDRESS,
    toAddress: ownerAddress,
    excludeZeroValue: true,
    contractAddresses: options?.contractAddresses,
    category,
    maxCount: 100,
    pageKey: options?.pageKey
  };
  const response = await getAssetTransfers(config, params, 'getMintedNfts');
  return getNftsForTransfers(config, response);
}

export async function getTransfersForOwner(
  config: AlchemyConfig,
  owner: string,
  transferType: GetTransfersForOwnerTransferType,
  options?: GetTransfersForOwnerOptions
): Promise<TransfersNftResponse> {
  const provider = await config.getProvider();
  const ownerAddress = await provider._getAddress(owner);
  const category = nftTokenTypeToCategory(options?.tokenType);
  const params: AssetTransfersParams = {
    fromBlock: '0x0',
    excludeZeroValue: true,
    contractAddresses: options?.contractAddresses,
    category,
    maxCount: 100,
    pageKey: options?.pageKey
  };

  if (transferType === GetTransfersForOwnerTransferType.TO) {
    params.toAddress = ownerAddress;
  } else {
    params.fromAddress = ownerAddress;
  }
  const transfersResponse = await getAssetTransfers(
    config,
    params,
    'getTransfersForOwner'
  );

  return getNftsForTransfers(config, transfersResponse);
}

export async function getTransfersForContract(
  config: AlchemyConfig,
  contract: string,
  options?: GetTransfersForContractOptions
): Promise<TransfersNftResponse> {
  const category = [
    AssetTransfersCategory.ERC721,
    AssetTransfersCategory.ERC1155,
    AssetTransfersCategory.SPECIALNFT
  ];
  const provider = await config.getProvider();
  const fromBlock = options?.fromBlock
    ? provider.formatter.blockTag(
        await provider._getBlockTag(options.fromBlock)
      )
    : '0x0';
  const toBlock = options?.toBlock
    ? provider.formatter.blockTag(await provider._getBlockTag(options.toBlock))
    : undefined;
  const params: AssetTransfersParams = {
    fromBlock,
    toBlock,
    excludeZeroValue: true,
    contractAddresses: [contract],
    order: options?.order,
    category,
    maxCount: 100,
    pageKey: options?.pageKey
  };

  const transfersResponse = await getAssetTransfers(
    config,
    params,
    'getTransfersForContract'
  );

  return getNftsForTransfers(config, transfersResponse);
}

function nftTokenTypeToCategory(
  tokenType: NftTokenType | undefined
): AssetTransfersCategory[] {
  switch (tokenType) {
    case NftTokenType.ERC721:
      return [AssetTransfersCategory.ERC721];
    case NftTokenType.ERC1155:
      return [AssetTransfersCategory.ERC1155];
    default:
      return [
        AssetTransfersCategory.ERC721,
        AssetTransfersCategory.ERC1155,
        AssetTransfersCategory.SPECIALNFT
      ];
  }
}

function parse1155Transfer(
  transfer: AssetTransfersResult
): NftMetadataBatchToken[] {
  return transfer.erc1155Metadata!.map(metadata => ({
    contractAddress: transfer.rawContract.address!,
    tokenId: metadata.tokenId,
    tokenType: NftTokenType.ERC1155
  }));
}

export async function verifyNftOwnership(
  config: AlchemyConfig,
  owner: string,
  contractAddresses: string | string[],
  srcMethod = 'verifyNftOwnership'
): Promise<boolean | { [contractAddress: string]: boolean }> {
  if (typeof contractAddresses === 'string') {
    const response = await getNftsForOwner(
      config,
      owner,
      {
        contractAddresses: [contractAddresses],
        omitMetadata: true
      },
      srcMethod
    );
    return response.ownedNfts.length > 0;
  } else {
    if (contractAddresses.length === 0) {
      throw new Error('Must provide at least one contract address');
    }
    const response = await getNftsForOwner(
      config,
      owner,
      {
        contractAddresses,
        omitMetadata: true
      },
      srcMethod
    );

    // Create map where all input contract addresses are set to false, then flip
    // owned nfts to true.
    const result = contractAddresses.reduce(
      (acc: { [contractAddress: string]: boolean }, curr) => {
        acc[curr] = false;
        return acc;
      },
      {}
    );
    for (const nft of response.ownedNfts) {
      result[(nft as OwnedBaseNft).contractAddress] = true;
    }
    return result;
  }
}

export async function isSpamContract(
  config: AlchemyConfig,
  contractAddress: string,
  srcMethod = 'isSpamContract'
): Promise<IsSpamContractResponse> {
  return requestHttpWithBackoff<
    IsSpamContractParams,
    RawIsSpamContractResponse
  >(config, AlchemyApiType.NFT, 'isSpamContract', srcMethod, {
    contractAddress
  });
}

export async function getSpamContracts(
  config: AlchemyConfig,
  srcMethod = 'getSpamContracts'
): Promise<GetSpamContractsResponse> {
  return requestHttpWithBackoff<undefined, RawGetSpamContractsResponse>(
    config,
    AlchemyApiType.NFT,
    'getSpamContracts',
    srcMethod,
    undefined
  );
}

export async function getFloorPrice(
  config: AlchemyConfig,
  contractAddress: string,
  srcMethod = 'getFloorPrice'
): Promise<GetFloorPriceResponse> {
  return requestHttpWithBackoff<GetFloorPriceParams, GetFloorPriceResponse>(
    config,
    AlchemyApiType.NFT,
    'getFloorPrice',
    srcMethod,
    {
      contractAddress
    }
  );
}

export async function getNftSales(
  config: AlchemyConfig,
  options: GetNftSalesOptions | GetNftSalesOptionsByContractAddress = {},
  srcMethod = 'getNftSales'
): Promise<GetNftSalesResponse> {
  // Avoid ts compiler complaining about the contractAddress field.
  const params: Partial<GetNftSalesOptionsByContractAddress> = {
    ...options
  };

  const response = await requestHttpWithBackoff<
    GetNftSalesParams,
    RawGetNftSalesResponse
  >(config, AlchemyApiType.NFT, 'getNFTSales', srcMethod, {
    fromBlock: params?.fromBlock,
    toBlock: params?.toBlock,
    order: params?.order,
    marketplace: params?.marketplace,
    contractAddress: params?.contractAddress,
    tokenId: params?.tokenId
      ? BigNumber.from(params?.tokenId).toString()
      : undefined,
    sellerAddress: params?.sellerAddress,
    buyerAddress: params?.buyerAddress,
    taker: params?.taker,
    limit: params?.limit,
    pageKey: params?.pageKey
  });

  return getNftSalesFromRaw(response);
}

export async function computeRarity(
  config: AlchemyConfig,
  contractAddress: string,
  tokenId: BigNumberish,
  srcMethod = 'computeRarity'
): Promise<ComputeRarityResponse> {
  const response = await requestHttpWithBackoff<
    ComputeRarityParams,
    RawComputeRarityResponse
  >(config, AlchemyApiType.NFT, 'computeRarity', srcMethod, {
    contractAddress,
    tokenId: BigNumber.from(tokenId).toString()
  });

  return nullsToUndefined(response);
}

export async function searchContractMetadata(
  config: AlchemyConfig,
  query: string,
  srcMethod = 'searchContractMetadata'
): Promise<SearchContractMetadataResponse> {
  const response = await requestHttpWithBackoff<
    SearchContractMetadataParams,
    RawSearchContractMetadataResponse
  >(config, AlchemyApiType.NFT, 'searchContractMetadata', srcMethod, {
    query
  });

  return {
    contracts: response.contracts.map(getNftContractFromRaw)
  };
}

export async function summarizeNftAttributes(
  config: AlchemyConfig,
  contractAddress: string,
  srcMethod = 'summarizeNftAttributes'
): Promise<NftAttributesResponse> {
  return requestHttpWithBackoff<
    SummarizeNftAttributesParams,
    RawNftAttributesResponse
  >(config, AlchemyApiType.NFT, 'summarizeNFTAttributes', srcMethod, {
    contractAddress
  });
}

export async function refreshNftMetadata(
  config: AlchemyConfig,
  contractAddress: string,
  tokenId: BigNumberish,
  srcMethod = 'refreshNftMetadata'
): Promise<boolean> {
  const tokenIdString = BigNumber.from(tokenId!).toString();
  const first = await getNftMetadata(
    config,
    contractAddress,
    tokenIdString,
    undefined,
    srcMethod
  );
  const second = await refresh(
    config,
    contractAddress,
    tokenIdString,
    srcMethod
  );
  return first.timeLastUpdated !== second.timeLastUpdated;
}

export async function refreshContract(
  config: AlchemyConfig,
  contractAddress: string,
  srcMethod = 'refreshContract'
): Promise<RefreshContractResult> {
  const response = await requestHttpWithBackoff<
    ReingestContractParams,
    RawReingestContractResponse
  >(config, AlchemyApiType.NFT, 'reingestContract', srcMethod, {
    contractAddress
  });

  return {
    contractAddress: response.contractAddress,
    refreshState: parseReingestionState(response.reingestionState),
    progress: response.progress
  };
}

async function refresh(
  config: AlchemyConfig,
  contractAddress: string,
  tokenId: BigNumberish,
  srcMethod: string
): Promise<Nft> {
  const response = await requestHttpWithBackoff<GetNftMetadataParams, RawNft>(
    config,
    AlchemyApiType.NFT,
    'getNFTMetadata',
    srcMethod,
    {
      contractAddress,
      tokenId: BigNumber.from(tokenId!).toString(),
      refreshCache: true
    }
  );
  return getNftFromRaw(response);
}

/**
 * Helper method to convert a NFT response received from Alchemy backend to an
 * SDK NFT type.
 *
 * @internal
 */
function nftFromGetNftResponse(
  ownedNft: RawOwnedBaseNft | RawOwnedNft
): Nft | BaseNft {
  if (isNftWithMetadata(ownedNft)) {
    return getNftFromRaw(ownedNft);
  } else {
    return getBaseNftFromRaw(ownedNft);
  }
}

/**
 * Helper method to convert a NFT response received from Alchemy backend to an
 * SDK NFT type.
 *
 * @internal
 */
function nftFromGetNftContractResponse(
  ownedNft: RawContractBaseNft | RawNft,
  contractAddress: string
): Nft | BaseNft {
  if (isNftWithMetadata(ownedNft)) {
    return getNftFromRaw(ownedNft);
  } else {
    return getBaseNftFromRaw(ownedNft, contractAddress);
  }
}

/** @internal */
// TODO: more comprehensive type check
function isNftWithMetadata(
  response: RawContractBaseNft | RawNft
): response is RawNft {
  return (response as RawNft).name !== undefined;
}

/**
 * Given an AssetTransfersResponse, fetches the NFTs associated with the
 * transfers and collates them with transfer metadata.
 *
 * VISIBLE FOR TESTING
 */
export async function getNftsForTransfers(
  config: AlchemyConfig,
  response: AssetTransfersResponse
): Promise<TransfersNftResponse> {
  const metadataTransfers = response.transfers
    .filter(transfer => transfer.rawContract.address !== null)
    // Use flatMap to flatten 1155 transfers that contain multiple NFTs.
    .flatMap(transfer => {
      const tokens = getTokensFromTransfer(transfer);

      const metadata = {
        from: transfer.from,
        to: transfer.to ?? undefined,
        transactionHash: transfer.hash,
        blockNumber: transfer.blockNum
      };
      return tokens.map(token => ({ metadata, token }));
    });

  if (metadataTransfers.length === 0) {
    return { nfts: [] };
  }

  // If we have more than 100 elements after unrolling 1155 transfers, split
  // transfers into batches of 100 to stay under endpoint batch size limit.
  const batchSize = 100;
  const requestBatches = [];
  for (let i = 0; i < metadataTransfers.length; i += batchSize) {
    requestBatches.push(metadataTransfers.slice(i, i + batchSize));
  }
  const responseBatches = await Promise.all(
    requestBatches.map(batch =>
      getNftMetadataBatch(
        config,
        batch.map(transfer => transfer.token)
      )
    )
  );
  const nfts = responseBatches.map(r => r.nfts).flat();

  // The same NFT can be transferred multiple times in the same transfers response.
  // We want to return one NFT for each transfer, so we create a mapping for
  // each NFT to pair with the transfer metadata.
  const nftsByTokenId = new Map<string, Nft>();
  nfts.forEach(nft => {
    const key = `${nft.contract.address.toLowerCase()}-${BigNumber.from(
      nft.tokenId
    ).toString()}`;
    nftsByTokenId.set(key, nft);
  });

  const transferredNfts = metadataTransfers.map(t => {
    const key = `${t.token.contractAddress.toLowerCase()}-${BigNumber.from(
      t.token.tokenId
    ).toString()}`;
    return {
      ...nftsByTokenId.get(key)!,
      ...t.metadata
    };
  });

  return {
    nfts: transferredNfts,
    pageKey: response.pageKey
  };
}

/**
 * Returns the underlying NFT tokens from a transfer as the params for a
 * `getNftMetadataBatch` call. Handles the 1155 case where multiple NFTs can be
 * transferred in a single transaction.
 */
function getTokensFromTransfer(
  transfer: AssetTransfersResult
): NftMetadataBatchToken[] {
  // ERC1155 NFTs can contain multiple tokens in a single transfer, which
  // requires special logic.
  if (transfer.category === AssetTransfersCategory.ERC1155) {
    return parse1155Transfer(transfer);
  } else {
    return [
      {
        contractAddress: transfer.rawContract.address!,
        tokenId: transfer.tokenId!,
        tokenType:
          transfer.category === AssetTransfersCategory.ERC721
            ? NftTokenType.ERC721
            : undefined
      }
    ];
  }
}

/**
 * Flips the `omitMetadata` SDK parameter type to the `withMetadata` parameter
 * required by the Alchemy API. If `omitMetadata` is undefined, the SDK defaults
 * to including metadata.
 *
 * @internal
 */
function omitMetadataToWithMetadata(
  omitMetadata: boolean | undefined
): boolean {
  return omitMetadata === undefined ? true : !omitMetadata;
}

function parseReingestionState(reingestionState: string): NftRefreshState {
  switch (reingestionState) {
    case 'does_not_exist':
      return NftRefreshState.DOES_NOT_EXIST;
    case 'already_queued':
      return NftRefreshState.ALREADY_QUEUED;
    case 'in_progress':
      return NftRefreshState.IN_PROGRESS;
    case 'finished':
      return NftRefreshState.FINISHED;
    case 'queued':
      return NftRefreshState.QUEUED;
    case 'queue_failed':
      return NftRefreshState.QUEUE_FAILED;
    default:
      throw new Error('Unknown reingestion state: ' + reingestionState);
  }
}

/**
 * Interface for the `getNftsForNftContract` endpoint.
 *
 * @internal
 */
interface GetNftsForContractAlchemyParams {
  contractAddress: string;
  pageKey?: string;
  withMetadata: boolean;
  limit?: number;
  tokenUriTimeoutInMs?: number;
}

/**
 * Interface for the `getNfts` endpoint. The main difference is that the
 * endpoint has a `withMetadata` parameter, but the SDK exposes the parameter as
 * `omitMetadata`.
 *
 * @internal
 */
interface GetNftsAlchemyParams {
  owner: string;
  pageKey?: string;
  contractAddresses?: string[];
  excludeFilters?: NftFilters[];
  includeFilters?: NftFilters[];
  pageSize?: number;
  withMetadata: boolean;
  tokenUriTimeoutInMs?: number;
  orderBy?: string;
}

/**
 * NftTokenTypes that are allowed as request inputs.
 *
 * @internal
 */
export type InputNftTokenType =
  | NftTokenType.ERC1155
  | NftTokenType.ERC721
  | undefined;

/**
 * Interface for the `getNftMetadata` endpoint.
 *
 * @internal
 */
interface GetNftMetadataParams {
  contractAddress: string;
  tokenId: string;
  tokenType?: InputNftTokenType;
  refreshCache?: boolean;
  tokenUriTimeoutInMs?: number;
}

/**
 * Interface for the `isSpamContract` endpoint.
 *
 * @internal
 */
interface IsSpamContractParams {
  contractAddress: string;
}

/**
 * Interface for the `getNftContractMetadata` endpoint.
 *
 * @internal
 */
interface GetContractMetadataParams {
  contractAddress: string;
}

/**
 * Interface for the `getOwnersForNftContract` endpoint.
 *
 * @internal
 */
interface GetOwnersForNftContractAlchemyParams {
  contractAddress: string;
}

/**
 * Interface for the `getOwnersForContract` endpoint.
 *
 * @internal
 */
interface GetContractsForOwnerParams {
  owner: string;
  pageKey?: string;
  pageSize?: number;
  includeFilters?: NftFilters[];
  excludeFilters?: NftFilters[];
  orderBy?: NftOrdering;
}

/**
 * Interface for the `getFloorPrice` endpoint.
 *
 * @internal
 */
interface GetFloorPriceParams {
  contractAddress: string;
}

/**
 * Interface for the `getNftSales` endpoint.
 *
 * @internal
 */
interface GetNftSalesParams {
  fromBlock?: number | 'latest';
  toBlock?: number | 'latest';
  order?: SortingOrder;
  marketplace?: NftSaleMarketplace;
  contractAddress?: string;
  tokenId?: string;
  sellerAddress?: string;
  buyerAddress?: string;
  taker?: NftSaleTakerType;
  limit?: number;
  pageKey?: string;
}

/**
 * Interface for the `computeRarity` endpoint.
 *
 * @internal
 */
interface ComputeRarityParams {
  contractAddress: string;
  tokenId: string;
}

/**
 * Interface for the `searchContractMetadata` endpoint.
 *
 * @internal
 */
interface SearchContractMetadataParams {
  query: string;
}

/**
 * Interface for the `summarizeNFTAttributes` endpoint.
 *
 * @internal
 */
interface SummarizeNftAttributesParams {
  contractAddress: string;
}

interface ReingestContractParams {
  contractAddress: string;
}
