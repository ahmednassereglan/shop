const mongoose = require('mongoose');


// Connect MongoDB
const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URL, {
            useNewUrlParser: true,
            // useCreateIndex: true,
            useUnifiedTopology: true
        }).then(con => {
            console.log(`MongoDB Connection Succeeded With HOST: ${con.connection.host} , PORT: ${con.connection.port} .`)
        })
        .catch((error) => console.error("MongoDB connection failed:", error.message))

}

module.exports = connectDatabase