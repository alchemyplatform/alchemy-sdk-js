import { Alchemy } from '../../src';

describe('AlchemyProvider', () => {
  it('accepts a URL hard override', async () => {
    const alchemy = new Alchemy({
      apiKey: 'demo-key',
      url: 'hardcoded-url'
    });
    const provider = await alchemy.config.getProvider();
    expect(provider.connection.url).toEqual('hardcoded-url');
    expect(provider.apiKey).toEqual('demo-key');
  });
});
