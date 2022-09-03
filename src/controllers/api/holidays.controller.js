require('../../models/Holidays');

const HolidayService = require('../../services/holiday.service')


const postHoliday = async (req, res, next) => {
    const holiday = req.body;
    try {
        let updatedHoliday = await HolidayService.addHoliday(holiday);
        res.status(201).json({
            status: 'success',
            data: updatedHoliday
        });

    }
    catch (error) {
        const httpError = new HttpError(error.message, 400);

        next(httpError);
    }
}

const getHoliday = async (req, res, next) => {

    const holiday = await HolidayService.getHoliday()
    res.status(201).json({
        status: 'success',
        data: holiday
    });

}


const deleteHoliday = async (req, res, next) => {
    const description = req.params.description;
    try {
        await HolidayService.deleteHoliday(description);
        // 204 -> use this status code for successful operation but you do not want to send any data in response
        res.json({
            status: 'success'
        });
    } catch (error) {
        const httpError = new HttpError(error.message, 404);

        next(httpError);
    }

}



module.exports = {
    postHoliday,
    getHoliday,
    deleteHoliday
}