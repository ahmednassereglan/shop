// app.js

/**
 * Required External modules
 */

const express = require('express');


/**
 * App Variables
 */

const app = express();



// ******* App Routes ********** //
const products = require('./routes/product');


// ******* App Usages *************** //
app.use(express.json());


// app.use(products);
app.use('/api/v1', products);



module.exports = app