const Users = require('../models/users-model');

module.exports = async (req, res, next) => {

    // * Checks if the collection is empty, if it IS empty it creates 10 generic users
    const users = await Users.find().lean();
    if(users.length === 0) {

        let newUsers = [];
        let randomNumber = 0;

        for (let i = 1; i <= 10; i++) {

            // * Creates a random number for the age
            randomNumber = Math.floor(Math.random() * (80 - 18 + 1) + 18);
            newUsers.push(
                {
                    "username": `username${i}`,
                    "firstName": `firstName${i}`,
                    "lastName": `lastName${i}`,
                    "age": randomNumber,
                    "mail": `email${i}@mail.com`
                }
            );
        }

        await Users.collection.insertMany(newUsers);
    }

    next();
}