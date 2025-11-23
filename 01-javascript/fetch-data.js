//recupero el elemento donde voy a mostrar la informacion
const container = document.querySelector('.jobs-listing');

fetch('./data.json')
  .then(response => {
    return response.json();
  })
  .then((jobs) => {
    jobs.forEach((job) => {
      const article = document.createElement('article');
      article.className = 'job-listing-card';
      article.dataset.modalidad = job.data.modalidad;
      article.dataset.nivel = job.data.nivel;
      article.dataset.technology = job.data.technology;
      article.dataset.title = job.titulo.toLowerCase();

      //creo el template con la informacion del trabajo
      article.innerHTML = `<div>
        <h3>${job.titulo}</h3>
        <small>${job.empresa} | ${job.ubicacion}</small>
        <p>${job.descripcion}</p>
      </div>
      <button class="button-apply-job">Aplicar</button>`

      container.appendChild(article)
    })
  })