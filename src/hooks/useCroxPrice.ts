import { useCallback, useEffect, useState } from "react";
import { abi } from "@uniswap/v2-core/build/IUniswapV2Pair.json";
import BigNumber from "bignumber.js";
import Web3 from "web3";
import useBlock from "./useBlock";

const ABI: any = abi;
const web3 = new Web3("https://bsc-dataseed.binance.org/");
const bnbBusdPairContract = new web3.eth.Contract(
    ABI,
    "0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16"
);
const bnbCroxPairContract = new web3.eth.Contract(
    ABI,
    "0xE38e899cc99ddeA9737e06f0A22046d0CA904D70"
);

const useCroxPrice = () => {
    const [price, setPrice] = useState(0);
    const block = useBlock();

    const fetchBalance = useCallback(async () => {
        try {
            const bnbObj = await bnbBusdPairContract.methods
                .getReserves()
                .call();
            if (!new BigNumber(bnbObj.reserve0).eq(new BigNumber(0))) {
                const bnbPrice = new BigNumber(bnbObj.reserve1).div(
                    bnbObj.reserve0
                );

                const croxObj = await bnbCroxPairContract.methods
                    .getReserves()
                    .call();
                const croxPrice = new BigNumber(croxObj.reserve1)
                    .div(croxObj.reserve0)
                    .times(bnbPrice);
                if (!croxPrice.isEqualTo(price)) {
                    setPrice(croxPrice.toNumber());
                }
            }
        } catch (e) {
            console.log(e);
        }
    }, [price]);

    useEffect(() => {
        if (bnbBusdPairContract && bnbCroxPairContract) {
            fetchBalance();
        }
    }, [setPrice, fetchBalance, block]);

    return price;
};

export default useCroxPrice;
