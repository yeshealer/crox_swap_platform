import React, { useState, useCallback } from 'react'
import { Currency, Pair } from '@pancakeswap-libs/sdk-v2'
import { Button, ChevronDownIcon, Text } from 'crox-uikit2.0'
import styled from 'styled-components'
import { darken } from 'polished'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import CurrencyLogo from '../CurrencyLogo'
import DoubleCurrencyLogo from '../DoubleLogo'
import { RowBetween } from '../Row'
import { Input as NumericalInput } from '../NumericalInput'
import { useActiveWeb3React } from '../../hooks'
import TranslatedText from "../TranslatedText"
import { TranslateString } from '../../utils/translateTextHelpers'

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding: ${({ selected }) => (selected ? '0rem 0.25rem 0.6rem 0.5rem' : '1.5rem 0.35rem 1rem 0.5rem')};
  @media screen and (max-width: 500px) {
    display: block;
  }
`

const CurrencySelect = styled.button<{ selected: boolean }>`
  align-items: center;
  height: 60px;
  font-size: 16px;
  font-weight: 500;
  background-color: transparent;
  color: ${({ selected, theme }) => (selected ? theme.colors.text : '#FFFFFF')};
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
`

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const InputMaxGroup = styled.span<{ hideInput?: boolean }>`
  flex-flow: row nowrap;
  align-items: center;
  display: flex;
  background-color: #27262c;
  width: 70%;
  border-radius: 10px;
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`

const InputPanel = styled.div<{ hideInput?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '15px')};
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;
  // background-color: #302a42;
`

const Container = styled.div<{ hideInput: boolean }>`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
  background-color: #302a42;
  padding: 3px 5px 5px 5px;
`

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
}

export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label = TranslateString(132, 'Input'),
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases
}: CurrencyInputPanelProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {}} selected={disableCurrencySelect}>
          <CurrencySelect
            selected={!!currency}
            className="open-currency-select-button"
            onClick={() => {
              if (!disableCurrencySelect) {
                setModalOpen(true)
              }
            }}
          >
            <Aligner>
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
              ) : currency ? (
                <CurrencyLogo currency={currency} size="55px" style={{ marginRight: '8px' }} />
              ) : null}
              {pair ? (
                <Text>
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </Text>
              ) : (
                <Text style={{ color: "white" }} fontSize="20px">
                  <Text fontSize="12px" style={{ color: "grey", textAlign: "left" }}>{label}</Text>
                  {(currency && currency.symbol && currency.symbol.length > 20
                    ? `${currency.symbol.slice(0, 4)
                    }...${currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)} />}`
                    : currency?.symbol) || <Text fontSize="17px" style={{ border: "1px solid white", borderRadius: "10px", padding: "5px", color: "white" }}><TranslatedText translationId={82}>Select a token</TranslatedText></Text>}
                  {!disableCurrencySelect && currency && <ChevronDownIcon style={{ fill: "white" }} />}
                </Text>
              )}
            </Aligner>
          </CurrencySelect>
          <InputMaxGroup>
            {!hideInput && (
              <>
                {account && currency && showMaxButton && label !== 'To' && (
                  <Button onClick={onMax} variant="text" style={{ fontSize: "15px", padding: "10px" }}>
                    MAX
                  </Button>
                )}
                <NumericalInput
                  className="token-amount-input"
                  value={value}
                  onUserInput={val => {
                    onUserInput(val)
                  }}
                  style={{ backgroundColor: "#27262c", padding: "15px 0px", borderRadius: "5px", marginLeft: "10px" }}
                />
                {account && (
                  <Text onClick={onMax} fontSize="12px" style={{ borderRadius: "10px", color: "grey", margin: "10px" }}>
                    {!hideBalance && !!currency && selectedCurrencyBalance
                      ? `Balance: ${selectedCurrencyBalance?.toSignificant(6)}`
                      : ' -'}
                  </Text>
                )}
              </>
            )}
          </InputMaxGroup>
        </InputRow>
      </Container>
      {!disableCurrencySelect && onCurrencySelect && (
        <CurrencySearchModal
          isOpen={modalOpen}
          onDismiss={handleDismissSearch}
          onCurrencySelect={onCurrencySelect}
          selectedCurrency={currency}
          otherSelectedCurrency={otherCurrency}
          showCommonBases={showCommonBases}
        />
      )}
    </InputPanel>
  )
}
