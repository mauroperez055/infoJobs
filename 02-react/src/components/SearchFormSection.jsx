import { useId } from "react";
import { useSearchForm } from "../hooks/useSearchForm";

export function SearchFormSection({
  onSearch,
  onTextFilter,
  handleClearFilters,
  filters,
  textToFilter,
  hasActiveFilters,
}) {
  //creo ID's unicos con el hook useId
  const idText = useId();
  const idTechnology = useId();
  const idLocation = useId();
  const idExperienceLevel = useId();

  const { searchText, handleSubmit, handleTextChange } = useSearchForm({
    idTechnology,
    idLocation,
    idExperienceLevel,
    onSearch,
    idText,
    onTextFilter,
    filters,
    textToFilter,
  });

  console.log('boton:', hasActiveFilters)

  return (
    <section className="jobs-search">
      <h1>Encuentra tu próximo trabajo</h1>
      <p>Explora miles de oportunidades en el sector tecnológico.</p>

      <form onChange={handleSubmit} id="empleos-search-form" role="search">
        <div className="search-bar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-search"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>

          <input
            name={idText}
            id="job-search-input"
            type="text"
            value={searchText}
            placeholder="Buscar empleos por título, habilidad o empresa"
            onFocus={() => console.log("El input está activo")}
            onBlur={() => console.log("El input perdió el foco")}
            onChange={handleTextChange}
          />
        </div>

        {/* FILTROS */}
        <div className="search-filters">
          <select
            name={idTechnology}
            id="filter-technology"
            value={filters.technology}
          >
            <option value="">Tecnologías</option>
            {/* tambien se pueden agrupar con optgroup
              <optgroup label="Tenologías populares"> */}
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            {/* se pueden separar visualmente con <hr/> que crea una linea de separacion */}
            <option value="react">React</option>
            <option value="node">Node.js</option>
          </select>
          <select
            name={idLocation}
            id="filter-location"
            value={filters.location}
          >
            <option value="">Ubicación</option>
            <option value="remoto">Remoto</option>
            <option value="cdmx">Ciudad de México</option>
            <option value="guadalajara">Guadalajara</option>
            <option value="Barcelona">Barcelona</option>
            <option value="bsas">Buenos Aires</option>
            <option value="madrid">Madrid</option>
            <option value="bogota">Bogotá</option>
          </select>
          <select
            name={idExperienceLevel}
            id="filter-nivel"
            value={filters.experienceLevel}
          >
            <option value="">Nivel de experiencia</option>
            <option value="junior">Junior</option>
            <option value="mid-level">Mid-level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>

          {/* Botón condicional, solo se muestra cuando hay filtros activos */}
          {hasActiveFilters && (
            <button
              className="clear-filters-button"
              type="button"
              onClick={handleClearFilters}
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </form>

      {/* MENSAJE A MODO DE CONTROL */}
      <span id="filter-selected-value"></span>
      <span id="cantidad-resultados"></span>
    </section>
  );
}
