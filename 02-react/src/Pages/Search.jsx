import { useState, useEffect } from "react";
import { Pagination } from "../components/Pagination";
import { SearchFormSection } from "../components/SearchFormSection";
import { JobListings } from "../components/JobListings";
import jobsData from "../data.json";

const RESULT_PER_PAGE = 5;

export function SearchPage() {
  // Estado para filtros multiples
  const [filters, setFilters] = useState({
      technology: '',
      location: '', 
      experienceLevel: '', 
    });

  // Estado para filtro por texto libre (buscador) 
  const [textToFilter, setTextToFilter] = useState('');

  // Estado para el control de la paginación
  const [ currentPage, setCurrentPage ] = useState(1);

  // FILTRO 1: Filtrar por filtros seleccionados (por ahora solo tecnología)
  const jobsFilteredByFilters = jobsData.filter(job => {
    return(
      (filters.technology === '' || job.data.technology === filters.technology) &&
      (filters.location === '' || job.data.modalidad === filters.location) &&
      (filters.experienceLevel === '' || job.data.nivel === filters.experienceLevel)
    )
  })

  // FILTRO 2: Filtrar por texto libre (titulo del empleo)
  const jobsWithTextFilter = textToFilter === ''
    ? jobsFilteredByFilters
    : jobsFilteredByFilters.filter(job => {
      return job.titulo.toLowerCase().includes(textToFilter.toLowerCase());
    })

  // Genera la cantidad de páginas dependiendo de los resultados
  const totalPages = Math.ceil(jobsWithTextFilter.length / RESULT_PER_PAGE);

  // Muestra los resultados que corresponden a la pagina actual
  const pagedResults = jobsWithTextFilter.slice(
    (currentPage - 1) * RESULT_PER_PAGE,
    currentPage * RESULT_PER_PAGE
  )

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

  // si no se le pasa segundo parametro, el efecto se ejecuta cada vez que se renderiza el componente
  // si en el segundo parámetro le paso un [] se va a ejecutar la primera vez nada mas
  // si le paso una dependencia se va a ejecutar cuando esa dependencia cambie
  useEffect(() => {
    document.title = `Resultados: ${jobsWithTextFilter.length} - Página ${currentPage} - DevJobs`
  }, [jobsWithTextFilter, currentPage])


  /* useEffect(() => {
    // Suscripcion a un evento
    const handleResize = () => {
      console.log('Ventana redimensionada');
      console.log(window.innerHeight, window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    // Limpieza de suscripcion: se ejecuta antes de desmontar o antes de re-ejecutar
    // Evita memory leak ( fuga de memoria )
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []) */

  return (
    <main>
      {/* SECCION DEL FORMULARIO DE BUSQUEDA */}
      <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} />

      {/* SECCION DONDE SE MUESTRAN LOS RESULTADOS Y LA PAGINACION */}
      <section>
        <JobListings jobs={pagedResults} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </section>
    </main>
  )
}