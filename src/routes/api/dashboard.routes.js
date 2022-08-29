const express = require('express');

const {
    getDashboard
} = require('../../controllers/api/dashbord.controller')

const router = express.Router();


router.get('/:id', getDashboard)

module.exports = router;