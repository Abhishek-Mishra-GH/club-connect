const express = require('express')
const { verifyClubToken, verifyToken } = require("../middlewares/authMiddleware")

const { 
  createEvent,
  getAllEvents,
  registerForEvent,
  getAllEventsByClubId
} = require('../controllers/eventController')

const router = express.Router()

router.post('/', verifyClubToken, createEvent);
router.get('/', getAllEvents)
router.get('/:clubId', getAllEventsByClubId)
router.post('/register', verifyToken, registerForEvent)

module.exports = router;