const mongoose = require('mongoose');

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
    
    mail: {
        type: String
    }
});

module.exports = mongoose.model('user', userSchema);