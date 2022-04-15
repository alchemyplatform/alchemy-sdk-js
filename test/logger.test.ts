import { setLogLevel } from '../src';
import { logDebug, logError, logInfo, logWarn } from '../src/util/logger';

describe('Logger', () => {
  const message = 'Important logging message';
  const mockConsoles = new Map();

  beforeEach(() => {
    mockConsoles.set(
      'debug',
      jest.spyOn(global.console, 'log').mockImplementation(() => {})
    );
    mockConsoles.set(
      'info',
      jest.spyOn(global.console, 'info').mockImplementation(() => {})
    );
    mockConsoles.set(
      'warn',
      jest.spyOn(global.console, 'warn').mockImplementation(() => {})
    );
    mockConsoles.set(
      'error',
      jest.spyOn(global.console, 'error').mockImplementation(() => {})
    );
  });

  afterEach(() => {
    mockConsoles.forEach(mockConsole => mockConsole.mockRestore());
  });

  function testLog(level: string, shouldLog: boolean): void {
    it(`Should ${
      shouldLog ? '' : 'not'
    } call \`console.${level}\` with LogLevel: '${level}'`, () => {
      switch (level) {
        case 'debug':
          logDebug(message);
          break;
        case 'info':
          logInfo(message);
          break;
        case 'warn':
          logWarn(message);
          break;
        case 'error':
          logError(message);
          break;
        default:
          throw new Error(`Unknown log level: ${level}`);
      }
      expect(mockConsoles.get(level)).toHaveBeenCalledTimes(shouldLog ? 1 : 0);
    });
  }

  describe('Debug', () => {
    beforeEach(() => {
      setLogLevel('debug');
    });
    testLog('debug', true);
    testLog('info', true);
    testLog('warn', true);
    testLog('error', true);
  });

  describe('Warn', () => {
    beforeEach(() => {
      setLogLevel('warn');
    });
    testLog('debug', false);
    testLog('info', false);
    testLog('warn', true);
    testLog('error', true);
  });

  describe('Info', () => {
    beforeEach(() => {
      setLogLevel('info');
    });
    testLog('debug', false);
    testLog('info', true);
    testLog('warn', true);
    testLog('error', true);
  });

  describe('Error', () => {
    beforeEach(() => {
      setLogLevel('error');
    });
    testLog('debug', false);
    testLog('info', false);
    testLog('warn', false);
    testLog('error', true);
  });

  describe('Silent', () => {
    beforeEach(() => {
      setLogLevel('silent');
    });
    testLog('debug', false);
    testLog('info', false);
    testLog('warn', false);
    testLog('error', false);
  });
});
