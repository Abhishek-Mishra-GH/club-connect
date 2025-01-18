const crypto = require("crypto");
const prisma = require("../prisma/prisma");
const { sendEmail } = require("./emailService");

const generateVerificationToken = async (type, id, email) => {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Token valid for 30 days

  await prisma.verificationToken.create({
    data: type === "user"
      ? { userId: id, token, expiresAt }
      : { clubId: id, token, expiresAt },
  });

  const verificationUrl = `https://club-connect-five.vercel.app/verify?type=${type}&token=${token}`;

  await sendEmail(email, "Verify your email", `
    Thank you for registering with ClubConnect\n
    Click ${verificationUrl} to verify your account.\n
  `);

  return true;
};
module.exports = { generateVerificationToken };
