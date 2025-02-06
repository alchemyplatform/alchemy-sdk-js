const { Network, Alchemy } = require('alchemy-sdk');

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: '<import { JsonRpcProvider } from 'ethers';

// Connect to the Ethereum network
const provider = new JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/rS1ad-YbuD6vKG77ZwTmsaNGC19pmyyN");

// Get block by number
const blockNumber = "latest";
const block = await provider.getBlock(blockNumber);

console.log(block);>', // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);
