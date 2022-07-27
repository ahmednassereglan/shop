const express = require('express');
const router = express.Router();

/**
 * Controllers Required
 */
const {
    newOrder,
    getSingleOrder,
    myOrders,
    allOrders,
    updateOrder,
    deleteOrder,
} = require('../controllers/orderController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

/**
 * GET Requests
 */
router.route('/admin/orders/').get(isAuthenticatedUser, authorizeRoles('admin'), allOrders);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);

/**
 * POST Requests
 */
router.route('/order/new').post(isAuthenticatedUser, newOrder);

/**
 * PUT Requests
 */
router.route('/admin/order/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder);

/**
 * DELETE Requests
 */
router.route('/admin/order/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);




module.exports = router;