const mongoose = require('mongoose');
const User = mongoose.model('User')

const addUser = async (user) => {
    try {
        const insertedUser = await User.create(user);
        return insertedUser;
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            const dbError = new Error(`Validationerror:${error.message}`);
            dbError.type = 'ValidationError';
            throw dbError;
        }
        if (error.name === 'CastError') {
            const dbError = new Error(`Data type error : ${error.message}`);
            dbError.type = 'CastError';
            throw dbError;
        }

        throw error;

    }
}

const getUserByEmail = async (email) => {
    const user = await User.findOne({
        // email: email
        email
    });

    if (user === null) {
        const error = new Error('Bad Credentials');
        error.type = 'BadCredentials';
        throw error;
    }

    return user;
};

const getUser = async (email) => {
    const user = await User.find(
        {

        }, { email: 1 }
    );

    if (user === null) {
        const error = new Error('Bad Credentials');
        error.type = 'BadCredentials';
        throw error;
    }

    return user;
};

const checkPassword = async (user, plainTextPassword) => {
    let isMatch;

    try {
        isMatch = await user.checkPassword(plainTextPassword);
    } catch (err) {
        const error = new Error('Something went wrong checking credentials');
        error.type = 'DBError';
        throw error;
    }

    if (!isMatch) {
        const error = new Error('Bad Credentials');
        error.type = 'BadCredentials';
        throw error;
    }

    return isMatch;
};


module.exports = {
    addUser,
    getUserByEmail,
    checkPassword,
    getUser
}