import { ChainId, Trade } from '@pancakeswap-libs/sdk-v2'
import React, { useContext, useCallback } from 'react'
import { ThemeContext } from 'styled-components'
import { Button, LinkExternal } from 'crox-uikit2.0'
import { ArrowUpCircle } from 'react-feather'
import { useAllTokens, useToken } from '../../hooks/Tokens'
import { AutoColumn } from '../Column'
import { getEtherscanLink } from '../../utils'
import { Wrapper, Section, ConfirmedIcon, ContentHeader } from './helpers'
import CurrencyLogo from '../CurrencyLogo'


type TransactionSubmittedContentProps = {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
  trade?: Trade | undefined
}

const TransactionSubmittedContent = ({ onDismiss, chainId, hash, trade }: TransactionSubmittedContentProps) => {
  const theme = useContext(ThemeContext)

  const allTokens = useAllTokens();
  const outToken = Object.values(allTokens).find(token => token.symbol === trade?.outputAmount.currency.symbol)

  const onAddTokenMetamask = useCallback(() => {
    const tokenAddress = outToken?.address;
    const tokenSymbol = trade?.outputAmount.currency.symbol;
    const tokenDecimals = trade?.outputAmount.currency.decimals;

    const getTokenLogoURL = (address: string) =>
  `https://raw.githubusercontent.com/croxswap/crox-dex-tokens/master/blockchains/smartchain/assets/${address}/logo.png`

    const tokenImage = getTokenLogoURL(tokenAddress as any);
    console.log(tokenImage);

    const { ethereum } = window as any;

    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        console.log('Thanks for your interest!');
      } else {
        console.log('Your loss!');
      }
    } catch (error) {
      console.log(error);
    }
  }, [trade?.outputAmount.currency, outToken?.address])
  return (
    <Wrapper>
      <Section>
        <ContentHeader onDismiss={onDismiss}>Transaction submitted</ContentHeader>
        <ConfirmedIcon style={{background: "none"}}>
          <ArrowUpCircle strokeWidth={0.5} size={97} color={theme.colors.primary} />
        </ConfirmedIcon>
        <AutoColumn gap="8px" justify="center">
          {chainId && hash && (
            <LinkExternal href={getEtherscanLink(chainId, hash, 'transaction')}>View on bscscan</LinkExternal>
          )}
          {trade && (
            <Button style={{backgroundColor: "#3c3742", color: "#0498aec7"}} onClick={onAddTokenMetamask} mt="20px">
              Add {trade?.outputAmount.currency.symbol} to Metamask
              <img
                src="/images/wallet/metamask.png"
                width="20px"
                alt="logo1"
                style={{ marginLeft: "5px" }}
              />
            </Button>
          )}
          <Button onClick={onDismiss} mt="20px">
            Close
          </Button>
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}

export default TransactionSubmittedContent
