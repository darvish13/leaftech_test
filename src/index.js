import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import { ThemeProvider } from 'styled-components'
import App from './App'
import reportWebVitals from './reportWebVitals'
import GlobalStyles from './styles/globalStyles'
import Theme from './styles/theme'
import { BrowserRouter } from 'react-router-dom'
import RealmApp from './RealmApp'
import MongoDB from './MongoDB'

ReactDOM.render(
  <React.StrictMode>
    <RealmApp>
      <MongoDB>
        <GlobalStyles />
        <ThemeProvider theme={Theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </MongoDB>
    </RealmApp>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
