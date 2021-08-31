import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Exo:wght@600&family=Nunito+Sans:wght@400;700&display=swap');

  body {
    margin: 0;
    padding: 0;
    background-color: #fbfcfe;
    font-family: 'NunitoSans', sans-serif;
  }

  a {
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`

export default GlobalStyles

export const MaxWidth = styled.main`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: auto;
`
