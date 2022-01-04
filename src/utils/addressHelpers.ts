import addresses from "config/constants/contracts";

const chainId = "56";

export const getCakeAddress = () => {
  return addresses.cake[chainId];
};
export const getMasterChefAddress = () => {
  return addresses.masterChef[chainId];
};
export const getPrevMasterChefAddress = () => {
  return addresses.masterChefV1[chainId];
};
export const getMulticallAddress = () => {
  return addresses.mulltiCall[chainId];
};
export const getWbnbAddress = () => {
  return addresses.wbnb[chainId];
};
export const getLotteryAddress = () => {
  return addresses.lottery[chainId];
};
export const getLotteryTicketAddress = () => {
  return addresses.lotteryNFT[chainId];
};
