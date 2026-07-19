import Job from "../models/job.model.js";

// Get all jobs
export const getAllJobs = async (req, res) => {
    try {
        const jobs =await Job.find({visible: true}).populate({path: 'companyId', select: '-password'});

        res.status(200).json({ success: true, jobs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a single job by ID
export const getJobById = async (req, res) => {};