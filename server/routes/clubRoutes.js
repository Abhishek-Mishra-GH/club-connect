const express = require('express');
const { getAllClubs, getClubById } = require('../controllers/clubController');
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get('/', getAllClubs);
router.get('/:id', getClubById);
router.post('/follow', verifyToken, followClub);

module.exports = router;