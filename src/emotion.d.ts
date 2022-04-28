import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string,
      secondary: string,
      tertiary: string,
    }
    text: {
      primary: string,
      secondary: string,
    }
  }
}