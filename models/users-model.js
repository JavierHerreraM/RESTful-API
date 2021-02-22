const mongoose = require('mongoose');

// * It requires the username, firstName and lastName, they also have a minLength
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    }, 
    
    firstName: {
        type: String,
        required: true,
        minLength: 1
    }, 
    
    lastName: {
        type: String,
        require: true,
        minLength: 1
    }, 
    
    age: {
        type: Number
    }, 
    
    email: {
        type: String
    }
});

module.exports = mongoose.model('user', userSchema);