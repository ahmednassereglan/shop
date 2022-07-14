const express = require('express');
const router = express.Router();

/**
 * Controllers Required
 */
const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/ProductController');

/**
 * GET Requests
 */
router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

/**
 * POST Requests
 */
router.route('/admin/product/new').post(newProduct);

/**
 * PUT Requests
 */
router.route('/admin/product/edit/:id').put(updateProduct);

/**
 * DELETE Requests
 */
router.route('/admin/product/delete/:id').delete(deleteProduct);




module.exports = router;