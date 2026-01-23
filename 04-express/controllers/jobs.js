import { JobModel } from "../models/job.js";
import { DEFAULTS } from "../config.js";

export class JobController {
  static async getAll(req, res) {
    const {
      text,
      title,
      level,
      limit = DEFAULTS.LIMIT_PAGINATION,
      technology,
      offset = DEFAULTS.LIMIT_OFFSET,
    } = req.query;

    const paginatedJobs = await JobModel.getAll({ text, title, level, limit, technology, offset });
    
    return res.json(paginatedJobs);
  }

  static async getId(req, res) {
    const { id } = req.params;

    const job = await JobModel.getById(id);

    if (!job) {
      return res.status(404).json({ error: 'job Not Found' });
    }

    return res.json(job);
  }

  static async create(req, res) {
    const { titulo, empresa, ubicacion, descripcion, data, content } = req.body;
    const newJob = await JobModel.create({ titulo, empresa, ubicacion, descripcion, data, content });

    return res
      .status(201)
      .json({
        message: 'Job Created',
        data: newJob
      });
  }

  static async update(req, res) {
    const { id } = req.params;
    const payload = req.body;
    
    const updatedJob = await JobModel.update(id, payload);

    if (!updatedJob) {
      return res.status(404).json({ error: 'Job Not Found' });
    }

    return res
      .status(200)
      .json({
        message: 'Job Updated',
        data: updatedJob
      });
  }
  
  static async parcialUpdate(req, res) {
    const { id } = req.params;
    const payload = req.body;

    const updatedJob = await JobModel.parcialUpdate(id, payload);

    if (!updatedJob) {
      return res.status(404).json({ error: 'Job Not Found '});
    }

    return res
      .status(200)
      .json({
        message: 'Job Parcial Updated',
        data: updatedJob
      });
  }

  static async delete(req, res) {
    const { id } = req.params;
    
    const jobDeleted = await JobModel.delete(id);

    if (!jobDeleted) {
      return res.status(404).json({ error: 'Job Not Found' });
    }

    console.log('jobs lenght:', jobDeleted.length);
    return res
      .status(200)
      .json({
        message: 'Job Deleted',
        data: jobDeleted
      });
  }
}
