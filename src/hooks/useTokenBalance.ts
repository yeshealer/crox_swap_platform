import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import cakeABI from "config/abi/cake.json";
import { getContract } from "utils/web3";
import { getCakeAddress, getMasterChefAddress } from "utils/addressHelpers";

import useRefresh from "./useRefresh";

export const useTotalSupply = () => {
    const { slowRefresh } = useRefresh();
    const [totalSupply, setTotalSupply] = useState<BigNumber>();
  
    useEffect(() => {
      async function fetchTotalSupply() {
        const cakeContract = getContract(cakeABI, getCakeAddress());
        const supply = await cakeContract.methods.totalSupply().call();
        setTotalSupply(new BigNumber(supply));
      }
  
      fetchTotalSupply();
    }, [slowRefresh]);
  
    return totalSupply;
};


export const useBurnedBalance = (tokenAddress: string) => {
    const [balance, setBalance] = useState(new BigNumber(0));
    const { slowRefresh } = useRefresh();
  
    useEffect(() => {
      const fetchBalance = async () => {
        const cakeContract = getContract(cakeABI, getCakeAddress());
        const bal = await cakeContract.methods
          .balanceOf("0x000000000000000000000000000000000000dEaD")
          .call();
        setBalance(new BigNumber(bal));
      };
  
      fetchBalance();
    }, [tokenAddress, slowRefresh]);
  
    return balance;
  };
  
//   export default useTokenBalance;