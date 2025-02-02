[alchemy-sdk](../README.md) / [Exports](../modules.md) / DecodedLog

# Interface: DecodedLog

Decoded representation of the debug log that is part of a
[SimulationDebugLog](SimulationDebugLog.md).

## Table of contents

### Properties

- [authority](DecodedLog.md#authority)
- [eventName](DecodedLog.md#eventname)
- [inputs](DecodedLog.md#inputs)

## Properties

### authority

• **authority**: [`ETHERSCAN`](../enums/DecodingAuthority.md#etherscan)

The source used to provide the decoded log.

#### Defined in

[src/types/types.ts:994](https://github.com/alchemyplatform/alchemy-sdk-js/blob/44aa50c/src/types/types.ts#L994)

___

### eventName

• **eventName**: `string`

The decoded name of the log event.

#### Defined in

[src/types/types.ts:990](https://github.com/alchemyplatform/alchemy-sdk-js/blob/44aa50c/src/types/types.ts#L990)

___

### inputs

• **inputs**: [`DecodedLogInput`](DecodedLogInput.md)[]

The decoded inputs to the log.

#### Defined in

[src/types/types.ts:992](https://github.com/alchemyplatform/alchemy-sdk-js/blob/44aa50c/src/types/types.ts#L992)
