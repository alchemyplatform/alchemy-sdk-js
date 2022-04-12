import { toHex } from '../api/util';

export function formatBlock(block: string | number): string {
  if (typeof block === 'string') {
    return block;
  } else if (Number.isInteger(block)) {
    return toHex(block);
  }
  return block.toString();
}

// TODO: Add loglevel options to avoid always logging everything
export function logger(methodName: string, message: string) {
  console.log(`[${methodName}]: ${message}`);
}
