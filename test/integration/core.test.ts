import {
  Alchemy,
  AssetTransfersCategory,
  Network,
  TokenBalanceType,
  fromHex
} from '../../src';
import { Utils } from '../../src/index';
import { loadAlchemyEnv } from '../test-util';

jest.setTimeout(50000);
// Integration tests for Alchemy's custom methods on top the core ethers' offerings.
describe('E2E integration tests', () => {
  let alchemy: Alchemy;

  beforeAll(async () => {
    await loadAlchemyEnv();
    alchemy = await new Alchemy({
      apiKey: process.env.ALCHEMY_API_KEY,
      network: Network.ETH_MAINNET
    });

    // Skip all timeouts for testing.
    jest.setTimeout(50000);
  });

  it('findContractDeployer()', async () => {
    // BAYC
    let contractAddress = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';
    let contractDeployer = await alchemy.core.findContractDeployer(
      contractAddress
    );
    expect(contractDeployer.deployerAddress).toEqual(
      '0xaba7161a7fb69c88e16ed9f455ce62b791ee4d03'
    );
    expect(contractDeployer.blockNumber).toEqual(12287507);

    // ENS
    contractAddress = '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85';
    contractDeployer = await alchemy.core.findContractDeployer(contractAddress);
    expect(contractDeployer.deployerAddress).toEqual(
      '0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8'
    );
    expect(contractDeployer.blockNumber).toEqual(9380410);
  });

  it('getAssetTransfers()', async () => {
    // Replace with contract of your choosing
    const baycContract = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';

    const allTransfers = await alchemy.core.getAssetTransfers({
      fromBlock: '0x0',
      contractAddresses: [baycContract],
      toAddress: 'vitalik.eth',
      excludeZeroValue: true,
      category: [AssetTransfersCategory.ERC721],
      withMetadata: true
    });
    const firstTransfer = allTransfers.transfers[0];

    // General checks
    expect(firstTransfer.category).toEqual(AssetTransfersCategory.ERC721);
    expect(firstTransfer.rawContract.address).toEqual(baycContract);

    // First transfer specific checks
    expect(firstTransfer.blockNum).toEqual('0xc8f41b');
    expect(firstTransfer.metadata.blockTimestamp).toEqual(
      '2021-09-06T03:04:53.000Z'
    );
  });

  it('getTokenBalances()', async () => {
    // Supports ERC-20 + pageKey
    const address = 'vitalik.eth';
    const contract = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
    let response = await alchemy.core.getTokenBalances(address, {
      type: TokenBalanceType.ERC20
    });
    expect(response.pageKey).toBeDefined();
    const response2 = await alchemy.core.getTokenBalances(address, {
      type: TokenBalanceType.ERC20,
      pageKey: response.pageKey
    });
    expect(response2.tokenBalances.length).toBeGreaterThan(0);
    expect(response.tokenBalances[0]).not.toEqual(response2.tokenBalances[0]);

    response = await alchemy.core.getTokenBalances(address, [contract]);
    expect(response.tokenBalances.length).toEqual(1);
  });

  it('getTransactionReceipts()', async () => {
    const blockNumber = (await alchemy.core.getBlockNumber()) - 20;
    const response = await alchemy.core.getTransactionReceipts({
      blockNumber: Utils.toBeHex(blockNumber)
    });
    expect(response.receipts?.length).toBeGreaterThan(0);
    expect(fromHex(response.receipts![0].blockNumber.toString())).toEqual(
      blockNumber
    );
  });

  it('resolveName() / lookupAddress()', async () => {
    const name = 'vitalik.eth';
    const address = await alchemy.core.resolveName(name);
    expect(address).not.toBeNull();
    const finalName = await alchemy.core.lookupAddress(address!);
    expect(finalName).toEqual(name);
  });

  it('getLogs() with multiple address fields', async () => {
    const blockHash =
      '0xe89ebb614ffdeeba945a0886e450d663c533a30ad45c28e3ebcd073c6af02a73';
    const address = [
      '0x0240e59e6ae33b58db7360f7c693429eab7d4ac3',
      '0x8001d1ecdbd659d1a70c0034f5f92b5c68fa216d'
    ];
    const logs = await alchemy.core.getLogs({
      blockHash,
      address
    });
    logs.forEach(log => {
      expect(log.blockHash).toEqual(blockHash);
      expect(address).toContain(log.address.toLowerCase());
    });
  });

  it('getLogs() with single and undefined address field', async () => {
    const blockHash =
      '0xe89ebb614ffdeeba945a0886e450d663c533a30ad45c28e3ebcd073c6af02a73';
    const address = '0x0240e59e6ae33b58db7360f7c693429eab7d4ac3';
    let logs = await alchemy.core.getLogs({
      blockHash,
      address
    });
    expect(logs.length).toEqual(2);
    expect(logs[0].blockHash).toEqual(blockHash);
    expect(address).toEqual(logs[0].address.toLowerCase());

    logs = await alchemy.core.getLogs({
      blockHash
    });
    expect(logs.length).toEqual(406);
  });

  it('getTokensForOwner()', async () => {
    // Works with page key
    const res = await alchemy.core.getTokensForOwner('vitalik.eth');
    expect(res.pageKey).not.toBeUndefined();
    const res2 = await alchemy.core.getTokensForOwner('vitalik.eth', {
      pageKey: res.pageKey
    });
    expect(res.tokens[0]).not.toEqual(res2.tokens[0]);

    // Works with DEFAULT_TOKENS
    const res3 = await alchemy.core.getTokensForOwner('vitalik.eth', {
      contractAddresses: TokenBalanceType.DEFAULT_TOKENS
    });
    expect(res3.tokens.length).toEqual(100);

    // Works with custom contract addresses
    const USDC_ADDRESS = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
    const USDT_ADDRESS = '0xdac17f958d2ee523a2206206994597c13d831ec7';
    const res4 = await alchemy.core.getTokensForOwner('vitalik.eth', {
      contractAddresses: [USDC_ADDRESS, USDT_ADDRESS]
    });
    expect(res4.tokens.length).toEqual(2);
    expect(res4.tokens[0].contractAddress).toEqual(USDC_ADDRESS);
    expect(res4.tokens[1].contractAddress).toEqual(USDT_ADDRESS);
  });
});
