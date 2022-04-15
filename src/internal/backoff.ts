import { logDebug } from '../util/logger';

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
  private readonly initialDelayMs = DEFAULT_BACKOFF_INITIAL_DELAY_MS;
  private readonly backoffMultiplier = DEFAULT_BACKOFF_MULTIPLIER;
  private readonly maxDelayMs = DEFAULT_BACKOFF_MAX_DELAY_MS;

  private numAttempts = 0;
  private currentDelayMs = 0;
  private isInBackoff = false;

  constructor(private readonly maxAttempts = DEFAULT_BACKOFF_MAX_ATTEMPTS) {}

  /**
   * Returns a promise that resolves after the the backoff delay. The delay is
   * increased for each attempt. The promise is rejected if the maximum number
   * of attempts is exceeded.
   */
  // TODO: beautify this into an async iterator.
  backoff(): Promise<void> {
    if (this.numAttempts >= this.maxAttempts) {
      return Promise.reject(
        new Error(`Exceeded maximum number of attempts: ${this.maxAttempts}`)
      );
    }
    if (this.isInBackoff) {
      return Promise.reject(
        new Error('A backoff operation is already in progress')
      );
    }

    const backoffDelayWithJitterMs = this.withJitterMs(this.currentDelayMs);
    if (backoffDelayWithJitterMs > 0) {
      logDebug(
        'ExponentialBackoff.backoff',
        `Backing off for ${backoffDelayWithJitterMs}ms`
      );
    }

    // Calculate the next delay.
    this.currentDelayMs *= this.backoffMultiplier;
    this.currentDelayMs = Math.max(this.currentDelayMs, this.initialDelayMs);
    this.currentDelayMs = Math.min(this.currentDelayMs, this.maxDelayMs);
    this.numAttempts += 1;

    return new Promise(resolve => {
      this.isInBackoff = true;
      setTimeout(() => {
        this.isInBackoff = false;
        resolve();
      }, backoffDelayWithJitterMs);
    });
  }

  /**
   * Applies +/- 50% jitter to the backoff delay, up to the max delay cap.
   *
   * @private
   * @param delayMs
   */
  private withJitterMs(delayMs: number): number {
    return Math.min(delayMs + (Math.random() - 0.5) * delayMs, this.maxDelayMs);
  }
}
