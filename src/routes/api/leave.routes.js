const express = require('express');
const {
    postLeave,
    getAllLeave
} = require('../../controllers/api/leave.controller');

const router = express.Router();

router.post('/:id', postLeave);
router.get('/:id', getAllLeave)

module.exports = router;