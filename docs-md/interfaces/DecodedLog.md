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

[src/types/types.ts:2039](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/types/types.ts#L2039)

___

### eventName

• **eventName**: `string`

The decoded name of the log event.

#### Defined in

[src/types/types.ts:2035](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/types/types.ts#L2035)

___

### inputs

• **inputs**: [`DecodedLogInput`](DecodedLogInput.md)[]

The decoded inputs to the log.

#### Defined in

[src/types/types.ts:2037](https://github.com/alchemyplatform/alchemy-sdk-js/blob/80b6e91/src/types/types.ts#L2037)
