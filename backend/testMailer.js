import dotenv from "dotenv";
dotenv.config();
import { sendThankYouEmail } from "./src/utils/mailer.js";

const testEmail = process.env.EMAIL_USER;

sendThankYouEmail(testEmail)
  .then(info => {
    console.log("Test email sent! Message ID:", info.messageId);
    process.exit(0);
  })
  .catch(err => {
    console.error("Error sending test email:", err);
    process.exit(1);
  }); 