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
const errorMiddleware = require('./middlewares/errors');
const products = require('./routes/product');
const auth = require('./routes/auth');

// ******* App Usages *************** //

app.use(express.json());

// Routes
app.use('/api/v1', products);
app.use('/api/v1', auth);

// Middleware to handle errors
app.use(errorMiddleware);



module.exports = app