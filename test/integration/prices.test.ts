import { Alchemy, Network } from '../../src';
import {
  HistoricalPriceInterval,
  TokenAddressRequest
} from '../../src/types/prices-types';
import { loadAlchemyEnv } from '../test-util';

jest.setTimeout(50000);

describe('Prices API Integration Tests', () => {
  let alchemy: Alchemy;

  beforeAll(async () => {
    await loadAlchemyEnv();
    alchemy = new Alchemy({
      apiKey: process.env.ALCHEMY_API_KEY
    });
  });

  describe('getTokenPriceByAddress()', () => {
    it('should get token prices by address', async () => {
      const addresses: TokenAddressRequest[] = [
        {
          network: Network.ETH_MAINNET,
          address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599' // WBTC
        },
        {
          network: Network.MATIC_MAINNET,
          address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619' // WETH on Polygon
        }
      ];

      const response = await alchemy.prices.getTokenPriceByAddress(addresses);

      expect(response.data).toBeDefined();
      expect(response.data.length).toBe(2);

      // Check WBTC response
      const wbtcResult = response.data.filter(
        result => result.address === addresses[0].address
      )[0];
      expect(wbtcResult.network).toBe('eth-mainnet');
      expect(wbtcResult.address).toBe(addresses[0].address);
      expect(wbtcResult.prices.length).toBeGreaterThan(0);
      expect(wbtcResult.error).toBeUndefined();
      expect(parseFloat(wbtcResult.prices[0].value)).toBeGreaterThan(0);
      expect(wbtcResult.prices[0].currency).toBe('usd');
      expect(new Date(wbtcResult.prices[0].lastUpdatedAt)).toBeTruthy();

      // Check WETH response
      const wethResult = response.data.filter(
        result => result.address === addresses[1].address
      )[0];
      expect(wethResult.network).toBe('polygon-mainnet');
      expect(wethResult.address).toBe(addresses[1].address);
      expect(wethResult.error).toBeUndefined();
      expect(parseFloat(wethResult.prices[0].value)).toBeGreaterThan(0);
      expect(wethResult.prices[0].currency).toBe('usd');
      expect(new Date(wethResult.prices[0].lastUpdatedAt)).toBeTruthy();
    });

    it('should handle invalid addresses', async () => {
      const addresses: TokenAddressRequest[] = [
        {
          network: Network.ETH_MAINNET,
          address: '0x0000000000000000000000000000000000000000'
        }
      ];

      const response = await alchemy.prices.getTokenPriceByAddress(addresses);

      expect(response.data).toBeDefined();
      expect(response.data.length).toBe(1);
      expect(response.data[0].error).toBeDefined();
      expect(response.data[0].prices).toHaveLength(0);
    });

    it('should handle invalid networks', async () => {
      const addresses: TokenAddressRequest[] = [
        {
          network: 'invalid-network' as any,
          address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
        }
      ];

      const response = await alchemy.prices.getTokenPriceByAddress(addresses);
      expect(response.data[0].error).toBeDefined();
      expect(response.data[0].prices).toHaveLength(0);
    });
  });

  describe('getTokenPriceBySymbol()', () => {
    it('should get token prices by symbol', async () => {
      const symbols = ['AAVE', 'UNI', 'INVALID_SYMBOL'];
      const response = await alchemy.prices.getTokenPriceBySymbol(symbols);

      expect(response.data).toBeDefined();
      expect(response.data.length).toBe(3);

      // Check AAVE response
      const aaveResult = response.data[0];
      expect(aaveResult.symbol).toBe('AAVE');
      expect(aaveResult.prices.length).toBeGreaterThan(0);
      expect(aaveResult.error).toBeUndefined();
      expect(parseFloat(aaveResult.prices[0].value)).toBeGreaterThan(0);
      expect(aaveResult.prices[0].currency).toBe('usd');
      expect(new Date(aaveResult.prices[0].lastUpdatedAt)).toBeTruthy();

      // Check UNI response
      const uniResult = response.data[1];
      expect(uniResult.symbol).toBe('UNI');
      expect(uniResult.prices.length).toBeGreaterThan(0);
      expect(uniResult.error).toBeUndefined();
      expect(parseFloat(uniResult.prices[0].value)).toBeGreaterThan(0);

      // Check invalid symbol response
      const invalidResult = response.data[2];
      expect(invalidResult.symbol).toBe('INVALID_SYMBOL');
      expect(invalidResult.prices).toHaveLength(0);
      expect(invalidResult.error).toBeDefined();
    });
  });

  describe('getHistoricalPriceBySymbol()', () => {
    it('should get historical prices by symbol', async () => {
      const response = await alchemy.prices.getHistoricalPriceBySymbol(
        'UNI',
        1704067200,
        '2024-01-02T00:00:00Z',
        HistoricalPriceInterval.ONE_HOUR
      );

      expect(response.symbol).toBe('UNI');
      expect(response.currency).toBe('usd');
      expect(response.data).toBeDefined();
      expect(response.data.length).toBeGreaterThan(0);

      const dataPoint = response.data[0];
      expect(parseFloat(dataPoint.value)).toBeGreaterThan(0);
      expect(new Date(dataPoint.timestamp)).toBeTruthy();
    });
  });

  describe('getHistoricalPriceByAddress()', () => {
    it('should get historical prices by address', async () => {
      const response = await alchemy.prices.getHistoricalPriceByAddress(
        Network.ETH_MAINNET,
        '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', // UNI token
        '2024-01-01T00:00:00Z',
        1731693158,
        HistoricalPriceInterval.ONE_DAY
      );

      expect(response.network).toBe('eth-mainnet');
      expect(response.address).toBe(
        '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'
      );
      expect(response.currency).toBe('usd');
      expect(response.data).toBeDefined();
      expect(response.data.length).toBeGreaterThan(0);

      const dataPoint = response.data[0];
      expect(parseFloat(dataPoint.value)).toBeGreaterThan(0);
      expect(new Date(dataPoint.timestamp)).toBeTruthy();
    });
  });
});
