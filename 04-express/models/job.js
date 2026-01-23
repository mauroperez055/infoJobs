import jobs from '../jobs.json' with { type: 'json' };

export class JobModel {
  static async getAll({ text, title, level, limit = 10, technology, offset = 0 }) {
    let filteredJobs = jobs;

    if (text) {
      const searchTerm = text.toLowerCase();
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.titulo.toLowerCase().includes(searchTerm) ||
          job.descripcion.toLowerCase().includes(searchTerm),
      );
    }

    if (technology) {
      filteredJobs = filteredJobs.filter((job) =>
        job.data.technology.includes(technology),
      );
    }

    const limitNumber = Number(limit);
    const offsetNumber = Number(offset);

    const paginatedJobs = filteredJobs.slice(
      offsetNumber,
      offsetNumber + limitNumber,
    );

    return {
      total: filteredJobs.length,
      limit: limitNumber,
      offset: offsetNumber,
      data: paginatedJobs
    }
  }

  static async getById(id) {
    const job = jobs.find(job => job.id === id);
    return job;
  }

  static async create({ titulo, empresa, ubicacion, descripcion, data, content }) {
    const newJob = {
      id: crypto.randomUUID(),
      titulo,
      empresa,
      ubicacion,
      descripcion,
      data,
      content
    }

    jobs.push(newJob);

    return newJob;
  }

  static async update(id, payload) {
    const jobIndex = jobs.findIndex(job => job.id === id);

    if (jobIndex === -1) {
      return null;
    }

    const updatedJob = {
      ...jobs[jobIndex], /* copio las propiedades existentes */
      ...payload,        /* sobrescribo con las nuevas propiedades */
      id                 /* me aseguro de que el id no cambie */
    }

    jobs[jobIndex] = updatedJob
    console.log(jobs[jobIndex]);

    return updatedJob;
  }

  static async parcialUpdate(id, payload) {
    const jobIndex = jobs.findIndex(job => job.id === id);

    if(jobIndex === -1) {
      return null;
    }

    const updatedJob = {
      ...jobs[jobIndex],
      ...payload,
      id
    }

    jobs[jobIndex] = updatedJob

    return updatedJob;
  }

  static async delete(id) {
    const jobIndex = jobs.findIndex(job => job.id === id);

    if (jobIndex === -1) {
      return null;
    }

    const jobsDeleted = jobs.splice(jobIndex, 1);

    return jobsDeleted;
  }
}