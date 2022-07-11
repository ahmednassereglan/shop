const app = require('./app');

/**
 * Required External modules
 */
const dotenv = require('dotenv');


//Setting up config file
dotenv.config({ path: 'backend/config/config.env' })



app.listen(process.env.PORT, () => {
    console.log(`Server started on Port : ${process.env.PORT} in ${process.env.NODE_ENV} mode and Listening to requests on http://localhost:${process.env.PORT} .`);
})