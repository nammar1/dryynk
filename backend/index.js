import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import adminAuthRouter from "./src/routes/adminAuth.js";  
import newsletterRouter from "./src/routes/newsletter.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Vite's default port
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("API Running"));

// Add ping endpoint
app.get("/api/ping", (req, res) => {
  res.json({ message: "pong", timestamp: new Date().toISOString() });
});

app.use('/api/admin', adminAuthRouter);
app.use('/api/newsletter', newsletterRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));