const express = require('express')
const { verifyClubToken, verifyToken } = require("../middlewares/authMiddleware")

const { 
  createEvent,
  getAllEvents,
  registerForEvent,
  getAllEventsByClubId
} = require('../controllers/eventController');
const { upload } = require("../middlewares/uploadMiddleware");

const router = express.Router()

router.post('/', upload.single("image"), verifyClubToken, createEvent);
router.get('/', getAllEvents)
router.get('/:clubId', getAllEventsByClubId)
router.post('/register', verifyToken, registerForEvent)

module.exports = router;