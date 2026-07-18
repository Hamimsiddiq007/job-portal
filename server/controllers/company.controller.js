import Company from "../models/company.model.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";

// Register new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;

  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long",
    });
  }

  try {
    const companyExists = await Company.findOne({ email });

    if (companyExists) {
      return res
        .status(400)
        .json({ success: false, message: "Company already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
    });

    return res.status(201).json({
      success: true,
      message: "Company registered successfully",
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Company login
export const companyLogin = async (req, res) => {};

// Get company data
export const getCompanyData = async (req, res) => {};

// Post a new job
export const postJob = async (req, res) => {};

// Get company job applicants
export const getJobApplicants = async (req, res) => {};

// Get company posted jobs
export const getCompanyJobs = async (req, res) => {};

// Change job application status
export const changeApplicationStatus = async (req, res) => {};

// Change job visibility
export const changeJobVisibility = async (req, res) => {};
