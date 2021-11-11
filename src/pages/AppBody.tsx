import React, {ReactNode} from 'react'
import styled from 'styled-components'
import { Card } from 'crox-uikit2.0'

interface Props {
  title: ReactNode
  children?: ReactNode
}

export const BodyWrapper = styled(Card)`
  position: relative;
  max-width: 600px;
  width: 90%;
  z-index: 0;
  background: #27262c;
  border-radius: 10px;
  margin-top: 2%;
  padding: 6px 4px;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
const AppBody = ({ children, title }: Props) => {
    switch(title) {
      case "Liquidity":
        return(<BodyWrapper style={{marginTop: "-10%"}}>{children}</BodyWrapper>)
      case "AddLiquidity":
        return(<BodyWrapper>{children}</BodyWrapper>)
      default :
        return <BodyWrapper>{children}</BodyWrapper>
    }
    // title !== "Liquidity" ? <BodyWrapper>{children}</BodyWrapper> : <BodyWrapper style={{marginTop: "-13%"}}>{children}</BodyWrapper>
}

export default AppBody
