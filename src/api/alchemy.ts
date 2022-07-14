import {
  AlchemyConfig,
  AlchemyEventType,
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
  RefreshNftContractResult,
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
  refreshNftMetadata,
  refreshNftContract
} from '../internal/nft-api';
import { formatBlock } from '../util/util';
import { toHex } from './util';
import type { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import type {
  Block,
  BlockTag,
  BlockWithTransactions,
  FeeData,
  TransactionRequest,
  Listener,
  TransactionReceipt,
  TransactionResponse
} from '@ethersproject/abstract-provider';
import type { Network as EthersNetworkAlias } from '@ethersproject/networks';
import type { Deferrable } from '@ethersproject/properties';
import {
  Filter,
  FilterByBlockHash,
  Log
} from '@ethersproject/abstract-provider';

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
  private _baseAlchemyProvider: Promise<AlchemyProvider> | undefined;

  /** @internal */
  private _baseAlchemyWssProvider:
    | Promise<AlchemyWebSocketProvider>
    | undefined;

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
    return refreshNftMetadata(this, contractAddressOrBaseNft, tokenId);
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
    return refreshNftContract(this, contractAddressOrBaseNft);
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
   * Returns the balance of a given address as of the provided block.
   *
   * @param addressOrName The address or name of the account to get the balance for.
   * @param blockTag The optional block number or hash to get the balance for.
   *   Defaults to 'latest' if unspecified.
   * @public
   */
  async getBalance(
    addressOrName: string | Promise<string>,
    blockTag?: BlockTag | Promise<BlockTag>
  ): Promise<BigNumber> {
    const provider = await this.getProvider();
    return provider.getBalance(addressOrName, blockTag);
  }

  /**
   * Returns the contract code of the provided address at the block. If there is
   * no contract deployed, the result is `0x`.
   *
   * @param addressOrName The address or name of the account to get the code for.
   * @param blockTag The optional block number or hash to get the code for.
   *   Defaults to 'latest' if unspecified.
   * @public
   */
  async getCode(
    addressOrName: string | Promise<string>,
    blockTag?: BlockTag | Promise<BlockTag>
  ): Promise<string> {
    const provider = await this.getProvider();
    return provider.getCode(addressOrName, blockTag);
  }

  /**
   * Return the value of the provided position at the provided address, at the
   * provided block in `Bytes32` format.
   *
   * @param addressOrName The address or name of the account to get the code for.
   * @param position The position of the storage slot to get.
   * @param blockTag The optional block number or hash to get the code for.
   *   Defaults to 'latest' if unspecified.
   * @public
   */
  async getStorageAt(
    addressOrName: string | Promise<string>,
    position: BigNumberish | Promise<BigNumberish>,
    blockTag?: BlockTag | Promise<BlockTag>
  ): Promise<string> {
    const provider = await this.getProvider();
    return provider.getStorageAt(addressOrName, position, blockTag);
  }

  /**
   * Returns the number of transactions ever sent from the provided address, as
   * of the provided block tag. This value is used as the nonce for the next
   * transaction from the address sent to the network.
   *
   * @param addressOrName The address or name of the account to get the nonce for.
   * @param blockTag The optional block number or hash to get the nonce for.
   * @public
   */
  async getTransactionCount(
    addressOrName: string | Promise<string>,
    blockTag?: BlockTag | Promise<BlockTag>
  ): Promise<number> {
    const provider = await this.getProvider();
    return provider.getTransactionCount(addressOrName, blockTag);
  }

  /**
   * Returns the block from the network based on the provided block number or
   * hash. Transactions on the block are represented as an array of transaction
   * hashes. To get the full transaction details on the block, use
   * {@link getBlockWithTransactions} instead.
   *
   * @param blockHashOrBlockTag The block number or hash to get the block for.
   * @public
   */
  async getBlock(
    blockHashOrBlockTag: BlockTag | string | Promise<BlockTag | string>
  ): Promise<Block> {
    const provider = await this.getProvider();
    return provider.getBlock(blockHashOrBlockTag);
  }

  /**
   * Returns the block from the network based on the provided block number or
   * hash. Transactions on the block are represented as an array of
   * {@link TransactionResponse} objects.
   *
   * @param blockHashOrBlockTag The block number or hash to get the block for.
   * @public
   */
  async getBlockWithTransactions(
    blockHashOrBlockTag: BlockTag | string | Promise<BlockTag | string>
  ): Promise<BlockWithTransactions> {
    const provider = await this.getProvider();
    return provider.getBlockWithTransactions(blockHashOrBlockTag);
  }

  /**
   * Returns the {@link EthersNetworkAlias} Alchemy is connected to.
   *
   * @public
   */
  async getNetwork(): Promise<EthersNetworkAlias> {
    const provider = await this.getProvider();
    return provider.getNetwork();
  }

  /**
   * Returns the block number of the most recently mined block.
   *
   * @public
   */
  async getBlockNumber(): Promise<number> {
    const provider = await this.getProvider();
    return provider.getBlockNumber();
  }

  /**
   * Returns the best guess of the current gas price to use in a transaction.
   *
   * @public
   */
  async getGasPrice(): Promise<BigNumber> {
    const provider = await this.getProvider();
    return provider.getGasPrice();
  }

  /**
   * Returns the recommended fee data to use in a transaction.
   *
   * For an EIP-1559 transaction, the maxFeePerGas and maxPriorityFeePerGas
   * should be used.
   *
   * For legacy transactions and networks which do not support EIP-1559, the
   * gasPrice should be used.
   *
   * @public
   */
  async getFeeData(): Promise<FeeData> {
    const provider = await this.getProvider();
    return provider.getFeeData();
  }

  /**
   * Returns a Promise which will stall until the network has heen established,
   * ignoring errors due to the target node not being active yet.
   *
   * This can be used for testing or attaching scripts to wait until the node is
   * up and running smoothly.
   *
   * @public
   */
  async ready(): Promise<EthersNetworkAlias> {
    const provider = await this.getProvider();
    return provider.ready;
  }

  /**
   * Returns the result of executing the transaction, using call. A call does
   * not require any ether, but cannot change any state. This is useful for
   * calling getters on Contracts.
   *
   * @param transaction The transaction to execute.
   * @param blockTag The optional block number or hash to get the call for.
   * @public
   */
  async call(
    transaction: Deferrable<TransactionRequest>,
    blockTag?: BlockTag | Promise<BlockTag>
  ): Promise<string> {
    const provider = await this.getProvider();
    return provider.call(transaction, blockTag);
  }

  /**
   * Returns an estimate of the amount of gas that would be required to submit
   * transaction to the network.
   *
   * An estimate may not be accurate since there could be another transaction on
   * the network that was not accounted for, but after being mined affects the
   * relevant state.
   *
   * @param transaction The transaction to estimate gas for.
   * @public
   */
  async estimateGas(
    transaction: Deferrable<TransactionRequest>
  ): Promise<BigNumber> {
    const provider = await this.getProvider();
    return provider.estimateGas(transaction);
  }

  /**
   * Returns the transaction with hash or null if the transaction is unknown.
   *
   * If a transaction has not been mined, this method will search the
   * transaction pool. Various backends may have more restrictive transaction
   * pool access (e.g. if the gas price is too low or the transaction was only
   * recently sent and not yet indexed) in which case this method may also return null.
   *
   * @param transactionHash The hash of the transaction to get.
   * @public
   */
  async getTransaction(
    transactionHash: string | Promise<string>
  ): Promise<TransactionResponse | null> {
    const provider = await this.getProvider();
    return provider.getTransaction(transactionHash);
  }

  /**
   * Returns the transaction receipt for hash or null if the transaction has not
   * been mined.
   *
   * To stall until the transaction has been mined, consider the
   * waitForTransaction method below.
   *
   * @param transactionHash The hash of the transaction to get.
   * @public
   */
  async getTransactionReceipt(
    transactionHash: string | Promise<string>
  ): Promise<TransactionReceipt | null> {
    const provider = await this.getProvider();
    return provider.getTransactionReceipt(transactionHash);
  }

  /**
   * Submits transaction to the network to be mined. The transaction must be
   * signed, and be valid (i.e. the nonce is correct and the account has
   * sufficient balance to pay for the transaction).
   *
   * @param signedTransaction The signed transaction to send.
   * @public
   */
  async sendTransaction(
    signedTransaction: string | Promise<string>
  ): Promise<TransactionResponse> {
    const provider = await this.getProvider();
    return provider.sendTransaction(signedTransaction);
  }

  /**
   * Returns a promise which will not resolve until specified transaction hash is mined.
   *
   * If {@link confirmations} is 0, this method is non-blocking and if the
   * transaction has not been mined returns null. Otherwise, this method will
   * block until the transaction has confirmed blocks mined on top of the block
   * in which it was mined.
   *
   * @param transactionHash The hash of the transaction to wait for.
   * @param confirmations The number of blocks to wait for.
   * @param timeout The maximum time to wait for the transaction to confirm.
   * @public
   */
  async waitForTransaction(
    transactionHash: string,
    confirmations?: number,
    timeout?: number
  ): Promise<TransactionReceipt | null> {
    const provider = await this.getProvider();
    return provider.waitForTransaction(transactionHash, confirmations, timeout);
  }

  /**
   * Returns an array of logs that match the provided filter.
   *
   * @param filter The filter object to use.
   * @public
   */
  async getLogs(
    filter: Filter | FilterByBlockHash | Promise<Filter | FilterByBlockHash>
  ): Promise<Array<Log>> {
    const provider = await this.getProvider();
    return provider.getLogs(filter);
  }

  /**
   * Allows sending a raw message to the Alchemy backend.
   *
   * @param method The method to call.
   * @param params The parameters to pass to the method.
   * @public
   */
  async send(method: string, params: Array<any>): Promise<any> {
    const provider = await this.getProvider();
    return provider.send(method, params);
  }

  /**
   * Adds a listener to be triggered for each {@link eventName} event. Also
   * includes Alchemy's Subscription API events. See {@link AlchemyEventType} for
   * how to use them.
   *
   * @param eventName The event to listen for.
   * @param listener The listener to call when the event is triggered.
   * @public
   */
  on(eventName: AlchemyEventType, listener: Listener): this {
    void (async () => {
      const provider = await this.getWebSocketProvider();
      provider.on(eventName, listener);
    })();
    return this;
  }

  /**
   * Adds a listener to be triggered for only the next {@link eventName} event,
   * after which it will be removed. Also includes Alchemy's Subscription API
   * events. See {@link AlchemyEventType} for how to use them.
   *
   * @param eventName The event to listen for.
   * @param listener The listener to call when the event is triggered.
   * @public
   */
  once(eventName: AlchemyEventType, listener: Listener): this {
    void (async () => {
      const provider = await this.getWebSocketProvider();
      provider.once(eventName, listener);
    })();
    return this;
  }

  /**
   * Removes the provided {@link listener} for the {@link eventName} event. If no
   * listener is provided, all listeners for the event will be removed.
   *
   * @param eventName The event to unlisten to.
   * @param listener The listener to remove.
   * @public
   */
  off(eventName: AlchemyEventType, listener?: Listener): this {
    void (async () => {
      const provider = await this.getWebSocketProvider();
      return provider.off(eventName, listener);
    })();
    return this;
  }

  /**
   * Remove all listeners for the provided {@link eventName} event. If no event
   * is provided, all events and their listeners are removed.
   *
   * @param eventName The event to remove all listeners for.
   * @public
   */
  removeAllListeners(eventName?: AlchemyEventType): this {
    void (async () => {
      const provider = await this.getWebSocketProvider();
      provider.removeAllListeners(eventName);
    })();
    return this;
  }

  /**
   * Returns the number of listeners for the provided {@link eventName} event. If
   * no event is provided, the total number of listeners for all events is returned.
   *
   * @param eventName The event to get the number of listeners for.
   * @public
   */
  async listenerCount(eventName?: AlchemyEventType): Promise<number> {
    const provider = await this.getWebSocketProvider();
    return provider.listenerCount(eventName);
  }

  /**
   * Returns an array of listeners for the provided {@link eventName} event. If
   * no event is provided, all listeners will be included.
   *
   * @param eventName The event to get the listeners for.
   */
  async listeners(eventName?: AlchemyEventType): Promise<Listener[]> {
    const provider = await this.getWebSocketProvider();
    return provider.listeners(eventName);
  }

  /**
   * Returns an AlchemyProvider instance. Only one provider is created per
   * Alchemy instance.
   *
   * The AlchemyProvider is a wrapper around ether's `AlchemyProvider` class and
   * has been expanded to support Alchemy's Enhanced APIs.
   *
   * Most common methods on the provider are available as top-level methods on
   * the {@link Alchemy} instance, but the provider is exposed here to access
   * other less-common methods.
   *
   * @public
   */
  getProvider(): Promise<AlchemyProvider> {
    if (!this._baseAlchemyProvider) {
      this._baseAlchemyProvider = (async () => {
        const { AlchemyProvider } = await import('./alchemy-provider');
        return new AlchemyProvider(this.network, this.apiKey, this.maxRetries);
      })();
    }
    return this._baseAlchemyProvider;
  }

  /**
   * Returns an AlchemyWebsocketProvider instance. Only one provider is created
   * per Alchemy instance.
   *
   * The AlchemyWebSocketProvider is a wrapper around ether's
   * `AlchemyWebSocketProvider` class and has been expanded to support Alchemy's
   * Subscription APIs, automatic backfilling, and other performance improvements.
   *
   * Most common methods on the provider are available as top-level methods on
   * the {@link Alchemy} instance, but the provider is exposed here to access
   * other less-common methods.
   *
   * @public
   */
  getWebSocketProvider(): Promise<AlchemyWebSocketProvider> {
    if (!this._baseAlchemyWssProvider) {
      this._baseAlchemyWssProvider = (async () => {
        const { AlchemyWebSocketProvider } = await import(
          './alchemy-websocket-provider'
        );
        return new AlchemyWebSocketProvider(this.network, this.apiKey);
      })();
    }
    return this._baseAlchemyWssProvider;
  }
}
