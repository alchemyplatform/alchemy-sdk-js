import { Alchemy, Network, WebhookType } from '../../src';
import { NotifyNamespace } from '../../src/api/notify-namespace';

describe('NotifyNamespace', () => {
  let alchemy: Alchemy;
  let notify: NotifyNamespace;

  beforeEach(() => {
    alchemy = new Alchemy({
      apiKey: 'test-api-key',
      network: Network.ETH_MAINNET,
      authToken: 'test-auth-token'
    });
    notify = alchemy.notify;
  });

  describe('createWebhook', () => {
    it('should throw an error when both network and networks are provided', async () => {
      const params = {
        filters: [{ contractAddress: '0x123' }],
        network: Network.ETH_MAINNET,
        networks: [Network.ETH_MAINNET, Network.ETH_SEPOLIA]
      };

      await expect(
        notify.createWebhook(
          'https://example.com/webhook',
          WebhookType.NFT_ACTIVITY,
          params
        )
      ).rejects.toThrow(
        'Cannot specify both `network` and `networks`. Use `networks` for multi-chain support.'
      );
    });

    it('should throw an error for address activity webhook with both network and networks', async () => {
      const params = {
        addresses: ['0x123'],
        network: Network.ETH_MAINNET,
        networks: [Network.ETH_MAINNET, Network.ETH_SEPOLIA]
      };

      await expect(
        notify.createWebhook(
          'https://example.com/webhook',
          WebhookType.ADDRESS_ACTIVITY,
          params
        )
      ).rejects.toThrow(
        'Cannot specify both `network` and `networks`. Use `networks` for multi-chain support.'
      );
    });

    it('should throw an error for custom graphql webhook with both network and networks', async () => {
      const params = {
        graphqlQuery: '{ block { number } }',
        network: Network.ETH_MAINNET,
        networks: [Network.ETH_MAINNET, Network.ETH_SEPOLIA],
        appId: 'test-app-id'
      };

      await expect(
        notify.createWebhook(
          'https://example.com/webhook',
          WebhookType.GRAPHQL,
          params
        )
      ).rejects.toThrow(
        'Cannot specify both `network` and `networks`. Use `networks` for multi-chain support.'
      );
    });
  });
});
