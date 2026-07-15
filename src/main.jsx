import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './styles/main.scss'
import App from './App.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { UserProvider } from './context/UserContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>,
)
