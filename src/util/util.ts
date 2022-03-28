export function toHex(n: number): string {
  return `0x${n.toString(16)}`;
}

export function fromHex(hexString: string): number {
  return Number.parseInt(hexString, 16);
}

export function formatBlock(block: string | number): string {
  if (typeof block === 'string') {
    return block;
  } else if (Number.isInteger(block)) {
    return toHex(block);
  }
  return block.toString();
}

export function delay(durationMs: number): Promise<void> {
  return new Promise(resolve => {
    const timer = setTimeout(resolve, durationMs);
    timer.unref();
  });
}

export function logger(methodName: string, message: string) {
  console.log(`[${methodName}]: ${message}`);
}
