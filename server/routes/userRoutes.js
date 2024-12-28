const exppress = require('express');
const { getAllUsers, getUserById } = require('../controllers/userController');

const router = exppress.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);

module.exports = router;