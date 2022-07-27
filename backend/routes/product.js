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
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview,
} = require('../controllers/ProductController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

/**
 * GET Requests
 */
router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/reviews').get(isAuthenticatedUser, getProductReviews);

/**
 * POST Requests
 */
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);

/**
 * PUT Requests
 */
router.route('/admin/product/edit/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct);
router.route('/review').put(isAuthenticatedUser, createProductReview);

/**
 * DELETE Requests
 */
router.route('/admin/product/delete/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);
router.route('/reviews').delete(isAuthenticatedUser, deleteReview);




module.exports = router;