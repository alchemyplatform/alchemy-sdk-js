import { BigNumber } from 'ethers';
import { RawBaseNftContract, RawNftContract } from '../internal/raw-interfaces';
import { BaseNftContract, NftContract } from './nft';

/**
 * Converts a hex string to a decimal number.
 *
 * @param hexString - The hex string to convert.
 * @public
 */
export function fromHex(hexString: string): number {
  return BigNumber.from(hexString).toNumber();
}

/**
 * Converts a number to a hex string.
 *
 * @param num - The number to convert to hex.
 * @public
 */
export function toHex(num: number): string {
  return BigNumber.from(num).toHexString();
}

/**
 * Checks if a value is a hex string.
 *
 * @param possibleHexString - The value to check.
 * @public
 */
export function isHex(possibleHexString: string): boolean {
  return /^0x[0-9a-fA-F]+$/.test(possibleHexString);
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
    tokenType: rawNftContract.contractMetadata.tokenType
  };
}
