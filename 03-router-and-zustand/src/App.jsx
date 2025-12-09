import { lazy, Suspense, useState } from 'react';
import { Routes, Route } from 'react-router';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

/**
 * Con lazy cargamos de forma "perezoza" las paginas, 
 * asi evitamos cargar todo sin que lo necesitemos
 * 
 * NOTA: para poder usarlo hay que exportar los componentes por defecto (export default)
 */
const HomePage = lazy(() => import('./Pages/Home.jsx'));
const SearchPage = lazy(() => import('./Pages/Search.jsx'));
const JobDetails = lazy(() => import('./Pages/Details.jsx'));
const NotFoundPage = lazy(() => import('./Pages/404.jsx'));

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  }

  const handleLogout = () => {
    setLoggedIn(false);
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      {/**
       * con Suspense mejor la experiencia del usuario
       * mostrando un fallback hasta que cargue la pagina completa
       */}
      <Suspense fallback={<div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}
      >Cargando...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          {/* le paso isLogged a JobDetails porque
            solo los usarios que han iniciado sesion 
            pueden ver los detalles */}
          <Route path="/jobs/:id" element={<JobDetails isLoggedIn={isLoggedIn}/>} />
          <Route path="*" element={<NotFoundPage />} /> {/* siempre debe ir al final */}
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App;
