const router = require('express').Router();
const { createOrder, getOrders } = require('../controllers/orders');
const validateToken = require('../middleware/auth');

router.post('/create', validateToken, createOrder);

router.get('/:userid', validateToken, getOrders);

module.exports = router;