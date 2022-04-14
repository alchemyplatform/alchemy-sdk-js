/**
 * The SDK has 4 log levels and a 5th option for disabling all logging. By
 * default, the log level is set to INFO.
 *
 * The order is a follows: DEBUG < INFO < WARN < ERROR
 *
 * All log types above the current log level will be outputted.
 */
export enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR,
  SILENT
}

export type LogLevelString = 'debug' | 'info' | 'warn' | 'error' | 'silent';

const logLevelStringToEnum: { [key in LogLevelString]: LogLevel } = {
  debug: LogLevel.DEBUG,
  info: LogLevel.INFO,
  warn: LogLevel.WARN,
  error: LogLevel.ERROR,
  silent: LogLevel.SILENT
};

// HACKY: Use the console method as a string rather than the function itself
// in order to allow for mocking in tests.
const logLevelToConsoleFn = {
  [LogLevel.DEBUG]: 'log',
  [LogLevel.INFO]: 'info',
  [LogLevel.WARN]: 'warn',
  [LogLevel.ERROR]: 'error'
};

const DEFAULT_LOG_LEVEL = LogLevel.INFO;

/**
 * Configures the verbosity of logging. The default log level is `info`.
 *
 * @param logLevel The verbosity of logging. Can be any of the following values:
 *
 *   - `debug`: The most verbose logging level.
 *   - `info`: The default logging level.
 *   - `warn`: A logging level for non-critical issues.
 *   - `error`: A logging level for critical issues.
 *   - `silent`: Turn off all logging.
 *
 * @public
 */
export function setLogLevel(logLevel: LogLevelString): void {
  loggerClient.logLevel = logLevelStringToEnum[logLevel];
}

export function logDebug(message: string, ...args: Array<unknown>): void {
  loggerClient.debug(message, args);
}

export function logInfo(message: string, ...args: Array<unknown>): void {
  loggerClient.info(message, args);
}

export function logWarn(message: string, ...args: Array<unknown>): void {
  loggerClient.warn(message, args);
}

export function logError(message: string, ...args: Array<unknown>): void {
  loggerClient.error(message, args);
}

export class Logger {
  /** The log level of the given Logger instance. */
  private _logLevel = DEFAULT_LOG_LEVEL;

  constructor() {}

  get logLevel(): LogLevel {
    return this._logLevel;
  }

  set logLevel(val: LogLevel) {
    if (!(val in LogLevel)) {
      throw new TypeError(`Invalid value "${val}" assigned to \`logLevel\``);
    }
    this._logLevel = val;
  }

  debug(...args: Array<unknown>): void {
    this._log(LogLevel.DEBUG, args);
  }

  info(...args: Array<unknown>): void {
    this._log(LogLevel.INFO, args);
  }

  warn(...args: Array<unknown>): void {
    this._log(LogLevel.WARN, args);
  }

  error(...args: Array<unknown>): void {
    this._log(LogLevel.ERROR, args);
  }

  /**
   * Forwards log messages to their corresponding console counterparts if the
   * log level allows it.
   */
  private _log(logLevel: LogLevel, ...args: Array<unknown>): void {
    if (logLevel < this._logLevel) {
      return;
    }
    const now = new Date().toISOString();
    const method =
      logLevelToConsoleFn[logLevel as keyof typeof logLevelToConsoleFn];
    if (method) {
      console[method as 'log' | 'info' | 'warn' | 'error'](
        `[${now}] Alchemy:`,
        args.map(stringify)
      );
    } else {
      throw new Error(
        `Logger received an invalid logLevel (value: ${logLevel})`
      );
    }
  }
}

function stringify(obj: unknown): string {
  if (typeof obj === 'string') {
    return obj;
  } else {
    return JSON.stringify(obj);
  }
}

// Instantiate default logger for the SDK.
const loggerClient: Logger = new Logger();
