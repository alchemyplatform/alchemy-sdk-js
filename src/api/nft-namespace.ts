import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import {
  GetBaseNftsForContractOptions,
  GetBaseNftsForOwnerOptions,
  GetFloorPriceResponse,
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
import { BaseNft, Nft, NftContract } from './nft';
import { AlchemyConfig } from './alchemy-config';
import { paginateEndpoint, requestHttpWithBackoff } from '../internal/dispatch';
import {
  RawBaseNft,
  RawGetBaseNftsForContractResponse,
  RawGetBaseNftsResponse,
  RawGetNftsForContractResponse,
  RawGetNftsResponse,
  RawGetOwnersForContractResponse,
  RawNft,
  RawNftContract,
  RawContractBaseNft,
  RawContractNft,
  RawOwnedBaseNft,
  RawOwnedNft,
  RawReingestContractResponse
} from '../internal/raw-interfaces';
import { AlchemyApiType } from '../util/const';
import {
  getBaseNftFromRaw,
  getNftContractFromRaw,
  getNftFromRaw
} from '../util/util';

export class NftNamespace {
  constructor(private readonly config: AlchemyConfig) {}

  /**
   * Get the NFT metadata associated with the provided parameters.
   *
   * @param contractAddress - The contract address of the NFT.
   * @param tokenId - Token id of the NFT.
   * @param tokenType - Optionally specify the type of token to speed up the query.
   * @public
   */
  async getNftMetadata(
    contractAddress: string,
    tokenId: BigNumberish,
    tokenType?: NftTokenType
  ): Promise<Nft> {
    const response = await requestHttpWithBackoff<GetNftMetadataParams, RawNft>(
      this.config,
      AlchemyApiType.NFT,
      'getNFTMetadata',
      {
        contractAddress,
        tokenId: BigNumber.from(tokenId!).toString(),
        tokenType: tokenType !== NftTokenType.UNKNOWN ? tokenType : undefined
      }
    );
    return getNftFromRaw(response, contractAddress);
  }

  /**
   * Get the NFT collection metadata associated with the provided parameters.
   *
   * @param contractAddress - The contract address of the NFT.
   * @public
   */
  async getContractMetadata(contractAddress: string): Promise<NftContract> {
    const response = await requestHttpWithBackoff<
      GetContractMetadataParams,
      RawNftContract
    >(this.config, AlchemyApiType.NFT, 'getContractMetadata', {
      contractAddress
    });

    return getNftContractFromRaw(response);
  }

  /**
   * Fetches all NFTs for a given owner and yields them in an async iterable.
   *
   * This method returns the full NFT for the owner and pages through all page
   * keys until all NFTs have been fetched.
   *
   * @param owner - The address of the owner.
   * @param options - The optional parameters to use for the request.
   * @public
   */
  getNftsForOwnerIterator(
    owner: string,
    options?: GetNftsForOwnerOptions
  ): AsyncIterable<OwnedNft>;
  /**
   * Fetches all NFTs for a given owner and yields them in an async iterable.
   *
   * This method returns the base NFTs that omit the associated metadata and
   * pages through all page keys until all NFTs have been fetched.
   *
   * @param owner - The address of the owner.
   * @param options - The optional parameters to use for the request.
   * @public
   */
  getNftsForOwnerIterator(
    owner: string,
    options?: GetBaseNftsForOwnerOptions
  ): AsyncIterable<OwnedBaseNft>;
  async *getNftsForOwnerIterator(
    owner: string,
    options?: GetNftsForOwnerOptions | GetBaseNftsForOwnerOptions
  ): AsyncIterable<OwnedBaseNft | OwnedNft> {
    const withMetadata = omitMetadataToWithMetadata(options?.omitMetadata);
    for await (const response of paginateEndpoint(
      this.config,
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

  /**
   * Get all NFTs for an owner.
   *
   * This method returns the full NFTs in the contract. To get all NFTs without
   * their associated metadata, use {@link GetBaseNftsForOwnerOptions}.
   *
   * @param owner - The address of the owner.
   * @param options - The optional parameters to use for the request.
   * @public
   */
  getNftsForOwner(
    owner: string,
    options?: GetNftsForOwnerOptions
  ): Promise<OwnedNftsResponse>;
  /**
   * Get all base NFTs for an owner.
   *
   * This method returns the base NFTs that omit the associated metadata. To get
   * all NFTs with their associated metadata, use {@link GetNftsForOwnerOptions}.
   *
   * @param owner - The address of the owner.
   * @param options - The optional parameters to use for the request.
   * @public
   */
  getNftsForOwner(
    owner: string,
    options?: GetBaseNftsForOwnerOptions
  ): Promise<OwnedBaseNftsResponse>;
  async getNftsForOwner(
    owner: string,
    options?: GetNftsForOwnerOptions | GetBaseNftsForOwnerOptions
  ): Promise<OwnedNftsResponse | OwnedBaseNftsResponse> {
    const withMetadata = omitMetadataToWithMetadata(options?.omitMetadata);
    const response = await requestHttpWithBackoff<
      GetNftsAlchemyParams,
      RawGetBaseNftsResponse | RawGetNftsResponse
    >(this.config, AlchemyApiType.NFT, 'getNFTs', {
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
   * their associated metadata, use {@link GetBaseNftsForContractOptions}.
   *
   * @param contractAddress - The contract address of the NFT contract.
   * @param options - The parameters to use for the request. or
   *   {@link NftContractNftsResponse} response.
   * @beta
   */
  getNftsForContract(
    contractAddress: string,
    options?: GetNftsForContractOptions
  ): Promise<NftContractNftsResponse>;
  /**
   * Get all base NFTs for a given contract address.
   *
   * This method returns the base NFTs that omit the associated metadata. To get
   * all NFTs with their associated metadata, use {@link GetNftsForContractOptions}.
   *
   * @param contractAddress - The contract address of the NFT contract.
   * @param options - The optional parameters to use for the request.
   * @beta
   */
  getNftsForContract(
    contractAddress: string,
    options?: GetBaseNftsForContractOptions
  ): Promise<NftContractBaseNftsResponse>;
  async getNftsForContract(
    contractAddress: string,
    options?: GetBaseNftsForContractOptions | GetNftsForContractOptions
  ): Promise<NftContractNftsResponse | NftContractBaseNftsResponse> {
    const withMetadata = omitMetadataToWithMetadata(options?.omitMetadata);
    const response = await requestHttpWithBackoff<
      GetNftsForNftContractAlchemyParams,
      RawGetBaseNftsForContractResponse | RawGetNftsForContractResponse
    >(this.config, AlchemyApiType.NFT, 'getNFTsForCollection', {
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
   * Fetches all NFTs for a given contract address and yields them in an async iterable.
   *
   * This method returns the full NFTs in the contract and pages through all
   * page keys until all NFTs have been fetched. To get all NFTs without their
   * associated metadata, use {@link GetBaseNftsForContractOptions}.
   *
   * @param contractAddress - The contract address of the NFT contract.
   * @param options - The optional parameters to use for the request.
   * @beta
   */
  getNftsForContractIterator(
    contractAddress: string,
    options?: GetNftsForContractOptions
  ): AsyncIterable<Nft>;
  /**
   * Fetches all base NFTs for a given contract address and yields them in an
   * async iterable.
   *
   * This method returns the base NFTs that omit the associated metadata and
   * pages through all page keys until all NFTs have been fetched. To get all
   * NFTs with their associated metadata, use {@link GetNftsForContractOptions}.
   *
   * @param contractAddress - The contract address of the NFT contract.
   * @param options - The optional parameters to use for the request.
   * @beta
   */
  getNftsForContractIterator(
    contractAddress: string,
    options?: GetBaseNftsForContractOptions
  ): AsyncIterable<BaseNft>;
  async *getNftsForContractIterator(
    contractAddress: string,
    options?: GetBaseNftsForContractOptions | GetNftsForContractOptions
  ): AsyncIterable<BaseNft | Nft> {
    const withMetadata = omitMetadataToWithMetadata(options?.omitMetadata);
    for await (const response of paginateEndpoint(
      this.config,
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
        | RawContractBaseNft[]
        | RawContractNft[]) {
        yield nftFromGetNftNftContractResponse(nft, contractAddress);
      }
    }
  }

  /**
   * Gets all the owners for a given NFT contract.
   *
   * @param contractAddress - The NFT contract to get the owners for.
   * @beta
   */
  async getOwnersForContract(
    contractAddress: string
  ): Promise<GetOwnersForContractResponse> {
    const response = await requestHttpWithBackoff<
      GetOwnersForNftContractAlchemyParams,
      RawGetOwnersForContractResponse
    >(this.config, AlchemyApiType.NFT, 'getOwnersForCollection', {
      contractAddress
    });

    return {
      owners: response.ownerAddresses
    };
  }

  /**
   * Gets all the owners for a given NFT contract address and token ID.
   *
   * @param contractAddress - The NFT contract address.
   * @param tokenId - Token id of the NFT.
   * @beta
   */
  async getOwnersForNft(
    contractAddress: string,
    tokenId: BigNumberish
  ): Promise<GetOwnersForNftResponse> {
    return requestHttpWithBackoff(
      this.config,
      AlchemyApiType.NFT,
      'getOwnersForToken',
      {
        contractAddress,
        tokenId: BigNumber.from(tokenId!).toString()
      }
    );
  }

  /**
   * Checks that the provided owner address owns one of more of the provided NFTs.
   *
   * @param owner - The owner address to check.
   * @param contractAddresses - An array of NFT contract addresses to check ownership for.
   * @beta
   */
  async checkNftOwnership(
    owner: string,
    contractAddresses: string[]
  ): Promise<boolean> {
    if (contractAddresses.length === 0) {
      throw new Error('Must provide at least one contract address');
    }
    const response = await this.getNftsForOwner(owner, {
      contractAddresses,
      omitMetadata: true
    });
    return response.ownedNfts.length > 0;
  }

  /**
   * Returns whether a contract is marked as spam or not by Alchemy. For more
   * information on how we classify spam, go to our NFT API FAQ at
   * https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/nft-api-faq#nft-spam-classification.
   *
   * @param contractAddress - The contract address to check.
   * @beta
   */
  isSpamContract(contractAddress: string): Promise<boolean> {
    return requestHttpWithBackoff<IsSpamContractParams, boolean>(
      this.config,
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
   * @beta
   */
  getSpamContracts(): Promise<string[]> {
    return requestHttpWithBackoff<undefined, string[]>(
      this.config,
      AlchemyApiType.NFT,
      'getSpamContracts',
      undefined
    );
  }

  /**
   * Returns the floor prices of a NFT contract by marketplace.
   *
   * @param contractAddress - The contract address for the NFT collection.
   * @beta
   */
  getFloorPrice(contractAddress: string): Promise<GetFloorPriceResponse> {
    return requestHttpWithBackoff<GetFloorPriceParams, GetFloorPriceResponse>(
      this.config,
      AlchemyApiType.NFT,
      'getFloorPrice',
      {
        contractAddress
      }
    );
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
   * To trigger a refresh for all NFTs in a contract, use {@link refreshContract} instead.
   *
   * @param contractAddress - The contract address of the NFT.
   * @param tokenId - The token id of the NFT.
   */
  async refreshNftMetadata(
    contractAddress: string,
    tokenId: BigNumberish
  ): Promise<boolean> {
    const tokenIdString = BigNumber.from(tokenId!).toString();
    const first = await this.getNftMetadata(contractAddress, tokenIdString);
    const second = await refresh(this.config, contractAddress, tokenIdString);
    return first.timeLastUpdated !== second.timeLastUpdated;
  }

  /**
   * Triggers a metadata refresh all NFTs in the provided contract address. This
   * method is useful after an NFT collection is revealed.
   *
   * Refreshes are queued on the Alchemy backend and may take time to fully
   * process. To refresh the metadata for a specific token, use the
   * {@link refreshNftMetadata} method instead.
   *
   * @param contractAddress - The contract address of the NFT collection.
   * @beta
   */
  async refreshContract(
    contractAddress: string
  ): Promise<RefreshContractResult> {
    const response = await requestHttpWithBackoff<
      ReingestContractParams,
      RawReingestContractResponse
    >(this.config, AlchemyApiType.NFT, 'reingestContract', {
      contractAddress
    });

    return {
      contractAddress: response.contractAddress,
      refreshState: parseReingestionState(response.reingestionState),
      progress: response.progress
    };
  }
}

async function refresh(
  config: AlchemyConfig,
  contractAddress: string,
  tokenId: BigNumberish
): Promise<Nft> {
  const response = await requestHttpWithBackoff<GetNftMetadataParams, RawNft>(
    config,
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
  ownedNft: RawContractBaseNft | RawContractNft,
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
