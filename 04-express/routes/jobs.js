import { Router } from "express";
import { JobController } from "../controllers/jobs.js";
import { validateJob, validatePartialJob } from "../schemas/jobs.js";

export const jobsRouter = Router();

// Middleware que maneja la validación de datos para crear jobs
function validateCreate (req, res, next) {
  const result = validateJob(req.body);
  if (result.success) {
    req.body = result.data; // Datos validados y limpios
    return next(); 
  }

  return res.status(400).json({ error: 'Invalid request', details: result.error.errors });
}

// Middleware que maneja la validación de datos para actualizar jobs
function validateUpdate (req, res, next) {
  const result = validatePartialJob(req.body);
  if (result.success) {
    req.body = result.data; // Datos validados y limpios
    return next(); 
  }

  return res.status(400).json({ error: 'Invalid request', details: result.error.errors });
}

jobsRouter.get('/', JobController.getAll);
jobsRouter.get('/:id', JobController.getId);

// Primero validamos los datos del POST y luego creamos el job
jobsRouter.post('/', validateCreate, JobController.create);
jobsRouter.put('/:id', JobController.update);

// Primero validamos los datos del PATCH y luego actualizamos el job
jobsRouter.patch('/:id', validateUpdate, JobController.parcialUpdate);
jobsRouter.delete('/:id', JobController.delete);