const mongoose = require('mongoose');

// * Makes the connection with the db, if the ENV is testing the db string will be a local one
const connectDB = async () => {
try {
    let connection;
    if(process.env.NODE_ENV === 'testing') {
        connection = await mongoose.connect(process.env.LOCAL_MONGO_URI, { 
            useNewUrlParser: true,
            useUnifiedTopology: true
         });
    } else {
        connection = await mongoose.connect(process.env.MONGO_URI, { 
            useNewUrlParser: true,
            useUnifiedTopology: true
         });
    }
    console.log(`MongoDB connected: ${connection.connection.host}`);
} catch (error) {
    // * If for some reason it doesn't connect it terminates the process with a code of failure
    console.log(error);
    process.exit(1);
}
}

module.exports = connectDB;