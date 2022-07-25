const express = require('express');
const router = express.Router();

/**
 * Controllers Required
 */
const {
    registerUser,
    loginUser,


} = require('../controllers/authController');


/**
 * GET Requests
 */



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