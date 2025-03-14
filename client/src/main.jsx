import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { TransactionProvider } from './context/TransactionContext.jsx'
createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <TransactionProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </TransactionProvider>
  </StrictMode>,
)
