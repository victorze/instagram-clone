import ReactDOM from 'react-dom/client'
import { App } from './app'
import { GlobalStyles } from './global-styles'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <App />
  </ThemeProvider>
)
