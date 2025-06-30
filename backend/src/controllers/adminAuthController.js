import AdminToken from "../models/AdminToken.js";
import SystemStat from "../models/SystemStat.js";
import { hashToken } from "../utils/tokenUtils.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const FAILED_LOGINS_KEY = "failedAdminLogins";

export async function login(req, res) {
  const { token } = req.body;
  if (!token) {
    await SystemStat.increment(FAILED_LOGINS_KEY);
    return res.status(400).json({ error: "Token required" });
  }

  const tokenHash = hashToken(token);
  const admin = await AdminToken.findOne({ tokenHash });

  if (!admin || admin.status !== 'active') {
    await SystemStat.increment(FAILED_LOGINS_KEY);
    return res.status(401).json({ error: "Invalid or inactive token" });
  }
  
  admin.lastLoginAt = new Date();
  await admin.save();

  // Issue JWT (expires in 1 day)
  const payload = { adminId: admin._id, name: admin.name, role: admin.role };
  const jwtSecret = process.env.JWT_SECRET || "changeme";
  const jwtToken = jwt.sign(payload, jwtSecret, { expiresIn: "1d" });

  // Set JWT as HTTP-only cookie
  res.cookie("admin_jwt", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.json({ admin: { name: admin.name, role: admin.role } });
}

export function logout(req, res) {
  res.clearCookie("admin_jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });
  res.json({ message: "Logged out" });
}

export async function getAllAdmins(req, res) {
  try {
    const admins = await AdminToken.find({}, "name role createdAt lastLoginAt status expiresAt createdBy").sort({createdAt: -1});
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch admins" });
  }
}

export async function getAdminStats(req, res) {
  try {
    const failedLogins = await SystemStat.get(FAILED_LOGINS_KEY, 0);
    const totalAdmins = await AdminToken.countDocuments();
    // More stats can be added here
    res.json({ failedLogins, totalAdmins });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch admin stats" });
  }
}

export async function generateAdminToken(req, res) {
  const { name, expiresAt } = req.body;
  if (!name) return res.status(400).json({ error: "Admin name required" });

  try {
    const plainTextToken = crypto.randomBytes(24).toString("hex");
    const tokenHash = hashToken(plainTextToken);

    const newAdmin = new AdminToken({
      name,
      tokenHash,
      expiresAt: expiresAt ? new Date(expiresAt) : undefined,
      createdBy: req.admin?.name || "Unknown"
    });
    await newAdmin.save();

    res.status(201).json({
      message: "New admin token generated. This is the only time it will be shown.",
      token: plainTextToken,
      admin: {
        _id: newAdmin._id,
        name: newAdmin.name,
        role: newAdmin.role,
        createdAt: newAdmin.createdAt,
        status: newAdmin.status,
        expiresAt: newAdmin.expiresAt,
        createdBy: newAdmin.createdBy,
      },
    });
  } catch (error) {
     if (error.code === 11000) {
      return res.status(409).json({ error: "An admin with this token hash already exists. Please try again." });
    }
    res.status(500).json({ error: "Failed to generate token" });
  }
}

export async function deleteAdmin(req, res) {
  const { id } = req.params;
  const loggedInAdminId = req.admin.adminId;
  
  if (id === loggedInAdminId) {
      return res.status(400).json({ error: "You cannot delete your own account." });
  }

  try {
    const totalAdmins = await AdminToken.countDocuments();
    if (totalAdmins <= 1) {
      return res.status(400).json({ error: "Cannot delete the last admin." });
    }

    const adminToDelete = await AdminToken.findByIdAndDelete(id);
    if (!adminToDelete) {
      return res.status(404).json({ error: "Admin not found." });
    }

    res.json({ message: `Admin '${adminToDelete.name}' has been deleted.` });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete admin." });
  }
} 