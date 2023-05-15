import { BaseNft, Nft, NftContract } from '../api/nft';
import { toHex } from '../api/util';
import {
  RawContractBaseNft,
  RawGetContractsForOwnerResponse,
  RawGetNftSalesResponse,
  RawNft,
  RawNftAttributeRarity,
  RawNftContractMetadataInfo,
  RawOwnedBaseNft
} from '../internal/raw-interfaces';
import {
  GetContractsForOwnerResponse,
  GetNftSalesResponse,
  NftAttributeRarity,
  NftSaleMarketplace,
  NftSaleTakerType,
  NftTokenType,
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
): T | null {
  return Object.values(enumb).includes(x as T) ? (x as T) : null;
}

export function getNftContractFromRaw(
  rawNftContract: RawNftContractMetadataInfo
): NftContract {
  return nullsToUndefined<NftContract>({
    ...rawNftContract,
    tokenType: parseNftTokenType(rawNftContract.tokenType),
    openSeaMetadata: {
      ...rawNftContract.openSeaMetadata,
      safelistRequestStatus:
        rawNftContract.openSeaMetadata.safelistRequestStatus !== null
          ? stringToEnum(
              rawNftContract.openSeaMetadata.safelistRequestStatus,
              OpenSeaSafelistRequestStatus
            )
          : null
    }
  });
}

export function getBaseNftFromRaw(rawBaseNft: RawOwnedBaseNft): BaseNft;
export function getBaseNftFromRaw(
  rawContractBaseNft: RawContractBaseNft,
  contractAddress: string
): BaseNft;
export function getBaseNftFromRaw(
  rawBaseNft: RawOwnedBaseNft | RawContractBaseNft,
  contractAddress?: string
): BaseNft {
  return {
    contractAddress: contractAddress
      ? contractAddress
      : (rawBaseNft as RawOwnedBaseNft).contractAddress,
    tokenId: rawBaseNft.tokenId
  };
}

export function getNftFromRaw(rawNft: RawNft): Nft {
  return nullsToUndefined<Nft>({
    ...rawNft,
    contract: getNftContractFromRaw(rawNft.contract),
    tokenType: parseNftTokenType(rawNft.tokenType)
  });
}

export function getNftSalesFromRaw(
  rawNftSales: RawGetNftSalesResponse
): GetNftSalesResponse {
  return nullsToUndefined<GetNftSalesResponse>({
    nftSales: rawNftSales.nftSales.map(rawNftSale => ({
      ...rawNftSale,
      marketplace: parseNftSaleMarketplace(rawNftSale.marketplace),
      taker: parseNftTaker(rawNftSale.taker)
    })),
    pageKey: rawNftSales.pageKey
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

export function getNftRarityFromRaw(
  rawNftRarity: RawNftAttributeRarity[]
): NftAttributeRarity[] {
  return rawNftRarity.map(({ prevalence, traitType, value }) => ({
    prevalence,
    traitType,
    value
  }));
}

export function getContractsForOwnerFromRaw(
  rawContractsForOwner: RawGetContractsForOwnerResponse
): GetContractsForOwnerResponse {
  return nullsToUndefined({
    contracts: rawContractsForOwner.contracts.map(getNftContractFromRaw),
    pageKey: rawContractsForOwner.pageKey,
    totalCount: rawContractsForOwner.totalCount
  });
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

export const IS_BROWSER = typeof window !== 'undefined' && window !== null;

/** Recursively converts all `null` fields to `undefined. */
// TODO: Add typing support so it doesn't return `any`.
export function nullsToUndefined<X>(obj: unknown): X {
  if (obj === null) {
    return undefined as any;
  }

  // if `obj` is an object, recursively convert all `null` fields to `undefined`.
  if (typeof obj === 'object') {
    for (const key in obj) {
      (obj as any)[key] = nullsToUndefined((obj as any)[key]);
    }
  }
  return obj as any;
}
