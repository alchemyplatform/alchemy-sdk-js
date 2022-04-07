import { NftMetadata, NftTokenType, TokenUri } from '../types/types';
import { RawBaseNft, RawNft } from '../internal/raw-interfaces';

/**
 * Alchemy representation of a base NFT that doesn't contain metadata.
 *
 * @public
 */
export class BaseNft {
  /**
   * This constructor should never be called directly. All Nft instances should
   * be created from a backend response via the `fromResponse` method.
   *
   * @hideconstructor
   */
  constructor(
    /** The NFT contract address. */
    readonly address: string,
    /** The NFT token ID as a hex string */
    readonly tokenId: string,
    /** The type of ERC token, if known. */
    readonly tokenType: NftTokenType
  ) {}

  /**
   * @internal
   */
  static fromResponse(ownedNft: RawBaseNft, contractAddress: string): BaseNft {
    return new BaseNft(
      contractAddress,
      ownedNft.id.tokenId,
      ownedNft.id.tokenMetadata?.tokenType ?? NftTokenType.UNKNOWN
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

  /**
   * When the NFT was last updated in the blockchain. Represented in ISO-8601
   * format.
   */
  readonly timeLastUpdated: string;

  /**
   * Holds an error message if there was an issue fetching metadata.
   */
  readonly error: string | undefined;
  readonly rawMetadata: NftMetadata | undefined;
  readonly tokenUri: TokenUri | undefined;
  readonly media: TokenUri[] = [];

  /**
   * This constructor should never be called directly. All Nft instances should
   * be created from a backend response via the `fromResponse` method.
   *
   * @hideconstructor
   */
  constructor(
    address: string,
    tokenId: string,
    tokenType: NftTokenType,
    title: string,
    description: string,
    timeLastUpdated: string,
    tokenUri?: TokenUri,
    media?: TokenUri[],
    metadata?: NftMetadata,
    error?: string
  ) {
    super(address, tokenId, tokenType);
    this.title = title;
    this.description = description;
    this.timeLastUpdated = timeLastUpdated;
    this.error = error;
    this.rawMetadata = metadata;
    this.tokenUri = Nft.parseTokenUri(tokenUri);
    this.media = Nft.parseTokenUriArray(media);
  }

  /**
   * @internal
   */
  static fromResponse(ownedNft: RawNft, contractAddress: string): Nft {
    return new Nft(
      contractAddress,
      ownedNft.id.tokenId,
      ownedNft.id.tokenMetadata?.tokenType ?? NftTokenType.UNKNOWN,
      ownedNft.title,
      ownedNft.description,
      ownedNft.timeLastUpdated,
      ownedNft.tokenUri,
      ownedNft.media,
      ownedNft.metadata,
      ownedNft.error
    );
  }

  /**
   * Returns undefined if the uri has empty string fields.
   *
   * @private
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
   * @private
   */
  private static parseTokenUriArray(arr: TokenUri[] | undefined): TokenUri[] {
    if (arr === undefined) {
      return [];
    }
    return arr.filter(uri => this.parseTokenUri(uri) !== undefined);
  }
}
