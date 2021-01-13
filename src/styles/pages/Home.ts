import styled from 'styled-components';
import theme from '../theme';

export const BitcoinQuotesContainer = styled.section`
    width: 40%;
    height: 60%;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
`

export const BitcoinQuote = styled.div`
    width: 20%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    color: ${theme.colors.primary};
`

export const OtherCurrenciesContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`