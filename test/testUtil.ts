import { Nft } from '../src';

export function createNft(title: string): Nft {
  return {
    title,
    description: `a truly unique NFT: ${title}`,
    timeLastUpdated: '2022-02-16T17:12:00.280Z',
    contract: {
      address: '0xABC'
    },
    id: {
      tokenId: '0x123'
    }
  };
}
