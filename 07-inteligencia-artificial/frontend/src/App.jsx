import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';

/**
 * Con lazy cargamos de forma "perezoza" las paginas, 
 * es decir solo cuando las necesitamos.
 * 
 * NOTA: para poder usarlo hay que exportar los componentes por defecto (export default)
 */
const HomePage = lazy(() => import('./Pages/Home.jsx'));
const SearchPage = lazy(() => import('./Pages/Search.jsx'));
const JobDetails = lazy(() => import('./Pages/Details.jsx'));
const NotFoundPage = lazy(() => import('./Pages/404.jsx'));
const ProfilePage = lazy(() => import('./Pages/ProfilePage.jsx'));
const Login = lazy(() => import('./Pages/Login.jsx'));
const Register = lazy(() => import('./Pages/Register.jsx'));

function App() {
  

  return (
    <>
      <Header />
      <Suspense fallback={<div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}
      >Cargando...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/profile" element={
            <ProtectedRoute redirecTo='/login'>
              <ProfilePage />
            </ProtectedRoute>
            } />+
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="*" element={<NotFoundPage />} /> {/* siempre debe ir al final */}
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App;
