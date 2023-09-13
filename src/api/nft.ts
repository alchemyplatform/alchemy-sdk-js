import {
  AcquiredAt,
  NftImage,
  NftMint,
  NftSpamClassification,
  NftTokenType,
  OpenSeaBaseCollectionMetadata,
  OpenSeaCollectionMetadata
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

/** NFT contract metadata with spam information. */
export interface NftContractForNft extends NftContract {
  /** Whether the NFT contract is marked as spam. */
  isSpam?: boolean;
  /** Potential reasons why an NFT Contract was classified as spam. */
  spamClassifications: NftSpamClassification[];
}

/**
 * Alchemy representation of an NFT collection
 *
 * @public
 */
export interface NftCollection {
  /** The name of the collection. */
  name: string;
  /** The OpenSea human-readable slug of the collection. */
  openSeaSlug?: string;
  /** OpenSea-specific collection metadata such as floor price. */
  openSea?: OpenSeaBaseCollectionMetadata;
  /** The description of the collection. */
  description?: string;
  /** The homepage of the collection as determined by OpenSea. */
  externalUrl?: string;
  /** The Twitter handle of the collection. */
  twitterUsername?: string;
  /** The Discord URL of the collection. */
  discordUrl?: string;
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
  contract: NftContractForNft;
  /** The NFT token ID as an integer string. */
  tokenId: string;
  /** The type of NFT.*/
  tokenType: NftTokenType;
  /** The NFT name. */
  name?: string;
  /** The NFT description. */
  description?: string;
  /** Media URLs and information for the NFT */
  image: NftImage;
  /** The raw metadata for the NFT based on the metadata URI on the NFT contract. */
  raw: NftRawMetadata;
  /** URIs for accessing the NFT's metadata blob. */
  tokenUri?: string;
  /** When the NFT was last updated in the blockchain. Represented in ISO-8601 format. */
  timeLastUpdated: string;
  /**
   * Time at which the NFT was most recently acquired by the user. Only
   * available when specifying `orderBy: NftOrdering.TRANSFERTIME` in the
   * request.
   */
  acquiredAt?: AcquiredAt;
  /** Collection metadata for the NFT, if available. */
  collection?: BaseNftCollection;
  /** Mint information for the NFT. */
  mint?: NftMint;
}

/**
 * A base collection object as part of an {@link Nft}.
 */
export interface BaseNftCollection {
  /** The name of the collection. */
  name: string;
  /** The OpenSea human-readable slug of the collection. */
  slug?: string;
  /** The external URL for the collection. */
  externalUrl?: string;
  /** The banner image URL for the collection. */
  bannerImageUrl?: string;
}

/**
 * The raw metadata for the NFT based on the metadata URI on the NFT contract.
 */
export interface NftRawMetadata {
  /** The raw token URI on the NFT contract. */
  tokenUri?: string;
  /** The raw metadata parsed from the raw token URI. */
  metadata: Record<string, any>;
  /** Error message if the raw metadata could not be fetched. */
  error?: string;
}
