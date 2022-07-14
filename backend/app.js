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
const errorMiddleware = require('./middlewares/errors');


// ******* App Usages *************** //

app.use(express.json());

// Routes
app.use('/api/v1', products);

// Middleware to handle errors
app.use(errorMiddleware);



module.exports = app