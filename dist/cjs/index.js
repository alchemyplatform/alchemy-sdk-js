'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('./api/utils');
var bignumber = require('@ethersproject/bignumber');
var axios = require('axios');
var abstractProvider = require('@ethersproject/abstract-provider');
var wallet = require('@ethersproject/wallet');
var contracts = require('@ethersproject/contracts');
var SturdyWebSocket = require('sturdy-websocket');
var networks = require('@ethersproject/networks');
var providers = require('@ethersproject/providers');
var web = require('@ethersproject/web');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var utils__namespace = /*#__PURE__*/_interopNamespace(utils);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
var SturdyWebSocket__default = /*#__PURE__*/_interopDefaultLegacy(SturdyWebSocket);

/**
 * The supported networks by Alchemy. Note that some functions are not available
 * on all networks. Please refer to the Alchemy documentation for which APIs are
 * available on which networks
 * {@link https://docs.alchemy.com/alchemy/apis/feature-support-by-chain}
 *
 * @public
 */
exports.Network = void 0;
(function (Network) {
    Network["ETH_MAINNET"] = "eth-mainnet";
    Network["ETH_GOERLI"] = "eth-goerli";
    Network["ETH_SEPOLIA"] = "eth-sepolia";
    Network["OPT_MAINNET"] = "opt-mainnet";
    Network["OPT_GOERLI"] = "opt-goerli";
    Network["OPT_SEPOLIA"] = "opt-sepolia";
    Network["ARB_MAINNET"] = "arb-mainnet";
    Network["ARB_GOERLI"] = "arb-goerli";
    Network["ARB_SEPOLIA"] = "arb-sepolia";
    Network["MATIC_MAINNET"] = "polygon-mainnet";
    Network["MATIC_MUMBAI"] = "polygon-mumbai";
    Network["ASTAR_MAINNET"] = "astar-mainnet";
    Network["POLYGONZKEVM_MAINNET"] = "polygonzkevm-mainnet";
    Network["POLYGONZKEVM_TESTNET"] = "polygonzkevm-testnet";
    Network["BASE_MAINNET"] = "base-mainnet";
    Network["BASE_GOERLI"] = "base-goerli";
    Network["BASE_SEPOLIA"] = "base-sepolia";
})(exports.Network || (exports.Network = {}));
/** Token Types for the `getTokenBalances()` endpoint. */
exports.TokenBalanceType = void 0;
(function (TokenBalanceType) {
    /**
     * Option to fetch the top 100 tokens by 24-hour volume. This option is only
     * available on Mainnet in Ethereum, Polygon, and Arbitrum.
     */
    TokenBalanceType["DEFAULT_TOKENS"] = "DEFAULT_TOKENS";
    /**
     * Option to fetch the set of ERC-20 tokens that the address as ever held. his
     * list is produced by an address's historical transfer activity and includes
     * all tokens that the address has ever received.
     */
    TokenBalanceType["ERC20"] = "erc20";
})(exports.TokenBalanceType || (exports.TokenBalanceType = {}));
/**
 * Categories of transfers to use with the {@link AssetTransfersParams} request
 * object when using {@link CoreNamespace.getAssetTransfers}.
 *
 * @public
 */
exports.AssetTransfersCategory = void 0;
(function (AssetTransfersCategory) {
    /**
     * Top level ETH transactions that occur where the `fromAddress` is an
     * external user-created address. External addresses have private keys and are
     * accessed by users.
     */
    AssetTransfersCategory["EXTERNAL"] = "external";
    /**
     * Top level ETH transactions that occur where the `fromAddress` is an
     * internal, smart contract address. For example, a smart contract calling
     * another smart contract or sending
     */
    AssetTransfersCategory["INTERNAL"] = "internal";
    /** ERC20 transfers. */
    AssetTransfersCategory["ERC20"] = "erc20";
    /** ERC721 transfers. */
    AssetTransfersCategory["ERC721"] = "erc721";
    /** ERC1155 transfers. */
    AssetTransfersCategory["ERC1155"] = "erc1155";
    /** Special contracts that don't follow ERC 721/1155, (ex: CryptoKitties). */
    AssetTransfersCategory["SPECIALNFT"] = "specialnft";
})(exports.AssetTransfersCategory || (exports.AssetTransfersCategory = {}));
/**
 * The type of transfer for the request. Note that using `TO` will also include
 * NFTs that were minted by the owner.
 */
exports.GetTransfersForOwnerTransferType = void 0;
(function (GetTransfersForOwnerTransferType) {
    GetTransfersForOwnerTransferType["TO"] = "TO";
    GetTransfersForOwnerTransferType["FROM"] = "FROM";
})(exports.GetTransfersForOwnerTransferType || (exports.GetTransfersForOwnerTransferType = {}));
/**
 * Enum for representing the supported sorting orders of the API.
 *
 * @public
 */
exports.SortingOrder = void 0;
(function (SortingOrder) {
    SortingOrder["ASCENDING"] = "asc";
    SortingOrder["DESCENDING"] = "desc";
})(exports.SortingOrder || (exports.SortingOrder = {}));
/** An OpenSea collection's approval status. */
exports.OpenSeaSafelistRequestStatus = void 0;
(function (OpenSeaSafelistRequestStatus) {
    /** Verified collection. */
    OpenSeaSafelistRequestStatus["VERIFIED"] = "verified";
    /** Collections that are approved on open sea and can be found in search results. */
    OpenSeaSafelistRequestStatus["APPROVED"] = "approved";
    /** Collections that requested safelisting on OpenSea. */
    OpenSeaSafelistRequestStatus["REQUESTED"] = "requested";
    /** Brand new collections. */
    OpenSeaSafelistRequestStatus["NOT_REQUESTED"] = "not_requested";
})(exports.OpenSeaSafelistRequestStatus || (exports.OpenSeaSafelistRequestStatus = {}));
/**
 * Method names for Alchemy's custom Subscription API endpoints.
 *
 * This value is provided in the `method` field when creating an event filter on
 * the Websocket Namespace.
 */
exports.AlchemySubscription = void 0;
(function (AlchemySubscription) {
    AlchemySubscription["PENDING_TRANSACTIONS"] = "alchemy_pendingTransactions";
    AlchemySubscription["MINED_TRANSACTIONS"] = "alchemy_minedTransactions";
})(exports.AlchemySubscription || (exports.AlchemySubscription = {}));
/**
 * Asset type returned when calling {@link TransactNamespace.simulateAssetChanges}.
 * Allows you to determine if the assets approved or / and transferred are
 * native, tokens or NFTs.
 */
exports.SimulateAssetType = void 0;
(function (SimulateAssetType) {
    /**
     * Native transfers that involve the currency of the chain the simulation is
     * run on (ex: ETH for Ethereum, MATIC for Polygon, ETH for Arbitrum).
     */
    SimulateAssetType["NATIVE"] = "NATIVE";
    /** ERC20 approval or transfers. */
    SimulateAssetType["ERC20"] = "ERC20";
    /** ERC721 approval or transfers. */
    SimulateAssetType["ERC721"] = "ERC721";
    /** ERC1155 approval or transfers. */
    SimulateAssetType["ERC1155"] = "ERC1155";
    /**
     * Special contracts that don't follow ERC 721/1155.Currently limited to
     * CryptoKitties and CryptoPunks.
     */
    SimulateAssetType["SPECIAL_NFT"] = "SPECIAL_NFT";
})(exports.SimulateAssetType || (exports.SimulateAssetType = {}));
/**
 * Change type returned when calling {@link TransactNamespace.simulateAssetChanges}.
 */
exports.SimulateChangeType = void 0;
(function (SimulateChangeType) {
    /**
     * Represents a transaction that approved or disapproved permissions for a
     * contract.
     *
     * APPROVE without token ID → approve all tokens
     * APPROVE without amount → approve all amount
     * APPROVE with zero amount → approval being cleared
     */
    SimulateChangeType["APPROVE"] = "APPROVE";
    /**
     * Represents a transaction that transferred tokens from one address to another.
     */
    SimulateChangeType["TRANSFER"] = "TRANSFER";
})(exports.SimulateChangeType || (exports.SimulateChangeType = {}));
/**
 * Authority used to decode calls and logs when using the
 * {@link TransactNamespace.simulateExecution} method.
 */
exports.DecodingAuthority = void 0;
(function (DecodingAuthority) {
    DecodingAuthority["ETHERSCAN"] = "ETHERSCAN";
})(exports.DecodingAuthority || (exports.DecodingAuthority = {}));
/** The type of call in a debug call trace. */
exports.DebugCallType = void 0;
(function (DebugCallType) {
    DebugCallType["CREATE"] = "CREATE";
    DebugCallType["CALL"] = "CALL";
    DebugCallType["STATICCALL"] = "STATICCALL";
    DebugCallType["DELEGATECALL"] = "DELEGATECALL";
})(exports.DebugCallType || (exports.DebugCallType = {}));
/**
 * Potential transaction job statuses for a {@link GasOptimizedTransactionResponse}
 *
 * @internal
 */
// TODO(txjob): Remove internal tag once this feature is released.
exports.GasOptimizedTransactionStatus = void 0;
(function (GasOptimizedTransactionStatus) {
    GasOptimizedTransactionStatus["UNSPECIFIED"] = "TRANSACTION_JOB_STATUS_UNSPECIFIED";
    GasOptimizedTransactionStatus["IN_PROGRESS"] = "IN_PROGRESS";
    GasOptimizedTransactionStatus["COMPLETE"] = "COMPLETE";
    GasOptimizedTransactionStatus["ABANDONED"] = "ABANDONED";
})(exports.GasOptimizedTransactionStatus || (exports.GasOptimizedTransactionStatus = {}));
/** The version of the webhook. All newly created webhooks default to V2. */
exports.WebhookVersion = void 0;
(function (WebhookVersion) {
    WebhookVersion["V1"] = "V1";
    WebhookVersion["V2"] = "V2";
})(exports.WebhookVersion || (exports.WebhookVersion = {}));
/** The type of {@link Webhook}. */
exports.WebhookType = void 0;
(function (WebhookType) {
    WebhookType["MINED_TRANSACTION"] = "MINED_TRANSACTION";
    WebhookType["DROPPED_TRANSACTION"] = "DROPPED_TRANSACTION";
    WebhookType["ADDRESS_ACTIVITY"] = "ADDRESS_ACTIVITY";
    WebhookType["NFT_ACTIVITY"] = "NFT_ACTIVITY";
    WebhookType["NFT_METADATA_UPDATE"] = "NFT_METADATA_UPDATE";
    WebhookType["GRAPHQL"] = "GRAPHQL";
})(exports.WebhookType || (exports.WebhookType = {}));
/**
 * Commitment level of the target block with using methods in the
 * {@link DebugNamespace}
 */
exports.CommitmentLevel = void 0;
(function (CommitmentLevel) {
    /**
     * Sample next block inferred by Alchemy built on top of the latest block.
     * This contains the set of transactions taken from the local mempool and
     * is a proxy for blocks that have not been mined yet.
     */
    CommitmentLevel["PENDING"] = "pending";
    /**
     * The most recent block in the canonical chain observed by Alchemy. Note that
     * this block may be re-orged out of the canonical chain.
     */
    CommitmentLevel["LATEST"] = "latest";
    /**
     * The most recent crypto-economically secure block that cannot be re-orged
     * outside of manual intervention driven by community coordination. This is
     * only available on {@link Network.ETH_GOERLI} and {@link Network.ETH_SEPOLIA}.
     */
    CommitmentLevel["SAFE"] = "safe";
    /**
     * The most recent secure block that has been accepted by >2/3 of validators.
     * This block is very unlikely to be re-orged. This is only available on
     * {@link Network.ETH_GOERLI} and {@link Network.ETH_SEPOLIA}.
     */
    CommitmentLevel["FINALIZED"] = "finalized";
    /**
     * The lowest numbered block available that is usually the first block created.
     */
    CommitmentLevel["EARLIEST"] = "earliest";
})(exports.CommitmentLevel || (exports.CommitmentLevel = {}));
/**
 * The type of tracer to use when running debug methods in the
 * {@link DebugNamespace}.
 */
exports.DebugTracerType = void 0;
(function (DebugTracerType) {
    DebugTracerType["CALL_TRACER"] = "callTracer";
    DebugTracerType["PRESTATE_TRACER"] = "prestateTracer";
})(exports.DebugTracerType || (exports.DebugTracerType = {}));

/**
 * An enum for specifying the token type on NFTs.
 *
 * @public
 */
exports.NftTokenType = void 0;
(function (NftTokenType) {
    NftTokenType["ERC721"] = "ERC721";
    NftTokenType["ERC1155"] = "ERC1155";
    NftTokenType["NO_SUPPORTED_NFT_STANDARD"] = "NO_SUPPORTED_NFT_STANDARD";
    NftTokenType["NOT_A_CONTRACT"] = "NOT_A_CONTRACT";
    NftTokenType["UNKNOWN"] = "UNKNOWN";
})(exports.NftTokenType || (exports.NftTokenType = {}));
/** Potential reasons why an NFT contract was classified as spam. */
exports.NftSpamClassification = void 0;
(function (NftSpamClassification) {
    NftSpamClassification["Erc721TooManyOwners"] = "Erc721TooManyOwners";
    NftSpamClassification["Erc721TooManyTokens"] = "Erc721TooManyTokens";
    NftSpamClassification["Erc721DishonestTotalSupply"] = "Erc721DishonestTotalSupply";
    NftSpamClassification["MostlyHoneyPotOwners"] = "MostlyHoneyPotOwners";
    NftSpamClassification["OwnedByMostHoneyPots"] = "OwnedByMostHoneyPots";
    NftSpamClassification["LowDistinctOwnersPercent"] = "LowDistinctOwnersPercent";
    NftSpamClassification["HighHoneyPotOwnerPercent"] = "HighHoneyPotOwnerPercent";
    NftSpamClassification["HighHoneyPotPercent"] = "HighHoneyPotPercent";
    NftSpamClassification["HoneyPotsOwnMultipleTokens"] = "HoneyPotsOwnMultipleTokens";
    NftSpamClassification["NoSalesActivity"] = "NoSalesActivity";
    NftSpamClassification["HighAirdropPercent"] = "HighAirdropPercent";
    NftSpamClassification["Unknown"] = "Unknown";
})(exports.NftSpamClassification || (exports.NftSpamClassification = {}));
/**
 * Enum of NFT filters that can be applied to a {@link getNftsForOwner} or a
 * {@link getContractsForOwner} request.
 *
 * @beta
 */
exports.NftFilters = void 0;
(function (NftFilters) {
    /** NFTs that have been classified as spam. */
    NftFilters["SPAM"] = "SPAM";
    /** NFTs that have been airdropped to a user. */
    NftFilters["AIRDROPS"] = "AIRDROPS";
})(exports.NftFilters || (exports.NftFilters = {}));
/**
 * Enum of ordering that can be applied to a {@link getNftsForOwner} or a
 * {@link getContractsForOwner} response.
 *
 * @beta
 */
exports.NftOrdering = void 0;
(function (NftOrdering) {
    NftOrdering["TRANSFERTIME"] = "TRANSFERTIME";
})(exports.NftOrdering || (exports.NftOrdering = {}));
/**
 * Enum representing the supported NFT marketplaces by the
 * {@link NftNamespace.getNftSales} method.
 *
 * @public
 */
exports.NftSaleMarketplace = void 0;
(function (NftSaleMarketplace) {
    NftSaleMarketplace["SEAPORT"] = "seaport";
    NftSaleMarketplace["LOOKSRARE"] = "looksrare";
    NftSaleMarketplace["X2Y2"] = "x2y2";
    NftSaleMarketplace["WYVERN"] = "wyvern";
    NftSaleMarketplace["CRYPTOPUNKS"] = "cryptopunks";
    NftSaleMarketplace["BLUR"] = "blur";
    NftSaleMarketplace["UNKNOWN"] = "unknown";
})(exports.NftSaleMarketplace || (exports.NftSaleMarketplace = {}));
/**
 * Enum for specifying the taker type for the {@link NftNamespace.getNftSales}
 * method.
 *
 * @public
 */
exports.NftSaleTakerType = void 0;
(function (NftSaleTakerType) {
    NftSaleTakerType["BUYER"] = "buyer";
    NftSaleTakerType["SELLER"] = "seller";
})(exports.NftSaleTakerType || (exports.NftSaleTakerType = {}));
/** The current state of the NFT contract refresh process. */
exports.NftRefreshState = void 0;
(function (NftRefreshState) {
    /** The provided contract is not an NFT or does not contain metadata. */
    NftRefreshState["DOES_NOT_EXIST"] = "does_not_exist";
    /** The contract has already been queued for refresh. */
    NftRefreshState["ALREADY_QUEUED"] = "already_queued";
    /** The contract is currently being refreshed. */
    NftRefreshState["IN_PROGRESS"] = "in_progress";
    /** The contract refresh is complete. */
    NftRefreshState["FINISHED"] = "finished";
    /** The contract refresh has been queued and await execution. */
    NftRefreshState["QUEUED"] = "queued";
    /** The contract was unable to be queued due to an internal error. */
    NftRefreshState["QUEUE_FAILED"] = "queue_failed";
})(exports.NftRefreshState || (exports.NftRefreshState = {}));
/**
 * Enum representing the supported NFT marketplaces on a
 * {@link NftCollectionFloorPrice} object.
 */
