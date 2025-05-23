[alchemy-sdk](../README.md) / [Exports](../modules.md) / CommitmentLevel

# Enumeration: CommitmentLevel

Commitment level of the target block with using methods in the
[DebugNamespace](../classes/DebugNamespace.md)

## Table of contents

### Enumeration members

- [EARLIEST](CommitmentLevel.md#earliest)
- [FINALIZED](CommitmentLevel.md#finalized)
- [LATEST](CommitmentLevel.md#latest)
- [PENDING](CommitmentLevel.md#pending)
- [SAFE](CommitmentLevel.md#safe)

## Enumeration members

### EARLIEST

• **EARLIEST** = `"earliest"`

The lowest numbered block available that is usually the first block created.

#### Defined in

[src/types/types.ts:1493](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/types.ts#L1493)

___

### FINALIZED

• **FINALIZED** = `"finalized"`

The most recent secure block that has been accepted by >2/3 of validators.
This block is very unlikely to be re-orged. This is only available on
[Network.ETH_GOERLI](Network.md#eth_goerli) and [Network.ETH_SEPOLIA](Network.md#eth_sepolia).

#### Defined in

[src/types/types.ts:1489](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/types.ts#L1489)

___

### LATEST

• **LATEST** = `"latest"`

The most recent block in the canonical chain observed by Alchemy. Note that
this block may be re-orged out of the canonical chain.

#### Defined in

[src/types/types.ts:1477](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/types.ts#L1477)

___

### PENDING

• **PENDING** = `"pending"`

Sample next block inferred by Alchemy built on top of the latest block.
This contains the set of transactions taken from the local mempool and
is a proxy for blocks that have not been mined yet.

#### Defined in

[src/types/types.ts:1472](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/types.ts#L1472)

___

### SAFE

• **SAFE** = `"safe"`

The most recent crypto-economically secure block that cannot be re-orged
outside of manual intervention driven by community coordination. This is
only available on [Network.ETH_GOERLI](Network.md#eth_goerli) and [Network.ETH_SEPOLIA](Network.md#eth_sepolia).

#### Defined in

[src/types/types.ts:1483](https://github.com/alchemyplatform/alchemy-sdk-js/blob/873c9882/src/types/types.ts#L1483)
