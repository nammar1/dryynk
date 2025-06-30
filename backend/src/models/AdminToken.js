import mongoose from "mongoose";

const AdminTokenSchema = new mongoose.Schema({
  tokenHash: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "admin"
  },
  lastLoginAt: {
    type: Date
  },
  status: {
    type: String,
    enum: ["active", "revoked"],
    default: "active"
  },
  createdBy: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date
  }
});

export default mongoose.model("AdminToken", AdminTokenSchema); 