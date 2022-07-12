import { Media, NftMetadata, NftTokenType, TokenUri } from '../types/types';

/**
 * Alchemy representation of a base NFT contract that doesn't contain metadata.
 *
 * @public
 */
export interface BaseNftContract {
  address: string;
}

/**
 * Alchemy representation of an NFT contract.
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
  /** The number of NFTs in the contract. */
  totalSupply?: number;
}

/**
 * Alchemy representation of a base NFT that doesn't contain metadata.
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
 * @public
 */
export interface Nft extends BaseNft {
  /** The NFT title. */
  title: string;

  /** The NFT description. */
  description: string;

  /** When the NFT was last updated in the blockchain. Represented in ISO-8601 format. */
  timeLastUpdated: string;

  /** Holds an error message if there was an issue fetching metadata. */
  metadataError: string | undefined;

  /**
   * The raw metadata fetched from the metadata URL specified by the NFT. The
   * field is undefined if Alchemy was unable to fetch metadata.
   */
  rawMetadata: NftMetadata | undefined;

  /** URIs for accessing the NFT's metadata blob. */
  tokenUri: TokenUri | undefined;

  /** URIs for accessing the NFT's media assets. */
  media: Media[];
}
