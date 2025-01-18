const express = require("express");
const { createPostController, getAllPostsController, getAllPostsByFollowersController, getAllPostsByClubIdController } = require("../controllers/postController");
const { upload } = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Create a new post
router.post("/create", upload.single("image"), createPostController);

router.get("/", getAllPostsController);
router.get("/:clubId", getAllPostsByClubIdController);

// Get posts by clubs followed by the user
router.get("/followers/:userId", getAllPostsByFollowersController);

module.exports = router;
