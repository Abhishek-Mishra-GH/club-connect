const express = require('express');
const { register, registerClub, login } = require('../controllers/authController');
const { verifyEmail } = require('../controllers/authEmailController')

const router = express.Router();

router.get('/verify', verifyEmail);
router.post('/register', register);
router.post('/register-club', registerClub);
router.post('/login', login);


module.exports = router;