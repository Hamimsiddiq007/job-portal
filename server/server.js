import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectBD from "./config/database.js";
import { clerkWebhooks } from "./controllers/webhooks.controller.js";
import companyRoutes from "./routes/company.route.js";
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from "./routes/job.route.js";
import userRoutes from "./routes/user.route.js";

// Initialize express
const app = express();

await connectBD()
await connectCloudinary()

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("API Working!"));
app.post('/webhooks', clerkWebhooks)
app.use("/api/company", companyRoutes)
app.use("/api/jobs", jobRoutes)
app.use("/api/users", userRoutes)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));