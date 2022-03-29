import { logger } from '../util/util';

export const DEFAULT_BACKOFF_INITIAL_DELAY_MS = 1000;
export const DEFAULT_BACKOFF_MULTIPLIER = 1.5;
export const DEFAULT_BACKOFF_MAX_DELAY_MS = 30 * 1000;
export const DEFAULT_BACKOFF_MAX_ATTEMPTS = 5;

/**
 * Helper class for implementing exponential backoff and max retry attempts.
 *
 * @private
 * @internal
 */
export class ExponentialBackoff {
  private numAttempts = 0;
  private currentDelayMs = 0;
  private readonly initialDelayMs = DEFAULT_BACKOFF_INITIAL_DELAY_MS;
  private readonly backoffMultiplier = DEFAULT_BACKOFF_MULTIPLIER;
  private readonly maxDelayMs = DEFAULT_BACKOFF_MAX_DELAY_MS;

  constructor(private readonly maxAttempts = DEFAULT_BACKOFF_MAX_ATTEMPTS) {}

  /**
   * Returns a promise that resolves after the the backoff delay. The delay is
   * increased for each attempt. The promise is rejected if the maximum number
   * of attempts is exceeded.
   */
  // TODO: beautify this into an async iterator.
  backoff(): Promise<void> {
    if (this.numAttempts > this.maxAttempts) {
      return Promise.reject(
        new Error(`Exceeded maximum number of attempts: ${this.maxAttempts}`)
      );
    }
    const backoffDelayWithJitterMs = this.withJitterMs(this.currentDelayMs);

    // Calculate the next delay.
    this.currentDelayMs *= this.backoffMultiplier;
    this.currentDelayMs = Math.max(this.currentDelayMs, this.initialDelayMs);
    this.currentDelayMs = Math.min(this.currentDelayMs, this.maxDelayMs);
    this.numAttempts += 1;

    if (backoffDelayWithJitterMs > 0) {
      logger(
        'ExponentialBackoff.backoff',
        `Backing off for ${backoffDelayWithJitterMs}ms`
      );
    }
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, backoffDelayWithJitterMs);
    });
  }

  /**
   * Applies +/- 50% jitter to the backoff delay, up to the max delay cap.
   *
   * @param delayMs
   * @private
   */
  private withJitterMs(delayMs: number): number {
    return Math.min(delayMs + (Math.random() - 0.5) * delayMs, this.maxDelayMs);
  }
}
