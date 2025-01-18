const prisma  = require("../prisma/prisma");

exports.verifyEmail = async (req, res) => {
  const { type, token } = req.query;

  if (!token || !type) {
    return res.status(400).json({ message: "Token or type is missing." });
  }

  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!verificationToken || verificationToken.expiresAt < new Date()) {
    return res.status(400).json({ message: "Invalid or expired token." });
  }

  if (type === "user") {
    await prisma.user.update({
      where: { id: verificationToken.userId },
      data: { isVerified: true },
    });
  } else if (type === "club") {
    await prisma.club.update({
      where: { id: verificationToken.clubId },
      data: { isVerified: true },
    });
  }

  // Delete the used token
  await prisma.verificationToken.delete({ where: { token } });

  res.json({ message: "Email successfully verified!" });
};
