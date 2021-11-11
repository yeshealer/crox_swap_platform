import { useEffect, useState } from 'react'
import Web3 from 'web3'

const web3 = new Web3("https://bsc-dataseed.binance.org/")

const useBlock = () => {
  const [block, setBlock] = useState(0);
  useEffect(() => {
    if (!web3) return undefined;

    const interval = setInterval(async () => {
      const latestBlockNumber = await web3.eth.getBlockNumber();
      if (block !== latestBlockNumber) {
        setBlock(latestBlockNumber);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [block]);

  return block;
}

export default useBlock;