const express = require('express');
const {
    authenticate,
    authorize
} = require('../../middleware/auth');
const {
    postLeave,
    getAllLeave,
    deletLeave,
    changeStatus,
    getLeaves
} = require('../../controllers/api/leave.controller');

const router = express.Router();

router.post('/:id', postLeave);
router.get('/:id', getAllLeave);
router.get('/', getLeaves)
router.patch('/:id', authenticate, authorize(['admin']), changeStatus)
router.delete('/:id', deletLeave);

module.exports = router;