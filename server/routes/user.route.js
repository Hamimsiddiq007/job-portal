import express from "express";
import { applyForJob, getUserApplications, getUserData, updateUserProfile } from "../controllers/user.controller.js";
import upload from "../config/multer.js";

const router = express.Router();

// Get user data
router.get("/user", getUserData);

// Apply for a job
router.post("/apply", applyForJob);

// Get user applications
router.get("/applications", getUserApplications);

// Update user profile
router.post("/update-resume", upload.single("resume"), updateUserProfile);

export default router;