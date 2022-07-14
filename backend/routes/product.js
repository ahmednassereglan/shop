const express = require('express');
const router = express.Router();

/**
 * Controllers Required
 */
const { getProducts, newProduct, getSingleProduct } = require('../controllers/ProductController');

/**
 * GET Requests
 */
router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

/**
 * POST Requests
 */
router.route('/product/new').post(newProduct);




module.exports = router;