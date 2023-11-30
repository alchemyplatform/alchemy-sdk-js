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

[src/types/nft-types.ts:891](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5cfa150/src/types/nft-types.ts#L891)

___

### DOES\_NOT\_EXIST

• **DOES\_NOT\_EXIST** = `"does_not_exist"`

The provided contract is not an NFT or does not contain metadata.

#### Defined in

[src/types/nft-types.ts:888](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5cfa150/src/types/nft-types.ts#L888)

___

### FINISHED

• **FINISHED** = `"finished"`

The contract refresh is complete.

#### Defined in

[src/types/nft-types.ts:897](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5cfa150/src/types/nft-types.ts#L897)

___

### IN\_PROGRESS

• **IN\_PROGRESS** = `"in_progress"`

The contract is currently being refreshed.

#### Defined in

[src/types/nft-types.ts:894](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5cfa150/src/types/nft-types.ts#L894)

___

### QUEUED

• **QUEUED** = `"queued"`

The contract refresh has been queued and await execution.

#### Defined in

[src/types/nft-types.ts:900](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5cfa150/src/types/nft-types.ts#L900)

___

### QUEUE\_FAILED

• **QUEUE\_FAILED** = `"queue_failed"`

The contract was unable to be queued due to an internal error.

#### Defined in

[src/types/nft-types.ts:903](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5cfa150/src/types/nft-types.ts#L903)