exports.NftCollectionMarketplace = void 0;
(function (NftCollectionMarketplace) {
    NftCollectionMarketplace["OPENSEA"] = "OpenSea";
})(exports.NftCollectionMarketplace || (exports.NftCollectionMarketplace = {}));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter$1(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

const DEFAULT_ALCHEMY_API_KEY = 'demo';
const DEFAULT_NETWORK = exports.Network.ETH_MAINNET;
const DEFAULT_MAX_RETRIES = 5;
const DEFAULT_REQUEST_TIMEOUT = 0; // 0 = no timeout
/**
 * Returns the base URL for making Alchemy API requests. The `alchemy.com`
 * endpoints only work with non eth json-rpc requests.
 *
 * @internal
 */
function getAlchemyHttpUrl(network, apiKey) {
    return `https://${network}.g.alchemy.com/v2/${apiKey}`;
}
function getAlchemyNftHttpUrl(network, apiKey) {
    return `https://${network}.g.alchemy.com/nft/v3/${apiKey}`;
}
function getAlchemyWsUrl(network, apiKey) {
    return `wss://${network}.g.alchemy.com/v2/${apiKey}`;
}
function getAlchemyWebhookHttpUrl() {
    return 'https://dashboard.alchemy.com/api';
}
var AlchemyApiType;
(function (AlchemyApiType) {
    AlchemyApiType[AlchemyApiType["BASE"] = 0] = "BASE";
    AlchemyApiType[AlchemyApiType["NFT"] = 1] = "NFT";
    AlchemyApiType[AlchemyApiType["WEBHOOK"] = 2] = "WEBHOOK";
})(AlchemyApiType || (AlchemyApiType = {}));
/**
 * Mapping of network names to their corresponding Network strings used to
 * create an Ethers.js Provider instance.
 */
const EthersNetwork = {
    [exports.Network.ETH_MAINNET]: 'mainnet',
    [exports.Network.ETH_GOERLI]: 'goerli',
    [exports.Network.ETH_SEPOLIA]: 'sepolia',
    [exports.Network.OPT_MAINNET]: 'optimism',
    [exports.Network.OPT_GOERLI]: 'optimism-goerli',
    [exports.Network.OPT_SEPOLIA]: 'optimism-sepolia',
    [exports.Network.ARB_MAINNET]: 'arbitrum',
    [exports.Network.ARB_GOERLI]: 'arbitrum-goerli',
    [exports.Network.ARB_SEPOLIA]: 'arbitrum-sepolia',
    [exports.Network.MATIC_MAINNET]: 'matic',
    [exports.Network.MATIC_MUMBAI]: 'maticmum',
    [exports.Network.ASTAR_MAINNET]: 'astar-mainnet',
    [exports.Network.POLYGONZKEVM_MAINNET]: 'polygonzkevm-mainnet',
    [exports.Network.POLYGONZKEVM_TESTNET]: 'polygonzkevm-testnet',
    [exports.Network.BASE_MAINNET]: 'base-mainnet',
    [exports.Network.BASE_GOERLI]: 'base-goerli',
    [exports.Network.BASE_SEPOLIA]: 'base-sepolia'
};
/**
 * Mapping of network names to their corresponding Ethers Network objects. These
 * networks are not yet supported by Ethers and are listed here to be overriden
 * in the provider.
 */
const CustomNetworks = {
    'arbitrum-goerli': {
        chainId: 421613,
        name: 'arbitrum-goerli'
    },
    'arbitrum-sepolia': {
        chainId: 421614,
        name: 'arbitrum-sepolia'
    },
    'astar-mainnet': {
        chainId: 592,
        name: 'astar-mainnet'
    },
    sepolia: {
        chainId: 11155111,
        name: 'sepolia'
    },
    'optimism-sepolia': {
        chainId: 11155420,
        name: 'optimism-sepolia'
    },
    'polygonzkevm-mainnet': {
        chainId: 1101,
        name: 'polygonzkevm-mainnet'
    },
    'polygonzkevm-testnet': {
        chainId: 1442,
        name: 'polygonzkevm-testnet'
    },
    'base-mainnet': {
        chainId: 8453,
        name: 'base-mainnet'
    },
    'base-goerli': {
        chainId: 84531,
        name: 'base-goerli'
    },
    'base-sepolia': {
        chainId: 84532,
        name: 'base-sepolia'
    }
};
function noop() {
    // It's a no-op
}
const ETH_NULL_VALUE = '0x';
const ETH_NULL_ADDRESS = '0x0000000000000000000000000000000000000000';

/**
 * This class holds the config information for the SDK client instance and
 * exposes the underlying providers for more advanced use cases.
 *
 * @public
 */
class AlchemyConfig {
    constructor(config) {
        this.apiKey = (config === null || config === void 0 ? void 0 : config.apiKey) || DEFAULT_ALCHEMY_API_KEY;
        this.network = (config === null || config === void 0 ? void 0 : config.network) || DEFAULT_NETWORK;
        this.maxRetries = (config === null || config === void 0 ? void 0 : config.maxRetries) || DEFAULT_MAX_RETRIES;
        this.url = config === null || config === void 0 ? void 0 : config.url;
        this.authToken = config === null || config === void 0 ? void 0 : config.authToken;
        this.batchRequests = (config === null || config === void 0 ? void 0 : config.batchRequests) || false;
        this.requestTimeout = (config === null || config === void 0 ? void 0 : config.requestTimeout) || DEFAULT_REQUEST_TIMEOUT;
    }
    /**
     * Returns the URL endpoint to send the HTTP request to. If a custom URL was
     * provided in the config, that URL is returned. Otherwise, the default URL is
     * from the network and API key.
     *
     * @param apiType - The type of API to get the URL for.
     * @internal
     */
    _getRequestUrl(apiType) {
        if (this.url !== undefined) {
            return this.url;
        }
        else if (apiType === AlchemyApiType.NFT) {
            return getAlchemyNftHttpUrl(this.network, this.apiKey);
        }
        else if (apiType === AlchemyApiType.WEBHOOK) {
            return getAlchemyWebhookHttpUrl();
        }
        else {
            return getAlchemyHttpUrl(this.network, this.apiKey);
        }
    }
    /**
     * Returns an AlchemyProvider instance. Only one provider is created per
     * Alchemy instance.
     *
     * The AlchemyProvider is a wrapper around ether's `AlchemyProvider` class and
     * has been expanded to support Alchemy's Enhanced APIs.
     *
     * Most common methods on the provider are available as top-level methods on
     * the {@link Alchemy} instance, but the provider is exposed here to access
     * other less-common methods.
     *
     * @public
     */
    getProvider() {
        if (!this._baseAlchemyProvider) {
            this._baseAlchemyProvider = (() => __awaiter$1(this, void 0, void 0, function* () {
                const { AlchemyProvider } = yield Promise.resolve().then(function () { return alchemyProvider; });
                return new AlchemyProvider(this);
            }))();
        }
        return this._baseAlchemyProvider;
    }
    /**
     * Returns an AlchemyWebsocketProvider instance. Only one provider is created
     * per Alchemy instance.
     *
     * The AlchemyWebSocketProvider is a wrapper around ether's
     * `AlchemyWebSocketProvider` class and has been expanded to support Alchemy's
     * Subscription APIs, automatic backfilling, and other performance improvements.
     *
     * Most common methods on the provider are available as top-level methods on
     * the {@link Alchemy} instance, but the provider is exposed here to access
     * other less-common methods.
     */
    getWebSocketProvider() {
        if (!this._baseAlchemyWssProvider) {
            this._baseAlchemyWssProvider = (() => __awaiter$1(this, void 0, void 0, function* () {
                const { AlchemyWebSocketProvider } = yield Promise.resolve().then(function () { return alchemyWebsocketProvider; });
                return new AlchemyWebSocketProvider(this);
            }))();
        }
        return this._baseAlchemyWssProvider;
    }
}

const version$1 = "logger/5.7.0";

let _permanentCensorErrors = false;
let _censorErrors = false;
const LogLevels = { debug: 1, "default": 2, info: 2, warning: 3, error: 4, off: 5 };
let _logLevel = LogLevels["default"];
let _globalLogger = null;
function _checkNormalize() {
    try {
        const missing = [];
        // Make sure all forms of normalization are supported
        ["NFD", "NFC", "NFKD", "NFKC"].forEach((form) => {
            try {
                if ("test".normalize(form) !== "test") {
                    throw new Error("bad normalize");
                }
                ;
            }
            catch (error) {
                missing.push(form);
            }
        });
        if (missing.length) {
            throw new Error("missing " + missing.join(", "));
        }
        if (String.fromCharCode(0xe9).normalize("NFD") !== String.fromCharCode(0x65, 0x0301)) {
            throw new Error("broken implementation");
        }
    }
    catch (error) {
        return error.message;
    }
    return null;
}
const _normalizeError = _checkNormalize();
var LogLevel$1;
(function (LogLevel) {
    LogLevel["DEBUG"] = "DEBUG";
    LogLevel["INFO"] = "INFO";
    LogLevel["WARNING"] = "WARNING";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["OFF"] = "OFF";
})(LogLevel$1 || (LogLevel$1 = {}));
var ErrorCode;
(function (ErrorCode) {
    ///////////////////
    // Generic Errors
    // Unknown Error
    ErrorCode["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
    // Not Implemented
    ErrorCode["NOT_IMPLEMENTED"] = "NOT_IMPLEMENTED";
    // Unsupported Operation
    //   - operation
    ErrorCode["UNSUPPORTED_OPERATION"] = "UNSUPPORTED_OPERATION";
    // Network Error (i.e. Ethereum Network, such as an invalid chain ID)
    //   - event ("noNetwork" is not re-thrown in provider.ready; otherwise thrown)
    ErrorCode["NETWORK_ERROR"] = "NETWORK_ERROR";
    // Some sort of bad response from the server
    ErrorCode["SERVER_ERROR"] = "SERVER_ERROR";
    // Timeout
    ErrorCode["TIMEOUT"] = "TIMEOUT";
    ///////////////////
    // Operational  Errors
    // Buffer Overrun
    ErrorCode["BUFFER_OVERRUN"] = "BUFFER_OVERRUN";
    // Numeric Fault
    //   - operation: the operation being executed
    //   - fault: the reason this faulted
    ErrorCode["NUMERIC_FAULT"] = "NUMERIC_FAULT";
    ///////////////////
    // Argument Errors
    // Missing new operator to an object
    //  - name: The name of the class
    ErrorCode["MISSING_NEW"] = "MISSING_NEW";
    // Invalid argument (e.g. value is incompatible with type) to a function:
    //   - argument: The argument name that was invalid
    //   - value: The value of the argument
    ErrorCode["INVALID_ARGUMENT"] = "INVALID_ARGUMENT";
    // Missing argument to a function:
    //   - count: The number of arguments received
    //   - expectedCount: The number of arguments expected
    ErrorCode["MISSING_ARGUMENT"] = "MISSING_ARGUMENT";
    // Too many arguments
    //   - count: The number of arguments received
    //   - expectedCount: The number of arguments expected
    ErrorCode["UNEXPECTED_ARGUMENT"] = "UNEXPECTED_ARGUMENT";
    ///////////////////
    // Blockchain Errors
    // Call exception
    //  - transaction: the transaction
    //  - address?: the contract address
    //  - args?: The arguments passed into the function
    //  - method?: The Solidity method signature
    //  - errorSignature?: The EIP848 error signature
    //  - errorArgs?: The EIP848 error parameters
    //  - reason: The reason (only for EIP848 "Error(string)")
    ErrorCode["CALL_EXCEPTION"] = "CALL_EXCEPTION";
    // Insufficient funds (< value + gasLimit * gasPrice)
    //   - transaction: the transaction attempted
    ErrorCode["INSUFFICIENT_FUNDS"] = "INSUFFICIENT_FUNDS";
    // Nonce has already been used
    //   - transaction: the transaction attempted
    ErrorCode["NONCE_EXPIRED"] = "NONCE_EXPIRED";
    // The replacement fee for the transaction is too low
    //   - transaction: the transaction attempted
    ErrorCode["REPLACEMENT_UNDERPRICED"] = "REPLACEMENT_UNDERPRICED";
    // The gas limit could not be estimated
    //   - transaction: the transaction passed to estimateGas
    ErrorCode["UNPREDICTABLE_GAS_LIMIT"] = "UNPREDICTABLE_GAS_LIMIT";
    // The transaction was replaced by one with a higher gas price
    //   - reason: "cancelled", "replaced" or "repriced"
    //   - cancelled: true if reason == "cancelled" or reason == "replaced")
    //   - hash: original transaction hash
    //   - replacement: the full TransactionsResponse for the replacement
    //   - receipt: the receipt of the replacement
    ErrorCode["TRANSACTION_REPLACED"] = "TRANSACTION_REPLACED";
    ///////////////////
    // Interaction Errors
    // The user rejected the action, such as signing a message or sending
    // a transaction
    ErrorCode["ACTION_REJECTED"] = "ACTION_REJECTED";
})(ErrorCode || (ErrorCode = {}));
const HEX = "0123456789abcdef";
class Logger$1 {
    constructor(version) {
        Object.defineProperty(this, "version", {
            enumerable: true,
            value: version,
            writable: false
        });
    }
    _log(logLevel, args) {
        const level = logLevel.toLowerCase();
        if (LogLevels[level] == null) {
            this.throwArgumentError("invalid log level name", "logLevel", logLevel);
        }
        if (_logLevel > LogLevels[level]) {
            return;
        }
        console.log.apply(console, args);
    }
    debug(...args) {
        this._log(Logger$1.levels.DEBUG, args);
    }
    info(...args) {
        this._log(Logger$1.levels.INFO, args);
    }
    warn(...args) {
        this._log(Logger$1.levels.WARNING, args);
    }
    makeError(message, code, params) {
        // Errors are being censored
        if (_censorErrors) {
            return this.makeError("censored error", code, {});
        }
        if (!code) {
            code = Logger$1.errors.UNKNOWN_ERROR;
        }
        if (!params) {
            params = {};
        }
        const messageDetails = [];
        Object.keys(params).forEach((key) => {
            const value = params[key];
            try {
                if (value instanceof Uint8Array) {
                    let hex = "";
                    for (let i = 0; i < value.length; i++) {
                        hex += HEX[value[i] >> 4];
                        hex += HEX[value[i] & 0x0f];
                    }
                    messageDetails.push(key + "=Uint8Array(0x" + hex + ")");
                }
                else {
                    messageDetails.push(key + "=" + JSON.stringify(value));
                }
            }
            catch (error) {
                messageDetails.push(key + "=" + JSON.stringify(params[key].toString()));
            }
        });
        messageDetails.push(`code=${code}`);
        messageDetails.push(`version=${this.version}`);
        const reason = message;
        let url = "";
        switch (code) {
            case ErrorCode.NUMERIC_FAULT: {
                url = "NUMERIC_FAULT";
                const fault = message;
                switch (fault) {
                    case "overflow":
                    case "underflow":
                    case "division-by-zero":
                        url += "-" + fault;
                        break;
                    case "negative-power":
                    case "negative-width":
                        url += "-unsupported";
                        break;
                    case "unbound-bitwise-result":
                        url += "-unbound-result";
                        break;
                }
                break;
            }
            case ErrorCode.CALL_EXCEPTION:
            case ErrorCode.INSUFFICIENT_FUNDS:
            case ErrorCode.MISSING_NEW:
            case ErrorCode.NONCE_EXPIRED:
            case ErrorCode.REPLACEMENT_UNDERPRICED:
            case ErrorCode.TRANSACTION_REPLACED:
            case ErrorCode.UNPREDICTABLE_GAS_LIMIT:
                url = code;
                break;
        }
        if (url) {
            message += " [ See: https:/\/links.ethers.org/v5-errors-" + url + " ]";
        }
        if (messageDetails.length) {
            message += " (" + messageDetails.join(", ") + ")";
        }
        // @TODO: Any??
        const error = new Error(message);
        error.reason = reason;
        error.code = code;
        Object.keys(params).forEach(function (key) {
            error[key] = params[key];
        });
        return error;
    }
    throwError(message, code, params) {
        throw this.makeError(message, code, params);
    }
    throwArgumentError(message, name, value) {
        return this.throwError(message, Logger$1.errors.INVALID_ARGUMENT, {
            argument: name,
            value: value
        });
    }
    assert(condition, message, code, params) {
        if (!!condition) {
            return;
        }
        this.throwError(message, code, params);
    }
    assertArgument(condition, message, name, value) {
        if (!!condition) {
            return;
        }
        this.throwArgumentError(message, name, value);
    }
    checkNormalize(message) {
        if (_normalizeError) {
            this.throwError("platform missing String.prototype.normalize", Logger$1.errors.UNSUPPORTED_OPERATION, {
                operation: "String.prototype.normalize", form: _normalizeError
            });
        }
    }
    checkSafeUint53(value, message) {
        if (typeof (value) !== "number") {
            return;
        }
        if (message == null) {
            message = "value not safe";
        }
        if (value < 0 || value >= 0x1fffffffffffff) {
            this.throwError(message, Logger$1.errors.NUMERIC_FAULT, {
                operation: "checkSafeInteger",
                fault: "out-of-safe-range",
                value: value
            });
        }
        if (value % 1) {
            this.throwError(message, Logger$1.errors.NUMERIC_FAULT, {
                operation: "checkSafeInteger",
                fault: "non-integer",
                value: value
            });
        }
    }
    checkArgumentCount(count, expectedCount, message) {
        if (message) {
            message = ": " + message;
        }
        else {
            message = "";
        }
        if (count < expectedCount) {
            this.throwError("missing argument" + message, Logger$1.errors.MISSING_ARGUMENT, {
                count: count,
                expectedCount: expectedCount
            });
        }
        if (count > expectedCount) {
            this.throwError("too many arguments" + message, Logger$1.errors.UNEXPECTED_ARGUMENT, {
                count: count,
                expectedCount: expectedCount
            });
        }
    }
    checkNew(target, kind) {
        if (target === Object || target == null) {
            this.throwError("missing new", Logger$1.errors.MISSING_NEW, { name: kind.name });
        }
    }
    checkAbstract(target, kind) {
        if (target === kind) {
            this.throwError("cannot instantiate abstract class " + JSON.stringify(kind.name) + " directly; use a sub-class", Logger$1.errors.UNSUPPORTED_OPERATION, { name: target.name, operation: "new" });
        }
        else if (target === Object || target == null) {
            this.throwError("missing new", Logger$1.errors.MISSING_NEW, { name: kind.name });
        }
    }
    static globalLogger() {
        if (!_globalLogger) {
            _globalLogger = new Logger$1(version$1);
        }
        return _globalLogger;
    }
    static setCensorship(censorship, permanent) {
        if (!censorship && permanent) {
            this.globalLogger().throwError("cannot permanently disable censorship", Logger$1.errors.UNSUPPORTED_OPERATION, {
                operation: "setCensorship"
            });
        }
        if (_permanentCensorErrors) {
            if (!censorship) {
                return;
            }
            this.globalLogger().throwError("error censorship permanent", Logger$1.errors.UNSUPPORTED_OPERATION, {
                operation: "setCensorship"
            });
        }
        _censorErrors = !!censorship;
        _permanentCensorErrors = !!permanent;
    }
    static setLogLevel(logLevel) {
        const level = LogLevels[logLevel.toLowerCase()];
        if (level == null) {
            Logger$1.globalLogger().warn("invalid log level - " + logLevel);
            return;
        }
        _logLevel = level;
    }
    static from(version) {
        return new Logger$1(version);
    }
}
Logger$1.errors = ErrorCode;
Logger$1.levels = LogLevel$1;

const version = "properties/5.7.0";

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const logger = new Logger$1(version);
function defineReadOnly(object, name, value) {
    Object.defineProperty(object, name, {
        enumerable: true,
        value: value,
        writable: false,
    });
}
function resolveProperties(object) {
    return __awaiter(this, void 0, void 0, function* () {
        const promises = Object.keys(object).map((key) => {
            const value = object[key];
            return Promise.resolve(value).then((v) => ({ key: key, value: v }));
        });
        const results = yield Promise.all(promises);
        return results.reduce((accum, result) => {
            accum[(result.key)] = result.value;
            return accum;
        }, {});
    });
}
const opaque = { bigint: true, boolean: true, "function": true, number: true, string: true };
function _isFrozen(object) {
    // Opaque objects are not mutable, so safe to copy by assignment
    if (object === undefined || object === null || opaque[typeof (object)]) {
        return true;
    }
    if (Array.isArray(object) || typeof (object) === "object") {
        if (!Object.isFrozen(object)) {
            return false;
        }
        const keys = Object.keys(object);
        for (let i = 0; i < keys.length; i++) {
            let value = null;
            try {
                value = object[keys[i]];
            }
            catch (error) {
                // If accessing a value triggers an error, it is a getter
                // designed to do so (e.g. Result) and is therefore "frozen"
                continue;
            }
            if (!_isFrozen(value)) {
                return false;
            }
        }
        return true;
    }
    return logger.throwArgumentError(`Cannot deepCopy ${typeof (object)}`, "object", object);
}
// Returns a new copy of object, such that no properties may be replaced.
// New properties may be added only to objects.
function _deepCopy(object) {
    if (_isFrozen(object)) {
        return object;
    }
    // Arrays are mutable, so we need to create a copy
    if (Array.isArray(object)) {
        return Object.freeze(object.map((item) => deepCopy(item)));
    }
    if (typeof (object) === "object") {
        const result = {};
        for (const key in object) {
            const value = object[key];
            if (value === undefined) {
                continue;
            }
            defineReadOnly(result, key, deepCopy(value));
        }
        return result;
    }
    return logger.throwArgumentError(`Cannot deepCopy ${typeof (object)}`, "object", object);
}
function deepCopy(object) {
    return _deepCopy(object);
}

/**
 * Converts a hex string to a decimal number.
 *
 * @param hexString - The hex string to convert.
 * @public
 */
function fromHex(hexString) {
    return bignumber.BigNumber.from(hexString).toNumber();
}
/**
 * Converts a number to a hex string.
 *
 * @param num - The number to convert to hex.
 * @public
 */
function toHex(num) {
    return bignumber.BigNumber.from(num).toHexString();
}
/**
 * Checks if a value is a hex string.
 *
 * @param possibleHexString - The value to check.
 * @public
 */
function isHex(possibleHexString) {
    return /^0x[0-9a-fA-F]+$/.test(possibleHexString);
}

function formatBlock(block) {
    if (typeof block === 'string') {
        return block;
    }
    else if (Number.isInteger(block)) {
        return toHex(block);
    }
    return block.toString();
}
function stringToEnum(x, enumb) {
    return Object.values(enumb).includes(x) ? x : null;
}
function getNftContractForNftFromRaw(rawNftContract) {
    return nullsToUndefined(Object.assign(Object.assign({}, getNftContractFromRaw(rawNftContract)), { spamClassifications: rawNftContract.spamClassifications.map(parseNftSpamClassification) }));
}
function getNftContractsForOwnerFromRaw(rawNftContract) {
    return nullsToUndefined(Object.assign(Object.assign({}, getNftContractFromRaw(rawNftContract)), { displayNft: rawNftContract.displayNft, image: rawNftContract.image, totalBalance: rawNftContract.totalBalance, numDistinctTokensOwned: rawNftContract.numDistinctTokensOwned, isSpam: rawNftContract.isSpam }));
}
function getNftContractFromRaw(rawNftContract) {
    return nullsToUndefined(Object.assign(Object.assign({}, rawNftContract), { tokenType: parseNftTokenType(rawNftContract.tokenType), openSeaMetadata: Object.assign(Object.assign({}, rawNftContract.openSeaMetadata), { safelistRequestStatus: rawNftContract.openSeaMetadata.safelistRequestStatus !== null
                ? stringToEnum(rawNftContract.openSeaMetadata.safelistRequestStatus, exports.OpenSeaSafelistRequestStatus)
                : null }) }));
}
function getNftCollectionFromRaw(rawNftCollection) {
    return nullsToUndefined(Object.assign(Object.assign({}, rawNftCollection), { floorPrice: Object.assign(Object.assign({}, rawNftCollection.floorPrice), { marketplace: parseNftCollectionMarketplace(rawNftCollection.floorPrice.marketplace) }) }));
}
function getBaseNftFromRaw(rawBaseNft, contractAddress) {
    return {
        contractAddress: contractAddress
            ? contractAddress
            : rawBaseNft.contractAddress,
        tokenId: rawBaseNft.tokenId
    };
}
function getNftFromRaw(rawNft) {
    return nullsToUndefined(Object.assign(Object.assign({}, rawNft), { contract: getNftContractForNftFromRaw(rawNft.contract), tokenType: parseNftTokenType(rawNft.tokenType), acquiredAt: rawNft.acquiredAt, collection: rawNft.collection, mint: rawNft.mint }));
}
function getNftSalesFromRaw(rawNftSales) {
    return nullsToUndefined({
        nftSales: rawNftSales.nftSales.map(rawNftSale => (Object.assign(Object.assign({}, rawNftSale), { marketplace: parseNftSaleMarketplace(rawNftSale.marketplace), taker: parseNftTaker(rawNftSale.taker) }))),
        validAt: rawNftSales.validAt,
        pageKey: rawNftSales.pageKey
    });
}
function parseNftSaleMarketplace(marketplace) {
    switch (marketplace) {
        case 'looksrare':
            return exports.NftSaleMarketplace.LOOKSRARE;
        case 'seaport':
            return exports.NftSaleMarketplace.SEAPORT;
        case 'x2y2':
            return exports.NftSaleMarketplace.X2Y2;
        case 'wyvern':
            return exports.NftSaleMarketplace.WYVERN;
        case 'cryptopunks':
            return exports.NftSaleMarketplace.CRYPTOPUNKS;
        case 'blur':
            return exports.NftSaleMarketplace.BLUR;
        default:
            return exports.NftSaleMarketplace.UNKNOWN;
    }
}
function parseNftCollectionMarketplace(marketplace) {
    switch (marketplace) {
        case 'OpenSea':
            return exports.NftCollectionMarketplace.OPENSEA;
        default:
            return undefined;
    }
}
function parseNftTaker(taker) {
    // The `.toLowerCase()` call is needed because the API returns the capitalized values
    switch (taker.toLowerCase()) {
        case 'buyer':
            return exports.NftSaleTakerType.BUYER;
        case 'seller':
            return exports.NftSaleTakerType.SELLER;
        default:
            throw new Error(`Unsupported NftSaleTakerType ${taker}`);
    }
}
function parseNftSpamClassification(s) {
    const res = stringToEnum(s, exports.NftSpamClassification);
    if (res == null) {
        return exports.NftSpamClassification.Unknown;
    }
    return res;
}
function parseNftTokenType(tokenType) {
    switch (tokenType) {
        case 'erc721':
        case 'ERC721':
            return exports.NftTokenType.ERC721;
        case 'erc1155':
        case 'ERC1155':
            return exports.NftTokenType.ERC1155;
        case 'no_supported_nft_standard':
        case 'NO_SUPPORTED_NFT_STANDARD':
            return exports.NftTokenType.NO_SUPPORTED_NFT_STANDARD;
        case 'not_a_contract':
        case 'NOT_A_CONTRACT':
            return exports.NftTokenType.NOT_A_CONTRACT;
        default:
            return exports.NftTokenType.UNKNOWN;
    }
}
const IS_BROWSER = typeof window !== 'undefined' && window !== null;
function nullsToUndefined(obj) {
    if (obj === null || obj === undefined) {
        return undefined;
    }
    if (obj.constructor.name === 'Object' || Array.isArray(obj)) {
        for (const key in obj) {
            obj[key] = nullsToUndefined(obj[key]);
        }
    }
    return obj;
}

/**
 * This file contains the underlying implementations for exposed API surface in
 * the {@link CoreNamespace}. By moving the methods out into a separate file,
 * other namespaces can access these methods without depending on the entire
 * CoreNamespace, or override the `srcMethod` param used for logging.
 */
/**
 * Gets the asset transfers for the provided params.
 */
function getAssetTransfers(config, params, srcMethod = 'getAssetTransfers') {
    return __awaiter$1(this, void 0, void 0, function* () {
        const provider = yield config.getProvider();
        if (params.fromAddress) {
            params.fromAddress = yield provider._getAddress(params.fromAddress);
        }
        if (params.toAddress) {
            params.toAddress = yield provider._getAddress(params.toAddress);
        }
        return provider._send('alchemy_getAssetTransfers', [
            Object.assign(Object.assign({}, params), { fromBlock: params.fromBlock != null ? formatBlock(params.fromBlock) : undefined, toBlock: params.toBlock != null ? formatBlock(params.toBlock) : undefined, maxCount: params.maxCount != null ? toHex(params.maxCount) : undefined })
        ], srcMethod);
    });
}
function getTransactionReceipts(config, params, srcMethod = 'getTransactionReceipts') {
    return __awaiter$1(this, void 0, void 0, function* () {
        const provider = yield config.getProvider();
        return provider._send('alchemy_getTransactionReceipts', [params], srcMethod);
    });
}
/**
 * This method is based on the ethers implementation of getLogs, but is expanded
 * to support specifying an address array in the filter.
 *
 * The main modifications made to support an address array are:
 * - Custom `getFilter()` method that supports an address array
 * - Use of `arrayOf()` formatter to format the logs to avoid the `Formatter` import.
 * - Use of `provider.send()` to avoid formatting logic in `provider.perform()`.
 */
function getLogs(config, filter) {
    return __awaiter$1(this, void 0, void 0, function* () {
        const provider = yield config.getProvider();
        yield provider.getNetwork();
        const params = yield resolveProperties({
            filter: getFilter(config, filter)
        });
        const logs = yield provider.send('eth_getLogs', [params.filter]);
        logs.forEach(log => {
            if (log.removed == null) {
                log.removed = false;
            }
        });
        return arrayOf(provider.formatter.filterLog.bind(provider.formatter))(logs);
    });
}
/**
 * This method is based on and copied from the ethers implementation of
 * `JsonRpcProvider._getFilter()`, but is extended to support an address array.
 *
 * This implementation is a hacky way to get around the ethers formatter. The
 * formatter is used to check the types of the `filter` params, but ethers does
 * not allow an array in the `address` field. To preserve the ethers formatter
 * on the other fields, we use the formatter to check the types of those other
 * fields, and then manually check the `address` field last.
 */
function getFilter(config, filter) {
    return __awaiter$1(this, void 0, void 0, function* () {
        // START MODIFIED CODE
        const provider = yield config.getProvider();
        const resolvedFilter = yield filter;
        let result = {};
        // END MODIFIED CODE
        ['blockHash', 'topics'].forEach(key => {
            if (resolvedFilter[key] == null) {
                return;
            }
            result[key] = resolvedFilter[key];
        });
        ['fromBlock', 'toBlock'].forEach(key => {
            if (resolvedFilter[key] == null) {
                return;
            }
            result[key] = provider._getBlockTag(resolvedFilter[key]);
        });
        // BEGIN MODIFIED CODE
        // Format the `result` object using the ethers formatter without the `address`
        // field.
        result = provider.formatter.filter(yield resolveProperties(result));
        // After formatting the other fields, manually format the `address` field
        // before adding it to the `result` object.
        if (Array.isArray(resolvedFilter.address)) {
            result.address = yield Promise.all(resolvedFilter.address.map((address) => __awaiter$1(this, void 0, void 0, function* () { return provider._getAddress(address); })));
        }
        else if (resolvedFilter.address != null) {
            result.address = yield provider._getAddress(resolvedFilter.address);
        }
        return result;
        // END MODIFIED CODE
    });
}
/**
 * DO NOT MODIFY.
 *
 * This function is directly copied over from ethers implementation of
 * `Formatter.arrayOf()`. It is copied here to avoid having to import the
 * `Formatter` class or `FormatterFunc` type from ethers, that are not part of
 * the default export.
 *
 * This function returns a function that applies the formatter to an array of
 * values, and is used to format the logs returned by `getLogs()`.
 */
function arrayOf(format) {
    return function (array) {
        if (!Array.isArray(array)) {
            throw new Error('not an array');
        }
        const result = [];
        array.forEach(value => {
            result.push(format(value));
        });
        return result;
    };
}

/**
 * The core namespace contains all commonly-used [Ethers.js
 * Provider](https://docs.ethers.io/v5/api/providers/api-providers/#AlchemyProvider)
 * methods. If you are already using Ethers.js, you should be simply able to
 * replace the Ethers.js Provider object with `alchemy.core` when accessing
 * provider methods and it should just work.
 *
 * Do not call this constructor directly. Instead, instantiate an Alchemy object
 * with `const alchemy = new Alchemy(config)` and then access the core namespace
 * via `alchemy.core`.
 */
class CoreNamespace {
    /** @internal */
    constructor(config) {
        this.config = config;
    }
    /**
     * Returns the balance of a given address as of the provided block.
     *
     * @param addressOrName The address or name of the account to get the balance for.
     * @param blockTag The optional block number or hash to get the balance for.
     *   Defaults to 'latest' if unspecified.
     * @public
     */
    getBalance(addressOrName, blockTag) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getBalance(addressOrName, blockTag);
        });
    }
    /**
     * Checks if the provided address is a smart contract.
     *
     * @param address The address to check type for.
     * @public
     */
    isContractAddress(address) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            const code = yield provider.getCode(address);
            return code !== '0x';
        });
    }
    /**
     * Returns the contract code of the provided address at the block. If there is
     * no contract deployed, the result is `0x`.
     *
     * @param addressOrName The address or name of the account to get the code for.
     * @param blockTag The optional block number or hash to get the code for.
     *   Defaults to 'latest' if unspecified.
     * @public
     */
    getCode(addressOrName, blockTag) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getCode(addressOrName, blockTag);
        });
    }
    /**
     * Return the value of the provided position at the provided address, at the
     * provided block in `Bytes32` format.
     *
     * @param addressOrName The address or name of the account to get the code for.
     * @param position The position of the storage slot to get.
     * @param blockTag The optional block number or hash to get the code for.
     *   Defaults to 'latest' if unspecified.
     * @public
     */
    getStorageAt(addressOrName, position, blockTag) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getStorageAt(addressOrName, position, blockTag);
        });
    }
    /**
     * Returns the number of transactions ever sent from the provided address, as
     * of the provided block tag. This value is used as the nonce for the next
     * transaction from the address sent to the network.
     *
     * @param addressOrName The address or name of the account to get the nonce for.
     * @param blockTag The optional block number or hash to get the nonce for.
     * @public
     */
    getTransactionCount(addressOrName, blockTag) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getTransactionCount(addressOrName, blockTag);
        });
    }
    /**
     * Returns the block from the network based on the provided block number or
     * hash. Transactions on the block are represented as an array of transaction
     * hashes. To get the full transaction details on the block, use
     * {@link getBlockWithTransactions} instead.
     *
     * @param blockHashOrBlockTag The block number or hash to get the block for.
     * @public
     */
    getBlock(blockHashOrBlockTag) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getBlock(blockHashOrBlockTag);
        });
    }
    /**
     * Returns the block from the network based on the provided block number or
     * hash. Transactions on the block are represented as an array of
     * {@link TransactionResponse} objects.
     *
     * @param blockHashOrBlockTag The block number or hash to get the block for.
     * @public
     */
    getBlockWithTransactions(blockHashOrBlockTag) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getBlockWithTransactions(blockHashOrBlockTag);
        });
    }
    /**
     * Returns the {@link EthersNetworkAlias} Alchemy is connected to.
     *
     * @public
     */
    getNetwork() {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getNetwork();
        });
    }
    /**
     * Returns the block number of the most recently mined block.
     *
     * @public
     */
    getBlockNumber() {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getBlockNumber();
        });
    }
    /**
     * Returns the best guess of the current gas price to use in a transaction.
     *
     * @public
     */
    getGasPrice() {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getGasPrice();
        });
    }
    /**
     * Returns the recommended fee data to use in a transaction.
     *
     * For an EIP-1559 transaction, the maxFeePerGas and maxPriorityFeePerGas
     * should be used.
     *
     * For legacy transactions and networks which do not support EIP-1559, the
     * gasPrice should be used.
     *
     * @public
     */
    getFeeData() {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getFeeData();
        });
    }
    /**
     * Returns a Promise which will stall until the network has heen established,
     * ignoring errors due to the target node not being active yet.
     *
     * This can be used for testing or attaching scripts to wait until the node is
     * up and running smoothly.
     *
     * @public
     */
    ready() {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.ready;
        });
    }
    /**
     * Returns the result of executing the transaction, using call. A call does
     * not require any ether, but cannot change any state. This is useful for
     * calling getters on Contracts.
     *
     * @param transaction The transaction to execute.
     * @param blockTag The optional block number or hash to get the call for.
     * @public
     */
    call(transaction, blockTag) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.call(transaction, blockTag);
        });
    }
    /**
     * Returns an estimate of the amount of gas that would be required to submit
     * transaction to the network.
     *
     * An estimate may not be accurate since there could be another transaction on
     * the network that was not accounted for, but after being mined affects the
     * relevant state.
     *
     * This is an alias for {@link TransactNamespace.estimateGas}.
     *
     * @param transaction The transaction to estimate gas for.
     * @public
     */
    estimateGas(transaction) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.estimateGas(transaction);
        });
    }
    /**
     * Returns the transaction with hash or null if the transaction is unknown.
     *
     * If a transaction has not been mined, this method will search the
     * transaction pool. Various backends may have more restrictive transaction
     * pool access (e.g. if the gas price is too low or the transaction was only
     * recently sent and not yet indexed) in which case this method may also return null.
     *
     * NOTE: This is an alias for {@link TransactNamespace.getTransaction}.
     *
     * @param transactionHash The hash of the transaction to get.
     * @public
     */
    getTransaction(transactionHash) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getTransaction(transactionHash);
        });
    }
    /**
     * Returns the transaction receipt for hash or null if the transaction has not
     * been mined.
     *
     * To stall until the transaction has been mined, consider the
     * waitForTransaction method below.
     *
     * @param transactionHash The hash of the transaction to get.
     * @public
     */
    getTransactionReceipt(transactionHash) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getTransactionReceipt(transactionHash);
        });
    }
    /**
     * Submits transaction to the network to be mined. The transaction must be
     * signed, and be valid (i.e. the nonce is correct and the account has
     * sufficient balance to pay for the transaction).
     *
     * NOTE: This is an alias for {@link TransactNamespace.getTransaction}.
     *
     * @param signedTransaction The signed transaction to send.
     * @public
     */
    sendTransaction(signedTransaction) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.sendTransaction(signedTransaction);
        });
    }
    /**
     * Returns a promise which will not resolve until specified transaction hash is mined.
     *
     * If {@link confirmations} is 0, this method is non-blocking and if the
     * transaction has not been mined returns null. Otherwise, this method will
     * block until the transaction has confirmed blocks mined on top of the block
     * in which it was mined.
     *
     * NOTE: This is an alias for {@link TransactNamespace.getTransaction}.
     *
     * @param transactionHash The hash of the transaction to wait for.
     * @param confirmations The number of blocks to wait for.
     * @param timeout The maximum time to wait for the transaction to confirm.
     * @public
     */
    waitForTransaction(transactionHash, confirmations, timeout) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.waitForTransaction(transactionHash, confirmations, timeout);
        });
    }
    /**
     * Returns an array of logs that match the provided filter.
     *
     * @param filter The filter object to use.
     * @public
     */
    getLogs(filter) {
        return __awaiter$1(this, void 0, void 0, function* () {
            return getLogs(this.config, filter);
        });
    }
    /**
     * Allows sending a raw message to the Alchemy backend.
     *
     * @param method The method to call.
     * @param params The parameters to pass to the method.
     * @public
     */
    send(method, params) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.send(method, params);
        });
    }
    /**
     * Finds the address that deployed the provided contract and block number it
     * was deployed in.
     *
     * NOTE: This method performs a binary search across all blocks since genesis
     * and can take a long time to complete. This method is a convenience method
     * that will eventually be replaced by a single call to an Alchemy endpoint
     * with this information cached.
     *
     * @param contractAddress - The contract address to find the deployer for.
     * @beta
     */
    findContractDeployer(contractAddress) {
        var _a;
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            const currentBlockNum = yield provider.getBlockNumber();
            if ((yield provider.getCode(contractAddress, currentBlockNum)) ===
                ETH_NULL_VALUE) {
                throw new Error(`Contract '${contractAddress}' does not exist`);
            }
            // Binary search for the block number that the contract was deployed in.
            const firstBlock = yield binarySearchFirstBlock(0, currentBlockNum + 1, contractAddress, this.config);
            // Find the first transaction in the block that matches the provided address.
            const txReceipts = yield getTransactionReceipts(this.config, {
                blockNumber: toHex(firstBlock)
            }, 'findContractDeployer');
            const matchingReceipt = (_a = txReceipts.receipts) === null || _a === void 0 ? void 0 : _a.find(receipt => receipt.contractAddress === contractAddress.toLowerCase());
            return {
                deployerAddress: matchingReceipt === null || matchingReceipt === void 0 ? void 0 : matchingReceipt.from,
                blockNumber: firstBlock
            };
        });
    }
    getTokenBalances(addressOrName, contractAddressesOrOptions) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            const address = yield provider._getAddress(addressOrName);
            if (Array.isArray(contractAddressesOrOptions)) {
                if (contractAddressesOrOptions.length > 1500) {
                    throw new Error('You cannot pass in more than 1500 contract addresses to getTokenBalances()');
                }
                if (contractAddressesOrOptions.length === 0) {
                    throw new Error('getTokenBalances() requires at least one contractAddress when using an array');
                }
                return provider._send('alchemy_getTokenBalances', [address, contractAddressesOrOptions], 'getTokenBalances');
            }
            else {
                const tokenType = contractAddressesOrOptions === undefined
                    ? exports.TokenBalanceType.ERC20
                    : contractAddressesOrOptions.type;
                const params = [address, tokenType];
                if ((contractAddressesOrOptions === null || contractAddressesOrOptions === void 0 ? void 0 : contractAddressesOrOptions.type) === exports.TokenBalanceType.ERC20 &&
                    contractAddressesOrOptions.pageKey) {
                    params.push({ pageKey: contractAddressesOrOptions.pageKey });
                }
                return provider._send('alchemy_getTokenBalances', params, 'getTokenBalances');
            }
        });
    }
    /**
     * Returns the tokens that the specified address owns, along with the amount
     * of each token and the relevant metadata.
     *
     * @param addressOrName The owner address to get the tokens with balances for.
     * @param options Additional options to pass to the request.
     * @public
     */
    getTokensForOwner(addressOrName, options) {
        var _a;
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            const address = yield provider._getAddress(addressOrName);
            const params = [
                address,
                (_a = options === null || options === void 0 ? void 0 : options.contractAddresses) !== null && _a !== void 0 ? _a : exports.TokenBalanceType.ERC20
            ];
            if (options === null || options === void 0 ? void 0 : options.pageKey) {
                params.push({ pageKey: options.pageKey });
            }
            const response = (yield provider._send('alchemy_getTokenBalances', params, 'getTokensForOwner'));
            const formattedBalances = response.tokenBalances.map(balance => ({
                contractAddress: balance.contractAddress,
                rawBalance: bignumber.BigNumber.from(balance.tokenBalance).toString()
            }));
            const metadataPromises = yield Promise.allSettled(response.tokenBalances.map(token => provider._send('alchemy_getTokenMetadata', [token.contractAddress], 'getTokensForOwner', 
            /* forceBatch= */ true)));
            const metadata = metadataPromises.map(p => p.status === 'fulfilled'
                ? p.value
                : {
                    name: null,
                    symbol: null,
                    decimals: null,
                    logo: null
                });
            const ownedTokens = formattedBalances.map((balance, index) => (Object.assign(Object.assign(Object.assign({}, balance), metadata[index]), { balance: metadata[index].decimals !== null
                    ? utils.formatUnits(balance.rawBalance, metadata[index].decimals)
                    : undefined })));
            return {
                tokens: ownedTokens.map(t => nullsToUndefined(t)),
                pageKey: response.pageKey
            };
        });
    }
    /**
     * Returns metadata for a given token contract address.
     *
     * @param address The contract address to get metadata for.
     * @public
     */
    getTokenMetadata(address) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider._send('alchemy_getTokenMetadata', [address], 'getTokenMetadata');
        });
    }
    getAssetTransfers(params) {
        return __awaiter$1(this, void 0, void 0, function* () {
            return getAssetTransfers(this.config, params);
        });
    }
    /**
     * Gets all transaction receipts for a given block by number or block hash.
     *
     * @param params An object containing fields for the transaction receipt query.
     * @public
     */
    getTransactionReceipts(params) {
        return __awaiter$1(this, void 0, void 0, function* () {
            return getTransactionReceipts(this.config, params);
        });
    }
    /**
     * Returns the underlying owner address for the provided ENS address, or `null`
     * if the ENS name does not have an underlying address.
     *
     * @param name The ENS address name to resolve.
     */
    resolveName(name) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.resolveName(name);
        });
    }
    /**
     * Performs a reverse lookup of the address in ENS using the Reverse Registrar. If the name does not exist, or the forward lookup does not match, null is returned.
     *
     * An ENS name requires additional configuration to setup a reverse record, so not all ENS addresses will map back to the original ENS domain.
     *
     * @param address The address to look up the ENS domain name for.
     */
    lookupAddress(address) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.lookupAddress(address);
        });
    }
}
/**
 * Perform a binary search between an integer range of block numbers to find the
 * block number where the contract was deployed.
 *
 * @internal
 */
