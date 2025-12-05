import { Routes, Route } from 'react-router';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { SearchPage } from './Pages/Search';
import { HomePage } from './Pages/Home';
import { JobDetails } from './Pages/Details';
import { NotFoundPage } from './Pages/404';



function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
