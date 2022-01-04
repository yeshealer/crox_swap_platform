import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
    Button,
} from "@kenshooui/react-menu";
import {
  Text,
  Link,
  IconButton
} from "crox-uikit2.0";
import useTheme from "hooks/useTheme";
import $ from 'jquery';
import HomeIcon from '@mui/icons-material/Home';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import PoolIcon from '@mui/icons-material/Pool';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useHistory } from "react-router-dom";
import usePriceCakeBusd from "hooks/useCroxPrice";
import { slide as Menu } from "react-burger-menu";
import BridgeIcon from './Icon/bridgeIcon'
import BridgeIconWhite from './Icon/bridgeIcon_white'
import './switchButton.css'

const StyledButton = styled(Button)`
  align-items: center;
  display: flex !important;
`

const StyledButtonItem = styled(Button)`
text-align: left;
  align-items: center;
  display: flex !important;
  color: #d1d1d1;
  padding: 10px 12px;
  width: 185px;
  margin-left: 25px;
`

const StyledButtonGroup = styled.div`
  padding: 3px 0;
  border-top: 1px solid #8080801c;
  border-bottom: 1px solid #8080801c;
`

export default props => {
  const customStyles = {
    body: {
      overflow: 'hidden'
    },
  };
  const cakePriceUsd = usePriceCakeBusd();
  const history = useHistory();
  const { isDark, toggleTheme } = useTheme();
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [element, setElement] = useState(window.localStorage.getItem('target_id'))
  const unselect = 'menu_item'
  const select = isDark ? 'menu_item menu_active' : 'menu_item menu_active_white'
  const onElement = (data) => {
    setIsOpenMenu(false)
    window.localStorage.setItem('target_id', data.target.id)
    setElement(window.localStorage.getItem('target_id'))
    switch(window.localStorage.getItem('target_id')) {
      case 'home':
        history.push("/")
        break;
      case 'farms':
        history.push("/farms")
        break;
      case 'pools':
        history.push("/pools/crox")
        break;
      default:
    }
  }
  const onTrade = () => {
    if($("#trade_group")[0].style.display === 'none') {
        $("#trade_group")[0].style.display = 'block'
    } else {
        $("#trade_group")[0].style.display = 'none'
    }
  }
  const SwitchClick = (data) => {
    toggleTheme()
  }
  const handleStateChange = (state) => {
    setIsOpenMenu(state.isOpen)
  }
  useEffect(() => {
    if(!isDark) {
      $("#crox_price")[0].parentElement.parentElement.style.backgroundColor = '#defaff'
      $("#crox_price")[0].firstElementChild.classList.add('white_mode_price')
    }
    else {
      $("#crox_price")[0].parentElement.parentElement.style.backgroundColor = "black"
      $("#crox_price")[0].firstElementChild.classList.remove('white_mode_price')
    }
  })

  return (
    <>
    <Menu id="menu_body" {...props} style={customStyles} isOpen={isOpenMenu} onStateChange={(state) => handleStateChange(state)}>
      <Button className="closeButton" onClick={() => setIsOpenMenu(false)}>&#10006;</Button>
      <div className="menu_croxprice" id="crox_price">
        <Text className="croxprice" color="white">$CROX: ${cakePriceUsd.toFixed(3)}</Text>
      </div>

      <Link href="https://app.croxswap.com/" style={{textDecoration: 'none'}}>
        <StyledButton className={element === 'home' ? select : unselect} id="home">
            {isDark ? <HomeIcon sx={{fontSize: '18px', color: 'white'}} id="home"/> : <HomeIcon sx={{fontSize: '18px', color: '#0498aec7'}} id="home"/>}
            <Text fontSize="18px" ml="7px" id="home">Home</Text>
        </StyledButton>
      </Link>

      <StyledButton className={element === 'trade' ? select : unselect} id="trade" onClick={() => onTrade()}>
        {isDark ? <AccountBalanceIcon sx={{fontSize: '18px'}} id="trade"/> : <AccountBalanceIcon sx={{fontSize: '18px', color: '#0498aec7'}} id="trade"/>}
        <Text fontSize="18px" ml="7px" id="trade" mr="110px">Trade</Text>
        {isDark ? <ArrowDropDownIcon id="trade" /> : <ArrowDropDownIcon sx={{color: '#0498aec7'}} id="trade" />}
      </StyledButton>
      <StyledButtonGroup id="trade_group" style={{display: 'none'}}>
        <StyledButtonItem>
          <a style={isDark ? {fontSize: '16px', width: '180px'} : {fontSize: '16px', width: '180px', color: '#0498aec7'}} href="https://exchange.croxswap.com/#/swap">Swap</a>
        </StyledButtonItem>
        <StyledButtonItem>
          <a style={isDark ? {fontSize: '16px', width: '180px'} : {fontSize: '16px', width: '180px', color: '#0498aec7'}} href="https://exchange.croxswap.com/#/pool">Liqudity</a>
        </StyledButtonItem>
      </StyledButtonGroup>

      <Link href="https://app.croxswap.com/farms" style={{textDecoration: 'none'}}>
        <StyledButton className={element === 'farms' ? select : unselect} id="farms">
          {isDark ? <AgricultureIcon sx={{fontSize: '18px', color: 'white'}} id="farms"/> : <AgricultureIcon sx={{fontSize: '18px', color: '#0498aec7'}} id="farms"/>}
          <Text fontSize="18px" ml="7px" id="farms">Farms</Text>
        </StyledButton>
      </Link>

      <Link href="https://app.croxswap.com/pools/crox" style={{textDecoration: 'none'}}>
        <StyledButton className={element === 'pools' ? select : unselect} id="pools">
          {isDark ? <PoolIcon sx={{fontSize: '18px', color: 'white'}} id="pools"/> : <PoolIcon sx={{fontSize: '18px', color: '#0498aec7'}} id="pools"/>}
          <Text fontSize="18px" ml="7px" id="pools">Pools</Text>
        </StyledButton>
      </Link>

      <StyledButton className={element === 'bridge' ? select : unselect} id="bridge">
        <div style={{width: '18px', height: '18px', marginTop: '-7px'}}>{!isDark ? <BridgeIconWhite /> : <BridgeIcon />}</div>
        {isDark ? <a style={{fontSize: '18px', width: '160px', marginLeft: '7px', color: '#EAE2FC'}} href="/">Bridge</a> : <a style={{fontSize: '18px', width: '160px', marginLeft: '7px', color: '#2B2A29'}} href="/">Bridge</a>}
        <div className="soon_text">soon</div>
      </StyledButton>

      <StyledButton className={element === 'referral' ? select : unselect} id="referral">
        {isDark ? <ThumbUpOffAltIcon sx={{fontSize: '18px', color: 'white'}} id="pools"/> : <ThumbUpOffAltIcon sx={{fontSize: '18px', color: '#0498aec7'}} id="pools"/>}
        {isDark ? <a style={{fontSize: '18px', width: '160px', marginLeft: '7px', color: '#EAE2FC'}} href="https://referral.croxswap.com">Referral</a> : <a style={{fontSize: '18px', width: '160px', marginLeft: '7px', color: '#2B2A29'}} href="https://bridge.croxswap.com">Referral</a>}
      </StyledButton>
      
      <div style={{position: 'fixed', bottom: '55px', left: '20px'}}>
        <Button className="wrapper_switch" onClick={(e) => SwitchClick(e)}>
          <div className={isDark ? 'tdnn' : 'tdnn day'}>
            <div className={isDark ? 'moon' : 'moon sun'} />
          </div>
        </Button>
      </div>
      <div
        style={isDark ? {
          display: "flex",
          alignItems: "center",
          position: 'fixed',
          bottom: 15
        } : {
          padding: '5px 10px 2px',
          display: "flex",
          alignItems: "center",
          position: 'fixed',
          bottom: 15,
          backgroundColor: "#0498aec7",
          borderRadius: '10px',
          left: '16px'
        }}
      >
        <a href="https://t.me/croxswap">
          <img
            src="/icon_telegram.svg"
            alt="telegram"
            style={{ marginRight: "12px" }}
          />
        </a>
        <a href="https://twitter.com/croxswap">
          <img
            src="/icon_twitter.svg"
            alt="twitter"
            style={{ marginRight: "12px" }}
          />
        </a>
        <a href="https://github.com/croxswap">
          <img
            src="/icon_github.svg"
            alt="github"
            style={{ marginRight: "12px" }}
          />
        </a>
        <a href="https://www.youtube.com/channel/UCPEJ2aiaH03VwKe4YoFWSGw">
          <img
            src="/icon_youtube.svg"
            alt="youtube"
            style={{ marginRight: "12px" }}
          />
        </a>
        <a href="https://croxswap.medium.com">
          <img
            src="/icon_medium.svg"
            alt="blog"
            style={{ marginRight: "12px" }}
          />
        </a>
        <a href="https://reddit.com/r/croxswap">
          <img
            src="/icon_reddit.svg"
            alt="reddit"
            style={isDark ? { marginRight: "12px" } : {}}
          />
        </a>
      </div>
    </Menu>
    <Button style={{paddingLeft: 0, paddingRight: 0}} onClick={() => {setIsOpenMenu(true)}}><MenuIcon sx={{color: 'white'}} /></Button>
    </>
  );
};