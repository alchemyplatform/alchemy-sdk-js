/**
 * Converts a hex string to a decimal number.
 *
 * @param hexString The hex string to convert.
 */
import { BigNumber } from 'ethers';

export function fromHex(hexString: string): number {
  return BigNumber.from(hexString).toNumber();
}

/**
 * Converts a number to a hex string.
 *
 * @param num The number to convert to hex.
 */
export function toHex(num: number): string {
  return BigNumber.from(num).toHexString();
}

/**
 * Checks if a value is a hex string.
 *
 * @param possibleHexString The value to check.
 */
export function isHex(possibleHexString: string): boolean {
  return /^0x[0-9a-fA-F]+$/.test(possibleHexString);
}
