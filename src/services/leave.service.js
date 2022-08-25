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

const getAllLeave = async (userId) => {

    let user;
    try {
        user = await User.findById(userId);

        if (user) {
            const leaves = await Leave.find({
                user: userId
            });
            return leaves;
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

module.exports = {
    addLeave,
    getAllLeave
}