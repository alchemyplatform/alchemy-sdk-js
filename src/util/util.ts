import { BigNumber } from '@ethersproject/bignumber';

import { BaseNft, BaseNftContract, Nft, NftContract } from '../api/nft';
import { toHex } from '../api/util';
import {
  RawBaseNft,
  RawBaseNftContract,
  RawContractBaseNft,
  RawNft,
  RawNftAttributeRarity,
  RawNftContract,
  RawSpamInfo
} from '../internal/raw-interfaces';
import {
  NftAttributeRarity,
  NftTokenType,
  OpenSeaSafelistRequestStatus,
  SpamInfo,
  TokenUri
} from '../types/types';

export function formatBlock(block: string | number): string {
  if (typeof block === 'string') {
    return block;
  } else if (Number.isInteger(block)) {
    return toHex(block);
  }
  return block.toString();
}

function stringToEnum<T extends string>(
  x: string,
  enumb: Record<string, T>
): T | undefined {
  return Object.values(enumb).includes(x as T) ? (x as T) : undefined;
}

export function getBaseNftContractFromRaw(
  rawBaseNftContract: RawBaseNftContract
): BaseNftContract {
  return { address: rawBaseNftContract.address };
}

export function getNftContractFromRaw(
  rawNftContract: RawNftContract
): NftContract {
  const contract: NftContract = {
    address: rawNftContract.address,
    name: rawNftContract.contractMetadata.name,
    symbol: rawNftContract.contractMetadata.symbol,
    totalSupply: rawNftContract.contractMetadata.totalSupply,
    tokenType: parseNftTokenType(rawNftContract.contractMetadata.tokenType)
  };
  if (rawNftContract.contractMetadata.openSea) {
    const safeListStatus =
      rawNftContract.contractMetadata.openSea?.safelistRequestStatus;
    contract.openSea = {
      floorPrice: rawNftContract.contractMetadata.openSea?.floorPrice,
      collectionName: rawNftContract.contractMetadata.openSea?.collectionName,
      safelistRequestStatus:
        safeListStatus !== undefined
          ? stringToEnum(safeListStatus, OpenSeaSafelistRequestStatus)
          : undefined,
      imageUrl: rawNftContract.contractMetadata.openSea?.imageUrl,
      description: rawNftContract.contractMetadata.openSea?.description,
      externalUrl: rawNftContract.contractMetadata.openSea?.externalUrl,
      twitterUsername: rawNftContract.contractMetadata.openSea?.twitterUsername,
      discordUrl: rawNftContract.contractMetadata.openSea?.discordUrl,
      lastIngestedAt: rawNftContract.contractMetadata.openSea?.lastIngestedAt
    };
  }

  return contract;
}

export function getBaseNftFromRaw(rawBaseNft: RawBaseNft): BaseNft;
export function getBaseNftFromRaw(
  rawContractBaseNft: RawContractBaseNft,
  contractAddress: string
): BaseNft;
export function getBaseNftFromRaw(
  rawBaseNft: RawBaseNft | RawContractBaseNft,
  contractAddress?: string
): BaseNft {
  return {
    contract: contractAddress
      ? { address: contractAddress }
      : (rawBaseNft as RawBaseNft).contract,
    tokenId: BigNumber.from(rawBaseNft.id.tokenId).toString(),
    tokenType: parseNftTokenType(rawBaseNft.id.tokenMetadata?.tokenType)
  };
}

export function getNftFromRaw(rawNft: RawNft): Nft {
  const tokenType = parseNftTokenType(rawNft.id.tokenMetadata?.tokenType);
  const spamInfo = parseSpamInfo(rawNft.spamInfo);
  return {
    contract: {
      address: rawNft.contract.address,
      name: rawNft.contractMetadata?.name,
      symbol: rawNft.contractMetadata?.symbol,
      totalSupply: rawNft.contractMetadata?.totalSupply,
      tokenType
    },
    tokenId: parseNftTokenId(rawNft.id.tokenId),
    tokenType,
    title: rawNft.title,
    description: parseNftDescription(rawNft.description),
    timeLastUpdated: rawNft.timeLastUpdated,
    metadataError: rawNft.error,
    rawMetadata: rawNft.metadata,
    tokenUri: parseNftTokenUri(rawNft.tokenUri),
    media: parseNftTokenUriArray(rawNft.media),
    spamInfo
  };
}

export function getNftRarityFromRaw(
  rawNftRarity: RawNftAttributeRarity[]
): NftAttributeRarity[] {
  return rawNftRarity.map(({ prevalence, trait_type, value }) => ({
    prevalence,
    traitType: trait_type,
    value
  }));
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

function parseSpamInfo(
  spamInfo: RawSpamInfo | undefined
): SpamInfo | undefined {
  if (!spamInfo) {
    return undefined;
  }
  const { isSpam, classifications } = spamInfo;
  return {
    isSpam: isSpam === 'true',
    classifications
  };
}

function parseNftDescription(description?: string | string[]): string {
  if (description === undefined) {
    return '';
  }

  // TODO: Remove after backend adds JSON stringification.
  if (!Array.isArray(description) && typeof description === 'object') {
    return JSON.stringify(description);
  }

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

export const IS_BROWSER = typeof window !== 'undefined' && window !== null;
