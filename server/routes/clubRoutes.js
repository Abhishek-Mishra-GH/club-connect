const express = require("express");
const {
  getAllClubs,
  getClubById,
  followClub,
  getClubFollowersById,
  unfollowClub,
} = require("../controllers/clubController");
const { verifyToken, verifyClubToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getAllClubs);
router.get("/jwt", verifyClubToken, getClubById);
router.get("/:id", getClubById);
router.get("/:id/followers", getClubFollowersById);
router.post("/follow", verifyToken, followClub);
router.post("/unfollow", verifyToken, unfollowClub);

module.exports = router;