function binarySearchFirstBlock(start, end, address, config) {
    return __awaiter$1(this, void 0, void 0, function* () {
        if (start >= end) {
            return end;
        }
        const mid = Math.floor((start + end) / 2);
        const provider = yield config.getProvider();
        const code = yield provider.getCode(address, mid);
        if (code === ETH_NULL_VALUE) {
            return binarySearchFirstBlock(mid + 1, end, address, config);
        }
        return binarySearchFirstBlock(start, mid, address, config);
    });
}

/**
 * The Debug namespace contains methods to access the non-standard RPC methods
 * for inspecting and debugging transactions.
 *
 * For more information on the different methods and use cases please read our
 * [documentation](https://docs.alchemy.com/reference/debug-api-quickstart).
 *
 * Do not call this constructor directly. Instead, instantiate an Alchemy object
 * with `const alchemy = new Alchemy(config)` and then access the debug namespace
 * via `alchemy.debug`.
 */
class DebugNamespace {
    /** @internal */
    constructor(config) {
        this.config = config;
    }
    traceCall(transaction, blockIdentifier, tracer) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            const params = [transaction, blockIdentifier, parseTracerParams(tracer)];
            return provider._send('debug_traceCall', params, 'traceCall');
        });
    }
    traceTransaction(transactionHash, tracer, timeout) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            const params = [transactionHash, parseTracerParams(tracer, timeout)];
            return provider._send('debug_traceTransaction', params, 'traceTransaction');
        });
    }
    traceBlock(blockIdentifier, tracer) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            let method;
            let params;
            if (utils.isHexString(blockIdentifier, 32)) {
                method = 'debug_traceBlockByHash';
                params = [blockIdentifier, parseTracerParams(tracer)];
            }
            else {
                method = 'debug_traceBlockByNumber';
                const block = typeof blockIdentifier === 'number'
                    ? utils.hexStripZeros(utils.hexValue(blockIdentifier))
                    : blockIdentifier;
                params = [block, parseTracerParams(tracer)];
            }
            return provider._send(method, params, 'traceBlock');
        });
    }
}
function parseTracerParams(tracer, timeout) {
    return Object.assign({ tracer: tracer.type }, (tracer.onlyTopCall !== undefined && {
        tracerConfig: {
            onlyTopCall: tracer.onlyTopCall,
            timeout
        }
    }));
}

function sanitizeTokenType(tokenType) {
    if (tokenType === exports.NftTokenType.ERC1155 || tokenType === exports.NftTokenType.ERC721) {
        return tokenType;
    }
    return undefined;
}

/**
 * The SDK has 4 log levels and a 5th option for disabling all logging. By
 * default, the log level is set to INFO.
 *
 * The order is a follows: DEBUG < INFO < WARN < ERROR
 *
 * All log types above the current log level will be outputted.
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
    LogLevel[LogLevel["SILENT"] = 4] = "SILENT";
})(LogLevel || (LogLevel = {}));
const logLevelStringToEnum = {
    debug: LogLevel.DEBUG,
    info: LogLevel.INFO,
    warn: LogLevel.WARN,
    error: LogLevel.ERROR,
    silent: LogLevel.SILENT
};
// HACKY: Use the console method as a string rather than the function itself
// in order to allow for mocking in tests.
const logLevelToConsoleFn = {
    [LogLevel.DEBUG]: 'log',
    [LogLevel.INFO]: 'info',
    [LogLevel.WARN]: 'warn',
    [LogLevel.ERROR]: 'error'
};
const DEFAULT_LOG_LEVEL = LogLevel.INFO;
/**
 * Configures the verbosity of logging. The default log level is `info`.
 *
 * @param logLevel - The verbosity of logging. Can be any of the following values:
 *
 *   - `debug`: The most verbose logging level.
 *   - `info`: The default logging level.
 *   - `warn`: A logging level for non-critical issues.
 *   - `error`: A logging level for critical issues.
 *   - `silent`: Turn off all logging.
 *
 * @public
 */
function setLogLevel(logLevel) {
    loggerClient.logLevel = logLevelStringToEnum[logLevel];
}
function logDebug(message, ...args) {
    loggerClient.debug(message, args);
}
function logInfo(message, ...args) {
    loggerClient.info(message, args);
}
function logWarn(message, ...args) {
    loggerClient.warn(message, args);
}
class Logger {
    constructor() {
        /** The log level of the given Logger instance. */
        this._logLevel = DEFAULT_LOG_LEVEL;
    }
    get logLevel() {
        return this._logLevel;
    }
    set logLevel(val) {
        if (!(val in LogLevel)) {
            throw new TypeError(`Invalid value "${val}" assigned to \`logLevel\``);
        }
        this._logLevel = val;
    }
    debug(...args) {
        this._log(LogLevel.DEBUG, ...args);
    }
    info(...args) {
        this._log(LogLevel.INFO, ...args);
    }
    warn(...args) {
        this._log(LogLevel.WARN, ...args);
    }
    error(...args) {
        this._log(LogLevel.ERROR, ...args);
    }
    /**
     * Forwards log messages to their corresponding console counterparts if the
     * log level allows it.
     */
    _log(logLevel, ...args) {
        if (logLevel < this._logLevel) {
            return;
        }
        const now = new Date().toISOString();
        const method = logLevelToConsoleFn[logLevel];
        if (method) {
            console[method](`[${now}] Alchemy:`, ...args.map(stringify));
        }
        else {
            throw new Error(`Logger received an invalid logLevel (value: ${logLevel})`);
        }
    }
}
function stringify(obj) {
    if (typeof obj === 'string') {
        return obj;
    }
    else {
        try {
            return JSON.stringify(obj);
        }
        catch (e) {
            // Failed to convert to JSON, log the object directly.
            return obj;
        }
    }
}
// Instantiate default logger for the SDK.
const loggerClient = new Logger();

// This file is autogenerated by injectVersion.js. Any changes will be
// overwritten on commit!
const VERSION = '3.1.2';

/**
 * Given a REST endpoint, method, and params, sends the request with axios and
 * returns the response.
 */
/**
 * Helper function to send http requests using Axis.
 *
 * @private
 */
function sendAxiosRequest(baseUrl, restApiName, methodName, params, overrides) {
    var _a;
    const requestUrl = baseUrl + '/' + restApiName;
    const config = Object.assign(Object.assign({}, overrides), { headers: Object.assign(Object.assign(Object.assign({}, overrides === null || overrides === void 0 ? void 0 : overrides.headers), (!IS_BROWSER && { 'Accept-Encoding': 'gzip' })), { 'Alchemy-Ethers-Sdk-Version': VERSION, 'Alchemy-Ethers-Sdk-Method': methodName }), method: (_a = overrides === null || overrides === void 0 ? void 0 : overrides.method) !== null && _a !== void 0 ? _a : 'GET', url: requestUrl, params });
    return axios__default["default"](config);
}

const DEFAULT_BACKOFF_INITIAL_DELAY_MS = 1000;
const DEFAULT_BACKOFF_MULTIPLIER = 1.5;
const DEFAULT_BACKOFF_MAX_DELAY_MS = 30 * 1000;
const DEFAULT_BACKOFF_MAX_ATTEMPTS = 5;
/**
 * Helper class for implementing exponential backoff and max retry attempts.
 *
 * @private
 * @internal
 */
class ExponentialBackoff {
    constructor(maxAttempts = DEFAULT_BACKOFF_MAX_ATTEMPTS) {
        this.maxAttempts = maxAttempts;
        this.initialDelayMs = DEFAULT_BACKOFF_INITIAL_DELAY_MS;
        this.backoffMultiplier = DEFAULT_BACKOFF_MULTIPLIER;
        this.maxDelayMs = DEFAULT_BACKOFF_MAX_DELAY_MS;
        this.numAttempts = 0;
        this.currentDelayMs = 0;
        this.isInBackoff = false;
    }
    /**
     * Returns a promise that resolves after the the backoff delay. The delay is
     * increased for each attempt. The promise is rejected if the maximum number
     * of attempts is exceeded.
     */
    // TODO: beautify this into an async iterator.
    backoff() {
        if (this.numAttempts >= this.maxAttempts) {
            return Promise.reject(new Error(`Exceeded maximum number of attempts: ${this.maxAttempts}`));
        }
        if (this.isInBackoff) {
            return Promise.reject(new Error('A backoff operation is already in progress'));
        }
        const backoffDelayWithJitterMs = this.withJitterMs(this.currentDelayMs);
        if (backoffDelayWithJitterMs > 0) {
            logDebug('ExponentialBackoff.backoff', `Backing off for ${backoffDelayWithJitterMs}ms`);
        }
        // Calculate the next delay.
        this.currentDelayMs *= this.backoffMultiplier;
        this.currentDelayMs = Math.max(this.currentDelayMs, this.initialDelayMs);
        this.currentDelayMs = Math.min(this.currentDelayMs, this.maxDelayMs);
        this.numAttempts += 1;
        return new Promise(resolve => {
            this.isInBackoff = true;
            setTimeout(() => {
                this.isInBackoff = false;
                resolve();
            }, backoffDelayWithJitterMs);
        });
    }
    /**
     * Applies +/- 50% jitter to the backoff delay, up to the max delay cap.
     *
     * @private
     * @param delayMs
     */
    withJitterMs(delayMs) {
        return Math.min(delayMs + (Math.random() - 0.5) * delayMs, this.maxDelayMs);
    }
}

/**
 * A wrapper function to make http requests and retry if the request fails.
 *
 * @internal
 */
// TODO: Wrap Axios error in AlchemyError.
function requestHttpWithBackoff(config, apiType, restApiName, methodName, params, overrides) {
    return __awaiter$1(this, void 0, void 0, function* () {
        let lastError = undefined;
        const backoff = new ExponentialBackoff(config.maxRetries);
        for (let attempt = 0; attempt < config.maxRetries + 1; attempt++) {
            try {
                if (lastError !== undefined) {
                    logInfo('requestHttp', `Retrying after error: ${lastError.message}`);
                }
                try {
                    yield backoff.backoff();
                }
                catch (err) {
                    // Backoff errors when the maximum number of attempts is reached. Break
                    // out of the loop to preserve the last error.
                    break;
                }
                const response = yield sendAxiosRequest(config._getRequestUrl(apiType), restApiName, methodName, params, Object.assign(Object.assign({}, overrides), { timeout: config.requestTimeout }));
                if (response.status === 200) {
                    logDebug(restApiName, `Successful request: ${restApiName}`);
                    return response.data;
                }
                else {
                    logInfo(restApiName, `Request failed: ${restApiName}, ${response.status}, ${response.data}`);
                    lastError = new Error(response.status + ': ' + response.data);
                }
            }
            catch (err) {
                if (!axios__default["default"].isAxiosError(err) || err.response === undefined) {
                    throw err;
                }
                // TODO: Standardize all errors into AlchemyError
                lastError = new Error(err.response.status + ': ' + err.response.data);
                if (!isRetryableHttpError(err, apiType)) {
                    break;
                }
            }
        }
        return Promise.reject(lastError);
    });
}
function isRetryableHttpError(err, apiType) {
    // TODO: remove 500s after webhooks are more stable.
    const retryableCodes = apiType === AlchemyApiType.WEBHOOK ? [429, 500] : [429];
    return (err.response !== undefined && retryableCodes.includes(err.response.status));
}
/**
 * Fetches all pages in a paginated endpoint, given a `pageKey` field that
 * represents the property name containing the next page token.
 *
 * @internal
 */
function paginateEndpoint(config, apiType, restApiName, methodName, reqPageKey, resPageKey, params) {
    return __asyncGenerator(this, arguments, function* paginateEndpoint_1() {
        let hasNext = true;
        const requestParams = Object.assign({}, params);
        while (hasNext) {
            const response = yield __await(requestHttpWithBackoff(config, apiType, restApiName, methodName, requestParams));
            yield yield __await(response);
            if (response[resPageKey] !== null) {
                requestParams[reqPageKey] = response[resPageKey];
            }
            else {
                hasNext = false;
            }
        }
    });
}

/**
 * This file contains the underlying implementations for exposed API surface in
 * the {@link NftNamespace}. By moving the methods out into a separate file,
 * other namespaces can access these methods without depending on the entire
 * NftNamespace.
 */
/**
 * Get the NFT metadata for the provided contract address.
 */
