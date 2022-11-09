import { Alchemy, AssetTransfersCategory, TokenBalanceType } from '../../src';
import { Utils } from '../../src/index';
import { loadAlchemyEnv } from '../test-util';

jest.setTimeout(50000);
// Integration tests for Alchemy's custom methods on top the core ethers' offerings.
describe('E2E integration tests', () => {
  let alchemy: Alchemy;

  beforeAll(async () => {
    await loadAlchemyEnv();
    alchemy = await new Alchemy({
      apiKey: process.env.ALCHEMY_API_KEY
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
      toAddress: '0xshah.eth',
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
      blockNumber: Utils.hexlify(blockNumber)
    });
    expect(response.receipts?.length).toBeGreaterThan(0);
    expect(response.receipts![0].blockNumber).toEqual(
      Utils.hexlify(blockNumber)
    );
  });

  it('resolveName() / lookupAddress()', async () => {
    const name = 'vitalik.eth';
    const address = await alchemy.core.resolveName(name);
    expect(address).not.toBeNull();
    const finalName = await alchemy.core.lookupAddress(address!);
    expect(finalName).toEqual(name);
  });
});
