const express = require("express");
const { saveProfile } = require("../controllers/profileController");
const { upload } = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.put("/save-profile", upload.single("avatar"), saveProfile);

module.exports = router;
