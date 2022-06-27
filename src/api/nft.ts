import { NftMetadata, NftTokenType, TokenUri } from '../types/types';
import { RawBaseNft, RawNft } from '../internal/raw-interfaces';
import { BigNumber } from 'ethers';
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
export class BaseNft {
  readonly contract: BaseNftContract;

  /**
   * This constructor should never be called directly. All Nft instances should
   * be created from a backend response via the `fromResponse` method.
   */
  protected constructor(
    address: string,
    /** The NFT token ID as an integer string. */
    readonly tokenId: string,
    /** The type of ERC token, if known. */
    readonly tokenType: NftTokenType
  ) {
    this.contract = { address };
  }

  /** @internal */
  static fromResponse(baseNft: RawBaseNft, contractAddress: string): BaseNft {
    return new BaseNft(
      contractAddress,
      // We have to normalize the token id here since the backend sometimes
      // returns the token ID as a hex string and sometimes as an integer.
      BigNumber.from(baseNft.id.tokenId).toString(),
      baseNft.id.tokenMetadata?.tokenType ?? NftTokenType.UNKNOWN
    );
  }
}

/**
 * Alchemy representation of an NFT.
 *
 * @public
 */
export class Nft extends BaseNft {
  /** The NFT title. */
  readonly title: string;

  /** The NFT description. */
  readonly description: string;

  /** When the NFT was last updated in the blockchain. Represented in ISO-8601 format. */
  readonly timeLastUpdated: string;

  /** Holds an error message if there was an issue fetching metadata. */
  readonly metadataError: string | undefined;

  /**
   * The raw metadata fetched from the metadata URL specified by the NFT. The
   * field is undefined if Alchemy was unable to fetch metadata.
   */
  readonly rawMetadata: NftMetadata | undefined;

  /** URIs for accessing the NFT's metadata blob. */
  readonly tokenUri: TokenUri | undefined;

  /** URIs for accessing the NFT's media assets. */
  readonly media: TokenUri[] = [];

  /**
   * This constructor should never be called directly. All Nft instances should
   * be created from a backend response via the `fromResponse` method.
   *
   * @internal
   */
  private constructor(
    address: string,
    tokenId: string,
    tokenType: NftTokenType,
    title: string,
    description: string | Array<string>,
    timeLastUpdated: string,
    tokenUri?: TokenUri,
    media?: TokenUri[],
    metadata?: NftMetadata,
    error?: string
  ) {
    super(address, tokenId, tokenType);
    this.title = title;
    this.description = Nft.parseDescription(description);
    this.timeLastUpdated = timeLastUpdated;
    this.metadataError = error;
    this.rawMetadata = metadata;
    this.tokenUri = Nft.parseTokenUri(tokenUri);
    this.media = Nft.parseTokenUriArray(media);
  }

  /** @internal */
  static fromResponse(nft: RawNft, contractAddress: string): Nft {
    return new Nft(
      contractAddress,
      // We have to normalize the token id here since the backend sometimes
      // returns the token ID as a hex string and sometimes as an integer string.
      BigNumber.from(nft.id.tokenId).toString(),
      nft.id.tokenMetadata?.tokenType ?? NftTokenType.UNKNOWN,
      nft.title,
      nft.description,
      nft.timeLastUpdated,
      nft.tokenUri,
      nft.media,
      nft.metadata,
      nft.error
    );
  }

  /** @internal */
  private static parseDescription(description: string | Array<string>): string {
    return typeof description === 'string'
      ? description
      : description.join(' ');
  }

  /**
   * Returns undefined if the uri has empty string fields.
   *
   * @internal
   */
  private static parseTokenUri(
    uri: TokenUri | undefined
  ): TokenUri | undefined {
    if (uri && uri.raw.length === 0 && uri.gateway.length == 0) {
      return undefined;
    }
    return uri;
  }

  /**
   * Removes empty URIs from the array.
   *
   * @internal
   */
  private static parseTokenUriArray(arr: TokenUri[] | undefined): TokenUri[] {
    if (arr === undefined) {
      return [];
    }
    return arr.filter(uri => this.parseTokenUri(uri) !== undefined);
  }
}
