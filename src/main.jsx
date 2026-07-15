import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './styles/main.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { UserProvider } from './context/UserContext'
import AppRoutes from './routes/AppRoutes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>                     
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  </BrowserRouter>                   
</StrictMode>
)
