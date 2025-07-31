import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { Alchemy, Network, WebhookType } from '../../src';
import { NotifyNamespace } from '../../src/api/notify-namespace';
import { RawWebhook } from '../../src/internal/raw-interfaces';

describe('NotifyNamespace', () => {
  let alchemy: Alchemy;
  let notify: NotifyNamespace;
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    alchemy = new Alchemy({
      apiKey: 'test-api-key',
      network: Network.ETH_MAINNET,
      authToken: 'test-auth-token'
    });
    notify = alchemy.notify;
  });

  afterEach(() => {
    mock.restore();
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

    it('should create NFT activity webhook with networks array', async () => {
      const mockResponse: RawWebhook = {
        id: 'test-webhook-id',
        networks: ['ETH_MAINNET', 'ETH_SEPOLIA'],
        webhook_type: 'NFT_ACTIVITY',
        webhook_url: 'https://example.com/webhook',
        is_active: true,
        time_created: Date.now(),
        signing_key: 'test-signing-key',
        version: 'V2'
      };

      mock.onPost().reply(200, { data: mockResponse });

      const params = {
        filters: [{ contractAddress: '0x123' }],
        networks: [Network.ETH_MAINNET, Network.ETH_SEPOLIA]
      };

      const webhook = await notify.createWebhook(
        'https://example.com/webhook',
        WebhookType.NFT_ACTIVITY,
        params
      );

      expect(webhook.id).toBe('test-webhook-id');
      expect(webhook.networks).toEqual([
        Network.ETH_MAINNET,
        Network.ETH_SEPOLIA
      ]);
      expect(webhook.network).toBe(Network.ETH_MAINNET); // Should default to first network

      // Verify the request was sent with networks array
      const requestData = JSON.parse(mock.history.post[0].data);
      expect(requestData.networks).toEqual(['ETH_MAINNET', 'ETH_SEPOLIA']);
      expect(requestData.network).toBeUndefined();
    });

    it('should create address activity webhook with networks array', async () => {
      const mockResponse: RawWebhook = {
        id: 'test-webhook-id',
        networks: ['ETH_MAINNET', 'MATIC_MAINNET'],
        webhook_type: 'ADDRESS_ACTIVITY',
        webhook_url: 'https://example.com/webhook',
        is_active: true,
        time_created: Date.now(),
        signing_key: 'test-signing-key',
        version: 'V2'
      };

      mock.onPost().reply(200, { data: mockResponse });

      const params = {
        addresses: ['0x123', '0x456'],
        networks: [Network.ETH_MAINNET, Network.MATIC_MAINNET]
      };

      const webhook = await notify.createWebhook(
        'https://example.com/webhook',
        WebhookType.ADDRESS_ACTIVITY,
        params
      );

      expect(webhook.networks).toEqual([
        Network.ETH_MAINNET,
        Network.MATIC_MAINNET
      ]);

      const requestData = JSON.parse(mock.history.post[0].data);
      expect(requestData.networks).toEqual(['ETH_MAINNET', 'MATIC_MAINNET']);
      expect(requestData.network).toBeUndefined();
    });

    it('should convert single network to networks array in request', async () => {
      const mockResponse: RawWebhook = {
        id: 'test-webhook-id',
        network: 'ETH_MAINNET', // Server might still return single network
        webhook_type: 'NFT_ACTIVITY',
        webhook_url: 'https://example.com/webhook',
        is_active: true,
        time_created: Date.now(),
        signing_key: 'test-signing-key',
        version: 'V2'
      };

      mock.onPost().reply(200, { data: mockResponse });

      const params = {
        filters: [{ contractAddress: '0x123' }],
        network: Network.ETH_MAINNET // Using deprecated single network
      };

      const webhook = await notify.createWebhook(
        'https://example.com/webhook',
        WebhookType.NFT_ACTIVITY,
        params
      );

      expect(webhook.networks).toEqual([Network.ETH_MAINNET]);

      // Verify the request was sent with networks array even though network was provided
      const requestData = JSON.parse(mock.history.post[0].data);
      expect(requestData.networks).toEqual(['ETH_MAINNET']);
      expect(requestData.network).toBeUndefined();
    });

    it('should use default network as networks array when neither is specified', async () => {
      const mockResponse: RawWebhook = {
        id: 'test-webhook-id',
        networks: ['ETH_MAINNET'],
        webhook_type: 'NFT_ACTIVITY',
        webhook_url: 'https://example.com/webhook',
        is_active: true,
        time_created: Date.now(),
        signing_key: 'test-signing-key',
        version: 'V2'
      };

      mock.onPost().reply(200, { data: mockResponse });

      const params = {
        filters: [{ contractAddress: '0x123' }]
        // No network or networks specified
      };

      const webhook = await notify.createWebhook(
        'https://example.com/webhook',
        WebhookType.NFT_ACTIVITY,
        params
      );

      expect(webhook.networks).toEqual([Network.ETH_MAINNET]);

      // Verify the request used the default network from config
      const requestData = JSON.parse(mock.history.post[0].data);
      expect(requestData.networks).toEqual(['ETH_MAINNET']);
      expect(requestData.network).toBeUndefined();
    });
  });
});
