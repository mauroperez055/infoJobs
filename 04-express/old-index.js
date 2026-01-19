import express from 'express';
import jobs from './jobs.json' with { type: 'json' };
import { DEFAULTS } from './config.js';

const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express();

app.use((req, res, next) => {
  const timeString = new Date().toLocaleDateString();
  console.log(`[${timeString}] ${req.method} ${req.url}`);
  next(); 
})

/**
 * Idempotencia: mútiples llamadas dejan el sistema en el mismo estado,
 * por ejemplo: GET.
 */

app.get('/', (req, res) => {
  return res.send('Hello World');
})

app.get('/health', (req, res) => {
  return res.json({
    status: 'ok',
    uptime: process.uptime()
  })
})

app.get('/jobs', (req, res) => {
  const { text, title, level, limit = DEFAULTS.LIMIT_PAGINATION, technology, offset = DEFAULTS.LIMIT_OFFSET } = req.query;

  let filteredJobs = jobs;

  if (text) {
    const searchTerm = text.toLowerCase();
    filteredJobs = filteredJobs.filter(job => 
      job.titulo.toLowerCase().includes(searchTerm) ||
      job.descripcion.toLowerCase().includes(searchTerm)
    );
  }

  if (technology) {
    filteredJobs = filteredJobs.filter(job => 
      job.data.technology.includes(technology)
    )
  }

  const limitNumber = Number(limit);
  const offsetNumber = Number(offset);

  const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber);

  console.log({ limit, technology});
  return res.json(paginatedJobs)
})

app.get('/jobs/:id', (req, res) => {
  const { id } = req.params;

  const idNumber = Number(id);

  return res.json({
    job: { id: idNumber, title: `Job with id ${idNumber}`}
  })
})


app.post('/jobs', (req, res) => {
  // lógica para crear un nuevo recurso
})

app.put('/jobs/:id', (req, res) => {
  // lógica para reemplazar un recurso completo
})

app.patch('/jobs/:id', (req, res) => {
  // Lógica para actualizar un recurso parcialmente
})

app.delete('/jobs/:id', (req, res) => {
  // lógica para eliminar recurso
})

// Opcional -> /abc o /abcd
app.get('/a{b}cd', (req, res) => {
  return res.send('abcd o acd');
})

// Comodín: donde esta * puedo colocar cualquier cosa
app.get('/bb*bb', (req, res) => {
  return res.send('bb*bb');
})

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhots:${PORT}`);
})