function getNftMetadata(config, contractAddress, tokenId, options, srcMethod = 'getNftMetadata') {
    return __awaiter$1(this, void 0, void 0, function* () {
        const response = yield requestHttpWithBackoff(config, AlchemyApiType.NFT, 'getNFTMetadata', srcMethod, {
            contractAddress,
            tokenId: bignumber.BigNumber.from(tokenId).toString(),
            tokenType: sanitizeTokenType(options === null || options === void 0 ? void 0 : options.tokenType),
            tokenUriTimeoutInMs: options === null || options === void 0 ? void 0 : options.tokenUriTimeoutInMs,
            refreshCache: options === null || options === void 0 ? void 0 : options.refreshCache
        });
        return getNftFromRaw(response);
    });
}
function getNftMetadataBatch(config, tokens, options) {
    return __awaiter$1(this, void 0, void 0, function* () {
        const data = {
            tokens,
            tokenUriTimeoutInMs: options === null || options === void 0 ? void 0 : options.tokenUriTimeoutInMs,
            refreshCache: options === null || options === void 0 ? void 0 : options.refreshCache
        };
        const response = yield requestHttpWithBackoff(config, AlchemyApiType.NFT, 'getNFTMetadataBatch', 'getNftMetadataBatch', {}, {
            method: 'POST',
            data
        });
        return {
            nfts: response.nfts.map(nft => getNftFromRaw(nft))
        };
    });
}
function getContractMetadata(config, contractAddress, srcMethod = 'getContractMetadata') {
    return __awaiter$1(this, void 0, void 0, function* () {
        const response = yield requestHttpWithBackoff(config, AlchemyApiType.NFT, 'getContractMetadata', srcMethod, {
            contractAddress
        });
        return getNftContractFromRaw(response);
    });
}
function getContractMetadataBatch(config, contractAddresses) {
    return __awaiter$1(this, void 0, void 0, function* () {
        const response = yield requestHttpWithBackoff(config, AlchemyApiType.NFT, 'getContractMetadataBatch', 'getContractMetadataBatch', {}, {
            method: 'POST',
            data: { contractAddresses }
        });
        return {
            contracts: response.contracts.map(getNftContractFromRaw)
        };
    });
}
function getCollectionMetadata(config, collectionSlug, srcMethod = 'getCollectionMetadata') {
    return __awaiter$1(this, void 0, void 0, function* () {
        const response = yield requestHttpWithBackoff(config, AlchemyApiType.NFT, 'getCollectionMetadata', srcMethod, {
            collectionSlug
        });
        return getNftCollectionFromRaw(response);
    });
}
function getNftsForOwnerIterator(config, owner, options, srcMethod = 'getNftsForOwnerIterator') {
    return __asyncGenerator(this, arguments, function* getNftsForOwnerIterator_1() {
        var e_1, _a;
        const withMetadata = omitMetadataToWithMetadata(options === null || options === void 0 ? void 0 : options.omitMetadata);
        try {
            for (var _b = __asyncValues(paginateEndpoint(config, AlchemyApiType.NFT, 'getNFTsForOwner', srcMethod, 'pageKey', 'pageKey', {
                contractAddresses: options === null || options === void 0 ? void 0 : options.contractAddresses,
                pageKey: options === null || options === void 0 ? void 0 : options.pageKey,
                excludeFilters: options === null || options === void 0 ? void 0 : options.excludeFilters,
                includeFilters: options === null || options === void 0 ? void 0 : options.includeFilters,
                owner,
                withMetadata,
                tokenUriTimeoutInMs: options === null || options === void 0 ? void 0 : options.tokenUriTimeoutInMs,
                orderBy: options === null || options === void 0 ? void 0 : options.orderBy
            })), _c; _c = yield __await(_b.next()), !_c.done;) {
                const response = _c.value;
                for (const ownedNft of response.ownedNfts) {
                    yield yield __await(Object.assign(Object.assign({}, nftFromGetNftResponse(ownedNft)), { balance: ownedNft.balance }));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) yield __await(_a.call(_b));
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
function getNftsForOwner(config, owner, options, srcMethod = 'getNftsForOwner') {
    return __awaiter$1(this, void 0, void 0, function* () {
        const withMetadata = omitMetadataToWithMetadata(options === null || options === void 0 ? void 0 : options.omitMetadata);
        const response = yield requestHttpWithBackoff(config, AlchemyApiType.NFT, 'getNFTsForOwner', srcMethod, {
            contractAddresses: options === null || options === void 0 ? void 0 : options.contractAddresses,
            pageKey: options === null || options === void 0 ? void 0 : options.pageKey,
            excludeFilters: options === null || options === void 0 ? void 0 : options.excludeFilters,
            includeFilters: options === null || options === void 0 ? void 0 : options.includeFilters,
            owner,
            pageSize: options === null || options === void 0 ? void 0 : options.pageSize,
            withMetadata,
            tokenUriTimeoutInMs: options === null || options === void 0 ? void 0 : options.tokenUriTimeoutInMs,
            orderBy: options === null || options === void 0 ? void 0 : options.orderBy
        });
        if (withMetadata) {
            return nullsToUndefined({
                ownedNfts: response.ownedNfts.map(res => (Object.assign(Object.assign({}, getNftFromRaw(res)), { balance: res.balance }))),
                pageKey: response.pageKey,
                totalCount: response.totalCount,
                validAt: response.validAt
            });
        }
        return nullsToUndefined({
            ownedNfts: response.ownedNfts.map(res => (Object.assign(Object.assign({}, getBaseNftFromRaw(res)), { balance: res.balance }))),
            pageKey: response.pageKey,
            totalCount: response.totalCount,
            validAt: response.validAt
        });
    });
}
function getNftsForContract(config, contractAddress, options, srcMethod = 'getNftsForContract') {
    var _a;
    return __awaiter$1(this, void 0, void 0, function* () {
        const withMetadata = omitMetadataToWithMetadata(options === null || options === void 0 ? void 0 : options.omitMetadata);
        const response = yield requestHttpWithBackoff(config, AlchemyApiType.NFT, 'getNFTsForContract', srcMethod, {
            contractAddress,
            pageKey: options === null || options === void 0 ? void 0 : options.pageKey,
            withMetadata,
            limit: (_a = options === null || options === void 0 ? void 0 : options.pageSize) !== null && _a !== void 0 ? _a : undefined,
            tokenUriTimeoutInMs: options === null || options === void 0 ? void 0 : options.tokenUriTimeoutInMs
        });
        if (withMetadata) {
            return nullsToUndefined({
                nfts: response.nfts.map(res => getNftFromRaw(res)),
                pageKey: response.pageKey
            });
        }
        return nullsToUndefined({
            nfts: response.nfts.map(res => getBaseNftFromRaw(res, contractAddress)),
            pageKey: response.pageKey
        });
    });
}
function getNftsForContractIterator(config, contractAddress, options, srcMethod = 'getNftsForContractIterator') {
    return __asyncGenerator(this, arguments, function* getNftsForContractIterator_1() {
        var e_2, _a;
        const withMetadata = omitMetadataToWithMetadata(options === null || options === void 0 ? void 0 : options.omitMetadata);
        try {
            for (var _b = __asyncValues(paginateEndpoint(config, AlchemyApiType.NFT, 'getNFTsForContract', srcMethod, 'pageKey', 'pageKey', {
                contractAddress,
                pageKey: options === null || options === void 0 ? void 0 : options.pageKey,
                withMetadata
            })), _c; _c = yield __await(_b.next()), !_c.done;) {
                const response = _c.value;
                for (const nft of response.nfts) {
                    yield yield __await(nftFromGetNftContractResponse(nft, contractAddress));
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) yield __await(_a.call(_b));
            }
            finally { if (e_2) throw e_2.error; }
        }
    });
}
function getOwnersForContract(config, contractAddress, options, srcMethod = 'getOwnersForContract') {
    return __awaiter$1(this, void 0, void 0, function* () {
        // Cast to `any` to avoid more type wrangling.
        const response = yield requestHttpWithBackoff(config, AlchemyApiType.NFT, 'getOwnersForContract', srcMethod, Object.assign(Object.assign({}, options), { contractAddress }));
        if (options === null || options === void 0 ? void 0 : options.withTokenBalances) {
            return nullsToUndefined({
                owners: response
                    .owners,
                pageKey: response.pageKey
            });
        }
        return nullsToUndefined({
            owners: response.owners,
            pageKey: response.pageKey
        });
    });
}
function getContractsForOwner(config, owner, options, srcMethod = 'getContractsForOwner') {
    return __awaiter$1(this, void 0, void 0, function* () {
        const response = yield requestHttpWithBackoff(config, AlchemyApiType.NFT, 'getContractsForOwner', srcMethod, {
            owner,
            excludeFilters: options === null || options === void 0 ? void 0 : options.excludeFilters,
            includeFilters: options === null || options === void 0 ? void 0 : options.includeFilters,
            pageKey: options === null || options === void 0 ? void 0 : options.pageKey,
            pageSize: options === null || options === void 0 ? void 0 : options.pageSize,
            orderBy: options === null || options === void 0 ? void 0 : options.orderBy
        });
        return nullsToUndefined({
            contracts: response.contracts.map(getNftContractsForOwnerFromRaw),
            pageKey: response.pageKey,
            totalCount: response.totalCount
        });
    });
}
function getOwnersForNft(config, contractAddress, tokenId, options, srcMethod = 'getOwnersForNft') {
    return __awaiter$1(this, void 0, void 0, function* () {
        return requestHttpWithBackoff(config, AlchemyApiType.NFT, 'getOwnersForNFT', srcMethod, Object.assign({ contractAddress, tokenId: bignumber.BigNumber.from(tokenId).toString() }, options));
    });
}
function getMintedNfts(config, owner, options) {
    return __awaiter$1(this, void 0, void 0, function* () {
        const provider = yield config.getProvider();
        const ownerAddress = yield provider._getAddress(owner);
        const category = nftTokenTypeToCategory(options === null || options === void 0 ? void 0 : options.tokenType);
        const params = {
            fromBlock: '0x0',
            fromAddress: ETH_NULL_ADDRESS,
            toAddress: ownerAddress,
            excludeZeroValue: true,
            contractAddresses: options === null || options === void 0 ? void 0 : options.contractAddresses,
            category,
            maxCount: 100,
            pageKey: options === null || options === void 0 ? void 0 : options.pageKey
        };
        const response = yield getAssetTransfers(config, params, 'getMintedNfts');
        return getNftsForTransfers(config, response);
    });
}
function getTransfersForOwner(config, owner, transferType, options) {
    return __awaiter$1(this, void 0, void 0, function* () {
        const provider = yield config.getProvider();
        const ownerAddress = yield provider._getAddress(owner);
        const category = nftTokenTypeToCategory(options === null || options === void 0 ? void 0 : options.tokenType);
        const params = {
            fromBlock: '0x0',
            excludeZeroValue: true,
            contractAddresses: options === null || options === void 0 ? void 0 : options.contractAddresses,
            category,
            maxCount: 100,
            pageKey: options === null || options === void 0 ? void 0 : options.pageKey
        };
        if (transferType === exports.GetTransfersForOwnerTransferType.TO) {
            params.toAddress = ownerAddress;
        }
        else {
            params.fromAddress = ownerAddress;
        }
        const transfersResponse = yield getAssetTransfers(config, params, 'getTransfersForOwner');
        return getNftsForTransfers(config, transfersResponse);
    });
}
function getTransfersForContract(config, contract, options) {
    return __awaiter$1(this, void 0, void 0, function* () {
        const category = [
            exports.AssetTransfersCategory.ERC721,
            exports.AssetTransfersCategory.ERC1155,
            exports.AssetTransfersCategory.SPECIALNFT
        ];
        const provider = yield config.getProvider();
        const fromBlock = (options === null || options === void 0 ? void 0 : options.fromBlock)
            ? provider.formatter.blockTag(yield provider._getBlockTag(options.fromBlock))
            : '0x0';
        const toBlock = (options === null || options === void 0 ? void 0 : options.toBlock)
            ? provider.formatter.blockTag(yield provider._getBlockTag(options.toBlock))
            : undefined;
        const params = {
            fromBlock,
            toBlock,
            excludeZeroValue: true,
            contractAddresses: [contract],
            order: options === null || options === void 0 ? void 0 : options.order,
            category,
            maxCount: 100,
            pageKey: options === null || options === void 0 ? void 0 : options.pageKey
        };
        const transfersResponse = yield getAssetTransfers(config, params, 'getTransfersForContract');
        return getNftsForTransfers(config, transfersResponse);
    });
}
function nftTokenTypeToCategory(tokenType) {
    switch (tokenType) {
        case exports.NftTokenType.ERC721:
            return [exports.AssetTransfersCategory.ERC721];
        case exports.NftTokenType.ERC1155:
            return [exports.AssetTransfersCategory.ERC1155];
        default:
            return [
                exports.AssetTransfersCategory.ERC721,
                exports.AssetTransfersCategory.ERC1155,
                exports.AssetTransfersCategory.SPECIALNFT
            ];
    }
}
function parse1155Transfer(transfer) {
    return transfer.erc1155Metadata.map(metadata => ({
        contractAddress: transfer.rawContract.address,
        tokenId: metadata.tokenId,
        tokenType: exports.NftTokenType.ERC1155
    }));
}
function verifyNftOwnership(config, owner, contractAddresses, srcMethod = 'verifyNftOwnership') {
    return __awaiter$1(this, void 0, void 0, function* () {
        if (typeof contractAddresses === 'string') {
            const response = yield getNftsForOwner(config, owner, {
                contractAddresses: [contractAddresses],
                omitMetadata: true
            }, srcMethod);
            return response.ownedNfts.length > 0;
        }
        else {
            if (contractAddresses.length === 0) {
                throw new Error('Must provide at least one contract address');
            }
            const response = yield getNftsForOwner(config, owner, {
                contractAddresses,
                omitMetadata: true
            }, srcMethod);
            // Create map where all input contract addresses are set to false, then flip
            // owned nfts to true.
            const result = contractAddresses.reduce((acc, curr) => {
                acc[curr] = false;
                return acc;
            }, {});
            for (const nft of response.ownedNfts) {
                result[nft.contractAddress] = true;
            }
            return result;
        }
    });
}
function isSpamContract(config, contractAddress, srcMethod = 'isSpamContract') {
    return __awaiter$1(this, void 0, void 0, function* () {
        return requestHttpWithBackoff(config, AlchemyApiType.NFT, 'isSpamContract', srcMethod, {
            contractAddress
        });
    });
}
function getSpamContracts(config, srcMethod = 'getSpamContracts') {
    return __awaiter$1(this, void 0, void 0, function* () {
        return requestHttpWithBackoff(config, AlchemyApiType.NFT, 'getSpamContracts', srcMethod, undefined);
    });
}
function reportSpam(config, contractAddress, srcMethod = 'reportSpam') {
    return __awaiter$1(this, void 0, void 0, function* () {
        void requestHttpWithBackoff(config, AlchemyApiType.NFT, 'reportSpam', srcMethod, {
            contractAddress
        });
    });
}
function isAirdropNft(config, contractAddress, tokenId, srcMethod = 'isAirdropNft') {
    return __awaiter$1(this, void 0, void 0, function* () {
        return requestHttpWithBackoff(config, AlchemyApiType.NFT, 'isAirdropNFT', srcMethod, {
            contractAddress,
            tokenId
        });
    });
}
function getFloorPrice(config, contractAddress, srcMethod = 'getFloorPrice') {
    return __awaiter$1(this, void 0, void 0, function* () {
        const response = yield requestHttpWithBackoff(config, AlchemyApiType.NFT, 'getFloorPrice', srcMethod, {
            contractAddress
        });
        return nullsToUndefined(response);
    });
}
function getNftSales(config, options = {}, srcMethod = 'getNftSales') {
    return __awaiter$1(this, void 0, void 0, function* () {
        // Avoid ts compiler complaining about the contractAddress field.
        const params = Object.assign({}, options);
        const response = yield requestHttpWithBackoff(config, AlchemyApiType.NFT, 'getNFTSales', srcMethod, {
            fromBlock: params === null || params === void 0 ? void 0 : params.fromBlock,
            toBlock: params === null || params === void 0 ? void 0 : params.toBlock,
            order: params === null || params === void 0 ? void 0 : params.order,
            marketplace: params === null || params === void 0 ? void 0 : params.marketplace,
            contractAddress: params === null || params === void 0 ? void 0 : params.contractAddress,
            tokenId: (params === null || params === void 0 ? void 0 : params.tokenId)
                ? bignumber.BigNumber.from(params === null || params === void 0 ? void 0 : params.tokenId).toString()
                : undefined,
            sellerAddress: params === null || params === void 0 ? void 0 : params.sellerAddress,
            buyerAddress: params === null || params === void 0 ? void 0 : params.buyerAddress,
            taker: params === null || params === void 0 ? void 0 : params.taker,
            limit: params === null || params === void 0 ? void 0 : params.limit,
            pageKey: params === null || params === void 0 ? void 0 : params.pageKey
        });
        return getNftSalesFromRaw(response);
    });
}
function computeRarity(config, contractAddress, tokenId, srcMethod = 'computeRarity') {
    return __awaiter$1(this, void 0, void 0, function* () {
        const response = yield requestHttpWithBackoff(config, AlchemyApiType.NFT, 'computeRarity', srcMethod, {
            contractAddress,
            tokenId: bignumber.BigNumber.from(tokenId).toString()
        });
        return nullsToUndefined(response);
    });
}
function searchContractMetadata(config, query, srcMethod = 'searchContractMetadata') {
    return __awaiter$1(this, void 0, void 0, function* () {
        const response = yield requestHttpWithBackoff(config, AlchemyApiType.NFT, 'searchContractMetadata', srcMethod, {
            query
        });
        return {
            contracts: response.contracts.map(getNftContractFromRaw)
        };
    });
}
function summarizeNftAttributes(config, contractAddress, srcMethod = 'summarizeNftAttributes') {
    return __awaiter$1(this, void 0, void 0, function* () {
        return requestHttpWithBackoff(config, AlchemyApiType.NFT, 'summarizeNFTAttributes', srcMethod, {
            contractAddress
        });
    });
}
function refreshNftMetadata(config, contractAddress, tokenId, srcMethod = 'refreshNftMetadata') {
    return __awaiter$1(this, void 0, void 0, function* () {
        const tokenIdString = bignumber.BigNumber.from(tokenId).toString();
        const first = yield getNftMetadata(config, contractAddress, tokenIdString, undefined, srcMethod);
        const second = yield refresh(config, contractAddress, tokenIdString, srcMethod);
        return first.timeLastUpdated !== second.timeLastUpdated;
    });
}
function refreshContract(config, contractAddress, srcMethod = 'refreshContract') {
    return __awaiter$1(this, void 0, void 0, function* () {
        const response = yield requestHttpWithBackoff(config, AlchemyApiType.NFT, 'reingestContract', srcMethod, {
            contractAddress
        });
        return {
            contractAddress: response.contractAddress,
            refreshState: parseReingestionState(response.reingestionState),
            progress: response.progress
        };
    });
}
function refresh(config, contractAddress, tokenId, srcMethod) {
    return __awaiter$1(this, void 0, void 0, function* () {
        const response = yield requestHttpWithBackoff(config, AlchemyApiType.NFT, 'getNFTMetadata', srcMethod, {
            contractAddress,
            tokenId: bignumber.BigNumber.from(tokenId).toString(),
            refreshCache: true
        });
        return getNftFromRaw(response);
    });
}
/**
 * Helper method to convert a NFT response received from Alchemy backend to an
 * SDK NFT type.
 *
 * @internal
 */
function nftFromGetNftResponse(ownedNft) {
    if (isNftWithMetadata(ownedNft)) {
        return getNftFromRaw(ownedNft);
    }
    else {
        return getBaseNftFromRaw(ownedNft);
    }
}
/**
 * Helper method to convert a NFT response received from Alchemy backend to an
 * SDK NFT type.
 *
 * @internal
 */
function nftFromGetNftContractResponse(ownedNft, contractAddress) {
    if (isNftWithMetadata(ownedNft)) {
        return getNftFromRaw(ownedNft);
    }
    else {
        return getBaseNftFromRaw(ownedNft, contractAddress);
    }
}
/** @internal */
// TODO: more comprehensive type check
function isNftWithMetadata(response) {
    return response.name !== undefined;
}
/**
 * Given an AssetTransfersResponse, fetches the NFTs associated with the
 * transfers and collates them with transfer metadata.
 *
 * VISIBLE FOR TESTING
 */
function getNftsForTransfers(config, response) {
    return __awaiter$1(this, void 0, void 0, function* () {
        const metadataTransfers = response.transfers
            .filter(transfer => transfer.rawContract.address !== null)
            // Use flatMap to flatten 1155 transfers that contain multiple NFTs.
            .flatMap(transfer => {
            var _a;
            const tokens = getTokensFromTransfer(transfer);
            const metadata = {
                from: transfer.from,
                to: (_a = transfer.to) !== null && _a !== void 0 ? _a : undefined,
                transactionHash: transfer.hash,
                blockNumber: transfer.blockNum
            };
            return tokens.map(token => ({ metadata, token }));
        });
        if (metadataTransfers.length === 0) {
            return { nfts: [] };
        }
        // If we have more than 100 elements after unrolling 1155 transfers, split
        // transfers into batches of 100 to stay under endpoint batch size limit.
        const batchSize = 100;
        const requestBatches = [];
        for (let i = 0; i < metadataTransfers.length; i += batchSize) {
            requestBatches.push(metadataTransfers.slice(i, i + batchSize));
        }
        const responseBatches = yield Promise.all(requestBatches.map(batch => getNftMetadataBatch(config, batch.map(transfer => transfer.token))));
        const nfts = responseBatches.map(r => r.nfts).flat();
        // The same NFT can be transferred multiple times in the same transfers response.
        // We want to return one NFT for each transfer, so we create a mapping for
        // each NFT to pair with the transfer metadata.
        const nftsByTokenId = new Map();
        nfts.forEach(nft => {
            const key = `${nft.contract.address.toLowerCase()}-${bignumber.BigNumber.from(nft.tokenId).toString()}`;
            nftsByTokenId.set(key, nft);
        });
        const transferredNfts = metadataTransfers.map(t => {
            const key = `${t.token.contractAddress.toLowerCase()}-${bignumber.BigNumber.from(t.token.tokenId).toString()}`;
            return Object.assign(Object.assign({}, nftsByTokenId.get(key)), t.metadata);
        });
        return {
            nfts: transferredNfts,
            pageKey: response.pageKey
        };
    });
}
/**
 * Returns the underlying NFT tokens from a transfer as the params for a
 * `getNftMetadataBatch` call. Handles the 1155 case where multiple NFTs can be
 * transferred in a single transaction.
 */
function getTokensFromTransfer(transfer) {
    // ERC1155 NFTs can contain multiple tokens in a single transfer, which
    // requires special logic.
    if (transfer.category === exports.AssetTransfersCategory.ERC1155) {
        return parse1155Transfer(transfer);
    }
    else {
        return [
            {
                contractAddress: transfer.rawContract.address,
                tokenId: transfer.tokenId,
                tokenType: transfer.category === exports.AssetTransfersCategory.ERC721
                    ? exports.NftTokenType.ERC721
                    : undefined
            }
        ];
    }
}
/**
 * Flips the `omitMetadata` SDK parameter type to the `withMetadata` parameter
 * required by the Alchemy API. If `omitMetadata` is undefined, the SDK defaults
 * to including metadata.
 *
 * @internal
 */
function omitMetadataToWithMetadata(omitMetadata) {
    return omitMetadata === undefined ? true : !omitMetadata;
}
function parseReingestionState(reingestionState) {
    switch (reingestionState) {
        case 'does_not_exist':
            return exports.NftRefreshState.DOES_NOT_EXIST;
        case 'already_queued':
            return exports.NftRefreshState.ALREADY_QUEUED;
        case 'in_progress':
            return exports.NftRefreshState.IN_PROGRESS;
        case 'finished':
            return exports.NftRefreshState.FINISHED;
        case 'queued':
            return exports.NftRefreshState.QUEUED;
        case 'queue_failed':
            return exports.NftRefreshState.QUEUE_FAILED;
        default:
            throw new Error('Unknown reingestion state: ' + reingestionState);
    }
}

/**
 * The NFT namespace contains all the functionality related to NFTs.
 *
 * Do not call this constructor directly. Instead, instantiate an Alchemy object
 * with `const alchemy = new Alchemy(config)` and then access the core namespace
 * via `alchemy.nft`.
 */
class NftNamespace {
    /** @internal */
    constructor(config) {
        this.config = config;
    }
    getNftMetadata(contractAddress, tokenId, optionsOrTokenType, tokenUriTimeoutInMs) {
        let options;
        if (typeof optionsOrTokenType === 'object') {
            options = {
                tokenType: optionsOrTokenType.tokenType,
                tokenUriTimeoutInMs: optionsOrTokenType.tokenUriTimeoutInMs,
                refreshCache: optionsOrTokenType.refreshCache
            };
        }
        else {
            options = {
                tokenType: optionsOrTokenType,
                tokenUriTimeoutInMs
            };
        }
        return getNftMetadata(this.config, contractAddress, tokenId, options);
    }
    /**
     * Gets the NFT metadata for multiple NFT tokens.
     *
     * @param tokens An array of NFT tokens to fetch metadata for.
     * @param options Configuration options for making the request.
     */
    getNftMetadataBatch(tokens, options) {
        return getNftMetadataBatch(this.config, tokens, options);
    }
    /**
     * Get the NFT contract metadata associated with the provided parameters.
     *
     * @param contractAddress - The contract address of the NFT.
     * @public
     */
    getContractMetadata(contractAddress) {
        return getContractMetadata(this.config, contractAddress);
    }
    /**
     * Get the NFT contract metadata for multiple NFT contracts in a single request.
     *
     * @param contractAddresses - An array of contract addresses to fetch metadata for.
     */
    getContractMetadataBatch(contractAddresses) {
        return getContractMetadataBatch(this.config, contractAddresses);
    }
    /**
     * Get the NFT collection metadata associated with the provided parameters.
     *
     * @param collectionSlug - The OpenSea collection slug of the NFT.
     * @beta
     */
    getCollectionMetadata(collectionSlug) {
        return getCollectionMetadata(this.config, collectionSlug);
    }
    getNftsForOwnerIterator(owner, options) {
        return getNftsForOwnerIterator(this.config, owner, options);
    }
    getNftsForOwner(owner, options) {
        return getNftsForOwner(this.config, owner, options);
    }
    getNftsForContract(contractAddress, options) {
        return getNftsForContract(this.config, contractAddress, options);
    }
    getNftsForContractIterator(contractAddress, options) {
        return getNftsForContractIterator(this.config, contractAddress, options);
    }
    getOwnersForContract(contractAddress, options) {
        return getOwnersForContract(this.config, contractAddress, options);
    }
    /**
     * Gets all the owners for a given NFT contract address and token ID.
     *
     * @param contractAddress - The NFT contract address.
     * @param tokenId - Token id of the NFT.
     * @param options - Optional parameters to use for the request.
     * @beta
     */
    getOwnersForNft(contractAddress, tokenId, options) {
        return getOwnersForNft(this.config, contractAddress, tokenId, options);
    }
    /**
     * Gets all NFT contracts held by the specified owner address.
     *
     * @param owner - Address for NFT owner (can be in ENS format!).
     * @param options - The optional parameters to use for the request.
     * @public
     */
    // TODO(v3): Add overload for withMetadata=false
    getContractsForOwner(owner, options) {
        return getContractsForOwner(this.config, owner, options);
    }
    /**
     * Gets all NFT transfers for a given owner's address.
     *
     * @param owner The owner to get transfers for.
     * @param category Whether to get transfers to or from the owner address.
     * @param options Additional options for the request.
     */
    getTransfersForOwner(owner, category, options) {
        return getTransfersForOwner(this.config, owner, category, options);
    }
    /**
     * Gets all NFT transfers for a given NFT contract address.
     *
     * Defaults to all transfers for the contract. To get transfers for a specific
     * block range, use {@link GetTransfersForContractOptions}.
     *
     * @param contract The NFT contract to get transfers for.
     * @param options Additional options for the request.
     */
    getTransfersForContract(contract, options) {
        return getTransfersForContract(this.config, contract, options);
    }
    /**
     * Get all the NFTs minted by a specified owner address.
     *
     * @param owner - Address for the NFT owner (can be in ENS format).
     * @param options - The optional parameters to use for the request.
     */
    getMintedNfts(owner, options) {
        return __awaiter$1(this, void 0, void 0, function* () {
            return getMintedNfts(this.config, owner, options);
        });
    }
    verifyNftOwnership(owner, contractAddress) {
        return verifyNftOwnership(this.config, owner, contractAddress);
    }
    /**
     * Returns whether a contract is marked as spam or not by Alchemy. For more
     * information on how we classify spam, go to our NFT API FAQ at
     * https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/nft-api-faq#nft-spam-classification.
     *
     * @param contractAddress - The contract address to check.
     */
    isSpamContract(contractAddress) {
        return isSpamContract(this.config, contractAddress);
    }
    /**
     * Returns a list of all spam contracts marked by Alchemy. For details on how
     * Alchemy marks spam contracts, go to
     * https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/nft-api-faq#nft-spam-classification.
     */
    getSpamContracts() {
        return getSpamContracts(this.config);
    }
    /**
     * Returns whether a contract is marked as spam or not by Alchemy. For more
     * information on how we classify spam, go to our NFT API FAQ at
     * https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/nft-api-faq#nft-spam-classification.
     *
     * @param contractAddress - The contract address to check.
     */
    reportSpam(contractAddress) {
        return reportSpam(this.config, contractAddress);
    }
    /**
     * Returns whether a token is marked as an airdrop or not.
     * Airdrops are defined as NFTs that were minted to a user address in a transaction
     * sent by a different address.
     *
     * @param contractAddress - The contract address to check.
     * @param tokenId - Token id of the NFT.
     */
    isAirdropNft(contractAddress, tokenId) {
        return isAirdropNft(this.config, contractAddress, tokenId);
    }
    /**
     * Returns the floor prices of a NFT contract by marketplace.
     *
     * @param contractAddress - The contract address for the NFT collection.
     * @beta
     */
    getFloorPrice(contractAddress) {
        return getFloorPrice(this.config, contractAddress);
    }
    getNftSales(options) {
        return getNftSales(this.config, options);
    }
    /**
     * Get the rarity of each attribute of an NFT.
     *
     * @param contractAddress - Contract address for the NFT collection.
     * @param tokenId - Token id of the NFT.
     */
    computeRarity(contractAddress, tokenId) {
        return computeRarity(this.config, contractAddress, tokenId);
    }
    /**
     * Search for a keyword across metadata of all ERC-721 and ERC-1155 smart contracts.
     *
     * @param query - The search string that you want to search for in contract metadata.
     */
    searchContractMetadata(query) {
        return searchContractMetadata(this.config, query);
    }
    /**
     * Get a summary of attribute prevalence for an NFT collection.
     *
     * @param contractAddress - Contract address for the NFT collection.
     */
    summarizeNftAttributes(contractAddress) {
        return summarizeNftAttributes(this.config, contractAddress);
    }
    /**
     * Refreshes the cached metadata for a provided NFT contract address and token
     * id. Returns a boolean value indicating whether the metadata was refreshed.
     *
     * This method is useful when you want to refresh the metadata for a NFT that
     * has been updated since the last time it was fetched. Note that the backend
     * only allows one refresh per token every 15 minutes, globally for all users.
     * The last refresh time for an NFT can be accessed on the
     * {@link Nft.timeLastUpdated} field.
     *
     * To trigger a refresh for all NFTs in a contract, use {@link refreshContract} instead.
     *
     * @param contractAddress - The contract address of the NFT.
     * @param tokenId - The token id of the NFT.
     */
    refreshNftMetadata(contractAddress, tokenId) {
        return refreshNftMetadata(this.config, contractAddress, tokenId);
    }
    /**
     * Triggers a metadata refresh all NFTs in the provided contract address. This
     * method is useful after an NFT collection is revealed.
     *
     * Refreshes are queued on the Alchemy backend and may take time to fully
     * process. To refresh the metadata for a specific token, use the
     * {@link refreshNftMetadata} method instead.
     *
     * @param contractAddress - The contract address of the NFT collection.
     * @beta
     */
    refreshContract(contractAddress) {
        return refreshContract(this.config, contractAddress);
    }
}

/**
 * The Notify namespace contains methods used for creating, reading, updating,
 * and deleting webhooks in the Notify API.
 *
 * To use the methods in the API, you must provide your team's auth token in the
 * {@link AlchemySettings.authToken} field when configuring
 * {@link AlchemySettings}. The auth token can be found in the Alchemy Dashboard
 * on the Notify tab.
 *
 * Note that not all networks are supported in the Notify API. Please consult
 * the documentation for which networks are supported.
 *
 * Do not call this constructor directly. Instead, instantiate an Alchemy object
 * with `const alchemy = new Alchemy(config)` and then access the notify
 * namespace via `alchemy.notify`.
 */
class NotifyNamespace {
    /** @internal */
    constructor(config) {
        this.config = config;
    }
    /**
     * Get all webhooks on your team.
     *
     * The team is determined by the `authToken` provided into the {@link AlchemySettings}
     * object when creating a new {@link Alchemy} instance.
     *
     * This method returns a response object containing all the webhooks
     */
    getAllWebhooks() {
        return __awaiter$1(this, void 0, void 0, function* () {
            this.verifyConfig();
            const response = yield this.sendWebhookRequest('team-webhooks', 'getAllWebhooks', {});
            return {
                webhooks: parseRawWebhookResponse(response),
                totalCount: response.data.length
            };
        });
    }
    getAddresses(webhookOrId, options) {
        return __awaiter$1(this, void 0, void 0, function* () {
            this.verifyConfig();
            const webhookId = typeof webhookOrId === 'string' ? webhookOrId : webhookOrId.id;
            const response = yield this.sendWebhookRequest('webhook-addresses', 'getAddresses', {
                webhook_id: webhookId,
                limit: options === null || options === void 0 ? void 0 : options.limit,
                after: options === null || options === void 0 ? void 0 : options.pageKey
            });
            return parseRawAddressActivityResponse(response);
        });
    }
    getGraphqlQuery(webhookOrId) {
        return __awaiter$1(this, void 0, void 0, function* () {
            this.verifyConfig();
            const webhookId = typeof webhookOrId === 'string' ? webhookOrId : webhookOrId.id;
            const response = yield this.sendWebhookRequest('dashboard-webhook-graphql-query', 'getGraphqlQuery', {
                webhook_id: webhookId
            });
            return parseRawCustomGraphqlWebhookResponse(response);
        });
    }
    getNftFilters(webhookOrId, options) {
        return __awaiter$1(this, void 0, void 0, function* () {
            this.verifyConfig();
            const webhookId = typeof webhookOrId === 'string' ? webhookOrId : webhookOrId.id;
            const response = yield this.sendWebhookRequest('webhook-nft-filters', 'getNftFilters', {
                webhook_id: webhookId,
                limit: options === null || options === void 0 ? void 0 : options.limit,
                after: options === null || options === void 0 ? void 0 : options.pageKey
            });
            return parseRawNftFiltersResponse(response);
        });
    }
    updateWebhook(webhookOrId, update) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const webhookId = typeof webhookOrId === 'string' ? webhookOrId : webhookOrId.id;
            let restApiName;
            let methodName;
            let method;
            let data;
            if ('isActive' in update) {
                restApiName = 'update-webhook';
                methodName = 'updateWebhook';
                method = 'PUT';
                data = {
                    webhook_id: webhookId,
                    is_active: update.isActive
                };
            }
            else if ('addFilters' in update || 'removeFilters' in update) {
                restApiName = 'update-webhook-nft-filters';
                methodName = 'updateWebhookNftFilters';
                method = 'PATCH';
                data = {
                    webhook_id: webhookId,
                    nft_filters_to_add: update.addFilters
                        ? update.addFilters.map(nftFilterToParam)
                        : [],
                    nft_filters_to_remove: update.removeFilters
                        ? update.removeFilters.map(nftFilterToParam)
                        : []
                };
            }
            else if ('addMetadataFilters' in update ||
                'removeMetadataFilters' in update) {
                restApiName = 'update-webhook-nft-metadata-filters';
                methodName = 'updateWebhookNftMetadataFilters';
                method = 'PATCH';
                data = {
                    webhook_id: webhookId,
                    nft_metadata_filters_to_add: update.addMetadataFilters
                        ? update.addMetadataFilters.map(nftFilterToParam)
                        : [],
                    nft_metadata_filters_to_remove: update.removeMetadataFilters
                        ? update.removeMetadataFilters.map(nftFilterToParam)
                        : []
                };
            }
            else if ('addAddresses' in update || 'removeAddresses' in update) {
                restApiName = 'update-webhook-addresses';
                methodName = 'webhook:updateWebhookAddresses';
                method = 'PATCH';
                data = {
                    webhook_id: webhookId,
                    addresses_to_add: yield this.resolveAddresses(update.addAddresses),
                    addresses_to_remove: yield this.resolveAddresses(update.removeAddresses)
                };
            }
            else if ('newAddresses' in update) {
                restApiName = 'update-webhook-addresses';
                methodName = 'webhook:updateWebhookAddress';
                method = 'PUT';
                data = {
                    webhook_id: webhookId,
                    addresses: yield this.resolveAddresses(update.newAddresses)
                };
            }
            else {
                throw new Error('Invalid `update` param passed into `updateWebhook`');
            }
            yield this.sendWebhookRequest(restApiName, methodName, {}, {
                method,
                data
            });
        });
    }
    createWebhook(url, type, params) {
        return __awaiter$1(this, void 0, void 0, function* () {
            let appId;
            if (type === exports.WebhookType.MINED_TRANSACTION ||
                type === exports.WebhookType.DROPPED_TRANSACTION) {
                if (!('appId' in params)) {
                    throw new Error('Transaction Webhooks require an app id.');
                }
                appId = params.appId;
            }
            let network = NETWORK_TO_WEBHOOK_NETWORK.get(this.config.network);
            let nftFilterObj;
            let addresses;
            let graphqlQuery;
            if (type === exports.WebhookType.NFT_ACTIVITY ||
                type === exports.WebhookType.NFT_METADATA_UPDATE) {
                if (!('filters' in params) || params.filters.length === 0) {
                    throw new Error('Nft Activity Webhooks require a non-empty array input.');
                }
                network = params.network
                    ? NETWORK_TO_WEBHOOK_NETWORK.get(params.network)
                    : network;
                const filters = params.filters.map(filter => filter.tokenId
                    ? {
                        contract_address: filter.contractAddress,
                        token_id: bignumber.BigNumber.from(filter.tokenId).toString()
                    }
                    : {
                        contract_address: filter.contractAddress
                    });
                nftFilterObj =
                    type === exports.WebhookType.NFT_ACTIVITY
                        ? { nft_filters: filters }
                        : { nft_metadata_filters: filters };
            }
            else if (type === exports.WebhookType.ADDRESS_ACTIVITY) {
                if (params === undefined ||
                    !('addresses' in params) ||
                    params.addresses.length === 0) {
                    throw new Error('Address Activity Webhooks require a non-empty array input.');
                }
                network = params.network
                    ? NETWORK_TO_WEBHOOK_NETWORK.get(params.network)
                    : network;
                addresses = yield this.resolveAddresses(params.addresses);
            }
            else if (type == exports.WebhookType.GRAPHQL) {
                if (params === undefined ||
                    !('graphqlQuery' in params) ||
                    params.graphqlQuery.length === 0) {
                    throw new Error('Custom Webhooks require a non-empty graphql query.');
                }
                network = params.network
                    ? NETWORK_TO_WEBHOOK_NETWORK.get(params.network)
                    : network;
                graphqlQuery = params.graphqlQuery;
            }
            const data = Object.assign(Object.assign(Object.assign(Object.assign({ network, webhook_type: type, webhook_url: url }, (appId && { app_id: appId })), nftFilterObj), (addresses && { addresses })), (graphqlQuery && { graphql_query: graphqlQuery }));
            const response = yield this.sendWebhookRequest('create-webhook', 'createWebhook', {}, {
                method: 'POST',
                data
            });
            return parseRawWebhook(response.data);
        });
    }
    deleteWebhook(webhookOrId) {
        return __awaiter$1(this, void 0, void 0, function* () {
            this.verifyConfig();
            const webhookId = typeof webhookOrId === 'string' ? webhookOrId : webhookOrId.id;
            const response = yield this.sendWebhookRequest('delete-webhook', 'deleteWebhook', {
                webhook_id: webhookId
            }, {
                method: 'DELETE'
            });
            if ('message' in response) {
                throw new Error(`Webhook not found. Failed to delete webhook: ${webhookId}`);
            }
        });
    }
    verifyConfig() {
        if (this.config.authToken === undefined) {
            throw new Error('Using the Notify API requires setting the Alchemy Auth Token in ' +
                'the settings object when initializing Alchemy.');
        }
    }
    sendWebhookRequest(restApiName, methodName, params, overrides) {
        return requestHttpWithBackoff(this.config, AlchemyApiType.WEBHOOK, restApiName, methodName, params, Object.assign(Object.assign({}, overrides), { headers: Object.assign({ 'X-Alchemy-Token': this.config.authToken }, overrides === null || overrides === void 0 ? void 0 : overrides.headers) }));
    }
    /** Resolves ENS addresses to the raw address.
     * @internal */
    resolveAddresses(addresses) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (addresses === undefined) {
                return [];
            }
            const resolvedAddresses = [];
            const provider = yield this.config.getProvider();
            for (const address of addresses) {
                const rawAddress = yield provider.resolveName(address);
                if (rawAddress === null) {
                    throw new Error(`Unable to resolve the ENS address: ${address}`);
                }
                resolvedAddresses.push(rawAddress);
            }
            return resolvedAddresses;
        });
    }
}
/**
 * Mapping of webhook network representations to the SDK's network representation.
 *
 * @internal
 */
