[alchemy-sdk](../README.md) / [Exports](../modules.md) / DecodedDebugCallTrace

# Interface: DecodedDebugCallTrace

Decoded representation of the call trace that is part of a
[SimulationCallTrace](SimulationCallTrace.md).

## Table of contents

### Properties

- [authority](DecodedDebugCallTrace.md#authority)
- [inputs](DecodedDebugCallTrace.md#inputs)
- [methodName](DecodedDebugCallTrace.md#methodname)
- [outputs](DecodedDebugCallTrace.md#outputs)

## Properties

### authority

• **authority**: [`ETHERSCAN`](../enums/DecodingAuthority.md#etherscan)

The source used to provide the decoded call trace.

#### Defined in

[src/types/types.ts:1012](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/types/types.ts#L1012)

___

### inputs

• **inputs**: [`DecodedCallParam`](DecodedCallParam.md)[]

Method inputs.

#### Defined in

[src/types/types.ts:1008](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/types/types.ts#L1008)

___

### methodName

• **methodName**: `string`

The smart contract method called.

#### Defined in

[src/types/types.ts:1006](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/types/types.ts#L1006)

___

### outputs

• **outputs**: [`DecodedCallParam`](DecodedCallParam.md)[]

Method outputs.

#### Defined in

[src/types/types.ts:1010](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ae0aa3f0/src/types/types.ts#L1010)
