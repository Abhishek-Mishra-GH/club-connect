const express = require('express');
const { register, registerClub, login } = require('../controllers/authController');
const { verifyEmail } = require('../controllers/authEmailController')

const router = express.Router();

router.post('/register', register);
router.post('/register-club', registerClub);
router.post('/login', login);
router.get('/verify', verifyEmail);


module.exports = router;