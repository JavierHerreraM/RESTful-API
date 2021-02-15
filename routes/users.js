const express = require('express');
const router = express.Router();
const User = require('../models/usersModel');
const validateUsers = require('../validation/usersValidation');

// * desc    shows all users
// * route   GET /users
router.get('/', async (req, res) => {
    const users = await User.find().lean();
    
    res.status(200).send(users);
});

// * desc    shows one user
// * route   GET /users/:username
router.get('/:username', async (req, res) => {
    const user = await User.findOne({username: req.params.username}).lean();

    // * Checks if there is no user
    if(!user) return res.status(404).send(`The user ${req.params.username} was not found.`);

    res.status(200).send(user);
});

// * desc    creates a user
// * route   POST /users
router.post('/', async (req, res) => {
    // * Validates the body of the request
    const { error } = validateUsers(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    // * Checks if the username already exists
    let usernameExists = await User.findOne({ username: req.body.username });
    if (usernameExists) return res.status(400).send('Username already exist.');

    const newUser = new User({...req.body});
    const result = await newUser.save();
    res.status(200).send(result);
});

// * desc    updates a user
// * route   PUT /users/:username
router.put('/:username', async (req, res) => {
    // * Validates the body of the request
    const { error } = validateUsers(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    // * Finds and updates the user returning the new modified document
    const updatedUser = await User.findOneAndUpdate(
        { username: req.params.username }, 
        { $set: {...req.body} },
        { new: true }
    ).lean();

    // * Checks if no user was found
    if(!updatedUser) return res.status(404).send(`The user ${req.params.username} was not found.`);

    res.status(200).send(updatedUser);
});

// * desc    deletes a user
// * route   DELETE /users/:username
router.delete('/:username', async (req, res) => {
    const deletedUser = await User.findOneAndDelete({username: req.params.username});

    // * Checks if no user was found
    if(!deletedUser) return res.status(404).send(`The user ${req.params.username} was not found.`);

    res.status(200).send(deletedUser);
});

module.exports = router;