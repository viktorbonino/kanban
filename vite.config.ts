import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import i18nResources from 'vite-plugin-i18n-resources'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    i18nResources({
      path: path.resolve(__dirname, "src/locales"),
    }),
  ],
  server: {
    host: true
  },
  resolve: {
    alias: {
      "ui": path.resolve(__dirname, './src/ui'),
      "components": path.resolve(__dirname, './src/components'),
      "state": path.resolve(__dirname, './src/state'),
      "hooks": path.resolve(__dirname, './src/hooks'),
      "pages": path.resolve(__dirname, './src/pages'),
      "locales": path.resolve(__dirname, './src/locales'),
    },
  },
})
