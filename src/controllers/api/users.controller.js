const path = require('path');

const {
    addUser,
    getUserByEmail,
    //checkPassword
} = require('../../services/users.service')

const register = async (req, res, next) => {
    const user = req.body;
    if (Object.keys(user).length === 0) {
        const httpError = new HttpError("Body is missing", 400);

        next(httpError);
        return;
    }
    try {
        const updatedUser = await addUser(user);
        const userToSend = {
            ...updatedUser.toObject()
        }
        delete userToSend.password;

        res.status(201).json({
            status: 'success',
            data: userToSend
        })

    } catch (error) {
        const httpError = new HttpError(error.message, 400)
        next(httpError);
    }
}

const login = async (req, res, next) => {
    const credentials = req.body;

    if (!(credentials?.email && credentials?.password)) {
        const httpError = new HttpError("Bad request", 400);
        next(httpError);
        return;
    }
    const { email, password } = credentials;
    try {
        const user = await getUserByEmail(email);
        res.cookie('email',`${user.email}`);
        res.cookie('name',`${user.name}`);
        res.cookie('userId', `${user._id}`);

        console.log(res.cookie)
        /*await checkPassword(user, password);

        if (error) {
            const httpError = new HttpError("Internal Serverr Error", 500);
            next(httpError);
        }
        */
        
        res.json({
            status: 'success',
            data: {
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        /*if (error.type === 'BadCredentials') {
            // Email, password is provided but is incorrect -> 403
            const httpError = new HttpError("Bad credentials", 403);
            next(httpError);
        } else {
            const httpError = new HttpError("Internal Server Error", 500);
            next(httpError);
        }*/
        throw(error)

    }
};

module.exports = {
    register,
    login
}