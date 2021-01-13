import styled from 'styled-components';

interface InputQuoteContainerProps {
    direction: string
}

export const UpdateQuotesContainer = styled.form`
    width: 30%;
    height: 60%;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    justify-items: center;
`

export const InputQuoteContainer = styled.div`
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: ${(props: InputQuoteContainerProps) => props.direction};
    align-items: ${(props: InputQuoteContainerProps) => props.direction ==="column" ? "none" : "center"};
    justify-content: ${(props: InputQuoteContainerProps) => props.direction ==="column" ? "space-around" : "none"};
    
`