/**
 * The SDK has 4 log levels and a 5th option for disabling all logging. By
 * default, the log level is set to INFO.
 *
 * The order is a follows: DEBUG < INFO < WARN < ERROR
 *
 * All log types above the current log level will be outputted.
 */
export declare enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
    SILENT = 4
}
/**
 * The level of verbosity for the logger.
 *
 * @public
 */
export declare type LogLevelString = 'debug' | 'info' | 'warn' | 'error' | 'silent';
/**
 * Configures the verbosity of logging. The default log level is `info`.
 *
 * @param logLevel - The verbosity of logging. Can be any of the following values:
 *
 *   - `debug`: The most verbose logging level.
 *   - `info`: The default logging level.
 *   - `warn`: A logging level for non-critical issues.
 *   - `error`: A logging level for critical issues.
 *   - `silent`: Turn off all logging.
 *
 * @public
 */
export declare function setLogLevel(logLevel: LogLevelString): void;
export declare function logDebug(message: string, ...args: unknown[]): void;
export declare function logInfo(message: string, ...args: unknown[]): void;
export declare function logWarn(message: string, ...args: unknown[]): void;
export declare function logError(message: string, ...args: unknown[]): void;
export declare class Logger {
    /** The log level of the given Logger instance. */
    private _logLevel;
    constructor();
    get logLevel(): LogLevel;
    set logLevel(val: LogLevel);
    debug(...args: unknown[]): void;
    info(...args: unknown[]): void;
    warn(...args: unknown[]): void;
    error(...args: unknown[]): void;
    /**
     * Forwards log messages to their corresponding console counterparts if the
     * log level allows it.
     */
    private _log;
}
