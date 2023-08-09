import { BigNumber } from '@ethersproject/bignumber';

import { BaseNft, Nft, NftCollection, NftContract } from '../api/nft';
import { toHex } from '../api/util';
import {
  RawBaseNft,
  RawContractBaseNft,
  RawGetContractsForOwnerResponse,
  RawGetNftSalesResponse,
  RawNft,
  RawNftAttributeRarity,
  RawNftCollection,
  RawNftContract,
  RawOpenSeaCollectionMetadata,
  RawSpamInfo
} from '../internal/raw-interfaces';
import {
  GetContractsForOwnerResponse,
  GetNftSalesResponse,
  NftAttributeRarity,
  NftSaleMarketplace,
  NftSaleTakerType,
  NftTokenType,
  OpenSeaCollectionMetadata,
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

export function getNftContractFromRaw(
  rawNftContract: RawNftContract
): NftContract {
  return {
    address: rawNftContract.address,
    name: rawNftContract.contractMetadata.name,
    symbol: rawNftContract.contractMetadata.symbol,
    totalSupply: rawNftContract.contractMetadata.totalSupply,
    tokenType: parseNftTokenType(rawNftContract.contractMetadata.tokenType),
    openSea: parseOpenSeaMetadata(rawNftContract.contractMetadata.openSea),
    contractDeployer: rawNftContract.contractMetadata.contractDeployer,
    deployedBlockNumber: rawNftContract.contractMetadata.deployedBlockNumber
  };
}

export function getNftCollectionFromRaw(
  rawNftCollection: RawNftCollection
): NftCollection {
  // No transformation needed.
  return rawNftCollection;
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
  try {
    const tokenType = parseNftTokenType(rawNft.id.tokenMetadata?.tokenType);
    const spamInfo = parseSpamInfo(rawNft.spamInfo);

    return {
      contract: {
        address: rawNft.contract.address,
        name: rawNft.contractMetadata?.name,
        symbol: rawNft.contractMetadata?.symbol,
        totalSupply: rawNft.contractMetadata?.totalSupply,
        tokenType,
        openSea: parseOpenSeaMetadata(rawNft.contractMetadata?.openSea),
        contractDeployer: rawNft.contractMetadata?.contractDeployer,
        deployedBlockNumber: rawNft.contractMetadata?.deployedBlockNumber
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
      spamInfo,
      acquiredAt: rawNft.acquiredAt
    };
  } catch (e) {
    throw new Error('Error parsing the NFT response: ' + e);
  }
}

export function getNftSalesFromRaw(
  rawNftSales: RawGetNftSalesResponse
): GetNftSalesResponse {
  return {
    nftSales: rawNftSales.nftSales.map(rawNftSale => ({
      marketplace: parseNftSaleMarketplace(rawNftSale.marketplace),
      contractAddress: rawNftSale.contractAddress,
      tokenId: rawNftSale.tokenId,
      quantity: rawNftSale.quantity,
      buyerAddress: rawNftSale.buyerAddress,
      sellerAddress: rawNftSale.sellerAddress,
      taker: parseNftTaker(rawNftSale.taker),
      sellerFee: rawNftSale?.sellerFee,
      marketplaceFee: rawNftSale?.protocolFee,
      protocolFee: rawNftSale?.protocolFee,
      royaltyFee: rawNftSale?.royaltyFee,
      blockNumber: rawNftSale?.blockNumber,
      logIndex: rawNftSale.logIndex,
      bundleIndex: rawNftSale.bundleIndex,
      transactionHash: rawNftSale.transactionHash
    })),
    validAt: {
      blockNumber: rawNftSales.validAt.blockNumber,
      blockHash: rawNftSales.validAt.blockHash ?? undefined,
      blockTimestamp: rawNftSales.validAt.blockTimestamp ?? undefined
    },
    pageKey: rawNftSales?.pageKey
  };
}

function parseNftSaleMarketplace(marketplace: string): NftSaleMarketplace {
  switch (marketplace) {
    case 'looksrare':
      return NftSaleMarketplace.LOOKSRARE;
    case 'seaport':
      return NftSaleMarketplace.SEAPORT;
    case 'x2y2':
      return NftSaleMarketplace.X2Y2;
    case 'wyvern':
      return NftSaleMarketplace.WYVERN;
    case 'cryptopunks':
      return NftSaleMarketplace.CRYPTOPUNKS;
    case 'blur':
      return NftSaleMarketplace.BLUR;
    default:
      return NftSaleMarketplace.UNKNOWN;
  }
}

function parseNftTaker(taker: string): NftSaleTakerType {
  // The `.toLowerCase()` call is needed because the API returns the capitalized values
  switch (taker.toLowerCase()) {
    case 'buyer':
      return NftSaleTakerType.BUYER;
    case 'seller':
      return NftSaleTakerType.SELLER;
    default:
      throw new Error(`Unsupported NftSaleTakerType ${taker}`);
  }
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

export function getContractsForOwnerFromRaw(
  rawContractsForOwner: RawGetContractsForOwnerResponse
): GetContractsForOwnerResponse {
  return {
    pageKey: rawContractsForOwner?.pageKey,
    totalCount: rawContractsForOwner.totalCount,
    contracts: rawContractsForOwner.contracts.map(contract => {
      return {
        address: contract.address,
        totalSupply: contract.totalSupply,
        isSpam: contract.isSpam,
        media: contract.media,
        numDistinctTokensOwned: contract.numDistinctTokensOwned,
        tokenId: contract.tokenId,
        totalBalance: contract.totalBalance,
        name: contract.name,
        title: contract.title,
        openSea: parseOpenSeaMetadata(contract?.opensea),
        symbol: contract?.symbol,
        tokenType: parseNftTokenType(contract?.tokenType),
        contractDeployer: contract.contractDeployer,
        deployedBlockNumber: contract.deployedBlockNumber
      };
    })
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
    case 'no_supported_nft_standard':
    case 'NO_SUPPORTED_NFT_STANDARD':
      return NftTokenType.NO_SUPPORTED_NFT_STANDARD;
    case 'not_a_contract':
    case 'NOT_A_CONTRACT':
      return NftTokenType.NOT_A_CONTRACT;
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

export function parseOpenSeaMetadata(
  openSea: RawOpenSeaCollectionMetadata | undefined
): OpenSeaCollectionMetadata | undefined {
  if (openSea === undefined) {
    return undefined;
  }
  return {
    floorPrice: openSea.floorPrice,
    collectionName: openSea.collectionName,
    safelistRequestStatus:
      openSea.safelistRequestStatus !== undefined
        ? stringToEnum(
            openSea.safelistRequestStatus,
            OpenSeaSafelistRequestStatus
          )
        : undefined,
    imageUrl: openSea.imageUrl,
    description: openSea.description,
    externalUrl: openSea.externalUrl,
    twitterUsername: openSea.twitterUsername,
    discordUrl: openSea.discordUrl,
    lastIngestedAt: openSea.lastIngestedAt
  };
}

export const IS_BROWSER = typeof window !== 'undefined' && window !== null;

/** Recursively converts all `null` fields to `undefined. */
// TODO: Add typing support so it doesn't return `any`.
export function nullsToUndefined<T>(obj: T): any {
  if (obj === null) {
    return undefined as any;
  }

  // if `obj` is an object, recursively convert all `null` fields to `undefined`.
  if (typeof obj === 'object') {
    for (const key in obj) {
      obj[key] = nullsToUndefined(obj[key]) as any;
    }
  }
  return obj as any;
}
