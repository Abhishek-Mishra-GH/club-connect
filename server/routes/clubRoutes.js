const express = require('express');
const { getAllClubs, getClubById } = require('../controllers/clubController');

const router = express.Router();

router.get('/', getAllClubs);
router.get('/:id', getClubById);

module.exports = router;