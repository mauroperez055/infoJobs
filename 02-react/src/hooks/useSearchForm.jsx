import { useState } from "react";

let timeoutId = null;

export const useSearchForm = ({ idTechnology, idLocation, idExperienceLevel, idText, onSearch, onTextFilter}) => {
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