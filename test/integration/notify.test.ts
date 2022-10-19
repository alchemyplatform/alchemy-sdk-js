import {
  AddressActivityWebhook,
  Alchemy,
  Network,
  NftActivityWebhook,
  NftFilter,
  WebhookType
} from '../../src';
import { loadAlchemyEnv } from '../test-util';

jest.setTimeout(50000);
describe('E2E integration tests', () => {
  let alchemy: Alchemy;
  let appId: string;
  const activityAddresses = [
    '0x6f8d0c2a2c3a189803f5c6482c88be46a55058c1',
    '0x48ea66f94518534ecbc863fbf521896d52b025d9',
    '0xfdb16996831753d5331ff813c29a93c76834a0ad'
  ];
  const nftFilters = [
    {
      contractAddress: '0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656',
      tokenId: 234
    },
    {
      contractAddress: '0x17dc95f9052f86ed576af55b018360f853e19ac2',
      tokenId: '345'
    }
  ];
  const webhookUrl = 'https://temp-site.ngrok.io';

  let addressWh: AddressActivityWebhook;
  let nftWh: NftActivityWebhook;

  async function createInitialWebhooks(): Promise<void> {
    addressWh = await alchemy.notify.createWebhook(
      webhookUrl,
      WebhookType.ADDRESS_ACTIVITY,
      { addresses: activityAddresses }
    );
    nftWh = await alchemy.notify.createWebhook(
      webhookUrl,
      WebhookType.NFT_ACTIVITY,
      { filters: nftFilters, network: Network.ETH_MAINNET }
    );
  }

  beforeAll(async () => {
    await loadAlchemyEnv();
    appId = process.env.ALCHEMY_APP_ID!;

    alchemy = new Alchemy({
      apiKey: process.env.ALCHEMY_API_KEY,
      authToken: process.env.ALCHEMY_AUTH_TOKEN
    });

    await createInitialWebhooks();
  });

  it('getAll()', async () => {
    const all = await alchemy.notify.getAll();
    expect(all.totalCount).toBeGreaterThan(0);
    expect(all.webhooks.length).toEqual(all.totalCount);
  });

  it('getAddresses()', async () => {
    let response = await alchemy.notify.getAddresses(addressWh);
    expect(response.addresses.sort()).toEqual(activityAddresses.sort());

    response = await alchemy.notify.getAddresses(addressWh.id);
    expect(response.addresses.sort()).toEqual(activityAddresses.sort());
  });

  it('getAddresses() with limit', async () => {
    const response = await alchemy.notify.getAddresses(addressWh, {
      limit: 1
    });
    expect(response.totalCount).toEqual(3);
    expect(response.addresses.length).toEqual(1);
    expect(response.pageKey).toBeDefined();
    const response2 = await alchemy.notify.getAddresses(addressWh, {
      limit: 1,
      pageKey: response.pageKey
    });
    expect(response2.addresses.length).toEqual(1);
    expect(response2).not.toContain(response.addresses[0]);
  });

  it('getNftFilters()', async () => {
    let response = await alchemy.notify.getNftFilters(nftWh);
    const sortFn = (a: NftFilter, b: NftFilter) =>
      a.tokenId < b.tokenId ? 1 : -1;
    expect(response.filters.sort(sortFn)).toEqual(nftFilters.sort(sortFn));

    response = await alchemy.notify.getNftFilters(nftWh.id);
    expect(response.filters.sort(sortFn)).toEqual(nftFilters.sort(sortFn));
  });

  it('getNftFilters() with limit', async () => {
    const response = await alchemy.notify.getNftFilters(nftWh, {
      limit: 1
    });
    expect(response.totalCount).toEqual(2);
    expect(response.filters.length).toEqual(1);
    expect(response.pageKey).toBeDefined();
    const response2 = await alchemy.notify.getNftFilters(nftWh, {
      limit: 1,
      pageKey: response.pageKey
    });
    expect(response2.filters.length).toEqual(1);
    expect(response2).not.toContain(response.filters[0]);
  });

  it('create and delete MinedTransactionWebhook', async () => {
    const minedTxWebhook = await alchemy.notify.createWebhook(
      webhookUrl,
      WebhookType.MINED_TRANSACTION,
      { appId }
    );
    expect(minedTxWebhook.url).toEqual(webhookUrl);
    expect(minedTxWebhook.type).toEqual(WebhookType.MINED_TRANSACTION);
    let response = await alchemy.notify.getAll();
    expect(
      response.webhooks.filter(wh => wh.id === minedTxWebhook.id).length
    ).toEqual(1);

    await alchemy.notify.deleteWebhook(minedTxWebhook);
    response = await alchemy.notify.getAll();
    expect(
      response.webhooks.filter(wh => wh.id === minedTxWebhook.id).length
    ).toEqual(0);
  });

  it('create and delete DroppedTransactionWebhook', async () => {
    const droppedTxWebhook = await alchemy.notify.createWebhook(
      webhookUrl,
      WebhookType.DROPPED_TRANSACTION,
      { appId }
    );
    expect(droppedTxWebhook.url).toEqual(webhookUrl);
    expect(droppedTxWebhook.type).toEqual(WebhookType.DROPPED_TRANSACTION);
    let response = await alchemy.notify.getAll();
    expect(
      response.webhooks.filter(wh => wh.id === droppedTxWebhook.id).length
    ).toEqual(1);

    await alchemy.notify.deleteWebhook(droppedTxWebhook);
    response = await alchemy.notify.getAll();
    expect(
      response.webhooks.filter(wh => wh.id === droppedTxWebhook.id).length
    ).toEqual(0);
  });

  it('create and delete AddressActivityWebhook', async () => {
    const addressWebhook = await alchemy.notify.createWebhook(
      webhookUrl,
      WebhookType.ADDRESS_ACTIVITY,
      { addresses: activityAddresses, network: Network.OPT_MAINNET }
    );
    expect(addressWebhook.url).toEqual(webhookUrl);
    expect(addressWebhook.type).toEqual(WebhookType.ADDRESS_ACTIVITY);
    expect(addressWebhook.network).toEqual(Network.OPT_MAINNET);
    let response = await alchemy.notify.getAll();
    expect(
      response.webhooks.filter(wh => wh.id === addressWebhook.id).length
    ).toEqual(1);

    await alchemy.notify.deleteWebhook(addressWebhook);
    response = await alchemy.notify.getAll();
    expect(
      response.webhooks.filter(wh => wh.id === addressWebhook.id).length
    ).toEqual(0);
  });

  it('create and delete NftActivityWebhook', async () => {
    const nftActivityWebhook = await alchemy.notify.createWebhook(
      webhookUrl,
      WebhookType.NFT_ACTIVITY,
      { filters: nftFilters, network: Network.ETH_GOERLI }
    );
    expect(nftActivityWebhook.url).toEqual(webhookUrl);
    expect(nftActivityWebhook.type).toEqual(WebhookType.NFT_ACTIVITY);
    expect(nftActivityWebhook.network).toEqual(Network.ETH_GOERLI);
    let response = await alchemy.notify.getAll();
    expect(
      response.webhooks.filter(wh => wh.id === nftActivityWebhook.id).length
    ).toEqual(1);

    await alchemy.notify.deleteWebhook(nftActivityWebhook.id);
    response = await alchemy.notify.getAll();
    expect(
      response.webhooks.filter(wh => wh.id === nftActivityWebhook.id).length
    ).toEqual(0);
  });

  it('update NftActivityWebhook filter', async () => {
    const addFilters = [
      {
        contractAddress: '0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656',
        tokenId: '234'
      },
      {
        contractAddress: '0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656',
        tokenId: '123'
      }
    ];

    const removeFilters = [
      {
        contractAddress: '0x17dc95f9052f86ed576af55b018360f853e19ac2',
        tokenId: 345
      }
    ];

    await alchemy.notify.updateWebhook(nftWh, {
      addFilters,
      removeFilters
    });

    const response = await alchemy.notify.getNftFilters(nftWh);
    expect(response.filters.length).toEqual(2);
  });

  it('update NftActivityWebhook status', async () => {
    await alchemy.notify.updateWebhook(nftWh.id, {
      isActive: false
    });
    const response = await alchemy.notify.getAll();
    const updated = response.webhooks.filter(wh => wh.id === nftWh.id);
    expect(updated.length).toEqual(1);
    expect(updated[0].isActive).toEqual(false);
  });

  it('update AddressActivityWebhook address', async () => {
    const addAddress = '0x7f268357A8c2552623316e2562D90e642bB538E5';
    const removeAddress = '0xfdb16996831753d5331ff813c29a93c76834a0ad';
    await alchemy.notify.updateWebhook(addressWh, {
      addAddresses: [addAddress],
      removeAddresses: [removeAddress]
    });
    const response = await alchemy.notify.getAddresses(addressWh);
    expect(response.addresses.length).toEqual(3);
    expect(response.addresses).toContain(addAddress);
    expect(response.addresses).not.toContain(removeAddress);
  });

  it('override AddressActivityWebhook address', async () => {
    const newAddresses = ['0x7f268357A8c2552623316e2562D90e642bB538E5'];
    await alchemy.notify.updateWebhook(addressWh, {
      newAddresses
    });
    const response = await alchemy.notify.getAddresses(addressWh);
    expect(response.addresses.length).toEqual(1);
    expect(response.addresses[0]).toEqual(newAddresses[0]);
  });

  it('update AddressActivityWebhook status', async () => {
    await alchemy.notify.updateWebhook(addressWh, {
      isActive: false
    });
    const response = await alchemy.notify.getAll();
    const updated = response.webhooks.filter(wh => wh.id === addressWh.id);
    expect(updated.length).toEqual(1);
    expect(updated[0].isActive).toEqual(false);
  });

  it('cleans up', async () => {
    const response = await alchemy.notify.getAll();
    const tests = response.webhooks.filter(wh => wh.url === webhookUrl);

    await Promise.allSettled(tests.map(wh => alchemy.notify.deleteWebhook(wh)));
    const response2 = await alchemy.notify.getAll();
    const remaining = response2.webhooks.filter(wh => wh.url === webhookUrl);
    expect(remaining.length).toEqual(0);
  });
});
