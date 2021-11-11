import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from 'crox-uikit2.0'
import TranslatedText from '../TranslatedText'

const StyledNav = styled.div`
  background-color: transparent;
  margin-bottom: 5px;
`

const Nav = ({ activeIndex = 0 }: { activeIndex?: number }) => (
  <StyledNav>
    <ButtonMenu activeIndex={activeIndex} variant="primary" >
      <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link} style={{ padding: "30px 25px", margin: "1px" }}>
        <TranslatedText translationId={8}> Swap </TranslatedText>
      </ButtonMenuItem>
      <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link} style={{ padding: "30px 10px", margin: "1px" }}>
        <TranslatedText translationId={74}>Liquidity</TranslatedText>
      </ButtonMenuItem>
    </ButtonMenu>
  </StyledNav>
)

export default Nav