const WEBHOOK_NETWORK_TO_NETWORK = {
    ETH_MAINNET: exports.Network.ETH_MAINNET,
    ETH_GOERLI: exports.Network.ETH_GOERLI,
    ETH_SEPOLIA: exports.Network.ETH_SEPOLIA,
    MATIC_MAINNET: exports.Network.MATIC_MAINNET,
    MATIC_MUMBAI: exports.Network.MATIC_MUMBAI,
    ARB_MAINNET: exports.Network.ARB_MAINNET,
    ARB_GOERLI: exports.Network.ARB_GOERLI,
    OPT_MAINNET: exports.Network.OPT_MAINNET,
    OPT_GOERLI: exports.Network.OPT_GOERLI,
    BASE_MAINNET: exports.Network.BASE_MAINNET,
    BASE_GOERLI: exports.Network.BASE_GOERLI,
    BASE_SEPOLIA: exports.Network.BASE_SEPOLIA
};
/** Mapping of the SDK's network representation the webhook API's network representation. */
const NETWORK_TO_WEBHOOK_NETWORK = Object.keys(exports.Network).reduce((map, key) => {
    if (key in WEBHOOK_NETWORK_TO_NETWORK) {
        map.set(WEBHOOK_NETWORK_TO_NETWORK[key], key);
    }
    return map;
}, new Map());
function parseRawWebhookResponse(response) {
    return response.data.map(parseRawWebhook);
}
function parseRawWebhook(rawWebhook) {
    return Object.assign({ id: rawWebhook.id, network: WEBHOOK_NETWORK_TO_NETWORK[rawWebhook.network], type: rawWebhook.webhook_type, url: rawWebhook.webhook_url, isActive: rawWebhook.is_active, timeCreated: new Date(rawWebhook.time_created).toISOString(), signingKey: rawWebhook.signing_key, version: rawWebhook.version }, (rawWebhook.app_id !== undefined && { appId: rawWebhook.app_id }));
}
function parseRawAddressActivityResponse(response) {
    return {
        addresses: response.data,
        totalCount: response.pagination.total_count,
        pageKey: response.pagination.cursors.after
    };
}
function parseRawCustomGraphqlWebhookResponse(response) {
    return {
        graphqlQuery: response.data.graphql_query
    };
}
function parseRawNftFiltersResponse(response) {
    return {
        filters: response.data.map(f => f.token_id
            ? {
                contractAddress: f.contract_address,
                tokenId: bignumber.BigNumber.from(f.token_id).toString()
            }
            : {
                contractAddress: f.contract_address
            }),
        totalCount: response.pagination.total_count,
        pageKey: response.pagination.cursors.after
    };
}
function nftFilterToParam(filter) {
    return filter.tokenId
        ? {
            contract_address: filter.contractAddress,
            token_id: bignumber.BigNumber.from(filter.tokenId).toString()
        }
        : {
            contract_address: filter.contractAddress
        };
}

/**
 * Multiples to increment fee per gas when using
 * {@link TransactNamespace.sendGasOptimizedTransaction}.
 *
 * @internal
 */
const GAS_OPTIMIZED_TX_FEE_MULTIPLES = [0.9, 1, 1.1, 1.2, 1.3];
/**
 * The Transact namespace contains methods used for sending transactions and
 * checking on the state of submitted transactions.
 *
 * Do not call this constructor directly. Instead, instantiate an Alchemy object
 * with `const alchemy = new Alchemy(config)` and then access the transact
 * namespace via `alchemy.transact`.
 */
class TransactNamespace {
    /** @internal */
    constructor(config) {
        this.config = config;
    }
    /**
     * Used to send a single transaction to Flashbots. Flashbots will attempt to
     * send the transaction to miners for the next 25 blocks.
     *
     * Returns the transaction hash of the submitted transaction.
     *
     * @param signedTransaction The raw, signed transaction as a hash.
     * @param maxBlockNumber Optional highest block number in which the
     *   transaction should be included.
     * @param options Options to configure the request.
     */
    sendPrivateTransaction(signedTransaction, maxBlockNumber, options) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            const hexBlockNumber = maxBlockNumber ? toHex(maxBlockNumber) : undefined;
            return provider._send('eth_sendPrivateTransaction', [
                {
                    tx: signedTransaction,
                    maxBlockNumber: hexBlockNumber,
                    preferences: options
                }
            ], 'sendPrivateTransaction');
        });
    }
    /**
     * Stops the provided private transaction from being submitted for future
     * blocks. A transaction can only be cancelled if the request is signed by the
     * same key as the {@link sendPrivateTransaction} call submitting the
     * transaction in first place.
     *
     * Please note that fast mode transactions cannot be cancelled using this method.
     *
     * Returns a boolean indicating whether the cancellation was successful.
     *
     * @param transactionHash Transaction hash of private tx to be cancelled
     */
    cancelPrivateTransaction(transactionHash) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider._send('eth_cancelPrivateTransaction', [
                {
                    txHash: transactionHash
                }
            ], 'cancelPrivateTransaction');
        });
    }
    /**
     * Simulates the asset changes resulting from a list of transactions simulated
     * in sequence.
     *
     * Returns a list of asset changes for each transaction during simulation.
     *
     * @param transactions Transactions list of max 3 transactions to simulate.
     * @param blockIdentifier Optional block identifier to simulate the
     * transaction in.
     */
    simulateAssetChangesBundle(transactions, blockIdentifier) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            const params = blockIdentifier !== undefined
                ? [transactions, blockIdentifier]
                : [transactions];
            const res = yield provider._send('alchemy_simulateAssetChangesBundle', params, 'simulateAssetChangesBundle');
            return nullsToUndefined(res);
        });
    }
    /**
     * Simulates the asset changes resulting from a single transaction.
     *
     * Returns list of asset changes that occurred during the transaction
     * simulation. Note that this method does not run the transaction on the
     * blockchain.
     *
     * @param transaction The transaction to simulate.
     * @param blockIdentifier Optional block identifier to simulate the
     * transaction in.
     */
    simulateAssetChanges(transaction, blockIdentifier) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            const params = blockIdentifier !== undefined
                ? [transaction, blockIdentifier]
                : [transaction];
            const res = yield provider._send('alchemy_simulateAssetChanges', params, 'simulateAssetChanges');
            return nullsToUndefined(res);
        });
    }
    /**
     * Simulates a list of transactions in sequence and returns list of decoded
     * traces and logs that occurred for each transaction during simulation.
     *
     * Note that this method does not run any transactions on the blockchain.
     *
     * @param transactions Transactions list of max 3 transactions to simulate.
     * @param blockIdentifier Optional block identifier to simulate the
     * transaction in.
     */
    simulateExecutionBundle(transactions, blockIdentifier) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            const params = blockIdentifier !== undefined
                ? [transactions, blockIdentifier]
                : [transactions];
            const res = provider._send('alchemy_simulateExecutionBundle', params, 'simulateExecutionBundle');
            return nullsToUndefined(res);
        });
    }
    /**
     * Simulates a single transaction and the resulting and returns list of
     * decoded traces and logs that occurred during the transaction simulation.
     *
     * Note that this method does not run the transaction on the blockchain.
     *
     * @param transaction The transaction to simulate.
     * @param blockIdentifier Optional block identifier to simulate the
     * transaction in.
     */
    simulateExecution(transaction, blockIdentifier) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            const params = blockIdentifier !== undefined
                ? [transaction, blockIdentifier]
                : [transaction];
            const res = provider._send('alchemy_simulateExecution', params, 'simulateExecution');
            return nullsToUndefined(res);
        });
    }
    /**
     * Returns the transaction with hash or null if the transaction is unknown.
     *
     * If a transaction has not been mined, this method will search the
     * transaction pool. Various backends may have more restrictive transaction
     * pool access (e.g. if the gas price is too low or the transaction was only
     * recently sent and not yet indexed) in which case this method may also return null.
     *
     * NOTE: This is an alias for {@link CoreNamespace.getTransaction}.
     *
     * @param transactionHash The hash of the transaction to get.
     * @public
     */
    getTransaction(transactionHash) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getTransaction(transactionHash);
        });
    }
    /**
     * Submits transaction to the network to be mined. The transaction must be
     * signed, and be valid (i.e. the nonce is correct and the account has
     * sufficient balance to pay for the transaction).
     *
     * NOTE: This is an alias for {@link CoreNamespace.sendTransaction}.
     *
     * @param signedTransaction The signed transaction to send.
     * @public
     */
    sendTransaction(signedTransaction) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.sendTransaction(signedTransaction);
        });
    }
    /**
     * Returns an estimate of the amount of gas that would be required to submit
     * transaction to the network.
     *
     * An estimate may not be accurate since there could be another transaction on
     * the network that was not accounted for, but after being mined affects the
     * relevant state.
     *
     * This is an alias for {@link CoreNamespace.estimateGas}.
     *
     * @param transaction The transaction to estimate gas for.
     * @public
     */
    estimateGas(transaction) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.estimateGas(transaction);
        });
    }
    /**
     * Returns a fee per gas (in wei) that is an estimate of how much you can pay
     * as a priority fee, or "tip", to get a transaction included in the current block.
     *
     * This number is generally used to set the `maxPriorityFeePerGas` field in a
     * transaction request.
     *
     * @public
     */
    getMaxPriorityFeePerGas() {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            const feeHex = yield provider._send('eth_maxPriorityFeePerGas', [], 'getMaxPriorityFeePerGas');
            return fromHex(feeHex);
        });
    }
    /**
     * Returns a promise which will not resolve until specified transaction hash is mined.
     *
     * If {@link confirmations} is 0, this method is non-blocking and if the
     * transaction has not been mined returns null. Otherwise, this method will
     * block until the transaction has confirmed blocks mined on top of the block
     * in which it was mined.
     *
     * NOTE: This is an alias for {@link CoreNamespace.waitForTransaction}.
     *
     * @param transactionHash The hash of the transaction to wait for.
     * @param confirmations The number of blocks to wait for.
     * @param timeout The maximum time to wait for the transaction to confirm.
     * @public
     */
    waitForTransaction(transactionHash, confirmations, timeout) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.waitForTransaction(transactionHash, confirmations, timeout);
        });
    }
    sendGasOptimizedTransaction(transactionOrSignedTxs, wallet) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (Array.isArray(transactionOrSignedTxs)) {
                return this._sendGasOptimizedTransaction(transactionOrSignedTxs, 'sendGasOptimizedTransactionPreSigned');
            }
            let gasLimit;
            let priorityFee;
            let baseFee;
            const provider = yield this.config.getProvider();
            try {
                gasLimit = yield this.estimateGas(transactionOrSignedTxs);
                priorityFee = yield this.getMaxPriorityFeePerGas();
                const currentBlock = yield provider.getBlock('latest');
                baseFee = currentBlock.baseFeePerGas.toNumber();
            }
            catch (e) {
                throw new Error(`Failed to estimate gas for transaction: ${e}`);
            }
            const gasSpreadTransactions = generateGasSpreadTransactions(transactionOrSignedTxs, gasLimit.toNumber(), baseFee, priorityFee);
            const signedTransactions = yield Promise.all(gasSpreadTransactions.map(tx => wallet.signTransaction(tx)));
            return this._sendGasOptimizedTransaction(signedTransactions, 'sendGasOptimizedTransactionGenerated');
        });
    }
    /**
     * Returns the state of the transaction job returned by the
     * {@link sendGasOptimizedTransaction}.
     *
     * @param trackingId The tracking id from the response of the sent gas optimized transaction.
     * @internal
     */
    // TODO(txjob): Remove internal tag once this feature is released.
    getGasOptimizedTransactionStatus(trackingId) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider._send('alchemy_getGasOptimizedTransactionStatus', [trackingId], 'getGasOptimizedTransactionStatus');
        });
    }
    /** @internal */
    _sendGasOptimizedTransaction(signedTransactions, methodName) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider._send('alchemy_sendGasOptimizedTransaction', [
                {
                    rawTransactions: signedTransactions
                }
            ], methodName);
        });
    }
}
/**
 * Helper method to generate the raw transaction with the given gas limit and
 * priority fee across a spread of different gas prices.
 *
 * @internal
 */
