import { Alchemy, CommitmentLevel, DebugTracerType, toHex } from '../../src';
import { loadAlchemyEnv } from '../test-util';

describe('DebugNamespace', () => {
  let alchemy: Alchemy;
  const from = '0xe5cb067e90d5cd1f8052b83562ae670ba4a211a8';
  const to = '0xdc66567a990b7fa10730459537620857c9e03287';

  beforeAll(async () => {
    await loadAlchemyEnv();
    alchemy = await new Alchemy({
      apiKey: process.env.ALCHEMY_API_KEY
    });

    // Skip all timeouts for testing.
    jest.setTimeout(50000);
  });

  it('traceCall() with call tracer', async () => {
    const response = await alchemy.debug.traceCall(
      {
        from,
        to,
        data: '0xae169a50000000000000000000000000000000000000000000000000000000000000000e'
      },
      '0xF118CE',
      {
        type: DebugTracerType.CALL_TRACER,
        onlyTopCall: true
      }
    );
    expect(response.calls).toBeDefined();
    expect(response.from).toEqual(from);
    expect(response.to).toEqual(to);
  });

  it('traceCall() with prestate tracer', async () => {
    const response = await alchemy.debug.traceCall(
      {
        from,
        to,
        data: '0xae169a50000000000000000000000000000000000000000000000000000000000000000e'
      },
      '0xF118CE',
      {
        type: DebugTracerType.PRESTATE_TRACER,
        onlyTopCall: false
      }
    );
    const addresses = Object.keys(response);
    expect(addresses.length).toBeGreaterThan(1);
    expect(response[addresses[0]].balance).toBeDefined();
    expect(response[addresses[0]].nonce).toBeDefined();
    expect(response[addresses[0]].code).toBeDefined();
  });

  it('traceTransaction() with call tracer', async () => {
    const response = await alchemy.debug.traceTransaction(
      '0x8fc90a6c3ee3001cdcbbb685b4fbe67b1fa2bec575b15b0395fea5540d0901ae',
      { type: DebugTracerType.CALL_TRACER }
    );
    expect(response.calls).toBeDefined();
    expect(response.from).toBeDefined();
    expect(response.to).toBeDefined();
  });

  it('traceTransaction() with prestate tracer', async () => {
    const response = await alchemy.debug.traceTransaction(
      '0x8fc90a6c3ee3001cdcbbb685b4fbe67b1fa2bec575b15b0395fea5540d0901ae',
      { type: DebugTracerType.PRESTATE_TRACER },
      '4s300ns'
    );
    const addresses = Object.keys(response);
    expect(addresses.length).toBeGreaterThan(1);
    expect(response[addresses[0]].balance).toBeDefined();
    expect(response[addresses[0]].nonce).toBeDefined();
    expect(response[addresses[0]].code).toBeDefined();
  });

  it('traceBlock()', async () => {
    const finalizedBlock = await alchemy.core.getBlock(
      CommitmentLevel.FINALIZED
    );
    console.log(finalizedBlock);
    const response = await alchemy.debug.traceBlock(finalizedBlock.number, {
      type: DebugTracerType.CALL_TRACER,
      onlyTopCall: true
    });
    const response2 = await alchemy.debug.traceBlock(
      toHex(finalizedBlock.number),
      {
        type: DebugTracerType.CALL_TRACER,
        onlyTopCall: true
      }
    );
    const response3 = await alchemy.debug.traceBlock(
      CommitmentLevel.FINALIZED,
      {
        type: DebugTracerType.CALL_TRACER,
        onlyTopCall: true
      }
    );
    expect(response).toEqual(response2);
    expect(response).toEqual(response3);
  });
});
