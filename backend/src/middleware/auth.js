import jwt from "jsonwebtoken";

export function authenticateAdmin(req, res, next) {
  const token = req.cookies.admin_jwt;
  if (!token) {
    return res.status(401).json({ error: "Missing authentication token" });
  }
  try {
    const jwtSecret = process.env.JWT_SECRET || "changeme";
    const decoded = jwt.verify(token, jwtSecret);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
} 