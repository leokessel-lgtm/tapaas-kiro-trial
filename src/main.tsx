import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { GlobalStyle } from './gel'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle>
      <App />
    </GlobalStyle>
  </React.StrictMode>,
)
