import { BigNumber, BigNumberish } from '@ethersproject/bignumber';

import { AlchemyConfig } from '../api/alchemy-config';
import { BaseNft, Nft, NftContract } from '../api/nft';
import {
  AssetTransfersCategory,
  AssetTransfersParams,
  AssetTransfersResponse,
  AssetTransfersResult,
  GetBaseNftsForContractOptions,
  GetBaseNftsForOwnerOptions,
  GetContractsForOwnerOptions,
  GetContractsForOwnerResponse,
  GetFloorPriceResponse,
  GetMintedNftsOptions,
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
  GetTransfersForContractOptions,
  GetTransfersForOwnerOptions,
  GetTransfersForOwnerTransferType,
  NftAttributeRarity,
  NftAttributesResponse,
  NftContractBaseNftsResponse,
  NftContractNftsResponse,
  NftFilters,
  NftMetadataBatchOptions,
  NftMetadataBatchToken,
  NftOrdering,
  NftSaleMarketplace,
  NftSaleTakerType,
  NftTokenType,
  OwnedBaseNft,
  OwnedBaseNftsResponse,
  OwnedNft,
  OwnedNftsResponse,
  RefreshContractResult,
  RefreshState,
  SortingOrder,
  TransfersNftResponse
} from '../types/types';
import { AlchemyApiType, ETH_NULL_ADDRESS } from '../util/const';
import { sanitizeTokenType } from '../util/inputSanitization';
import {
  getBaseNftFromRaw,
  getContractsForOwnerFromRaw,
  getNftContractFromRaw,
  getNftFromRaw,
  getNftRarityFromRaw,
  getNftSalesFromRaw
} from '../util/util';
import { getAssetTransfers } from './core-api';
import { paginateEndpoint, requestHttpWithBackoff } from './dispatch';
import {
  RawBaseNft,
  RawContractBaseNft,
  RawGetBaseNftsForContractResponse,
  RawGetBaseNftsResponse,
  RawGetContractsForOwnerResponse,
  RawGetNftSalesResponse,
  RawGetNftsForContractResponse,
  RawGetNftsResponse,
  RawGetOwnersForContractResponse,
  RawNft,
  RawNftAttributeRarity,
  RawNftContract,
  RawOwnedBaseNft,
  RawOwnedNft,
  RawReingestContractResponse
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
): Promise<Nft[]> {
  const data = {
    tokens,
    tokenUriTimeoutInMs: options?.tokenUriTimeoutInMs,
    refreshCache: options?.refreshCache
  };
  const response = await requestHttpWithBackoff<{}, RawNft[]>(
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
  return response.map(getNftFromRaw);
}

export async function getContractMetadata(
  config: AlchemyConfig,
  contractAddress: string,
  srcMethod = 'getContractMetadata'
): Promise<NftContract> {
  const response = await requestHttpWithBackoff<
    GetContractMetadataParams,
    RawNftContract
  >(config, AlchemyApiType.NFT, 'getContractMetadata', srcMethod, {
    contractAddress
  });

  return getNftContractFromRaw(response);
}

export async function getContractMetadataBatch(
  config: AlchemyConfig,
  contractAddresses: string[]
): Promise<NftContract[]> {
  const response = await requestHttpWithBackoff<{}, RawNftContract[]>(
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

  return response.map(getNftContractFromRaw);
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
    'getNFTs',
    srcMethod,
    'pageKey',
    'pageKey',
    {
      contractAddresses: options?.contractAddresses,
      pageKey: options?.pageKey,
      filters: options?.excludeFilters,
      owner,
      withMetadata
    }
  )) {
    for (const ownedNft of response.ownedNfts as
      | RawOwnedNft[]
      | RawOwnedBaseNft[]) {
      yield {
        ...nftFromGetNftResponse(ownedNft),
        balance: parseInt(ownedNft.balance)
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
  >(config, AlchemyApiType.NFT, 'getNFTs', srcMethod, {
    contractAddresses: options?.contractAddresses,
    pageKey: options?.pageKey,
    filters: options?.excludeFilters,
    excludeFilters: options?.excludeFilters,
    includeFilters: options?.includeFilters,
    owner,
    pageSize: options?.pageSize,
    withMetadata,
    tokenUriTimeoutInMs: options?.tokenUriTimeoutInMs,
    orderBy: options?.orderBy
  });
  return {
    ownedNfts: response.ownedNfts.map(res => ({
      ...nftFromGetNftResponse(res),
      balance: parseInt(res.balance)
    })),
    pageKey: response.pageKey,
    totalCount: response.totalCount,
    blockHash: response.blockHash
  };
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
  >(config, AlchemyApiType.NFT, 'getNFTsForCollection', srcMethod, {
    contractAddress,
    startToken: options?.pageKey,
    withMetadata,
    limit: options?.pageSize ?? undefined,
    tokenUriTimeoutInMs: options?.tokenUriTimeoutInMs
  });

  return {
    nfts: response.nfts.map(res =>
      nftFromGetNftContractResponse(res, contractAddress)
    ),
    pageKey: response.nextToken
  };
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
    'getNFTsForCollection',
    srcMethod,
    'startToken',
    'nextToken',
    {
      contractAddress,
      startToken: options?.pageKey,
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
  const response: any = await requestHttpWithBackoff<
    GetOwnersForNftContractAlchemyParams,
    RawGetOwnersForContractResponse
  >(config, AlchemyApiType.NFT, 'getOwnersForCollection', srcMethod, {
    ...options,
    contractAddress
  });

  return {
    owners: response.ownerAddresses,

    // Only include the pageKey in the final response if it's defined
    ...(response.pageKey !== undefined && { pageKey: response.pageKey })
  };
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

  return getContractsForOwnerFromRaw(response);
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
    'getOwnersForToken',
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

export async function checkNftOwnership(
  config: AlchemyConfig,
  owner: string,
  contractAddresses: string[],
  srcMethod = 'checkNftOwnership'
): Promise<boolean> {
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
  return response.ownedNfts.length > 0;
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
      result[nft.contract.address] = true;
    }
    return result;
  }
}

export async function isSpamContract(
  config: AlchemyConfig,
  contractAddress: string,
  srcMethod = 'isSpamContract'
): Promise<boolean> {
  return requestHttpWithBackoff<IsSpamContractParams, boolean>(
    config,
    AlchemyApiType.NFT,
    'isSpamContract',
    srcMethod,
    {
      contractAddress
    }
  );
}

export async function getSpamContracts(
  config: AlchemyConfig,
  srcMethod = 'getSpamContracts'
): Promise<string[]> {
  return requestHttpWithBackoff<undefined, string[]>(
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
): Promise<NftAttributeRarity[]> {
  const response = await requestHttpWithBackoff<
    ComputeRarityParams,
    RawNftAttributeRarity[]
  >(config, AlchemyApiType.NFT, 'computeRarity', srcMethod, {
    contractAddress,
    tokenId: BigNumber.from(tokenId).toString()
  });

  return getNftRarityFromRaw(response);
}

export async function searchContractMetadata(
  config: AlchemyConfig,
  query: string,
  srcMethod = 'searchContractMetadata'
): Promise<NftContract[]> {
  const response = await requestHttpWithBackoff<
    SearchContractMetadataParams,
    RawNftContract[]
  >(config, AlchemyApiType.NFT, 'searchContractMetadata', srcMethod, {
    query
  });

  return response.map(getNftContractFromRaw);
}

export async function summarizeNftAttributes(
  config: AlchemyConfig,
  contractAddress: string,
  srcMethod = 'summarizeNftAttributes'
): Promise<NftAttributesResponse> {
  return requestHttpWithBackoff<
    SummarizeNftAttributesParams,
    NftAttributesResponse
  >(config, AlchemyApiType.NFT, 'summarizeNftAttributes', srcMethod, {
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
  response: RawBaseNft | RawContractBaseNft | RawNft
): response is RawNft {
  return (response as RawNft).title !== undefined;
}

/**
 * Given an AssetTransfersResponse, fetches the NFTs associated with the
 * transfers and collates them with transfer metadata.
 */
async function getNftsForTransfers(
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

  const nfts = await getNftMetadataBatch(
    config,
    metadataTransfers.map(transfer => transfer.token)
  );

  // The same NFT can be transferred multiple times in the same transfers response.
  // We want to return one NFT for each transfer, so we create a mapping for
  // each NFT to pair with the transfer metadata.
  const nftsByTokenId = new Map<string, Nft>();
  nfts.forEach(nft => {
    const key = `${nft.contract.address}-${BigNumber.from(
      nft.tokenId
    ).toString()}`;
    nftsByTokenId.set(key, nft);
  });

  const transferredNfts = metadataTransfers.map(t => {
    const key = `${t.token.contractAddress}-${BigNumber.from(
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

function parseReingestionState(reingestionState: string): RefreshState {
  switch (reingestionState) {
    case 'does_not_exist':
      return RefreshState.DOES_NOT_EXIST;
    case 'already_queued':
      return RefreshState.ALREADY_QUEUED;
    case 'in_progress':
      return RefreshState.IN_PROGRESS;
    case 'finished':
      return RefreshState.FINISHED;
    case 'queued':
      return RefreshState.QUEUED;
    case 'queue_failed':
      return RefreshState.QUEUE_FAILED;
    default:
      throw new Error('Unknown reingestion state: ' + reingestionState);
  }
}

/**
 * Interface for the `getNftsForNftContract` endpoint. The main difference is
 * that the endpoint has a `startToken` parameter, but the SDK standardizes all
 * pagination parameters to `pageKey`.
 *
 * @internal
 */
interface GetNftsForContractAlchemyParams {
  contractAddress: string;
  startToken?: string;
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
  /** @deprecated - Please use `excludeFilters` instead. */
  filters?: string[];
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
