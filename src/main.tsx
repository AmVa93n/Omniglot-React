import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './css-reset.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/auth.context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)