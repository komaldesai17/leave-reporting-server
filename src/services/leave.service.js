const mongoose = require("mongoose");
const User = mongoose.model("User")
const Leave = mongoose.model("Leave");
const moment = require('moment');


const addLeave = async (leave) => {
    try {
        const numWorkDays = getNumWorkDays(leave.startDate, leave.endDate)
        leave.days = numWorkDays
        if (leave) {
            const insertedHoliday = await Leave.create(leave);
            return insertedHoliday;
        }
    } catch (error) {
        console.log(error)
    }
}

const getLeaves = async (page, sortField) => {
    try {
        const query = Leave.find();

        if (sortField) {

            const leaves = await Leave.find({
                status: sortField
            }).skip(4 * (page - 1)).limit(4).exec();

            return leaves

        }

        query.skip(4 * (page - 1)).limit(4);
        const workshop = await query.exec()
        return workshop;


    }
    catch (error) {
        if (error.name === "CastError") {
            const dbError = new Error(`Data type error : ${error.message}`);
            dbError.type = "CastError";
            throw dbError;
        } else if (error.name === "ValidationError") {
            const dbError = new Error(`Validation error : ${error.message}`);
            dbError.type = "ValidationError";
            throw dbError;
        } else {
            throw error;
        }
    }
}

const getAllLeave = async (page, userId, sortField, start, end) => {
    let user;
    try {
        user = await User.findById(userId);
        if (user) {
            if (sortField) {
                const query = await Leave.find({
                    user: userId,
                    status: sortField
                }).skip(4 * (page - 1)).limit(4).exec();
                return query
            }
            if (start && end ) {
                const query = await Leave.find(
                    {  user: userId,
                        startDate: {
                            $gte: new Date(start),
                            $lte: new Date(end)
                        }
                    }
                ).skip(4 * (page - 1)).limit(4).exec();
                return query
            }
            else {
                const query = Leave.find({
                    user: userId
                });

                query.skip(4 * (page - 1)).limit(4)
                const workshop = await query.exec();
                return workshop
            }

        }

    } catch (error) {
        if (error.name === 'CastError') {
            const dbError = new Error(`Data type error : ${error.message}`);
            dbError.type = 'CastError';
            throw dbError;
        }
    }
    if (!user) {
        const error = new Error(`user not found`);
        error.type = 'NotFound';
        throw error;
    }
};

const deleteLeave = async (id) => {
    const deletedLeave = await Leave.findByIdAndRemove(id);
    if ((deletedLeave === null) || (deleteLeave.deletedCount === 0)) {
        const error = new Error("No such leave");
        error.type = "NotFound";
        throw error;
    }

    return deletedLeave;
}


const changestatus = async (id, status) => {
    try {
        const updatedStatus = await Leave.findByIdAndUpdate(id, status);

        return updatedStatus;
    } catch (error) {
        if (error.name === "CastError") {
            const dbError = new Error(`Data type error : ${error.message}`);
            dbError.type = "CastError";
            throw dbError;
        } else if (error.name === "ValidationError") {
            const dbError = new Error(`Validation error : ${error.message}`);
            dbError.type = "ValidationError";
            throw dbError;
        } else {
            throw error;
        }
    }
}

const getNumWorkDays = (startDate, endDate) => {
    const day = moment(startDate);
    let businessdays = 0;
    while (day.isSameOrBefore(endDate, 'day')) {
        if (day.day() !== 0 && day.day() !== 6) {
            businessdays++;
        }
        day.add(1, 'd');
    }
    return businessdays;
}

module.exports = {
    addLeave,
    getAllLeave,
    changestatus,
    deleteLeave,
    getLeaves
}