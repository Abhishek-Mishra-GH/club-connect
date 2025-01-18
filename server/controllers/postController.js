const { createPost, getAllPostsByFollowers, getAllPosts, getAllPostsByClubId } = require("../services/postService");


const createPostController = async (req, res) => {
  const { clubId, content } = req.body;
  const file = req.file; 

  try {
    const post = await createPost(clubId, content, file);
    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllPostsByFollowersController = async (req, res) => {
  const { userId } = req.params;

  try {
    const posts = await getAllPostsByFollowers(userId);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts by followers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllPostsController = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllPostsByClubIdController = async (req, res) => {
  const clubId = req.params.clubId;

  try {
    const posts = await getAllPostsByClubId(clubId);
    res.status(200).json(posts)
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createPostController,
  getAllPostsByFollowersController,
  getAllPostsController,
  getAllPostsByClubIdController
};
