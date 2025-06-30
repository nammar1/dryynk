import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendThankYouEmail(to) {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Thank you for subscribing to dryynk!",
    text: `Thank you for subscribing to our newsletter. We'll keep you updated with the latest news and offers from dryynk!`,
    html: `<p>Thank you for subscribing to our newsletter. We'll keep you updated with the latest news and offers from <b>dryynk</b>!</p>`
  });
} 