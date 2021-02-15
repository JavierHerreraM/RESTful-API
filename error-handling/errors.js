const winston = require('winston');

module.exports = (error, req, res, next) => {
    winston.error(error.message, {metadata: error });
    res.status(500).send("Server error, something failed");
}