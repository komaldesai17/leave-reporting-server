//const path = require('path');
const jwt = require('jsonwebtoken');
const {
    addUser,
    getUserByEmail,
    checkPassword,
    getUser
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
    }
    const { email, password } = credentials;
    try {
        const user = await getUserByEmail(email);
        //res.cookie('email', `${user.email}`);
        //res.cookie('role', `${user.role}`);
        //res.cookie('userId', `${user._id}`);
        await checkPassword(user, password);
        const claims = {
            role: user.role,
            email: user.email,
            user: user._id, // info useful for the backend in future request
        };

        jwt.sign(claims, process.env.JWT_SECRET, function (error, token) {
            // some problem in generating JWT
            if (error) {
                const httpError = new HttpError("Internal Server Error", 500);
                next(httpError, console.log(process.env.JWT_SECRET));
            }

            res.json({
                status: 'success',
                data: {
                    role: user.role,
                    email: user.email, // useful for frontend app
                    user: user._id,
                    // token: token
                    token
                }
            });
        });
    } catch (error) {
        if (error.type === 'BadCredentials') {
            // Email, password is provided but is incorrect -> 403
            const httpError = new HttpError("Bad credentials", 403);
            next(httpError);
        } else {
            const httpError = new HttpError("Internal Server Error", 500);
            next(httpError);
        }
    }

};

const getUsers = async (req, res, next) => {

    const holiday = await getUser()
    console.log(req.cookies);
    res.status(201).json({
        status: 'success',
        data: holiday
    });

}



module.exports = {
    register,
    login,
    getUsers
}