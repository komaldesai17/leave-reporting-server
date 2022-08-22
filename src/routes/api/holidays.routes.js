const express = require('express');

const {
    postHoliday,
    getHoliday,
    deleteHoliday

} = require('../../controllers/api/holidays.controller');

const router = express.Router();

router.get('/', getHoliday);

router.post('/', postHoliday);

router.delete('/:description', deleteHoliday);

module.exports = router;