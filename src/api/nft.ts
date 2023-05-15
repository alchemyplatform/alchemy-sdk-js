import {
  NftImage,
  NftSpamClassification,
  NftTokenType,
  OpenSeaCollectionMetadata,
  TokenUri
} from '../types/types';

/**
 * Alchemy representation of an NFT contract.
 *
 * The BaseNftContract does not hold any metadata information and only contains
 * the address. The NftContract additionally contains the tokenType, name,
 * symbol, and more.
 *
 * @public
 */
export interface NftContract {
  /** The address of the NFT contract. */
  address: string;
  /** The type of the token in the contract. */
  tokenType: NftTokenType;
  /** The name of the contract. */
  name?: string;
  /** The symbol of the contract. */
  symbol?: string;
  /**
   * The number of NFTs in the contract as an integer string. This field is only
   * available on ERC-721 contracts.
   */
  totalSupply?: string;
  /** OpenSea's metadata for the contract. */
  openSeaMetadata: OpenSeaCollectionMetadata;
  /** The address that deployed the NFT contract. */
  contractDeployer?: string;
  /** The block number the NFT contract deployed in. */
  deployedBlockNumber?: number;
}

export interface NftContractMetadata extends NftContract {
  isSpam?: boolean;
  spamClassifications: NftSpamClassification[];
}

/**
 * Alchemy representation of an NFT that doesn't contain metadata.
 *
 * The BaseNft object does not hold any metadata information and only contains
 * the NFT contract and token ID. The Nft object additionally contains the NFT
 * metadata, token URI information, and media.
 *
 * @public
 */
export interface BaseNft {
  /** The contract address of the NFT. */
  contractAddress: string;
  /** The NFT token ID as an integer string. */
  tokenId: string;
}

/**
 * Alchemy representation of an NFT.
 *
 * The BaseNft object does not hold any metadata information and only contains
 * the NFT contract and token ID. The Nft object additionally contains the NFT
 * metadata, token URI information, and media.
 *
 * @public
 */
export interface Nft {
  /** The NFT's underlying contract and relevant contract metadata. */
  contract: NftContractMetadata;

  /** The NFT token ID as an integer string. */
  tokenId: string;

  /** The type of NFT.*/
  tokenType: NftTokenType;

  /** The NFT name. */
  name?: string;

  /** The NFT description. */
  description?: string;

  image: NftImage;

  raw: NftRawMetadata;

  /** Holds an error message if there was an issue fetching metadata. */
  metadataError: string | undefined;

  /** URIs for accessing the NFT's metadata blob. */
  tokenUri?: TokenUri;

  /** When the NFT was last updated in the blockchain. Represented in ISO-8601 format. */
  timeLastUpdated: string;
}

export interface NftRawMetadata {
  tokenUri?: string;
  metadata: Record<string, any>;
  error?: string;
}
