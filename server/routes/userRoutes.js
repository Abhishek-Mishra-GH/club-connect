const exppress = require('express');
const { getAllUsers, getUserById } = require('../controllers/userController');
const { verifyToken } = require("../middlewares/authMiddleware");

const router = exppress.Router();

router.get('/', getAllUsers);
router.get('/jwt', verifyToken, getUserById);
router.get('/:id', getUserById);

module.exports = router;