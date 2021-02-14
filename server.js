require('express-async-errors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const express = require('express');
const bodyParser = require('body-parser');
const errors = require('./errorHandling/errors');

// Load config
dotenv.config({ path: './config/.env' })

// connect to the database
connectDB();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/users', require('./routes/users'));

//error handling
app.use(errors);

const PORT  = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`App open in port: ${PORT}`);
})

module.exports = server;