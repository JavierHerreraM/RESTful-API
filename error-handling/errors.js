const winston = require('winston');

// * This gets all the catch from the route request
module.exports = (error, req, res, next) => {
    winston.error(error.message, {metadata: error });
    res.status(500).send("Server error, something failed");
};