//evento change del select de los filtros del form
const filterLocation = document.querySelector('#filter-location');
const filterNivel = document.querySelector('#filter-nivel');
const filterTechnology = document.querySelector('#filter-technology');
const searchInput = document.querySelector('#job-search-input');
const message = document.querySelector('#filter-selected-value'); //elemento donde voy a mostrar la informacion
const messageCantidad = document.querySelector('#cantidad-resultados'); //elemento donde voy a mostrar la informacion


// Filtro por ubicación
filterLocation.addEventListener('change', () => {
  let count = 0;
  console.log('ubicacion:', filterLocation.value); // recupero y muestro por consola el valor del filtro
  const jobs = document.querySelectorAll('.job-listing-card');
  const selectedValue = filterLocation.value;

  if (selectedValue) {
    message.textContent = `Has seleccionado: ${selectedValue}`;
  } else {
    message.textContent = '';
  }

  jobs.forEach(job => {
    //recupero el valor del atributo data-modalidad
      //1° forma, la nativa, pensada exactamente para esto
    //const modalidad = job.dataset.modalidad; 
      //2° forma, es mejor porque recupero cualquier atributo pasandole el nombre del atributo, como la clase
    const modalidad = job.getAttribute('data-modalidad');
    //console.log(job.getAttribute('class'));

    const isShown = selectedValue === modalidad || selectedValue === '';
    job.classList.toggle('is-hidden', !isShown); 

    if (isShown) {
      count++;
    }
  })
  messageCantidad.textContent = `Total resultados: ${count}`;
}) 

// Filtro por nivel de experiencia
filterNivel.addEventListener('change', () => {
  let count = 0;
  console.log('nivel:', filterNivel.value); // recupero y muestro por consola el valor del filtro
  const jobs = document.querySelectorAll('.job-listing-card');
  const selectedValue = filterNivel.value;

  if (selectedValue) {
    message.textContent = `Has seleccionado: ${selectedValue}`;
  } else {
    message.textContent = '';
  }

  jobs.forEach(job => {
    const nivel = job.getAttribute('data-nivel');

    const isShown = selectedValue === nivel || selectedValue === '';
    job.classList.toggle('is-hidden', !isShown); 

    if (isShown) {
      count++;
    }
  })
  messageCantidad.textContent = `Total resultados: ${count}`;
}) 

// Filtro por tecnología 
filterTechnology.addEventListener('change', () => {
  let count = 0;
  console.log('tecnologia:', filterTechnology.value); // recupero y muestro por consola el valor del filtro
  const jobs = document.querySelectorAll('.job-listing-card');
  const selectedValue = filterTechnology.value;

  if (selectedValue) {
    message.textContent = `Has seleccionado: ${selectedValue}`;
  } else {
    message.textContent = '';
  }

  jobs.forEach(job => {
    const technology = job.getAttribute('data-technology');

    const isShown = technology.includes(selectedValue) || selectedValue === '';
    job.classList.toggle('is-hidden', !isShown); 

    if (isShown) {
      count++;
    }
  })
  messageCantidad.textContent = `Total resultados: ${count}`;
}) 

// Filtro de busqueda
searchInput.addEventListener('input', (event) => {
  let count = 0;
  console.log(event.target.value); // leo lo que ingresa el usuario
  const jobs = document.querySelectorAll('.job-listing-card');
  const inputValue = event.target.value.toLowerCase().trim(); //con trim() elimino espacios en blanco al inicio y al final

  if (inputValue) {
    message.textContent = `Ingresaste el titulo: ${inputValue}`;
  } else {
    message.textContent= '';
  }

  jobs.forEach(job => {
    const title = job.getAttribute('data-title');

    const isShown = title.includes(inputValue) || inputValue === '';
    job.classList.toggle('is-hidden', !isShown);

    if (isShown) {
      count++;
    }
  })
  messageCantidad.textContent = `Total resultados: ${count}`;
})