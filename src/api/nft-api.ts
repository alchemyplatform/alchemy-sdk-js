import {
  NftContractBaseNftsResponse,
  NftContractNftsResponse,
  DeployResult,
  GetBaseNftsForNftContractOptions,
  GetBaseNftsForOwnerOptions,
  GetNftsForNftContractOptions,
  GetNftsForOwnerOptions,
  GetOwnersForNftContractResponse,
  GetOwnersForNftResponse,
  NftTokenType,
  OwnedBaseNft,
  OwnedBaseNftsResponse,
  OwnedNft,
  OwnedNftsResponse
} from '../types/types';
import { Alchemy } from './alchemy';
import { paginateEndpoint, requestHttpWithBackoff } from '../internal/dispatch';
import { BaseNft, BaseNftContract, Nft, NftContract } from './nft';
import {
  RawBaseNft,
  RawNftContractBaseNft,
  RawNftContractNft,
  RawGetBaseNftsForNftContractResponse,
  RawGetBaseNftsResponse,
  RawGetNftsForNftContractResponse,
  RawGetNftsResponse,
  RawGetOwnersForNftContractResponse,
  RawNft,
  RawNftContract,
  RawOwnedBaseNft,
  RawOwnedNft
} from '../internal/raw-interfaces';
import { getNftContractFromRaw, toHex } from './util';
import { getTransactionReceipts } from './enhanced';
import { BigNumber, BigNumberish } from 'ethers';

const ETH_NULL_VALUE = '0x';

/**
 * Get the NFT metadata associated with the provided parameters.
 *
 * @param alchemy - The Alchemy SDK instance.
 * @param contractAddress - The contract address of the NFT.
 * @param tokenId - Token id of the NFT.
 * @param tokenType - Optionally specify the type of token to speed up the query.
 * @public
 */
export function getNftMetadata(
  alchemy: Alchemy,
  contractAddress: string,
  tokenId: BigNumberish,
  tokenType?: NftTokenType
): Promise<Nft>;

/**
 * Get the NFT metadata associated with the provided Base NFT.
 *
 * @param alchemy - The Alchemy SDK instance.
 * @param baseNft - The base NFT object to be used for the request.
 * @public
 */
export function getNftMetadata(
  alchemy: Alchemy,
  baseNft: BaseNft
): Promise<Nft>;
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
  return Nft.fromResponse(response, contractAddress);
}

/**
 * Get the NFT collection metadata associated with the provided parameters.
 *
 * @param alchemy - The Alchemy SDK instance.
 * @param contractAddress - The contract address of the NFT.
 * @param tokenType - Optionally specify the type of token to speed up the query.
 * @public
 */
export function getNftContractMetadata(
  alchemy: Alchemy,
  contractAddress: string
): Promise<NftContract>;

/**
 * Get the NFT metadata associated with the provided Base NFT.
 *
 * @param alchemy - The Alchemy SDK instance.
 * @param baseNft - The base NFT object to be used for the request.
 * @public
 */
export function getNftContractMetadata(
  alchemy: Alchemy,
  baseNftContract: BaseNftContract
): Promise<NftContract>;
export async function getNftContractMetadata(
  alchemy: Alchemy,
  contractAddressOrBaseNftContract: string | BaseNftContract
): Promise<NftContract> {
  let response;
  if (typeof contractAddressOrBaseNftContract === 'string') {
    response = await requestHttpWithBackoff<
      GetNftContractMetadataParams,
      RawNftContract
    >(alchemy, 'getContractMetadata', {
      contractAddress: contractAddressOrBaseNftContract
    });
  } else {
    response = await requestHttpWithBackoff<
      GetNftContractMetadataParams,
      RawNftContract
    >(alchemy, 'getContractMetadata', {
      contractAddress: contractAddressOrBaseNftContract.address
    });
  }
  return getNftContractFromRaw(response);
}

/**
 * Fetches all NFTs for a given owner and yields them in an async iterable.
 *
 * This method returns the full NFT for the owner and pages through all page
 * keys until all NFTs have been fetched.
 *
 * @param alchemy - The Alchemy SDK instance.
 * @param owner - The address of the owner.
 * @param options - The optional parameters to use for the request.
 * @public
 */