// Visible for testing
function generateGasSpreadTransactions(transaction, gasLimit, baseFee, priorityFee) {
    return GAS_OPTIMIZED_TX_FEE_MULTIPLES.map(feeMultiplier => {
        return Object.assign(Object.assign({}, transaction), { gasLimit, maxFeePerGas: Math.round(baseFee * feeMultiplier + priorityFee * feeMultiplier), maxPriorityFeePerGas: Math.round(feeMultiplier * priorityFee) });
    });
}

/** This file contains internal types used by the SDK and are not exposed to the end user. */
/**
 * Prefix for `alchemy_pendingTransactions` subscriptions when serializing to
 * ethers events.
 *
 * This tag is used internally by ethers to track different event filters.
 */
const ALCHEMY_PENDING_TRANSACTIONS_EVENT_TYPE = 'alchemy-pending-transactions';
/**
 * Prefix for `alchemy_minedTransactions` subscriptions when serializing to ethers events.
 *
 * This tag is used internally by ethers to track different event filters.
 */
const ALCHEMY_MINED_TRANSACTIONS_EVENT_TYPE = 'alchemy-mined-transactions';
/**
 * Array containing all the custom event tags used internally by ethers to track
 * event filters.
 */
const ALCHEMY_EVENT_TYPES = [
    ALCHEMY_PENDING_TRANSACTIONS_EVENT_TYPE,
    ALCHEMY_MINED_TRANSACTIONS_EVENT_TYPE
];

/**
 * DO NOT MODIFY.
 *
 * Event class copied directly over from ethers.js's `BaseProvider` class.
 *
 * This class is used to represent events and their corresponding listeners. The
 * SDK needs to extend this class in order to support Alchemy's custom
 * Subscription API types. The original class is not exported by ethers. Minimal
 * changes have been made in order to get TS to compile.
 */
class Event {
    constructor(tag, listener, once) {
        this.listener = listener;
        this.tag = tag;
        this.once = once;
        this._lastBlockNumber = -2;
        this._inflight = false;
    }
    get event() {
        switch (this.type) {
            case 'tx':
                return this.hash;
            case 'filter':
                return this.filter;
            default:
                return this.tag;
        }
    }
    get type() {
        return this.tag.split(':')[0];
    }
    get hash() {
        const comps = this.tag.split(':');
        if (comps[0] !== 'tx') {
            throw new Error('Not a transaction event');
        }
        return comps[1];
    }
    get filter() {
        const comps = this.tag.split(':');
        if (comps[0] !== 'filter') {
            throw new Error('Not a transaction event');
        }
        const address = comps[1];
        const topics = deserializeTopics(comps[2]);
        const filter = {};
        if (topics.length > 0) {
            filter.topics = topics;
        }
        if (address && address !== '*') {
            filter.address = address;
        }
        return filter;
    }
    pollable() {
        const PollableEvents = ['block', 'network', 'pending', 'poll'];
        return this.tag.indexOf(':') >= 0 || PollableEvents.indexOf(this.tag) >= 0;
    }
}
/**
 * Wrapper class around the ethers `Event` class in order to add support for
 * Alchemy's custom subscriptions types.
 *
 * The serialization and deserialization mechanism requires the order of the
 * fields to be the same across different {@link ALCHEMY_EVENT_TYPES}. Before
 * using a getter on a new event filter, make sure that the position of the
 * field in serialization is correct.
 *
 * The getters on this class deserialize the event tag generated by
 * {@link getAlchemyEventTag} into the original fields passed into the event.
 */
class EthersEvent extends Event {
    /**
     * Converts the event tag into the original `fromAddress` field in
     * {@link AlchemyPendingTransactionsEventFilter}.
     */
    get fromAddress() {
        const comps = this.tag.split(':');
        if (comps[0] !== ALCHEMY_PENDING_TRANSACTIONS_EVENT_TYPE) {
            return undefined;
        }
        if (comps[1] && comps[1] !== '*') {
            return deserializeAddressField(comps[1]);
        }
        else {
            return undefined;
        }
    }
    /**
     * Converts the event tag into the original `toAddress` field in
     * {@link AlchemyPendingTransactionsEventFilter}.
     */
    get toAddress() {
        const comps = this.tag.split(':');
        if (comps[0] !== ALCHEMY_PENDING_TRANSACTIONS_EVENT_TYPE) {
            return undefined;
        }
        if (comps[2] && comps[2] !== '*') {
            return deserializeAddressField(comps[2]);
        }
        else {
            return undefined;
        }
    }
    /**
     * Converts the event tag into the original `hashesOnly` field in
     * {@link AlchemyPendingTransactionsEventFilter} and {@link AlchemyMinedTransactionsEventFilter}.
     */
    get hashesOnly() {
        const comps = this.tag.split(':');
        if (!ALCHEMY_EVENT_TYPES.includes(comps[0])) {
            return undefined;
        }
        if (comps[3] && comps[3] !== '*') {
            return comps[3] === 'true';
        }
        else {
            return undefined;
        }
    }
    get includeRemoved() {
        const comps = this.tag.split(':');
        if (comps[0] !== ALCHEMY_MINED_TRANSACTIONS_EVENT_TYPE) {
            return undefined;
        }
        if (comps[2] && comps[2] !== '*') {
            return comps[2] === 'true';
        }
        else {
            return undefined;
        }
    }
    get addresses() {
        const comps = this.tag.split(':');
        if (comps[0] !== ALCHEMY_MINED_TRANSACTIONS_EVENT_TYPE) {
            return undefined;
        }
        if (comps[1] && comps[1] !== '*') {
            return deserializeAddressesField(comps[1]);
        }
        else {
            return undefined;
        }
    }
}
function isAlchemyEvent(event) {
    return typeof event === 'object' && 'method' in event;
}
/**
 * Creates a string representation of an `alchemy_pendingTransaction`
 * subscription filter that is compatible with the ethers implementation of
 * `getEventTag()`. The method is not an exported function in ethers, which is
 * why the SDK has its own implementation.
 *
 * The event tag is then deserialized by the SDK's {@link EthersEvent} getters.
 *
 * @example
 *   ```js
 *   // Returns 'alchemy-pending-transactions:0xABC:0xDEF|0xGHI:true'
 *   const eventTag =  getAlchemyEventTag(
 *   {
 *     "method": "alchemy_pendingTransactions",
 *     "fromAddress": "0xABC",
 *     "toAddress": ["0xDEF", "0xGHI"],
 *     "hashesOnly: true
 *   });
 *   ```;
 *
 * @param event
 * @internal
 */
function getAlchemyEventTag(event) {
    if (!isAlchemyEvent(event)) {
        throw new Error('Event tag requires AlchemyEventType');
    }
    if (event.method === exports.AlchemySubscription.PENDING_TRANSACTIONS) {
        return serializePendingTransactionsEvent(event);
    }
    else if (event.method === exports.AlchemySubscription.MINED_TRANSACTIONS) {
        return serializeMinedTransactionsEvent(event);
    }
    else {
        throw new Error(`Unrecognized AlchemyFilterEvent: ${event}`);
    }
}
function verifyAlchemyEventName(eventName) {
    if (!Object.values(exports.AlchemySubscription).includes(eventName.method)) {
        throw new Error(`Invalid method name ${eventName.method}. Accepted method names: ${Object.values(exports.AlchemySubscription)}`);
    }
}
/**
 * Serializes the provided {@link AlchemyPendingTransactionsEventFilter} into an ethers
 * compatible event tag.
 *
 * For the example event:
 * ```
 *  {
 *     "method": "alchemy_pendingTransactions",
 *     "fromAddress": "0xABC",
 *     "toAddress": ["0xDEF", "0xGHI"],
 *     "hashesOnly: true
 *   }
 * ```
 *
 * The resulting serialization is:
 * `alchemy_pendingTransactions:0xABC:0xDEF|0xGHI:true`
 *
 * If a field is omitted, it is replaced with a `*`.
 */
function serializePendingTransactionsEvent(event) {
    const fromAddress = serializeAddressField(event.fromAddress);
    const toAddress = serializeAddressField(event.toAddress);
    const hashesOnly = serializeBooleanField(event.hashesOnly);
    return (ALCHEMY_PENDING_TRANSACTIONS_EVENT_TYPE +
        ':' +
        fromAddress +
        ':' +
        toAddress +
        ':' +
        hashesOnly);
}
/**
 * Serializes the provided {@link AlchemyPendingTransactionsEventFilter} into an ethers
 * compatible event tag.
 *
 * For the example event:
 * ```
 *  {
 *     "method": "alchemy_minedTransactions",
 *     "addresses": [
 *       {
 *         from: "0xABC"
 *       },
 *       {
 *         to: "0xDEF",
 *         from: "0x123"
 *       }
 *     ]
 *     "includeRemoved": false
 *     "hashesOnly: true
 *   }
 * ```
 *
 * The resulting serialization is:
 * `alchemy_minedTransactions:*,0xABC|0xDEF,0x123:false:true`
 *
 * If a field is omitted, it is replaced with a `*`.
 *
 * The `addresses` array is split by the '|' character, and each to/from address
 * pair is separated by a ',' character.
 *
 */
function serializeMinedTransactionsEvent(event) {
    const addresses = serializeAddressesField(event.addresses);
    const includeRemoved = serializeBooleanField(event.includeRemoved);
    const hashesOnly = serializeBooleanField(event.hashesOnly);
    return (ALCHEMY_MINED_TRANSACTIONS_EVENT_TYPE +
        ':' +
        addresses +
        ':' +
        includeRemoved +
        ':' +
        hashesOnly);
}
function serializeAddressesField(addresses) {
    if (addresses === undefined) {
        return '*';
    }
    return addresses
        .map(filter => serializeAddressField(filter.to) +
        ',' +
        serializeAddressField(filter.from))
        .join('|');
}
function serializeAddressField(field) {
    if (field === undefined) {
        return '*';
    }
    else if (Array.isArray(field)) {
        return field.join('|');
    }
    else {
        return field;
    }
}
function serializeBooleanField(field) {
    if (field === undefined) {
        return '*';
    }
    else {
        return field.toString();
    }
}
function deserializeTopics(data) {
    if (data === '') {
        return [];
    }
    return data.split(/&/g).map(topic => {
        if (topic === '') {
            return [];
        }
        const comps = topic.split('|').map(topic => {
            return topic === 'null' ? null : topic;
        });
        return comps.length === 1 ? comps[0] : comps;
    });
}
function deserializeAddressField(data) {
    if (data === '') {
        return undefined;
    }
    const addresses = data.split('|');
    return addresses.length === 1 ? addresses[0] : addresses;
}
function deserializeAddressesField(data) {
    if (data === '') {
        return undefined;
    }
    // Perform a cast here since TS doesn't know we're guaranteed a non-empty
    // array from deserializing.
    return data
        .split('|')
        .map(addressStr => addressStr.split(','))
        .map(addressPair => (Object.assign(Object.assign({}, (addressPair[0] !== '*' && { to: addressPair[0] })), (addressPair[1] !== '*' && { from: addressPair[1] }))));
}

/**
 * The Websocket namespace contains all subscription related functions that
 * allow you to subscribe to events and receive updates as they occur. The
 * underlying WebSocket provider has additional logic to handle reconnections
 * and automatically backfills missed events.
 *
 * Do not call this constructor directly. Instead, instantiate an Alchemy object
 * with `const alchemy = new Alchemy(config)` and then access the core namespace
 * via `alchemy.ws`.
 */
class WebSocketNamespace {
    /** @internal */
    constructor(config) {
        this.config = config;
    }
    /**
     * Adds a listener to be triggered for each {@link eventName} event. Also
     * includes Alchemy's Subscription API events. See {@link AlchemyEventType} for
     * how to use them.
     *
     * @param eventName The event to listen for.
     * @param listener The listener to call when the event is triggered.
     * @public
     */
    on(eventName, listener) {
        void (() => __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getWebSocketProvider();
            const processedEvent = yield this._resolveEnsAlchemyEvent(eventName);
            provider.on(processedEvent, listener);
        }))();
        return this;
    }
    /**
     * Adds a listener to be triggered for only the next {@link eventName} event,
     * after which it will be removed. Also includes Alchemy's Subscription API
     * events. See {@link AlchemyEventType} for how to use them.
     *
     * @param eventName The event to listen for.
     * @param listener The listener to call when the event is triggered.
     * @public
     */
    once(eventName, listener) {
        void (() => __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getWebSocketProvider();
            const processedEvent = yield this._resolveEnsAlchemyEvent(eventName);
            provider.once(processedEvent, listener);
        }))();
        return this;
    }
    /**
     * Removes the provided {@link listener} for the {@link eventName} event. If no
     * listener is provided, all listeners for the event will be removed.
     *
     * @param eventName The event to unlisten to.
     * @param listener The listener to remove.
     * @public
     */
    off(eventName, listener) {
        void (() => __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getWebSocketProvider();
            const processedEvent = yield this._resolveEnsAlchemyEvent(eventName);
            return provider.off(processedEvent, listener);
        }))();
        return this;
    }
    /**
     * Remove all listeners for the provided {@link eventName} event. If no event
     * is provided, all events and their listeners are removed.
     *
     * @param eventName The event to remove all listeners for.
     * @public
     */
    removeAllListeners(eventName) {
        void (() => __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getWebSocketProvider();
            const processedEvent = eventName
                ? yield this._resolveEnsAlchemyEvent(eventName)
                : undefined;
            provider.removeAllListeners(processedEvent);
        }))();
        return this;
    }
    /**
     * Returns the number of listeners for the provided {@link eventName} event. If
     * no event is provided, the total number of listeners for all events is returned.
     *
     * @param eventName The event to get the number of listeners for.
     * @public
     */
    listenerCount(eventName) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getWebSocketProvider();
            const processedEvent = eventName
                ? yield this._resolveEnsAlchemyEvent(eventName)
                : undefined;
            return provider.listenerCount(processedEvent);
        });
    }
    /**
     * Returns an array of listeners for the provided {@link eventName} event. If
     * no event is provided, all listeners will be included.
     *
     * @param eventName The event to get the listeners for.
     */
    listeners(eventName) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getWebSocketProvider();
            const processedEvent = eventName
                ? yield this._resolveEnsAlchemyEvent(eventName)
                : undefined;
            return provider.listeners(processedEvent);
        });
    }
    /**
     * Converts ENS addresses in an Alchemy Event to the underlying resolved
     * address.
     *
     * VISIBLE ONLY FOR TESTING.
     *
     * @internal
     */
    _resolveEnsAlchemyEvent(eventName) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!isAlchemyEvent(eventName)) {
                return eventName;
            }
            if (eventName.method === exports.AlchemySubscription.MINED_TRANSACTIONS &&
                eventName.addresses) {
                const processedAddresses = [];
                for (const address of eventName.addresses) {
                    if (address.to) {
                        address.to = yield this._resolveNameOrError(address.to);
                    }
                    if (address.from) {
                        address.from = yield this._resolveNameOrError(address.from);
                    }
                    processedAddresses.push(address);
                }
                eventName.addresses =
                    processedAddresses;
            }
            else if (eventName.method === exports.AlchemySubscription.PENDING_TRANSACTIONS) {
                if (eventName.fromAddress) {
                    if (typeof eventName.fromAddress === 'string') {
                        eventName.fromAddress = yield this._resolveNameOrError(eventName.fromAddress);
                    }
                    else {
                        eventName.fromAddress = yield Promise.all(eventName.fromAddress.map(address => this._resolveNameOrError(address)));
                    }
                }
                if (eventName.toAddress) {
                    if (typeof eventName.toAddress === 'string') {
                        eventName.toAddress = yield this._resolveNameOrError(eventName.toAddress);
                    }
                    else {
                        eventName.toAddress = yield Promise.all(eventName.toAddress.map(address => this._resolveNameOrError(address)));
                    }
                }
            }
            return eventName;
        });
    }
    /**
     * Converts the provided ENS address or throws an error. This improves code
     * readability and type safety in other methods.
     *
     * VISIBLE ONLY FOR TESTING.
     *
     * @internal
     */
    _resolveNameOrError(name) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            const resolved = yield provider.resolveName(name);
            if (resolved === null) {
                throw new Error(`Unable to resolve the ENS address: ${name}`);
            }
            return resolved;
        });
    }
}

/**
 * The Alchemy SDK client. This class is the main entry point into Alchemy's
 * APIs and separates functionality into different namespaces.
 *
 * Each SDK instance is associated with a specific network and API key. To use a
 * different network or API key, create a new instance of {@link Alchemy}.
 *
 * @public
 */
class Alchemy {
    /**
     * @param {string} [settings.apiKey] - The API key to use for Alchemy
     * @param {Network} [settings.network] - The network to use for Alchemy
     * @param {number} [settings.maxRetries] - The maximum number of retries to attempt
     * @param {number} [settings.requestTimeout] - The timeout after which request should fail
     * @public
     */
    constructor(settings) {
        this.config = new AlchemyConfig(settings);
        this.core = new CoreNamespace(this.config);
        this.nft = new NftNamespace(this.config);
        this.ws = new WebSocketNamespace(this.config);
        this.transact = new TransactNamespace(this.config);
        this.notify = new NotifyNamespace(this.config);
        this.debug = new DebugNamespace(this.config);
    }
}

/**
 * The Wallet class inherits Signer and can sign transactions and messages using
 * a private key as a standard Externally Owned Account (EOA).
 *
 * SDK's custom implementation of Ethers.js's 'Wallet'.
 *
 * Primary difference from Ethers.js 'Wallet' is that you can pass in either a
 * Provider or an Alchemy object. This implementation will intelligently detect
 * the format and set the provider accordingly.
 *
 * @public
 * @override
 */
class Wallet extends wallet.Wallet {
    /**
     * Overload permits users to pass in either a standard Provider or an Alchemy
     * object. The constructor will detect the object type and handle appropriately.
     *
     * @override
     */
    constructor(privateKey, alchemyOrProvider) {
        // If object passed in is a provider, send to super
        let superProvider;
        if (alchemyOrProvider && abstractProvider.Provider.isProvider(alchemyOrProvider)) {
            superProvider = alchemyOrProvider;
        }
        super(privateKey, superProvider);
        // If object passed in is an Alchemy object, just set Alchemy
        if (alchemyOrProvider && !abstractProvider.Provider.isProvider(alchemyOrProvider)) {
            this.alchemyProviderPromise = alchemyOrProvider.config.getProvider();
        }
    }
    //////////////////////////////////////////////////////////////////
    // Set of overrides from Signer to handle async provider retrieval.
    //////////////////////////////////////////////////////////////////
    /**
     * Returns the balance of this wallet at blockTag.
     *
     * @param blockTag The block to check the balance of
     * @override
     */
    getBalance(blockTag) {
        return this.getWallet().then(wallet => wallet.getBalance(blockTag));
    }
    /**
     * Returns the number of transactions this account has ever sent. This is the
     * value required to be included in transactions as the nonce.
     *
     * @param blockTag The block to check the transaction count on
     * @override
     */
    getTransactionCount(blockTag) {
        return this.getWallet().then(wallet => wallet.getTransactionCount(blockTag));
    }
    /**
     * Returns the result of estimating the cost to send the transactionRequest,
     * with this account address being used as the from field.
     *
     * @param transaction Transaction to estimate the gas on
     * @override
     */
    estimateGas(transaction) {
        return this.getWallet().then(wallet => wallet.estimateGas(transaction));
    }
    /**
     * Returns the result of calling using the transactionRequest, with this
     * account address being used as the from field.
     *
     * @param transaction To make a call on
     * @param blockTag The block to make the call on
     * @override
     */
    call(transaction, blockTag) {
        return this.getWallet().then(wallet => wallet.call(transaction, blockTag));
    }
    /**
     * Populates ALL keys for a transaction and checks that `from` matches this
     * `Signer`. Resolves ENS names and populates fields like `gasPrice`, `gasLimit`,
     * `nonce`, and `chainId` if they are not provided.
     *
     * @param transaction The transaction to populate.
     * @override
     */
    populateTransaction(transaction) {
        return this.getWallet().then(wallet => wallet.populateTransaction(transaction));
    }
    /**
     * Populates all fields in a transaction, signs it and sends it to the network
     *
     * @param transaction The transaction to send.
     * @override
     */
    sendTransaction(transaction) {
        return this.getWallet().then(wallet => wallet.sendTransaction(transaction));
    }
    /**
     * Returns the chain ID this wallet is connected to.
     *
     * @override
     */
    getChainId() {
        return this.getWallet().then(wallet => wallet.getChainId());
    }
    /**
     * Returns the current gas price.
     *
     * @override
     */
    getGasPrice() {
        return this.getWallet().then(wallet => wallet.getGasPrice());
    }
    /**
     * Returns the current recommended FeeData to use in a transaction.
     *
     * For an EIP-1559 transaction, the maxFeePerGas and maxPriorityFeePerGas
     * should be used.
     *
     * For legacy transactions and networks which do not support EIP-1559, the
     * gasPrice should be used.
     *
     * @override
     */
    getFeeData() {
        return this.getWallet().then(wallet => wallet.getFeeData());
    }
    /**
     * Looks up the address of name. If the name is not owned, or does not have a
     * Resolver configured, or the Resolver does not have an address configured,
     * null is returned.
     *
     * @param name Name of the ENS address
     * @override
     */
    resolveName(name) {
        return this.getWallet().then(wallet => wallet.resolveName(name));
    }
    getWallet() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.alchemyProviderPromise) {
                return this.connect(this.provider);
            }
            return this.connect(yield this.alchemyProviderPromise);
        });
    }
}

