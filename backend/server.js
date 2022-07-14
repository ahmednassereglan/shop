const app = require('./app');
const connectDatabase = require('./config/database');
/**
 * Required External modules
 */
const dotenv = require('dotenv');


//Setting up config file
dotenv.config({ path: 'backend/config/config.env' })

//Connecting to database
connectDatabase();



app.listen(process.env.PORT, () => {
    console.log(`Server started on Port : ${process.env.PORT} in ${process.env.NODE_ENV} mode and Listening to requests on http://localhost:${process.env.PORT} .`);
})