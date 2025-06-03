import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";

// Load environment variables
dotenv.config();

// Internal modules
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

// Route files
import userRoutes from "./routes/user.routes.js";
import timetableRoutes from "./routes/timetable.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import specializationRoutes from "./routes/specialization.routes.js";
import emailRoutes from "./routes/email.routes.js";

// Constants
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// Initialize app
const app = express();
connectDB();

// Handle __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.static(path.join(__dirname, "../public")));
app.use(cors({ origin: process.env.ALLOWED_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/timetables", timetableRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/specializations", specializationRoutes);
app.use("/api", emailRoutes);

// Swagger setup
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "swagger.json"), "utf-8")
);

// Dynamically set Swagger server URL
swaggerDocument.servers = [
  {
    url: `${BASE_URL}/api`,
    description:
      process.env.NODE_ENV === "production" ? "Production" : "Development",
  },
];
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Homepage route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server started at ${BASE_URL}`);
  console.log(`📘 Swagger docs available at ${BASE_URL}/api-docs`);
});
