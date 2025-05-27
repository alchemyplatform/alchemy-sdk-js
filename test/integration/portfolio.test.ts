import { Alchemy, Network } from '../../src';
import { PortfolioAddress } from '../../src/types/portfolio-types';
import { loadAlchemyEnv } from '../test-util';

jest.setTimeout(50000);

describe('Portfolio API Integration Tests', () => {
  let alchemy: Alchemy;

  beforeAll(async () => {
    await loadAlchemyEnv();
    alchemy = new Alchemy({
      apiKey: process.env.ALCHEMY_API_KEY
    });
  });

  describe('getTokensByWallet()', () => {
    it('should get nfts for a wallet', async () => {
      const addresses: PortfolioAddress[] = [
        {
          networks: [Network.ETH_MAINNET],
          address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599' // WBTC
        },
        {
          networks: [Network.MATIC_MAINNET],
          address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619' // WETH on Polygon
        }
      ];

      const response = await alchemy.portfolio.getTokensByWallet(addresses);

      expect(response.data).toBeDefined();
      expect(response.data.pageKey).toBeDefined();
      expect(response.data.tokens.length).toBe(100);

      const wbtcResult = response.data.tokens.filter(
        result => result.address === addresses[0].address
      )[0];
      expect(wbtcResult.network).toBe('eth-mainnet');
      expect(wbtcResult.address).toBe(addresses[0].address);
      expect(wbtcResult.tokenMetadata).toBeDefined();
      expect(wbtcResult.tokenPrices).toBeDefined();
      expect(wbtcResult.tokenBalance).toBeDefined();
    });

    it('should handle invalid addresses', async () => {
      const addresses: PortfolioAddress[] = [
        {
          networks: [Network.ETH_MAINNET],
          address: 'fx0000000000000000000000000000000000000000'
        }
      ];

      await expect(
        alchemy.portfolio.getTokensByWallet(addresses)
      ).rejects.toThrow();
    });

    it('should handle invalid networks', async () => {
      const addresses: PortfolioAddress[] = [
        {
          networks: ['invalid-network' as any],
          address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
        }
      ];

      await expect(
        alchemy.portfolio.getTokensByWallet(addresses)
      ).rejects.toThrow();
    });
  });

  describe('getTokenBalancesByWallet()', () => {
    it('should get token balances for a wallet', async () => {
      const addresses: PortfolioAddress[] = [
        {
          networks: [Network.ETH_MAINNET],
          address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599' // WBTC
        },
        {
          networks: [Network.MATIC_MAINNET],
          address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619' // WETH on Polygon
        }
      ];

      const response = await alchemy.portfolio.getTokenBalancesByWallet(
        addresses
      );

      expect(response.data).toBeDefined();
      expect(response.data.pageKey).toBeDefined();
      expect(response.data.tokens.length).toBe(100);

      const wbtcBalance = response.data.tokens.filter(
        balance => balance.address === addresses[0].address
      )[0];
      expect(wbtcBalance.network).toBe('eth-mainnet');
      expect(wbtcBalance.address).toBe(addresses[0].address);
      expect(wbtcBalance.tokenBalance).toBeDefined();
    });

    it('should handle invalid addresses', async () => {
      const addresses: PortfolioAddress[] = [
        {
          networks: [Network.ETH_MAINNET],
          address: 'fx0000000000000000000000000000000000000000'
        }
      ];

      await expect(
        alchemy.portfolio.getTokenBalancesByWallet(addresses)
      ).rejects.toThrow();
    });

    it('should handle invalid networks', async () => {
      const addresses: PortfolioAddress[] = [
        {
          networks: ['invalid-network' as any],
          address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
        }
      ];

      await expect(
        alchemy.portfolio.getTokenBalancesByWallet(addresses)
      ).rejects.toThrow();
    });
  });

  describe('getNFTsByWallet()', () => {
    it('should fetch NFTs for a wallet', async () => {
      const addresses: PortfolioAddress[] = [
        {
          networks: [Network.ETH_MAINNET],
          address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599' // WBTC
        },
        {
          networks: [Network.MATIC_MAINNET],
          address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619' // WETH on Polygon
        }
      ];

      const response = await alchemy.portfolio.getNftsByWallet(addresses);

      expect(response.data).toBeDefined();
      expect(response.data.ownedNfts.length).toBeGreaterThan(1);

      const firstWalletNfts = response.data.ownedNfts;
      expect(firstWalletNfts).toBeDefined();
      expect(Array.isArray(firstWalletNfts)).toBe(true);

      const totalCount = response.data.totalCount;
      expect(totalCount).toBeDefined();
      expect(typeof totalCount).toBe('number');

      const pageKey = response.data.pageKey;
      expect(pageKey).toBeDefined();
      expect(typeof pageKey).toBe('string');

      const allNetworks = new Set(
        response.data.ownedNfts.map(nft => nft.network)
      );
      expect(allNetworks.size).toBe(2);
      expect(allNetworks.has(addresses[0].networks[0])).toBe(true);
      expect(allNetworks.has(addresses[1].networks[0])).toBe(true);
    });

    it('should handle invalid addresses', async () => {
      const addresses: PortfolioAddress[] = [
        {
          networks: [Network.ETH_MAINNET],
          address: 'fx0000000000000000000000000000000000000000'
        }
      ];

      await expect(
        alchemy.portfolio.getNftsByWallet(addresses)
      ).rejects.toThrow();
    });

    it('should handle invalid networks', async () => {
      const addresses: PortfolioAddress[] = [
        {
          networks: ['invalid-network' as any],
          address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
        }
      ];

      await expect(
        alchemy.portfolio.getNftsByWallet(addresses)
      ).rejects.toThrow();
    });
  });

  describe('getNFTCollectionsByWallet()', () => {
    it('should fetch NFT collections for a wallet', async () => {
      const addresses: PortfolioAddress[] = [
        {
          networks: [Network.ETH_MAINNET],
          address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599' // WBTC
        },
        {
          networks: [Network.MATIC_MAINNET],
          address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619' // WETH on Polygon
        }
      ];

      const response = await alchemy.portfolio.getNftCollectionsByWallet(
        addresses
      );

      expect(response.data).toBeDefined();
      expect(response.data.contracts).toBeDefined();
      expect(Array.isArray(response.data.contracts)).toBe(true);
      expect(response.data.contracts.length).toBeGreaterThan(0);

      const firstContract = response.data.contracts[0];
      expect(firstContract).toBeDefined();
      expect(firstContract.network).toBeDefined();
      expect(firstContract.address).toBeDefined();
      expect(firstContract.contract).toBeDefined();

      const totalNetworks = new Set(
        response.data.contracts.map(contract => contract.network)
      );
      expect(totalNetworks.has(addresses[0].networks[0])).toBe(true);
      expect(totalNetworks.has(addresses[1].networks[0])).toBe(true);
    });

    it('should handle invalid addresses', async () => {
      const addresses: PortfolioAddress[] = [
        {
          networks: [Network.ETH_MAINNET],
          address: 'fx0000000000000000000000000000000000000000'
        }
      ];

      await expect(
        alchemy.portfolio.getNftCollectionsByWallet(addresses)
      ).rejects.toThrow();
    });

    it('should handle invalid networks', async () => {
      const addresses: PortfolioAddress[] = [
        {
          networks: ['invalid-network' as any],
          address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
        }
      ];

      await expect(
        alchemy.portfolio.getNftCollectionsByWallet(addresses)
      ).rejects.toThrow();
    });
  });

  describe('getTransactionsByWallet()', () => {
    it('should fetch transactions for a wallet', async () => {
      const addresses: PortfolioAddress[] = [
        {
          networks: [Network.ETH_MAINNET],
          address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599' // WBTC
        }
      ];

      const response = await alchemy.portfolio.getTransactionsByWallet(
        addresses
      );

      expect(response).toBeDefined();
      expect(response.transactions).toBeDefined();
      expect(Array.isArray(response.transactions)).toBe(true);
      expect(response.transactions.length).toBeGreaterThan(1);

      const firstTransaction = response.transactions[0];
      expect(firstTransaction).toBeDefined();
      expect(firstTransaction).toHaveProperty('hash');
      expect(firstTransaction).toHaveProperty('blockTimestamp');
      expect(firstTransaction).toHaveProperty('blockNumber');
      expect(firstTransaction).toHaveProperty('blockHash');
      expect(firstTransaction).toHaveProperty('nonce');
      expect(firstTransaction).toHaveProperty('transactionIndex');
      expect(firstTransaction).toHaveProperty('fromAddress');
      expect(firstTransaction).toHaveProperty('toAddress');
      expect(firstTransaction).toHaveProperty('contractAddress');
      expect(firstTransaction).toHaveProperty('value');
      expect(firstTransaction).toHaveProperty('gasPrice');
      expect(firstTransaction).toHaveProperty('gas');
      expect(firstTransaction).toHaveProperty('network');
      expect(firstTransaction).toHaveProperty('logs');
      expect(firstTransaction).toHaveProperty('internalTransactions');

      expect(typeof response.totalCount).toBe('number');
      expect(response.after).toBeDefined();
      expect(typeof response.after).toBe('string');

      // Make a second request with the `after` parameter
      const secondResponse = await alchemy.portfolio.getTransactionsByWallet(
        addresses,
        undefined,
        response.after
      );

      expect(secondResponse).toBeDefined();
      expect(secondResponse.transactions).toBeDefined();
      expect(Array.isArray(secondResponse.transactions)).toBe(true);
      expect(secondResponse.transactions.length).toBeGreaterThan(0);

      expect(typeof secondResponse.before).toBe('string');
    });

    it('should handle invalid addresses', async () => {
      const addresses: PortfolioAddress[] = [
        {
          networks: [Network.ETH_MAINNET],
          address: 'fx0000000000000000000000000000000000000000'
        }
      ];

      const response = await alchemy.portfolio.getTransactionsByWallet(
        addresses
      );

      expect(response).toBeDefined();
      expect(response.after).toBe('');
      expect(response.totalCount).toBe(0);
      expect(response.transactions).toEqual([]);
    });

    it('should handle invalid networks', async () => {
      const addresses: PortfolioAddress[] = [
        {
          networks: ['invalid-network' as any],
          address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
        }
      ];

      await expect(
        alchemy.portfolio.getTransactionsByWallet(addresses)
      ).rejects.toThrow();
    });

    it('does not support multiple addresses', async () => {
      const addresses: PortfolioAddress[] = [
        {
          networks: [Network.ETH_MAINNET],
          address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
        },
        {
          networks: [Network.MATIC_MAINNET],
          address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'
        }
      ];

      await expect(
        alchemy.portfolio.getTransactionsByWallet(addresses)
      ).rejects.toThrow(
        'Only one address is supported in the `addresses` field for now.'
      );
    });
  });
});
