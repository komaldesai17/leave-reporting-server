const express = require('express');
const {
    postLeave
} = require('../../controllers/api/leave.controller');

const router = express.Router();

router.post('/', postLeave);

module.exports = router;