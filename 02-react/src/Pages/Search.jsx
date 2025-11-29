import { Pagination } from "../components/Pagination";
import { SearchFormSection } from "../components/SearchFormSection";
import { JobListings } from "../components/JobListings";
import { useFilters } from "../hooks/useFilters";
import { Spinner } from "../components/Spinner";

export function SearchPage() {
  const {
    jobs,
    total,
    loading,
    totalPages,
    currentPage,
    handlePageChange,
    handleSearch,
    handleTextFilter,
    handleClearFilters
  } = useFilters();

  const title = loading 
    ? `Cargando...` 
    : `Resultados: ${total}, Página ${currentPage}`;

  return (
    <main>
      <title>{title}</title>
      {/* SECCION DEL FORMULARIO DE BUSQUEDA */}
      <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} handleClearFilters={handleClearFilters}/>

      {/* SECCION DONDE SE MUESTRAN LOS RESULTADOS Y LA PAGINACION */}
      <section>
        <h2 style={{ textAlign: 'center' }}>Resultados de búsqueda</h2>
        {
          loading ? <Spinner /> : <JobListings jobs={jobs} />
        }
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </section>
    </main>
  )
}