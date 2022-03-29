import { ExponentialBackoff } from '../src/internal/backoff';

describe('Exponential Backoff', () => {
  const observedDelays: number[] = [];

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

  // TODO: Fill in other tests.
});
