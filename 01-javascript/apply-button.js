//evento click del boton aplicar
document.addEventListener('click', (event) => {
  const element = event.target;

  // Si el clic fue en un botón "aplicar"
  if (element.classList.contains('button-apply-job')) {
    console.log('es el botón');
    element.textContent = "¡Aplicaste!";
    element.classList.add("is-applied");
    element.disabled = true;
  }

});