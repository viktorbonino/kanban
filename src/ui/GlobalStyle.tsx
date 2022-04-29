import { Global, css, useTheme } from '@emotion/react'


const GlobalStyle = () => {
  const theme = useTheme()

  return(
    <Global
      styles={css`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap');

        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }

        body {
          height: 100vh;
          background-color: ${theme.colors.secondary};
          font-family: 'Lato', sans-serif;
          line-height: 1.5;
          color: ${theme.text.primary};
          overflowX: hidden;
        }
      `}
    />
  )
}

export default GlobalStyle