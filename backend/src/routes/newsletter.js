import express from "express";
import Subscriber from "../models/Subscriber.js";
import { sendThankYouEmail } from "../utils/mailer.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

// POST /api/newsletter/subscribe
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ success: false, error: "Invalid email address." });
  }
  try {
    let subscriber = await Subscriber.findOne({ email });
    if (!subscriber) {
      subscriber = new Subscriber({ email });
      await subscriber.save();
      await sendThankYouEmail(email);
    }
    // If already exists, do not error, just return success (idempotent)
    return res.json({ success: true });
  } catch (err) {
    // Handle duplicate key error gracefully
    if (err.code === 11000) {
      return res.json({ success: true });
    }
    console.error(err);
    return res.status(500).json({ success: false, error: "Server error." });
  }
});

// GET /api/newsletter/stats (admin only)
router.get("/stats", authenticateAdmin, async (req, res) => {
  try {
    const total = await Subscriber.countDocuments();
    const since = new Date();
    since.setDate(since.getDate() - 30);
    const recent = await Subscriber.countDocuments({ createdAt: { $gte: since } });
    // Placeholder for open rate
    const openRate = null;
    res.json({ total, recent, openRate });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// GET /api/newsletter/subscribers (admin only)
router.get("/subscribers", authenticateAdmin, async (req, res) => {
  try {
    const subscribers = await Subscriber.find({}, { email: 1, createdAt: 1, _id: 0 }).sort({ createdAt: -1 });
    res.json({ subscribers });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subscribers" });
  }
});

export default router; 