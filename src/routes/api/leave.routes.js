const express = require('express');
const {
    authorize,
    authenticate
} = require('../../middleware/auth');
const {
    postLeave,
    getAllLeave,
    deletLeave,
    changeStatus,
    getLeaves,
} = require('../../controllers/api/leave.controller');

const router = express.Router();

router.post('/:id', authenticate,postLeave);
router.get('/:id', getAllLeave);
router.get('/',authenticate,authorize(['admin']),getLeaves);
router.patch('/:id', authenticate,authorize(['admin']),changeStatus);
router.delete('/:id',authenticate,deletLeave);

module.exports = router;