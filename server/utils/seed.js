const prisma = require("../prisma/prisma");
const { generateVerificationToken } = require("../services/authEmailService");

const sendVerificationEmails = async () => {
  try {
    const users = await prisma.user.findMany({ where: { isVerified: false } });
    const clubs = await prisma.club.findMany({ where: { isVerified: false } });

    for (const user of users) {
      await generateVerificationToken("user", user.id, user.email);
      console.log(`Verification email sent to user: ${user.email}`);
    }

    for (const club of clubs) {
      await generateVerificationToken("club", club.id, club.email);
      console.log(`Verification email sent to club: ${club.email}`);
    }

    console.log("Verification emails sent to all users and clubs.");
    process.exit(0);
  } catch (error) {
    console.error("Error sending verification emails:", error);
    process.exit(1);
  }
};

const testSend = async () => {
  const user = prisma.user.findUnique({
    where: {
      email: "cs.abhishekmo@gmail.com"
    },
    select: {
      email: true,
    }
  })

  await generateVerificationToken("user", user.id, user.email);
  console.log(`Verification email sent to club: ${user.email}`);
}

const run = async () => {
  await testSend();
};

run();