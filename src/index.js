import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { TaxHubProvider } from './context/taxhub-context'
import App from './app'

ReactDOM.render(
  <BrowserRouter>
    <TaxHubProvider>
      <App />
    </TaxHubProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
