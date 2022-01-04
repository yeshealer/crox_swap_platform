/* eslint-disable */
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect, bsc } from "connectors";
import {
  Menu as UikitMenu,
  Button as UiKitButton,
  ConnectorId,
  useWalletModal,
  useMatchBreakpoints,
} from "crox-uikit2.0";
import Menu, {
  Button,
  Dropdown,
  Separator,
  DropdownItem,
} from "@kenshooui/react-menu";
import { RiMenu2Line } from "react-icons/ri";
import {
  Menu as MobileMenu,
  MenuItem,
  MenuButton,
  SubMenu,
} from "@szhsin/react-menu";
import styled from "styled-components";
import config from "./config";
import "@szhsin/react-menu/dist/index.css";
import SideBar from "./sidebar";
import useCroxPrice from "hooks/useCroxPrice";
import getRpcUrl from "utils/getRpcUrl";
import "./mobileMenu.css";


const StyledMenu = styled(Menu)`
  background-color: #121827;
  padding: 0px 10px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  z-index: 10;
`;

const StyledMobileMenu = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #121827;
  padding: 0px 10px;
  box-sizing: border-box;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 10;
`;

const StyledMenuItem = styled(MenuItem)`
  background: transparent;
  color: white;
  padding: 20px 20px;

  &:hover {
    background: #0498aec7;
  }
`;
const StyledSubMenu = styled(SubMenu)`
  background-color: #121827;
`;

const ConnectButton = styled(Button)`
  margin-left: 16px;
  padding: 9px 16px;
  background-color: #3B3C4E;
  color: white;
  font-size: 14px;
  border-radius: 20px;
  z-index: 1;
`

const StyledButton = styled(Button)`
  background-color: transparent;
  color: white;
  box-sizing: border-box;
  border-top: 5px solid transparent;
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
  font-size: 16px;
  font-weight: 100;
  &:hover {
    background-color: transparent;
    border-top: 5px solid #0498aec7;
  }
`;

const StyledDropDown = styled(Dropdown)`
  background-color: transparent;
  color: white;
  box-sizing: border-box;
  border-top: 5px solid transparent;
  box-sizing: border-box;
  padding: 0px 30px;
  font-size: 16px;
  font-weight: 100;
  &:hover {
    background-color: transparent;
    border-top: 5px solid #0498aec7;
  }
  & .itemContainer {
    background-color: #121827;
    border: none;
  }
