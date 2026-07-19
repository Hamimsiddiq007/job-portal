import User from "../models/user.model.js";

// Get user data
export const getUserData = async (req, res) => {
    const userId = req.auth.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Apply for a job
export const applyForJob = async (req, res) => {};

// Get user applications
export const getUserApplications = async (req, res) => {};

// Update user profile
export const updateUserProfile = async (req, res) => {};