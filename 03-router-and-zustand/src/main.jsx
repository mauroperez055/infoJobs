import { BrowserRouter } from 'react-router';
import { AuthProvider } from './context/AuthContext.jsx';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>

  {/* 
  * Con el AuthProvider ahora podemos leer desde cualquier
  * componente dentro de la App los valores que nos ofrece
  * el contexto.
  */}
    <AuthProvider>
      <App /> {/* children */}
    </AuthProvider>
  </BrowserRouter>
)
