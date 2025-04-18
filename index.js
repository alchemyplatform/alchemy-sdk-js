const { Network, Alchemy } = require("alchemy-sdk");

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "rS1ad-YbuD6vKG77ZwTmsaNGC19pmyyN", // Replace with your Alchemy API Key.
  network: Network.OPT_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

async function main() {
  const latestBlock = await alchemy.core.getBlockNumber();
  console.log("The latest block number is", latestBlock);
}

main();
