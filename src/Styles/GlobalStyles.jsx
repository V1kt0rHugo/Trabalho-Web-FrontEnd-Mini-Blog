import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        background-color: #f0f2f5;
        font-family: 'Inter', sans-serif;
        box-sizing: border-box;
    }
    #root {
        min-height: 100vh;
    }
`;