import { BigNumber } from '@ethersproject/bignumber';

import { BaseNft, Nft, NftContract } from '../api/nft';
import { toHex } from '../api/util';
import {
  RawBaseNft,
  RawContractBaseNft,
  RawGetContractsForOwnerResponse,
  RawGetNftSalesResponse,
  RawNft,
  RawNftAttributeRarity,
  RawNftContract,
  RawOpenSeaCollectionMetadata
} from '../internal/raw-interfaces';
import {
  GetContractsForOwnerResponse,
  GetNftSalesResponse,
  NftAttributeRarity,
  NftSaleMarketplace,
  NftSaleTakerType,
  NftTokenType,
  OpenSeaCollectionMetadata,
  OpenSeaSafelistRequestStatus
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
  return nullsToUndefined({
    ...rawNftContract,
    tokenType: parseNftTokenType(rawNftContract.tokenType),
    openSeaMetadata: parseOpenSeaMetadata(rawNftContract.openSeaMetadata)
  });
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
    tokenId: BigNumber.from(rawBaseNft.tokenId).toString(),
    tokenType: NftTokenType.UNKNOWN
  };
}

export function getNftFromRaw(rawNft: RawNft): Nft {
  try {
    // TODO(v3): do you still need this?
    const tokenType = parseNftTokenType(rawNft.tokenType);

    // TODO(v3): add new types in to make errors go away.
    const nftFields = {
      ...rawNft,
      contract: {
        ...rawNft.contract,
        tokenType,
        openSeaMetadata: parseOpenSeaMetadata(rawNft.contract.openSeaMetadata)
      },
      tokenId: parseNftTokenId(rawNft.tokenId),
      tokenType,
      description: parseNftDescription(rawNft.description),
      // TODO(v3): move this field into the `contract.raw` object.
      metadataError: rawNft.error
    };
    return nullsToUndefined(nftFields);
  } catch (e) {
    throw new Error('Error parsing the NFT response: ' + e);
  }
}

export function getNftSalesFromRaw(
  rawNftSales: RawGetNftSalesResponse
): GetNftSalesResponse {
  return nullsToUndefined({
    pageKey: rawNftSales.pageKey,
    nftSales: rawNftSales.nftSales.map(rawNftSale => ({
      ...rawNftSale,
      marketplace: parseNftSaleMarketplace(rawNftSale.marketplace),
      taker: parseNftTaker(rawNftSale.taker),
      protocolFee: rawNftSale.protocolFee ?? undefined,
      royaltyFee: rawNftSale.royaltyFee ?? undefined
    }))
  });
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

// TODO(v3): remove this function once backend updates `trait_type`
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
  return nullsToUndefined({
    pageKey: rawContractsForOwner?.pageKey,
    totalCount: rawContractsForOwner.totalCount,
    contracts: rawContractsForOwner.contracts.map(contract => {
      return {
        ...getNftContractFromRaw(contract),
        totalBalance: contract.totalBalance,
        numDistinctTokensOwned: contract.numDistinctTokensOwned,
        tokenId: contract.tokenId
      };
    })
  });
}

function parseNftTokenId(tokenId: string): string {
  // We have to normalize the token id here since the backend sometimes
  // returns the token ID as a hex string and sometimes as an integer.
  return BigNumber.from(tokenId).toString();
}

function parseNftTokenType(tokenType: string | undefined): NftTokenType {
  switch (tokenType) {
    case 'ERC721':
      return NftTokenType.ERC721;
    case 'ERC1155':
      return NftTokenType.ERC1155;
    default:
      return NftTokenType.UNKNOWN;
  }
}

// TODO(v3): verify backend state to remove this function.
function parseNftDescription(description?: string | string[] | null): string {
  if (description === undefined || description === null) {
    return '';
  }

  // TODO(v3): Remove after backend adds JSON stringification.
  if (!Array.isArray(description) && typeof description === 'object') {
    return JSON.stringify(description);
  }

  return typeof description === 'string' ? description : description.join(' ');
}

// TODO(v3): Remove `null` from param after backend always returns the field.
export function parseOpenSeaMetadata(
  openSeaMetadata: RawOpenSeaCollectionMetadata | null
): OpenSeaCollectionMetadata | undefined {
  if (openSeaMetadata === null) {
    return undefined;
  }
  return nullsToUndefined({
    ...openSeaMetadata,
    safelistRequestStatus: openSeaMetadata.safelistRequestStatus
      ? stringToEnum(
          openSeaMetadata.safelistRequestStatus,
          OpenSeaSafelistRequestStatus
        )
      : undefined
  });
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
