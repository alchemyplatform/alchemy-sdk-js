import { AddressWebhookParams, Network, Webhook } from '../types/types';
import { validateSolanaAddresses } from '../util/solana';

export async function createAddressWebhook(
  params: AddressWebhookParams
): Promise<Webhook> {
  const { appId, addresses, network, name } = params;

  // Validate addresses based on network
  if (network === Network.SOLANA_MAINNET || network === Network.SOLANA_DEVNET) {
    const invalidAddresses = validateSolanaAddresses(addresses);
    if (invalidAddresses.length > 0) {
      throw new Error(`Invalid Solana addresses: ${invalidAddresses.join(', ')}`);
    }
  }

  // TODO: Implement the actual webhook creation logic
  throw new Error('Not implemented');
} 