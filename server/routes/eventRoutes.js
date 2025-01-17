const express = require('express')
const { verifyClubToken, verifyToken } = require("../middlewares/authMiddleware")

const { 
  createEvent,
  getAllEvents,
  registerForEvent,
  getAllEventsByClubId,
  getEventStats,
  deleteEventById
} = require('../controllers/eventController');
const { upload } = require("../middlewares/uploadMiddleware");

const router = express.Router()

router.post('/', upload.single("image"), verifyClubToken, createEvent);
router.get('/', getAllEvents);
router.post('/stats/:eventId', verifyClubToken, getEventStats);
router.get('/:clubId', getAllEventsByClubId)
router.post('/register', verifyToken, registerForEvent)
router.delete('/:eventId', verifyClubToken, deleteEventById)

module.exports = router;