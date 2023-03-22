import { InputNftTokenType } from '../internal/nft-api';
import { NftTokenType } from '../types/types';

export function sanitizeTokenType(tokenType?: NftTokenType): InputNftTokenType {
  if (tokenType === NftTokenType.ERC1155 || tokenType === NftTokenType.ERC721) {
    return tokenType;
  }
  return undefined;
}
