import {
  AlchemyConfig,
  AssetTransfersParams,
  AssetTransfersResponse,
  DeployResult,
  GetBaseNftsForNftContractOptions,
  GetBaseNftsForOwnerOptions,
  GetNftFloorPriceResponse,
  GetNftsForNftContractOptions,
  GetNftsForOwnerOptions,
  GetOwnersForNftContractResponse,
  GetOwnersForNftResponse,
  Network,
  NftContractBaseNftsResponse,
  NftContractNftsResponse,
  NftTokenType,
  OwnedBaseNft,
  OwnedBaseNftsResponse,
  OwnedNft,
  OwnedNftsResponse,
  TokenBalancesResponse,
  TokenMetadataResponse,
  TransactionReceiptsParams,
  TransactionReceiptsResponse
} from '../types/types';
import {
  DEFAULT_ALCHEMY_API_KEY,
  DEFAULT_CONTRACT_ADDRESSES,
  DEFAULT_MAX_RETRIES,
  DEFAULT_NETWORK,
  getAlchemyHttpUrl,
  getAlchemyNftHttpUrl
} from '../util/const';
import type { AlchemyWebSocketProvider } from './alchemy-websocket-provider';
import type { AlchemyProvider } from './alchemy-provider';
import { BigNumberish } from '@ethersproject/bignumber';
import { BaseNft, BaseNftContract, Nft, NftContract } from './nft';
import {
  getNftContractMetadata,
  getNftsForOwnerIterator,
  getNftMetadata,
  getNftsForOwner,
  getNftsForNftContract,
  getOwnersForNftContract,
  getOwnersForNft,
  getNftsForNftContractIterator,
  checkNftOwnership,
  isSpamNftContract,
  getSpamNftContracts,
  getNftFloorPrice,
  findContractDeployer,
  refreshNftMetadata
} from '../internal/nft-api';
import { formatBlock } from '../util/util';
import { toHex } from './util';

/**
 * The Alchemy SDK client. This class holds config information and provides
 * access to all of Alchemy's APIs.
 *
 * @public
 */
export class Alchemy {
  readonly apiKey: string;
  network: Network;
  readonly maxRetries: number;

  /** @internal */
  private _baseAlchemyProvider: AlchemyProvider | undefined;

  /** @internal */
  private _baseAlchemyWssProvider: AlchemyWebSocketProvider | undefined;

  /**
   * @param {string} [config.apiKey] - The API key to use for Alchemy
   * @param {Network} [config.network] - The network to use for Alchemy
   * @param {number} [config.maxRetries] - The maximum number of retries to attempt
   * @public
   */
  constructor(config?: AlchemyConfig) {
    this.apiKey = config?.apiKey || DEFAULT_ALCHEMY_API_KEY;
    this.network = config?.network || DEFAULT_NETWORK;
    this.maxRetries = config?.maxRetries || DEFAULT_MAX_RETRIES;
  }

  /** @internal */
  _getBaseUrl(): string {
    return getAlchemyHttpUrl(this.network, this.apiKey);
  }

