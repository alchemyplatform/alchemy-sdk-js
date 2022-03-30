import { ExponentialBackoff } from '../src/internal/backoff';

describe('Exponential Backoff', () => {
  const observedDelays: number[] = [];
  const noop = () => {};

  function assertDelayEquals(expected: number) {
    expect(observedDelays.shift()).toEqual(expected);
  }

  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout').mockImplementation(
      // @ts-ignore: Mock implementation doesn't need to return a Timeout.
      (callback: () => void, timeout) => {
        if (timeout !== undefined) {
          observedDelays.push(timeout);
        }
        callback();
      }
    );
  });

  it('does not delay the first attempt', async () => {
    const backoff = new ExponentialBackoff();
    await backoff.backoff();
    assertDelayEquals(0);
  });

  it('stops backoff after max attempts reached', async () => {
    const maxAttempts = 3;
    const backoff = new ExponentialBackoff(maxAttempts);
    let numBackoffs = 0;
    try {
      for (let i = 0; i < maxAttempts + 1; i++) {
        await backoff.backoff();
        numBackoffs += 1;
      }
      fail('Should not exceed max attempts');
    } catch (e) {
      expect(numBackoffs).toEqual(3);
      expect((e as Error).message).toContain(
        'Exceeded maximum number of attempts'
      );
    }
  });

  it('cannot queue two backoff() operations simultaneously', async () => {
    const backoff = new ExponentialBackoff();

    // The timeout handler for this test simply idles forever.
    jest.spyOn(global, 'setTimeout').mockImplementation(
      // @ts-ignore: Mock implementation doesn't need to return a Timeout.
      () => {}
    );

    void backoff.backoff().then(noop);
    await expect(backoff.backoff()).rejects.toThrow(
      'A backoff operation is already in progress'
    );
  });
});
