import { BigNumber } from '@ethersproject/bignumber';
import { BaseNft, BaseNftContract, Nft, NftContract } from '../api/nft';
import { toHex } from '../api/util';
import {
  RawBaseNft,
  RawBaseNftContract,
  RawNft,
  RawNftContract
} from '../internal/raw-interfaces';
import { NftTokenType, TokenUri } from '../types/types';

export function formatBlock(block: string | number): string {
  if (typeof block === 'string') {
    return block;
  } else if (Number.isInteger(block)) {
    return toHex(block);
  }
  return block.toString();
}

export function getBaseNftContractFromRaw(
  rawBaseNftContract: RawBaseNftContract
): BaseNftContract {
  return { address: rawBaseNftContract.address };
}

export function getNftContractFromRaw(
  rawNftContract: RawNftContract
): NftContract {
  return {
    address: rawNftContract.address,
    name: rawNftContract.contractMetadata.name,
    symbol: rawNftContract.contractMetadata.symbol,
    totalSupply: rawNftContract.contractMetadata.totalSupply,
    tokenType: parseNftTokenType(rawNftContract.contractMetadata.tokenType)
  };
}

export function getBaseNftFromRaw(
  rawBaseNft: RawBaseNft,
  contractAddress: string
): BaseNft {
  return {
    contract: { address: contractAddress },
    tokenId: BigNumber.from(rawBaseNft.id.tokenId).toString(),
    tokenType: parseNftTokenType(rawBaseNft.id.tokenMetadata?.tokenType)
  };
}

export function getNftFromRaw(rawNft: RawNft, contractAddress: string): Nft {
  return {
    contract: { address: contractAddress },
    tokenId: parseNftTokenId(rawNft.id.tokenId),
    tokenType: parseNftTokenType(rawNft.id.tokenMetadata?.tokenType),
    title: rawNft.title,
    description: parseNftDescription(rawNft.description),
    timeLastUpdated: rawNft.timeLastUpdated,
    metadataError: rawNft.error,
    rawMetadata: rawNft.metadata,
    tokenUri: parseNftTokenUri(rawNft.tokenUri),
    media: parseNftTokenUriArray(rawNft.media)
  };
}

function parseNftTokenId(tokenId: string): string {
  // We have to normalize the token id here since the backend sometimes
  // returns the token ID as a hex string and sometimes as an integer.
  return BigNumber.from(tokenId).toString();
}

function parseNftTokenType(tokenType: string | undefined): NftTokenType {
  switch (tokenType) {
    case 'erc721':
    case 'ERC721':
      return NftTokenType.ERC721;
    case 'erc1155':
    case 'ERC1155':
      return NftTokenType.ERC1155;
    default:
      return NftTokenType.UNKNOWN;
  }
}

function parseNftDescription(description: string | string[]): string {
  return typeof description === 'string' ? description : description.join(' ');
}

function parseNftTokenUri(uri: TokenUri | undefined): TokenUri | undefined {
  if (uri && uri.raw.length === 0 && uri.gateway.length == 0) {
    return undefined;
  }
  return uri;
}

function parseNftTokenUriArray(arr: TokenUri[] | undefined): TokenUri[] {
  if (arr === undefined) {
    return [];
  }
  return arr.filter(uri => parseNftTokenUri(uri) !== undefined);
}

/** Recursively strips any undefined values from the provided object. */
export function stripUndefined(obj: { [key: string]: any }): {
  [key: string]: any;
} {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object') {
      obj[key] = stripUndefined(obj[key]);
    }
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
}
