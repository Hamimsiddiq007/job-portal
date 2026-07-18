import express from "express";
import { changeApplicationStatus, changeJobVisibility, companyLogin, getCompanyData, getCompanyJobs, getJobApplicants, postJob, registerCompany } from "../controllers/company.controller.js";

const router = express.Router();

// Register a company
router.post("/register", registerCompany);

// Company login
router.post("/login", companyLogin);

// Get company data
router.get("/company", getCompanyData);

// Post a job
router.post("/post-job", postJob);

// Get applicants data of company
router.get("/job-applicants", getJobApplicants);

// Get company job list
router.get("/list-jobs", getCompanyJobs);

// Change application status
router.post("/change-status", changeApplicationStatus);

// Change job visibility
router.post("/change-visibility", changeJobVisibility);

export default router;