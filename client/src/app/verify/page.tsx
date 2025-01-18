"use client"

import { useEffect, useState } from "react";
import axios from "axios";

const VerifyEmail = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const type = queryParams.get("type");
    const token = queryParams.get("token");

    const verify = async () => {
      try {
        const backend = process.env.NEXT_PUBLIC_BACKEND_SERVICE
        const url = `${backend}/api/auth/verify?type=${type}&token=${token}`
        const response = await axios.get(url);
        setMessage(response.data.message);
      } catch (error: any) {
        setMessage(error.response?.data?.message || "An error occurred.");
      }
    };

    verify();
  }, []);

  return <div>{message}</div>;
};

export default VerifyEmail;
