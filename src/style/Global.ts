import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    height: 100vh;

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
