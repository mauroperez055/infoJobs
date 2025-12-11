import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * Componente que crea e inicializa los filtros con la url,
 * realiza la llamada a la API,
 * crea y actualiza la url con los filtros.
 */

const RESULT_PER_PAGE = 5;

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Estado para filtros multiples de los selects
  const [filters, setFilters] = useState(() => {
    return {
      technology: searchParams.get('technology') || '',
      location: searchParams.get('type') || '',
      experienceLevel: searchParams.get('level') || ''
    }
  });

  // Estado para filtro por texto libre (buscador) 
  const [textToFilter, setTextToFilter] = useState(() => searchParams.get('text') || '');

  // Estado para el control de la paginación
  const [currentPage, setCurrentPage] = useState(() => {
    const page = Number(searchParams.get('page'));
    return Number.isNaN(page) ? page : 1;
  });

  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Efecto para llamar a la APi y obtener los trabajos cada vez que cambian los filtros, el texto o la página actual
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

        const queryParams = params.toString();
        
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

  // Efecto para actualizar la URL en la barra de direcciones cuando cambian los filtros, el texto o la página actual
  useEffect(() => {
    setSearchParams((params) => {
      if (textToFilter) { 
        params.set('text', textToFilter)
      } else {
        params.delete('text')
      }
      if (filters.technology) {
        params.set('technology', filters.technology)
      } else {
        params.delete('technology')
      }
      if (filters.location) {
        params.set('type', filters.location)
      } else {
        params.delete('type')
      }
      if (filters.experienceLevel) {
        params.set('level', filters.experienceLevel)
      } else {
        params.delete('level')
      }
  
      if (currentPage > 1) params.set('page', currentPage);
  
      return params;
    })
  }, [filters, currentPage, textToFilter, setSearchParams])

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
  const handleClearFilters = (event) => {
    event.preventDefault();
    setFilters({
      technology: '',
      location: '',
      experienceLevel: ''
    }),
    setTextToFilter(''),
    setCurrentPage(1);
  }

  const hasActiveFilters = () => {
    return (
      textToFilter !== '' ||
      filters.technology !== '' ||
      filters.location !== '' ||
      filters.experienceLevel !== ''
    )
  }

  return {
    loading,
    jobs,
    total,
    totalPages,
    currentPage,
    filters,
    textToFilter,
    handlePageChange,
    handleSearch,
    handleTextFilter,
    handleClearFilters,
    hasActiveFilters
  }
}