curl https://arb-mainnet.g.alchemy.com/v2/Ax8DiiNUKIk42r9Sx1BMG5wQdz7OaBJL -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest", false],"id":0}'
import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: "Ax8DiiNUKIk42r9Sx1BMG5wQdz7OaBJL",
  network: Network.ARB_MAINNET,
};

const alchemy = new Alchemy(settings);

// get the latest block
const latestBlock = alchemy.core.getBlock("latest").then(console.log);
