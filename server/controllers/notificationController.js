const { sendNotification, getNotifications, markAsRead } = require("../services/notificationService");

const createNotification = async (req, res) => {
  const { userId, clubId, content } = req.body;

  try {
    const notification = await sendNotification({ userId, clubId, content });
    res.status(201).json(notification);
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const fetchNotifications = async (req, res) => {
  const { userId } = req.query;

  try {
    const notifications = await getNotifications(userId);
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const markNotificationRead = async (req, res) => {
  const { notificationId } = req.params;

  try {
    const notification = await markAsRead(notificationId);
    res.status(200).json(notification);
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createNotification, fetchNotifications, markNotificationRead };
