import { useState, useEffect } from "react";
import axios from "axios";

const usePosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const backend = process.env.NEXT_PUBLIC_BACKEND_SERVICE
        const response = await axios.get(`${backend}/api/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } 
    };

    fetchPosts();
  }, []);

  return [posts];
};

export default usePosts;
