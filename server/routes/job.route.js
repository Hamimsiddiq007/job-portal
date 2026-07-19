import express from 'express';
import { getAllJobs, getJobById } from '../controllers/job.controller.js';

const router = express.Router();

// Route to get all jobs data
router.get('/', getAllJobs)

// Route to get a single job by ID
router.get('/:id', getJobById)

export default router;