const express = require('express');
const {
    register,
    login,
    getUsers
} = require('../../controllers/api/users.controller');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/',getUsers)

module.exports = router;