/**
 * The Contract class is a wrapper around the Contract class from ethers.js and
 * is exported here for convenience.
 *
 * @public
 */
// TODO: support passing in Alchemy instance into the contract.
class Contract extends contracts.Contract {
}
/**
 * The ContractFactory class is a wrapper around the ContractFactory class from
 * ethers.js and is exported here for convenience.
 *
 * @public
 */
class ContractFactory extends contracts.ContractFactory {
}

/**
 * The maximum number of blocks to backfill. If more than this many blocks have
 * been missed, then we'll sadly miss data, but we want to make sure we don't
 * end up requesting thousands of blocks if somebody left their laptop closed for a week.
 */
const MAX_BACKFILL_BLOCKS = 120;
/**
 * The WebsocketBackfiller fetches events that were sent since a provided block
 * number. This is used in the {@link AlchemyWebSocketProvider} to backfill
 * events that were transmitted while the websocket connection was down.
 *
 * The backfiller backfills two main eth_subscribe events: `logs` and `newHeads`.
 *
 * @internal
 */
class WebsocketBackfiller {
    constructor(provider) {
        this.provider = provider;
        // TODO: Use HTTP provider to do backfill.
        this.maxBackfillBlocks = MAX_BACKFILL_BLOCKS;
    }
    /**
     * Runs backfill for `newHeads` events.
     *
     * @param isCancelled Whether the backfill request is cancelled.
     * @param previousHeads Previous head requests that were sent.
     * @param fromBlockNumber The block number to start backfilling from.
     * @returns A list of `newHeads` events that were sent since the last backfill.
     */
    getNewHeadsBackfill(isCancelled, previousHeads, fromBlockNumber) {
        return __awaiter$1(this, void 0, void 0, function* () {
            throwIfCancelled(isCancelled);
            const toBlockNumber = yield this.getBlockNumber();
            throwIfCancelled(isCancelled);
            // If there are no previous heads to fetch, return new heads since
            // `fromBlockNumber`, or up to maxBackfillBlocks from the current head.
            if (previousHeads.length === 0) {
                return this.getHeadEventsInRange(Math.max(fromBlockNumber, toBlockNumber - this.maxBackfillBlocks) + 1, toBlockNumber + 1);
            }
            // If the last emitted event is too far back in the past, there's no need
            // to backfill for reorgs. Just fetch the last `maxBackfillBlocks` worth of
            // new heads.
            const lastSeenBlockNumber = fromHex(previousHeads[previousHeads.length - 1].number);
            const minBlockNumber = toBlockNumber - this.maxBackfillBlocks + 1;
            if (lastSeenBlockNumber <= minBlockNumber) {
                return this.getHeadEventsInRange(minBlockNumber, toBlockNumber + 1);
            }
            // To capture all `newHeads` events, return all head events from the last
            // seen block number to current + any of the previous heads that were re-orged.
            const reorgHeads = yield this.getReorgHeads(isCancelled, previousHeads);
            throwIfCancelled(isCancelled);
            const intermediateHeads = yield this.getHeadEventsInRange(lastSeenBlockNumber + 1, toBlockNumber + 1);
            throwIfCancelled(isCancelled);
            return [...reorgHeads, ...intermediateHeads];
        });
    }
    /**
     * Runs backfill for `logs` events.
     *
     * @param isCancelled Whether the backfill request is cancelled.
     * @param filter The filter object that accompanies a logs subscription.
     * @param previousLogs Previous log requests that were sent.
     * @param fromBlockNumber The block number to start backfilling from.
     */
    getLogsBackfill(isCancelled, filter, previousLogs, fromBlockNumber) {
        return __awaiter$1(this, void 0, void 0, function* () {
            throwIfCancelled(isCancelled);
            const toBlockNumber = yield this.getBlockNumber();
            throwIfCancelled(isCancelled);
            // If there are no previous logs to fetch, return new logs since
            // `fromBlockNumber`, or up to `maxBackfillBlocks` from the current head.
            if (previousLogs.length === 0) {
                return this.getLogsInRange(filter, Math.max(fromBlockNumber, toBlockNumber - this.maxBackfillBlocks) + 1, toBlockNumber + 1);
            }
            // If the last emitted log is too far back in the past, there's no need
            // to backfill for removed logs. Just fetch the last `maxBackfillBlocks`
            // worth of logs.
            const lastSeenBlockNumber = fromHex(previousLogs[previousLogs.length - 1].blockNumber);
            const minBlockNumber = toBlockNumber - this.maxBackfillBlocks + 1;
            if (lastSeenBlockNumber < minBlockNumber) {
                return this.getLogsInRange(filter, minBlockNumber, toBlockNumber + 1);
            }
            // Return all log events that have happened along with log events that have
            // been removed due to a chain reorg.
            const commonAncestor = yield this.getCommonAncestor(isCancelled, previousLogs);
            throwIfCancelled(isCancelled);
            // All previous logs with a block number greater than the common ancestor
            // were part of a re-org, so mark them as such.
            const removedLogs = previousLogs
                .filter(log => fromHex(log.blockNumber) > commonAncestor.blockNumber)
                .map(log => (Object.assign(Object.assign({}, log), { removed: true })));
            // If no common ancestor was found, start backfill from the oldest log's
            // block number.
            const fromBlockInclusive = commonAncestor.blockNumber === Number.NEGATIVE_INFINITY
                ? fromHex(previousLogs[0].blockNumber)
                : commonAncestor.blockNumber;
            let addedLogs = yield this.getLogsInRange(filter, fromBlockInclusive, toBlockNumber + 1);
            // De-dupe any logs that were already emitted.
            addedLogs = addedLogs.filter(log => log &&
                (fromHex(log.blockNumber) > commonAncestor.blockNumber ||
                    fromHex(log.logIndex) > commonAncestor.logIndex));
            throwIfCancelled(isCancelled);
            return [...removedLogs, ...addedLogs];
        });
    }
    /**
     * Sets a new max backfill blocks. VISIBLE ONLY FOR TESTING.
     *
     * @internal
     */
    setMaxBackfillBlock(newMax) {
        this.maxBackfillBlocks = newMax;
    }
    /**
     * Gets the current block number as a number.
     *
     * @private
     */
    getBlockNumber() {
        return __awaiter$1(this, void 0, void 0, function* () {
            const blockNumberHex = yield this.provider.send('eth_blockNumber');
            return fromHex(blockNumberHex);
        });
    }
    /**
     * Gets all `newHead` events in the provided range. Note that the returned
     * heads do not include re-orged heads. Use {@link getReorgHeads} to find heads
     * that were part of a re-org.
     *
     * @private
     */
    getHeadEventsInRange(fromBlockInclusive, toBlockExclusive) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (fromBlockInclusive >= toBlockExclusive) {
                return [];
            }
            const batchParts = [];
            for (let i = fromBlockInclusive; i < toBlockExclusive; i++) {
                batchParts.push({
                    method: 'eth_getBlockByNumber',
                    params: [toHex(i), false]
                });
            }
            // TODO: handle errors
            const blockHeads = yield this.provider.sendBatch(batchParts);
            return blockHeads.map(toNewHeadsEvent);
        });
    }
    /**
     * Returns all heads that were part of a reorg event.
     *
     * @private
     */
    getReorgHeads(isCancelled, previousHeads) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const result = [];
            // Iterate from the most recent head backwards in order to find the first
            // block that was part of a re-org.
            for (let i = previousHeads.length - 1; i >= 0; i--) {
                const oldEvent = previousHeads[i];
                const blockHead = yield this.getBlockByNumber(fromHex(oldEvent.number));
                throwIfCancelled(isCancelled);
                // If the hashes match, then current head in the iteration was not re-orged.
                if (oldEvent.hash === blockHead.hash) {
                    break;
                }
                result.push(toNewHeadsEvent(blockHead));
            }
            return result.reverse();
        });
    }
    /**
     * Simple wrapper around `eth_getBlockByNumber` that returns the complete
     * block information for the provided block number.
     *
     * @private
     */
    getBlockByNumber(blockNumber) {
        return __awaiter$1(this, void 0, void 0, function* () {
            return this.provider.send('eth_getBlockByNumber', [
                toHex(blockNumber),
                false
            ]);
        });
    }
    /**
     * Given a list of previous log events, finds the common block number from the
     * logs that matches the block head.
     *
     * This can be used to identify which logs are part of a re-org.
     *
     * Returns 1 less than the oldest log's block number if no common ancestor was found.
     *
     * @private
     */
    getCommonAncestor(isCancelled, previousLogs) {
        return __awaiter$1(this, void 0, void 0, function* () {
            // Iterate from the most recent head backwards in order to find the first
            // block that was part of a re-org.
            let blockHead = yield this.getBlockByNumber(fromHex(previousLogs[previousLogs.length - 1].blockNumber));
            throwIfCancelled(isCancelled);
            for (let i = previousLogs.length - 1; i >= 0; i--) {
                const oldLog = previousLogs[i];
                // Ensure that updated blocks are fetched every time the log's block number
                // changes.
                if (oldLog.blockNumber !== blockHead.number) {
                    blockHead = yield this.getBlockByNumber(fromHex(oldLog.blockNumber));
                }
                // Since logs are ordered in ascending order, the first log that matches
                // the hash should be the largest logIndex.
                if (oldLog.blockHash === blockHead.hash) {
                    return {
                        blockNumber: fromHex(oldLog.blockNumber),
                        logIndex: fromHex(oldLog.logIndex)
                    };
                }
            }
            return {
                blockNumber: Number.NEGATIVE_INFINITY,
                logIndex: Number.NEGATIVE_INFINITY
            };
        });
    }
    /**
     * Gets all `logs` events in the provided range. Note that the returned logs
     * do not include removed logs.
     *
     * @private
     */ getLogsInRange(filter, fromBlockInclusive, toBlockExclusive) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (fromBlockInclusive >= toBlockExclusive) {
                return [];
            }
            const rangeFilter = Object.assign(Object.assign({}, filter), { fromBlock: toHex(fromBlockInclusive), toBlock: toHex(toBlockExclusive - 1) });
            return this.provider.send('eth_getLogs', [rangeFilter]);
        });
    }
}
function toNewHeadsEvent(head) {
    const result = Object.assign({}, head);
    delete result.totalDifficulty;
    delete result.transactions;
    delete result.uncles;
    return result;
}
function dedupeNewHeads(events) {
    return dedupe(events, event => event.hash);
}
function dedupeLogs(events) {
    return dedupe(events, event => `${event.blockHash}/${event.logIndex}`);
}
function dedupe(items, getKey) {
    const keysSeen = new Set();
    const result = [];
    items.forEach(item => {
        const key = getKey(item);
        if (!keysSeen.has(key)) {
            keysSeen.add(key);
            result.push(item);
        }
    });
    return result;
}
const CANCELLED = new Error('Cancelled');
function throwIfCancelled(isCancelled) {
    if (isCancelled()) {
        throw CANCELLED;
    }
}

/** Maximum size of a batch on the rpc provider. */
const DEFAULT_MAX_REQUEST_BATCH_SIZE = 100;
/** Timeout interval before the pending batch is sent. */
const DEFAULT_REQUEST_BATCH_DELAY_MS = 10;
/**
 * Internal class to enqueue requests and automatically send/process batches.
 *
 * The underlying batching mechanism is loosely based on ethers.js's
 * `JsonRpcBatchProvider`.
 *
 * @internal
 */
class RequestBatcher {
    constructor(sendBatchFn, maxBatchSize = DEFAULT_MAX_REQUEST_BATCH_SIZE) {
        this.sendBatchFn = sendBatchFn;
        this.maxBatchSize = maxBatchSize;
        /**
         * Array of enqueued requests along with the constructed promise handlers for
         * each request.
         */
        this.pendingBatch = [];
    }
    /**
     * Enqueues the provided request. The batch is immediately sent if the maximum
     * batch size is reached. Otherwise, the request is enqueued onto a batch that
     * is sent after 10ms.
     *
     * Returns a promise that resolves with the result of the request.
     */
    enqueueRequest(request) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const inflightRequest = {
                request,
                resolve: undefined,
                reject: undefined
            };
            const promise = new Promise((resolve, reject) => {
                inflightRequest.resolve = resolve;
                inflightRequest.reject = reject;
            });
            this.pendingBatch.push(inflightRequest);
            if (this.pendingBatch.length === this.maxBatchSize) {
                // Send batch immediately if we are at the maximum batch size.
                void this.sendBatchRequest();
            }
            else if (!this.pendingBatchTimer) {
                // Schedule batch for next event loop + short duration
                this.pendingBatchTimer = setTimeout(() => this.sendBatchRequest(), DEFAULT_REQUEST_BATCH_DELAY_MS);
            }
            return promise;
        });
    }
    /**
     * Sends the currently queued batches and resets the batch and timer. Processes
     * the batched response results back to the original promises.
     */
    sendBatchRequest() {
        return __awaiter$1(this, void 0, void 0, function* () {
            // Get the current batch and clear it, so new requests
            // go into the next batch
            const batch = this.pendingBatch;
            this.pendingBatch = [];
            if (this.pendingBatchTimer) {
                clearTimeout(this.pendingBatchTimer);
                this.pendingBatchTimer = undefined;
            }
            // Get the request as an array of requests
            const request = batch.map(inflight => inflight.request);
            return this.sendBatchFn(request).then(result => {
                // For each result, feed it to the correct Promise, depending
                // on whether it was a success or error
                batch.forEach((inflightRequest, index) => {
                    const payload = result[index];
                    if (payload.error) {
                        const error = new Error(payload.error.message);
                        error.code = payload.error.code;
                        error.data = payload.error.data;
                        inflightRequest.reject(error);
                    }
                    else {
                        inflightRequest.resolve(payload.result);
                    }
                });
            }, error => {
                batch.forEach(inflightRequest => {
                    inflightRequest.reject(error);
                });
            });
        });
    }
}

/**
 * SDK's custom implementation of ethers.js's 'AlchemyProvider'.
 *
 * Do not call this constructor directly. Instead, instantiate an instance of
 * {@link Alchemy} and call {@link Alchemy.config.getProvider()}.
 *
 * @public
 */
class AlchemyProvider extends providers.JsonRpcProvider {
    /** @internal */
    constructor(config) {
        // Normalize the API Key to a string.
        const apiKey = AlchemyProvider.getApiKey(config.apiKey);
        // Generate our own connection info with the correct endpoint URLs.
        const alchemyNetwork = AlchemyProvider.getAlchemyNetwork(config.network);
        const connection = AlchemyProvider.getAlchemyConnectionInfo(alchemyNetwork, apiKey, 'http');
        // If a hardcoded url was specified in the config, use that instead of the
        // provided apiKey or network.
        if (config.url !== undefined) {
            connection.url = config.url;
        }
        connection.throttleLimit = config.maxRetries;
        // Normalize the Alchemy named network input to the network names used by
        // ethers. This allows the parent super constructor in JsonRpcProvider to
        // correctly set the network.
        const ethersNetwork = EthersNetwork[alchemyNetwork];
        super(connection, ethersNetwork);
        this.apiKey = config.apiKey;
        this.maxRetries = config.maxRetries;
        this.batchRequests = config.batchRequests;
        // TODO: support individual headers when calling batch
        const batcherConnection = Object.assign(Object.assign({}, this.connection), { headers: Object.assign(Object.assign({}, this.connection.headers), { 'Alchemy-Ethers-Sdk-Method': 'batchSend' }) });
        const sendBatchFn = (requests) => {
            return web.fetchJson(batcherConnection, JSON.stringify(requests));
        };
        this.batcher = new RequestBatcher(sendBatchFn);
        this.modifyFormatter();
    }
    /**
     * Overrides the `UrlJsonRpcProvider.getApiKey` method as implemented by
     * ethers.js. Returns the API key for an Alchemy provider.
     *
     * @internal
     * @override
     */
    static getApiKey(apiKey) {
        if (apiKey == null) {
            return DEFAULT_ALCHEMY_API_KEY;
        }
        if (apiKey && typeof apiKey !== 'string') {
            throw new Error(`Invalid apiKey '${apiKey}' provided. apiKey must be a string.`);
        }
        return apiKey;
    }
    /**
     * Overrides the `BaseProvider.getNetwork` method as implemented by ethers.js.
     *
     * This override allows the SDK to set the provider's network to values not
     * yet supported by ethers.js.
     *
     * @internal
     * @override
     */
    static getNetwork(network) {
        if (typeof network === 'string' && network in CustomNetworks) {
            return CustomNetworks[network];
        }
        // Call the standard ethers.js getNetwork method for other networks.
        return networks.getNetwork(network);
    }
    /**
     * Converts the `Networkish` input to the network enum used by Alchemy.
     *
     * @internal
     */
    static getAlchemyNetwork(network) {
        if (network === undefined) {
            return DEFAULT_NETWORK;
        }
        if (typeof network === 'number') {
            throw new Error(`Invalid network '${network}' provided. Network must be a string.`);
        }
        // Guaranteed that `typeof network === 'string`.
        const isValidNetwork = Object.values(exports.Network).includes(network);
        if (!isValidNetwork) {
            throw new Error(`Invalid network '${network}' provided. Network must be one of: ` +
                `${Object.values(exports.Network).join(', ')}.`);
        }
        return network;
    }
    /**
     * Returns a {@link ConnectionInfo} object compatible with ethers that contains
     * the correct URLs for Alchemy.
     *
     * @internal
     */
    static getAlchemyConnectionInfo(network, apiKey, type) {
        const url = type === 'http'
            ? getAlchemyHttpUrl(network, apiKey)
            : getAlchemyWsUrl(network, apiKey);
        return {
            headers: IS_BROWSER
                ? {
                    'Alchemy-Ethers-Sdk-Version': VERSION
                }
                : {
                    'Alchemy-Ethers-Sdk-Version': VERSION,
                    'Accept-Encoding': 'gzip'
                },
            allowGzip: true,
            url
        };
    }
    /**
     * Overrides the method in ethers.js's `StaticJsonRpcProvider` class. This
     * method is called when calling methods on the parent class `BaseProvider`.
     *
     * @override
     */
    detectNetwork() {
        const _super = Object.create(null, {
            detectNetwork: { get: () => super.detectNetwork }
        });
        return __awaiter$1(this, void 0, void 0, function* () {
            let network = this.network;
            if (network == null) {
                network = yield _super.detectNetwork.call(this);
                if (!network) {
                    throw new Error('No network detected');
                }
            }
            return network;
        });
    }
    _startPending() {
        logWarn('WARNING: Alchemy Provider does not support pending filters');
    }
    /**
     * Overrides the ether's `isCommunityResource()` method. Returns true if the
     * current api key is the default key.
     *
     * @override
     */
    isCommunityResource() {
        return this.apiKey === DEFAULT_ALCHEMY_API_KEY;
    }
    /**
     * Overrides the base {@link JsonRpcProvider.send} method to implement custom
     * logic for sending requests to Alchemy.
     *
     * @param method The method name to use for the request.
     * @param params The parameters to use for the request.
     * @override
     * @public
     */
    // TODO: Add headers for `perform()` override.
    send(method, params) {
        return this._send(method, params, 'send');
    }
    /**
     * DO NOT MODIFY.
     *
     * Original code copied over from ether.js's `JsonRpcProvider.send()`.
     *
     * This method is copied over directly in order to implement custom headers
     *
     * @internal
     */
    _send(method, params, methodName, forceBatch = false) {
        const request = {
            method,
            params,
            id: this._nextId++,
            jsonrpc: '2.0'
        };
        // START MODIFIED CODE
        const connection = Object.assign({}, this.connection);
        connection.headers['Alchemy-Ethers-Sdk-Method'] = methodName;
        if (this.batchRequests || forceBatch) {
            return this.batcher.enqueueRequest(request);
        }
        // END MODIFIED CODE
        this.emit('debug', {
            action: 'request',
            request: deepCopy(request),
            provider: this
        });
        // We can expand this in the future to any call, but for now these
        // are the biggest wins and do not require any serializing parameters.
        const cache = ['eth_chainId', 'eth_blockNumber'].indexOf(method) >= 0;
        if (cache && this._cache[method]) {
            return this._cache[method];
        }
        const result = web.fetchJson(this.connection, JSON.stringify(request), getResult).then(result => {
            this.emit('debug', {
                action: 'response',
                request,
                response: result,
                provider: this
            });
            return result;
        }, error => {
            this.emit('debug', {
                action: 'response',
                error,
                request,
                provider: this
            });
            throw error;
        });
        // Cache the fetch, but clear it on the next event loop
        if (cache) {
            this._cache[method] = result;
            setTimeout(() => {
                // @ts-ignore - This is done by ethers.
                this._cache[method] = null;
            }, 0);
        }
        return result;
    }
    /**
     * Overrides the base `Formatter` class inherited from ethers to support
     * returning custom fields in Ethers response types.
     *
     * For context, ethers has a `Formatter` class that is used to format the
     * response from a JSON-RPC request. Any fields that are not defined in the
     * `Formatter` class are removed from the returned response. By modifying the
     * `Formatter` class in this method, we can add support for fields that are
     * not defined in ethers.
     */
    modifyFormatter() {
        this.formatter.formats['receiptLog']['removed'] = val => {
            if (typeof val === 'boolean') {
                return val;
            }
            return undefined;
        };
    }
}
/**
 * DO NOT MODIFY.
 *
 * Original code copied over from ether.js's
 * `@ethersproject/web/src.ts/index.ts`. Used to support
 * {@link AlchemyProvider._send}, which is also copied over.
 */
function getResult(payload) {
    if (payload.error) {
        const error = new Error(payload.error.message);
        error.code = payload.error.code;
        error.data = payload.error.data;
        throw error;
    }
    return payload.result;
}

var alchemyProvider = /*#__PURE__*/Object.freeze({
  __proto__: null,
  AlchemyProvider: AlchemyProvider
});

const HEARTBEAT_INTERVAL = 30000;
const HEARTBEAT_WAIT_TIME = 10000;
const BACKFILL_TIMEOUT = 60000;
const BACKFILL_RETRIES = 5;
/**
 * Subscriptions have a memory of recent events they have sent so that in the
 * event that they disconnect and need to backfill, they can detect re-orgs.
 * Keep a buffer that goes back at least these many blocks, the maximum amount
 * at which we might conceivably see a re-org.
 *
 * Note that while our buffer goes back this many blocks, it may contain more
 * than this many elements, since in the case of logs subscriptions more than
 * one event may be emitted for a block.
 */
const RETAINED_EVENT_BLOCK_COUNT = 10;
/**
 * SDK's custom implementation fo the ethers.js's 'AlchemyWebSocketProvider'.
 *
 * Do not call this constructor directly. Instead, instantiate an instance of
 * {@link Alchemy} and call {@link Alchemy.config.getWebSocketProvider()}.
 *
 * @public
 */