  /** @internal */
  _getNftUrl(): string {
    return getAlchemyNftHttpUrl(this.network, this.apiKey);
  }

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
    return getNftMetadata(this, contractAddressOrBaseNft, tokenId, tokenType);
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
    return getNftContractMetadata(this, contractAddressOrBaseNftContract);
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
    return getNftsForOwnerIterator(this, owner, options);
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
    return getNftsForOwner(this, owner, options);
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
    return getNftsForNftContract(this, contractAddress, options);
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
    return getNftsForNftContractIterator(this, contractAddress, options);
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
    return getOwnersForNftContract(this, contractAddressOrNft);
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
    return getOwnersForNft(this, contractAddressOrNft, tokenId);
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
    return checkNftOwnership(this, owner, contractAddresses);
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
    return isSpamNftContract(this, contractAddress);
  }

  /**
   * Returns a list of all spam contracts marked by Alchemy. For details on how
   * Alchemy marks spam contracts, go to
   * https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/nft-api-faq#nft-spam-classification.
   *
   * @beta
   */
  getSpamNftContracts(): Promise<string[]> {
    return getSpamNftContracts(this);
  }

  /**
   * Returns the floor prices of a NFT contract by marketplace.
   *
   * @param contractAddress - The contract address for the NFT collection.
   * @beta
   */
  getNftFloorPrice(contractAddress: string): Promise<GetNftFloorPriceResponse> {
    return getNftFloorPrice(this, contractAddress);
  }

  /**
   * Finds the address that deployed the provided contract and block number it
   * was deployed in.
   *
   * NOTE: This method performs a binary search across all blocks since genesis
   * and can take a long time to complete. This method is a convenience method
   * that will eventually be replaced by a single call to an Alchemy endpoint
   * with this information cached.
   *
   * @param contractAddress - The contract address to find the deployer for.
   * @beta
   */
  findContractDeployer(contractAddress: string): Promise<DeployResult> {
    return findContractDeployer(this, contractAddress);
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
   * @param nft - The NFT to refresh the metadata for.
   */
  refreshNftMetadata(nft: BaseNft): Promise<boolean>;
  refreshNftMetadata(
    contractAddressOrBaseNft: string | BaseNft,
    tokenId?: BigNumberish
  ): Promise<boolean> {
    return refreshNftMetadata(this, contractAddressOrBaseNft, tokenId);
  }

  /**
   * Returns the token balances for a specific owner address given a list of contracts.
   *
   * @param address The owner address to get the token balances for.
   * @param contractAddresses A list of contract addresses to check. If omitted,
   *   the top 100 tokens by 24 hour volume will be checked.
   * @public
   */
  async getTokenBalances(
    address: string,
    contractAddresses?: string[]
  ): Promise<TokenBalancesResponse> {
    if (contractAddresses && contractAddresses.length > 1500) {
      throw new Error(
        'You cannot pass in more than 1500 contract addresses to getTokenBalances()'
      );
    }
    const provider = await this.getProvider();
    return provider.send('alchemy_getTokenBalances', [
      address,
      contractAddresses || DEFAULT_CONTRACT_ADDRESSES
    ]);
  }

  /**
   * Returns metadata for a given token contract address.
   *
   * @param address The contract address to get metadata for.
   * @public
   */
  async getTokenMetadata(address: string): Promise<TokenMetadataResponse> {
    const provider = await this.getProvider();
    return provider.send('alchemy_getTokenMetadata', [address]);
  }

  /**
   * Get transactions for specific addresses. See the web documentation for the
   * full details:
   * https://docs.alchemy.com/alchemy/enhanced-apis/transfers-api#alchemy_getassettransfers
   *
   * @param params An object containing fields for the asset transfer query.
   * @public
   */
  async getAssetTransfers(
    params: AssetTransfersParams
  ): Promise<AssetTransfersResponse> {
    const provider = await this.getProvider();
    return provider.send('alchemy_getAssetTransfers', [
      {
        ...params,
        fromBlock:
          params.fromBlock != null ? formatBlock(params.fromBlock) : undefined,
        toBlock:
          params.toBlock != null ? formatBlock(params.toBlock) : undefined,
        maxCount: params.maxCount != null ? toHex(params.maxCount) : undefined
      }
    ]);
  }

  /**
   * Gets all transaction receipts for a given block by number or block hash.
   *
   * @param params An object containing fields for the transaction receipt query.
   * @public
   */
  async getTransactionReceipts(
    params: TransactionReceiptsParams
  ): Promise<TransactionReceiptsResponse> {
    const provider = await this.getProvider();
    return provider.send('alchemy_getTransactionReceipts', [params]);
  }

  /**
   * Creates an AlchemyProvider instance. Only one provider is created per
   * Alchemy instance.
   *
   * @public
   */
  async getProvider(): Promise<AlchemyProvider> {
    if (!this._baseAlchemyProvider) {
      const { AlchemyProvider } = await import('./alchemy-provider');
      this._baseAlchemyProvider = new AlchemyProvider(
        this.network,
        this.apiKey,
        this.maxRetries
      );
    }
    return this._baseAlchemyProvider;
  }

  /**
   * Creates an AlchemyWebsocketProvider instance. Only one provider is created
   * per Alchemy instance.
   *
   * @public
   */
  async getWebsocketProvider(): Promise<AlchemyWebSocketProvider> {
    if (!this._baseAlchemyWssProvider) {
      const { AlchemyWebSocketProvider } = await import(
        './alchemy-websocket-provider'
      );
      this._baseAlchemyWssProvider = new AlchemyWebSocketProvider(
        this.network,
        this.apiKey
      );
    }
    return this._baseAlchemyWssProvider;
  }
}
