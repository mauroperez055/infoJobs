import { useState, useEffect } from "react";
import { Pagination } from "../components/Pagination";
import { SearchFormSection } from "../components/SearchFormSection";
import { JobListings } from "../components/JobListings";



const RESULT_PER_PAGE = 5;

const useFilters = () => {
  // Estado para filtros multiples
  const [filters, setFilters] = useState({
      technology: '',
      location: '', 
      experienceLevel: '', 
    });

  // Estado para filtro por texto libre (buscador) 
  const [textToFilter, setTextToFilter] = useState('');

  // Estado para el control de la paginación
  const [currentPage, setCurrentPage] = useState(1);

  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        if (textToFilter) params.append('text', textToFilter);
        if (filters.technology) params.append('technology', filters.technology);
        if (filters.location) params.append('type', filters.location);
        if (filters.experienceLevel) params.append('level', filters.experienceLevel);

        const offset = (currentPage - 1) * RESULT_PER_PAGE;
        params.append('limit', RESULT_PER_PAGE);
        params.append('offset', offset);

        const queryParams = params.toString()
        
        const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`);
        const json = await response.json(); 
        setJobs(json.data);
        setTotal(json.total);
      } catch (error) {
        console.log('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [filters, textToFilter, currentPage]);

  // Genera la cantidad de páginas dependiendo de los resultados
  const totalPages = Math.ceil(total / RESULT_PER_PAGE);

  // Maneja el cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  // Guarda nuevos filtros seleccionados y reinicia a la página 1
  const handleSearch = (filters) => {
    setFilters(filters);
    setCurrentPage(1);
  }

  // Guarda nuevo texto para filtrar y reinicia a la página 1
  const handleTextFilter = (newTextFilter) => {
    setTextToFilter(newTextFilter);
    setCurrentPage(1);
  }

  return {
    loading,
    jobs,
    total,
    totalPages,
    currentPage,
    handlePageChange,
    handleSearch,
    handleTextFilter
  }
}

export function SearchPage() {
  const {
    jobs,
    total,
    loading,
    totalPages,
    currentPage,
    handlePageChange,
    handleSearch,
    handleTextFilter
  } = useFilters();

  const title = loading 
    ? `Cargando...` 
    : `Resultados: ${total}, Página ${currentPage}`;

  return (
    <main>
      <title>{title}</title>
      {/* SECCION DEL FORMULARIO DE BUSQUEDA */}
      <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} />

      {/* SECCION DONDE SE MUESTRAN LOS RESULTADOS Y LA PAGINACION */}
      <section>
        <h2 style={{ textAlign: 'center' }}>Resultados de búsqueda</h2>
        {
          loading ? <p>Cargando empleos...</p> : <JobListings jobs={jobs} />
        }
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </section>
    </main>
  )
}