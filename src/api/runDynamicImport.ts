export async function runDynamicImport() {
  const { dynamicImport } = await import('./dynamicImport');
  dynamicImport();
}
