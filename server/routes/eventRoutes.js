const express = require('express')
const router = express.Router()

const { createEvent } = require('../controllers/eventController')
const { verifyClubToken } = require("../middlewares/authMiddleware")

router.post('/', verifyClubToken, createEvent);

module.exports = router;