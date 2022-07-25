const express = require('express');
const router = express.Router();

/**
 * Controllers Required
 */
const {
    registerUser,
    loginUser,
    logout,


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



/**
 * PUT Requests
 */


/**
 * DELETE Requests
 */


module.exports = router;