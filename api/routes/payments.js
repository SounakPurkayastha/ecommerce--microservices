const router = require('express').Router();
const { pay } = require('../controllers/payments');
const validateToken = require('../middleware/auth');

router.post('/', validateToken, pay);

module.exports = router;