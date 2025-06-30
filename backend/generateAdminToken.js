import mongoose from "mongoose";
import readline from "readline";
import dotenv from "dotenv";
import AdminToken from "./src/models/AdminToken.js";
import { generateToken, hashToken } from "./src/utils/tokenUtils.js";

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  const name = await ask("Admin name: ");
  const role = await ask("Admin role (default: admin): ");
  const token = generateToken();
  const tokenHash = hashToken(token);

  const adminDoc = new AdminToken({
    tokenHash,
    name,
    role: role || "admin"
  });
  await adminDoc.save();

  console.log("\nAdmin token generated and saved to MongoDB.");
  console.log("Give this token securely to the admin:");
  console.log(token);

  rl.close();
  mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  rl.close();
  mongoose.disconnect();
}); 