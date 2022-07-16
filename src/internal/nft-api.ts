import { BaseNft, BaseNftContract, Nft, NftContract } from '../api/nft';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import {
  DeployResult,
  GetBaseNftsForContractOptions,
  GetBaseNftsForOwnerOptions,
  GetNftFloorPriceResponse,
  GetNftsForContractOptions,
  GetNftsForOwnerOptions,
  GetOwnersForContractResponse,
  GetOwnersForNftResponse,
  NftContractBaseNftsResponse,
  NftContractNftsResponse,
  NftTokenType,
  OwnedBaseNft,
  OwnedBaseNftsResponse,
  OwnedNft,
  OwnedNftsResponse,
  RefreshContractResult,
  RefreshState
} from '../types/types';
import { paginateEndpoint, requestHttpWithBackoff } from './dispatch';
import {
  RawBaseNft,
  RawGetBaseNftsForNftContractResponse,
  RawGetBaseNftsResponse,
  RawGetNftsForNftContractResponse,
  RawGetNftsResponse,
  RawGetOwnersForNftContractResponse,
  RawNft,
  RawNftContract,
  RawNftContractBaseNft,
  RawNftContractNft,
  RawOwnedBaseNft,
  RawOwnedNft,
  RawReingestContractResponse
} from './raw-interfaces';
import { AlchemyApiType } from '../util/const';
import {
  getBaseNftFromRaw,
  getNftContractFromRaw,
  getNftFromRaw
} from '../util/util';
import { Alchemy } from '../api/alchemy';
import { toHex } from '../api/util';

const ETH_NULL_VALUE = '0x';

export async function getNftMetadata(
  alchemy: Alchemy,
  contractAddressOrBaseNft: string | BaseNft,
  tokenId?: BigNumberish,
  tokenType?: NftTokenType
): Promise<Nft> {
  let response;
  let contractAddress: string;
  if (typeof contractAddressOrBaseNft === 'string') {
    contractAddress = contractAddressOrBaseNft;
    response = await requestHttpWithBackoff<GetNftMetadataParams, RawNft>(
      alchemy,
      AlchemyApiType.NFT,
      'getNFTMetadata',
      {
        contractAddress: contractAddressOrBaseNft,
        tokenId: BigNumber.from(tokenId!).toString(),
        tokenType: tokenType !== NftTokenType.UNKNOWN ? tokenType : undefined
      }
    );
  } else {
    contractAddress = contractAddressOrBaseNft.contract.address;
    response = await requestHttpWithBackoff<GetNftMetadataParams, RawNft>(
      alchemy,
      AlchemyApiType.NFT,
      'getNFTMetadata',
      {
        contractAddress: contractAddressOrBaseNft.contract.address,
        tokenId: BigNumber.from(contractAddressOrBaseNft.tokenId).toString(),
        tokenType:
          contractAddressOrBaseNft.tokenType !== NftTokenType.UNKNOWN
            ? contractAddressOrBaseNft.tokenType
            : undefined
      }
    );
  }
  return getNftFromRaw(response, contractAddress);
}

export async function getNftContractMetadata(
  alchemy: Alchemy,
  contractAddressOrBaseNftContract: string | BaseNftContract
): Promise<NftContract> {
  let response;
  if (typeof contractAddressOrBaseNftContract === 'string') {
    response = await requestHttpWithBackoff<
      GetNftContractMetadataParams,
      RawNftContract
    >(alchemy, AlchemyApiType.NFT, 'getContractMetadata', {
      contractAddress: contractAddressOrBaseNftContract
    });
  } else {
    response = await requestHttpWithBackoff<
      GetNftContractMetadataParams,
      RawNftContract
    >(alchemy, AlchemyApiType.NFT, 'getContractMetadata', {
      contractAddress: contractAddressOrBaseNftContract.address
    });
  }
  return getNftContractFromRaw(response);
}

