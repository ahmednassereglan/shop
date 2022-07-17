const express = require('express');
const router = express.Router();

/**
 * Controllers Required
 */
const {
    registerUser,


} = require('../controllers/authController');


/**
 * GET Requests
 */



/**
 * POST Requests
 */
router.route('/register').post(registerUser);



/**
 * PUT Requests
 */


/**
 * DELETE Requests
 */


module.exports = router;