import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        background: ${props => props.theme.colors.background};
        color: ${props => props.theme.colors.text};
        display: flex;
        width: 100vw;
        min-height: 100vh;
        justify-content: center;
        font: 400 16px Rubik, sans-serif;
    }
    h1, h2, h3 {
        color: ${props => props.theme.colors.primary};
    }
`