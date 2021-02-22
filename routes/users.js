const express = require('express');
const router = express.Router();
const Users = require('../models/users-model');
const validateUsers = require('../validation/users-validation');

// * desc    shows all users
// * route   GET /users
router.get('/', async (req, res) => {
    const users = await Users.find().lean();

    res.status(200).send(users);
});

// * desc    shows one user
// * route   GET /users/:username
router.get('/:username', async (req, res) => {
    const user = await Users.findOne({username: req.params.username}).lean();

    // * Checks if there is no user
    if(!user) return res.status(404).send(`The username ${req.params.username} was not found.`);

    res.status(200).send(user);
});

// * desc    creates a user
// * route   POST /users
router.post('/', async (req, res) => {
    // * Validates the body of the request, if there is an error it send it
    const { error } = validateUsers(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    // * Checks if the username already exists
    let usernameExists = await Users.findOne({ username: req.body.username });
    if (usernameExists) return res.status(400).send('The username already exists.');

    const newUser = new Users({...req.body});
    const result = await newUser.save();
    res.status(200).send(result);
});

// * desc    updates a user
// * route   PUT /users/:username
router.put('/:username', async (req, res) => {
    // * Validates the body of the request, if there is an error it send it
    const { error } = validateUsers(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    // * Checks if the username already exists
    let usernameExists = await Users.findOne({ username: req.body.username });
    if (usernameExists) return res.status(400).send('The username already exists.');

    // * Finds and updates the user returning the new modified document
    const updatedUser = await Users.findOneAndUpdate(
        { username: req.params.username }, 
        { $set: {...req.body} },
        { new: true }
    ).lean();

    // * Checks if no user was found
    if(!updatedUser) return res.status(404).send(`The username ${req.params.username} was not found.`);

    res.status(200).send(updatedUser);
});

// * desc    deletes a user
// * route   DELETE /users/:username
router.delete('/:username', async (req, res) => {
    const deletedUser = await Users.findOneAndDelete({username: req.params.username});

    // * Checks if no user was found
    if(!deletedUser) return res.status(404).send(`The username ${req.params.username} was not found.`);

    res.status(200).send(deletedUser);
});

module.exports = router;