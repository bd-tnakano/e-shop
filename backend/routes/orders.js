const express = require('express');
const router = express.Router();
const { createOrder, getOrder } = require('../controllers/orders');
const { protect } = require('../middleware/auth');

router.route('/').post(protect, createOrder);
router.route('/:id').get(protect, getOrder);

module.exports = router;
