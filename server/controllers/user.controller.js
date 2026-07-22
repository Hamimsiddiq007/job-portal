import Application from "../models/application.model.js";
import User from "../models/user.model.js";
import Job from "../models/job.model.js";
import {v2 as cloudinary} from 'cloudinary'
import { getAuth } from "@clerk/express";

// Get user data
export const getUserData = async (req, res) => {
    const { userId } = getAuth(req);

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Apply for a job
export const applyForJob = async (req, res) => {
  const { jobId } = req.body;

  const userId = req.auth.userId;
  try {
    const isApplied = await Application.findOne({ jobId, userId });
    if (isApplied) {
      return res
        .status(400)
        .json({
          success: false,
          message: "You have already applied for this job",
        });
    }

    const jobData = await Job.findById(jobId);
    if (!jobData) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    await Application.create({
      companyId: jobData.companyId,
      jobId,
      userId,
      date: Date.now(),
    });

    res
      .status(200)
      .json({ success: true, message: "Application submitted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user applications
export const getUserApplications = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const applications = await Application.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category salary level")
      .exec();

      if(!applications){
        return res
        .status(404)
        .json({ success: false, message: "No applications found" });
      }

    res.status(200).json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const resumeFile = req.resumeFile;
        const userData = await User.findById(userId);

        if(resumeFile){
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
            userData.resume = resumeUpload.secure_url;
        }

        await userData.save();

        res.status(200).json({ success: true, message: "Resume updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
