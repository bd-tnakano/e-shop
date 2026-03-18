const express = require('express');
const router = express.Router();
const { getUser, updateUser, createUser, loginUser } = require('../controllers/users');
const { protect } = require('../middleware/auth');

router.route('/').post(createUser);
router.route('/login').post(loginUser);
router.route('/:id').get(getUser).put(protect, updateUser);

module.exports = router;
