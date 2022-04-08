import { RawOwnedNft } from '../src/internal/raw-interfaces';

export function createOwnedNft(title: string): RawOwnedNft {
  return {
    title,
    description: `a truly unique NFT: ${title}`,
    balance: '1',
    timeLastUpdated: '2022-02-16T17:12:00.280Z',
    contract: {
      address: '0xABC'
    },
    id: {
      tokenId: '0x123'
    }
  };
}
