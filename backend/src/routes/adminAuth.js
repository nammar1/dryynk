import express from "express";
import { 
    login, 
    logout,
    getAllAdmins,
    getAdminStats,
    generateAdminToken,
    deleteAdmin
} from "../controllers/adminAuthController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

// Admin token login
router.post("/login", login);

// Admin logout
router.post("/logout", logout);

// Get current admin info (protected)
router.get("/me", authenticateAdmin, (req, res) => {
  res.json({ admin: req.admin });
});

// Get all admins (protected)
router.get("/all", authenticateAdmin, getAllAdmins);

// Get admin stats (protected)
router.get("/stats", authenticateAdmin, getAdminStats);

// Generate a new admin token (protected)
router.post("/generate", authenticateAdmin, generateAdminToken);

// Delete an admin (protected)
router.delete("/:id", authenticateAdmin, deleteAdmin);

export default router; 

// This file can be used to add more admin routes in the future
// make sure to add the route to the main index.js file (which is not created in this folder)