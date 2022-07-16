import { Alchemy } from './alchemy';
import { BigNumberish } from '@ethersproject/bignumber';
import {
  GetBaseNftsForNftContractOptions,
  GetBaseNftsForOwnerOptions,
  GetNftFloorPriceResponse,
  GetNftsForNftContractOptions,
  GetNftsForOwnerOptions,
  GetOwnersForNftContractResponse,
  GetOwnersForNftResponse,
  NftContractBaseNftsResponse,
  NftContractNftsResponse,
  NftTokenType,
  OwnedBaseNft,
  OwnedBaseNftsResponse,
  OwnedNft,
  OwnedNftsResponse,
  RefreshNftContractResult
} from '../types/types';
import { BaseNft, BaseNftContract, Nft, NftContract } from './nft';
import {
  checkNftOwnership,
  getNftContractMetadata,
  getNftFloorPrice,
  getNftMetadata,
  getNftsForNftContract,
  getNftsForNftContractIterator,
  getNftsForOwner,
  getNftsForOwnerIterator,
  getOwnersForNft,
  getOwnersForNftContract,
  getSpamNftContracts,
  isSpamNftContract,
  refreshNftContract,
  refreshNftMetadata
} from '../internal/nft-api';

export class NftModule {
  constructor(private readonly alchemy: Alchemy) {}

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
  ): Promise<Nft>;
  /**
   * Get the NFT metadata associated with the provided Base NFT.
   *
   * @param baseNft - The base NFT object to be used for the request.
   * @public
   */
  getNftMetadata(baseNft: BaseNft): Promise<Nft>;
  getNftMetadata(
    contractAddressOrBaseNft: string | BaseNft,
    tokenId?: BigNumberish,
    tokenType?: NftTokenType
  ): Promise<Nft> {
    return getNftMetadata(
      this.alchemy,
      contractAddressOrBaseNft,
      tokenId,
      tokenType
    );
  }

  /**
   * Get the NFT collection metadata associated with the provided parameters.
   *
   * @param contractAddress - The contract address of the NFT.
   * @public
   */
  getNftContractMetadata(contractAddress: string): Promise<NftContract>;
  /**
   * Get the NFT metadata associated with the provided Base NFT.
   *
   * @param baseNftContract - The base NFT contract object to be used for the request.
   * @public
   */
  getNftContractMetadata(
    baseNftContract: BaseNftContract
  ): Promise<NftContract>;
  getNftContractMetadata(
    contractAddressOrBaseNftContract: string | BaseNftContract
  ): Promise<NftContract> {
    return getNftContractMetadata(
      this.alchemy,
      contractAddressOrBaseNftContract
    );
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
    return getNftsForOwnerIterator(this.alchemy, owner, options);
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
    return getNftsForOwner(this.alchemy, owner, options);
  }

  /**
   * Get all NFTs for a given contract address.
   *
   * This method returns the full NFTs in the contract. To get all NFTs without
   * their associated metadata, use {@link GetBaseNftsForNftContractOptions}.
   *
   * @param contractAddress - The contract address of the NFT contract.
   * @param options - The parameters to use for the request. or
   *   {@link NftContractNftsResponse} response.
   * @beta
   */
  getNftsForNftContract(
    contractAddress: string,
    options?: GetNftsForNftContractOptions
  ): Promise<NftContractNftsResponse>;
  /**
   * Get all base NFTs for a given contract address.
   *
   * This method returns the base NFTs that omit the associated metadata. To get
   * all NFTs with their associated metadata, use {@link GetNftsForNftContractOptions}.
   *
   * @param contractAddress - The contract address of the NFT contract.
   * @param options - The optional parameters to use for the request.
   * @beta
   */
  getNftsForNftContract(
    contractAddress: string,
    options?: GetBaseNftsForNftContractOptions
  ): Promise<NftContractBaseNftsResponse>;
  getNftsForNftContract(
    contractAddress: string,
    options?: GetBaseNftsForNftContractOptions | GetNftsForNftContractOptions
  ): Promise<NftContractNftsResponse | NftContractBaseNftsResponse> {
    return getNftsForNftContract(this.alchemy, contractAddress, options);
  }

  /**
   * Fetches all NFTs for a given contract address and yields them in an async iterable.
   *
   * This method returns the full NFTs in the contract and pages through all
   * page keys until all NFTs have been fetched. To get all NFTs without their
   * associated metadata, use {@link GetBaseNftsForNftContractOptions}.
   *
   * @param contractAddress - The contract address of the NFT contract.
   * @param options - The optional parameters to use for the request.
   * @beta
   */
  getNftsForNftContractIterator(
    contractAddress: string,
    options?: GetNftsForNftContractOptions
  ): AsyncIterable<Nft>;
  /**
   * Fetches all base NFTs for a given contract address and yields them in an
   * async iterable.
   *
   * This method returns the base NFTs that omit the associated metadata and
   * pages through all page keys until all NFTs have been fetched. To get all
   * NFTs with their associated metadata, use {@link GetNftsForNftContractOptions}.
   *
   * @param contractAddress - The contract address of the NFT contract.
   * @param options - The optional parameters to use for the request.
   * @beta
   */
  getNftsForNftContractIterator(
    contractAddress: string,
    options?: GetBaseNftsForNftContractOptions
  ): AsyncIterable<BaseNft>;
  getNftsForNftContractIterator(
    contractAddress: string,
    options?: GetBaseNftsForNftContractOptions | GetNftsForNftContractOptions
  ): AsyncIterable<BaseNft | Nft> {
    return getNftsForNftContractIterator(
      this.alchemy,
      contractAddress,
      options
    );
  }

  /**
   * Gets all the owners for a given NFT contract.
   *
   * @param contractAddress - The NFT contract to get the owners for.
   * @beta
   */
  getOwnersForNftContract(
    contractAddress: string
  ): Promise<GetOwnersForNftContractResponse>;
  /**
   * Gets all the owners for a given NFT contract.
   *
   * @param nft - The NFT to get the owners of the NFT contract for.
   * @beta
   */
  getOwnersForNftContract(
    nft: BaseNft
  ): Promise<GetOwnersForNftContractResponse>;
  getOwnersForNftContract(
    contractAddressOrNft: string | BaseNft
  ): Promise<GetOwnersForNftContractResponse> {
    return getOwnersForNftContract(this.alchemy, contractAddressOrNft);
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
  ): Promise<GetOwnersForNftResponse>;
  /**
   * Gets all the owners for a given NFT.
   *
   * @param nft - The NFT object to get the owners for.
   * @beta
   */
  getOwnersForNft(nft: BaseNft): Promise<GetOwnersForNftResponse>;
  getOwnersForNft(
    contractAddressOrNft: string | BaseNft,
    tokenId?: BigNumberish
  ): Promise<GetOwnersForNftResponse> {
    return getOwnersForNft(this.alchemy, contractAddressOrNft, tokenId);
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
    return checkNftOwnership(this.alchemy, owner, contractAddresses);
  }

  /**
   * Returns whether a contract is marked as spam or not by Alchemy. For more
   * information on how we classify spam, go to our NFT API FAQ at
   * https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/nft-api-faq#nft-spam-classification.
   *
   * @param contractAddress - The contract address to check.
   * @beta
   */
  isSpamNftContract(contractAddress: string): Promise<boolean> {
    return isSpamNftContract(this.alchemy, contractAddress);
  }

  /**
   * Returns a list of all spam contracts marked by Alchemy. For details on how
   * Alchemy marks spam contracts, go to
   * https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/nft-api-faq#nft-spam-classification.
   *
   * @beta
   */
  getSpamNftContracts(): Promise<string[]> {
    return getSpamNftContracts(this.alchemy);
  }

  /**
   * Returns the floor prices of a NFT contract by marketplace.
   *
   * @param contractAddress - The contract address for the NFT collection.
   * @beta
   */
  getNftFloorPrice(contractAddress: string): Promise<GetNftFloorPriceResponse> {
    return getNftFloorPrice(this.alchemy, contractAddress);
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
   * To trigger a refresh for all NFTs in a contract, use
   * {@link refreshNftContract} instead.
   *
   * @param contractAddress - The contract address of the NFT.
   * @param tokenId - The token id of the NFT.
   */
  refreshNftMetadata(
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
   * To trigger a refresh for all NFTs in a contract, use
   * {@link refreshNftContract} instead.
   *
   * @param nft - The NFT to refresh the metadata for.
   */
  refreshNftMetadata(nft: BaseNft): Promise<boolean>;
  refreshNftMetadata(
    contractAddressOrBaseNft: string | BaseNft,
    tokenId?: BigNumberish
  ): Promise<boolean> {
    return refreshNftMetadata(this.alchemy, contractAddressOrBaseNft, tokenId);
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
  refreshNftContract(
    contractAddress: string
  ): Promise<RefreshNftContractResult>;
  /**
   * Triggers a metadata refresh all NFTs in the provided contract address. This
   * method is useful after an NFT collection is revealed.
   *
   * Refreshes are queued on the Alchemy backend and may take time to fully
   * process. To refresh the metadata for a specific token, use the
   * {@link refreshNftMetadata} method instead.
   *
   * @param nft - The contract address of the NFT collection.
   * @beta
   */
  refreshNftContract(nft: BaseNft): Promise<RefreshNftContractResult>;
  refreshNftContract(
    contractAddressOrBaseNft: string | BaseNft
  ): Promise<RefreshNftContractResult> {
    return refreshNftContract(this.alchemy, contractAddressOrBaseNft);
  }
}
