const mongoose = require("mongoose");
const User = mongoose.model("User")
const Leave = mongoose.model("Leave");


const addLeave = async (leave) => {
    try {
        const insertedHoliday = await Leave.create(leave);

        return insertedHoliday;
    } catch (error) {
        console.log(error.message)
    }
}

const getLeaves = async (sortField) => {
    try {
        const leaves = await Leave.find();

        if (sortField) {

            const leaves = await Leave.find({
                status: sortField
            });
            return leaves;
        }
        return leaves

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

const getAllLeave = async (userId, sortField) => {

    let user;
    try {
        user = await User.findById(userId, sortField);
        if (user) {
            const query = await Leave.find({
                user: userId
            });

            if (sortField) {

                const leaves = await Leave.find({
                    user: userId,
                    status: sortField
                });
                return leaves;
            }
            return query;

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
    if (deletedLeave === null) {
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

module.exports = {
    addLeave,
    getAllLeave,
    changestatus,
    deleteLeave,
    getLeaves
}