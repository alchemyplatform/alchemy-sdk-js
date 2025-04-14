import { PublicKey } from '@solana/web3.js';

/**
 * Validates a Solana address
 * @param address The address to validate
 * @returns true if the address is valid, false otherwise
 */
export function isValidSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Validates an array of Solana addresses
 * @param addresses The addresses to validate
 * @returns An array of invalid addresses, empty if all are valid
 */
export function validateSolanaAddresses(addresses: string[]): string[] {
  return addresses.filter(address => !isValidSolanaAddress(address));
} 