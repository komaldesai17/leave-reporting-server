const useService = require('../../services/dashboard.service');



const getDashboard = async (req, res, next) => {
    const leave = req.params.id;
    try {
        const leaves = await useService.dashbord(leave)
        res.status(201).json({
            status: 'success',
            data: leaves
        });

    }
    catch (error) {
        const httpError = new HttpError(error.message, 400);

        next(httpError);
    }

}

module.exports = {
    getDashboard
}
