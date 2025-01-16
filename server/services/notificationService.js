const prisma = require("../prisma/prisma");

const sendNotification = async ({ userId, clubId, content }) => {
  return await prisma.notification.create({
    data: {
      content,
      userId,
      clubId,
    },
  });
};

const getNotifications = async (userId) => {
  return await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

const markAsRead = async (notificationId) => {
  return await prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true },
  });
};

module.exports = { sendNotification, getNotifications, markAsRead };
