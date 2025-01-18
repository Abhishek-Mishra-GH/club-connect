const prisma = require("../prisma/prisma");

const run = async () => {
  const users = await prisma.user.findMany();

  const clubs = await prisma.club.findMany();

  console.log(users);
  console.log("D");
  console.log(clubs);
};

run();