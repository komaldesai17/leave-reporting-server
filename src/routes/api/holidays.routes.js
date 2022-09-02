const express = require('express');
const {
    authorize,
    authenticate
} = require('../../middleware/auth');
const {
    postHoliday,
    getHoliday,
    deleteHoliday

} = require('../../controllers/api/holidays.controller');

const router = express.Router();

router.get('/', getHoliday);

router.post('/',authenticate,authorize(['admin']),postHoliday);

router.delete('/:description',authenticate,authorize(['admin']), deleteHoliday);

module.exports = router;