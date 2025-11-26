import { useId, useState } from 'react';

let timeoutId = null;

const useSearchForm = ({ idTechnology, idLocation, idExperienceLevel, idText, onSearch, onTextFilter}) => {
  const [searchText, setSearchText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
 
    //guardo toda la informacion del formulario
    const formData= new FormData(event.currentTarget);

    if (event.target.name === idText) {
      return; // si el cambio fue en el input de texto, no hago el submit completo ya que lo manejo en handleTextChange
    }
    
    //recupero la informacion de cada campo
    const filters = {
      technology: formData.get(idTechnology),
      location: formData.get(idLocation), 
      experienceLevel: formData.get(idExperienceLevel), 
    }
    console.log(filters)

    // filtros que se seleccionan
    onSearch(filters);
  }

  // FILTRO DE BUSQUEDA EN TIEMPO REAL AL ESCRIBIR EN EL FORMULARIO
  const handleTextChange = (event) => {
    const text = event.target.value;
    setSearchText(text); // actualiza el input inmediatamente

    // DEBOUNCE: espera a que el usuario deje de escribir por 500ms para ejecutar la busqueda, cancela el timeout anterior
    if (timeoutId) {
      clearTimeout(timeoutId); 
    }
    timeoutId = setTimeout(() => {
      onTextFilter(text);
    }, 500)
  }

  return {
    searchText,
    handleSubmit,
    handleTextChange
  }
}

export function SearchFormSection ({ onSearch, onTextFilter }) {

  //creo ID's unicos con el hook useId
  const idText = useId();
  const idTechnology = useId();
  const idLocation = useId();
  const idExperienceLevel = useId();

  const {
    handleSubmit,
    handleTextChange
  } = useSearchForm({ idTechnology, idLocation, idExperienceLevel, onSearch, idText, onTextFilter });

  

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
            placeholder="Buscar empleos por título, habilidad o empresa"
            onFocus={() => console.log('El input está activo')}
            onBlur={() => console.log('El input perdió el foco')}
            onChange={handleTextChange}
          />

        </div>

        {/* FILTROS */}
        <div className="search-filters">
          <select name={idTechnology} id="filter-technology">
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
          <select name={idLocation} id="filter-location">
            <option value="">Ubicación</option>
            <option value="remoto">Remoto</option>
            <option value="buenos aires">Buenos Aires</option>
            <option value="cordoba">Córdoba</option>
            <option value="rosario">Rosario</option>
          </select>
          <select name={idExperienceLevel} id="filter-nivel">
            <option value="">Nivel de experiencia</option>
            <option value="junior">Junior</option>
            <option value="mid-level">Mid-level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>
        </div>
      </form>

      {/* MENSAJE A MODO DE CONTROL */}
      <span id="filter-selected-value"></span>
      <span id="cantidad-resultados"></span>
    </section>
  )
}