const validateUser = require('../../validation/users-validation');

describe('User validation', () => {
    it('should return the object that was validated if its correct', () => {
        const result = validateUser(
            {
                username: "username",
                firstName: "firstName",
                lastName: "lastName",
                age: 18,
                mail: "something@mail.com"
            }
        );

        expect(result).toBeTruthy();
        expect(result.value).toHaveProperty("username");
        expect(result.value).toHaveProperty("firstName");
        expect(result.value).toHaveProperty("lastName");
        expect(result.value).toHaveProperty("age");
        expect(result.value).toHaveProperty("mail");
    });
    
    it('should return an error object if the validation fails', () => {
        const result = validateUser(
            {
                invalidProperty: "invalid",
            }
        );

        expect(result.error).toBeTruthy();
    })
});