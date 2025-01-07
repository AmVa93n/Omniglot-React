import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css'; // Datepicker CSS
import 'bootstrap-datepicker'; // Datepicker JS
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/auth.context'
import { SocketProvider } from './context/socket.context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)