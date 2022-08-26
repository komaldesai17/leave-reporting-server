const express = require('express');
const {
    postLeave,
    getAllLeave,
    deletLeave
} = require('../../controllers/api/leave.controller');

const router = express.Router();

router.post('/:id', postLeave);
router.get('/:id', getAllLeave);
router.delete('/:id', deletLeave);

module.exports = router;