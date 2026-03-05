import express from 'express';
import { jobsRouter } from './routes/jobs.js';
/* import { corsMiddleware } from './middlewares/cors.js'; */
import { DEFAULTS } from './config.js';
import { aiRouter } from './routes/ai.js';
import cors from 'cors';

const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express();

app.set('trust proxy', 1); // Si estás detrás de un proxy, como Nginx o CLoudeflare, esto es importante para que el rate limiter funcione correctamente con la IP del cliente real.
/* app.use(corsMiddleware());  */
app.use(cors());
app.use(express.json());

app.use('/jobs', jobsRouter);
app.use('/ai', aiRouter);

/**
 * Por defecto process.env.NODE_ENV = undefined
 */
/* if (!process.env.NODE_ENV) {
  app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`);
  })
} */

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});

export default app; 