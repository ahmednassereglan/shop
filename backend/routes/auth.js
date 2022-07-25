const express = require('express');
const router = express.Router();

/**
 * Controllers Required
 */
const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,


} = require('../controllers/authController');


/**
 * GET Requests
 */
router.route('/logout').get(logout);



/**
 * POST Requests
 */
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);



/**
 * PUT Requests
 */
router.route('/password/reset/:token').put(resetPassword);


/**
 * DELETE Requests
 */


module.exports = router;