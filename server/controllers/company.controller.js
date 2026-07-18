import Company from "../models/company.model.js";
import bcrypt from "bcrypt";

// Register new company
export const registerCompany = async (req, res) => {
    const {name, email, password} = req.body;

    const imageFile = req.file;

    if(!name || !email || !password || !imageFile) {
        return res.status(400).json({success: false, message: "All fields are required"});
    }

    try {
        const companyExists = await Company.findOne({email});

        if(companyExists) {
            return res.status(400).json({success: false, message: "Company already registered"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
        
    }
}

// Company login
export const companyLogin = async (req, res) => {

}

// Get company data
export const getCompanyData = async (req, res) => {
    
}

// Post a new job
export const postJob = async (req, res) => {

}

// Get company job applicants
export const getJobApplicants = async (req, res) => {

}

// Get company posted jobs
export const getCompanyJobs = async (req, res) => {

}

// Change job application status
export const changeApplicationStatus = async (req, res) => {

}

// Change job visibility
export const changeJobVisibility = async (req, res) => {

}