class AlchemyWebSocketProvider extends providers.WebSocketProvider {
    /** @internal */
    constructor(config, wsConstructor) {
        var _a;
        // Normalize the API Key to a string.
        const apiKey = AlchemyProvider.getApiKey(config.apiKey);
        // Generate our own connection info with the correct endpoint URLs.
        const alchemyNetwork = AlchemyProvider.getAlchemyNetwork(config.network);
        const connection = AlchemyProvider.getAlchemyConnectionInfo(alchemyNetwork, apiKey, 'wss');
        const protocol = `alchemy-sdk-${VERSION}`;
        // Use the provided config URL override if it exists, otherwise use the created one.
        const ws = new SturdyWebSocket__default["default"]((_a = config.url) !== null && _a !== void 0 ? _a : connection.url, protocol, {
            wsConstructor: wsConstructor !== null && wsConstructor !== void 0 ? wsConstructor : getWebsocketConstructor()
        });
        // Normalize the Alchemy named network input to the network names used by
        // ethers. This allows the parent super constructor in JsonRpcProvider to
        // correctly set the network.
        const ethersNetwork = EthersNetwork[alchemyNetwork];
        super(ws, ethersNetwork);
        this._events = [];
        // In the case of a WebSocket reconnection, all subscriptions are lost and we
        // create new ones to replace them, but we want to create the illusion that
        // the original subscriptions persist. Thus, maintain a mapping from the
        // "virtual" subscription ids which are visible to the consumer to the
        // "physical" subscription ids of the actual connections. This terminology is
        // borrowed from virtual and physical memory, which has a similar mapping.
        /** @internal */
        this.virtualSubscriptionsById = new Map();
        /** @internal */
        this.virtualIdsByPhysicalId = new Map();
        /**
         * The underlying ethers {@link WebSocketProvider} already handles and emits
         * messages. To allow backfilling, track all messages that are emitted.
         *
         * This is a field arrow function in order to preserve `this` context when
         * passing the method as an event listener.
         *
         * @internal
         */
        this.handleMessage = (event) => {
            const message = JSON.parse(event.data);
            if (!isSubscriptionEvent(message)) {
                return;
            }
            const physicalId = message.params.subscription;
            const virtualId = this.virtualIdsByPhysicalId.get(physicalId);
            if (!virtualId) {
                return;
            }
            const subscription = this.virtualSubscriptionsById.get(virtualId);
            if (subscription.method !== 'eth_subscribe') {
                return;
            }
            switch (subscription.params[0]) {
                case 'newHeads': {
                    const newHeadsSubscription = subscription;
                    const newHeadsMessage = message;
                    const { isBackfilling, backfillBuffer } = newHeadsSubscription;
                    const { result } = newHeadsMessage.params;
                    if (isBackfilling) {
                        addToNewHeadsEventsBuffer(backfillBuffer, result);
                    }
                    else if (physicalId !== virtualId) {
                        // In the case of a re-opened subscription, ethers will not emit the
                        // event, so the SDK has to.
                        this.emitAndRememberEvent(virtualId, result, getNewHeadsBlockNumber);
                    }
                    else {
                        // Ethers subscription mapping will emit the event, just store it.
                        this.rememberEvent(virtualId, result, getNewHeadsBlockNumber);
                    }
                    break;
                }
                case 'logs': {
                    const logsSubscription = subscription;
                    const logsMessage = message;
                    const { isBackfilling, backfillBuffer } = logsSubscription;
                    const { result } = logsMessage.params;
                    if (isBackfilling) {
                        addToLogsEventsBuffer(backfillBuffer, result);
                    }
                    else if (virtualId !== physicalId) {
                        this.emitAndRememberEvent(virtualId, result, getLogsBlockNumber);
                    }
                    else {
                        this.rememberEvent(virtualId, result, getLogsBlockNumber);
                    }
                    break;
                }
                default:
                    if (physicalId !== virtualId) {
                        // In the case of a re-opened subscription, ethers will not emit the
                        // event, so the SDK has to.
                        const { result } = message.params;
                        this.emitEvent(virtualId, result);
                    }
            }
        };
        /**
         * When the websocket connection reopens:
         *
         * 1. Resubscribe to all existing subscriptions and start backfilling
         * 2. Restart heart beat.
         *
         * This is a field arrow function in order to preserve `this` context when
         * passing the method as an event listener.
         *
         * @internal
         */
        this.handleReopen = () => {
            this.virtualIdsByPhysicalId.clear();
            const { cancel, isCancelled } = makeCancelToken();
            this.cancelBackfill = cancel;
            for (const subscription of this.virtualSubscriptionsById.values()) {
                void (() => __awaiter$1(this, void 0, void 0, function* () {
                    try {
                        yield this.resubscribeAndBackfill(isCancelled, subscription);
                    }
                    catch (error) {
                        if (!isCancelled()) {
                            console.error(`Error while backfilling "${subscription.params[0]}" subscription. Some events may be missing.`, error);
                        }
                    }
                }))();
            }
            this.startHeartbeat();
        };
        /**
         * Cancels the heartbeat and any pending backfills being performed. This is
         * called when the websocket connection goes down or is disconnected.
         *
         * This is a field arrow function in order to preserve `this` context when
         * passing the method as an event listener.
         *
         * @internal
         */
        this.stopHeartbeatAndBackfill = () => {
            if (this.heartbeatIntervalId != null) {
                clearInterval(this.heartbeatIntervalId);
                this.heartbeatIntervalId = undefined;
            }
            this.cancelBackfill();
        };
        this.apiKey = apiKey;
        // Start heartbeat and backfiller for the websocket connection.
        this.backfiller = new WebsocketBackfiller(this);
        this.addSocketListeners();
        this.startHeartbeat();
        this.cancelBackfill = noop;
    }
    /**
     * Overrides the `BaseProvider.getNetwork` method as implemented by ethers.js.
     *
     * This override allows the SDK to set the provider's network to values not
     * yet supported by ethers.js.
     *
     * @internal
     * @override
     */
    static getNetwork(network) {
        if (typeof network === 'string' && network in CustomNetworks) {
            return CustomNetworks[network];
        }
        // Call the standard ethers.js getNetwork method for other networks.
        return networks.getNetwork(network);
    }
    /**
     * Overridden implementation of ethers that includes Alchemy based subscriptions.
     *
     * @param eventName Event to subscribe to
     * @param listener The listener function to call when the event is triggered.
     * @override
     * @public
     */
    // TODO: Override `Listener` type to get type autocompletions.
    on(eventName, listener) {
        return this._addEventListener(eventName, listener, false);
    }
    /**
     * Overridden implementation of ethers that includes Alchemy based
     * subscriptions. Adds a listener to the triggered for only the next
     * {@link eventName} event, after which it will be removed.
     *
     * @param eventName Event to subscribe to
     * @param listener The listener function to call when the event is triggered.
     * @override
     * @public
     */
    // TODO: Override `Listener` type to get type autocompletions.
    once(eventName, listener) {
        return this._addEventListener(eventName, listener, true);
    }
    /**
     * Removes the provided {@link listener} for the {@link eventName} event. If no
     * listener is provided, all listeners for the event will be removed.
     *
     * @param eventName Event to unlisten to.
     * @param listener The listener function to remove.
     * @override
     * @public
     */
    off(eventName, listener) {
        if (isAlchemyEvent(eventName)) {
            return this._off(eventName, listener);
        }
        else {
            return super.off(eventName, listener);
        }
    }
    /**
     * Remove all listeners for the provided {@link eventName} event. If no event
     * is provided, all events and their listeners are removed.
     *
     * @param eventName The event to remove all listeners for.
     * @override
     * @public
     */
    removeAllListeners(eventName) {
        if (eventName !== undefined && isAlchemyEvent(eventName)) {
            return this._removeAllListeners(eventName);
        }
        else {
            return super.removeAllListeners(eventName);
        }
    }
    /**
     * Returns the number of listeners for the provided {@link eventName} event. If
     * no event is provided, the total number of listeners for all events is returned.
     *
     * @param eventName The event to get the number of listeners for.
     * @public
     * @override
     */
    listenerCount(eventName) {
        if (eventName !== undefined && isAlchemyEvent(eventName)) {
            return this._listenerCount(eventName);
        }
        else {
            return super.listenerCount(eventName);
        }
    }
    /**
     * Returns an array of listeners for the provided {@link eventName} event. If
     * no event is provided, all listeners will be included.
     *
     * @param eventName The event to get the listeners for.
     * @public
     * @override
     */
    listeners(eventName) {
        if (eventName !== undefined && isAlchemyEvent(eventName)) {
            return this._listeners(eventName);
        }
        else {
            return super.listeners(eventName);
        }
    }
    /**
     * Overrides the method in `BaseProvider` in order to properly format the
     * Alchemy subscription events.
     *
     * @internal
     * @override
     */
    _addEventListener(eventName, listener, once) {
        if (isAlchemyEvent(eventName)) {
            verifyAlchemyEventName(eventName);
            const event = new EthersEvent(getAlchemyEventTag(eventName), listener, once);
            this._events.push(event);
            this._startEvent(event);
            return this;
        }
        else {
            return super._addEventListener(eventName, listener, once);
        }
    }
    /**
     * Overrides the `_startEvent()` method in ethers.js's
     * {@link WebSocketProvider} to include additional alchemy methods.
     *
     * @param event
     * @override
     * @internal
     */
    _startEvent(event) {
        // Check if the event type is a custom Alchemy subscription.
        const customLogicTypes = [...ALCHEMY_EVENT_TYPES, 'block', 'filter'];
        if (customLogicTypes.includes(event.type)) {
            this.customStartEvent(event);
        }
        else {
            super._startEvent(event);
        }
    }
    /**
     * Overridden from ethers.js's {@link WebSocketProvider}
     *
     * Modified in order to add mappings for backfilling.
     *
     * @internal
     * @override
     */
    _subscribe(tag, param, processFunc, event) {
        return __awaiter$1(this, void 0, void 0, function* () {
            let subIdPromise = this._subIds[tag];
            // BEGIN MODIFIED CODE
            const startingBlockNumber = yield this.getBlockNumber();
            // END MODIFIED CODE
            if (subIdPromise == null) {
                subIdPromise = Promise.all(param).then(param => {
                    return this.send('eth_subscribe', param);
                });
                this._subIds[tag] = subIdPromise;
            }
            const subId = yield subIdPromise;
            // BEGIN MODIFIED CODE
            const resolvedParams = yield Promise.all(param);
            this.virtualSubscriptionsById.set(subId, {
                event: event,
                method: 'eth_subscribe',
                params: resolvedParams,
                startingBlockNumber,
                virtualId: subId,
                physicalId: subId,
                sentEvents: [],
                isBackfilling: false,
                backfillBuffer: []
            });
            this.virtualIdsByPhysicalId.set(subId, subId);
            // END MODIFIED CODE
            this._subs[subId] = { tag, processFunc };
        });
    }
    /**
     * DO NOT MODIFY.
     *
     * Original code copied over from ether.js's `BaseProvider`.
     *
     * This method is copied over directly in order to implement Alchemy's unique
     * subscription types. The only difference is that this method calls
     * {@link getAlchemyEventTag} instead of the original `getEventTag()` method in
     * order to parse the Alchemy subscription event.
     *
     * @internal
     * @override
     */
    emit(eventName, ...args) {
        if (isAlchemyEvent(eventName)) {
            let result = false;
            const stopped = [];
            // This line is the only modified line from the original method.
            const eventTag = getAlchemyEventTag(eventName);
            this._events = this._events.filter(event => {
                if (event.tag !== eventTag) {
                    return true;
                }
                setTimeout(() => {
                    event.listener.apply(this, args);
                }, 0);
                result = true;
                if (event.once) {
                    stopped.push(event);
                    return false;
                }
                return true;
            });
            stopped.forEach(event => {
                this._stopEvent(event);
            });
            return result;
        }
        else {
            return super.emit(eventName, ...args);
        }
    }
    /** @internal */
    sendBatch(parts) {
        return __awaiter$1(this, void 0, void 0, function* () {
            let nextId = 0;
            const payload = parts.map(({ method, params }) => {
                return {
                    method,
                    params,
                    jsonrpc: '2.0',
                    id: `alchemy-sdk:${nextId++}`
                };
            });
            return this.sendBatchConcurrently(payload);
        });
    }
    /** @override */
    destroy() {
        this.removeSocketListeners();
        this.stopHeartbeatAndBackfill();
        return super.destroy();
    }
    /**
     * Overrides the ether's `isCommunityResource()` method. Returns true if the
     * current api key is the default key.
     *
     * @override
     */
    isCommunityResource() {
        return this.apiKey === DEFAULT_ALCHEMY_API_KEY;
    }
    /**
     * DO NOT MODIFY.
     *
     * Original code copied over from ether.js's `WebSocketProvider._stopEvent()`.
     *
     * This method is copied over directly in order to support Alchemy's
     * subscription type by allowing the provider to properly stop Alchemy's
     * subscription events.
     *
     * @internal
     */
    _stopEvent(event) {
        let tag = event.tag;
        // START MODIFIED CODE
        if (ALCHEMY_EVENT_TYPES.includes(event.type)) {
            // There are remaining pending transaction listeners.
            if (this._events.filter(e => ALCHEMY_EVENT_TYPES.includes(e.type)).length) {
                return;
            }
            // END MODIFIED CODE
        }
        else if (event.type === 'tx') {
            // There are remaining transaction event listeners
            if (this._events.filter(e => e.type === 'tx').length) {
                return;
            }
            tag = 'tx';
        }
        else if (this.listenerCount(event.event)) {
            // There are remaining event listeners
            return;
        }
        const subId = this._subIds[tag];
        if (!subId) {
            return;
        }
        delete this._subIds[tag];
        void subId.then(subId => {
            if (!this._subs[subId]) {
                return;
            }
            delete this._subs[subId];
            void this.send('eth_unsubscribe', [subId]);
        });
    }
    /** @internal */
    addSocketListeners() {
        this._websocket.addEventListener('message', this.handleMessage);
        this._websocket.addEventListener('reopen', this.handleReopen);
        this._websocket.addEventListener('down', this.stopHeartbeatAndBackfill);
    }
    /** @internal */
    removeSocketListeners() {
        this._websocket.removeEventListener('message', this.handleMessage);
        this._websocket.removeEventListener('reopen', this.handleReopen);
        this._websocket.removeEventListener('down', this.stopHeartbeatAndBackfill);
    }
    /**
     * Reopens the backfill based on
     *
     * @param isCancelled
     * @param subscription
     * @internal
     */
    resubscribeAndBackfill(isCancelled, subscription) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const { virtualId, method, params, sentEvents, backfillBuffer, startingBlockNumber } = subscription;
            subscription.isBackfilling = true;
            backfillBuffer.length = 0;
            try {
                const physicalId = yield this.send(method, params);
                throwIfCancelled(isCancelled);
                subscription.physicalId = physicalId;
                this.virtualIdsByPhysicalId.set(physicalId, virtualId);
                switch (params[0]) {
                    case 'newHeads': {
                        const backfillEvents = yield withBackoffRetries(() => withTimeout(this.backfiller.getNewHeadsBackfill(isCancelled, sentEvents, startingBlockNumber), BACKFILL_TIMEOUT), BACKFILL_RETRIES, () => !isCancelled());
                        throwIfCancelled(isCancelled);
                        const events = dedupeNewHeads([...backfillEvents, ...backfillBuffer]);
                        events.forEach(event => this.emitNewHeadsEvent(virtualId, event));
                        break;
                    }
                    case 'logs': {
                        const filter = params[1] || {};
                        const backfillEvents = yield withBackoffRetries(() => withTimeout(this.backfiller.getLogsBackfill(isCancelled, filter, sentEvents, startingBlockNumber), BACKFILL_TIMEOUT), BACKFILL_RETRIES, () => !isCancelled());
                        throwIfCancelled(isCancelled);
                        const events = dedupeLogs([...backfillEvents, ...backfillBuffer]);
                        events.forEach(event => this.emitLogsEvent(virtualId, event));
                        break;
                    }
                    default:
                        break;
                }
            }
            finally {
                subscription.isBackfilling = false;
                backfillBuffer.length = 0;
            }
        });
    }
    /** @internal */
    emitNewHeadsEvent(virtualId, result) {
        this.emitAndRememberEvent(virtualId, result, getNewHeadsBlockNumber);
    }
    /** @internal */
    emitLogsEvent(virtualId, result) {
        this.emitAndRememberEvent(virtualId, result, getLogsBlockNumber);
    }
    /**
     * Emits an event to consumers, but also remembers it in its subscriptions's
     * `sentEvents` buffer so that we can detect re-orgs if the connection drops
     * and needs to be reconnected.
     *
     * @internal
     */
    emitAndRememberEvent(virtualId, result, getBlockNumber) {
        this.rememberEvent(virtualId, result, getBlockNumber);
        this.emitEvent(virtualId, result);
    }
    emitEvent(virtualId, result) {
        const subscription = this.virtualSubscriptionsById.get(virtualId);
        if (!subscription) {
            return;
        }
        this.emitGenericEvent(subscription, result);
    }
    /** @internal */
    rememberEvent(virtualId, result, getBlockNumber) {
        const subscription = this.virtualSubscriptionsById.get(virtualId);
        if (!subscription) {
            return;
        }
        // Web3 modifies these event objects once we pass them on (changing hex
        // numbers to numbers). We want the original event, so make a defensive
        // copy.
        addToPastEventsBuffer(subscription.sentEvents, Object.assign({}, result), getBlockNumber);
    }
    /** @internal */
    emitGenericEvent(subscription, result) {
        const emitFunction = this.emitProcessFn(subscription.event);
        emitFunction(result);
    }
    /**
     * Starts a heartbeat that pings the websocket server periodically to ensure
     * that the connection stays open.
     *
     * @internal
     */
    startHeartbeat() {
        if (this.heartbeatIntervalId != null) {
            return;
        }
        this.heartbeatIntervalId = setInterval(() => __awaiter$1(this, void 0, void 0, function* () {
            try {
                yield withTimeout(this.send('net_version'), HEARTBEAT_WAIT_TIME);
            }
            catch (_a) {
                this._websocket.reconnect();
            }
        }), HEARTBEAT_INTERVAL);
    }
    /**
     * This method sends the batch concurrently as individual requests rather than
     * as a batch, which was the original implementation. The original batch logic
     * is preserved in this implementation in order for faster porting.
     *
     * @param payload
     * @internal
     */
    // TODO(cleanup): Refactor and remove usages of `sendBatch()`.
    // TODO(errors): Use allSettled() once we have more error handling.
    sendBatchConcurrently(payload) {
        return __awaiter$1(this, void 0, void 0, function* () {
            return Promise.all(payload.map(req => this.send(req.method, req.params)));
        });
    }
    /** @internal */
    customStartEvent(event) {
        if (event.type === ALCHEMY_PENDING_TRANSACTIONS_EVENT_TYPE) {
            const { fromAddress, toAddress, hashesOnly } = event;
            void this._subscribe(event.tag, [
                exports.AlchemySubscription.PENDING_TRANSACTIONS,
                { fromAddress, toAddress, hashesOnly }
            ], this.emitProcessFn(event), event);
        }
        else if (event.type === ALCHEMY_MINED_TRANSACTIONS_EVENT_TYPE) {
            const { addresses, includeRemoved, hashesOnly } = event;
            void this._subscribe(event.tag, [
                exports.AlchemySubscription.MINED_TRANSACTIONS,
                { addresses, includeRemoved, hashesOnly }
            ], this.emitProcessFn(event), event);
        }
        else if (event.type === 'block') {
            void this._subscribe('block', ['newHeads'], this.emitProcessFn(event), event);
        }
        else if (event.type === 'filter') {
            void this._subscribe(event.tag, ['logs', this._getFilter(event.filter)], this.emitProcessFn(event), event);
        }
    }
    /** @internal */
    emitProcessFn(event) {
        switch (event.type) {
            case ALCHEMY_PENDING_TRANSACTIONS_EVENT_TYPE:
                return result => this.emit({
                    method: exports.AlchemySubscription.PENDING_TRANSACTIONS,
                    fromAddress: event.fromAddress,
                    toAddress: event.toAddress,
                    hashesOnly: event.hashesOnly
                }, result);
            case ALCHEMY_MINED_TRANSACTIONS_EVENT_TYPE:
                return result => this.emit({
                    method: exports.AlchemySubscription.MINED_TRANSACTIONS,
                    addresses: event.addresses,
                    includeRemoved: event.includeRemoved,
                    hashesOnly: event.hashesOnly
                }, result);
            case 'block':
                return result => {
                    const blockNumber = bignumber.BigNumber.from(result.number).toNumber();
                    this._emitted.block = blockNumber;
                    this.emit('block', blockNumber);
                };
            case 'filter':
                return result => {
                    if (result.removed == null) {
                        result.removed = false;
                    }
                    this.emit(event.filter, this.formatter.filterLog(result));
                };
            default:
                throw new Error('Invalid event type to `emitProcessFn()`');
        }
    }
    /**
     * DO NOT MODIFY.
     *
     * Original code copied over from ether.js's `BaseProvider.off()`.
     *
     * This method is copied over directly in order to implement Alchemy's unique
     * subscription types. The only difference is that this method calls
     * {@link getAlchemyEventTag} instead of the original `getEventTag()` method in
     * order to parse the Alchemy subscription event.
     *
     * @private
     */
    _off(eventName, listener) {
        if (listener == null) {
            return this.removeAllListeners(eventName);
        }
        const stopped = [];
        let found = false;
        const eventTag = getAlchemyEventTag(eventName);
        this._events = this._events.filter(event => {
            if (event.tag !== eventTag || event.listener != listener) {
                return true;
            }
            if (found) {
                return true;
            }
            found = true;
            stopped.push(event);
            return false;
        });
        stopped.forEach(event => {
            this._stopEvent(event);
        });
        return this;
    }
    /**
     * DO NOT MODIFY.
     *
     * Original code copied over from ether.js's `BaseProvider.removeAllListeners()`.
     *
     * This method is copied over directly in order to implement Alchemy's unique
     * subscription types. The only difference is that this method calls
     * {@link getAlchemyEventTag} instead of the original `getEventTag()` method in
     * order to parse the Alchemy subscription event.
     *
     * @private
     */
    _removeAllListeners(eventName) {
        let stopped = [];
        if (eventName == null) {
            stopped = this._events;
            this._events = [];
        }
        else {
            const eventTag = getAlchemyEventTag(eventName);
            this._events = this._events.filter(event => {
                if (event.tag !== eventTag) {
                    return true;
                }
                stopped.push(event);
                return false;
            });
        }
        stopped.forEach(event => {
            this._stopEvent(event);
        });
        return this;
    }
    /**
     * DO NOT MODIFY.
     *
     * Original code copied over from ether.js's `BaseProvider.listenerCount()`.
     *
     * This method is copied over directly in order to implement Alchemy's unique
     * subscription types. The only difference is that this method calls
     * {@link getAlchemyEventTag} instead of the original `getEventTag()` method in
     * order to parse the Alchemy subscription event.
     *
     * @private
     */
    _listenerCount(eventName) {
        if (!eventName) {
            return this._events.length;
        }
        const eventTag = getAlchemyEventTag(eventName);
        return this._events.filter(event => {
            return event.tag === eventTag;
        }).length;
    }
    /**
     * DO NOT MODIFY.
     *
     * Original code copied over from ether.js's `BaseProvider.listeners()`.
     *
     * This method is copied over directly in order to implement Alchemy's unique
     * subscription types. The only difference is that this method calls
     * {@link getAlchemyEventTag} instead of the original `getEventTag()` method in
     * order to parse the Alchemy subscription event.
     *
     * @private
     */
    _listeners(eventName) {
        if (eventName == null) {
            return this._events.map(event => event.listener);
        }
        const eventTag = getAlchemyEventTag(eventName);
        return this._events
            .filter(event => event.tag === eventTag)
            .map(event => event.listener);
    }
}
function getWebsocketConstructor() {
    return isNodeEnvironment() ? require('websocket').w3cwebsocket : WebSocket;
}
function isNodeEnvironment() {
    return (typeof process !== 'undefined' &&
        process != null &&
        process.versions != null &&
        process.versions.node != null);
}
// TODO(cleanup): Use class variable rather than passing `isCancelled` everywhere.
function makeCancelToken() {
    let cancelled = false;
    return { cancel: () => (cancelled = true), isCancelled: () => cancelled };
}
// TODO(cleanup): replace with SDK's backoff implementation
const MIN_RETRY_DELAY = 1000;
const RETRY_BACKOFF_FACTOR = 2;
const MAX_RETRY_DELAY = 30000;
function withBackoffRetries(f, retryCount, shouldRetry = () => true) {
    return __awaiter$1(this, void 0, void 0, function* () {
        let nextWaitTime = 0;
        let i = 0;
        while (true) {
            try {
                return yield f();
            }
            catch (error) {
                i++;
                if (i >= retryCount || !shouldRetry(error)) {
                    throw error;
                }
                yield delay(nextWaitTime);
                if (!shouldRetry(error)) {
                    throw error;
                }
                nextWaitTime =
                    nextWaitTime === 0
                        ? MIN_RETRY_DELAY
                        : Math.min(MAX_RETRY_DELAY, RETRY_BACKOFF_FACTOR * nextWaitTime);
            }
        }
    });
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function withTimeout(promise, ms) {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))
    ]);
}
function getNewHeadsBlockNumber(event) {
    return fromHex(event.number);
}
function getLogsBlockNumber(event) {
    return fromHex(event.blockNumber);
}
function isResponse(message) {
    return (Array.isArray(message) ||
        (message.jsonrpc === '2.0' && message.id !== undefined));
}
function isSubscriptionEvent(message) {
    return !isResponse(message);
}
function addToNewHeadsEventsBuffer(pastEvents, event) {
    addToPastEventsBuffer(pastEvents, event, getNewHeadsBlockNumber);
}
function addToLogsEventsBuffer(pastEvents, event) {
    addToPastEventsBuffer(pastEvents, event, getLogsBlockNumber);
}
/**
 * Adds a new event to an array of events, evicting any events which are so old
 * that they will no longer feasibly be part of a reorg.
 */
function addToPastEventsBuffer(pastEvents, event, getBlockNumber) {
    const currentBlockNumber = getBlockNumber(event);
    // Find first index of an event recent enough to retain, then drop everything
    // at a lower index.
    const firstGoodIndex = pastEvents.findIndex(e => getBlockNumber(e) > currentBlockNumber - RETAINED_EVENT_BLOCK_COUNT);
    if (firstGoodIndex === -1) {
        pastEvents.length = 0;
    }
    else {
        pastEvents.splice(0, firstGoodIndex);
    }
    pastEvents.push(event);
}

var alchemyWebsocketProvider = /*#__PURE__*/Object.freeze({
  __proto__: null,
  AlchemyWebSocketProvider: AlchemyWebSocketProvider
});

exports.Utils = utils__namespace;
Object.defineProperty(exports, 'BigNumber', {
  enumerable: true,
  get: function () { return bignumber.BigNumber; }
});
exports.Alchemy = Alchemy;
exports.AlchemyWebSocketProvider = AlchemyWebSocketProvider;
exports.Contract = Contract;
exports.ContractFactory = ContractFactory;
exports.Wallet = Wallet;
exports.fromHex = fromHex;
exports.isHex = isHex;
exports.setLogLevel = setLogLevel;
exports.toHex = toHex;
//# sourceMappingURL=index.js.map
