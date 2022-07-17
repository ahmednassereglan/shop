const app = require('./app');
const connectDatabase = require('./config/database');

/**
 * Required External modules
 */
const dotenv = require('dotenv');
// Handle Uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
})

//Setting up config file
dotenv.config({ path: 'backend/config/config.env' })

//Connecting to database
connectDatabase();





const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on Port : ${process.env.PORT} in ${process.env.NODE_ENV} mode and Listening to requests on http://localhost:${process.env.PORT} .`);
})

// Handle Unhandled Promise rejections
process.on('unhandledRejection', (err, p) => {
    console.log(`ERROR: ${err.stack}`);
    logger.error('Unhandled rejection', { err: reason, p: promise })
    server.close(() => {
        process.exit(1)
    })
})