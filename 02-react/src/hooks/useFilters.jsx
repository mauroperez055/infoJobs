import { useState, useEffect } from "react";

const RESULT_PER_PAGE = 5;

export const useFilters = () => {
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

  // Efecto para obtener los trabajos cada vez que cambian los filtros, el texto o la página actual
  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);

        // construyo la url con los parametros de busqueda
        const params = new URLSearchParams(); 

        // agrego los filtros si existen
        if (textToFilter) params.append('text', textToFilter);
        if (filters.technology) params.append('technology', filters.technology);
        if (filters.location) params.append('type', filters.location);
        if (filters.experienceLevel) params.append('level', filters.experienceLevel);

        // paginacion
        const offset = (currentPage - 1) * RESULT_PER_PAGE; 
        params.append('limit', RESULT_PER_PAGE); // resultados por pagina
        params.append('offset', offset); // desde que resultado empezar a mostrar

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

  // Limpia todos los filtros y reinicia la paginacion
  const handleClearFilters = () => {
    setFilters({
      technology: '',
      location: '',
      experienceLevel: ''
    }),
    setTextToFilter(''),
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
    handleTextFilter,
    handleClearFilters
  }
}