export function getNftsForOwnerIterator(
  alchemy: Alchemy,
  owner: string,
  options?: GetNftsForOwnerOptions
): AsyncIterable<OwnedNft>;

/**
 * Fetches all NFTs for a given owner and yields them in an async iterable.
 *
 * This method returns the base NFTs that omit the associated metadata and pages
 * through all page keys until all NFTs have been fetched.
 *
 * @param alchemy - The Alchemy SDK instance.
 * @param owner - The address of the owner.
 * @param options - The optional parameters to use for the request.
 * @public
 */
export function getNftsForOwnerIterator(
  alchemy: Alchemy,
  owner: string,
  options?: GetBaseNftsForOwnerOptions
): AsyncIterable<OwnedBaseNft>;

export async function* getNftsForOwnerIterator(
  alchemy: Alchemy,
  owner: string,
  options?: GetNftsForOwnerOptions | GetBaseNftsForOwnerOptions
): AsyncIterable<OwnedBaseNft | OwnedNft> {
  const withMetadata = omitMetadataToWithMetadata(options?.omitMetadata);
  for await (const response of paginateEndpoint(
    alchemy,
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

/**
 * Get all NFTs for an owner.
 *
 * This method returns the full NFTs in the contract. To get all NFTs without
 * their associated metadata, use {@link GetBaseNftsForOwnerOptions}.
 *
 * @param alchemy - The Alchemy SDK instance.
 * @param owner - The address of the owner.
 * @param options - The optional parameters to use for the request.
 * @public
 */
export async function getNftsForOwner(
  alchemy: Alchemy,
  owner: string,
  options?: GetNftsForOwnerOptions
): Promise<OwnedNftsResponse>;

/**
 * Get all base NFTs for an owner.
 *
 * This method returns the base NFTs that omit the associated metadata. To get
 * all NFTs with their associated metadata, use {@link GetNftsForOwnerOptions}.
 *
 * @param alchemy - The Alchemy SDK instance.
 * @param owner - The address of the owner.
 * @param options - The optional parameters to use for the request.
 * @public
 */
export async function getNftsForOwner(
  alchemy: Alchemy,
  owner: string,
  options?: GetBaseNftsForOwnerOptions
): Promise<OwnedBaseNftsResponse>;

export async function getNftsForOwner(
  alchemy: Alchemy,
  owner: string,
  options?: GetNftsForOwnerOptions | GetBaseNftsForOwnerOptions
): Promise<OwnedNftsResponse | OwnedBaseNftsResponse> {
  const withMetadata = omitMetadataToWithMetadata(options?.omitMetadata);
  const response = await requestHttpWithBackoff<
    GetNftsAlchemyParams,
    RawGetBaseNftsResponse | RawGetNftsResponse
  >(alchemy, 'getNFTs', {
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

/**
 * Get all NFTs for a given contract address.
 *
 * This method returns the full NFTs in the contract. To get all NFTs without
 * their associated metadata, use {@link GetBaseNftsForNftContractOptions}.
 *
 * @param alchemy - The Alchemy SDK instance.
 * @param contractAddress - The contract address of the NFT contract.
 * @param options - The parameters to use for the request. or
 *   {@link NftContractNftsResponse} response.
 * @beta
 */
export async function getNftsForNftContract(
  alchemy: Alchemy,
  contractAddress: string,
  options?: GetNftsForNftContractOptions
): Promise<NftContractNftsResponse>;

/**
 * Get all base NFTs for a given contract address.
 *
 * This method returns the base NFTs that omit the associated metadata. To get
 * all NFTs with their associated metadata, use {@link GetNftsForNftContractOptions}.
 *
 * @param alchemy - The Alchemy SDK instance.
 * @param contractAddress - The contract address of the NFT contract.
 * @param options - The optional parameters to use for the request.
 * @beta
 */
export async function getNftsForNftContract(
  alchemy: Alchemy,
  contractAddress: string,
  options?: GetBaseNftsForNftContractOptions
): Promise<NftContractBaseNftsResponse>;

export async function getNftsForNftContract(
  alchemy: Alchemy,
  contractAddress: string,
  options?: GetBaseNftsForNftContractOptions | GetNftsForNftContractOptions
): Promise<NftContractNftsResponse | NftContractBaseNftsResponse> {
  const withMetadata = omitMetadataToWithMetadata(options?.omitMetadata);
  const response = await requestHttpWithBackoff<
    GetNftsForNftContractAlchemyParams,
    RawGetBaseNftsForNftContractResponse | RawGetNftsForNftContractResponse
  >(alchemy, 'getNFTsForNftContract', {
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

/**
 * Gets all the owners for a given NFT contract address and token ID.
 *
 * @param alchemy - The Alchemy SDK instance.
 * @param contractAddress - The NFT contract address.
 * @param tokenId - Token id of the NFT.
 * @beta
 */
export function getOwnersForNft(
  alchemy: Alchemy,
  contractAddress: string,
  tokenId: BigNumberish
): Promise<GetOwnersForNftResponse>;

/**
 * Gets all the owners for a given NFT.
 *
 * @param alchemy - The Alchemy SDK instance.
 * @param nft - The NFT object to get the owners for.
 * @beta
 */
export function getOwnersForNft(
  alchemy: Alchemy,
  nft: BaseNft
): Promise<GetOwnersForNftResponse>;
export function getOwnersForNft(
  alchemy: Alchemy,
  contractAddressOrNft: string | BaseNft,
  tokenId?: BigNumberish
): Promise<GetOwnersForNftResponse> {
  if (typeof contractAddressOrNft === 'string') {
    return requestHttpWithBackoff(alchemy, 'getOwnersForToken', {
      contractAddress: contractAddressOrNft,
      tokenId: BigNumber.from(tokenId!).toString()
    });
  } else {
    return requestHttpWithBackoff(alchemy, 'getOwnersForToken', {
      contractAddress: contractAddressOrNft.contract.address,
      tokenId: BigNumber.from(contractAddressOrNft.tokenId).toString()
    });
  }
}

/**
 * Gets all the owners for a given NFT NFT contract.
 *
 * @param alchemy - The Alchemy SDK instance.
 * @param contractAddress - The NFT NFT contract to get the owners for.
 * @beta
 */
export function getOwnersForNftContract(
  alchemy: Alchemy,
  contractAddress: string
): Promise<GetOwnersForNftContractResponse>;

/**
 * Gets all the owners for a given NFT NFT contract.
 *
 * @param alchemy - The Alchemy SDK instance.
 * @param nft - The NFT to get the owners of the NFT contract for.
 * @beta
 */
export function getOwnersForNftContract(
  alchemy: Alchemy,
  nft: BaseNft
): Promise<GetOwnersForNftContractResponse>;
export async function getOwnersForNftContract(
  alchemy: Alchemy,
  contractAddressOrNft: string | BaseNft
): Promise<GetOwnersForNftContractResponse> {
  let response;
  if (typeof contractAddressOrNft === 'string') {
    response = await requestHttpWithBackoff<
      GetOwnersForNftContractAlchemyParams,
      RawGetOwnersForNftContractResponse
    >(alchemy, 'getOwnersForNftContract', {
      contractAddress: contractAddressOrNft
    });
  } else {
    response = await requestHttpWithBackoff<
      GetOwnersForNftContractAlchemyParams,
      RawGetOwnersForNftContractResponse
    >(alchemy, 'getOwnersForNftContract', {
      contractAddress: contractAddressOrNft.contract.address
    });
  }

  return {
    owners: response.ownerAddresses
  };
}

/**
 * Fetches all NFTs for a given contract address and yields them in an async iterable.
 *
 * This method returns the full NFTs in the contract and pages through all page
 * keys until all NFTs have been fetched. To get all NFTs without their
 * associated metadata, use {@link GetBaseNftsForNftContractOptions}.
 *
 * @param alchemy - The Alchemy SDK instance.
 * @param contractAddress - The contract address of the NFT contract.
 * @param options - The optional parameters to use for the request.
 * @beta
 */
export function getNftsForNftContractIterator(
  alchemy: Alchemy,
  contractAddress: string,
  options?: GetNftsForNftContractOptions
): AsyncIterable<Nft>;

/**
 * Fetches all base NFTs for a given contract address and yields them in an
 * async iterable.
 *
 * This method returns the base NFTs that omit the associated metadata and pages
 * through all page keys until all NFTs have been fetched. To get all NFTs with
 * their associated metadata, use {@link GetNftsForNftContractOptions}.
 *
 * @param alchemy - The Alchemy SDK instance.
 * @param contractAddress - The contract address of the NFT contract.
 * @param options - The optional parameters to use for the request.
 * @beta
 */
export function getNftsForNftContractIterator(
  alchemy: Alchemy,
  contractAddress: string,
  options?: GetBaseNftsForNftContractOptions
): AsyncIterable<BaseNft>;

export async function* getNftsForNftContractIterator(
  alchemy: Alchemy,
  contractAddress: string,
  options?: GetBaseNftsForNftContractOptions | GetNftsForNftContractOptions
): AsyncIterable<BaseNft | Nft> {
  const withMetadata = omitMetadataToWithMetadata(options?.omitMetadata);
  for await (const response of paginateEndpoint(
    alchemy,
    'getNFTsForNftContract',
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

/**
 * Checks that the provided owner address owns one of more of the provided NFTs.
 *
 * @param alchemy - The Alchemy SDK instance.
 * @param owner - The owner address to check.
 * @param contractAddresses - An array of NFT contract addresses to check ownership for.
 * @beta
 */
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

/**
 * Finds the address that deployed the provided contract and block number it was
 * deployed in.
 *
 * NOTE: This method performs a binary search across all blocks since genesis
 * and can take a long time to complete. This method is a convenience method
 * that will eventually be replaced by a single call to an Alchemy endpoint with
 * this information cached.
 *
 * @param alchemy - The Alchemy SDK instance.
 * @param contractAddress - The contract address to find the deployer for.
 * @beta
 */
export async function findContractDeployer(
  alchemy: Alchemy,
  contractAddress: string
): Promise<DeployResult> {
  const provider = alchemy.getProvider();
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
  const txReceipts = await getTransactionReceipts(alchemy, {
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

/**
 * Refreshes the cached metadata for a provided NFT contract address and token
 * id. Returns a boolean value indicating whether the metadata was refreshed.
 *
 * This method is useful when you want to refresh the metadata for a NFT that
 * has been updated since the last time it was fetched. Note that the backend
 * only allows one refresh per token every 15 minutes, globally for all users.
 * The last refresh time for an NFT can be accessed on the
 * {@link Nft.timeLastUpdated} field.
 *
 * @param alchemy - The Alchemy SDK instance.
 * @param contractAddress - The contract address of the NFT.
 * @param tokenId - The token id of the NFT.
 */
export async function refreshNftMetadata(
  alchemy: Alchemy,
  contractAddress: string,
  tokenId: BigNumberish
): Promise<boolean>;

/**
 * Refreshes the cached metadata for a provided NFT contract address and token
 * id. Returns a boolean value indicating whether the metadata was refreshed.
 *
 * This method is useful when you want to refresh the metadata for a NFT that
 * has been updated since the last time it was fetched. Note that the backend
 * only allows one refresh per token every 15 minutes, globally for all users.
 *
 * @param alchemy - The Alchemy SDK instance.
 * @param nft - The NFT to refresh the metadata for.
 */
export async function refreshNftMetadata(
  alchemy: Alchemy,
  nft: BaseNft
): Promise<boolean>;

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

async function refresh(
  alchemy: Alchemy,
  contractAddress: string,
  tokenId: BigNumberish
): Promise<Nft> {
  const response = await requestHttpWithBackoff<GetNftMetadataParams, RawNft>(
    alchemy,
    'getNFTMetadata',
    {
      contractAddress,
      tokenId: BigNumber.from(tokenId!).toString(),
      refreshCache: true
    }
  );
  return Nft.fromResponse(response, contractAddress);
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
  const code = await alchemy.getProvider().getCode(address, mid);
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
    return Nft.fromResponse(ownedNft, ownedNft.contract.address);
  } else {
    return BaseNft.fromResponse(ownedNft, ownedNft.contract.address);
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
    return Nft.fromResponse(ownedNft, contractAddress);
  } else {
    return BaseNft.fromResponse(ownedNft, contractAddress);
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
