curl --request POST \
     --url https://eth-mainnet.g.alchemy.com/v2/EXgZBFake5hBBJOcQ1Hojt7gGFVZU-1j \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "eth_getBlockByNumber",
  "params": [
	  "finalized",
	  false
  ]
}
'
