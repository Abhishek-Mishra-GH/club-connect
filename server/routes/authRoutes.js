const express = require('express');
const { register, registerClub, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/register-club', registerClub);
router.post('/login', login);


module.exports = router;