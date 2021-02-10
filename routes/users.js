const express = require('express');
const router = express.Router();
const User = require('../models/usersModel');
const validateUser = require('../validation/usersValidation');

// @desc    shows all users
// @route   GET /users
router.get('/', async (req, res) => {
    const users = await User.find().lean();
    res.status(200).send(users);
});

// @desc    shows one user
// @route   GET /users/:username
router.get('/:username', async (req, res) => {
    const users = await User.findOne({username: req.params.username}).lean();
    res.status(200).send(users);
});

// @desc    creates a user
// @route   POST /users
router.post('/', async (req, res) => {
    const newUser = new User({...req.body});
    const result = await newUser.save();
    res.status(200).send(result);
});

// @desc    updates a user
// @route   PUT /users/:username
router.put('/:username', async (req, res) => {
    await User.updateOne({username: req.params.username}, {
        $set: {...req.body}
    });
    res.status(200).send(`Username successfully updated.`);
});

// @desc    deletes a user
// @route   DELETE /users/:username
router.delete('/:username', async (req, res) => {
    const result = await User.deleteOne({username: req.params.username});
    res.status(200).send(`Successfully deleted`);
});

module.exports = router;