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

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

/**
 * GET Requests
 */
router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

/**
 * POST Requests
 */
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);

/**
 * PUT Requests
 */
router.route('/admin/product/edit/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct);

/**
 * DELETE Requests
 */
router.route('/admin/product/delete/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);




module.exports = router;