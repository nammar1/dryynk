import crypto from "crypto";

// Generate a secure random token (32 bytes, hex encoded)
export function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

// Hash a token using SHA-256 (hex output)
export function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

// Constant-time comparison for hashes
export function timingSafeEqual(hashA, hashB) {
  const bufA = Buffer.from(hashA, "hex");
  const bufB = Buffer.from(hashB, "hex");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
} 