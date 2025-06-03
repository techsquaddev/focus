import jwt from "jsonwebtoken";
import sendEmail from "./sendEmail.js";

const generateMagicLink = async (userId, email) => {
  try {
    // Generate the token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    // Construct the magic link
    const magicLink = `${process.env.ALLOWED_ORIGIN}/verify/login?token=${token}`;

    // Send Magic Link
    await sendEmail(
      email,
      "Your Magic Login Link",
      `Click this link to log in: ${magicLink}`
    );

    // console.log(`Magic link sent to ${email}`);
  } catch (error) {
    // console.error("Error sending magic link:", error.message);
    throw new Error("Failed to send magic link.");
  }
};

export default generateMagicLink;
