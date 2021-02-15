const request = require('supertest');
const Users = require('../../models/usersModel');
let server;

// * it can take up to two parameters depending on the operation
// * this way it can vary the input of the operation, in case it doesn't
// * get any param it returns the normal object
function getReqBody(p1, p2) {
    if (p2) {
        return [
            {
                "username": `username${p1}`,
                "firstName": `firstName${p1}`,
                "lastName": `lastName${p1}`
            },
            {
                "username": `username${p2}`,
                "firstName": `firstName${p2}`,
                "lastName": `lastName${p2}`
            }
        ];
    }
    if (p1) {
        return {
            "username": `username${p1}`,
            "firstName": `firstName${p1}`,
            "lastName": `lastName${p1}`
        };
    }
    return {
        "username": "username",
        "firstName": "firstName",
        "lastName": "lastName"
    }
}

// * All the tests for the route: /users
describe('Route: /users', () => {
    // * Connects with the db
    beforeEach( () => { server = require('../../server'); });

    // * Deletes all the documents in the collection and closes the server
    afterEach( async () => { 
        await Users.deleteMany({});
        server.close();
    });

    // * desc    shows all users
    // * route   GET /users
    describe('GET /users', () => {
        it('should return all users', async () => {
            // * Creates the users
            await Users.collection.insertMany(getReqBody(1, 2));

            const response = await request(server).get('/users');

            // * It check for the status, length and if the body has some specific values
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
            expect(response.body.some(user => user.username === 'username1')).toBeTruthy();
            expect(response.body.some(user => user.username === 'username2')).toBeTruthy();
        });
    });

    // * desc    shows one user
    // * route   GET /users/:username
    describe('GET /users/:username', () => {
        it('should return a specific user if username is pass', async () => {
            const user = new Users(getReqBody());
            await user.save();

            const response = await request(server).get(`/users/${user.username}`);

            // * Checks for the status and if the username is the same from the one that was saved
            expect(response.status).toBe(200);
            expect(response.body.username).toBe(user.username);
        })

        it('should return 404 if no user is found with the given username', async () => {
            const response = await request(server).get(`/users/invalidUsername`);

            expect(response.status).toBe(404);
        });
    });

    // * desc    creates a user
    // * route   POST /users
    describe('POST /users', () => {
        it('should create a new user if a correct body is pass', async () => {
            const response = await request(server).post('/users').send(getReqBody());

            // * Checks for the status and if the body has the properties username, firstName and lastName
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("username");
            expect(response.body).toHaveProperty("firstName");
            expect(response.body).toHaveProperty("lastName");
        });

        it('should return a 400 if an incorrect body is passed', async () => {
            const response = await request(server).post('/users').send({"input": "invalid"});

            expect(response.status).toBe(400);
        });

        it('should return a 400 if the username already exist', async () => {
            // * Creates a user so it matches the username when it tries to post a new one
            const user = new Users(getReqBody());
            await user.save();

            const response = await request(server).post('/users').send(getReqBody());

            expect(response.status).toBe(400);
        });
    });

    // * desc    updates a user
    // * route   PUT /users/:username
    describe('PUT /users/:username', () => {
        it('should update a user if a correct username and body is passed', async () => {
            const user = new Users(getReqBody());
            await user.save();

            const response = await request(server).put(`/users/${user.username}`).send(getReqBody("Changed"));

            // * Checks for the status and if the body has the properties username, firstName and lastName
            // * with the updated values
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("username", "usernameChanged");
            expect(response.body).toHaveProperty("firstName", "firstNameChanged");
            expect(response.body).toHaveProperty("lastName", "lastNameChanged");
        });

        it('should return a 400 if an incorrect body is passed', async () => {
            const response = await request(server).put(`/users/username`).send({"input": "invalid"});

            expect(response.status).toBe(400);
        });

        it('should return 404 if no user is found with the given username', async () => {
            const response = await request(server).put(`/users/invalidUsername`).send(getReqBody("Changed"));

            expect(response.status).toBe(404);
        });         
    });

    // * desc    deletes a user
    // * route   DELETE /users/:username
    describe('DELETE /users/:username', () => {
        it('should delete the user if a correct username is pass', async () => {
            const user = new Users(getReqBody());
            await user.save();

            const response = await request(server).delete('/users/username');

            // * CHecks for the status and if the body has the username that was used to delete the user
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("username", user.username);
        });

        it('should return 404 if no user is found with the given username', async () => {
            const response = await request(server).delete(`/users/invalidUsername`);

            expect(response.status).toBe(404);
        });
    });
});
