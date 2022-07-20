import { BigNumberish } from '@ethersproject/bignumber';
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
  RefreshContractResult
} from '../types/types';
import { BaseNft, Nft, NftContract } from './nft';
import {
  checkNftOwnership,
  getNftContractMetadata,
  getFloorPrice,
  getNftMetadata,
  getNftsForContract,
  getNftsForNftContractIterator,
  getNftsForOwner,
  getNftsForOwnerIterator,
  getOwnersForNft,
  getOwnersForContract,
  getSpamContracts,
  isSpamContract,
  refreshNftContract,
  refreshNftMetadata
} from '../internal/nft-api';
import { AlchemyConfig } from './alchemy-config';

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
  getNftMetadata(
    contractAddress: string,
    tokenId: BigNumberish,
    tokenType?: NftTokenType
  ): Promise<Nft> {
    return getNftMetadata(this.config, contractAddress, tokenId, tokenType);
  }

  /**
   * Get the NFT collection metadata associated with the provided parameters.
   *
   * @param contractAddress - The contract address of the NFT.
   * @public
   */
  getNftContractMetadata(contractAddress: string): Promise<NftContract> {
    return getNftContractMetadata(this.config, contractAddress);
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
  getNftsForOwnerIterator(
    owner: string,
    options?: GetNftsForOwnerOptions | GetBaseNftsForOwnerOptions
  ): AsyncIterable<OwnedBaseNft | OwnedNft> {
    return getNftsForOwnerIterator(this.config, owner, options);
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
  getNftsForOwner(
    owner: string,
    options?: GetNftsForOwnerOptions | GetBaseNftsForOwnerOptions
  ): Promise<OwnedNftsResponse | OwnedBaseNftsResponse> {
    return getNftsForOwner(this.config, owner, options);
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
  getNftsForContract(
    contractAddress: string,
    options?: GetBaseNftsForContractOptions | GetNftsForContractOptions
  ): Promise<NftContractNftsResponse | NftContractBaseNftsResponse> {
    return getNftsForContract(this.config, contractAddress, options);
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
  getNftsForContractIterator(
    contractAddress: string,
    options?: GetBaseNftsForContractOptions | GetNftsForContractOptions
  ): AsyncIterable<BaseNft | Nft> {
    return getNftsForNftContractIterator(this.config, contractAddress, options);
  }

  /**
   * Gets all the owners for a given NFT contract.
   *
   * @param contractAddress - The NFT contract to get the owners for.
   * @beta
   */
  getOwnersForContract(
    contractAddress: string
  ): Promise<GetOwnersForContractResponse> {
    return getOwnersForContract(this.config, contractAddress);
  }

  /**
   * Gets all the owners for a given NFT contract address and token ID.
   *
   * @param contractAddress - The NFT contract address.
   * @param tokenId - Token id of the NFT.
   * @beta
   */
  getOwnersForNft(
    contractAddress: string,
    tokenId: BigNumberish
  ): Promise<GetOwnersForNftResponse> {
    return getOwnersForNft(this.config, contractAddress, tokenId);
  }

  /**
   * Checks that the provided owner address owns one of more of the provided NFTs.
   *
   * @param owner - The owner address to check.
   * @param contractAddresses - An array of NFT contract addresses to check ownership for.
   * @beta
   */
  checkNftOwnership(
    owner: string,
    contractAddresses: string[]
  ): Promise<boolean> {
    return checkNftOwnership(this.config, owner, contractAddresses);
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
    return isSpamContract(this.config, contractAddress);
  }

  /**
   * Returns a list of all spam contracts marked by Alchemy. For details on how
   * Alchemy marks spam contracts, go to
   * https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/nft-api-faq#nft-spam-classification.
   *
   * @beta
   */
  getSpamContracts(): Promise<string[]> {
    return getSpamContracts(this.config);
  }

  /**
   * Returns the floor prices of a NFT contract by marketplace.
   *
   * @param contractAddress - The contract address for the NFT collection.
   * @beta
   */
  getFloorPrice(contractAddress: string): Promise<GetFloorPriceResponse> {
    return getFloorPrice(this.config, contractAddress);
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
  refreshNftMetadata(
    contractAddress: string,
    tokenId: BigNumberish
  ): Promise<boolean> {
    return refreshNftMetadata(this.config, contractAddress, tokenId);
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
  refreshContract(contractAddress: string): Promise<RefreshContractResult> {
    return refreshNftContract(this.config, contractAddress);
  }
}
