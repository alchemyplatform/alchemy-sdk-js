import {
  NftMetadata,
  NftSpamClassification,
  NftTokenType,
  OpenSeaCollectionMetadata
} from '../types/types';

/**
 * Alchemy representation of a base NFT contract that doesn't contain metadata.
 *
 * The BaseNftContract does not hold any metadata information and only contains
 * the address. The NftContract additionally contains the tokenType, name,
 * symbol, and more.
 *
 * @public
 */
export interface BaseNftContract {
  /** The address of the contract. */
  address: string;
}

/**
 * Alchemy representation of an NFT contract.
 *
 * The BaseNftContract does not hold any metadata information and only contains
 * the address. The NftContract additionally contains the tokenType, name,
 * symbol, and more.
 *
 * @public
 */
export interface NftContract extends BaseNftContract {
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
  /** The address that deployed the NFT contract. */
  contractDeployer?: string;
  /** OpenSea's metadata for the contract. */
  openSeaMetadata: OpenSeaCollectionMetadata;
  /** The block number the NFT contract deployed in. */
  deployedBlockNumber?: number;
  /** Whether the NFT was marked as spam. */
  isSpam?: boolean;
  /** */
  classifications: NftSpamClassification[];
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
  contract: BaseNftContract;
  /** The NFT token ID as an integer string. */
  tokenId: string;
  /** The type of ERC token, if known. */
  tokenType: NftTokenType;
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
export interface Nft extends BaseNft {
  /** The NFT's underlying contract and relevant contract metadata. */
  contract: NftContract;

  /** The NFT title. */
  name?: string;

  /** The NFT description. */
  description?: string;

  /** When the NFT was last updated in the blockchain. Represented in ISO-8601 format. */
  timeLastUpdated: string;

  /** Holds an error message if there was an issue fetching metadata. */
  metadataError?: string;

  /**
   * The raw metadata fetched from the metadata URL specified by the NFT. The
   * field is undefined if Alchemy was unable to fetch metadata.
   */
  raw: NftRawFields;

  isSpam?: boolean;
  classification: NftSpamClassification[];
  openSeaMetadata: OpenSeaCollectionMetadata;
  image: NftImage;
}

export interface NftImage {
  originalUrl?: string;
  cachedUrl?: string;
  thumbnailUrl?: string;
  pngUrl?: string;
  contentType?: string;
  size?: number;
}

export interface NftRawFields {
  tokenUri?: string;
  metadata: NftMetadata;
}
