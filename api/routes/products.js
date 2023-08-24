const router = require('express').Router();
const { createProduct, getAllProducts, getProduct } = require('../controllers/products');

router.post('/create', createProduct);

router.get('/:productId', getProduct);

router.get('/', getAllProducts);

module.exports = router;