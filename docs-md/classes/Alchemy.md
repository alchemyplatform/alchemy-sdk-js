[@alch/alchemy-sdk](../README.md) / [Exports](../modules.md) / Alchemy

# Class: Alchemy

The Alchemy SDK client. This class holds config information and provides
access to all of Alchemy's APIs.

## Table of contents

### Constructors

- [constructor](Alchemy.md#constructor)

### Properties

- [apiKey](Alchemy.md#apikey)
- [maxRetries](Alchemy.md#maxretries)
- [network](Alchemy.md#network)

### Methods

- [call](Alchemy.md#call)
- [checkNftOwnership](Alchemy.md#checknftownership)
- [estimateGas](Alchemy.md#estimategas)
- [findContractDeployer](Alchemy.md#findcontractdeployer)
- [getAssetTransfers](Alchemy.md#getassettransfers)
- [getBalance](Alchemy.md#getbalance)
- [getBlock](Alchemy.md#getblock)
- [getBlockNumber](Alchemy.md#getblocknumber)
- [getBlockWithTransactions](Alchemy.md#getblockwithtransactions)
- [getCode](Alchemy.md#getcode)
- [getFeeData](Alchemy.md#getfeedata)
- [getGasPrice](Alchemy.md#getgasprice)
- [getLogs](Alchemy.md#getlogs)
- [getNetwork](Alchemy.md#getnetwork)
- [getNftContractMetadata](Alchemy.md#getnftcontractmetadata)
- [getNftFloorPrice](Alchemy.md#getnftfloorprice)
- [getNftMetadata](Alchemy.md#getnftmetadata)
- [getNftsForNftContract](Alchemy.md#getnftsfornftcontract)
- [getNftsForNftContractIterator](Alchemy.md#getnftsfornftcontractiterator)
- [getNftsForOwner](Alchemy.md#getnftsforowner)
- [getNftsForOwnerIterator](Alchemy.md#getnftsforowneriterator)
- [getOwnersForNft](Alchemy.md#getownersfornft)
- [getOwnersForNftContract](Alchemy.md#getownersfornftcontract)
- [getProvider](Alchemy.md#getprovider)
- [getSpamNftContracts](Alchemy.md#getspamnftcontracts)
- [getStorageAt](Alchemy.md#getstorageat)
- [getTokenBalances](Alchemy.md#gettokenbalances)
- [getTokenMetadata](Alchemy.md#gettokenmetadata)
- [getTransaction](Alchemy.md#gettransaction)
- [getTransactionCount](Alchemy.md#gettransactioncount)
- [getTransactionReceipt](Alchemy.md#gettransactionreceipt)
- [getTransactionReceipts](Alchemy.md#gettransactionreceipts)
- [getWebSocketProvider](Alchemy.md#getwebsocketprovider)
- [isSpamNftContract](Alchemy.md#isspamnftcontract)
- [listenerCount](Alchemy.md#listenercount)
- [listeners](Alchemy.md#listeners)
- [off](Alchemy.md#off)
- [on](Alchemy.md#on)
- [once](Alchemy.md#once)
- [ready](Alchemy.md#ready)
- [refreshNftContract](Alchemy.md#refreshnftcontract)
- [refreshNftMetadata](Alchemy.md#refreshnftmetadata)
- [removeAllListeners](Alchemy.md#removealllisteners)
- [send](Alchemy.md#send)
- [sendTransaction](Alchemy.md#sendtransaction)
- [waitForTransaction](Alchemy.md#waitfortransaction)

## Constructors

### constructor

• **new Alchemy**(`config?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | [`AlchemyConfig`](../interfaces/AlchemyConfig.md) |

#### Defined in

[api/alchemy.ts:102](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L102)

## Properties

### apiKey

• `Readonly` **apiKey**: `string`

#### Defined in

[api/alchemy.ts:84](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L84)

___

### maxRetries

• `Readonly` **maxRetries**: `number`

#### Defined in

[api/alchemy.ts:86](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L86)

___

### network

• **network**: [`Network`](../enums/Network.md)

#### Defined in

[api/alchemy.ts:85](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L85)

## Methods

### call

▸ **call**(`transaction`, `blockTag?`): `Promise`<`string`\>

Returns the result of executing the transaction, using call. A call does
not require any ether, but cannot change any state. This is useful for
calling getters on Contracts.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transaction` | `Deferrable`<`TransactionRequest`\> | The transaction to execute. |
| `blockTag?` | `BlockTag` \| `Promise`<`BlockTag`\> | The optional block number or hash to get the call for. |

#### Returns

`Promise`<`string`\>

#### Defined in

[api/alchemy.ts:738](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L738)

___

### checkNftOwnership

▸ **checkNftOwnership**(`owner`, `contractAddresses`): `Promise`<`boolean`\>

Checks that the provided owner address owns one of more of the provided NFTs.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` | The owner address to check. |
| `contractAddresses` | `string`[] | An array of NFT contract addresses to check ownership for. |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[api/alchemy.ts:368](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L368)

___

### estimateGas

▸ **estimateGas**(`transaction`): `Promise`<`BigNumber`\>

Returns an estimate of the amount of gas that would be required to submit
transaction to the network.

An estimate may not be accurate since there could be another transaction on
the network that was not accounted for, but after being mined affects the
relevant state.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transaction` | `Deferrable`<`TransactionRequest`\> | The transaction to estimate gas for. |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[api/alchemy.ts:757](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L757)

___

### findContractDeployer

▸ **findContractDeployer**(`contractAddress`): `Promise`<[`DeployResult`](../interfaces/DeployResult.md)\>

Finds the address that deployed the provided contract and block number it
was deployed in.

NOTE: This method performs a binary search across all blocks since genesis
and can take a long time to complete. This method is a convenience method
that will eventually be replaced by a single call to an Alchemy endpoint
with this information cached.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The contract address to find the deployer for. |

#### Returns

`Promise`<[`DeployResult`](../interfaces/DeployResult.md)\>

#### Defined in

[api/alchemy.ts:420](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L420)

___

### getAssetTransfers

▸ **getAssetTransfers**(`params`): `Promise`<[`AssetTransfersResponse`](../interfaces/AssetTransfersResponse.md)\>

Get transactions for specific addresses. See the web documentation for the
full details:
https://docs.alchemy.com/alchemy/enhanced-apis/transfers-api#alchemy_getassettransfers

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`AssetTransfersParams`](../interfaces/AssetTransfersParams.md) | An object containing fields for the asset transfer query. |

#### Returns

`Promise`<[`AssetTransfersResponse`](../interfaces/AssetTransfersResponse.md)\>

#### Defined in

[api/alchemy.ts:540](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L540)

___

### getBalance

▸ **getBalance**(`addressOrName`, `blockTag?`): `Promise`<`BigNumber`\>

Returns the balance of a given address as of the provided block.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressOrName` | `string` \| `Promise`<`string`\> | The address or name of the account to get the balance for. |
| `blockTag?` | `BlockTag` \| `Promise`<`BlockTag`\> | The optional block number or hash to get the balance for.   Defaults to 'latest' if unspecified. |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[api/alchemy.ts:577](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L577)

___

### getBlock

▸ **getBlock**(`blockHashOrBlockTag`): `Promise`<`Block`\>

Returns the block from the network based on the provided block number or
hash. Transactions on the block are represented as an array of transaction
hashes. To get the full transaction details on the block, use
[getBlockWithTransactions](Alchemy.md#getblockwithtransactions) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockHashOrBlockTag` | `BlockTag` \| `Promise`<`BlockTag`\> | The block number or hash to get the block for. |

#### Returns

`Promise`<`Block`\>

#### Defined in

[api/alchemy.ts:647](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L647)

___

### getBlockNumber

▸ **getBlockNumber**(): `Promise`<`number`\>

Returns the block number of the most recently mined block.

#### Returns

`Promise`<`number`\>

#### Defined in

[api/alchemy.ts:684](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L684)

___

### getBlockWithTransactions

▸ **getBlockWithTransactions**(`blockHashOrBlockTag`): `Promise`<`BlockWithTransactions`\>

Returns the block from the network based on the provided block number or
hash. Transactions on the block are represented as an array of
{@link TransactionResponse} objects.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockHashOrBlockTag` | `BlockTag` \| `Promise`<`BlockTag`\> | The block number or hash to get the block for. |

#### Returns

`Promise`<`BlockWithTransactions`\>

#### Defined in

[api/alchemy.ts:662](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L662)

___

### getCode

▸ **getCode**(`addressOrName`, `blockTag?`): `Promise`<`string`\>

Returns the contract code of the provided address at the block. If there is
no contract deployed, the result is `0x`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressOrName` | `string` \| `Promise`<`string`\> | The address or name of the account to get the code for. |
| `blockTag?` | `BlockTag` \| `Promise`<`BlockTag`\> | The optional block number or hash to get the code for.   Defaults to 'latest' if unspecified. |

#### Returns

`Promise`<`string`\>

#### Defined in

[api/alchemy.ts:594](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L594)

___

### getFeeData

▸ **getFeeData**(): `Promise`<`FeeData`\>

Returns the recommended fee data to use in a transaction.

For an EIP-1559 transaction, the maxFeePerGas and maxPriorityFeePerGas
should be used.

For legacy transactions and networks which do not support EIP-1559, the
gasPrice should be used.

#### Returns

`Promise`<`FeeData`\>

#### Defined in

[api/alchemy.ts:710](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L710)

___

### getGasPrice

▸ **getGasPrice**(): `Promise`<`BigNumber`\>

Returns the best guess of the current gas price to use in a transaction.

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[api/alchemy.ts:694](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L694)

___

### getLogs

▸ **getLogs**(`filter`): `Promise`<`Log`[]\>

Returns an array of logs that match the provided filter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | `Filter` \| `FilterByBlockHash` \| `Promise`<`Filter` \| `FilterByBlockHash`\> | The filter object to use. |

#### Returns

`Promise`<`Log`[]\>

#### Defined in

[api/alchemy.ts:842](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L842)

___

### getNetwork

▸ **getNetwork**(): `Promise`<`Network`\>

Returns the {@link EthersNetworkAlias} Alchemy is connected to.

#### Returns

`Promise`<`Network`\>

#### Defined in

[api/alchemy.ts:674](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L674)

___

### getNftContractMetadata

▸ **getNftContractMetadata**(`contractAddress`): `Promise`<[`NftContract`](../interfaces/NftContract.md)\>

Get the NFT collection metadata associated with the provided parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The contract address of the NFT. |

#### Returns

`Promise`<[`NftContract`](../interfaces/NftContract.md)\>

#### Defined in

[api/alchemy.ts:152](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L152)

▸ **getNftContractMetadata**(`baseNftContract`): `Promise`<[`NftContract`](../interfaces/NftContract.md)\>

Get the NFT metadata associated with the provided Base NFT.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `baseNftContract` | [`BaseNftContract`](../interfaces/BaseNftContract.md) | The base NFT contract object to be used for the request. |

#### Returns

`Promise`<[`NftContract`](../interfaces/NftContract.md)\>

#### Defined in

[api/alchemy.ts:159](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L159)

___

### getNftFloorPrice

▸ **getNftFloorPrice**(`contractAddress`): `Promise`<[`GetNftFloorPriceResponse`](../interfaces/GetNftFloorPriceResponse.md)\>

Returns the floor prices of a NFT contract by marketplace.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The contract address for the NFT collection. |

#### Returns

`Promise`<[`GetNftFloorPriceResponse`](../interfaces/GetNftFloorPriceResponse.md)\>

#### Defined in

[api/alchemy.ts:404](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L404)

___

### getNftMetadata

▸ **getNftMetadata**(`contractAddress`, `tokenId`, `tokenType?`): `Promise`<[`Nft`](../interfaces/Nft.md)\>

Get the NFT metadata associated with the provided parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The contract address of the NFT. |
| `tokenId` | `BigNumberish` | Token id of the NFT. |
| `tokenType?` | [`NftTokenType`](../enums/NftTokenType.md) | Optionally specify the type of token to speed up the query. |

#### Returns

`Promise`<[`Nft`](../interfaces/Nft.md)\>

#### Defined in

[api/alchemy.ts:126](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L126)

▸ **getNftMetadata**(`baseNft`): `Promise`<[`Nft`](../interfaces/Nft.md)\>

Get the NFT metadata associated with the provided Base NFT.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `baseNft` | [`BaseNft`](../interfaces/BaseNft.md) | The base NFT object to be used for the request. |

#### Returns

`Promise`<[`Nft`](../interfaces/Nft.md)\>

#### Defined in

[api/alchemy.ts:137](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L137)

___

### getNftsForNftContract

▸ **getNftsForNftContract**(`contractAddress`, `options?`): `Promise`<[`NftContractNftsResponse`](../interfaces/NftContractNftsResponse.md)\>

Get all NFTs for a given contract address.

This method returns the full NFTs in the contract. To get all NFTs without
their associated metadata, use [GetBaseNftsForNftContractOptions](../interfaces/GetBaseNftsForNftContractOptions.md).

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The contract address of the NFT contract. |
| `options?` | [`GetNftsForNftContractOptions`](../interfaces/GetNftsForNftContractOptions.md) | The parameters to use for the request. or   [NftContractNftsResponse](../interfaces/NftContractNftsResponse.md) response. |

#### Returns

`Promise`<[`NftContractNftsResponse`](../interfaces/NftContractNftsResponse.md)\>

#### Defined in

[api/alchemy.ts:249](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L249)

▸ **getNftsForNftContract**(`contractAddress`, `options?`): `Promise`<[`NftContractBaseNftsResponse`](../interfaces/NftContractBaseNftsResponse.md)\>

Get all base NFTs for a given contract address.

This method returns the base NFTs that omit the associated metadata. To get
all NFTs with their associated metadata, use [GetNftsForNftContractOptions](../interfaces/GetNftsForNftContractOptions.md).

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The contract address of the NFT contract. |
| `options?` | [`GetBaseNftsForNftContractOptions`](../interfaces/GetBaseNftsForNftContractOptions.md) | The optional parameters to use for the request. |

#### Returns

`Promise`<[`NftContractBaseNftsResponse`](../interfaces/NftContractBaseNftsResponse.md)\>

#### Defined in

[api/alchemy.ts:263](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L263)

___

### getNftsForNftContractIterator

▸ **getNftsForNftContractIterator**(`contractAddress`, `options?`): `AsyncIterable`<[`Nft`](../interfaces/Nft.md)\>

Fetches all NFTs for a given contract address and yields them in an async iterable.

This method returns the full NFTs in the contract and pages through all
page keys until all NFTs have been fetched. To get all NFTs without their
associated metadata, use [GetBaseNftsForNftContractOptions](../interfaces/GetBaseNftsForNftContractOptions.md).

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The contract address of the NFT contract. |
| `options?` | [`GetNftsForNftContractOptions`](../interfaces/GetNftsForNftContractOptions.md) | The optional parameters to use for the request. |

#### Returns

`AsyncIterable`<[`Nft`](../interfaces/Nft.md)\>

#### Defined in

[api/alchemy.ts:285](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L285)

▸ **getNftsForNftContractIterator**(`contractAddress`, `options?`): `AsyncIterable`<[`BaseNft`](../interfaces/BaseNft.md)\>

Fetches all base NFTs for a given contract address and yields them in an
async iterable.

This method returns the base NFTs that omit the associated metadata and
pages through all page keys until all NFTs have been fetched. To get all
NFTs with their associated metadata, use [GetNftsForNftContractOptions](../interfaces/GetNftsForNftContractOptions.md).

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The contract address of the NFT contract. |
| `options?` | [`GetBaseNftsForNftContractOptions`](../interfaces/GetBaseNftsForNftContractOptions.md) | The optional parameters to use for the request. |

#### Returns

`AsyncIterable`<[`BaseNft`](../interfaces/BaseNft.md)\>

#### Defined in

[api/alchemy.ts:301](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L301)

___

### getNftsForOwner

▸ **getNftsForOwner**(`owner`, `options?`): `Promise`<[`OwnedNftsResponse`](../interfaces/OwnedNftsResponse.md)\>

Get all NFTs for an owner.

This method returns the full NFTs in the contract. To get all NFTs without
their associated metadata, use [GetBaseNftsForOwnerOptions](../interfaces/GetBaseNftsForOwnerOptions.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` | The address of the owner. |
| `options?` | [`GetNftsForOwnerOptions`](../interfaces/GetNftsForOwnerOptions.md) | The optional parameters to use for the request. |

#### Returns

`Promise`<[`OwnedNftsResponse`](../interfaces/OwnedNftsResponse.md)\>

#### Defined in

[api/alchemy.ts:213](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L213)

▸ **getNftsForOwner**(`owner`, `options?`): `Promise`<[`OwnedBaseNftsResponse`](../interfaces/OwnedBaseNftsResponse.md)\>

Get all base NFTs for an owner.

This method returns the base NFTs that omit the associated metadata. To get
all NFTs with their associated metadata, use [GetNftsForOwnerOptions](../interfaces/GetNftsForOwnerOptions.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` | The address of the owner. |
| `options?` | [`GetBaseNftsForOwnerOptions`](../interfaces/GetBaseNftsForOwnerOptions.md) | The optional parameters to use for the request. |

#### Returns

`Promise`<[`OwnedBaseNftsResponse`](../interfaces/OwnedBaseNftsResponse.md)\>

#### Defined in

[api/alchemy.ts:227](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L227)

___

### getNftsForOwnerIterator

▸ **getNftsForOwnerIterator**(`owner`, `options?`): `AsyncIterable`<[`OwnedNft`](../interfaces/OwnedNft.md)\>

Fetches all NFTs for a given owner and yields them in an async iterable.

This method returns the full NFT for the owner and pages through all page
keys until all NFTs have been fetched.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` | The address of the owner. |
| `options?` | [`GetNftsForOwnerOptions`](../interfaces/GetNftsForOwnerOptions.md) | The optional parameters to use for the request. |

#### Returns

`AsyncIterable`<[`OwnedNft`](../interfaces/OwnedNft.md)\>

#### Defined in

[api/alchemy.ts:178](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L178)

▸ **getNftsForOwnerIterator**(`owner`, `options?`): `AsyncIterable`<[`OwnedBaseNft`](../interfaces/OwnedBaseNft.md)\>

Fetches all NFTs for a given owner and yields them in an async iterable.

This method returns the base NFTs that omit the associated metadata and
pages through all page keys until all NFTs have been fetched.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` | The address of the owner. |
| `options?` | [`GetBaseNftsForOwnerOptions`](../interfaces/GetBaseNftsForOwnerOptions.md) | The optional parameters to use for the request. |

#### Returns

`AsyncIterable`<[`OwnedBaseNft`](../interfaces/OwnedBaseNft.md)\>

#### Defined in

[api/alchemy.ts:192](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L192)

___

### getOwnersForNft

▸ **getOwnersForNft**(`contractAddress`, `tokenId`): `Promise`<[`GetOwnersForNftResponse`](../interfaces/GetOwnersForNftResponse.md)\>

Gets all the owners for a given NFT contract address and token ID.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The NFT contract address. |
| `tokenId` | `BigNumberish` | Token id of the NFT. |

#### Returns

`Promise`<[`GetOwnersForNftResponse`](../interfaces/GetOwnersForNftResponse.md)\>

#### Defined in

[api/alchemy.ts:343](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L343)

▸ **getOwnersForNft**(`nft`): `Promise`<[`GetOwnersForNftResponse`](../interfaces/GetOwnersForNftResponse.md)\>

Gets all the owners for a given NFT.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nft` | [`BaseNft`](../interfaces/BaseNft.md) | The NFT object to get the owners for. |

#### Returns

`Promise`<[`GetOwnersForNftResponse`](../interfaces/GetOwnersForNftResponse.md)\>

#### Defined in

[api/alchemy.ts:353](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L353)

___

### getOwnersForNftContract

▸ **getOwnersForNftContract**(`contractAddress`): `Promise`<[`GetOwnersForNftContractResponse`](../interfaces/GetOwnersForNftContractResponse.md)\>

Gets all the owners for a given NFT contract.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The NFT contract to get the owners for. |

#### Returns

`Promise`<[`GetOwnersForNftContractResponse`](../interfaces/GetOwnersForNftContractResponse.md)\>

#### Defined in

[api/alchemy.ts:318](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L318)

▸ **getOwnersForNftContract**(`nft`): `Promise`<[`GetOwnersForNftContractResponse`](../interfaces/GetOwnersForNftContractResponse.md)\>

Gets all the owners for a given NFT contract.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nft` | [`BaseNft`](../interfaces/BaseNft.md) | The NFT to get the owners of the NFT contract for. |

#### Returns

`Promise`<[`GetOwnersForNftContractResponse`](../interfaces/GetOwnersForNftContractResponse.md)\>

#### Defined in

[api/alchemy.ts:327](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L327)

___

### getProvider

▸ **getProvider**(): `Promise`<`AlchemyProvider`\>

Returns an AlchemyProvider instance. Only one provider is created per
Alchemy instance.

The AlchemyProvider is a wrapper around ether's `AlchemyProvider` class and
has been expanded to support Alchemy's Enhanced APIs.

Most common methods on the provider are available as top-level methods on
the [Alchemy](Alchemy.md) instance, but the provider is exposed here to access
other less-common methods.

#### Returns

`Promise`<`AlchemyProvider`\>

#### Defined in

[api/alchemy.ts:962](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L962)

___

### getSpamNftContracts

▸ **getSpamNftContracts**(): `Promise`<`string`[]\>

Returns a list of all spam contracts marked by Alchemy. For details on how
Alchemy marks spam contracts, go to
https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/nft-api-faq#nft-spam-classification.

**`beta`**

#### Returns

`Promise`<`string`[]\>

#### Defined in

[api/alchemy.ts:394](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L394)

___

### getStorageAt

▸ **getStorageAt**(`addressOrName`, `position`, `blockTag?`): `Promise`<`string`\>

Return the value of the provided position at the provided address, at the
provided block in `Bytes32` format.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressOrName` | `string` \| `Promise`<`string`\> | The address or name of the account to get the code for. |
| `position` | `BigNumberish` \| `Promise`<`BigNumberish`\> | The position of the storage slot to get. |
| `blockTag?` | `BlockTag` \| `Promise`<`BlockTag`\> | The optional block number or hash to get the code for.   Defaults to 'latest' if unspecified. |

#### Returns

`Promise`<`string`\>

#### Defined in

[api/alchemy.ts:612](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L612)

___

### getTokenBalances

▸ **getTokenBalances**(`address`, `contractAddresses?`): `Promise`<[`TokenBalancesResponse`](../interfaces/TokenBalancesResponse.md)\>

Returns the token balances for a specific owner address given a list of contracts.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | The owner address to get the token balances for. |
| `contractAddresses?` | `string`[] | A list of contract addresses to check. If omitted,   the top 100 tokens by 24 hour volume will be checked. |

#### Returns

`Promise`<[`TokenBalancesResponse`](../interfaces/TokenBalancesResponse.md)\>

#### Defined in

[api/alchemy.ts:505](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L505)

___

### getTokenMetadata

▸ **getTokenMetadata**(`address`): `Promise`<[`TokenMetadataResponse`](../interfaces/TokenMetadataResponse.md)\>

Returns metadata for a given token contract address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | The contract address to get metadata for. |

#### Returns

`Promise`<[`TokenMetadataResponse`](../interfaces/TokenMetadataResponse.md)\>

#### Defined in

[api/alchemy.ts:527](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L527)

___

### getTransaction

▸ **getTransaction**(`transactionHash`): `Promise`<``null`` \| `TransactionResponse`\>

Returns the transaction with hash or null if the transaction is unknown.

If a transaction has not been mined, this method will search the
transaction pool. Various backends may have more restrictive transaction
pool access (e.g. if the gas price is too low or the transaction was only
recently sent and not yet indexed) in which case this method may also return null.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionHash` | `string` \| `Promise`<`string`\> | The hash of the transaction to get. |

#### Returns

`Promise`<``null`` \| `TransactionResponse`\>

#### Defined in

[api/alchemy.ts:775](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L775)

___

### getTransactionCount

▸ **getTransactionCount**(`addressOrName`, `blockTag?`): `Promise`<`number`\>

Returns the number of transactions ever sent from the provided address, as
of the provided block tag. This value is used as the nonce for the next
transaction from the address sent to the network.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressOrName` | `string` \| `Promise`<`string`\> | The address or name of the account to get the nonce for. |
| `blockTag?` | `BlockTag` \| `Promise`<`BlockTag`\> | The optional block number or hash to get the nonce for. |

#### Returns

`Promise`<`number`\>

#### Defined in

[api/alchemy.ts:630](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L630)

___

### getTransactionReceipt

▸ **getTransactionReceipt**(`transactionHash`): `Promise`<``null`` \| `TransactionReceipt`\>

Returns the transaction receipt for hash or null if the transaction has not
been mined.

To stall until the transaction has been mined, consider the
waitForTransaction method below.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionHash` | `string` \| `Promise`<`string`\> | The hash of the transaction to get. |

#### Returns

`Promise`<``null`` \| `TransactionReceipt`\>

#### Defined in

[api/alchemy.ts:792](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L792)

___

### getTransactionReceipts

▸ **getTransactionReceipts**(`params`): `Promise`<[`TransactionReceiptsResponse`](../interfaces/TransactionReceiptsResponse.md)\>

Gets all transaction receipts for a given block by number or block hash.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`TransactionReceiptsParams`](../modules.md#transactionreceiptsparams) | An object containing fields for the transaction receipt query. |

#### Returns

`Promise`<[`TransactionReceiptsResponse`](../interfaces/TransactionReceiptsResponse.md)\>

#### Defined in

[api/alchemy.ts:562](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L562)

___

### getWebSocketProvider

▸ **getWebSocketProvider**(): `Promise`<`AlchemyWebSocketProvider`\>

Returns an AlchemyWebsocketProvider instance. Only one provider is created
per Alchemy instance.

The AlchemyWebSocketProvider is a wrapper around ether's
`AlchemyWebSocketProvider` class and has been expanded to support Alchemy's
Subscription APIs, automatic backfilling, and other performance improvements.

Most common methods on the provider are available as top-level methods on
the [Alchemy](Alchemy.md) instance, but the provider is exposed here to access
other less-common methods.

#### Returns

`Promise`<`AlchemyWebSocketProvider`\>

#### Defined in

[api/alchemy.ts:986](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L986)

___

### isSpamNftContract

▸ **isSpamNftContract**(`contractAddress`): `Promise`<`boolean`\>

Returns whether a contract is marked as spam or not by Alchemy. For more
information on how we classify spam, go to our NFT API FAQ at
https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/nft-api-faq#nft-spam-classification.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The contract address to check. |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[api/alchemy.ts:383](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L383)

___

### listenerCount

▸ **listenerCount**(`eventName?`): `Promise`<`number`\>

Returns the number of listeners for the provided {@link eventName} event. If
no event is provided, the total number of listeners for all events is returned.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName?` | [`AlchemyEventType`](../modules.md#alchemyeventtype) | The event to get the number of listeners for. |

#### Returns

`Promise`<`number`\>

#### Defined in

[api/alchemy.ts:933](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L933)

___

### listeners

▸ **listeners**(`eventName?`): `Promise`<`Listener`[]\>

Returns an array of listeners for the provided {@link eventName} event. If
no event is provided, all listeners will be included.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName?` | [`AlchemyEventType`](../modules.md#alchemyeventtype) | The event to get the listeners for. |

#### Returns

`Promise`<`Listener`[]\>

#### Defined in

[api/alchemy.ts:944](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L944)

___

### off

▸ **off**(`eventName`, `listener?`): [`Alchemy`](Alchemy.md)

Removes the provided {@link listener} for the {@link eventName} event. If no
listener is provided, all listeners for the event will be removed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | [`AlchemyEventType`](../modules.md#alchemyeventtype) | The event to unlisten to. |
| `listener?` | `Listener` | The listener to remove. |

#### Returns

[`Alchemy`](Alchemy.md)

#### Defined in

[api/alchemy.ts:903](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L903)

___

### on

▸ **on**(`eventName`, `listener`): [`Alchemy`](Alchemy.md)

Adds a listener to be triggered for each {@link eventName} event. Also
includes Alchemy's Subscription API events. See [AlchemyEventType](../modules.md#alchemyeventtype) for
how to use them.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | [`AlchemyEventType`](../modules.md#alchemyeventtype) | The event to listen for. |
| `listener` | `Listener` | The listener to call when the event is triggered. |

#### Returns

[`Alchemy`](Alchemy.md)

#### Defined in

[api/alchemy.ts:870](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L870)

___

### once

▸ **once**(`eventName`, `listener`): [`Alchemy`](Alchemy.md)

Adds a listener to be triggered for only the next {@link eventName} event,
after which it will be removed. Also includes Alchemy's Subscription API
events. See [AlchemyEventType](../modules.md#alchemyeventtype) for how to use them.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | [`AlchemyEventType`](../modules.md#alchemyeventtype) | The event to listen for. |
| `listener` | `Listener` | The listener to call when the event is triggered. |

#### Returns

[`Alchemy`](Alchemy.md)

#### Defined in

[api/alchemy.ts:887](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L887)

___

### ready

▸ **ready**(): `Promise`<`Network`\>

Returns a Promise which will stall until the network has heen established,
ignoring errors due to the target node not being active yet.

This can be used for testing or attaching scripts to wait until the node is
up and running smoothly.

#### Returns

`Promise`<`Network`\>

#### Defined in

[api/alchemy.ts:724](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L724)

___

### refreshNftContract

▸ **refreshNftContract**(`contractAddress`): `Promise`<[`RefreshNftContractResult`](../interfaces/RefreshNftContractResult.md)\>

Triggers a metadata refresh all NFTs in the provided contract address. This
method is useful after an NFT collection is revealed.

Refreshes are queued on the Alchemy backend and may take time to fully
process. To refresh the metadata for a specific token, use the
[refreshNftMetadata](Alchemy.md#refreshnftmetadata) method instead.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The contract address of the NFT collection. |

#### Returns

`Promise`<[`RefreshNftContractResult`](../interfaces/RefreshNftContractResult.md)\>

#### Defined in

[api/alchemy.ts:476](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L476)

▸ **refreshNftContract**(`nft`): `Promise`<[`RefreshNftContractResult`](../interfaces/RefreshNftContractResult.md)\>

Triggers a metadata refresh all NFTs in the provided contract address. This
method is useful after an NFT collection is revealed.

Refreshes are queued on the Alchemy backend and may take time to fully
process. To refresh the metadata for a specific token, use the
[refreshNftMetadata](Alchemy.md#refreshnftmetadata) method instead.

**`beta`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nft` | [`BaseNft`](../interfaces/BaseNft.md) | The contract address of the NFT collection. |

#### Returns

`Promise`<[`RefreshNftContractResult`](../interfaces/RefreshNftContractResult.md)\>

#### Defined in

[api/alchemy.ts:490](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L490)

___

### refreshNftMetadata

▸ **refreshNftMetadata**(`contractAddress`, `tokenId`): `Promise`<`boolean`\>

Refreshes the cached metadata for a provided NFT contract address and token
id. Returns a boolean value indicating whether the metadata was refreshed.

This method is useful when you want to refresh the metadata for a NFT that
has been updated since the last time it was fetched. Note that the backend
only allows one refresh per token every 15 minutes, globally for all users.
The last refresh time for an NFT can be accessed on the
[Nft.timeLastUpdated](../interfaces/Nft.md#timelastupdated) field.

To trigger a refresh for all NFTs in a contract, use
[refreshNftContract](Alchemy.md#refreshnftcontract) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | The contract address of the NFT. |
| `tokenId` | `BigNumberish` | The token id of the NFT. |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[api/alchemy.ts:440](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L440)

▸ **refreshNftMetadata**(`nft`): `Promise`<`boolean`\>

Refreshes the cached metadata for a provided NFT contract address and token
id. Returns a boolean value indicating whether the metadata was refreshed.

This method is useful when you want to refresh the metadata for a NFT that
has been updated since the last time it was fetched. Note that the backend
only allows one refresh per token every 15 minutes, globally for all users.

To trigger a refresh for all NFTs in a contract, use
[refreshNftContract](Alchemy.md#refreshnftcontract) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nft` | [`BaseNft`](../interfaces/BaseNft.md) | The NFT to refresh the metadata for. |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[api/alchemy.ts:457](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L457)

___

### removeAllListeners

▸ **removeAllListeners**(`eventName?`): [`Alchemy`](Alchemy.md)

Remove all listeners for the provided {@link eventName} event. If no event
is provided, all events and their listeners are removed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName?` | [`AlchemyEventType`](../modules.md#alchemyeventtype) | The event to remove all listeners for. |

#### Returns

[`Alchemy`](Alchemy.md)

#### Defined in

[api/alchemy.ts:918](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L918)

___

### send

▸ **send**(`method`, `params`): `Promise`<`any`\>

Allows sending a raw message to the Alchemy backend.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `method` | `string` | The method to call. |
| `params` | `any`[] | The parameters to pass to the method. |

#### Returns

`Promise`<`any`\>

#### Defined in

[api/alchemy.ts:856](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L856)

___

### sendTransaction

▸ **sendTransaction**(`signedTransaction`): `Promise`<`TransactionResponse`\>

Submits transaction to the network to be mined. The transaction must be
signed, and be valid (i.e. the nonce is correct and the account has
sufficient balance to pay for the transaction).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signedTransaction` | `string` \| `Promise`<`string`\> | The signed transaction to send. |

#### Returns

`Promise`<`TransactionResponse`\>

#### Defined in

[api/alchemy.ts:807](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L807)

___

### waitForTransaction

▸ **waitForTransaction**(`transactionHash`, `confirmations?`, `timeout?`): `Promise`<``null`` \| `TransactionReceipt`\>

Returns a promise which will not resolve until specified transaction hash is mined.

If {@link confirmations} is 0, this method is non-blocking and if the
transaction has not been mined returns null. Otherwise, this method will
block until the transaction has confirmed blocks mined on top of the block
in which it was mined.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionHash` | `string` | The hash of the transaction to wait for. |
| `confirmations?` | `number` | The number of blocks to wait for. |
| `timeout?` | `number` | The maximum time to wait for the transaction to confirm. |

#### Returns

`Promise`<``null`` \| `TransactionReceipt`\>

#### Defined in

[api/alchemy.ts:827](https://github.com/alchemyplatform/alchemy-sdk-js/blob/865aa2b/src/api/alchemy.ts#L827)
