import { toHex } from '../api/util';

export function formatBlock(block: string | number): string {
  if (typeof block === 'string') {
    return block;
  } else if (Number.isInteger(block)) {
    return toHex(block);
  }
  return block.toString();
}

export type Web3Callback<T> = (error: Error | null, result?: T) => void;
