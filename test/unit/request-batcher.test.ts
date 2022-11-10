import {
  JsonRpcRequest,
  JsonRpcResponse
} from '../../src/internal/internal-types';
import { RequestBatcher } from '../../src/internal/request-batcher';

describe('RequestBatcher', () => {
  let batcher: RequestBatcher;
  let fetchJsonMock: jest.Mock;
  const connectionInfo = {
    url: 'http://mock.url'
  };
  beforeEach(() => {
    fetchJsonMock = jest.fn();
    batcher = new RequestBatcher(fetchJsonMock, connectionInfo);
  });

  function blockNumberRequest(id: number): JsonRpcRequest {
    return {
      jsonrpc: '2.0',
      id,
      method: 'eth_blockNumber',
      params: []
    };
  }

  function blockNumberResponse(id: number, result: string): JsonRpcResponse {
    return {
      jsonrpc: '2.0',
      id,
      result
    };
  }

  it('enqueues requests into batches', async () => {
    fetchJsonMock.mockResolvedValueOnce([
      blockNumberResponse(1, '0x1'),
      blockNumberResponse(2, '0x2'),
      blockNumberResponse(3, '0x3')
    ]);
    const bn1 = batcher.enqueueRequest(blockNumberRequest(1));
    const bn2 = batcher.enqueueRequest(blockNumberRequest(2));
    const bn3 = batcher.enqueueRequest(blockNumberRequest(3));
    await bn2;
    expect(await bn1).toEqual('0x1');
    expect(await bn2).toEqual('0x2');
    expect(await bn3).toEqual('0x3');
    const connection = fetchJsonMock.mock.calls[0][0];
    expect(connection).toEqual(connectionInfo);
    const rawRequest = JSON.parse(fetchJsonMock.mock.calls[0][1]);
    expect(rawRequest.length).toEqual(3);
  });

  it('sends requests based on maximum batch size', async () => {
    batcher = new RequestBatcher(fetchJsonMock, connectionInfo, 2);
    fetchJsonMock
      .mockResolvedValueOnce([
        blockNumberResponse(1, '0x1'),
        blockNumberResponse(2, '0x2')
      ])
      .mockResolvedValueOnce([
        blockNumberResponse(3, '0x3'),
        blockNumberResponse(4, '0x4')
      ]);

    const bn1 = batcher.enqueueRequest(blockNumberRequest(1));
    const bn2 = batcher.enqueueRequest(blockNumberRequest(2));
    const bn3 = batcher.enqueueRequest(blockNumberRequest(3));
    const bn4 = batcher.enqueueRequest(blockNumberRequest(4));
    await bn4;
    expect(await bn1).toEqual('0x1');
    expect(await bn2).toEqual('0x2');
    expect(await bn3).toEqual('0x3');
    expect(await bn4).toEqual('0x4');

    let connection = fetchJsonMock.mock.calls[0][0];
    expect(connection).toEqual(connectionInfo);
    let rawRequest = JSON.parse(fetchJsonMock.mock.calls[0][1]);
    expect(rawRequest.length).toEqual(2);
    connection = fetchJsonMock.mock.calls[1][0];
    expect(connection).toEqual(connection);
    rawRequest = JSON.parse(fetchJsonMock.mock.calls[1][1]);
    expect(rawRequest.length).toEqual(2);
  });

  it('surfaces errors in batches', async () => {
    async function verifyThrows(
      promise: Promise<any>,
      expected: string
    ): Promise<void> {
      try {
        await promise;
      } catch (e) {
        expect(e).toEqual(expected);
        return;
      }

      throw new Error('Promise should have thrown' + expected);
    }
    batcher = new RequestBatcher(fetchJsonMock, connectionInfo, 2);
    fetchJsonMock
      .mockRejectedValueOnce('Test error 1')
      .mockRejectedValueOnce('Test error 2');

    const bn1 = batcher.enqueueRequest(blockNumberRequest(1));
    const bn2 = batcher.enqueueRequest(blockNumberRequest(2));
    const bn3 = batcher.enqueueRequest(blockNumberRequest(3));
    const bn4 = batcher.enqueueRequest(blockNumberRequest(4));
    await verifyThrows(bn1, 'Test error 1');
    await verifyThrows(bn2, 'Test error 1');
    await verifyThrows(bn3, 'Test error 2');
    await verifyThrows(bn4, 'Test error 2');
  });
});