export async function* getNftsForOwnerIterator(
  alchemy: Alchemy,
  owner: string,
  options?: GetNftsForOwnerOptions | GetBaseNftsForOwnerOptions
): AsyncIterable<OwnedBaseNft | OwnedNft> {
  const withMetadata = omitMetadataToWithMetadata(options?.omitMetadata);
  for await (const response of paginateEndpoint(
    alchemy,
    AlchemyApiType.NFT,
    'getNFTs',
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
  alchemy: Alchemy,
  owner: string,
  options?: GetNftsForOwnerOptions | GetBaseNftsForOwnerOptions
): Promise<OwnedNftsResponse | OwnedBaseNftsResponse> {
  const withMetadata = omitMetadataToWithMetadata(options?.omitMetadata);
  const response = await requestHttpWithBackoff<
    GetNftsAlchemyParams,
    RawGetBaseNftsResponse | RawGetNftsResponse
  >(alchemy, AlchemyApiType.NFT, 'getNFTs', {
    contractAddresses: options?.contractAddresses,
    pageKey: options?.pageKey,
    filters: options?.excludeFilters,
    owner,
    withMetadata
  });
  return {
    ownedNfts: response.ownedNfts.map(res => ({
      ...nftFromGetNftResponse(res),
      balance: parseInt(res.balance)
    })),
    pageKey: response.pageKey,
    totalCount: response.totalCount
  };
}

export async function getNftsForContract(
  alchemy: Alchemy,
  contractAddress: string,
  options?: GetBaseNftsForContractOptions | GetNftsForContractOptions
): Promise<NftContractNftsResponse | NftContractBaseNftsResponse> {
  const withMetadata = omitMetadataToWithMetadata(options?.omitMetadata);
  const response = await requestHttpWithBackoff<
    GetNftsForNftContractAlchemyParams,
    RawGetBaseNftsForNftContractResponse | RawGetNftsForNftContractResponse
  >(alchemy, AlchemyApiType.NFT, 'getNFTsForCollection', {
    contractAddress,
    startToken: options?.pageKey,
    withMetadata
  });

  return {
    nfts: response.nfts.map(res =>
      nftFromGetNftNftContractResponse(res, contractAddress)
    ),
    pageKey: response.nextToken
  };
}

export async function getOwnersForContract(
  alchemy: Alchemy,
  contractAddressOrNft: string | BaseNft
): Promise<GetOwnersForContractResponse> {
  let response;
  if (typeof contractAddressOrNft === 'string') {
    response = await requestHttpWithBackoff<
      GetOwnersForNftContractAlchemyParams,
      RawGetOwnersForNftContractResponse
    >(alchemy, AlchemyApiType.NFT, 'getOwnersForCollection', {
      contractAddress: contractAddressOrNft
    });
  } else {
    response = await requestHttpWithBackoff<
      GetOwnersForNftContractAlchemyParams,
      RawGetOwnersForNftContractResponse
    >(alchemy, AlchemyApiType.NFT, 'getOwnersForCollection', {
      contractAddress: contractAddressOrNft.contract.address
    });
  }

  return {
    owners: response.ownerAddresses
  };
}

export function getOwnersForNft(
  alchemy: Alchemy,
  contractAddressOrNft: string | BaseNft,
  tokenId?: BigNumberish
): Promise<GetOwnersForNftResponse> {
  if (typeof contractAddressOrNft === 'string') {
    return requestHttpWithBackoff(
      alchemy,
      AlchemyApiType.NFT,
      'getOwnersForToken',
      {
        contractAddress: contractAddressOrNft,
        tokenId: BigNumber.from(tokenId!).toString()
      }
    );
  } else {
    return requestHttpWithBackoff(
      alchemy,
      AlchemyApiType.NFT,
      'getOwnersForToken',
      {
        contractAddress: contractAddressOrNft.contract.address,
        tokenId: BigNumber.from(contractAddressOrNft.tokenId).toString()
      }
    );
  }
}

export async function* getNftsForNftContractIterator(
  alchemy: Alchemy,
  contractAddress: string,
  options?: GetBaseNftsForContractOptions | GetNftsForContractOptions
): AsyncIterable<BaseNft | Nft> {
  const withMetadata = omitMetadataToWithMetadata(options?.omitMetadata);
  for await (const response of paginateEndpoint(
    alchemy,
    AlchemyApiType.NFT,
    'getNFTsForCollection',
    'startToken',
    'nextToken',
    {
      contractAddress,
      startToken: options?.pageKey,
      withMetadata
    }
  )) {
    for (const nft of response.nfts as
      | RawNftContractBaseNft[]
      | RawNftContractNft[]) {
      yield nftFromGetNftNftContractResponse(nft, contractAddress);
    }
  }
}

export async function checkNftOwnership(
  alchemy: Alchemy,
  owner: string,
  contractAddresses: string[]
): Promise<boolean> {
  if (contractAddresses.length === 0) {
    throw new Error('Must provide at least one contract address');
  }
  const response = await getNftsForOwner(alchemy, owner, {
    contractAddresses,
    omitMetadata: true
  });
  return response.ownedNfts.length > 0;
}

export async function isSpamContract(
  alchemy: Alchemy,
  contractAddress: string
): Promise<boolean> {
  return requestHttpWithBackoff<IsSpamContractParams, boolean>(
    alchemy,
    AlchemyApiType.NFT,
    'isSpamContract',
    {
      contractAddress
    }
  );
}

/**
 * Returns a list of all spam contracts marked by Alchemy. For details on how
 * Alchemy marks spam contracts, go to
 * https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/nft-api-faq#nft-spam-classification.
 *
 * @param alchemy - The Alchemy SDK instance.
 * @beta
 */
export async function getSpamContracts(alchemy: Alchemy): Promise<string[]> {
  return requestHttpWithBackoff<undefined, string[]>(
    alchemy,
    AlchemyApiType.NFT,
    'getSpamContracts',
    undefined
  );
}

export async function getFloorPrice(
  alchemy: Alchemy,
  contractAddress: string
): Promise<GetNftFloorPriceResponse> {
  return requestHttpWithBackoff<GetFloorPriceParams, GetNftFloorPriceResponse>(
    alchemy,
    AlchemyApiType.NFT,
    'getFloorPrice',
    {
      contractAddress
    }
  );
}

export async function findContractDeployer(
  alchemy: Alchemy,
  contractAddress: string
): Promise<DeployResult> {
  const provider = await alchemy.getProvider();
  const currentBlockNum = await provider.getBlockNumber();
  if (
    (await provider.getCode(contractAddress, currentBlockNum)) ===
    ETH_NULL_VALUE
  ) {
    throw new Error(`Contract '${contractAddress}' does not exist`);
  }

  // Binary search for the block number that the contract was deployed in.
  const firstBlock = await binarySearchFirstBlock(
    0,
    currentBlockNum + 1,
    contractAddress,
    alchemy
  );

  // Find the first transaction in the block that matches the provided address.
  const txReceipts = await alchemy.getTransactionReceipts({
    blockNumber: toHex(firstBlock)
  });
  const matchingReceipt = txReceipts.receipts?.find(
    receipt => receipt.contractAddress === contractAddress.toLowerCase()
  );
  return {
    deployerAddress: matchingReceipt?.from,
    blockNumber: firstBlock
  };
}

export async function refreshNftMetadata(
  alchemy: Alchemy,
  contractAddressOrBaseNft: string | BaseNft,
  tokenId?: BigNumberish
): Promise<boolean> {
  let contractAddress: string;
  let tokenIdString: string;
  if (typeof contractAddressOrBaseNft === 'string') {
    contractAddress = contractAddressOrBaseNft;
    tokenIdString = BigNumber.from(tokenId!).toString();
  } else {
    contractAddress = contractAddressOrBaseNft.contract.address;
    tokenIdString = contractAddressOrBaseNft.tokenId;
  }
  const first = await getNftMetadata(alchemy, contractAddress, tokenIdString);
  const second = await refresh(alchemy, contractAddress, tokenIdString);
  return first.timeLastUpdated !== second.timeLastUpdated;
}

export async function refreshNftContract(
  alchemy: Alchemy,
  contractAddressOrBaseNft: string | BaseNft
): Promise<RefreshContractResult> {
  let response;
  if (typeof contractAddressOrBaseNft === 'string') {
    response = await requestHttpWithBackoff<
      ReingestContractParams,
      RawReingestContractResponse
    >(alchemy, AlchemyApiType.NFT, 'reingestContract', {
      contractAddress: contractAddressOrBaseNft
    });
  } else {
    response = await requestHttpWithBackoff<
      ReingestContractParams,
      RawReingestContractResponse
    >(alchemy, AlchemyApiType.NFT, 'reingestContract', {
      contractAddress: contractAddressOrBaseNft.contract.address
    });
  }
  return {
    contractAddress: response.contractAddress,
    refreshState: parseReingestionState(response.reingestionState),
    progress: response.progress
  };
}

async function refresh(
  alchemy: Alchemy,
  contractAddress: string,
  tokenId: BigNumberish
): Promise<Nft> {
  const response = await requestHttpWithBackoff<GetNftMetadataParams, RawNft>(
    alchemy,
    AlchemyApiType.NFT,
    'getNFTMetadata',
    {
      contractAddress,
      tokenId: BigNumber.from(tokenId!).toString(),
      refreshCache: true
    }
  );
  return getNftFromRaw(response, contractAddress);
}

/**
 * Perform a binary search between an integer range of block numbers to find the
 * block number where the contract was deployed.
 *
 * @internal
 */
async function binarySearchFirstBlock(
  start: number,
  end: number,
  address: string,
  alchemy: Alchemy
): Promise<number> {
  if (start >= end) {
    return end;
  }

  const mid = Math.floor((start + end) / 2);
  const provider = await alchemy.getProvider();
  const code = await provider.getCode(address, mid);
  if (code === ETH_NULL_VALUE) {
    return binarySearchFirstBlock(mid + 1, end, address, alchemy);
  }
  return binarySearchFirstBlock(start, mid, address, alchemy);
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
    return getNftFromRaw(ownedNft, ownedNft.contract.address);
  } else {
    return getBaseNftFromRaw(ownedNft, ownedNft.contract.address);
  }
}

/**
 * Helper method to convert a NFT response received from Alchemy backend to an
 * SDK NFT type.
 *
 * @internal
 */
function nftFromGetNftNftContractResponse(
  ownedNft: RawNftContractBaseNft | RawNftContractNft,
  contractAddress: string
): Nft | BaseNft {
  if (isNftWithMetadata(ownedNft)) {
    return getNftFromRaw(ownedNft, contractAddress);
  } else {
    return getBaseNftFromRaw(ownedNft, contractAddress);
  }
}

/** @internal */
// TODO: more comprehensive type check
function isNftWithMetadata(response: RawBaseNft | RawNft): response is RawNft {
  return (response as RawNft).title !== undefined;
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
interface GetNftsForNftContractAlchemyParams {
  contractAddress: string;
  startToken?: string;
  withMetadata: boolean;
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
  filters?: string[];
  withMetadata: boolean;
}

/**
 * Interface for the `getNftMetadata` endpoint.
 *
 * @internal
 */
interface GetNftMetadataParams {
  contractAddress: string;
  tokenId: string;
  tokenType?: NftTokenType;
  refreshCache?: boolean;
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
interface GetNftContractMetadataParams {
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
 * Interface for the `getFloorPrice` endpoint.
 *
 * @internal
 */
interface GetFloorPriceParams {
  contractAddress: string;
}

interface ReingestContractParams {
  contractAddress: string;
}
