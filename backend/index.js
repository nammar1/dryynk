import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import adminAuthRouter from "./src/routes/adminAuth.js";  
import newsletterRouter from "./src/routes/newsletter.js";

dotenv.config();
const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://dryynk.com',
  'https://www.dryynk.com'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // if you use cookies/sessions
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