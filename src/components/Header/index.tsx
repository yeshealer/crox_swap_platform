/* eslint-disable */
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "connectors";
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
import useCroxPrice from "hooks/useCroxPrice";
import getRpcUrl from "utils/getRpcUrl";


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

const StyledDropDownItem = styled(DropdownItem)`
  background-color: #121827;
  border: none;
  padding: 30px 20px;
  &:hover {
    background-color: #0498aec7;
  }
  & .itemContainer {
    background-color: #121827;
  border: none;
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

let IsConnectConfirm = false;

const Header = (props) => {
  const { account, activate, deactivate, error, active } = useWeb3React();

  const handleLogin = (connectorId: ConnectorId) => {
      IsConnectConfirm = true;
    if (connectorId === "walletconnect") {
      return activate(walletconnect);
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
            <a href="https://bridge.croxswap.com">Bridge</a>
          </StyledButton>
          <StyledButton className="button">
            <a href="https://referral.croxswap.com">Referral</a>
          </StyledButton>
          <StyledDropDown
            label="Audits"
            className="dropdown itemContainer"
            itemsClassName="itemContainer"
          >
            <StyledDropDownItem className="menu-item">
              <a href="https://github.com/TechRate/Smart-Contract-Audits/blob/main/Crox%20Final.pdf">
                Techrate
              </a>
            </StyledDropDownItem>
            <StyledDropDownItem className="menu-item">
              Certik
              <br />
              (Soon)
            </StyledDropDownItem>
          </StyledDropDown>
          <StyledDropDown
            label="More"
            className="dropdown itemContainer"
            itemsClassName="itemContainer"
          >
            <StyledDropDownItem className="menu-item">
              <a href="https://docs.croxswap.com">Docs</a>
            </StyledDropDownItem>
            <StyledDropDownMenuItem
              label="Charts"
              direction="right"
              className="menu-item itemContainer"
              itemsClassName="itemContainer"
            >
              <StyledDropDownItem className="menu-item">
                <a href="https://dex.guru/token/0x2c094f5a7d1146bb93850f629501eb749f6ed491-bsc">
                  DexGuru
                </a>
              </StyledDropDownItem>
              <StyledDropDownItem className="menu-item">
                <a href="https://poocoin.app/tokens/0x2c094f5a7d1146bb93850f629501eb749f6ed491">
                  Poocoin
                </a>
              </StyledDropDownItem>
              <StyledDropDownItem className="menu-item">
                <a href="https://charts.bogged.finance/?token=0x2c094F5A7D1146BB93850f629501eB749f6Ed491">
                  BogCharts
                </a>
              </StyledDropDownItem>
            </StyledDropDownMenuItem>
            <StyledDropDownMenuItem
              label="Listings"
              direction="right"
              className="menu-item itemContainer"
              itemsClassName="itemContainer"
            >
              <StyledDropDownItem className="menu-item">
                <a href="https://pancakeswap.info/token/0x2c094f5a7d1146bb93850f629501eb749f6ed491">
                  PancakeSwap
                </a>
              </StyledDropDownItem>
              <StyledDropDownItem className="menu-item">
                <a href="https://coinmarketcap.com/currencies/croxswap/">
                  CoinMarketCap
                </a>
              </StyledDropDownItem>
              <StyledDropDownItem className="menu-item">
                <a href="https://www.coingecko.com/en/coins/croxswap">
                  Coingecko
                </a>
              </StyledDropDownItem>
              <StyledDropDownItem className="menu-item">
                <a href="https://bscscan.com/token/0x2c094f5a7d1146bb93850f629501eb749f6ed491">
                  BscScan
                </a>
              </StyledDropDownItem>
            </StyledDropDownMenuItem>
            <StyledDropDownItem className="menu-item">
              <a href="https://github.com/croxswap">Github</a>
            </StyledDropDownItem>
            <StyledDropDownItem className="menu-item">
              <a href="https://croxswap.medium.com/">Blog</a>
            </StyledDropDownItem>
          </StyledDropDown>

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
            <MobileMenu
              styles={{ backgroundColor: "#121827" }}
              menuButton={
                <div
                  style={{
                    padding: "4px 8px",
                    background: "#0498aec7",
                    color: "white",
                    borderRadius: 5,
                    fontSize: 24,
                    cursor: "pointer",
                  }}
                >
                  <RiMenu2Line />
                </div>
              }
            >
              <StyledMenuItem href="https://app.croxswap.com/">
                Home
              </StyledMenuItem>
              <StyledSubMenu
                label="Trade"
                itemStyles={{
                  color: "white",
                  padding: "20px 20px",
                  background: "transparent",
                  hover: { background: "#0498aec7" },
                }}
              >
                <StyledMenuItem href="https://exchange.croxswap.com/#/swap">
                  Swap
                </StyledMenuItem>
                <StyledMenuItem href="https://exchange.croxswap.com/#/pool">
                  Liquidity
                </StyledMenuItem>
              </StyledSubMenu>
              <StyledMenuItem href="https://app.croxswap.com/farms">
                Farms
              </StyledMenuItem>
              <StyledMenuItem href="https://app.croxswap.com/pools/crox">
                Pools
              </StyledMenuItem>
              <StyledMenuItem href="https://bridge.croxswap.com">
                Bridge
              </StyledMenuItem>
              <StyledMenuItem href="https://referral.croxswap.com">
                Referral
              </StyledMenuItem>
              <StyledSubMenu
                label="Audits"
                itemStyles={{
                  color: "white",
                  padding: "20px 20px",
                  background: "transparent",
                  hover: { background: "#0498aec7" },
                }}
              >
                <StyledMenuItem href="https://github.com/TechRate/Smart-Contract-Audits/blob/main/Crox%20Final.pdf">
                  Techrate
                </StyledMenuItem>
                <StyledMenuItem>Certik(Soon)</StyledMenuItem>
              </StyledSubMenu>
              <StyledSubMenu
                label="More"
                itemStyles={{
                  color: "white",
                  padding: "20px 20px",
                  background: "transparent",
                  hover: { background: "#0498aec7" },
                }}
              >
                <StyledMenuItem href="https://docs.croxswap.com">
                  Docs
                </StyledMenuItem>
                <StyledSubMenu
                  label="Charts"
                  itemStyles={{
                    color: "white",
                    padding: "20px 20px",
                    background: "transparent",
                    hover: { background: "#0498aec7" },
                  }}
                >
                  <StyledMenuItem href="https://dex.guru/token/0x2c094f5a7d1146bb93850f629501eb749f6ed491-bsc">
                    DexGuru
                  </StyledMenuItem>
                  <StyledMenuItem href="https://poocoin.app/tokens/0x2c094f5a7d1146bb93850f629501eb749f6ed491">
                    Poocoin
                  </StyledMenuItem>
                  <StyledMenuItem href="https://charts.bogged.finance/?token=0x2c094F5A7D1146BB93850f629501eB749f6Ed491">
                    BogCharts
                  </StyledMenuItem>
                </StyledSubMenu>
                <StyledSubMenu
                  label="Listings"
                  itemStyles={{
                    color: "white",
                    padding: "20px 20px",
                    background: "transparent",
                    hover: { background: "#0498aec7" },
                  }}
                >
                  <StyledMenuItem href="https://pancakeswap.info/token/0x2c094f5a7d1146bb93850f629501eb749f6ed491">
                    Pancakeswap
                  </StyledMenuItem>
                  <StyledMenuItem href="https://coinmarketcap.com/currencies/croxswap/">
                    CoinMarketCap
                  </StyledMenuItem>
                  <StyledMenuItem href="https://www.coingecko.com/en/coins/croxswap">
                    Coingecko
                  </StyledMenuItem>
                  <StyledMenuItem href="https://bscscan.com/token/0x2c094f5a7d1146bb93850f629501eb749f6ed491">
                    BscScan
                  </StyledMenuItem>
                </StyledSubMenu>
                <StyledMenuItem href="https://github.com/croxswap">
                  Github
                </StyledMenuItem>
                <StyledMenuItem href="https://croxswap.medium.com">
                  Blog
                </StyledMenuItem>
              </StyledSubMenu>
            </MobileMenu>
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

// <Menu className="menu">
//   <img src="/logo1.png" width="120px" style={{ margin: "8px 14px", marginRight: "80px" }} />
//   <Dropdown label="X" className="dropdown">
//     <DropdownItem className="menu-item"><a href="/">Home</Link></DropdownItem>

//     <Dropdown label="Trade" className="menu-item" direction="right" itemsClassName="itemContainer">
//       <DropdownItem className="menu-item">Swap</DropdownItem>
//       <DropdownItem className="menu-item">Liquidity</DropdownItem>
//     </Dropdown>

//     <DropdownItem className="menu-item"><Link href="/farms">Farms</Link></DropdownItem>

//     <Dropdown label="Pools" className="menu-item" direction="right" itemsClassName="itemContainer">
//       <DropdownItem className="menu-item"><Link href="/pools">CROX Pools</Link></DropdownItem>
//       <DropdownItem className="menu-item">Charity Pools<br />(Soon)</DropdownItem>
//       <DropdownItem className="menu-item">Rasta Pool<br />(Soon)</DropdownItem>
//       <DropdownItem className="menu-item">Polarisdefi</DropdownItem>
//     </Dropdown>

//     <DropdownItem className="menu-item"><Link href="/bridge">CROX Bridge</Link></DropdownItem>

//     <Dropdown label="Audits" className="menu-item" direction="right" itemsClassName="itemContainer">
//       <DropdownItem className="menu-item">Techrate</DropdownItem>
//       <DropdownItem className="menu-item">Certik<br />(Soon)</DropdownItem>
//     </Dropdown>

//     <Dropdown label="More" className="menu-item" direction="right" itemsClassName="itemContainer">
//       <DropdownItem className="menu-item">Docs</DropdownItem>
//       <Dropdown label="Charts" direction="right" className="menu-item" itemsClassName="itemContainer">
//         <DropdownItem className="menu-item">DexGuru</DropdownItem>
//         <DropdownItem className="menu-item">Poocoin<br />(Soon)</DropdownItem>
//         <DropdownItem className="menu-item">Bogged Finance</DropdownItem>
//       </Dropdown>
//       <DropdownItem className="menu-item">Listings</DropdownItem>
//       <DropdownItem className="menu-item">Github</DropdownItem>
//       <DropdownItem className="menu-item">Blog</DropdownItem>
//     </Dropdown>
//   </Dropdown>

//   <Separator />

//   <div style={{ display: "flex", alignItems: "center" }}>
//     <span style={{ color: "white", padding: "10px", background: "#253253", marginRight: "20px", borderRadius: '8px' }}>$CROX: $20.62</span>
//     <UiKitButton onClick={onPresentConnectModal}>Connect</UiKitButton>
//   </div>
// </Menu>