`;


const StyledDropDownMenuItem = styled(Dropdown)`
  // background-color: transparent;
  color: white;
  box-sizing: border-box;
  // border-top: 5px solid transparent;
  box-sizing: border-box;
  padding: 0px 30px;
  font-size: 16px;
  font-weight: 100;

  background-color: #121827;
  border: none;
  padding: 30px 20px;
  &:hover {
  //   background-color: transparent;
  // border-top: 5px solid #0498aec7;
  }
  & .itemContainer {
    background-color: #121827;
  border: none;
`;

const SwitchNetButton = styled(Button)`
  margin: 0 24px;
  padding: 0;
  align-items: center;
  display: flex;
  background-color: #2C2D3A;
  color: white;
  border-radius: 20px;
  font-size: 14px;
  img {
    margin-left: 4px;
  }
  z-index: 0;
`

const NetworkMenu = styled(Menu)`
  width: 30px;
  background-color: #2c2d3a;
  top: 0;
  & .networkDropDown {
    padding: 0 5px;
  }
  & svg {
    display: none;
  }
`

const StyledDropDownNetwork = styled(Dropdown)`
  background-color: transparent;
  color: white;
  box-sizing: border-box;
  border-top: none;
  box-sizing: border-box;
  padding: 0px 30px;
  font-size: 14px;
  font-weight: 100;
  &:hover {
    background-color: transparent;
    border-top: none;
  }
  & .itemContainer {
    margin-left: -25px;
    margin-top: 10px;
    background-color:  #23242F;
    border: none;
    border-radius: 8px;
  }
  `

const StyledDropDownGroup = styled.div`
  padding: 8px 0;
  background-color: #23242F;
  border-radius: 8px;
  & .swap {
    padding: 16px;
    display: flex;
  }
  & .liquidity {
    padding: 16px;
    display: flex;
  }
`

const StyledDropDownItem = styled(DropdownItem)`
  background-color:  #23242F;
  width: 250px;
  border: none;
  padding: 30px 20px;
  &:hover {
    background-color: #2C2D3A;;
    .changeText {
      color: #0177FB;
    }
  }
  `

const StyledDropDownNetworkItem = styled(DropdownItem)`
  background-color:  #23242F;
  width: 187px;
  border: none;
  padding: 30px 20px;
  &:hover {
    background-color: #2C2D3A;;
    .changeText {
      color: #0177FB;
    }
  }
  `

let IsConnectConfirm = false;

const Header = (props) => {
  const { account, activate, deactivate, error, active } = useWeb3React();

  const handleLogin = (connectorId: ConnectorId) => {
      IsConnectConfirm = true;
    if (connectorId === "walletconnect") {
      return activate(walletconnect);
    }
    if (connectorId === "bsc") {
      return activate(bsc);
    }
    return activate(injected);
  };

  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(
    handleLogin,
    deactivate,
    account as string
  );
  const { isMd, isSm, isXs, isLg } = useMatchBreakpoints();
  const croxPrice = useCroxPrice();

  useEffect(() => {
    if(!active && IsConnectConfirm){
        if (error && error.name === "UnsupportedChainIdError") {
            const { ethereum } = window as any;
            (async () => {
                try {
                await ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: "0x38" }],
                });
                } catch (switchError: any) {
                if (switchError.code === 4902) {
                    try {
                      await ethereum.request({
                          method: "wallet_addEthereumChain",
                          params: [
                          {
                              chainId: "0x38",
                              chainName: "Binance Smart Chain",
                              nativeCurrency: {
                              name: "BNB",
                              symbol: "BNB",
                              decimals: 18,
                              },
                              rpcUrls: [getRpcUrl()],
                              blockExplorerUrls: ["https://bscscan.com/"],
                          },
                          ],
                      });
                    } catch (addError: any) {
                      console.log("++++++++")
                    console.error(addError);
                    }
                }
                }
                activate(injected);
            })();
        }
    }

    IsConnectConfirm = false;
  }, [error]);

  return (
    <>
      {!isMd && !isSm && !isXs && !isLg ? (
        <StyledMenu className="menu">
          <img
            src="/logo1.png"
            width="120px"
            alt="logo1"
            style={{ margin: "8px 14px", marginRight: "20px" }}
          />
          <StyledButton className="button">
            <a href="https://app.croxswap.com">Home</a>
          </StyledButton>
          <StyledDropDown
            label="Trade"
            className="dropdown itemContainer"
            itemsClassName="itemContainer"
          >
            <StyledDropDownItem className="menu-item">
              <a href="/#/swap">Swap</a>
            </StyledDropDownItem>
            <StyledDropDownItem className="menu-item">
              <a href="/#/pool">Liquidity</a>
            </StyledDropDownItem>
          </StyledDropDown>
          <StyledButton className="button">
            <a href="https://app.croxswap.com/farms/">Farms</a>
          </StyledButton>
          <StyledButton className="button">
            <a href="https://app.croxswap.com/pools/crox">Pools</a>
          </StyledButton>
          <StyledButton className="button">
            <a href="https://bridge.croxswap.com">Bridge(Soon)</a>
          </StyledButton>
          <StyledButton className="button">
            <a href="https://referral.croxswap.com">Referral</a>
          </StyledButton>

          <Separator />


          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                color: "white",
                padding: "10px",
                background: "#253253",
                marginRight: "20px",
                borderRadius: "8px",
              }}
            >
              $CROX: ${croxPrice.toFixed(3)}
            </span>
            {!account ? (
              <UiKitButton onClick={onPresentConnectModal}>Connect</UiKitButton>
            ) : (
              <UiKitButton onClick={onPresentAccountModal}>
                {account.slice(0, 5)}...{account.slice(-5)}
              </UiKitButton>
            )}
          </div>
        </StyledMenu>
      ) : (
        <StyledMobileMenu>
          <div style={{ display: "flex", alignItems: "center" }}>
             <div id="App">
              <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
            </div>
            <img
              src="/logo1.png"
              width="120px"
              alt="logo1"
              style={{ margin: "8px 14px", marginRight: "80px" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            {/* <span style={{ color: "white", padding: "10px", background: "#253253", marginRight: "20px", borderRadius: '8px' }}>$CROX: $20.62</span> */}
            {!account ? (
              <UiKitButton onClick={onPresentConnectModal}>Connect</UiKitButton>
            ) : (
              <UiKitButton onClick={onPresentAccountModal}>
                {account.slice(0, 5)}...{account.slice(-5)}
              </UiKitButton>
            )}
          </div>
        </StyledMobileMenu>
      )}
      <div style={{ height: 62 }}></div>
    </>
  );
};

export default Header;
