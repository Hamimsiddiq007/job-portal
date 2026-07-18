import express from "express";
import { changeApplicationStatus, changeJobVisibility, companyLogin, getCompanyData, getCompanyJobs, getJobApplicants, postJob, registerCompany } from "../controllers/company.controller.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Register a company
router.post("/register", upload.single("image"), registerCompany);

// Company login
router.post("/login", companyLogin);

// Get company data
router.get("/company", protectCompany, getCompanyData);

// Post a job
router.post("/post-job", protectCompany, postJob);

// Get applicants data of company
router.get("/job-applicants", protectCompany, getJobApplicants);

// Get company job list
router.get("/list-jobs", protectCompany, getCompanyJobs);

// Change application status
router.post("/change-status", protectCompany, changeApplicationStatus);

// Change job visibility
router.post("/change-visibility", protectCompany, changeJobVisibility);

export default router;