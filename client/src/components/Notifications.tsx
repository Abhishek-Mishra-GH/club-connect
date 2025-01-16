"use client"

import { useEffect, useState } from "react";
import axios from "axios";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userid");
    const backend = process.env.NEXT_PUBLIC_BACKEND_SERVICE;

    axios.get(`${backend}/api/notifications?userId=${userId}`)
      .then((response) => setNotifications(response.data))
      .catch((error) => console.error("Error fetching notifications:", error));
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.map((notif: any) => (
        <div key={notif.id} style={{ background: notif.isRead ? "#f0f0f0" : "#fff" }}>
          <p>{notif.content}</p>
        </div>
      ))}
    </div>
  );
}
