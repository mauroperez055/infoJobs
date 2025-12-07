import { lazy, Suspense } from 'react';
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
  return (
    <>
      <Header />
      {/**
       * con Suspense mejor la experiencia del usuario
       * mostrando un fallback hasta que cargue la pagina completa
       */}
      <Suspense fallback={<div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}
      >Cargando...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App;
