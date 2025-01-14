const prisma = require("../prisma/prisma");

const updateProfile = async (type, id, data, avatarUrl) => {
  if (type === "club") {
    return await prisma.club.update({
      where: { id },
      data: {
        ...data,
        avatar: avatarUrl || undefined,
      },
    });
  } else {
    return await prisma.user.update({
      where: { id },
      data: {
        ...data,
        avatar: avatarUrl || undefined,
      },
    });
  }
};

module.exports = { updateProfile };
