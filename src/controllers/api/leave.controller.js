const LeaveService = require('../../services/leave.service')

const postLeave = async (req, res, next) => {
    const user = req.params.id.trim();
    const leave = { user, ...req.body };
    leave.user = user
    try {
        let updatedLeave = await LeaveService.addLeave(leave);
        res.status(201).json({
            status: 'success',
            data: updatedLeave,
        });

    }
    catch (error) {
        const httpError = new HttpError(error.message, 400);

        next(httpError);
    }
}

const changeStatus = async (req, res, next) => {
    const leave = req.params.id;
    let { edit: status } = req.query
    try {
        const leaves = await LeaveService.changestatus(leave, status);
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

const getAllLeave = async (req, res, next) => {
    const leave = req.params.id;
    let { find: sortField } = req.query;
    try {
        const leaves = await LeaveService.getAllLeave(leave, sortField);
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

const deletLeave = async (req, res, next) => {
    const id = req.params.id;

    try {
        await LeaveService.deleteLeave(id)
        res.json({
            status: 'success'
        });
    } catch (error) {
        const httpError = new HttpError(error.message, 404);

        next(httpError);
    }
}


module.exports = {
    postLeave,
    getAllLeave,
    deletLeave,
    changeStatus
}