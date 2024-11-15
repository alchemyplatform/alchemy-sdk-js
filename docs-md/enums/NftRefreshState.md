[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftRefreshState

# Enumeration: NftRefreshState

The current state of the NFT contract refresh process.

## Table of contents

### Enumeration members

- [ALREADY\_QUEUED](NftRefreshState.md#already_queued)
- [DOES\_NOT\_EXIST](NftRefreshState.md#does_not_exist)
- [FINISHED](NftRefreshState.md#finished)
- [IN\_PROGRESS](NftRefreshState.md#in_progress)
- [QUEUED](NftRefreshState.md#queued)
- [QUEUE\_FAILED](NftRefreshState.md#queue_failed)

## Enumeration members

### ALREADY\_QUEUED

• **ALREADY\_QUEUED** = `"already_queued"`

The contract has already been queued for refresh.

#### Defined in

[src/types/nft-types.ts:898](https://github.com/alchemyplatform/alchemy-sdk-js/blob/44aa50c/src/types/nft-types.ts#L898)

___

### DOES\_NOT\_EXIST

• **DOES\_NOT\_EXIST** = `"does_not_exist"`

The provided contract is not an NFT or does not contain metadata.

#### Defined in

[src/types/nft-types.ts:895](https://github.com/alchemyplatform/alchemy-sdk-js/blob/44aa50c/src/types/nft-types.ts#L895)

___

### FINISHED

• **FINISHED** = `"finished"`

The contract refresh is complete.

#### Defined in

[src/types/nft-types.ts:904](https://github.com/alchemyplatform/alchemy-sdk-js/blob/44aa50c/src/types/nft-types.ts#L904)

___

### IN\_PROGRESS

• **IN\_PROGRESS** = `"in_progress"`

The contract is currently being refreshed.

#### Defined in

[src/types/nft-types.ts:901](https://github.com/alchemyplatform/alchemy-sdk-js/blob/44aa50c/src/types/nft-types.ts#L901)

___

### QUEUED

• **QUEUED** = `"queued"`

The contract refresh has been queued and await execution.

#### Defined in

[src/types/nft-types.ts:907](https://github.com/alchemyplatform/alchemy-sdk-js/blob/44aa50c/src/types/nft-types.ts#L907)

___

### QUEUE\_FAILED

• **QUEUE\_FAILED** = `"queue_failed"`

The contract was unable to be queued due to an internal error.

#### Defined in

[src/types/nft-types.ts:910](https://github.com/alchemyplatform/alchemy-sdk-js/blob/44aa50c/src/types/nft-types.ts#L910)
