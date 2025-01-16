const express = require("express");
const { createPostController, getAllPostsController, getAllPostsByFollowersController } = require("../controllers/postController");
const { upload } = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Create a new post
router.post("/create", upload.single("image"), createPostController);

router.get("/", getAllPostsController);

// Get posts by clubs followed by the user
router.get("/followers/:userId", getAllPostsByFollowersController);

module.exports = router;
