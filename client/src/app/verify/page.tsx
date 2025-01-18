"use client"

import { useEffect, useState } from "react";
import axios from "axios";

const VerifyEmail = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  }, []);

  return <div className="w-full h-[100dvh] flex justify-center items-center">{loading ? "Please wait..." : message}</div>;
};

export default VerifyEmail;
