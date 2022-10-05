import {
  GAS_OPTIMIZED_TX_FEE_MULTIPLES,
  generateGasSpreadTransactions
} from '../../src/api/transact-namespace';

describe('Transact Namespace', () => {
  it('generateGasSpreadTransactions() sets gas limits and fee spread', async () => {
    const transaction = {
      to: '0xa238b6008Bc2FBd9E386A5d4784511980cE504Cd',
      value: 10000,
      nonce: 2,
      type: 2,
      chainId: 5
    };
    const gasLimit = 123456;
    const baseFee = 1000;
    const priorityFee = 2000;
    const gasTransactions = generateGasSpreadTransactions(
      transaction,
      gasLimit,
      baseFee,
      priorityFee
    );

    expect(gasTransactions.length).toEqual(5);
    const multiples = [...GAS_OPTIMIZED_TX_FEE_MULTIPLES];
    for (const rawTx of gasTransactions) {
      expect(rawTx).not.toEqual(null);
      expect(rawTx!.gasLimit).toEqual(gasLimit);
      expect(rawTx!.value).toEqual(10000);
      expect(rawTx!.nonce).toEqual(2);
      expect(rawTx!.type).toEqual(2);
      expect(rawTx!.chainId).toEqual(5);

      const multiple = multiples.shift()!;
      expect(rawTx!.maxPriorityFeePerGas).toEqual(priorityFee * multiple);
      expect(rawTx!.maxFeePerGas).toEqual(
        baseFee * multiple + priorityFee * multiple
      );
    }
  });
});
