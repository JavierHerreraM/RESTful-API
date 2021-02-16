const dotenv = require('dotenv');
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const errors = require('./error-handling/errors');

// * Load config
dotenv.config({ path: './config/.env' })

// * Add winston transporters for mongoDB, file(in case of ENV=production) and console for all ENV
if(process.env.NODE_ENV === 'production') {
    winston.add(new winston.transports.MongoDB({
        db: process.env.MONGO_URI,
        options: { useUnifiedTopology: true },
        handleExceptions: true,
        handleRejections: true
    }));
    winston.add(new winston.transports.File({
        filename: './error-handling/logfile.log',
        handleExceptions: true,
        handleRejections: true
      }));
}
winston.add(new winston.transports.Console({
    format: winston.format.simple(),
    handleExceptions: true,
    handleRejections: true
}));

// * connect to the database
connectDB();

const app = express();

// * middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./middleware/check-DB'));

// * routes
app.use('/users', require('./routes/users'));

// *error handling
app.use(errors);

const PORT  = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`App open in port: ${PORT}`);
})

module.exports = server;